const assert        = require('chai').assert;
const AccountClass  = require('../classes/AccountClass');

describe('FOLLOW', () =>
{
    it ('should return object of user info of logged in user followers_id and following_id',
        async () =>
        {
            let followers_id    = [ '5fb3992503ebc22d8cefbdb2' ];
            let followings_id   = [ '5f8fdfe05e445716ac0355e7', '5fa3dd4c6062c565647d514e', ];

            let account_class   = new AccountClass();
            let data            = await account_class.getFollowData(followers_id, followings_id);

            assert.isObject(data);
        }
    );

    it ('should return object of user data with updated following field',
        async () =>
        {
            let user_to_follow  = '5f8fdfa15e445716ac0355e5';
            let user_data       =
            {
                '_id'       : '5f92b144d15bfd2eac776e92',
                'following' : [ '5f8fdfe05e445716ac0355e7' ]
            };

            let account_class   = new AccountClass();
            let data            = await account_class.addToFollowing(user_data, user_to_follow);

            assert.isObject(data);
        }
    );

    it ('should return object with message key if data is not valid',
        async () =>
        {
            let user_id             = '5f92b144d15bfd2eac776e92';
            let user_to_follow_id   = '5f92b144d15bfd2eac776e92';

            let account_class       = new AccountClass();
            let isValid             = await account_class.validateFollowData(user_id, user_to_follow_id);

            assert.isObject(isValid);
        }
    );

    it ('should return false if data is valid',
        async () =>
        {
            let user_id             = '5f92b144d15bfd2eac776e92';
            let user_to_follow_id   = '5f8fdfe05e445716ac0355e7';

            let account_class       = new AccountClass();
            let isValid             = await account_class.validateFollowData(user_id, user_to_follow_id);

            assert.equal(isValid, false);
        }
    );
});