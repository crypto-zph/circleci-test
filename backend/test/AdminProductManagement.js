const assert    = require('chai').assert;
const ItemClass = require('../classes/ItemClass');

describe('PRODUCT MANAGEMENT (ADMIN)', () =>
{
    it ('should return an object of items group by their status',
        async () =>
        {
            let item_class  = new ItemClass();
            let data        = await item_class.getGroupOfItemsByStatus();

            assert.isObject(data);
        }
    );

    it ('should return an object of item data',
        async () =>
        {
            let product_id  = '5fbcd214fa7a223494c073bf';
            let status      = 'available';

            let item_class  = new ItemClass();
            let data        = await item_class.updateProductStatusById(product_id, status);

            assert.isObject(data);
        }
    );
});