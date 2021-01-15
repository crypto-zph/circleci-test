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

    first_name :
    {
        type    : String,
        required: true
    },

    middle_name:
    {
        type    : String,
    },

    last_name  :
    {
        type    : String,
        required: true
    },

    user_react: 
    {
        type    : String,
        enum    : ['like', 'heart', 'happy','dislike']
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
})

module.exports = class MDB_ITEM_REACTS extends MODEL
{
    constructor()
    {
        super('item_reacts', schema);
    }

    async setReact({react, item_id, _id, first_name, middle_name, last_name})
    {
        let res = {};
        let existing_react = await this.collection.findOne({item_id, user_id: _id})
        
        if(existing_react === null)
        {
            // add react
            let now = moment().format('x');

            let created_timestamp = now;
            let updated_timestamp = now;
            this.add({user_react: react, item_id, user_id: _id, first_name, middle_name, last_name, created_timestamp, updated_timestamp});
            
            res.status  = 'added';
            res.react   = react;
        }
        else
        if(existing_react != null && existing_react.user_react != react)
        {
            // compares react AND update
            let now = moment().format('x');
            let prev_react              = existing_react.user_react;
            
            existing_react.user_react   = react;
            existing_react.updated_timestamp    = now;
            await existing_react.save();

            res.status      = 'updated';
            res.prev_react  = prev_react;
            res.react       = react;

        }
        else
        if(existing_react != null && existing_react.user_react == react)
        {
            // compares react AND delete
            existing_react.deleteOne();
            res.status  = 'deleted';
            res.react   = react;

        }
        res.user_id = _id;
        res.item_id = item_id;

        return res;
    }

    async fetchUserItemReact({item_id, user_id})
    {
        const res = await this.collection.findOne({item_id, user_id});
        return res;
    }
}