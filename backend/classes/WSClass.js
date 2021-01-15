const moment                = require('moment');
const MDB_USER              = require('../models/MDB_USER');
const MDB_NEWS_FEED         = require('../models/MDB_NEWS_FEED');
const MDB_NEWS_FEED_COMMENTS= require('../models/MDB_NEWS_FEED_COMMENTS');
const NotificationClass     = require('./NotificationClass');

module.exports = class AdminClass
{
    constructor()
    {

    }

    static async addPostComment({user_id, comment, newsfeed_id})
    {
        const mdb_newsfeed          = new MDB_NEWS_FEED();
        const mdb_newsfeed_comments = new MDB_NEWS_FEED_COMMENTS();
        const mdb_user              = new MDB_USER();

        let comment_res_obj         = await mdb_newsfeed_comments.addPostComment({user_id, comment, newsfeed_id});
        let user_res_obj            = await mdb_user.findById(comment_res_obj.user_id);
        let newsfeed_res_obj        = await mdb_newsfeed.incrementCommentCount({_id: newsfeed_id});

        let res = {};

        if(comment_res_obj == null || comment_res_obj == '')
        {
            res.status  = 'error';
            res.message = comment_res_obj;
        }

        if(comment_res_obj != null || comment_res_obj != '')
        {
            
            res.status  = 'success';
            res.comment = {
                ...comment_res_obj._doc,
                first_name  : user_res_obj.first_name,
                middle_name : user_res_obj.middle_name,
                last_name   : user_res_obj.last_name
            };
            
            // ----------- Comment  Notification--------------------------
            let notification_details =
            {
                user_id: user_id,	
                message: `${res.comment} commented on your post.`,	
                date_created: Date.now(),	
            }	
            let notification = new NotificationClass(notification_details);	
            notification.createNotification();	

            // -------------------------------------------------------------
        }

        return res;
    }
}
