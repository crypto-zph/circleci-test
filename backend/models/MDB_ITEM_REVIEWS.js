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

    item_id         :
    {
        type    : String,
        required: true
    },

    user_avatar     :
    {
        type    : String,
        // required: true
    },

    user_comment    :
    {
        type    : String,
        required: true
    },

    user_first_name :
    {
        type    : String,
        required: true
    },

    user_middle_name:
    {
        type    : String,
    },

    user_last_name  :
    {
        type    : String,
        required: true
    },

    user_react      : 
    {
        type    : String,
        enum    : ['like', 'heart', 'happy', 'dislike', ''],
        default : ''
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

module.exports = class MDB_ITEM_REVIEWS extends MODEL
{
    constructor() 
    {
        super('item_reviews', schema);
    }

    async fetchItemComments(item_id) 
    {
        const res = await this.collection.find({item_id}).sort({created_timestamp: 'asc'});
        return res;
    }

    async addComment({user_id, first_name, middle_name, last_name, item_id, comment})
    {
        const res = this.add({
            user_id,
            item_id,
            user_first_name     : first_name, 
            user_middle_name    : middle_name, 
            user_last_name      : last_name, 
            user_comment        : comment,
            created_timestamp: moment().format('x'),
            updated_timestamp: moment().format('x')
        
        });

        return res;
    }
}
