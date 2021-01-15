const MONGOOSE  = require('../config/mongo');
const Schema    = MONGOOSE.Schema;
const MODEL     = require('./MODEL');

const schema = new Schema({
    name :
    {
        type    : String,
        unique  : true
    },
    search_count :
    {
        type    : Number,
        default : 0
    }
},
{
    timestamps          :
    {
        createdAt   : 'created_at',
        updatedAt   : 'updated_at'
    }
});

class MDB_SEARCH extends MODEL
{
    constructor ()
    {
        super('searches', schema);
    }

    /**
     * @return { Object } of trending searches
     */
    async getTrendingSearches ()
    {
        let res = await this.collection.find({}, { _id: 0, name : 1 }).sort({ search_count : -1 }).limit(20);
        let trending = [];

        if (res) {
            for (let count = 0; count < res.length; count++) {
                trending.push(res[count].name);
            }
        }

        return trending;
    }

    /**
     *
     * @param { Object = name & search_count } data
     *
     * @return { Object }
     */
    async addToSearches (data)
    {
        let res = {}
        let search = await this.collection.findOne({ name : data.name });

        if (search) {
            res = await this.collection.findOneAndUpdate({ _id : search._id }, { $inc : { search_count : 1 } }, { new : true });
        } else {
            res = await super.add({ name : data.name, search_count : data.search_count });
        }

        return res;
    }
}

module.exports = MDB_SEARCH;