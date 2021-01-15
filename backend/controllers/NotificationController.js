// Title: Client Notification
// Author: Andrea Lyn Destajo
// Date: October 2020
// Contributor: 
const NotificationClass  = require('../classes/NotificationClass');

module.exports = {
 
    async getNotifications(req, res)
    {
        const notification_class = new NotificationClass(req.body);
        const notification_response = await notification_class.getNotifications();
        if(notification_response.status == 'success')
        {
            res.json(notification_response.data).status(200);
        }
        else
        {
            res.json(notification_response.message).status(400);
        }
    },

    async deleteNotification(req, res)
    {
        const notification_class = new NotificationClass(req.body);
        const notification_response = await notification_class.deleteNotification();
        
        if(notification_response.data == 'success')
        {
            res.json(notification_response.data).status(200);
        }else
        {
            res.json(notification_response.data).status(400);
        }
    },

    async openNotif(req, res)
    {
        const notification_class = new NotificationClass(req.body);
        const notification_response = await notification_class.openNotif()

        if(notification_response.status == 'success')
        {
            res.json(notification_response.data).status(200);
        }
        else
        {
            res.json(notification_response.data).status(400);
        }
    },

    async createNotification(req, res)
    {
        let notification_details = {

            user_id             : req.body.user_id,
            identification_id   : req.body.identification_id,
            profile_pic_path    : 'BRT.png',
            avatar_gender       : 'default',
            message             : req.body.message,
            title               : 'Reminder',
            subject             : req.body.subject,
            date_created        : Date.now(),
        }

        const notification_class    = new NotificationClass(notification_details);
        const notification_response = await notification_class.createNotification();

        if(notification_response.status == 'success')
        {
            res.json(notification_response.data).status(200);
        }
        else
        {
            res.json(notification_response.data).status(400);
        }
    }
}

