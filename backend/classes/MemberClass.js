const moment                = require('moment');
const MDB_USER              = require('../models/MDB_USER');
const MDB_REFERENCES        = require('../models/MDB_REFERENCES');
const MDB_ITEM_REACTS       = require('../models/MDB_ITEM_REACTS');
const MDB_NEWS_FEED         = require('../models/MDB_NEWS_FEED');
const MDB_NEWS_FEED_COMMENTS         = require('../models/MDB_NEWS_FEED_COMMENTS');
const MDB_NEWS_FEED_REACTS  = require('../models/MDB_NEWS_FEED_REACTS');
const MDB_ITEMS             = require('../models/MDB_ITEMS');
const NotificationClass     = require('./NotificationClass');

module.exports = class MemberClass
{
    static async updateKyc(kyc)
    {
        let res = {};
        const mdb_user          = new MDB_USER();
        const mdb_references    = new MDB_REFERENCES();

        const user_res_obj      = await mdb_user.findById(kyc._id);

        let inc_kyc_submitted;
        let dec_kyc_status;

        if(user_res_obj.kyc_status == 'not submitted')
        {
            dec_kyc_status  = await mdb_references.decrementKycNotSubmitted();
        }
        if(user_res_obj.kyc_status == 'rejected')
        {
            dec_kyc_status  = await mdb_references.decrementKycRejected();
        }

        inc_kyc_submitted   = await mdb_references.incrementKycSubmitted();
        
        const kyc_res_obj   = await mdb_user.updateKyc(kyc);

        if (kyc_res_obj == null || kyc_res_obj == '')
        {
            res.status  = 'error';
            res.message = 'no document to update';
        }

        if(res.status == undefined || res.status == null || res.status == '')
        {
            res.status = 'success';
            res.kyc = kyc_res_obj;
        }

        return res;
    }

    static async updateKycStatus({_id, kyc_status, kyc_remarks})
    {
        let res = {};
        const mdb_user          = new MDB_USER();
        const mdb_references    = new MDB_REFERENCES();

        const kyc_res_obj   = await mdb_user.updateKycStatus({_id, kyc_status, kyc_remarks});

        if (kyc_res_obj == null || kyc_res_obj == '')
        {
            res.status      = 'error';
            res.message     = 'no to update';
        }

        if(res.status == undefined || res.status == null || res.status == '')
        {
            res.status      = 'success';
            res.kyc_update  = kyc_res_obj;

            if(kyc_status == 'reject')
            {
                await mdb_references.decrementKycSubmitted();
                await mdb_references.incrementKycRejected();

                // -----------Kyc Notification-----------------
                let notification_details =
                {
                    user_id : _id,
                    title: 'Account Rejected',
                    message: `Account has been rejected, Please check this detail: ${kyc_remarks}` ,
                    date_created: Date.now(),
                }
                let notification = new NotificationClass(notification_details);
                notification.createNotification();
                // --------------------------------------------

            }else if(kyc_status == 'approve'){
                await mdb_references.decrementKycSubmitted();
                await mdb_references.incrementKycApproved();
 
                let notification_details =
                {
                    // user_id: this.user_information.role_id,
                    user_id : '5f90347921e259119cb22fce',
                    title: 'Approved Account',
                    message: 'Congratulations! Your Baristrocat account is already verified. You can now start turning your things to bigger and better products.',
                    date_created: Date.now(),
                }
                let notification = new NotificationClass(notification_details);
                notification.createNotification();
 
            }
        }

        return res;
    }

    static async fetchUserKyc(_id)
    {
        let res = {}
        const mdb_user      = new MDB_USER();
        const kyc_res_obj   = await mdb_user.fetchUserKyc(_id);

        if (kyc_res_obj == null || kyc_res_obj == '')
        {
            res.status      = 'error';
            res.message     = 'no document found';
        }

        if (res.status == undefined || res.status == null || res.status == '')
        {
            res.status      = 'success';
            res.kyc         = kyc_res_obj;
        }

        return res;
    }

    static async fetchUserKyc(_id)
    {
        let res = {}
        const mdb_user      = new MDB_USER();
        const kyc_res_obj   = await mdb_user.fetchUserKyc(_id);

        if (kyc_res_obj == null || kyc_res_obj == '')
        {
            res.status      = 'error';
            res.message     = 'no document found';
        }

        if (res.status == undefined || res.status == null || res.status == '')
        {
            res.status      = 'success';
            res.kyc         = kyc_res_obj;
        }

        return res;
    }

    static async fetchKyc(kyc_status)
    {
        let res = {};
        const mdb_user      = new MDB_USER();
        const kyc_res_obj   = await mdb_user.fetchKyc(kyc_status);

        if (kyc_res_obj == null || kyc_res_obj == '')
        {
            res.status  = 'error';
            res.message = 'no documents found';
        }

        if(res.status == undefined || res.status == null || res.status == '')
        {
            res.status  = 'success';
            res.kyc     = kyc_res_obj;
        }

        return res;

    }

    static async fetchUserItemReact({item_id, user_id})
    {
        let res = {};


        const mdb_item_reacts       = new MDB_ITEM_REACTS();
        const user_item_react_obj   = await mdb_item_reacts.fetchUserItemReact({item_id, user_id});

        return user_item_react_obj;
    }

    static async fetchPostedItem({skip, limit})
    {
        let res = {};

        const mdb_news_feed     = new MDB_NEWS_FEED();
        let posted_item_res_obj = await mdb_news_feed.fetchPostedItems({updated_timestamp: 'desc'}, {skip, limit});

        if(posted_item_res_obj == undefined)
        {
            res.status          = 'error';
        }

        if(posted_item_res_obj != undefined)
        {
            res.status          = 'success';
            res.posted_items    = posted_item_res_obj;
        }

        return res;
    }

    static async sharePostGlobal({original_post, post_type, caption, first_name, middle_name, last_name})
    {
        let res = {};
        let new_post_type = post_type == 'original' ? 'shared' : post_type;

        const mdb_news_feed         = new MDB_NEWS_FEED();
        const mdb_items             = new MDB_ITEMS();

        const share_post_res_obj    = await mdb_news_feed.sharePostGlobal({original_post, post_type: new_post_type, caption, first_name, middle_name, last_name});
        // const item_share_res_obj    = await mdb_items.incrementShareCount(share_post_res_obj.item_id);

        if(share_post_res_obj == '' || share_post_res_obj == {} )
        {
            res.status = 'error';
        }

        if(share_post_res_obj != '' && share_post_res_obj != {})
        {
            res.status = 'success';

            // // -----------Share Notification-----------------
            // let notification_details =
            // {
            //     user_id : '5fae92b027d3ed355002e89a',
            //     title: 'Shared',
            //     message: '${first_name} ${last_name} shared your post.',
            //     date_created: Date.now(),
            // }
            // let notification = new NotificationClass(notification_details);
            // notification.createNotification();,
            // // ---------------------------------------------------------------
        }
        

        return res;
    }

    static async fetchOriginalPost(filters = {})
    {
        let res                     = {};
        let mdb_news_feed           = new MDB_NEWS_FEED();
        let original_post_res_obj   = await mdb_news_feed.fetchOriginalPost(filters);

        if (original_post_res_obj == null)
        {
            res.status = 'error';
        }

        if(original_post_res_obj != null)
        {
            res.status          = 'success';
            res.original_post   = original_post_res_obj;
        }

        return res;

    }

    static async react({user_id, post_id, react})
    {
        let res = {};
        let react_res;
        let update_count;
        const now = moment().format('x');
        const mdb_news_feed         = new MDB_NEWS_FEED();
        const mdb_news_feed_reacts  = new MDB_NEWS_FEED_REACTS();

        // find if react record exist
        const is_react_exists       = await mdb_news_feed_reacts.isExist({user_id, news_feed_id: post_id, react});
        if(is_react_exists == false)
        {
            // add react
            update_count                = await mdb_news_feed.increaseReactCount({_id: post_id, react});
            react_res                   = await mdb_news_feed_reacts.addReact({news_feed_id: post_id, react, user_id, created_timestamp: now, updated_timestamp: now});

            res.react_state = 'added';
        }

        if(is_react_exists == true)
        {
            // remove react
            update_count                = await mdb_news_feed.decreaseReactCount({_id: post_id, react});react_res                   = await mdb_news_feed_reacts.removeReact({news_feed_id: post_id, react, user_id});

            res.react_state = 'removed';
        }

        if(update_count != null || react_res != null)
        {
            res.status          = 'success';
            res.react_details   = {react_res: {...react_res._doc}, update_count: {...update_count._doc}};
            // res.state           =  is_react_exists ? 'removed' : 'added'}
        }
        else
        {
            res.status          = 'error';
        }

        return res;
    }

    static async fetchUserReact({user_id, post_id})
    {
        let res = {};
        const mdb_news_feed_reacts  = new MDB_NEWS_FEED_REACTS();
        const react_res             = await mdb_news_feed_reacts.fetchUserReact({user_id, post_id});

        if(react_res == null|| (react_res.news_feed_id != '' && react_res.react != '' && react_res.user_id != '' ))
        {
            res.status  = 'success';
            res.react   = react_res;
        }
        else
        {
            res.status  = 'error';
        }

        return res;
        
    }

    static async fetchNewsfeed(filters = {})
    {
        let res             = {};
        const mdb_news_feed = new MDB_NEWS_FEED();

        const newsfeed_res_obj = await mdb_news_feed.fetchPost(filters, {reacts: 1, comment: 1});

        if(newsfeed_res_obj == null)
        {
            res.status  = 'error';
        }
        else
        {
            res.status  = 'success';
            res.newsfeed= newsfeed_res_obj;
        }

        return res;
    }

    static async fetchPostComments({skip, newsfeed_id})
    {
            let res                 = {};
            const mdb_newsfeed_comments = new MDB_NEWS_FEED_COMMENTS();

            let comments_res_obj        = await mdb_newsfeed_comments.fetchPostComments({skip, newsfeed_id});

            if(comments_res_obj == null)
            {
                res.status  = 'error';
            }

            if(comments_res_obj.length >= 0)
            {
                let comments    = [];
                if(comments_res_obj.length > 0)
                {
                    const mdb_user  = new MDB_USER();

                    for(let i = 0; i < comments_res_obj.length; i++)
                    {
                        let user_res_obj = await mdb_user.findById(comments_res_obj[i].user_id);
                        comments.push(
                            {
                                ...comments_res_obj[i]._doc,
                                first_name  : user_res_obj.first_name,
                                middle_name : user_res_obj.middle_name,
                                last_name   : user_res_obj.last_name
                            }
                        )
                    }
                }
                
                res.status      = 'success';
                res.comments    = comments;
            }


            return res;
    }
}
