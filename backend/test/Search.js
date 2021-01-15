const assert        = require('chai').assert;
const AccountClass  = require('../classes/AccountClass');
const ItemClass     = require('../classes/ItemClass');
const ImageClass    = require('../classes/ImageClass');
const SearchClass   = require('../classes/SearchClass');

describe ('SEARCH', () =>
{
    describe ('ITEMS', () =>
    {
        it ('should return object of items',
            async () =>
            {
                let keyword = 'all';
                let filters = {};

                let item_class  = new ItemClass();
                let res         = await item_class.getItems(keyword, filters);

                assert.isObject(res);
            }
        );

        it ('should return object of avaialble items item_name',
            async () =>
            {
                let item_class  = new ItemClass();
                let res         = await item_class.getItemNameList();

                assert.isObject(res);
            }
        );

        it ('should return object of available items with converted image',
            async () =>
            {
                let keyword = 'all';
                let filters = {};

                let item_class  = new ItemClass();
                let items       = await item_class.getItems(keyword, filters);

                let image_class = new ImageClass();
                items           = await image_class.convertImagePath(items, ['seller_avatar', 'item_image'], ['avatar', 'product-imgs/normal_size']);

                assert.isObject(items);
            }
        );

        it ('should return an object of trending searches with status and trending keys',
            async () =>
            {
                let search_class    = new SearchClass();
                let trending        = await search_class.getTrendingSearches();

                assert.hasAllKeys(trending, [ 'status', 'trending' ]);
            }
        );

        it ('should return an object of added search details',
            async () =>
            {
                let data =
                {
                    name: 'iphone'
                };

                let search_class    = new SearchClass();
                let add_to_search   = await search_class.addToSearches(data);

                assert.hasAllKeys(add_to_search, [ 'status', 'data' ]);
            }
        );
    });

    describe ('USERS', () =>
    {
        it ('should return object of users',
            async () =>
            {
                let keyword = 'all';
                let filters = {};

                let account_class   = new AccountClass();
                let res             = await account_class.getUsersData(keyword, filters);

                assert.isObject(res);
            }
        );

        it ('should return object of users full_name',
            async () =>
            {
                let account_class   = new AccountClass();
                let res             = await account_class.getUserNameList();

                assert.isObject(res);
            }
        );

        it ('should return object of users with converted avatar image',
            async () =>
            {
                let keyword = 'all';
                let filters = {};

                let account_class   = new AccountClass();
                let users           = await account_class.getUsersData(keyword, filters);

                let image_class     = new ImageClass();
                users               = await image_class.convertImagePath(users, 'avatar_path', 'avatar');

                assert.isObject(users);
            }
        );
    });
});