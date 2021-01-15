const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;
const User      = require('./MDB_USER').User;

const schema         = new Schema({
    prod_id :
    {
        type: String
    },
    emoji :
    {
        type: String,
        default: 'like-01.2.png'
    },
    message_details:
    {
        type : Array,
        default: []
    },

});

class MDB_MESSAGE extends MODEL {
    constructor() {
        super('message', schema);
    }

    async findByMessageId(id) {
        // console.log('id', id)
        const res = await this.collection.findById(id);
        return res ? res : null;
    }

    async findMessageAndUpdate(msg_ID, updates) {
        const res = await this.collection.findOneAndUpdate(msg_ID, updates, { new: true })
        return res;
    }

    /**
     *
     * @param { String } user_id
     *
     * @return { Object } of logged in user messages
     */
    async getUserMessageFriendsOnlineStatus(user_id)
    {
        // console.log(user_id);
        let messages = await this.collection.aggregate(
            [
                { $unwind   : '$message_details' },

                { $match    : { 'message_details.sender_id' : user_id } },
                { $addFields : { "sender_id": { "$toObjectId": "$message_details.sender_id" }}},
                { $lookup   :
                    {
                        from : 'users',
                        localField : 'message_details.receiver_id',
                        foreignField : '_id',
                        as: 'receiver'
                    },
                },
                { $unwind   : '$receiver' },
                { $lookup   :
                    {
                        from : 'users',
                        localField : 'sender_id',
                        foreignField : '_id',
                        as: 'sender'
                    },
                },
                { $unwind   : '$sender' },
                { $project  :
                    {
                        _id : 1,
                        'message_details.sender_id' : 1,
                        'message_details.receiver_id' : 1,
                        'message_details.sender_last_active': { $ifNull : [ '$sender.last_active', 0 ] },
                        'message_details.receiver_last_active' : { $ifNull : [ '$receiver.last_active', 0 ] },
                    }
                },
            ]
        );

        return messages;
    }

    /**
     *
     * @param { String } user_id
     *
     * @return { Object } of message details that matched the keyword
     */
    async getMessages(user_id)
    {
        let res = await User.aggregate(
            [
                { $match : { '_id' :  MONGOOSE.mongo.ObjectId(user_id) } },
                { $unwind : '$chat_info' },
                {
                    '$group' : {
                        '_id' : {
                            id          : '$_id',
                            chat_id     : '$chat_info.chat_id',
                            chat_type   : '$chat_info.chat_type',
                            user_id     : '$chat_info.user_id',
                            messages    : '$messages.message_details',
                        }
                    }
                },
                { $addFields : { 'chat_id': { '$toObjectId': '$_id.chat_id' } } },
                { $addFields : { 'user_id': { '$toObjectId': '$_id.user_id' } } },
                {
                    $lookup   :
                    {
                        from            : 'message',
                        localField      : 'chat_id',
                        foreignField    : '_id',
                        as              : 'messages'
                    },
                },
                {
                    $lookup :
                    {
                        from            : 'users',
                        localField      : 'user_id',
                        foreignField    : '_id',
                        as              : 'friend'
                    }
                },
                {
                    '$group' : {
                        '_id' : '$_id.chat_type',
                        'data' :{
                            '$push' : {
                                'chat_id'       : '$_id.chat_id',
                                'messages'      : '$messages',
                                'friend_user_id': '$_id.user_id',
                                'last_active'   : {
                                    '$cond': {
                                        if      : { $in : ['$_id.chat_type', ['friends', 'barter']] },
                                        then    : '$friend.last_active',
                                        else    : null
                                    }
                                }
                            }
                        }
                    }
                },
            ]
        );

        return res;
    }

    /**
     *
     * @param { String } chat_id
     * @param { String } message_id
     *
     * @return { Array }
     */
    async isMessageExist(chat_id, message_id)
    {
        let res = await this.collection.aggregate(
            [
                { $unwind : '$message_details' },
                { $match : { '_id' :  MONGOOSE.mongo.ObjectId(chat_id), 'message_details.message_id' : message_id } },
            ]
        );

        return (res.length !== 0) ? true : false;
    }

    /**
     *
     * @param { String } sender_id
     * @param { String } chat_id
     * @param { String } message_id
     *
     * @return { Array }
     */
    async updateReadMessage(sender_id, chat_id, message_id, type)
    {
        chat_id             = MONGOOSE.mongo.ObjectId(chat_id);
        let messages        = await this.collection.findOne({ _id : chat_id }, { _id: 0, message_details : 1 });
        let is_message_met  = false;
        let sender_username = await this.getSenderUsername(sender_id);


        for (let count = 0; count < messages.message_details.length; count++) {
            let condition = '';

            if (type == 'group') {
                condition = (messages.message_details[count].sender_id != sender_id && ((typeof messages.message_details[count].read_username != 'undefined' && !messages.message_details[count].read_username.includes(sender_username)) || typeof messages.message_details[count].read_username == 'undefined'));
            } else {
                condition = (messages.message_details[count].receiver_id == sender_id);
            }

            if (!is_message_met && condition) {
                let update  = {};
                let query   = {
                    '_id'                           : chat_id,
                    'message_details.message_id'    : messages.message_details[count].message_id
                };

                if (type == 'group') {
                    update = {
                        'message_details.$.is_read' : true,
                        $push : {
                            'message_details.$.read_username' : sender_username
                        }
                    };
                } else {
                    update = {
                        'message_details.$.is_read' : true
                    };
                }

                await this.collection.updateOne(
                    query,
                    update
                );
            }

            if (message_id == messages.message_details[count].message_id) {
                is_message_met = true;
                return;
            }

        }
    }

    /**
     *
     * @param { String } sender_id
     *
     * @return { String }
     */
    async getSenderUsername(sender_id)
    {
        let res = await User.findOne({ _id : MONGOOSE.mongo.ObjectId(sender_id) }, { _id : 0, username: 1 });

        return res ? res.username : '';
    }
}

module.exports = MDB_MESSAGE;