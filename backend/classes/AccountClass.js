const express           = require('express');
const bcrypt            = require('bcryptjs');
const nodemailer        = require("nodemailer");
const ejs               = require("ejs");
const MDB_USER          = require('../models/MDB_USER');
const MDB_OTP           = require('../models/MDB_OTP');
const User              = require('../models/MDB_USER').User;
const ImageClass        = require('./ImageClass');
const MDB_WALLET        = require('../models/MDB_WALLET');
const MDB_TRANSACTION   = require('../models/MDB_TRANSACTION');
const MDB_REFERENCES    = require('../models/MDB_REFERENCES');
const jwt               = require('jsonwebtoken');
const Web3              = require('web3');
const web3              = new Web3(`https://${process.env.ETH_NETWORK}.infura.io/v3/${process.env.CRYPTO_KEY}`);
const MDB_AVATAR        = require('../models/MDB_AVATAR');
const MDB_USER_RATING   = require('../models/MDB_USER_RATING');
const MDB_USER_REVIEW   = require('../models/MDB_USER_REVIEW');
const MDB_USER_REPORT   = require('../models/MDB_USER_REPORT');
const MDB_RATING_REVIEW = require('../models/MDB_RATING_REVIEW');
const MDB_ITEMS         = require('../models/MDB_ITEMS');
const NotificationClass = require('./NotificationClass');
const MDB_MESSAGE       = require('../models/MDB_MESSAGE');
const fs                = require('fs');
const speakeasy         = require('speakeasy');
const MDB_CONVERSION    = require('../models/MDB_CONVERSION');
const MDB_FEE    		= require('../models/MDB_FEE');
const axios             = require('axios');
const bitcore           = require('bitcore-lib');

