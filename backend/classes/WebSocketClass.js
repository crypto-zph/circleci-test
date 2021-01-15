const MDB_ADMIN_USER     = require('../models/MDB_ADMIN_USER');
const MDB_USER           = require('../models/MDB_USER');
const MDB_WALLET         = require('../models/MDB_WALLET');
const MDB_TRANSACTION    = require('../models/MDB_TRANSACTION');
const MDB_BLOCKCHAIN_FEE = require('../models/MDB_BLOCKCHAIN_FEE');
// const NotificationClass  = require('./NotificationClass');
const axios              = require('axios');
const bitcore            = require('bitcore-lib');
const CryptoJS          = require("crypto-js");
// const Web3               = require('web3');
// const web3               = new Web3(`https://${process.env.ETH_NETWORK}.infura.io/v3/${process.env.CRYPTO_KEY}`);

module.exports = class WebSocketClass {

    constructor(socket_information) 
    {
        this.socket_information = socket_information;
    }

    async toDbAmount(amount, decimal_places)
    {
        return Math.floor(amount * 10 ** decimal_places);
    }

    async toClientAmount(amount, decimal_places)
    {
        return (amount / 10 ** decimal_places).toLocaleString("en-US", { maximumFractionDigits: decimal_places });
    }

    async sleep(ms)
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async makeOrderNumber(code, user_id)
    {
        const mdb_transaction  = new MDB_TRANSACTION();

        let result = '';
        let stringed_chars = ('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' + user_id).toString();
        let caps_chars = stringed_chars.toUpperCase();
        
        for (let i = 0; i < 9; i++)
        {
            result += caps_chars.charAt(Math.floor(Math.random() * caps_chars.length));
        }

        let reference_number = `${code}-${result}`
        let is_existing = await mdb_transaction.findByReferenceNumber(reference_number);
        if(is_existing)
        {
            await this.makeOrderNumber(code, user_id);
        }
        else
        {
            return reference_number;
        }
    }

    // ---------------- BTC Websocket ---------------- //
    async receivingClientBTC()
    {
        let res = {};
        let code = 'CNT';
        let { public_key, tx_hash, amount, currency_abbreviation, date_created } = this.socket_information;

        const mdb_user              = new MDB_USER();
        const mdb_wallet            = new MDB_WALLET();
        const mdb_transaction       = new MDB_TRANSACTION();

        try
        {
            let client         = await mdb_wallet.findByPublicKey(public_key);
            let client_info    = await mdb_user.doc(client.user_id);

            // Assign new balance
            let client_updated_balance = client.balance + amount;

            let reference_number = await this.makeOrderNumber(code, client.user_id);
            let client_amount    = await this.toClientAmount(amount, client.decimal_places);

            // Transaction
            let add_transaction_client =
            {
                user_id:                client.user_id,
                full_name:              client_info.first_name + " " + client_info.last_name,
                email:                  client_info.email,
                public_key:             public_key,
                currency_name:          client.currency_name,
                currency_abbreviation:  currency_abbreviation,
                decimal_places:         client.decimal_places,       
                transaction_type:       "crypto deposit",
                transaction_method:     "plus",
                amount:                 amount,
                balance_before:         client.balance,
                balance_after:          client_updated_balance,
                description:            `Received ${client_amount} ${currency_abbreviation} from External Wallet`,
                reference_number:       reference_number,
                tx_hash:                tx_hash,
                triggered_by:           client.user_id,
                blockchain_fee:         0,
                status:                 'receiving',
                date_created:           date_created,
                timestamp_created_at:   date_created,
            };
            await mdb_wallet.update(client._id, {
                is_receiving:       true,
                receiving_amount:   amount
            });
            let client_transaction = await mdb_transaction.add(add_transaction_client);
            console.log(client_transaction)

            // -----------NOTIFY FRONTEND------------
            let url = 'http://localhost:4000/api/crypto/notify_frontend';
            let body = 
                {
                    user_id:                client_transaction.user_id,
                    currency_abbreviation:  client_transaction.currency_abbreviation
                }
            await axios.post(url, body);
            // --------------------------------------

            res.status = 'success';
        }
        catch(error)
        {
            res.status  = 'error'; 
            res.message = error.message;
        }

        return res;
    }

    async confirmedClientBTC()
    {
        let res = {};

        const mdb_transaction       = new MDB_TRANSACTION();
        const mdb_wallet            = new MDB_WALLET();
        const mdb_blockchain_fee    = new MDB_BLOCKCHAIN_FEE();
        const crypto_mixer          = process.env.CRYPTO_MIXER;
        const BTC_MAIN_WALLET       = process.env.BTC_MAIN_WALLET;

        try
        {
            let transaction    = await mdb_transaction.findByTxHash(this.socket_information.tx_hash);
            let client         = await mdb_wallet.findByPublicKey(transaction.public_key);
            let blockchain_fee = await mdb_blockchain_fee.findByAbbreviation(transaction.currency_abbreviation);

            // Crypto Transaction
            let crypto_fee = Math.floor(blockchain_fee.crypto_fee.slow * 0.1);
            let private_key    = CryptoJS.AES.decrypt(client.private_key, crypto_mixer).toString(CryptoJS.enc.Utf8);
            let toMotherWallet = await this.btcSend(transaction.amount, client.public_key, private_key, crypto_fee,BTC_MAIN_WALLET);

            await this.sleep(30000) // after 30 secs it will create motherwallet history and update client history 

            if(toMotherWallet.status == 'success')
            {
                const date_created = Date.now();

                // Motherwallet Update balance & transaction
                let admin_transaction = await this.updateMotherWalletBTC(BTC_MAIN_WALLET, transaction.currency_abbreviation, toMotherWallet.amount, toMotherWallet.tx_hash, transaction.user_id, date_created);
                console.log('Motherwallet TXN!', admin_transaction)

                // Client Update balance & transaction
                await mdb_wallet.update(client._id, { 
                    balance:            transaction.balance_after,
                    is_receiving:       false,
                    receiving_amount:   0
                });
                let client_transaction = await mdb_transaction.update(transaction._id, {
                    status:                 'confirmed',
                    blockchain_fee:         toMotherWallet.blockchain_fee, // client to motherwallet blockchain fee
                    date_created:           date_created,
                    timestamp_created_at:   date_created
                });
                console.log('Client TXN!', client_transaction)

                // ---------- NOTIFICATION BELL -----------
                // let notification_data =
                // {
                //     user_id: client_transaction.user_id,
                //     message: client_transaction.description + " with reference number " + client_transaction.reference_number,
                //     date_created: client_transaction.date_created,
                //     date_opened: "",
                // }
                // console.log('NOTIFIED!', notification_data)

                // let notification = new NotificationClass(notification_data);
                // notification.createNotification();
                // --------------------------------------

                // ----------- NOTIFY AND UPDATE CLIENT BALANCE & HISTORY ------------
                // let url = 'http://localhost:4000/api/crypto/notify_frontend';
                // let body = 
                //     {
                //         user_id:                client_transaction.user_id,
                //         currency_abbreviation:  client_transaction.currency_abbreviation
                //     }
                // await axios.post(url, body);
                // -------------------------------------------------------------------

                // ----------- UPDATE ADMIN FRONTEND BALANCE & HISTORY ------------
                // let url2 = 'http://localhost:4000/api/crypto/notify_motherwallet';
                // let body2 = 
                // {
                //     user_id:                admin_transaction.user_id,
                //     currency_abbreviation:  admin_transaction.currency_abbreviation,
                //     balance:                admin_transaction.balance_after, 
                //     transaction:            admin_transaction,
                // }
                // await axios.post(url2, body2);
                // -------------------------------------------------------------------

                res.status = 'success';
            }
        }
        catch(error)
        {
            res.status  = 'error';
            res.message = error.message;
        }

        return res;
    }

    async btcSend(amount_btc, sender_address, password, btc_fee, mother_wallet)
    {
        let res = {};

        let satoshi_amount = amount_btc - btc_fee;
        let private_key    = new bitcore.PrivateKey(password);
        let public_key     = sender_address;

        let api_res = {};
        const unspent = async () =>
        {
            let url_unspent = `https://testnet.blockchain.info/unspent?active=${public_key}`;
            await axios.get(url_unspent).then(response => {
                api_res = response.data;
            }).catch(async error => { 
                console.log(' "blockchain.info" BTC API Error: get unspent')
                await this.sleep(1500);
                await unspent();
            })
        }
        await unspent();

        let unspent_array = api_res.unspent_outputs;
        let updated_utxo  = [];
        for(let i = 0; i < unspent_array.length; i++) {
            let utxo = {
                txId:          unspent_array[i].tx_hash_big_endian,
                outputIndex:   unspent_array[i].tx_output_n,
                address:       public_key,
                script:        unspent_array[i].script,
                satoshis:      unspent_array[i].value
            }
            updated_utxo.push(utxo);
        }

        let tx = new bitcore.Transaction()
        .from(updated_utxo)
        .to(mother_wallet, satoshi_amount)
        .fee(btc_fee)
        .change(public_key)
        .sign(private_key)
        
        let raw_txn = tx.serialize();

        const broadcast = async () =>
        {
            let url_broadcast = "https://testnet-api.smartbit.com.au/v1/blockchain/pushtx";
            await axios.post(url_broadcast, {
                hex: raw_txn
            }).then((response) => 
            {
                res.tx_hash = response.data.txid;
            }, 
            async (error) => {
                console.log(' "smartbit.com.au" BTC API Error: broadcast raw txn')
                await this.sleep(2000);
                await broadcast();
            });
        }
        await broadcast();

        res.amount         = satoshi_amount;
        res.blockchain_fee = btc_fee;
        res.status         = 'success';

        return res;
    }

    async updateMotherWalletBTC(mother_wallet, currency_abbreviation, amount, tx_hash, triggered_by, date_created)
    {
        const code = 'MTH';
        const mdb_admin_user        = new MDB_ADMIN_USER();
        const mdb_transaction       = new MDB_TRANSACTION();

        let balance_satoshi = 0;
        const getBlockchainBalance = async () =>
        {
            // Blockchain.info API
            let url = `https://testnet.blockchain.info/balance?active=${mother_wallet}`;
            await axios.get(url).then(response => {
                balance_satoshi = response.data[mother_wallet].final_balance;
            })
            .catch(async error => {
                this.sleep(2000);
                await getBlockchainBalance();
            })
        }
        await getBlockchainBalance();

        const motherwallet_info = await mdb_admin_user.findByPublicKey(mother_wallet);
        const motherwallet      = await motherwallet_info.wallet.find(x => x.currency_abbreviation == currency_abbreviation);

        const client_amount     = await this.toClientAmount(amount, motherwallet.decimal_places);
        const reference_number  = await this.makeOrderNumber(code, motherwallet_info._id);

        const add_transaction_receiver =
        {
            user_id:                motherwallet_info._id,
            full_name:              motherwallet_info.full_name,
            email:                  motherwallet_info.email,
            public_key:             mother_wallet,
            currency_name:          motherwallet.currency_name,
            currency_abbreviation:  currency_abbreviation,
            decimal_places:         motherwallet.decimal_places,       
            transaction_type:       "admin receive external crypto",
            transaction_method:     "plus",
            amount:                 amount,
            balance_before:         balance_satoshi - amount,
            balance_after:          balance_satoshi,
            description:            `Received ${client_amount} ${currency_abbreviation} from Blockchain`,
            reference_number:       reference_number,
            tx_hash:                tx_hash,
            triggered_by:           triggered_by, // client user_id
            date_created:           date_created,
            timestamp_created_at:   date_created
        };

        await mdb_admin_user.updateByPublicKey(mother_wallet, balance_satoshi);
        const admin_txn = await mdb_transaction.add(add_transaction_receiver);

        return admin_txn;
    }
    // ---------------- End of BTC Websocket ---------------- //
}