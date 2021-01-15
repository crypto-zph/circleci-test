const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema({
    
    user_id: 
    {
        type        : String,
    },

    seller_name : 
    {
        type        : String,
    },

    buyer_name :  
    {
        type        : String,
    },

    title : 
    {
        type        : String,
    },

    product: 
    {
        type        : String,
    },

    message: 
    {
        type        : String,
    },

    profile_pic_path :
    {
        type        : String,
    },

    avatar_gender : 
    {
        type        : String,
    },

    image_path: 
    {
        type        : String,
    },

    date_created: 
    {
        type        : Date,
    },

    is_open: 
    {
        type        : Boolean
    },

    identification_id:
    {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },

    item_id:
    {
        type: String,
    },

    buyer_id:
    {
        type        : String,
    },

    subject:
    {
        type        : String,
    },
    
    item_id:
    {
    	type 		: String
    },
});

class MDB_NOTIFICATIONS extends MODEL
{
    constructor()
    {
        super('notifications', schema);
    }

    async findNotificationById(user_id)
    {
        const query_data = await this.collection.find({ $or: [ {user_id : user_id},{user_id : 'All Users'} ] }).populate('identification_id').sort({'date_created': -1});
        return query_data ? query_data : null;
    }

    async deleteNotification(user_id)
    {
        const query_data = await this.collection.deleteOne({_id : user_id});
        return query_data ? query_data : null;
    }

    async updateNotificationById(user_id)
    {
        const res = await this.collection.findOneAndUpdate({ _id: user_id }, { $set: { is_open: true, date_opened: Date() } },
            { multi: true })
        return res ? res : null;
    }

}

module.exports = MDB_NOTIFICATIONS;