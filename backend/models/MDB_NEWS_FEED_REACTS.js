const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema = new Schema(
{
    news_feed_id    : 
    {
        type: String,
    },

    user_id         :
    {
        type: String,
    },

    react           :
    {
        type: String,
    },

    created_timestamp:
    {
        type    : String,
        required:true,
    },
    
    updated_timestamp:
    {
        type    : String,
        required:true,
    }
},
{
    timestamps          :
    {
        createdAt   : 'created_at',
        updatedAt   : 'updated_at'
    }
});

class MDB_NEWS_FEED_REACTS extends MODEL
{
    constructor ()
    {
        super('newsfeed_reacts', schema);
    }

    async isExist({user_id, news_feed_id, react})
    {
        const res = await this.collection.findOne({user_id, news_feed_id, react});
        return res == null ? false : true;
    }

    async addReact({news_feed_id, user_id, react, created_timestamp, updated_timestamp})
    {
        const res = await this.add({news_feed_id, user_id, react, created_timestamp, updated_timestamp});
        return res;
    }

    async removeReact({news_feed_id, user_id, react})
    {
        const res = await this.collection.findOneAndDelete({news_feed_id, user_id, react});
        return res;
    }

    async fetchUserReact({user_id, post_id})
    {
        const res = await this.collection.findOne({user_id, news_feed_id: post_id});
        return res;
    }
}

module.exports = MDB_NEWS_FEED_REACTS;