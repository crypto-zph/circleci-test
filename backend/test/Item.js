// =============================
// Title : Unit Test for Items
// Author: Jude David Acula
// Contributor:
// =============================
const assert = require('chai').assert;
const ItemClass  = require('../classes/ItemClass');

let item_class = new ItemClass();

/* describe.skip('ITEM', async () => {

    it('it will get all the items', async () => {

        const response = await item_class.listItem();

        assert.isObject(response);
        assert.equal(response.status, 'success');
    }),

    it('it will get the details of the product', async () => {

        let id = {
            id : "5fa3cb41cab18339f401cfd2"
        }

        let item_class = new ItemClass(id);
        const response = await item_class.getItem();

        assert.isObject(response);
    }),

    it('it will check if the item is saved to buyer', async () => {

        let id = {
            item_id : "5fbcd214fa7a223494c073bf",
            buyer_id: "b1"
        }

        let item_class = new ItemClass(id);
        const response = await item_class.checkSavedItem();

        assert.isObject(response);
    }),

    it('it will get the products with the status of availabe', async () => {

        let status = {
            status: "asdasdasdasdasd"
        }

        let item_class = new ItemClass(status);
        const response = await item_class.itemStatus();

        assert.isArray(response);
        assert.equal(response.status, "success");

    }),

    it('it will get the data of the seller', async () => {

        let id = {
            _id : "5fb3992503ebc22d8cefbdb2"
        }

        let item_class = new ItemClass(id);
        const response = await item_class.identifySeller();

        assert.isObject(response);
        assert.equal(response.status, "success")
        assert.isArray(response.seller);
    }),

    it('it will get all the categories', async () => {

        const response = await item_class.getCategories();

        assert.isObject(response);
        assert.equal(response.status, "success");
        assert.isArray(response.categories);
    }),

    it('it will get the sub categories of the categories', async () => {

        let category = {
            category_name : "gadget"
        }

        let item_class = new ItemClass(category);
        const response = await item_class.getSubCategories();

        assert.isObject(response);
        assert.equal(response.status, "success");
        assert.isArray(response.sub_categories);

    }),

}) */

describe('Add to Cart', async () => {

    it.skip('it will add the item to cart', async () => {
        let item_information = {
            seller_id : '5f92b144d15bfd2eac776e92',
            buyer_id : '5fd08aceed31ff41ad5512a6',
            item_id : '5fd1bf1c12fc7518ac26df08',
            item_name : 'Samsung J&',
            item_image : '1607581467001.png',
            category : 'gadget',
            price : {
                BRT : 50000000000000
            }
        }

        let item_class = new ItemClass(item_information);
        let response = await item_class.addToCart();

        assert.isObject(response);
        assert.equal(response.status, "success");

    }),

    it('it will get the saved items of the buyer', async () => {

        let id = {
            buyer_id : "b1"
        }

        let item_class = new ItemClass(id);
        const response = await item_class.fetchSavedItems();

        assert.isObject(response);
        assert.equal(response.status, "success");
        assert.isArray(response.saved_items);
        
    }),

    it('it will check all the saved_items', async () => {

        let id = {
            item_id: '5fd2281879258e1090dc9c22',
            buyer_id: '5fd08aceed31ff41ad5512a6'
        }

        let item_class = new ItemClass(id);
        let response = await item_class.checkSavedItem();

        assert.isObject(response);

    }),

    it('it will delete the data from cart', async () => {

        let id = {
            buyer_id : '5fd08aceed31ff41ad5512a6',
            item_id : '5fd1bf1c12fc7518ac26df08'
        }

        let item_class = new ItemClass(id);
        let response = await item_class.removeToCart();

        assert.isObject(response);
        assert.equal(response.status, "success")
    }),

    it('it will delete all the items in cart', async () => {

        let id = {
            buyer_id : '5fd08aceed31ff41ad5512a6'
        }

        let item_class = new ItemClass(id);
        let response = await item_class.removeAllToCart();

        assert.isObject(response);
        assert.equal(response.status, "success")
        
    })

    /* it('it will get all the saved items', async () => {
        let id = {
            buyer_id: '5fd08aceed31ff41ad5512a6',
        }

        let item_class = new ItemClass(id);

        const response = await item_class.fetchSavedItems();

        assert.isObject(response);
        assert.equal(response.status, "success");


    }); */
})
