const MDB_USER              = require('../models/MDB_USER');
const MDB_WALLET            = require('../models/MDB_WALLET');
const MDB_TRANSACTION       = require('../models/MDB_TRANSACTION');
const MDB_CONVERSION        = require('../models/MDB_CONVERSION');
const AccountClass          = require('./AccountClass');
const Web3                  = require('web3');
const web3                  = new Web3(`https://${process.env.ETH_NETWORK}.infura.io/v3/${process.env.CRYPTO_KEY}`);

let io = {};

module.exports = class AdminClass
{
    constructor(user_information)
    {
        this.user_information = user_information;
    }

    async socketServer(server)
    { 
        io = server;
    }

    async makeOrderNumber(code, user_id)
    {
        const mdb_transaction   = new MDB_TRANSACTION();

        let result = '';
        let stringed_chars = ('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' + user_id).toString();
        let caps_chars = stringed_chars.toUpperCase();
        
        for (let i = 0; i < 9; i++)
        {
            result += caps_chars.charAt(Math.floor(Math.random() * caps_chars.length));
        }

        let reference_number = `${code}-${result}`

        // CHECKS IF THE GENERATED REFERENCE NUMBER IS ALREADY EXISTS ON transactions collection
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

    async send()
    {
        let res  = {};
        let code = 'BRT';

        const mdb_user          = new MDB_USER();
        const mdb_wallet        = new MDB_WALLET();
        const mdb_transaction   = new MDB_TRANSACTION();

        let sender_info = await mdb_user.doc(this.user_information.user_id);
        let sender      = await mdb_wallet.findByCurrencyAndUserId(this.user_information.currency_abbreviation, this.user_information.user_id);

        if (sender_info == null || sender == null)
        {
            res.status  = "error";
            res.message = "Transaction error, Please try again";
            return res;
        }
        else if(sender_info.google_authenticator === undefined)
        {
            res.status  = "error";
            res.message = "2FA not enabled";
            return res;
        }
        else if(sender_info.google_authenticator.is_2fa_enabled === true)
        {
            let receiver      = await mdb_wallet.findByPublicKey(this.user_information.receiver_public_key);
            let receiver_info = receiver ? await mdb_user.doc(receiver.user_id) : null;

            const account_class     = new AccountClass();
            const is_otp_verified   = await account_class.verify2faOTP(sender_info.google_authenticator.ascii, this.user_information.otp);

            if
            (
                receiver == null ||
                receiver_info == null ||
                typeof this.user_information.amount != "number"
            ) 
            {
                res.status  = "error";
                res.message = "Input error";
            }

            else if(is_otp_verified === false)
            {
                res.status  = "error";
                res.message = "Invalid 2FA";
            }

            else if(is_otp_verified === true)
            {
                // SENDER
                let sender_amt   = Math.floor(this.user_information.amount * 10 ** sender.decimal_places);

                // Assign new balance
                let sender_updated_balance = sender.balance - sender_amt;
                let reference_number = await this.makeOrderNumber(code, sender_info._id);

                // Transaction
                let add_transaction_sender =
                {
                    user_id:                sender_info._id,
                    full_name:              sender_info.first_name + " " + sender_info.last_name,
                    email:                  sender_info.email,
                    public_key:             sender.public_key,
                    currency_name:          sender.currency_name,
                    currency_abbreviation:  sender.currency_abbreviation,
                    decimal_places:         sender.decimal_places,
                    transaction_type:       "send internal",
                    transaction_method:     "minus",
                    amount:                 sender_amt,
                    balance_before:         sender.balance,
                    balance_after:          sender_updated_balance,
                    description:            `Sent ${this.user_information.amount.toLocaleString("en-US", {
                        maximumFractionDigits: sender.decimal_places
                    })} ${sender.currency_abbreviation} to ${receiver_info.first_name} ${receiver_info.last_name}`,
                    remarks:                this.user_information.remarks,
                    triggered_by:           sender_info._id,
                    reference_number:       reference_number,
                    date_created:           this.user_information.date_created,
                    timestamp_created_at:   this.user_information.date_created
                };

                // Save DB
                mdb_wallet.update(sender._id, { balance: sender_updated_balance });
                let sender_transaction = await mdb_transaction.add(add_transaction_sender);

                // RECEIVER
                let updated_receiver = await mdb_wallet.findByPublicKey(this.user_information.receiver_public_key);
                let receiver_updated_balance = updated_receiver.balance + sender_amt;

                let add_transaction_receiver =
                {
                    user_id:                receiver_info._id,
                    full_name:              receiver_info.first_name + " " + receiver_info.last_name,
                    email:                  receiver_info.email,
                    public_key:             receiver.public_key,
                    currency_name:          sender.currency_name,
                    currency_abbreviation:  sender.currency_abbreviation,
                    decimal_places:         sender.decimal_places,
                    transaction_type:       "receive internal",
                    transaction_method:     "plus",
                    amount:                 sender_amt,
                    balance_before:         updated_receiver.balance,
                    balance_after:          receiver_updated_balance,
                    description:            `Received ${this.user_information.amount.toLocaleString("en-US", {
                        maximumFractionDigits: sender.decimal_places
                    })} ${sender.currency_abbreviation} from ${sender_info.first_name} ${sender_info.last_name}`,
                    remarks:                this.user_information.remarks,
                    triggered_by:           sender_info._id,
                    reference_number:       reference_number,
                    date_created:           this.user_information.date_created,
                    timestamp_created_at:   this.user_information.date_created,
                };

                // Save DB
                mdb_wallet.update(receiver._id, { balance: receiver_updated_balance });
                mdb_transaction.add(add_transaction_receiver);

                res.data   = sender_transaction;
                res.status = "success";
            }

            return res;
        }
    }

    async history() {
        const mdb_transaction = new MDB_TRANSACTION();
        let res = {}

        try {
            let transactions = await mdb_transaction.findByTransactionHistory(this.user_information.user_id, this.user_information.currency_abbreviation, this.user_information.skip);

            res.status = "success";
            res.data   = transactions;
        }
        catch (error) {
            res.status  = "error";
            res.message = error.message;
        }

        return res;
    }

    async getConversionRates()
    {
        let mdb_conversion = new MDB_CONVERSION();
        let result = await mdb_conversion.findByAbbreviation('USD')
        console.log(result)
        return result.rates;
    }

    async notifyFrontend()
    {
        // ------------SOCKET.IO----------------
        // io.sockets.emit('new_notification', {});
        io.sockets.emit('update_crypto', this.user_information);
        // -------------------------------------
    }

    // async notifyMotherwallet()
    // {
    //     // ------------SOCKET.IO----------------
    //     io.sockets.emit('update_motherwallet', this.wallet_information);
    //     // -------------------------------------
    //     return true;
    // }
}
