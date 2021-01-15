const MemberClass   = require('../classes/MemberClass');
const CategoryClass = require('../classes/CategoryClass');
const AdminClass    = require('../classes/AdminClass');

module.exports = 
{
    async updateKyc(req, res)
    {
        const kyc = {
            _id                         : req.session.user_info._id,
            first_name                  : req.body.firstname,
            middle_name                 : req.body.middlename,
            last_name                   : req.body.lastname,
            birth_date                  : req.body.birthdate,
            country                     : req.body.country,
            nationality                 : req.body.nationality,
            contact_code                : req.body.contact_code,
            contact_number              : req.body.contact,
            address_line                : req.body.address_line,
            street                      : req.body.street,
            city                        : req.body.city,
            zip_code                    : req.body.zip_code,
            has_other_id                : req.body.has_other_id,
            identification_card         : req.body.identification_card,
            id_number                   : req.body.id_number,
            id_has_expiry               : req.body.id_has_expiry,
            id_expiry                   : req.body.id_expiry,
            id_image                    : 'id/'     + req.files.id_image[0].filename,
            selfie_image                : 'selfie/' + req.files.selfie_image[0].filename,
            has_other_security_question : req.body.has_other_security_question,
            security_question           : req.body.security_question,
            security_answer             : req.body.security_answer,
            kyc_status                      : 'submitted'
        };

        const kyc_res_obj   = await MemberClass.updateKyc(kyc);

        if(kyc_res_obj.status == 'success')
        {
            res.json({status: 'success', kyc: kyc_res_obj.kyc}).status(200);
        }
        else
        if(kyc_res_obj.status == 'error')
        {
            res.json({status: 'error', message: kyc_res_obj.message}).status(400);
        }
    },

    async updateKycStatus(req, res)
    {
        const kyc_res_obj = await MemberClass.updateKycStatus({_id: req.body._id, kyc_status: req.body.kyc_status, kyc_remarks: req.body.remarks});

        if(kyc_res_obj.status == 'success')
        {
            res.json({status: 'success', kyc_update: kyc_res_obj}).status(200);
            
            // -------- Admin Activity Logs --------
            const admin_class = new AdminClass();
            const date_created = Date.now();
            const capitalize = (s) => {
                if (typeof s !== 'string') return '';
                return s.charAt(0).toUpperCase() + s.slice(1);
            }
            admin_class.adminActivityLogs(req.session.admin_user, `${capitalize(kyc_res_obj.kyc_update.kyc_status)} ${kyc_res_obj.kyc_update.first_name} ${kyc_res_obj.kyc_update.last_name}'s KYC`, '-', date_created);
            // ------------- Paul Musa -------------
        }
        else
        if(kyc_res_obj.status == 'error')
        {
            res.json({status: 'error', message: kyc_res_obj.message}).status(400);
        }
    },

    async fetchUserKyc(req, res)
    {
        const kyc_res_obj = await MemberClass.fetchUserKyc('5f90343d21e259119cb22fcc');
        if(kyc_res_obj.status == 'success')
        {
            res.json({status: 'success', kyc: kyc_res_obj.kyc}).status(200);
        }
        else
        if(kyc_res_obj.status == 'error')
        {
            res.json({status: 'error', message: kyc_res_obj.message}).status(400);
        }
    },

    async fetchKyc(req, res)
    {
        const kyc_res_obj = await MemberClass.fetchKyc(req.body.status);

        if(kyc_res_obj.status == 'success')
        {
            res.json({status: 'success', kyc: kyc_res_obj.kyc}).status(200);
        }
        else
        if(kyc_res_obj.status == 'error')
        {
            res.json({status: 'error', message: kyc_res_obj.message}).status(400);
        }
    },

    async fetchEnabledCategories(req, res)
    {
        const categories_res_obj = await CategoryClass.fetchEnabledCategories();
        
        
        if(categories_res_obj.status == 'success')
        {
            res.json({status: 'success', categories: categories_res_obj.categories}).status(200);
        }
        else
        if(categories_res_obj.status == 'error')
        {
            res.json({status: 'error', message: categories_res_obj.message}).status(400);
        }
    },

    async fetchUserItemReact(req, res)
    {
        const react_res_obj = await MemberClass.fetchUserItemReact({
            item_id: req.body.item_id,
            user_id: req.session.user_info._id
        });

        res.json(react_res_obj).status(200);
    },

    async fetchPostedItem(req, res)
    {
        const posted_items_res_obj = await MemberClass.fetchPostedItem({skip: req.body.skip, limit: 2});

        // console.log(req.body.skip)

        if(posted_items_res_obj.status == 'success')
        {
            res.json({status: 'success', newsfeed_items: posted_items_res_obj.posted_items});
        }

        if(posted_items_res_obj.status == 'error')
        {
            res.json({status: 'error', message: 'error'});
        }
    },

    async sharePostGlobal(req, res)
    {
        const share_post_res_obj    = await MemberClass.sharePostGlobal({
            original_post   : req.body.original_post,
            post_type       : req.body.post_type,
            caption         : req.body.caption,
            first_name      : req.session.user_info.first_name,
            middle_name     : req.session.user_info.middle_name,
            last_name       : req.session.user_info.last_name,
        });

        if(share_post_res_obj.status == 'success')
        {
            res.json({status: 'success'}).status(200);
        }

        if(share_post_res_obj.status == 'error')
        {
            res.json({status: 'error'}).status(403)
        }
    },

    async fetchOriginalPost(req, res)
    {
        const original_post_res_obj = await MemberClass.fetchOriginalPost({_id: req.body.original_post_id});

        if(original_post_res_obj.status == 'success')
        {
            res.json({original_post: original_post_res_obj.original_post}).status(200);
        }

        if(original_post_res_obj.status == 'error')
        {
            res.json({message: original_post_res_obj, status: 'error'}).status(403);
        }
    },

    async react(req, res)
    {
        const react_res_obj = await MemberClass.react({
            user_id: req.session.user_info._id,
            ...req.body
        });

        if(react_res_obj.status == 'success')
        {
            res.json({
                react_details: react_res_obj.react_details,
                react_state: react_res_obj.react_state,
                status: 'success'
            }).status(200);
        }

        if(react_res_obj.status == 'error')
        {
            res.json({status: 'error'}).status(400);
        }
    },

    async fetchUserReact(req, res)
    {
        
        const request = {
            ...req.body,
            user_id: req.session.user_info._id
        }

        const fetch_react_res_obj = await MemberClass.fetchUserReact({...request});

        if(fetch_react_res_obj.status == 'success')
        {
            res.json({react: fetch_react_res_obj.react, status:'success'});
        }

        if(fetch_react_res_obj.status == 'error')
        {
            res.json({status:'error'});
        }
    },

    async fetchNewsfeed(req, res)
    {
        const newsfeed_details_res_obj = await MemberClass.fetchNewsfeed({...req.body});


        if(newsfeed_details_res_obj.status == 'success')
        {
            res.json({newsfeed: newsfeed_details_res_obj.newsfeed, status: 'success'}).status(200);
        }

        if(newsfeed_details_res_obj.status == 'error')
        {
            res.json({status: 'error'}).status(400);
        }
    },

    async fetchPostComments(req, res)
    {
        const post_comments_res = await MemberClass.fetchPostComments(
            {skip: req.body.skip, newsfeed_id: req.body.newsfeed_id}
        );

        if(post_comments_res.status == 'success')
        {
            res.json({comments: post_comments_res.comments, status: 'success'}).status(200);
        }

        if(post_comments_res.status == 'error')
        {
            res.json({status: 'error'}).status(400);
        }
    }
}