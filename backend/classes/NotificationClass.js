const MDB_NOTIFICATION = require('../models/MDB_NOTIFICATIONS');

const mdb_notifs        = new MDB_NOTIFICATION();

module.exports = class NotificationClass {
    constructor(notification_details = null) {
        this.notification_details = notification_details;
    }

    async createNotification() {
        let res = {};
        try {

            res.status = "success";

            if(Array.isArray(this.notification_details.user_id) == true)
            {
                for(let user_id of this.notification_details.user_id)
                {
                    let custom_notification_info =
                    {
                        user_id             : user_id,
                        identification_id   : this.notification_details.identification_id,
                        profile_pic_path    : this.notification_details.profile_pic_path,
                        avatar_gender       : this.notification_details.avatar_gender,
                        message             : this.notification_details.message,
                        title               : this.notification_details.title,
                        subject             : this.notification_details.subject,
                        date_created        : this.notification_details.date_created,
                        date_opened         : '',
                        is_open             : false,
                    }
                    await mdb_notifs.add(custom_notification_info);
                }
                res.data = 'success';
            }
            else
            {
                let notification_info =
                {
                    user_id             : this.notification_details.user_id,
                    identification_id   : this.notification_details.identification_id ,
                    item_id             : this.notification_details.item_id,
                    profile_pic_path    : this.notification_details.profile_pic_path,
                    avatar_gender       : this.notification_details.avatar_gender,
                    message             : this.notification_details.message,
                    title               : this.notification_details.title,
                    date_created        : this.notification_details.date_created,
                    date_opened         : '',
                    is_open             : false,
                    buyer_id            : this.notification_details.buyer_id,
                    item_id            	: this.notification_details.item_id,
                }
                
                res.data = await mdb_notifs.add(notification_info);
            }
        }
        catch (error) {
            res.status = "error";
            res.message = error.message;
        }
        return res;
    }

    async getNotifications() {
        let response = {};
        try{
            const query_result = await mdb_notifs.findNotificationById(this.notification_details.user_id);
            response.status = 'success';
            response.data   = query_result;

        }catch(error){
            response.status  = 'error';
            response.message = error.message;
        }
        return response;
    }

    async deleteNotification()
    {
        let response = {};
        try{
            const query_result = await mdb_notifs.deleteNotification(this.notification_details._id);
            response.status = 'success';
            response.data   = 'success'
        }catch(error){
            response.status = 'error';
            response.data   = 'error';
        }
        return response;
    }

    async openNotif()
    {
        let response = {};
        try{
            const query_result = await mdb_notifs.updateNotificationById(this.notification_details._id);
            response.status = 'success';
            response.data   = query_result;
        }catch(error){
            response.status = 'error' ;
            response.data   = error.message ;
        }
        return response;
    }
}