module.exports = class AccountClass
{
    constructor(user_information)
    {
        this.mdb_user           = new MDB_USER();
        this.mdb_avatar         = new MDB_AVATAR();
        this.mdb_user_rating    = new MDB_USER_RATING();
        this.mdb_user_review    = new MDB_USER_REVIEW();
        this.mdb_user_report    = new MDB_USER_REPORT();
        this.mdb_rating_review  = new MDB_RATING_REVIEW();
        this.mdb_items          = new MDB_ITEMS();
        this.mdb_message        = new MDB_MESSAGE();
        this.user_information   = user_information;
    }

    async validate()
    {
        let res = {};
        if(this.user_information.full_name.trim() == '' || this.user_information.password.trim() == '' || this.user_information.email.trim() == '')
        {
            res.status      = "error";
            res.message     = "You need to fill up all fields in order to proceed.";
        }
        else if(this.user_information.confirm_password !== this.user_information.password)
        {
            res.status      = "error";
            res.message     = "The password you entered didn't match.";
        }
        else
        {
            res.status = "success";
        }

        return res;
    }

    async authenticate()
    {
    }

    static async validateUserRegistration(username, email, password, confirm_password)
    {
        let result = {
            is_success   : true
        }

        let mdb_user    = new MDB_USER();
        email           = await mdb_user.findByEmail(email);
        username        = await mdb_user.findByUsername(username);

        if(username != null)
        {
            result.is_success   = false;
            result.error        = 'username is already in use';
            return result;
        }else
        if(email != null)
        {
            result.is_success   = false;
            result.error        = 'email is already in use.';
            return result;
        }else
        if(password != confirm_password)
        {
            result.is_success   = false;
            result.error        = 'password not match';
            return result;
        }
        return result;
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    generateOtp(otp_for)
    {
        const numbers       = "0123456789";
        const chars         = "abcdefghijklmnopqrstuvwxyz";
        const chars_caps    = chars.toUpperCase();
        const all_chars     = numbers + chars + chars_caps;
        let otp = '';
        let length = (otp_for == 'forgot_password') ? 26 : 6;
        for (let i = 0; i < length; i++) {
            let rand = this.getRandomArbitrary(0, all_chars.length);
            otp += all_chars[parseInt(rand)];
        }

        return otp;
    }

    async createUserOtp(email, username, otp_for)
    {
        let mdb_otp     = new MDB_OTP();
        let otp         = this.generateOtp(otp_for);

        let otp_result = {};

        if (otp_for == 'forgot_password') {
            await this.sendOtpEmail(email, otp, otp_for);
            let deleted_otp = await mdb_otp.removeOtpByUserOrEmail(email);
            otp_result  = await mdb_otp.createUserOtp({email: email, otp: otp, otp_for: otp_for});
        } else {
            await this.sendOtpEmail(email, otp);
            let deleted_otp = await mdb_otp.removeOtpByUserOrEmail(username);
            otp_result  = await mdb_otp.createUserOtp({email: email, username: username, otp: otp, otp_for: otp_for});
        }

        return otp_result;
    }

    async sendUserOtp(email, username, otp_for)
    {
        await this.createUserOtp(email, username, otp_for);
    }

    async resendUserOtp(email, username, otp_for)
    {
        let res         = {};
        let mdb_otp     = new MDB_OTP();
        // delete existing user otp
        let deleted_otp = await mdb_otp.removeOtpByUserOrEmailAndFor(email, otp_for);
        // create new user otp
        let otp_result  = await this.createUserOtp(email, username, otp_for);
        // check if otp_result is json object and if empty
        if(Object.keys(otp_result).length == 0)
        {
            res.status  = 'error';
            res.message = otp_result
        }
        else
        {
            res.status  = 'success';
        }
        return res;
    }

    async sendOtpEmail(email, otp, otp_for = '')
    {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        otp = (otp_for == 'forgot_password') ? `${process.env.RESET_PASSWORD_LINK}/${otp}` : otp;
        let html = await ejs.renderFile(`./views/email_template.ejs`, { otp });
        console.log(otp)

        let from = `"Baristocrat One Time Passcode" ${process.env.EMAIL}`;
        let subject = 'One Time Passcode';

        if (otp_for) {
            from = `"Baristocrat Reset Password" ${process.env.EMAIL}`;
            subject = 'Reset Password';
        }

        let mailOptions = {
            from    : from,
            to      : email,
            subject : subject,
            html    : html
        };

        let res = await transporter.sendMail(mailOptions);

        return res.accepted.includes(email) === false ? 'otp not sent' : 'otp sent';
    }

    static async register(username, email, password, confirm_password, r)
    {
        let res         = {};
        let result      = await this.validateUserRegistration(username, email, password, confirm_password);

        // if not registration failed
        if(result.is_success === false)
        {
            res.message  = result.error;
            res.status   = 'error';
            return res;
        }

        let account_class   = new this();
        let otp_result      = await account_class.sendUserOtp(email, username, 'registration');

        res.status   = 'success';

        return res;
    }

    static async confirmRegistration(username, gender, email, password, country, otp)
    {
        let res     = {};
        let mdb_otp = new MDB_OTP();
        let otp_res = await mdb_otp.findUserOtp(email, otp);

        // if invalid otp, notify user
        if(otp_res == null)
        {
            res.status = 'error';
            res.message= 'invalid OTP';
            return res;
        }
        // if otp found with corresponding email or username, then new user is created
        if(otp_res != {})
        {
            const mdb_user        = new MDB_USER();
            const mdb_wallet      = new MDB_WALLET();
            const mdb_references  = new MDB_REFERENCES();
            // let hashed_password = await bcrypt.hash(password, 10);
            let user_res        = await mdb_user.register({username, gender, email, password: password, country});

            // create user's directory

            await fs.mkdirSync(`${proccess.env.MEMBER_DIR}/${user_res._id}/images/id/`, {recursive: true});
            await fs.mkdirSync(`${proccess.env.MEMBER_DIR}/${user_res._id}/images/selfie/`, {recursive: true});
            await fs.mkdirSync(`${proccess.env.MEMBER_DIR}/${user_res._id}/images/transactions/`, {recursive: true});

            // delete otp after registration
            let remove_otp_res  = await mdb_otp.removeUserOtp(username, otp);

            // ******************************* BRT WALLET ********************************
            const mdb_fee 				= new MDB_FEE();
            const fee 					= await mdb_fee.findByPromoCode(false);

            const crypto_mixer          = process.env.CRYPTO_MIXER;
            const brt_account 			= await web3.eth.accounts.create();
            const encrypted_brt_wallet 	= web3.eth.accounts.encrypt(brt_account.privateKey, crypto_mixer);

            let wallet_details_brt 		=
            {
                user_id:                user_res._id,
                is_fiat:                false,
                currency_name:          "Baristocrat",
                currency_abbreviation:  "BRT",
                decimal_places:         9,
                public_key:             brt_account.address,
                encrypted_wallet:       encrypted_brt_wallet,
                balance:                0
            }

            let brt_wallet = await mdb_wallet.add(wallet_details_brt); // DB save
            mdb_user.update(user_res._id, {         // DB update
                $addToSet: { wallet: brt_wallet._id },
                fee: fee._id
            })
            // **************************** END OF BRT WALLET ****************************

            const references_res_obj    = await mdb_references.incrementKycNotSubmitted();

            res.status = 'success';
            return res;
        }
    }

    async removeOtpByUserOrEmail(userOrEmail)
    {
        let res                 = {};
        const mdb_otp           = new MDB_OTP();
        const remove_user_otp   = await mdb_otp.removeOtpByUserOrEmail(userOrEmail);

        res.status              = 'success';
        return res;
    }

    static async googleLogin()
    {
        let mdb_user            = new MDB_USER();
        await mdb_user.googleLogin()
    }

    static async localLogin(userOrEmail, password)
    {
        let res                 = {};
        let mdb_user            = new MDB_USER();
        let username_res        = await mdb_user.findByUsername(userOrEmail);
        let email_res           = await mdb_user.findByEmail(userOrEmail);

        let user_res            = username_res != null || email_res != null ? {bool: true, data: email_res != null ? email_res : username_res} : {bool: false};

        // if user_res then compare password
        if(user_res.bool == false)
        {
            res.status          = 'error';
            res.message         = 'invalid credentials';
            return res;
        }

        // if(await bcrypt.compare(password, user_res.data.password) == false)
        // {
        //     res.status          = 'error';
        //     res.message         = 'invalid credentials';
        //     return res;
        // }

        // let res                 = {};

        // let mdb_user            = new MDB_USER();

        // let username_res        = await mdb_user.findByUsername(userOrEmail);
        // let email_res           = await mdb_user.findByEmail(userOrEmail);

        // let user_res            = username_res != null || email_res != null ? {bool: true, data: email_res != null ? email_res : username_res} : {bool: false};

        // if(user_res.bool == false)
        // {
        //     res.status          = 'error';
        //     res.message         = 'invalid credentials';
        //     return res;
        // }

        let user_data = {
            username: user_res.data.username,
            password: password
        };

        let user                = await mdb_user.localLogin(user_data);

        res.status              = 'success';
        res.user                = user;
        return res;
    }

    /**
     *
     * @param { String } keyword = all|(text) entered by user
     * @param { Object } filters
     *
     * @return { Object } will return specific user(s) if keyword is specified
     */
    async getUsersData (keyword, filters)
    {
        let res = {}

        filters = (!filters) ? {} : filters;

        try {
            res.status = 'success';

            if (keyword !== 'all') {
                filters.full_name =  {
                    '$regex': keyword,
                    '$options': 'i'
                };

                filters.username =  {
                    '$regex': keyword,
                    '$options': 'i'
                };
            }

            let data = await User.aggregate([
                { $project :
                    {
                        full_name: { $concat: ['$first_name', ' ', '$last_name'] },
                        'username':1,
                        'avatar_path':1,
                        'gender':1,
                        'followers': 1
                    }
                }, { $match: { $or: [{full_name : filters.full_name} , {username: filters.username}] } }
            ]);
            // let image_class = new ImageClass();
            // let users = await image_class.convertImagePath(data, 'avatar_path', 'avatar', 'Users');
            res.data = data;



        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }

    /**
     * @return { Object } will return object of user's full_name
     */
    async getUserNameList ()
    {
        let res = {}

        filters = (!filters) ? {} : filters;

        try {
            res.status = 'success';

            if (keyword !== 'all') {
                filters.$expr =  {
                        '$regexMatch': {
                            'input': { '$concat': ['$first_name', ' ', '$last_name'] },
                            'regex': keyword,
                            'options': 'i'
                        }
                    };
            }

            let data = await User.aggregate([
                { $project :
                    {
                        full_name: { $concat: ['$first_name', ' ', '$last_name'] },
                        'username':1,
                        'avatar_path':1,
                        'gender':1
                    }
                }, { $match: filters }
            ]);

            let image_class = new ImageClass();
            let users = await image_class.convertImagePath(data, 'avatar_path', 'avatar');

            res.data = users;
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }

    async getUserNameList ()
    {
        let res = {}

        try {
            res.status = 'success';

            let full_name = [];
            await User.aggregate([ { $project : { full_name: { $concat: ['$first_name', ' ', '$last_name'] } } } ], (err, users) => {
                if (users) {
                    for (var i = 0; i < users.length; i++) {
                        if (users[i].full_name) {
                            full_name.push(users[i].full_name);
                        }
                    }
                }
            });

            res.data = full_name;
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }

    async frontendMounted()
    {
        const mdb_user       = new MDB_USER();
        const mdb_conversion = new MDB_CONVERSION();
        let res = {};

        try
        {
            let user_info  = await mdb_user.findByUserId(this.user_information.user_id);
            let conversion = await mdb_conversion.findByAbbreviation('USD');

            res.user_info  = user_info;
            res.conversion = conversion;
            res.status     = "success";
        }
        catch(error)
        {
            res.status  = "error";
            res.message = error.message;
        }
        return res;
    }

    async validateAvatar()
    {
        let res = {}
        try {

            let avatar_data = await this.mdb_user.updateUser(this.user_information.user_id, { avatar: this.user_information.avatar_id, avatar_path: this.user_information.avatar_path })
            await this.mdb_rating_review.findByReviewerId(this.user_information.user_id, { avatar_path: this.user_information.avatar_path }) //middleware
            res.status = "success";
            res.data = avatar_data
        }
        catch (error) {
            res.status = "error";
            res.message = error.message;
        }
        return res;
    }

    async validateShowAvatar()
    {
        let res = {}
        try {

            let avatar_data = await this.mdb_avatar.doc(this.user_information._id)
            res.status = "success";
            res.data = avatar_data
        }
        catch (error) {
            res.status = "error";
            res.message = error.message;
        }
        return res;
    }

    async validateGetAvatarByGender()
    {
        let res = {};
        try {
            const mdb_avatar = new MDB_AVATAR();
            const doc = await mdb_avatar.findAllAvatarByGender(this.user_information.gender);

            res.status = "success";
            res.data = doc;

        } catch (error) {
            res.status = "error";
            res.message = error.message;
        }
        return res;
    }

    async validateGetInfoUser()
    {
        let res = {}
        try {

            let user_data = await this.mdb_user.doc(this.user_information.user_id)
            res.status = "success";
            res.data = user_data
        }
        catch (error) {
            res.status = "error";
            res.message = error.message;
        }
        return res;
    }

    async validateRateUser()
    {
        let res = {}


        try {
            let user_info = await this.mdb_user.findById(this.user_information.user_id)
            if (this.user_information.rate == 1) {
                user_info.ratings.one += 1;
            }
            else if (this.user_information.rate == 2) {
                user_info.ratings.two += 1;
            }
            else if (this.user_information.rate == 3) {
                user_info.ratings.three += 1;
            } else if (this.user_information.rate == 4) {
                user_info.ratings.four += 1;
            } else if (this.user_information.rate == 5) {
                user_info.ratings.five += 1;
            }

            await this.mdb_user.updateUser(this.user_information.user_id, { ratings: user_info.ratings })
            let user_data = await this.mdb_user_rating.add(this.user_information)

            res.status = "success";
            res.data = user_data;



        } catch (error) {
            res.status = "error";
            res.message = error.message
        }
        return res;
    }

    async validateReviewUser()
    {
        let res = {}

        try {
            //user_id of seller in profile
            let user_info = await this.mdb_user.findById(this.user_information.user_id);
            user_info.total_reviews += 1
            await this.mdb_user.updateUser(this.user_information.user_id, { total_reviews: user_info.total_reviews })
            let user_data = await this.mdb_user_review.add(this.user_information)

            res.status = "success";
            res.data = user_data;

        } catch (error) {
            res.status = "error";
            res.message = error.message
        }
        return res;
    }


    async validateGetReviewUser()
    {
        let res = {}

        try {
            let review_data = await this.mdb_user_review.findReviewByUser(this.user_information.user_id)
            res.status = "success";
            res.data = review_data

        } catch (error) {
            res.status = "error";
            res.message = error.message
        }
        return res;
    }

    async getAllUser()
    {
        let res = {};

        try {
            const mdb_user = new MDB_USER();
            const doc = await mdb_user.docs();

            res.status = "success";
            res.data = doc;

        } catch (error) {
            res.status = "error";
            res.message = error.message;
        }
        return res;
    }

    async validateReportUser()
    {
        let res = {}

        try {
            //user_id of seller in profile

            let user_info = await this.mdb_user.findById(this.user_information.user_id);

            user_info.total_reports += 1
            await this.mdb_user.updateUser(this.user_information.user_id, { total_reports: user_info.total_reports })
            let user_data = await this.mdb_user_report.add(this.user_information)

            res.status = "success";
            res.data = user_data;

        } catch (error) {
            res.status = "error";
            res.message = error.message
        }
        return res;
    }

    async validateUpdateAbout()
    {
        let res = {}

        try {
            let user_data = await this.mdb_user.updateUser(this.user_information.user_id, { about: this.user_information.about })

            res.status = "success";
            res.data = user_data;

        } catch (error) {
            res.status = "error";
            res.message = error.message
        }
        return res;
    }


    async validateCoverPhoto()
    {
        let res = {}

        try {


            let cover_data = await this.mdb_user.updateUser(this.user_information.user_id, { cover: this.user_information.cover, cover_photo_path: this.user_information.cover_photo_path })

            res.status = "success";
            res.data = cover_data;

        }
        catch (error) {
            res.status = "error";
            res.message = error.message;
        }
        return res;
    }

    async validateRateAndReview()
    {
        let res = {}
        try {

            let user_info_rate = await this.mdb_user.findById(this.user_information.user_id)
            if (this.user_information.rate == 1) {
                user_info_rate.ratings.one += 1;
            }
            else if (this.user_information.rate == 2) {
                user_info_rate.ratings.two += 1;
            }
            else if (this.user_information.rate == 3) {
                user_info_rate.ratings.three += 1;
            } else if (this.user_information.rate == 4) {
                user_info_rate.ratings.four += 1;
            } else if (this.user_information.rate == 5) {
                user_info_rate.ratings.five += 1;
            }

            //user_id of seller in profile
            let user_info_review = await this.mdb_user.findById(this.user_information.user_id);
            user_info_review.total_reviews += 1

            await this.mdb_user.updateUser(this.user_information.user_id,
                {
                    ratings: user_info_rate.ratings,
                    total_reviews: user_info_review.total_reviews,
                    $addToSet: { reviewers: this.user_information.reviewer_id }
                })

            let user_data = await this.mdb_rating_review.createRateReview(this.user_information)

            res.status = "success";
            res.data = user_data;

            // -----------Reviews Notification-----------------
            let notification_details =
            {
                user_id : this.user_information.user_id,
                seller_name: this.user_information.reviewer_first_name,
                title: 'Reviews',
                message: `Your fellow BRT Elite, ${this.user_information.reviewer_first_name} rated you  ${this.user_information.rate} stars. ${this.user_information.rate == 5?'Keep it up!':'Do better to attract more.'}`,
                date_created: Date.now(),
            }
            let notification = new NotificationClass(notification_details);
            notification.createNotification();
            // -------------------------------------------------


        } catch (error) {
            res.status = "error";
            res.message = error.message
        }
        return res;
    }


    async validateGetRateReviewUser()
    {
        let res = {}

        try {
            // let review_data = await this.mdb_rating_review.findReviewByUser(this.user_information.user_id)
            let review_data = await this.mdb_rating_review.findReview(this.user_information.user_id)

            res.status = "success";
            res.data = review_data

        } catch (error) {
            res.status = "error";
            res.message = error.message
        }
        return res;
    }

    /**
     *
     * @param { String } email
     *
     * @return { Object }
     */
    async forgotPassword (email)
    {
        const mdb_user = new MDB_USER();
        let res = {};

        try {
            // check if email address is existing
            let is_email_exist = await mdb_user.findByEmail(email);

            if (is_email_exist) {
                let { email } = is_email_exist;
                // send otp
                await this.sendUserOtp(email, "", 'forgot_password');
                res.status = 'success';
            } else {
                res.status = 'error';
                res.message =  `${email} not match in our records`;
            }
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }
        return res;
    }

    /**
     *
     * @param { Object } reset_data
     *
     * @return { Object }
     */
    async resetUserPasssword(reset_data)
    {
        // validate reset data
        let is_valid = await this.validateResetUserPasswordData(reset_data);

        if (is_valid.status == 'success' && is_valid.data.email) {
            return { status : "success", email : is_valid.data.email };
        } else {
            return is_valid;
        }
    }

    /**
     *
     * @param { Object } data
     *
     * @return { Object }
     */
    async validateResetUserPasswordData (data)
    {
        const { password, confirm_password, key } = data;

        let res = {};

        if (password == '') {
            res.status = 'error';
            res.message = 'Please fill up your password';
        } else if (password != confirm_password) {
            res.status = 'error';
            res.message = "The password you've entered didn't match";
        } else {
            try {
                // validate key if exist
                let otp_data = await this.validateKey(key);

                if (otp_data.status == 'success') {
                    res.status = 'success';
                    res.data = { email : otp_data.email };
                } else {
                    res.status = 'error';
                    res.message = 'Either your link has expired or invalid';
                }
            } catch (error) {
                res.status = 'error';
                res.message = error.message;
            }
        }

        return res;
    }

    /**
     *
     * @param { String } key
     *
     * @return { Object }
     */
    async validateKey (key)
    {
        let res = {};

        try {
            let mdb_otp = new MDB_OTP();
            let otp_data = await mdb_otp.findByOtp(key);

            if (otp_data) {
                res.status = 'success';
                res.email = otp_data.email;
            } else {
                res.status = 'error';
                res.message = 'Either your link has expired or invalid';
            }
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }

    /**
     *
     * @param { Object } user_data
     * @param { String } user_to_follow_id
     *
     * @return { Object } will return object of user data with updated following field
     */
    async addToFollowing (user_data, user_to_follow_id)
    {
        let res = {};

        try {
            // validate data
            let is_validated = await this.validateFollowData(user_data._id, user_to_follow_id);

            if (!is_validated) {
                res.status = 'success';

                // check if user is currently following this provided `user_to_follow` to determing action
                let action =  user_data.following.includes(user_to_follow_id) ? 'unfollow' : 'follow';
                let user_id = user_data._id;

                if (action == 'follow') {
                    let add_to_followers = await this.mdb_user.update(user_to_follow_id, { $push : { followers : user_id} });
                    res.data = await this.mdb_user.update(user_id, { $push : { following : user_to_follow_id} });

                    // -----------Follow Notification-----------------
                    let follower_information = await this.mdb_user.findById( user_id);
                    let notification_details =
                    {
                        user_id : user_to_follow_id,
                        identification_id: user_id ,
                        profile_pic_path: follower_information.avatar_path,
                        avatar_gender: follower_information.gender,
                        title: 'Followed',
                        message:`${follower_information.username} has followed you.`,
                        date_created: Date.now(),
                    }
                    let notification = new NotificationClass(notification_details);
                    notification.createNotification();
                    // ----------------------------------------------

                } else if (action == 'unfollow') {
                    let add_to_followers = await this.mdb_user.update(user_to_follow_id, { $pull : { followers : user_id} });
                    res.data = await this.mdb_user.update(user_id, { $pull : { following : user_to_follow_id} });
                }
            } else {
                res.status = 'error';
                res.message = is_validated.message;
            }
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }

    /**
     *
     * @param { String } user_id
     * @param { String } user_to_follow_id
     *
     * @return { Object | Boolean } will return object with message key if data is not valid and will return Boolean for valid
     */
    async validateFollowData (user_id, user_to_follow_id)
    {
        // check if user_data._id is the same with user_to_follow_id
        if (user_id === user_to_follow_id) {
            return { message : 'You cannot follow yourself' };
        }

        if (!user_to_follow_id) {
            return { message : 'Please provide user to follow to proceed' };
        }

        // check if user to follow exists
        let user = await this.mdb_user.findById(user_to_follow_id);

        if (!user) {
            return { message : 'The user you are trying to follow do not exist in our record' };
        }

        return false;
    }

    /**
     *
     * @param { Array } followers_id -> logged in user followers_id
     * @param { Array } followings_id -> logged in user following_id
     *
     * @retrun { Object } of user information of logged in user followers_id and following_id
     */
    async getFollowData(followers_id, followings_id)
    {
        let res = {};

        try {
            res.status = 'success';
            let image_class = new ImageClass();

            let followers = await this.mdb_user.getFollowDataByIds(followers_id);
            // followers = await image_class.convertImagePath(followers, 'avatar_path', 'avatar');

            let following = await this.mdb_user.getFollowDataByIds(followings_id);
            // following = await image_class.convertImagePath(following, 'avatar_path', 'avatar');

            res.data = {
                followers: followers,
                following: following
            }
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }
    async getUser()
	{
		let res = {};
		try
		{
            res = await this.mdb_user.doc(this.user_information.id);
            res.status = "success";
		}
		catch (error)
		{
			res.status = "error";
            res.message = error.message;
		}

		return res;
    }

    async validateChangePassword(change_data)
    {
        let is_valid = await this.validateChangePasswordData(change_data);

        if (is_valid.status == 'success' && is_valid.data.email) {
           return { status : "success", data : is_valid.data };
        } else {
            return is_valid;
        }
    }


    async validateChangePasswordData (data)
    {
        const { email, old_password, new_password, confirm_password } = data;
        const check_email = await this.mdb_user.findByEmail(data.email);

        let res = {};
        if(!check_email){
            res.status = 'error';
            res.message = 'User not found'
        } else if (old_password == '' || new_password == '' || confirm_password == '' ) {
            res.status = 'error';
            res.message = 'Please fill up all fields';
        } else if (new_password != confirm_password) {
            res.status = 'error';
            res.message = "The password you've entered didn't match";
        } else {
            try {
                if (check_email) {
                    res.status = 'success';
                    res.data = data
                } else {
                    res.status = 'error';
                    res.message = error.message;
                }
            } catch (error) {
                res.status = 'error';
                res.message = error.message;
            }
        }
        return res;
    }

    /**
     *
     * @param { object } user_data = logged in user info
     * @param { String } item_id = item_id to add / delete from wishlist
     *
     * @return { object } res status = success/error | message = for errors | {obj} user = with updated wishlist
     */
    async updateWishlist(user_data, item_id)
    {
        let res = {};

        try {
            // validate item if existing
            let is_validated = await this.validateWishlistId(user_data._id, item_id);

            if (!is_validated) {
                res.status = 'success';

                // check if user is currently following this provided `user_to_follow` to determing action
                let action =  user_data.wishlist.includes(item_id) ? 'update' : 'add';
                let update = {};

                if (action == 'add') {
                    update = await this.mdb_user.update(user_data._id, { $push : { wishlist : item_id} });
                } else if (action == 'update') {
                    update = await this.mdb_user.update(user_data._id, { $pull : { wishlist : item_id} });
                }
                res.data = update;
            } else {
                res.status = 'error';
                res.message = is_validated.message;
            }
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }

    /**
     *
     * @param { String } item_id = validate item before updating records
     *
     * @return { bool | obj } item_id is valid if false | item_id is not valid if return is obj;
     */

    async validateWishlistId (user_id, item_id)
    {
        if (!item_id) {
            return { message : 'Please choose an item to add from wishlist' };
        }

        // check if item to add in wishlist exists
        let item = await this.mdb_items.find({_id : item_id, status: 'available'});
        if (item.length === 0) {
            return { message : 'The item you are trying to add from wishlist do not exist in our records' };
        } else if (item[0].seller_id == user_id) {
            return { message : 'Invalid wishlist item' };
        }

        return false;
    }

    /**
     *
     * @param { Array } wishlist_ids eq array of item_ids
     *
     * @return { obj } wishlist = item details
     */
    async getWishlist(wishlist_ids)
    {
        let res = {};

        try {
            res.status = 'success';
            let image_class = new ImageClass();

            let wishlist = await this.mdb_items.getWishlistDataByIds(wishlist_ids);
            // wishlist = await image_class.convertImagePath(wishlist, ['seller_avatar', 'item_image'], ['avatar', 'product-imgs/normal_size']);

            res.data = wishlist
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }

    /**
     *
     * @param { Array } wishlist_ids eq array of item_ids
     *
     * @return { obj } wishlist match item with details
     */
    async getWishlistMatch(wishlist_ids)
    {
        let res = {};
        try {
            res.status = 'success';
            res.data = [];

            let wishlist_names = await this.mdb_items.getWishlistNamesByIds(wishlist_ids);

            if (wishlist_names) {
                let wishlist_match = await this.mdb_items.getWishlistMatchByWishlistName(wishlist_names, wishlist_ids);

                // let image_class = new ImageClass();
                // wishlist_match = await image_class.convertImagePath(wishlist_match, ['seller_avatar', 'item_image'], ['avatar', 'product-imgs/normal_size']);

                res.data = wishlist_match;
            }
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }
        return res;
    }

    /**
     *
     * @param { String } user_id of user to update
     * @param { Int } last_active can be 0 for active and timestamp of inactive
     * @param { String } status can be active|inactive
     *
     * @return { Object } user info of updated user info
     */
    async updateUserOnlineStatus(user_id, last_active = 0, status = 'active')
    {
        let res = {};

        try {
            res.status = 'success';

            let online_status = (status == 'active') ? true : false;
            res.data = await this.mdb_user.updateUserOnlineStatus(user_id, last_active, online_status);
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }

    // Generate 2FA OTP - Paul Musa
    async generate2faOTP(user_id)
    {
        const mdb_user = new MDB_USER();
        const result = await mdb_user.doc(user_id);

        const otp = speakeasy.totp({
            secret:   result.google_authenticator.ascii,
            encoding: "ascii"
        })

        return otp;
    }

    // Verify 2FA OTP - Paul Musa
    async verify2faOTP(ascii, otp)
    {
        const is_otp_verified = speakeasy.totp.verify({
            secret:   ascii,
            encoding: "ascii",
            token:    otp,
            window:   1
        })

        return is_otp_verified; // returns true or false
    }

    // Enable 2FA - Paul Musa
    async enable2fa()
    {
        let res = {};

        let { user_id, google_authenticator, otp  } = this.user_information;

        const is_verified = await this.verify2faOTP(google_authenticator.ascii, otp);

        if(is_verified === true)
        {
            google_authenticator.is_2fa_enabled = true;

            const mdb_user    = new MDB_USER();
            await mdb_user.update(user_id, {
                google_authenticator: google_authenticator
            })

            res.status = 'success';
        }
        else
        {
            res.status  = 'error';
            res.message = 'Invalid 2FA';
        }

        return res;
    }

    // Enable 2FA - Paul Musa
    async disable2fa()
    {
        let res = {};

        let { user_id, otp  } = this.user_information;

        const mdb_user    = new MDB_USER();
        const user        = await mdb_user.doc(user_id);
        const is_verified = await this.verify2faOTP(user.google_authenticator.ascii, otp);

        if(is_verified === true)
        {
            await mdb_user.update(user_id, {
                $unset: { google_authenticator: "" }
            })

            res.status = 'success';
        }
        else
        {
            res.status  = 'error';
            res.message = 'Invalid 2FA';
        }

        return res;
    }

    /**
     *
     * @param { String } user_id
     *
     * @return { Object } of user message thread with friend's online status and last active timestamp
     */
    async getUserMessageFriendsOnlineStatus(user_id)
    {
        let res = {};

        try {
            res.status = 'success';

            // get user messeges info
            let messages = await this.mdb_message.getUserMessageFriendsOnlineStatus(user_id);

            res.data = messages;
        } catch (error) {
            res.status = 'success';
            res.message = error.message;
        }

        return res;
    }

    async getBTCBalance(btc_address, db_balance)
    {
        const mdb_wallet    = new MDB_WALLET();
        let satoshi_balance = 0;

        const balance = async (count = 0) => {
            // Blockchain.info API
            let url = `https://testnet.blockchain.info/balance?active=${btc_address}`;
            await axios.get(url).then(async response => {
                satoshi_balance = response.data[btc_address].final_balance;

                if(db_balance !== satoshi_balance)
                {
                    await mdb_wallet.updateByPublicKey(btc_address, satoshi_balance);
                }
            })
            .catch(async error => {
                if(count >= 3)
                {
                    console.log(" 'BTC API ERROR COUNT' : " + " " + count)
                    return;
                }

                count++
                await balance(count);
            })
        }
        await balance();

        return true;
    }

    async getEthBalance()
    {
        let { user_id, abbreviation } = this.user_information;
        const mdb_wallet = new MDB_WALLET();

        let crypto_wallet = await mdb_wallet.findByCurrencyAndUserId(abbreviation, user_id);

        let crypto_balance = await web3.eth.getBalance(crypto_wallet.public_key);
        let gwei = await web3.utils.fromWei(crypto_balance, 'gwei');
        let crypto_balance_num = Math.floor(Number(gwei));

        mdb_wallet.update(crypto_wallet._id, { balance: crypto_balance_num });
        return;
    }

    async getInfo()
    {
        let { user_id } = this.user_information;
        let user_info = await this.mdb_user.findByUserId(user_id);

        return user_info;
    }

}
