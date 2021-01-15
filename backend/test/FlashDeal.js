const assert            = require('chai').assert;
const FlashDealClass    = require('../classes/FlashDealClass');

describe('FLASH DEAL', () =>
{
    it ('should return an object of active flash deals',
        async () =>
        {
            let flash_deal_class    = new FlashDealClass();
            let flash_deals         = await flash_deal_class.getFlashDeals();

            assert.isObject(flash_deals);
        }
    );

    it ('should return true if flash deal data is valid',
        async () =>
        {
            let data =
            {
                flash_deal_percentage   : 10,
                flash_deal_price        : 42500000000000
            };

            let flash_deal_class    = new FlashDealClass();
            let is_valid            = await flash_deal_class.validateFlashDealData(data);

            assert.isTrue(is_valid);
        }
    );

    it ('should have a message key if flash deal data is not valid',
        async () =>
        {
            let data =
            {
                flash_deal_percentage   : 10
            }

            let flash_deal_class    = new FlashDealClass();
            let is_valid            = await flash_deal_class.validateFlashDealData(data);

            assert.hasAllKeys(is_valid, [ 'message' ]);
        }
    );

    it ('should return an object details of new flash deal',
        async () =>
        {
            let item_id                 = '5fd70c694edbd80bf8b21780';
            let flash_deal_percentage   = 10;
            let flash_deal_price        = 135000000000;

            let flash_deal_class    = new FlashDealClass();
            let flash_deal          = await flash_deal_class.addToFlashDeal(item_id, flash_deal_percentage, flash_deal_price);

            assert.isObject(flash_deal);
        }
    );

    it ('should return an object of items by seller',
        async () =>
        {
            let seller_id = '';

            let flash_deal_class    = new FlashDealClass();
            let items               = await flash_deal_class.getFlashDealsBySellerId(seller_id);

            assert.isObject(items);
        }
    );

    it ('should have an is_garage_sale key to check if item is on garage sale',
        async () =>
        {
            let item_id = '5fd71b4a4edbd80bf8b21785';

            let flash_deal_class    = new FlashDealClass();
            let is_garage_sale      = await flash_deal_class.isGarageSaleItem(item_id);

            assert.hasAllKeys(is_garage_sale, [ 'status', 'is_garage_sale' ]);
        }
    );

    it ('should return an status equal to success for success removed of flash deal items',
        async () =>
        {
            let flash_deal_class    = new FlashDealClass();
            let remove              = await flash_deal_class.removeFlashDealItems();

            assert.equal(remove.status, 'success');
        }
    );
});