const assert        = require('chai').assert;
const AccountClass  = require('../classes/AccountClass');

describe('WISHLIST', () =>
{
    it ('should return an object of items with details from user wishlist',
        async () =>
        {
            let wishlist_ids = [];

            let account_class   = new AccountClass();
            let wishlists       = await account_class.getWishlist(wishlist_ids);

            assert.isObject(wishlists);
        }
    );

    it ('should return an object of related items from users wishlist',
        async () =>
        {
            let wishlist_ids = [ '5fa3cb41cab18339f401cfd2', '5fa3d2d6cab18339f401cfd3' ];

            let account_class = new AccountClass();
            let related_items = await account_class.getWishlistMatch(wishlist_ids);

            assert.isObject(related_items);
        }
    );

    it ('should return an object of user info with updated wishlist field',
        async () =>
        {
            let user_data   =
            {
                _id         : '5f92b144d15bfd2eac776e92',
                wishlists   : [ '5fa3d2d6cab18339f401cfd3' ]
            };
            let item_id     = '5fa3cb41cab18339f401cfd2';

            let account_class   = new AccountClass();
            let updated         = await account_class.updateWishlist(user_data, item_id);
        }
    );

    it ('should return object with message key if item to add in wishlist is not valid',
        async () =>
        {
            let item_id             = '6fa3cb41cab18339f401cfd0';

            let account_class       = new AccountClass();
            let isValid             = await account_class.validateWishlistId(item_id);

            assert.isObject(isValid);
        }
    );

    it ('should return false if item to add in wishlist is valid',
        async () =>
        {
            let item_id             = '5fa3cb41cab18339f401cfd2';

            let account_class       = new AccountClass();
            let isValid             = await account_class.validateWishlistId(item_id);

            assert.equal(isValid, false);
        }
    );
});