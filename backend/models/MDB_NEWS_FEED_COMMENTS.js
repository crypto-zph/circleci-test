const moment    = require('moment');
const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema = new Schema({
    user_id         :
    {
        type    : String,
        required:true,
    },

    newsfeed_id         :
    {
        type    : String,
        required: true
    },
    comment    :
    {
        type    : String,
        required: true
    },

    reacts          :
    {
        type    : Object,
        default : {
            like    : {
                num     : 0,
                reactors: []
            },
            heart   : {
                num     : 0,
                reactors: []
            },
            happy   : {
                num     : 0,
                reactors: []
            },

            dislike : {
                num     : 0,
                reactors: []
            }
        }
    },

    created_timestamp    :
    {
        type    : String,
        required: true
    },

    updated_timestamp    :
    {
        type    : String,
        required: true
    },
},
{
    timestamps          :
    {
        createdAt   : 'created_at',
        updatedAt   : 'updated_at'
    }
});

module.exports = class MDB_NEWS_FEED_COMMENTS extends MODEL
{
    constructor()
    {
        super('newsfeed_comments', schema);
    }

    async fetchNewsfeedComments(newsfeed_id) 
    {
        const res = await this.collection.find({newsfeed_id}).sort({created_timestamp: 'asc'});
        return res;
    }

    async fetchPostComments({skip, newsfeed_id})
    {
        const res = await this.collection.find({newsfeed_id}, null, {sort: {created_timestamp: 'desc'}, skip, limit: 2} );
        return res;
    }

    async addPostComment({user_id, comment, newsfeed_id})
    {
        const res = this.add({
            user_id,
            newsfeed_id,
            comment             : comment,
            created_timestamp   : moment().format('x'),
            updated_timestamp   : moment().format('x')
        });

        return res;
    }
}