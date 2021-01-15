const assert        = require('chai').assert;
const AccountClass  = require('../classes/AccountClass');

describe('ONLINE STATUS', () =>
{
    it ('should return an object of updated user info',
        async () =>
        {
            let user_id     = '5fa493fe7c21bf22a0dd734d';
            let last_active = 0;
            let status      = 'active';

            let account_class   = new AccountClass();
            let update          = await account_class.updateUserOnlineStatus(user_id, last_active, status);

            assert.isObject(update);
        }
    );

    it ('should return an object of user message thread with friend\'s online status and last active timestamp',
        async () =>
        {
            let user_id = '5f92b144d15bfd2eac776e92';

            let account_class   = new AccountClass();
            let thread          = await account_class.getUserMessageFriendsOnlineStatus(user_id);

            assert.isObject(thread);
        }
    );
});