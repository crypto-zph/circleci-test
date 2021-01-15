const MDB_MESSAGE       = require('../models/MDB_MESSAGE');
const MDB_EMOJI         = require('../models/MDB_EMOJI');
const MDB_USER          = require('../models/MDB_USER');
const mdb_message       = new MDB_MESSAGE();
const mdb_emoji_list    = new MDB_EMOJI();
const fs                = require('fs');
const NotificationClass = require('./NotificationClass');

module.exports = class MessageClass
{
    constructor(message_information = null)
    {
        this.message_information = message_information;
        this.mdb_message = new MDB_MESSAGE();
    }

    async getMessage()
    {
        let res = {};

        let message_id = this.message_information;
        try {

            const msg = await mdb_message.findByMessageId( {_id: message_id} );
            res.status = "success";
            res.data = msg;

        } catch (error) {
            res.status = "error";
            res.message = error.message;
        }
        return res;
    }

    async sendMessage()
    {
        let res = {};
        let generate_id = this.getRandomNumber();

        try {
            res.status = "success";

            if(this.message_information.message && this.message_information.filename.length > 0)
            {
                const msg = await mdb_message.findMessageAndUpdate(
                    { _id: this.message_information.chat_id },
                    {
                    $push :
                    {
                        message_details:
                        [{
                            message_id:         generate_id,
                            message:            this.message_information.message,
                            created_timestamp:  Date.now(),
                            updated_timestamp:  Date.now(),
                            created_at:         Date.now(),
                            updated_at:         Date.now(),
                            date_created:       Date.now(),
                            chat_id:            this.message_information.chat_id,
                            sender_id:          this.message_information.sender_id,
                            sender_username:    this.message_information.sender_username,
                            receiver_id:        this.message_information.receiver_id,
                            receiver_username:  this.message_information.receiver_username,
                            message_type:       'text',
                            is_first:           this.message_information.is_first
                        }]
                    }
                    });

                    for(let i=0;i<this.message_information.filename.length;i++)
                    {
                        const msg = await mdb_message.findMessageAndUpdate(
                            { _id: this.message_information.chat_id },
                            {
                            $push :
                            {
                                message_details:
                                [{
                                    message_id          :generate_id,
                                    message:            this.message_information.filename[i],
                                    created_timestamp:  Date.now(),
                                    updated_timestamp:  Date.now(),
                                    created_at:         Date.now(),
                                    updated_at:         Date.now(),
                                    date_created:       Date.now(),
                                    chat_id:            this.message_information.chat_id,
                                    sender_id:          this.message_information.sender_id,
                                    sender_username:    this.message_information.sender_username,
                                    receiver_id:        this.message_information.receiver_id,
                                    receiver_username:  this.message_information.receiver_username,
                                    message_type:       this.message_information.message_type,
                                    is_first:           this.message_information.is_first
                                }]
                            }
                            });
                    }
            }
            else if(this.message_information.message)
            {
                const msg = await mdb_message.findMessageAndUpdate(
                    { _id: this.message_information.chat_id },
                    {
                    $push :
                    {
                        message_details:
                        [{
                            message_id          :generate_id,
                            message:            this.message_information.message,
                            created_timestamp:  Date.now(),
                            updated_timestamp:  Date.now(),
                            created_at:         Date.now(),
                            updated_at:         Date.now(),
                            date_created:       Date.now(),
                            chat_id:            this.message_information.chat_id,
                            sender_id:          this.message_information.sender_id,
                            sender_username:    this.message_information.sender_username,
                            receiver_id:        this.message_information.receiver_id,
                            receiver_username:  this.message_information.receiver_username,
                            message_type:       this.message_information.message_type,
                            is_first:           this.message_information.is_first,
                        }]
                    }
                    });
            }
            else if(this.message_information.filename.length > 0)
            {
                for(let i=0;i<this.message_information.filename.length;i++)
                {
                    const msg = await mdb_message.findMessageAndUpdate(
                    { _id: this.message_information.chat_id },
                    {
                    $push :
                    {
                        message_details:
                        [{
                            message_id          :generate_id,
                            message:            this.message_information.message == '' ? this.message_information.filename[i] : this.message_information.message,
                            created_timestamp:  Date.now(),
                            updated_timestamp:  Date.now(),
                            created_at:         Date.now(),
                            updated_at:         Date.now(),
                            date_created:       Date.now(),
                            chat_id:            this.message_information.chat_id,
                            sender_id:          this.message_information.sender_id,
                            sender_username:    this.message_information.sender_username,
                            receiver_id:        this.message_information.receiver_id,
                            receiver_username:  this.message_information.receiver_username,
                            message_type:       this.message_information.message_type,
                            is_first:           this.message_information.is_first
                        }]
                    }
                    });
                }
            }
            // else
            // {
            //     await mdb_message.add(message_details);
            // }

        }
        catch (error) {
            res.status = "error";
            res.message = error.message;
        }
        return res;
    }

    async getUsers()
    {
        this.mdb_user = new MDB_USER();

        let res = {};
        let users = await this.mdb_user.doc(this.message_information);

        for(let x = 0; x < users.chat_info.length; x++)
        {
            let a = await this.mdb_user.doc(users.chat_info[x].user_id);
        }

        res.status = 'success';
        res.data = users.chat_info;

        return res;
    }

    // galing product details
    async initiateChat()
    {
        this.message_information.user_id = this.message_information.user_id + '';
        let generate_id = this.getRandomNumber();
        // console.log(this.message_information)
        // return;

        this.mdb_user = new MDB_USER();

        let my_info = await this.mdb_user.doc(this.message_information.my_info._id);
        let other_prsn_info = await this.mdb_user.doc(this.message_information.user_id);

        let res = {};

        // let filter = await this.current_data2.filter(x => moment(x.date_created).tz("Europe/London").format("DD-MMM-YYYY") == today)

        let filter = await my_info.chat_info.filter(x => x.prod_id == this.message_information.prod_id);
        // let filter = await my_info.chat_info.map(x => x.user_id);
        // console.log('filter', filter);
        if(filter.length < 1)
        {
            const msg = "Hi, I am interested in the posted product.";
            let newMessage = await this.mdb_message.add();
            // console.log('nm', newMessage);
            let sdad = await mdb_message.findMessageAndUpdate(
                { _id: newMessage._id},
                {
                prod_id: this.message_information.prod_id,
                $push : {
                    message_details:
                    [{
                        message_id: generate_id,
                        message:            msg,
                        created_timestamp:  Date.now(),
                        updated_timestamp:  Date.now(),
                        created_at:         Date.now(),
                        updated_at:         Date.now(),
                        date_created:       Date.now(),
                        sender_username:    this.message_information.my_info.username ? this.message_information.my_info.username : this.message_information.my_info.first_name,
                        sender_id:          this.message_information.my_info._id,
                        receiver_username:  this.message_information.username,
                        receiver_id:        this.message_information.user_id,
                        chat_name:          this.message_information.username +" * "+this.message_information.item_name,
                        message_type:       'text',
                        is_first:           'true'
                    }]
                }
                });
            // console.log('u', sdad);

            let my_chat_info = {
                chat_id: newMessage._id + '',
                user_name: this.message_information.username,
                user_id: this.message_information.user_id,
                chat_name: this.message_information.username +" * "+this.message_information.item_name,
                prod_id: this.message_information.prod_id,
                chat_type: 'barter'
            }
            let other_chat_info = {
                chat_id: newMessage._id + '',
                user_name: this.message_information.my_info.username ? this.message_information.my_info.username : this.message_information.my_info.first_name,
                user_id: this.message_information.my_info._id,
                chat_name: this.message_information.username +" * "+this.message_information.item_name,
                prod_id: this.message_information.prod_id,
                chat_type: 'barter'
            }

            let my_arr = my_info.chat_info;
            let other_arr = other_prsn_info.chat_info;

            my_arr.push(my_chat_info);
            other_arr.push(other_chat_info);

            my_info.chat_info = my_arr;
            other_prsn_info.chat_info = other_arr;

            await this.mdb_user.updateUser(this.message_information.my_info._id, {chat_info: my_info.chat_info});
            await this.mdb_user.updateUser(this.message_information.user_id, {chat_info: other_prsn_info.chat_info});
            // console.log('result', result)
            // chat_info.is_online = result.is_online;
            // chat_info.item_name = this.message_information.item_name;
            res.data = my_arr;
        }
        else
        {
            // filter.item_name = this.message_information.item_name;
            res.data = filter;
            // console.log('res', res.data)
        }

        res.status = "success";

        // console.log('res', res);
        return res;
    }

    async getChatMatesStatus()
    {
        let res = {};

        this.mdb_user = new MDB_USER();
        let chatmates_info_arr = [];
        let chatmates_info_obj = {
            user_id   : '',
            username  : '',
            timestamp : 0
        }
        // console.log(this.message_information)
        // for(let i=0;i<this.message_information.length;i++)
        // {
            let data = await this.mdb_user.doc(this.message_information);
            // console.log(data.last_active)
            chatmates_info_obj = {
                user_id : this.message_information,
                username : data.username,
                timestamp : data.last_active
            }
            // chatmates_info_arr.push(chatmates_info_obj);
        // }
        res.data = chatmates_info_obj;
        res.status = 'success';

        return res;
    }

    async addEmoji()
    {
        let res = {};

        this.mdb_emoji_list = new MDB_EMOJI();
        // console.log(this.message_information)
        let data = await this.mdb_emoji_list.add(this.message_information.emoji_details);

        // console.log(data);
    }

    async getEmojiList()
    {
        let res = {};
        this.mdb_emoji_list = new MDB_EMOJI();

        let data = await this.mdb_emoji_list.fetchEnabledEmoji();

        res.data = data;
        res.status = 'success';

        return res;
    }

    async updateChatEmoji()
    {
        let res = {};

        let data = await mdb_message.update(this.message_information.chat_id,
            { emoji: this.message_information.emoji_name });

        res.data   = 'success';
        res.status = 'success';

        return res;
    }

    async addGroupChat()
    {
        let res = {};
        let username_arr = [];
        let generate_id = this.getRandomNumber();
        this.mdb_user = new MDB_USER();

        // console.log(this.message_information.members.length)

        let newMessage = await this.mdb_message.add();

        for(let i=0;i<this.message_information.members.length;i++)
        {
            // console.log(i, this.message_information.members[i])
            let my_info = await this.mdb_user.doc(this.message_information.members[i]);
            // console.log(i, my_info.username)
            username_arr.push(my_info.username)
        }

        await mdb_message.findMessageAndUpdate(
            { _id: newMessage._id },
            {
            $push : {
                message_details:
                [{
                    message_id:         generate_id,
                    message:            'Welcome to the group',
                    created_timestamp:  Date.now(),
                    updated_timestamp:  Date.now(),
                    created_at:         Date.now(),
                    updated_at:         Date.now(),
                    date_created:       Date.now(),
                    sender_username:    this.message_information.my_info.username ? this.message_information.my_info.username : this.message_information.my_info.first_name,
                    sender_id:          this.message_information.my_info._id,
                    receiver_username:  username_arr,
                    chat_name:          this.message_information.group_name,
                    message_type:       'text',
                    is_first:           'true'
                }]
            }
            });

            for(let i=0;i<this.message_information.members.length;i++)
            {
                let my_info = await this.mdb_user.doc(this.message_information.members[i]);
                let chat_info = {
                    chat_id: newMessage._id + '',
                    user_name: username_arr,
                    chat_name: this.message_information.group_name,
                    chat_type: this.message_information.chat_type
                }
                let arr = my_info.chat_info;
                arr.push(chat_info);
                my_info.chat_info = arr;

                await this.mdb_user.updateUser(this.message_information.members[i], {chat_info: my_info.chat_info});
                // console.log('result' + i, result)
            }

            res.data = 'success';
            res.status = 'success';

            return res;

    }

    async initiateChatPersonal()
    {
        // console.log(this.message_information)
        this.mdb_user = new MDB_USER();

        let my_info = await this.mdb_user.doc(this.message_information.my_info._id);
        let other_prsn_info = await this.mdb_user.doc(this.message_information.user_id);
        // console.log('my info', my_info);
        // console.log('other info', other_prsn_info);

        // return;
        let res = {};

        // let filter = await this.current_data2.filter(x => moment(x.date_created).tz("Europe/London").format("DD-MMM-YYYY") == today)

        let my_filter = await my_info.chat_info.filter(x => x.user_id == this.message_information.user_id);
        let other_filter = await other_prsn_info.chat_info.filter(x => x.user_id == this.message_information.my_info._id);
        // let filter = await my_info.chat_info.map(x => x.user_id);
        // console.log('filter', my_filter);
        // console.log('other filter', other_filter);

        // return;
        if(my_filter.length < 1 && other_filter < 1)
        {
            const msg = "Hi, I want to connect with you.";
            let generate_id = this.getRandomNumber();
            let newMessage = await this.mdb_message.add();
            await mdb_message.findMessageAndUpdate(
                { _id: newMessage._id },
                {
                $push : {
                    message_details:
                    [{
                        message_id:         generate_id,
                        message:            msg,
                        created_timestamp:  Date.now(),
                        updated_timestamp:  Date.now(),
                        created_at:         Date.now(),
                        updated_at:         Date.now(),
                        date_created:       Date.now(),
                        sender_username:    this.message_information.my_info.username ? this.message_information.my_info.username : this.message_information.my_info.first_name,
                        sender_id:          this.message_information.my_info._id,
                        receiver_username:  this.message_information.username,
                        receiver_id:        this.message_information.user_id,
                        message_type:       'text',
                        is_first:           'true'
                        // chat_name:          this.message_information.username +" * "+this.message_information.item_name
                    }]
                }
                });
            let my_chat_info = {
                chat_id: newMessage._id + '',
                user_name: this.message_information.username,
                user_id: this.message_information.user_id,
                chat_type: 'friends'
                // chat_name: this.message_information.username +" * "+this.message_information.item_name
            }
            let other_chat_info = {
                chat_id: newMessage._id + '',
                user_name: this.message_information.my_info.username ? this.message_information.my_info.username : this.message_information.my_info.first_name,
                user_id: this.message_information.my_info._id,
                chat_type: 'friends'
            }
            let my_arr = my_info.chat_info;
            let other_arr = other_prsn_info.chat_info;

            my_arr.push(my_chat_info);
            other_arr.push(other_chat_info);

            my_info.chat_info = my_arr;
            other_prsn_info.chat_info = other_arr;

            let result = await this.mdb_user.updateUser(this.message_information.my_info._id, {chat_info: my_info.chat_info});
            let other_result = await this.mdb_user.updateUser(this.message_information.user_id, {chat_info: other_prsn_info.chat_info});

            // console.log('result', result);
            // console.log('other result', other_result);
            // // chat_info.is_online = result.is_online;
            // // chat_info.item_name = this.message_information.item_name;
            res.data = my_chat_info;

        // -----------Notify First Message -----------------
        let notification_details =
        {
            user_id : this.message_information.user_id,
            title: `New Message`,
            message: `${ this.message_information.my_info.username ? this.message_information.my_info.username : this.message_information.my_info.first_name } wants to connect with you.`,
            date_created: Date.now(),
        }

        let notification = new NotificationClass(notification_details);
        notification.createNotification();
        // ----------------------------------------------------------------

        }
        else
        {
            // filter.item_name = this.message_information.item_name;
            res.data = my_filter;
            // console.log('res', res.data)
        }

        res.status = "success";

        return res;
    }

    async deleteMessage()
    {

        let res = {};
        console.log('class',this.message_information)
        try{
            const msg = await mdb_message.findMessageAndUpdate({ _id: this.message_information.chat_id },
                { $pull : {'message_details' : {message_id : this.message_information.message_id }}});

            if( this.message_information.message_type == 'images')
            {
                let image_path = `${process.cwd()}/${process.env.CHAT_IMG_DIR}/${this.message_information.text}`;
                console.log('image_path',image_path)
                fs.unlink(image_path, (err) => {
                    if (err) {
                        console.error(err)
                        return;
                    }
                });

            }
            res.status ='success';
        }
        catch(error){
            res.status = error.message;
            console.log(error)
        }
        return res;
    }

    getRandomNumber()
    {
        const numbers       = "0123456789";
        let random          = '';
        let length          = 12;

        for (let i = 0; i < length; i++) {
            let rand = Math.random() * (numbers.length - 0) + 0;
            random += numbers[parseInt(rand)];
        }

        console.log('random',random)
        return random;
    }

    /**
     *
     * @param { String } user_id
     *
     * @return { Object } of message details that matched the keyword
     */
    async getMessages(user_id)
    {
        let res = {};

        try {
            res.status = 'success';

            let search = await this.mdb_message.getMessages(user_id);

            res.data = search;
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }

    /**
     *
     * @param { String } sender_id
     * @param { String } chat_id
     * @param { String } message_id
     *
     * @return { Object }
     */
    async updateReadMessage(sender_id, chat_id, message_id, type)
    {
        let res = {};

        try {
            // check if chat_id with message_id exists
            let is_exist = await this.mdb_message.isMessageExist(chat_id, message_id);

            if (is_exist) {
                res.status = 'success';

                await this.mdb_message.updateReadMessage(sender_id, chat_id, message_id, type);
            } else {
                res.status  = 'error';
                res.message = 'Message not found!';
            }
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }
}
