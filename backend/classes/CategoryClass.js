const MDB_CATEGORIES = require('../models/MDB_CATEGORIES');
module.exports = class CategoryClass
{
    constructor()
    {

    }

    static async fetchEnabledCategories()
    {
        let res = {};
        const mdb_categories = new MDB_CATEGORIES();

        const categories = await mdb_categories.fetchEnabledCategories();

        if(categories == null || categories == [])
        {
            res.status      = 'error';
            res.message     = 'no categories found';
        }

        if(categories.length != 0 && (typeof categories == 'object'))
        {
            res.status      = 'success';
            res.categories  = categories;
        }

        return res;
    }
}