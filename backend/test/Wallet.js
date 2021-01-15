const assert            = require('chai').assert;
const WalletClass       = require('../classes/WalletClass');
const AccountClass      = require('../classes/AccountClass');
const AdminClass        = require('../classes/AdminClass');
const MDB_WALLET        = require('../models/MDB_WALLET');
const MDB_ADMIN_USER    = require('../models/MDB_ADMIN_USER');

describe('WALLET', () =>
{
    describe('Client Send', () =>
    {
        it ('transaction balance_after should be equal to sender balance',
            async () =>
            {   
                const user_id = '5fdb27f134fe142f0ce8c41f'; // sender user_id
                const otp_2fa = await new AccountClass().generate2faOTP(user_id);

                const date = Date.now();
                const details = {
                    user_id:                user_id,
                    receiver_public_key:    '0xdA041EF288d68EB41eB5CA3A88977963E7B59277', // receiver public_key
                    currency_abbreviation:  'BRT',
                    amount:                 1000,
                    remarks:                'test',
                    otp:                    otp_2fa,
                    date_created:           date,
                    timestamp_created_at:   date
                }

                const transaction = await new WalletClass(details).send();
                const sender      = await new MDB_WALLET().findByUserId(user_id);

                assert.strictEqual(transaction.data.balance_after, sender.balance);
            }
        );
    });

    describe('Admin Send', () =>
    {
        it ('transaction balance_after should be equal to sender balance',
            async () =>
            {   
                const user_id = '5fbf97394a536109d4f88c9e'; // administrator user_id
                const otp_2fa = await new AdminClass().generate2faOTP(user_id);

                const date = Date.now();
                const details = {
                    user_id:                user_id,
                    receiver_public_key:    '0xdA041EF288d68EB41eB5CA3A88977963E7B59277', // receiver public_key
                    currency_abbreviation:  'BRT',
                    amount:                 1000,
                    remarks:                'test',
                    otp:                    otp_2fa,
                    date_created:           date,
                    timestamp_created_at:   date
                }

                const transaction    = await new AdminClass(details).motherWalletSend();
                const sender         = await new MDB_ADMIN_USER().doc(user_id);
                const sender_balance = sender.wallet.find(x => x.currency_abbreviation == 'BRT').balance;

                assert.strictEqual(transaction.data.balance_after, sender_balance);
            }
        );
    });
});