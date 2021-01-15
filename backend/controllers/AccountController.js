const passport      = require("passport");
const AccountClass  = require('../classes/AccountClass');
const passport_local = require('../config/passport');
const jwt           = require('jsonwebtoken');
const User          = require('../models/MDB_USER').User;
const MDB_OTP       = require('../models/MDB_OTP');
// const { io }        = require('../server');

module.exports =
{
    async isAuthenticated(req, res)
    {
        // console.log(req.isAuthenticated())
        if(req.isAuthenticated())
        {
            res.send('authenticated').status(200);
        }else
        {
            res.send('not authenticated').status(200);
        }
    },
    async googleLogin(req, res)
    {
        await AccountClass.googleLogin()
    },
    async localLogin(req, res, next)
    {
        passport_local.authenticate('client-login', async (err, user_info, info) => {
            if (err) {
                // console.log(err);
            }

            if (user_info && user_info.email) {
                let email = user_info.email;
                // sign token

                let now = new Date();
                let time = now.getTime();
                time += 3600 * 1000;
                now.setTime(time);

                let token = jwt.sign({ email }, process.env.PASSPORT_SECRET_KEY,
                {
                    // expiresIn: now.toUTCString()
                    expiresIn: 60000
                });

                let user_to_return = { ...user_info.toJSON(), ...{ token } };

                let account_class = new AccountClass();
                user_to_return = await account_class.updateUserOnlineStatus(user_to_return._id);

                delete user_to_return.salt;
                delete user_to_return.hash;
                res.status(200).json(user_to_return);
            }

            if (info) {
                res.status(400).send({ status: 'error', message : info.message });
            }
        })(req, res, next);
    },

    async register(req, res)
    {
        // remove {req, res} parameter if MDB.register doesn't need extra params anymore
        let registrations_res = await AccountClass.register(req.body.username, req.body.email, req.body.password, req.body.confirm_password, {req, res});

        if(registrations_res.status == 'success')
        {
            res.json(registrations_res).status(200);
        }
        else
        {
            res.status(400).send({status: 'error', message: registrations_res.message});
        }
    },

    async confirmRegistration(req, res)
    {
        let confirm_registration = await AccountClass.confirmRegistration(req.body.username, req.body.gender, req.body.email, req.body.password, req.body.country, req.body.otp);

        if(confirm_registration.status == 'success')
        {
            res.json(confirm_registration).status(200);
        }
        else
        {
            res.status(400).send({status: 'error', message: confirm_registration.message});
        }
    },

    async resendRegistrationOtp(req, res)
    {
        let account_class           = new AccountClass();
        let resend_registration_otp = await account_class.resendUserOtp(req.body.email, req.body.username, 'registration');
        // console.log(resend_registration_otp.status)
        if(resend_registration_otp.status == 'success')
        {
            res.json(resend_registration_otp).status(200);
        }
        else
        {
            res.status(400).send({status: 'error', message: resend_registration_otp.message});
        }
    },

    async cancelRegistrationOtp(req, res)
    {
        let account_class   = new AccountClass()
        let remove_otp_res  = await account_class.removeOtpByUserOrEmail(req.body.username);

        if(remove_otp_res.status == 'success')
        {
            res.json(remove_otp_res).status(200);
        }
        else
        {
            res.status(400).send({status: 'error', message: remove_otp_res.message});
        }
    },

    async isAuthenticatedLocal(req, res)
    {
        // console.log(req.session)
        if(req.session.user_info) {
            delete req.session.user_info.salt;
            delete req.session.user_info.hash;
            res.json({'status' : 'authenticated', 'user' : req.session.user_info}).status(200);
        } else {
            res.json({'status' : 'not authenticated'}).status(200);
        }
    },

    async logout(req, res)
    {
        // update is_online status of user
        let user_id = req.session.user_info._id;

        let now         = new Date();
            now         = new Date(now); // Date object
        let last_active = now.getTime();

        let account_class = new AccountClass();
        let update = await account_class.updateUserOnlineStatus(user_id, last_active, 'inactive');

        delete req.session.user_info;
        res.send(true).status(200);
    },

    async getUsersData(req, res)
    {
        let account_class = new AccountClass();
        let users_data = await account_class.getUsersData();

        if (users_data.status == 'success') {
            res.status(200).json(users_data);
        } else {
            res.status(400).json(users_data);
        }
    },

    async frontendMounted(req, res)
    {
        let details = {
            user_id: req.session.user_info._id
        }

        let account_class = new AccountClass(details);
        let result = await account_class.frontendMounted();

        if(result.status == "success")
        {
            res.status(200).json({ 
                status:     result.status, 
                user_info:  result.user_info,
                conversion: result.conversion
            });
        }
        else
        {
            res.status(400).json({ status: result.status, message: result.message });
        }
    },

    // Title: Updating Avatar
    // Author: Pergentino S. Galang II
    // Date: 1 October 2020
    // Contributor:
    async updateAvatar(req, res)
    {
        let user_data = req.body

        let account_class = new AccountClass(user_data);
        let account_validation = await account_class.validateAvatar();

        if (account_validation.status == "error") {
            res.status(400).send({ message: account_validation.message })
        } else if (account_validation.status == "success") {
            // console.log(account_validation.data)
            res.json(account_validation.data).status(200);
        }
    },

    // Title: Displaying Avatar
    // Author: Pergentino S. Galang II
    // Date: 1 October 2020
    // Contributor:
    async showAvatarById(req, res)
    {
        let user_data = req.body

        let account_class = new AccountClass(user_data);
        let account_validation = await account_class.validateShowAvatar();

        if (account_validation.status == "error") {
            res.status(400).send({ message: account_validation.message })
        } else if (account_validation.status == "success") {
            res.json(account_validation.data).status(200);
        }
    },

    // Title: Get all Avatar
    // Author: Pergentino S. Galang II
    // Date: 2 October 2020
    // Contributor:
    async getAvatarByGender(req, res)
    {
        let user_data = req.body

        let account_class = new AccountClass(user_data);
        let account_validation = await account_class.validateGetAvatarByGender();

        if (account_validation.status == "error") {
            res.status(400).send({ message: account_validation.message })
        } else if (account_validation.status == "success") {
            res.json(account_validation.data).status(200);
        }
    },

    // Title: Getting User Information
    // Author: Pergentino S. Galang II
    // Date: 2 October 2020
    // Contributor:
    async getInfoUser(req, res)
    {
        // let user = req.session.user_info;
        // console.log(user)

        // if (!user) {
        //     res.status(403).send({ status : 'error', message : 'Please login to continue' });
        // } else {

        let user_data = req.body
        let account_class = new AccountClass(user_data);
        let account_validation = await account_class.validateGetInfoUser();

        if (account_validation.status == "error") {
            res.status(400).send({ message: account_validation.message })
        } else if (account_validation.status == "success") {
            res.json(account_validation.data).status(200);
        }
    // }
    },

    // Title: Rate Users
    // Author: Pergentino S. Galang II
    // Date: 2 October 2020
    // Contributor:
    async rateUser(req, res)
    {
        let user_data = req.body

        let account_class = new AccountClass(user_data);
        let account_validation = await account_class.validateRateUser();

        if (account_validation.status == "error") {
            res.status(400).send({ message: account_validation.message })
        } else if (account_validation.status == "success") {
            res.json(account_validation.data).status(200);
        }
    },

    // Title: Review Users
    // Author: Pergentino S. Galang II
    // Date: 2 October 2020
    // Contributor:
    async reviewUser(req, res)
    {
        let user_data = req.body

        let account_class = new AccountClass(user_data);
        let account_validation = await account_class.validateReviewUser();

        if (account_validation.status == "error") {
            res.status(400).send({ message: account_validation.message })
        } else if (account_validation.status == "success") {
            res.json(account_validation.data).status(200);
        }
    },


    // Title: Review Users
    // Author: Pergentino S. Galang II
    // Date: 2 October 2020
    // Contributor:
    async getReviewUser(req, res)
    {
        let user_data = req.body;

        let account_class = new AccountClass(user_data);
        let account_validation = await account_class.validateGetReviewUser();

        if (account_validation.status == "error") {
            res.status(400).send({ message: account_validation.message })
        } else if (account_validation.status == "success") {
            res.json(account_validation.data).status(200);
        }
    },

    // Title: Get All Users
    // Author: Pergentino S. Galang II
    // Date: 2 October 2020
    // Contributor:
    async getAllUser(req, res)
    {
        let account_class = new AccountClass();
        let account_validation = await account_class.getAllUser();

        if (account_validation.status == "error") {
            res.status(400).send({ message: account_validation.message })
        } else if (account_validation.status == "success") {
            res.json(account_validation.data).status(200);
        }
    },

    // Title: Report User
    // Author: Pergentino S. Galang II
    // Date: 3 November 2020
    // Contributor:
    async reportUser(req, res)
    {
        let user_data = {
            ...req.body,
            report_path: req.file.filename
        }

        // user_data = req.file
        // console.log(req.file)
        // user_data.report_path = req.file.filename;

        let account_class = new AccountClass(user_data);
        let account_validation = await account_class.validateReportUser();

        if (account_validation.status == "error") {
            res.status(400).send({ message: account_validation.message })
        } else if (account_validation.status == "success") {
            res.json(account_validation.data).status(200);
        }
    },

     // Title: Report User
    // Author: Pergentino S. Galang II
    // Date: 3 November 2020
    // Contributor:
    async updateAbout(req, res)
    {
        let user_info = req.body

        let account_class = new AccountClass(user_info);
        let account_validation = await account_class.validateUpdateAbout();

        if (account_validation.status == "error") {
            res.status(400).send({ message: account_validation.message })
        } else if (account_validation.status == "success") {
            res.json(account_validation.data).status(200);
        }
    },

    // Title: Updating Cover Photo
    // Author: Pergentino S. Galang II
    // Date: 4 November 2020
    // Contributor:
    async updateCoverPhoto(req, res)
    {
        let user_data = req.body

        let account_class = new AccountClass(user_data);
        let account_validation = await account_class.validateCoverPhoto();

        if (account_validation.status == "error") {
            res.status(400).send({ message: account_validation.message })
        } else if (account_validation.status == "success") {
            res.json(account_validation.data).status(200);
        }
    },

    // Title: Rate and Review User
    // Author: Pergentino S. Galang II
    // Date: 9 November 2020
    // Contributor:
    async validateRateAndReview(req, res)
    {
        let user_data = req.body;

        if(req.files.length == 1){
            user_data.review_path = [req.files[0].filename];
            // review_data.review_path = req.files[1].filename;
        } else if(req.files.length == 2){
            user_data.review_path = [req.files[0].filename, req.files[1].filename ];
            // review_data.review_path = req.files[1].filename;
        } else if(req.files.length == 3){
            user_data.review_path = [req.files[0].filename, req.files[1].filename, req.files[2].filename ];
            // review_data.review_path = req.files[1].filename;
        }


        let account_class = new AccountClass(user_data);
        let account_validation = await account_class.validateRateAndReview();

        if (account_validation.status == "error") {
            res.status(400).send({ message: account_validation.message })
        } else if (account_validation.status == "success") {
            res.json(account_validation.data).status(200);
        }
    },

    // Title: Get Rate and Review by User
    // Author: Pergentino S. Galang II
    // Date: 9 Novemver 2020
    // Contributor:
    async getRateAndReviewUser(req, res)
    {
        let user_data = req.body;

        let account_class = new AccountClass(user_data);
        let account_validation = await account_class.validateGetRateReviewUser();

        if (account_validation.status == "error") {
            res.status(400).send({ message: account_validation.message })
        } else if (account_validation.status == "success") {
            res.json(account_validation.data).status(200);
        }
    },


    async forgotPassword (req, res)
    {
        const email = req.body.email;

        let account_class = new AccountClass();
        let forgot_pass = await account_class.forgotPassword(email);

        if (forgot_pass.status == 'success') {
            res.json(forgot_pass).status(200);
        } else {
            res.status(400).send({ status : 'error', message : forgot_pass.message });
        }
    },

    async resetUserPassword (req, res)
    {
        let reset_data =
        {
            password            : req.body.password,
            confirm_password    : req.body.confirm_password,
            key                 : req.params.key
        };

        let account_class = new AccountClass();
        let reset_password = await account_class.resetUserPasssword(reset_data);

        let mdb_otp = new MDB_OTP();

        if (reset_password.status == 'success') {
            // update password
            let email = reset_password.email;
            let password = reset_data.password;

            await User.findOne({ email : email })
                .then(function(sanitizedUser)
                {
                    if (sanitizedUser) {
                        sanitizedUser.setPassword(password, async (err) =>
                        {
                            if (!err) {
                                sanitizedUser.save();
                                await mdb_otp.removeOtpByUserOrEmail(email);
                                res.status(200).json({ status : 'success', message : 'Password changed successfully' });
                            } else {
                                res.status(400).send({ status : 'error', message : 'Unable to change password. Please try again.' });
                            }
                        });
                    } else {
                        res.status(400).send({ status: 'error', message: 'This user does not exist' });
                    }
                },function(err){
                    console.error(err);
                });
        } else {
            res.status(400).send({ status : 'error', message : reset_password.message });
        }
    },

    async validateLinkKey (req, res)
    {
        let key = req.params.key;

        let account_class = new AccountClass();
        let is_valid = await account_class.validateKey(key);

        if (is_valid.status == 'success') {
            res.json({ status: 'success' }).status(200);
        } else {
            res.status(400).send({ status : 'error', message : is_valid.message });
        }
    },

    async addFollowing(req, res)
    {
        let user = req.user_info;
        let user_to_follow_id = req.body.user_id;
        let account_class = new AccountClass();

        let follow = await account_class.addToFollowing(user, user_to_follow_id);

        if (follow.status == 'success') {
            req.session.user_info = follow.data;
            res.status(200).json(follow);
        } else {
            res.status(400).send(follow);
        }
    },

    async getFollowersData(req, res)
    {
        let user = req.user_info;

        let followers_id = (user.followers) ? user.followers : [];
        let followings_id = (user.following) ? user.following : [];

        let account_class = new AccountClass();

        let follow = await account_class.getFollowData(followers_id, followings_id);

        if (follow.status == 'success') {
            res.status(200).json(follow);
        } else {
            res.status(400).send(follow);
        }
    },

    // Title: Get single user
    // Author: Pergentino S. Galang II
    // Date: 10 Novemver 2020
    // Contributor:
    async getUser(req, res)
	{
		let user_information = {
			id: req.params.id
		}

		let account_class = new AccountClass(user_information);
		let account = await account_class.getUser();

		if (account.status == "error")
		{
			res.status(400).send({ message: account.message });
		}
		else
		{
			res.send(account);
		}
    },

    // Title: Change Password Client
    // Author: Pergentino S. Galang II
    // Date: 17 Novemver 2020
    // Contributor:
    async putChangePassword(req, res)
	{   
        let reset_data =
        {
            email               : req.body.email,
            old_password        : req.body.old_password,
            new_password        : req.body.new_password,
            confirm_password    : req.body.confirm_password,
        };


        let account_class = new AccountClass();
        let change_password = await account_class.validateChangePassword(reset_data);
        if (change_password.status == 'success') {

            let email = change_password.data.email;
            let old_password = change_password.data.old_password;
            let new_password = change_password.data.new_password;

             await User.findOne({ email : email })
                .then(function(sanitizedUser)
                {   
                    if (sanitizedUser) {
                        sanitizedUser.changePassword(old_password, new_password, async (err) =>
                        {
                            if (!err) {
                                sanitizedUser.save();
                                res.status(200).json({ status : 'success', message : 'Password changed successfully' });
                            } else {
                                res.status(400).send({ status : 'error', message : 'Unable to change password. Please try again.' });
                                // console.log(err)
                            }
                        });
                    } else {
                        res.status(400).send({ status: 'error', message: 'This user does not exist' });
                    }
                },function(err){
                    console.error(err);
                });
        } else {
            res.status(400).send({ status : 'error', message : change_password.message });
        }
    },

    async updateWishlist(req, res)
    {
        let user = req.user_info;
        let item_id = req.body.item_id;

        let account_class = new AccountClass();
        let wishlist = await account_class.updateWishlist(user, item_id);

        if (wishlist.status == 'success') {
            req.session.user_info = wishlist.data;
            res.status(200).json(wishlist);
        } else {
            res.status(400).json(wishlist);
        }
    },

    async getWishlist(req, res)
    {
        let user = req.user_info;
        let wishlist_ids = (user.wishlist) ? user.wishlist : [];

        let account_class = new AccountClass();
        let wishlist = await account_class.getWishlist(wishlist_ids);

        if (wishlist.status == 'success') {
            res.status(200).json(wishlist);
        } else {
            res.status(400).send(wishlist);
        }
    },

    async getWishlistMatch(req, res)
    {
        let user = req.user_info;
        let wishlist_ids = (user.wishlist) ? user.wishlist : [];
        let account_class = new AccountClass();
        let wishlist = await account_class.getWishlist(wishlist_ids);

        if (wishlist.status == 'success') {
            res.status(200).json(wishlist);
        } else {
            res.status(400).send(wishlist);
        }
    },

    async getWishlistMatch(req, res)
    {
        let user = req.user_info;
        let wishlist_ids = (user.wishlist) ? user.wishlist : [];

        let account_class = new AccountClass();
        let wishlist = await account_class.getWishlistMatch(wishlist_ids);

        if (wishlist.status == 'success') {
            res.status(200).json(wishlist);
        } else {
            res.status(400).send(wishlist);
        }
    },
    
    async getInfo(req, res)
    {
        if(req.session.user_info)
        {
            let user_id = req.session.user_info._id;
            let account_class = new AccountClass({ user_id: user_id });
            let user_info = await account_class.getInfo();

            res.status(200).json(user_info);
        }
        else
        {
            res.status(200).send(null);
        }
    },

    // Enable 2FA - Paul Musa
    async enable2fa(req, res)
    {
        let details = {
            user_id:              req.session.user_info._id,
            google_authenticator: req.body.google_authenticator,
            otp:                  req.body.otp
        }

        let account_class = new AccountClass(details);
        let result = await account_class.enable2fa();

        if(result.status == 'success')
        {
            res.status(200).json({ status: result.status });
        }
        else
        {
            res.status(400).json({ status: result.status, message: result.message });
        }
    },

    // Disable 2FA - Paul Musa
    async disable2fa(req, res)
    {
        let details = {
            user_id:    req.session.user_info._id,
            otp:        req.body.otp
        }

        let account_class = new AccountClass(details);
        let result = await account_class.disable2fa();

        if(result.status == 'success')
        {
            res.status(200).json({ status: result.status });
        }
        else
        {
            res.status(400).json({ status: result.status, message: result.message });
        }
    },

    async getFollowersDataSpecificUser(req, res)
    {       
     
            let user_information = {
                id: req.params.id
            }

            let account_class = new AccountClass(user_information);
            let account = await account_class.getUser();
            let followers_id = (account.followers) ? account.followers : [];
            let followings_id = (account.following) ? account.following : [];

            let follow = await account_class.getFollowData(followers_id, followings_id);
            // console.log(follow)
            if (follow.status == 'success') {
                res.status(200).json(follow);
            } else {
                res.status(400).send(follow);
            }
    },

    async updateUserOnlineStatus(req, res)
    {
        let user_id         = req.user_info._id;
        let status          = req.body.status;
        let last_active     = req.body.timestamp;

        // console.log('user id', user_id)
        let account_class   = new AccountClass();
        let update          = await account_class.updateUserOnlineStatus(user_id, last_active, status);

        if (update.status == 'success') {
            res.status(200).json(update);
            // io.socket.emit('is_online', { status: status, timestamp: last_active });
            // console.log()
        } else {
            res.status(400).send(update);
        }
    },

    async getUserMessageFriendsOnlineStatus(req, res)
    {
        let user_id = req.user_info._id;

        let account_class = new AccountClass();
        let friends_status = await account_class.getUserMessageFriendsOnlineStatus(user_id);

        if (friends_status.status == 'success') {
            res.status(200).json(friends_status);
        } else {
            res.status(400).send(friends_status);
        }
    },
}