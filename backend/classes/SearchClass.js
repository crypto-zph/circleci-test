const MDB_SEARCH = require('../models/MDB_SEARCH');

module.exports = class SearchClass
{
    constructor ()
    {
        this.mdb_search = new MDB_SEARCH();
    }

    /**
     * @return { Object } of trending searches
     */
    async getTrendingSearches()
    {
        let res = {};

        try {
            res.status = 'success';

            let trending = await this.mdb_search.getTrendingSearches();

            res.trending = trending;
        } catch (error) {
            res.status  = 'error';
            res.message = error.message;
        }

        return res;
    }

    /**
     *
     * @param { Object = name & search_count } data
     *
     * @return { Object }
     */
    async addToSearches(data)
    {
        let res = {};

        try {
            if (typeof data.name !== 'undefined' && data.name !== '') {
                res.status = 'success';

                let add = await this.mdb_search.addToSearches(data);

                res.data = add;
            } else {
                res.status = 'error';
                res.message = 'Field name is required';
            }
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }
}