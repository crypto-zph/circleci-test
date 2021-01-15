const assert        = require('chai').assert;
const AccountClass  = require('../classes/AccountClass');

describe('FORGOT PASSWORD', () =>
{
    it.skip ('should return an object with status success if email sent',
        async () =>
        {
            let email           = 'ccs0cd00@gmail.com';

            let account_class   = new AccountClass();
            let sent            = await account_class.forgotPassword(email);

            assert.deepEqual(sent, { status: 'success' });
        }
    );

    it.skip ('should return an object with status = success and email if valid',
        async () =>
        {
            let data =
            {
                'password'          : 'Test1234!',
                'confirm_password'  : 'Test1234!',
                'key'               : 'TkxcNRPYoOiSRnTKqwXBlKjggh'
            };

            let account_class   = new AccountClass();
            let is_valid        = await account_class.validateResetUserPasswordData(data);

            assert.hasAllKeys(is_valid, ['status', 'data']);
        }
    );

    it ('should return an object with status = error and message if not valid',
        async () =>
        {
            let data =
            {
                'password'          : 'Test1234!',
                'confirm_password'  : 'Test1234!',
                'key'               : 'NsLLtCN3SeEI1QD1FM0dEhEcUV'
            };

            let account_class   = new AccountClass();
            let is_valid        = await account_class.validateResetUserPasswordData(data);

            assert.hasAllKeys(is_valid, ['status', 'message']);
        }
    );

    it.skip ('should return an object with status and email key if key provided is valid',
        async () =>
        {
            let key             = 'TkxcNRPYoOiSRnTKqwXBlKjggh';

            let account_class   = new AccountClass();
            let valid           = await account_class.validateKey(key);

            assert.hasAllKeys(valid, ['status', 'email']);
        }
    );

    it.skip ('should return an object with status = success and email key for success',
        async () =>
        {
            let data =
            {
                'password'          : 'Test1234!',
                'confirm_password'  : 'Test1234!',
                'key'               : 'TkxcNRPYoOiSRnTKqwXBlKjggh'
            };

            let account_class   = new AccountClass();
            let reset_password  = await account_class.resetUserPasssword(data);

            assert.hasAllKeys(reset_password, ['status', 'email']);
        }
    );
});