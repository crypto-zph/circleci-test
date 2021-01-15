const assert    = require('chai').assert;
const ItemClass = require('../classes/ItemClass');

describe('RELATED PRODCUTS', () =>
{
    it ('should return an object of related products',
        async () =>
        {
            let item_id             = '5fa3cb41cab18339f401cfd2';

            let item_class          = new ItemClass();
            let related_products    = await item_class.getRelatedProducts(item_id);

            assert.isObject(related_products);
        }
    );
});