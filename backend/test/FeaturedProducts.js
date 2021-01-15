const assert    = require('chai').assert;
const ItemClass = require('../classes/ItemClass');

describe('FEATURED PRODUCTS', () =>
{
    it ('should return an object of available featured products',
        async () =>
        {
            let item_class          = new ItemClass();
            let featured_products   = await item_class.getFeaturedProducts();

            assert.isObject(featured_products);
        }
    );

    it ('should return an object with count key',
        async () =>
        {
            let item_class = new ItemClass();
            let slots = await item_class.getFeaturedProductSlots();

            assert.hasAllKeys(slots, ['status', 'count']);
        }
    );

    it ('should return an object with is_featured_product key',
        async () =>
        {
            let item_id     = '5fbcd214fa7a223494c073bf';

            let item_class  = new ItemClass();
            let item        = await item_class.checkFeaturedProductItem(item_id);

            assert.hasAllKeys(item, ['status', 'is_featured_product']);
        }
    );
});