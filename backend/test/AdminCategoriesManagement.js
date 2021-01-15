// =============================
// Title : Unit Test for Admin Reports
// Author: Toqaful Yaosaful Herrera
// Contributor: Ahko Dhin
// =============================
const assert = require('chai').assert;
const AdminClass  = require('../classes/AdminClass');

describe.skip('ADD CATEGORIES', async () => 
{
    let category_information =
    {
        category_name:       'test_name2',
        legalities:          'no',
        category_image_path: 'test_image_path',
    }

    let admin_class          = new AdminClass(category_information);

    it('it will validate the add category', async () =>
    {
        let category_validation = await admin_class.validateCategory();
        assert.equal(category_validation.status, 'success');
    }),

    it('it will add the category', async () =>
    {
        let created_category = await admin_class.createCategory();
        assert.equal(created_category.status, 'success');
    })
}),

describe.skip('UPDATE CATEGORIES', async () => 
{
    let category_information =
    {
        category_name:       'updated_test_name2',
        category_image_path: 'updated_test_image_path',
        status:              'updated_enabled',
        legalities:          'updated_no',
        _id:                 '5ff40b44fbb3ed088ca8e5fd',
    }

    let admin_class          = new AdminClass(category_information);

    it('it will validate the update category', async () =>
    {
        let category_validation = await admin_class.validateUpdateCategory();
        assert.equal(category_validation.status, 'success');
    }),

    it('it will update the category', async () =>
    {
        let updated_category    = await admin_class.updateCategory();
        assert.equal(updated_category.status, 'success');
    })
}),

describe.skip('ADD SUBCATEGORIES', async () => 
{
    let subcategory_information =
    {
        category_name:          'updated_test_name2',
        subcategory_name:       'test_sub_name',
        subcategory_image_path: 'test_sub_image_path',
        _id:                    '5ff470cdeb68660d18f17f98',
    }


    let admin_class          = new AdminClass(subcategory_information);

    it('it will validate the subcategory', async () =>
    {
        let created_subcategory     = await admin_class.validateSubcategory();
        assert.equal(created_subcategory.status, 'success');
    }),

    it('it will add the subcategory', async () =>
    {
        let created_subcategory     = await admin_class.createSubcategory();
        assert.equal(created_subcategory.status, 'success');
    })
}),

describe.skip('UPDATE SUBCATEGORIES', async () => 
{
    let subcategory_information =
    {
        category_name:          'updated_test_name2',
        subcategory_name:       'test_sub_name',
        subcategory_image_path: 'test_sub_image_path',
        status:                 'update_status',
        _id:                    '5ff470cdeb68660d18f17f98',
        sub_key:                'test_sub_name',
    }

    let admin_class          = new AdminClass(subcategory_information);

    it('it will validate the update subcategory', async () =>
    {
        let subcategory_validation = await admin_class.validateUpdateSubcategory();
        assert.equal(subcategory_validation.status, 'success');
    }),

    it('it will update the subcategory', async () =>
    {
        let updated_subcategory    = await admin_class.updateSubcategory();
        assert.equal(updated_subcategory.status, 'success');
    })
})

describe.skip('ADD SUBCATEGORIES2', async () => 
{
    let subcategory2_information =
    {
        category_name:           'updated_test_name2',
        subcategory_name:        'test_sub_name',
        subcategory2_name:       'test_sub2_name',
        subcategory2_image_path: 'test_sub2_image_path',
        _id:                     '5ff470cdeb68660d18f17f98',
    }


    let admin_class          = new AdminClass(subcategory2_information);

    it('it will validate the subcategory', async () =>
    {
        let subcategory2_validation = await admin_class.validateSubcategory2();
        assert.equal(subcategory2_validation.status, 'success');
    }),

    it('it will add the subcategory', async () =>
    {
        let created_subcategory2    = await admin_class.createSubcategory2();
        assert.equal(created_subcategory2.status, 'success');
    })
}),

describe.skip('UPDATE SUBCATEGORIES2', async () => 
{
    let subcategory2_information =
    {
        category_name:           'updated_test_name2',
        subcategory_name:        'updated_test_sub_name',
        subcategory2_name:       'updated_test_sub2_name',
        subcategory2_image_path: 'updated_test_sub2_image_path',
        status:                  'update_status',
        _id:                     '5ff470cdeb68660d18f17f98',
        sub2_key:                'test_sub2_name',
    }

    let admin_class          = new AdminClass(subcategory_information);

    it('it will validate the update subcategory', async () =>
    {
        let subcategory_validation = await admin_class.validateUpdateSubcategory();
        assert.equal(subcategory_validation.status, 'success');
    }),

    it('it will update the subcategory', async () =>
    {
        let updated_subcategory    = await admin_class.updateSubcategory();
        assert.equal(updated_subcategory.status, 'success');
    })
})