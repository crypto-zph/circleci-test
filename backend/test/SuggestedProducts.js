const assert    = require('chai').assert;
const ItemClass = require('../classes/ItemClass');

describe('SUGGESTED PRODUCTS', () =>
{
    it ('should return an object of suggested products related to users previous search',
        async () =>
        {
            let item_class = new ItemClass();
            let items = await item_class.getGarageSaleItems();
        }
    );
});