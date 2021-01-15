const AccountClass  = require('../classes/AccountClass');
const ItemClass     = require('../classes/ItemClass');
const SearchClass   = require('../classes/SearchClass');

module.exports =
{
    async getSearchData (req, res)
    {
        let { type, keyword, filters }   = req.query;

        filters = (filters != null) ? filters : {};

        if (req.query.category != null) {
            filters.category = req.query.category;
        }

        if (req.query.subcategory != null) {
            filters.subcategory = req.query.subcategory;
        }

        if (req.query.subcategory2 != null) {
            filters.category = req.query.subcategory2;
        }

        let account_class       = new AccountClass();
        let item_class          = new ItemClass();

        keyword = (!keyword) ? 'all' : keyword;

        let data = {};

        if (type === 'Items') {
            data  = await item_class.getItems(keyword, filters);
        } else {
            data = await account_class.getUsersData(keyword, filters);
        }

        if (data.status == 'success') {
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        }
    },

    async getSearchAutoComplete (req, res)
    {
        let type = req.query.type;

        let account_class       = new AccountClass();
        let item_class          = new ItemClass();

        let data = {};

        if (type === 'Items') {
            data = await item_class.getItemNameList();
        } else {
            data = await account_class.getUserNameList();
        }

        if (data.status == 'success') {
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        }
    },

    async getTrendingSearches (req, res)
    {
        let search_class    = new SearchClass();
        let trending        = await search_class.getTrendingSearches();

        if (trending.status == 'success') {
            res.status(200).json(trending);
        } else {
            res.status(400).json(trending);
        }
    },

    async addToSearches (req, res)
    {
        let data =
        {
            name            : req.body.search,
            search_count    : 1
        };

        let search_class    = new SearchClass();
        let add             = await search_class.addToSearches(data);

        if (add.status == 'success') {
            res.status(200).json(add);
        } else {
            res.status(400).json(add);
        }
    }
}