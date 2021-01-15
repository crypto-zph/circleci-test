const MessageClass      = require('../classes/MessageClass');
const ItemClass         = require('../classes/ItemClass');
const AccountClass      = require('../classes/AccountClass');

module.exports =
{
    async sendMessage(req, res)
    {
        let filename = [];

        if(req.files)
        {
            for(let i=0;i<req.files.length;i++)
            {
                filename.push(req.files[i].filename);
            }
        }
        console.log(req.body)
        // return;
        // let user_message = req.body.newMessage;
        let message_details =
        {
            message: req.body.message,
            chat_id: req.body.chat_id,
            sender_id: req.body.sender_id,
            sender_username: req.body.sender_username,
            receiver_id: req.body.receiver_id,
            receiver_username: req.body.receiver_username,
            message_type: req.body.message_type,
            filename: filename,
            is_first: req.body.is_first
        }

        let message_class = new MessageClass(message_details);
        let message_data = await message_class.sendMessage();

        if (message_data.status == 'success') {
            res.status(200).send({ message: message_data.status })
        }
        else {
            res.status(400).send({ message: message_data.message })
        }
    },

    async getMessage(req, res)
    {
        let user_id = req.body.user_id;

        let message_class = new MessageClass(user_id);
        let message_data = await message_class.getMessage();

        if (message_data.status == 'success') {
            res.json(message_data.data).status(200);
        }
        else {
            res.json(message_data.message).status(400);
        }
    },

    async postGetUsers(req, res)
    {
        // console.log(req.body)
       let user_id = req.body.id;

       let message_class = new MessageClass(user_id);
       let message_data = await message_class.getUsers();

       if(message_data.status == 'success')
       {
           res.json(message_data.data).status(200);
       }
    },

    async getChatDetails(req, res)
    {
        let id = req.body.prod_id;

        let item_class = new ItemClass({id});
        let item_data  = await item_class.views();

        // console.log('session', req.session);
        // console.log('item data', item_data);

        if(item_data.status == 'success')
        {
            let id = item_data.seller_id;
            let ad = '';

            let account_class = new AccountClass({id});
            let account_data  = await account_class.getUser();
            // console.log('ad', account_data);
            if(account_data.status == 'success')
            {
                // console.log('add', ad);
                let new_chat_details = {
                    first_name: account_data.first_name,
                    last_name: account_data.last_name,
                    is_online: account_data.is_online,
                    user_id: id,
                    username: account_data.username ? account_data.username : account_data.first_name,
                    item_name: item_data.item_name,
                    my_info: req.session.user_info,
                    prod_id: req.body.prod_id
                }

                let message_class = new MessageClass(new_chat_details);
                let message_data  = await message_class.initiateChat();

                if(message_data.status == 'success')
                {
                    res.status(200).json(message_data.data);
                }
            }
            else
            {
                // console.log('error')
            }
        }

    },

    async getChatMatesStatus(req, res)
    {
        let message_class = new MessageClass(req.body.ids);
        let message_data = await message_class.getChatMatesStatus();

        if (message_data.status == 'success') {
            res.json(message_data.data).status(200);
        }
        else {
            res.json(message_data.message).status(400);
        }
    },

    async addEmoji(req, res)
    {
        let emoji_details = {
            emoji_name: req.body.emoji_name,
            created_at: Date.now()
        }


        let message_class = new MessageClass({emoji_details});
        let message_data = await message_class.addEmoji();

        if (message_data.status == 'success') {
            res.json(message_data.data).status(200);
        }
        else {
            res.json(message_data.message).status(400);
        }
    },

    async getEmojiList(req, res)
    {
        let message_class = new MessageClass();
        let message_data = await message_class.getEmojiList();

        if (message_data.status == 'success') {
            res.json(message_data.data).status(200);
        }
        else {
            res.json(message_data.message).status(400);
        }
    },

    async updateChatEmoji(req, res)
    {
        let details = {
            chat_id : req.body.chat_id,
            emoji_name : req.body.emoji_name
        }

        let message_class = new MessageClass(details);
        let message_data = await message_class.updateChatEmoji();

        if (message_data.status == 'success') {
            res.json(message_data.data).status(200);
        }
        else {
            res.json(message_data.message).status(400);
        }
    },

    async addGroupChat(req, res)
    {
        let group_details = {
            group_name : req.body.group_name,
            members    : req.body.members,
            my_info    : req.session.user_info,
            chat_type  : req.body.chat_type
        }

        let message_class = new MessageClass(group_details);
        let message_data = await message_class.addGroupChat();

        if(message_data.status == 'success') {
            res.status(200).json(message_data.data);
        }else {
            res.status(400).json(message_data.message);
        }
    },

    async getChatDetailsPersonal(req, res)
    {
        let id = req.body.user_id;

        let account_class = new AccountClass({id});
        let account_data  = await account_class.getUser();
            // console.log('ad', account_data);
            // return;
        if(account_data.status == 'success')
        {
            // console.log('add', ad);
            let new_chat_details = {
                user_id: id,
                username: account_data.username ? account_data.username : account_data.first_name,
                my_info: req.session.user_info
            }

            let message_class = new MessageClass(new_chat_details);
            let message_data  = await message_class.initiateChatPersonal();

            if(message_data.status == 'success')
            {
                res.status(200).json(message_data.data);
            }
        }
        else
        {
            // console.log('error')
        }
    },

    async deleteMessage(req, res)
    {
        console.log('controller',req.body)
        let message_class = new MessageClass(req.body);
        let response      = await message_class.deleteMessage();

        if(response.status == 'success')
        {
            res.json(response.data).status(200)
        }
        else
        {
            res.json(response.data).status(400)
        }
    },

    async getMessages(req, res)
    {
        let user_id = req.user_info._id;

        let message_class   = new MessageClass();
        let message_data    = await message_class.getMessages(user_id);

        if (message_data.status == 'success') {
            res.status(200).json(message_data);
        } else {
            res.status(400).json(message_data);
        }
    },

    async updateReadMessage(req, res)
    {
        let sender_id   = req.user_info._id;
        let chat_id     = req.body.chat_id;
        let message_id  = req.body.message_id;
        let type        = req.body.type;

        let message_class   = new MessageClass();
        let update_read     = await message_class.updateReadMessage(sender_id, chat_id, message_id, type);

        if (update_read.status == 'success') {
            res.status(200).json(update_read);
        } else {
            res.status(400).json(update_read);
        }
    },
}
