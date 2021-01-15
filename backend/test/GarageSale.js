const assert    = require('chai').assert;
const ItemClass = require('../classes/ItemClass');

describe('GARAGE SALE', () =>
{
    it ('should return an object of items in garage sale',
        async () =>
        {
            let item_class = new ItemClass();
            let items = await item_class.getGarageSaleItems();

            assert.isObject(items);
        }
    );
});