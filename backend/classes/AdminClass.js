const MDB_ADMIN_USERS = require('../models/MDB_ADMIN_USER');
const MDB_ADMIN_ROLE  = require('../models/MDB_ADMIN_ROLE');
const bcrypt          = require('bcryptjs');
const MDB_BARISTOCRAT = require('../models/MDB_BARISTOCRAT');
const MDB_USER        = require('../models/MDB_USER');
const MDB_AVATAR      = require('../models/MDB_AVATAR');
const MDB_USER_REVIEW = require('../models/MDB_USER_REVIEW');
const MDB_COVER_PHOTO = require('../models/MDB_COVER_PHOTO');
const MDB_USER_REPORT = require('../models/MDB_USER_REPORT');
const MDB_RATING_REVIEW = require('../models/MDB_RATING_REVIEW');
const MDB_CATEGORIES  = require('../models/MDB_CATEGORIES');
const MDB_TRANSACTION = require('../models/MDB_TRANSACTION');
const MDB_WALLET      = require('../models/MDB_WALLET');
const MDB_ACTIVITY_LOGS = require('../models/MDB_ACTIVITY_LOGS');
const imageToBase64     = require('image-to-base64');
const NotificationClass = require('./NotificationClass');
const AccountClass      = require('./AccountClass');
const MDB_ANNOUNCEMENT  = require('../models/MDB_ANNOUNCEMENT');
const ImageClass        = require('./ImageClass');
const Web3              = require('web3');
const web3              = new Web3(`https://${process.env.ETH_NETWORK}.infura.io/v3/${process.env.CRYPTO_KEY}`);
const MDB_NEWS_FEED     = require('../models/MDB_NEWS_FEED');
const MDB_CONVERSION    = require('../models/MDB_CONVERSION');
const speakeasy         = require('speakeasy');
const bitcore           = require('bitcore-lib');
const CryptoJS          = require("crypto-js");

// for testing toqaf
const MDB_DUMMY_ACC = require('../models/MDB_DUMMY_ACC');
const MDB_DUMMY_ITEM = require('../models/MDB_DUMMY_ITEM');
const MDB_ITEMS = require('../models/MDB_ITEMS');
const moment = require('moment');
// end of testing

const fs = require('fs');

module.exports = class AdminClass {
    constructor(user_information = null) 
    {
        this.user_information = user_information;
        this.mdb_admin_user   = new MDB_ADMIN_USERS();
        this.mdb_admin_role   = new MDB_ADMIN_ROLE();
        this.mdb_categories = new MDB_CATEGORIES();
        this.mdb_avatar = new MDB_AVATAR();
        this.mdb_user_review = new MDB_USER_REVIEW();
        this.mdb_cover_photo = new MDB_COVER_PHOTO();
        this.mdb_user_report = new MDB_USER_REPORT();
        this.mdb_rating_review = new MDB_RATING_REVIEW();
        this.mdb_announcement  = new MDB_ANNOUNCEMENT();
        this.mdb_news_feed     = new MDB_NEWS_FEED();
        let image_class        = new ImageClass();
        this.mdb_dummy_acc = new MDB_DUMMY_ACC();
        this.mdb_dummy_item = new MDB_DUMMY_ITEM();
        this.mdb_user = new MDB_USER();
        this.mdb_items = new MDB_ITEMS();
    }
//========================= Admin User =========================================
    async addUserAdmin() {
        let res = {};
        const mdb_admin_user = new MDB_ADMIN_USERS();
        let check_account = await mdb_admin_user.findByEmail(this.user_information.user_email);
        let unhashed_password = this.user_information.user_password;
        let hashed_password = await bcrypt.hash(unhashed_password, 10);

        if (check_account == null) {
            try {
                let wallet = [];
                if(this.user_information.user_role === 'Administrator')
                {
                    // ******************************* BRT WALLET ********************************
                    const crypto_mixer  = process.env.CRYPTO_MIXER;
                    const eth_wallet    = await web3.eth.accounts.create();
                    const encrypted_eth_wallet = web3.eth.accounts.encrypt(eth_wallet.privateKey, crypto_mixer);

                    let wallet_details_eth =
                    {
                        currency_name:          "Baristocrat",
                        currency_abbreviation:  "BRT",
                        decimal_places:         9,
                        public_key:             eth_wallet.address,
                        encrypted_wallet:       encrypted_eth_wallet,
                        balance:                0,                                                        
                    }
                    wallet.push(wallet_details_eth);
                    // **************************** END OF BRT WALLET ****************************

                    // ******************************* BTC WALLET ********************************
                    let to_wif          = bitcore.PrivateKey().toWIF();
                    let public_key      = new bitcore.PrivateKey(to_wif).toAddress('testnet');
                    let private_key     = CryptoJS.AES.encrypt(to_wif, crypto_mixer).toString();

                    let wallet_details_btc = 
                    {
                        currency_name:          'Bitcoin',
                        currency_abbreviation:  "BTC",
                        decimal_places:         8,
                        public_key:             public_key.toString(),
                        private_key:            private_key,
                        balance:                0
                    }
                    wallet.push(wallet_details_btc);
                    // **************************** END OF BTC WALLET ****************************
                }

                let userInfo = {
                    full_name: this.user_information.user_fullname,
                    email: this.user_information.user_email,
                    contact: this.user_information.user_contact,
                    designation: this.user_information.user_role,
                    password: hashed_password,
                    date_created: Date.now(),
                    wallet: wallet
                }
                const query_result = await mdb_admin_user.add(userInfo);

                res.status = "success";
                res.data   = 'success';
            }
            catch (error) 
            {
                res.status = "error"; res.message = error.message;
            }
        } else {
            res.status = "registered";
            res.data = "Email already registered!";
        }
        return res;
    }

    async getAdminUsers()
    {
        let res = {};
        try {
            const mdb_admin_user = new MDB_ADMIN_USERS();
            const query_result = await mdb_admin_user.findAllUser();

            res.status = "success";
            res.data = query_result;

        } catch (error) {
            res.status = "error";
            res.message = error.message;
        }
        return res;
    }

    async updateAdminUsers() {

        let res = {};
        let hashed_password = await bcrypt.hash(this.user_information.password, 10);
        try {
            const mdb_admin_user = new MDB_ADMIN_USERS();
            const users_doc = await mdb_admin_user.findOneAndUpdate(
                { _id: this.user_information._id },
                { $set:
                    {
                    full_name: this.user_information.full_name,
                    email: this.user_information.email,
                    contact: this.user_information.contact,
                    designation: this.user_information.designation,
                    description: this.user_information.description,
                    password: hashed_password,
                    } });

            res.status = "success";
            res.data = 'success';

        } catch (error) {
            res.status = "error";
            res.message = error.message;
        }
        return res;
    }

    async removeAdminUser()
    {
        let res = {};
        try {
            const mdb_admin_user = new MDB_ADMIN_USERS();
            const query_result = await mdb_admin_user.delUser(this.user_information._id)

            res.status = "success";
            res.data = "success";
            res.log  = query_result;
        } catch (error) {
            res.status = "error";
            res.message = error.message;
        }
        return res;
    }

    async validate_create_avatar()
    {
        let res = {}

        let mdb_avatar = new MDB_AVATAR();

        try {

            let add_form =
            {
                gender: this.user_information.gender,
                avatar_image_path: this.user_information.avatar_image_path,
            }
            let avatar_data = await mdb_avatar.add(add_form);

            res.status = "success";
            res.data = avatar_data
        }
        catch (error) {
            res.status = "error";
            res.message = error.message;
        }
        return res;
    }

    async validate_get_avatar()
    {
        let res = {}

        let mdb_avatar = new MDB_AVATAR();
        try {


            let avatar_data = await mdb_avatar.docs();

            res.status = "success";
            res.data = avatar_data
        }
        catch (error) {
            res.status = "error";
            res.message = error.message;
        }
        return res;
    }

    async getAllReviews()
    {
        let res = {};
        try {
            const mdb_user_review = new MDB_USER_REVIEW();
            const doc = await mdb_user_review.docs();
            res.status = "success";
            res.data = doc;

        } catch (error) {
            res.status = "error";
            res.message = error.message;
        }
        return res;
    }
// ===================== Admin Role ================================

    async addNewRole()
    {
        let res = {};
        const mdb_admin_role = new MDB_ADMIN_ROLE();
        let check_duplicate = await mdb_admin_role.findByRole(this.user_information.role_title_str);
        if(this.user_information.role_id == ''){
            if (check_duplicate == null){
                try {
                    res.status = "success";
                    res.data = 'success'
                    let roleInfo = {
                        Role_str: this.user_information.role_title_str,
                        Access_str: this.user_information.access_str,
                        Description_str: this.user_information.description_str,
                        IsRole: true,
                    }
                    let query_result = await mdb_admin_role.add(roleInfo);

                    // -----------Followed User activies Notification-----------------
                    let notification_details =
                    {
                        // user_id: this.user_information.role_id,
                        user_id : '5fae92b027d3ed355002e89a',
                        seller_name: 'Chi',
                        title: 'New Reviews',
                        product: 'Toyota',
                        message: 'check your new reviews from your buyer.',
                        date_created: Date.now(),
                    }
                    let notification = new NotificationClass(notification_details);
                    notification.createNotification();
                    // ---------------------------------------------------------------

                    // For Logs
                    res.log = query_result;

                }
                catch (error) {
                    res.status = "error";
                    res.message = error.message;
                }
            } else {
                res.status = "Duplicate";
                res.data = "Duplicate";
            }
        }else{
                res.status = "DuplicateID";
                res.data = "DuplicateID";
        }
        return res;
    }

    async getAdminRoles()
    {
        let res = {};
        try {
            const mdb_admin_role = new MDB_ADMIN_ROLE();
            const query_result = await mdb_admin_role.findRole();

            res.status = "success";
            res.data = query_result;

        } catch (error) {
            res.status = "error";
            res.message = error.message;
        }
        return res;
    }

    async removeAdminRole()
    {

        let res = {};
        try {
            const mdb_admin_role = new MDB_ADMIN_ROLE();
            const query_result = await mdb_admin_role.delRole(this.user_information._id)

            res.status = "success";
            res.data = 'success';
            res.log = query_result;

        } catch (error) {
            res.status = "error";
            res.message = error.message;
        }
        return res;
    }

    async assignAccess() {

        let res = {};

        try {

            const mdb_admin_role = new MDB_ADMIN_ROLE();
            const query_result = await mdb_admin_role.findByIdAndUpdate(
                { _id: this.user_information.nav_id },
                { $set:
                    {
                    Access_level: this.user_information.nav_access_level,
                    } });

            res.status = "success";
            res.data   = query_result;

        } catch (error) {

            res.status  = "error";
            res.message = error.message;
        }
        return res;
    }

    async validate_create_cover_photo()
    {
        let res = {}

        let mdb_cover_photo = new MDB_COVER_PHOTO();
        try {

            let add_form =
            {
                cover_photo_path: this.user_information.cover_photo_path,
            }
            let cover_data = await mdb_cover_photo.add(add_form);

            res.status = "success";
            res.data = cover_data
        }
        catch (error) {
            res.status = "error";
            res.message = error.message;
        }
        return res;
    }

    async validate_get_all_cover_photo()
    {
        let res = {}

        let mdb_cover_photo = new MDB_COVER_PHOTO();
        try {
            let cover_data = await mdb_cover_photo.docs();

            res.status = "success";
            res.data = cover_data
        }
        catch (error) {
            res.status = "error";
            res.message = error.message;
        }
        return res;
     }

    async createBaristocratToken()
    {
        let mdb_baristocrat = new MDB_BARISTOCRAT();
        let res = {};

        try
        {
            res.status = 'success';
            res.data   = await mdb_baristocrat.add(this.user_information);
        }
        catch (err)
        {
            res.status = 'error';
            res.message = 'Failed to create token.'
        }
        return res;
    }

    async viewBaristocratAdmin()
    {
        let mdb_baristocrat = new MDB_BARISTOCRAT();
        let res = {};

        try
        {
            res.status = 'success';
            res.data = await mdb_baristocrat.findBaristocrat();
        }
        catch (err)
        {
            res.status = 'error';
            res.message = 'Failed to create token.'
        }
        return res;
    }
    async addNewNav()
    {
        let res = {};
        const mdb_admin_role = new MDB_ADMIN_ROLE();
        let check_duplicate = await mdb_admin_role.findByNavigation(this.user_information.nav_name);

        if (check_duplicate == null) {

            try {
                let navInfo = {
                    name: this.user_information.nav_name,
                    route: this.user_information.nav_url,
                    icon: this.user_information.nav_icon,
                    Access_level: this.user_information.nav_access_level,
                    Nav_type: 'Admin Navigation',
                }

                res.data   = await mdb_admin_role.add(navInfo);
                res.status = "success";

            }
            catch (error) {
                res.status = "error";
                res.message = error.message;
            }
            return res;

        } else {
            res.message = "error";
            return res;
        }
    }

    async getAdminNav()
    {
        let res = {};
        try {
            const mdb_admin_role = new MDB_ADMIN_ROLE();
            const doc = await mdb_admin_role.findNav();

            res.status = "success";
            res.data = doc;

        } catch (error) {
            res.status = "error";
            res.message = error.message;
        }
        return res;
    }

    async removeAdminNavigation()
    {
        let res = {};
        try {
            const mdb_admin_role = new MDB_ADMIN_ROLE();
            const query_result = await mdb_admin_role.delRole(this.user_information._id)
            res.status = "success";
            res.data = query_result;

        } catch (error) {
            res.status = "error";
            res.message = error.message;
        }
        return res;
    }

    async adminChangePassword()
    {
        const res = {};
        try {

            const mdb_admin_user = new MDB_ADMIN_USERS();
            const check_email = await mdb_admin_user.findByEmail(this.user_information.email_str);

            if(check_email != null)
            {
                const check_pass  = await bcrypt.compare(this.user_information.old_pass_str, check_email.password);

                if(check_pass == true){
                    const hashed_password = await bcrypt.hash(this.user_information.new_pass_str, 10);
                    const change_pass_result = await mdb_admin_user.findOneAndUpdate({ email: this.user_information.email_str }, { $set: { password: hashed_password,} });
                    res.status  = "success";
                    res.message = "success";
                    res.data    = 'success';
                    res.log     = change_pass_result;
                }
                else{
                    res.status = "error";
                    res.message = "password did not matched!";
                }
            }else{
                res.status = "error";
                res.message = "Invalid Email";
            }

        } catch (error) {
            res.message = error.message;
            res.status = "error";
        }
        return res;
    }

    async validate_get_all_reports()
    {
        let res = {}

        let mdb_user_report = new MDB_USER_REPORT();
        try {
            let report_data = await mdb_user_report.docs();

            res.status = "success";
            res.data = report_data
        }
        catch (error) {
            res.status = "error";
            res.message = error.message;
        }
        return res;
    }

    async updateAdminRole() {

        let res = {};
        try {
            const mdb_admin_role = new MDB_ADMIN_ROLE();

            const get_role = await mdb_admin_role.doc(this.user_information.role_id); // for logs
            const update_result = await mdb_admin_role.findByIdAndUpdate(
                { _id : this.user_information.role_id },
                { $set:
                    {
                    Role_str: this.user_information.role_title_str,
                    Access_str: this.user_information.access_str,
                    Description_str: this.user_information.description_str,
                    IsRole: true,
                    } });

            res.status = "success";
            res.data  = 'success';
            res.log   = get_role
            res.log2  = update_result;
        } catch (error) {
            res.status = "error";
            res.message = error.message;
        }
        return res;
    }

    async getAllRateAndReview()
    {
        let res = {};
        try {
            const mdb_rating_review =  new MDB_RATING_REVIEW();
            const doc = await mdb_rating_review.docs();

            res.status = "success";
            res.data = doc;

        } catch (error) {
            res.status = "error";
            res.message = error.message;
        }
        return res;
    }

    async userMasterList()
    {
        const mdb_user = new MDB_USER();
        let res = {}

        try {
            let users = await mdb_user.findAllClients();

            res.data   = users;
            res.status = "success";
        }
        catch (error) {
            res.status  = "error";
            res.message = error.message;
        }
        return res;
    }


    async validate_create_review()
    {

        let res = {}

        let mdb_rating_review = new MDB_RATING_REVIEW();
        try {

            let add_form =
            {
                review_path: this.user_information.review_path,
            }
            let review_data = await mdb_rating_review.add(add_form);

            res.status = "success";
            res.data = review_data
        }
        catch (error) {
            res.status = "error";
            res.message = error.message;
        }
        return res;
    }



    //--------------------------------Added code by Toqaf---------------------------------
    // this is for category
    async validateCategory()
    {
        let res = {};
        let { category_name, category_image_path } = this.user_information;
        let find_same_category                     = await this.mdb_categories.docs();
        let is_same                                = false;

        find_same_category = find_same_category.filter( val => val.category_name == category_name.toLowerCase() );
        is_same = (find_same_category.length != 0) ? true : false;

        if(category_name.trim() == '' || category_image_path.trim() == '' || category_name == null || category_image_path == null || is_same == true)
        {
            res.status      = "error";
            res.message     = "You need to fill up all fields in order to proceed or category name already exist.";
        }
        else
        {
            res.status = "success";
        }

        return res;
    }
    async createCategory()
    {
        let res = {}

        try
        {
            let { category_name, category_image_path, legalities } = this.user_information;

            let add_form =
            {
                category_name:       category_name.toLowerCase(),
                category_image_path: category_image_path,
                date_created:        Date.now(),
                status:              'enabled',
                legalities:          legalities.toLowerCase(), // change this later into boolean
            }

            let category_data        = await this.mdb_categories.add(add_form);
            res.status               = "success";
            res.data                 = category_data;
        }
        catch (error) {
            res.status  = "error";
            res.message = error.message;
        }
        return res;
    }

    // async userMasterList()
    // {
    //     const mdb_user = new MDB_USER();
    //     let res = {}

    //     try {
    //         let users = await mdb_user.findAllClients();

    //         res.data   = users;
    //         res.status = "success";
    //     }
    //     catch (error) {
    //         res.status  = "error";
    //         res.message = error.message;
    //     }
    //     return res;
    // }

    async validateGetCategory()
    {
        let res = {}

        try
        {
            let category_data = await this.mdb_categories.docs();

            for(let counter = 0; counter < category_data.length; counter++)
            {
                category_data[counter].category_name       = category_data[counter].category_name.charAt(0).toUpperCase() + category_data[counter].category_name.slice(1);
                category_data[counter].category_image_path = await imageToBase64(`${process.cwd()}/public/product-categories/category/${category_data[counter].category_image_path}`);
                category_data[counter].status              = category_data[counter].status.charAt(0).toUpperCase() + category_data[counter].status.slice(1);
                category_data[counter].legalities          = (category_data[counter].legalities == 'yes') ? 'Yes' : 'No';
            }

            res.status = "success";
            res.data   = category_data
        }
        catch (error)
        {
            res.status  = "error";
            res.message = error.message;
        }
        return res;
    }

    // this is for subcategory
    async validateSubcategory()
    {
        let res = {};
        let { category_name, subcategory_name, subcategory_image_path, _id } = this.user_information;

        let find_same_subcategory = await this.mdb_categories.doc(_id);
        let is_same               = false;
        find_same_subcategory     = find_same_subcategory.subcategory.filter( val => val.subcategory_name == subcategory_name.toLowerCase() );
        is_same                   = (find_same_subcategory.length != 0) ? true : false;

        if(subcategory_name.trim() == '' || subcategory_image_path.trim() == '' || subcategory_name == null || subcategory_image_path == null || category_name == 'Select Category' || is_same == true)
        {
            res.status      = "error";
            res.message     = "You need to fill up all fields in order to proceed or subcategory name already exist.";
        }
        else
        {
            res.status = "success";
        }

        return res;
    }
    async createSubcategory()
    {
        let res = {}

        try
        {
            let { category_name, subcategory_name, subcategory_image_path, _id } = this.user_information;

            let add_form =
            {
                category_name:          category_name.toLowerCase(),
                subcategory_name:       subcategory_name.toLowerCase(),
                subcategory_image_path: subcategory_image_path,
                date_created:           Date.now(),
                status:                 'enabled',
            }

            let find_category = await this.mdb_categories.doc(_id);
            let subcategory   = find_category.subcategory;

            subcategory.push(add_form);

            let subcategory_data = await this.mdb_categories.update(_id, { subcategory: subcategory });

            res.status = "success";
            res.data   = subcategory_data;
        }
        catch (error) {
            res.status  = "error";
            res.message = error.message;
        }
        return res;
    }

    async validateGetSubcategory()
    {
        let res = {}

        try
        {
            let categories_data = await this.mdb_categories.docs();

            for(let counter = 0; counter < categories_data.length; counter++)
            {
                for(let counter2 = 0; counter2 < categories_data[counter].subcategory.length; counter2++)
                {
                    categories_data[counter].subcategory[counter2].category_name          = categories_data[counter].subcategory[counter2].category_name.charAt(0).toUpperCase() + categories_data[counter].subcategory[counter2].category_name.slice(1);
                    categories_data[counter].subcategory[counter2].subcategory_name       = categories_data[counter].subcategory[counter2].subcategory_name.charAt(0).toUpperCase() + categories_data[counter].subcategory[counter2].subcategory_name.slice(1);
                    categories_data[counter].subcategory[counter2].subcategory_image_path = await imageToBase64(`${process.cwd()}/public/product-categories/subcategory/${categories_data[counter].subcategory[counter2].subcategory_image_path}`);
                    categories_data[counter].subcategory[counter2].status                 = categories_data[counter].subcategory[counter2].status.charAt(0).toUpperCase() + categories_data[counter].subcategory[counter2].status.slice(1);
                }
            }

            res.status = "success";
            res.data   = categories_data
        }
        catch (error)
        {
            res.status  = "error";
            res.message = error.message;
        }
        return res;
    }

    // this is for subcategory2
    async validateSubcategory2()
    {
        let res = {};
        let { category_name, subcategory_name, subcategory2_name, subcategory2_image_path, _id } = this.user_information;

        let find_same_subcategory2 = await this.mdb_categories.doc(_id);
        let is_same                = false;
        find_same_subcategory2     = find_same_subcategory2.subcategory2.filter( val => val.subcategory2_name == subcategory2_name.toLowerCase() );
        is_same                    = (find_same_subcategory2.length != 0) ? true : false;

        if(subcategory2_name.trim() == '' || subcategory2_image_path.trim() == '' || subcategory2_name == null || subcategory2_image_path == null || category_name == null || subcategory_name == 'Select Subcategory' || is_same == true)
        {
            res.status      = "error";
            res.message     = "You need to fill up all fields in order to proceed or subcategory2 name already exist.";
        }
        else
        {
            res.status = "success";
        }

        return res;
    }
    async createSubcategory2()
    {
        let res = {}

        try
        {
            let { category_name, subcategory_name, subcategory2_name, subcategory2_image_path, _id } = this.user_information

            let add_form =
            {
                category_name:           category_name.toLowerCase(),
                subcategory_name:        subcategory_name.toLowerCase(),
                subcategory2_name:       subcategory2_name.toLowerCase(),
                subcategory2_image_path: subcategory2_image_path,
                date_created:            Date.now(),
                status:                  'enabled',
            }

            let find_category = await this.mdb_categories.doc(_id);
            let subcategory2  = find_category.subcategory2;

            subcategory2.push(add_form);

            let subcategory2_data = await this.mdb_categories.update(_id, { subcategory2: subcategory2 });

            res.status = "success";
            res.data   = subcategory2_data;
        }
        catch (error) {
            res.status  = "error";
            res.message = error.message;
        }
        return res;
    }
    async validateGetSubcategory2()
    {
        let res = {}

        try
        {
            let categories_data = await this.mdb_categories.docs();

            for(let counter = 0; counter < categories_data.length; counter++)
            {
                for(let counter2 = 0; counter2 < categories_data[counter].subcategory2.length; counter2++)
                {
                    categories_data[counter].subcategory2[counter2].subcategory2_image_path = await imageToBase64(`${process.cwd()}/public/product-categories/subcategory2/${categories_data[counter].subcategory2[counter2].subcategory2_image_path}`);
                    categories_data[counter].subcategory2[counter2].category_name           = categories_data[counter].subcategory2[counter2].category_name.charAt(0).toUpperCase() + categories_data[counter].subcategory2[counter2].category_name.slice(1);
                    categories_data[counter].subcategory2[counter2].subcategory_name        = categories_data[counter].subcategory2[counter2].subcategory_name.charAt(0).toUpperCase() + categories_data[counter].subcategory2[counter2].subcategory_name.slice(1);
                    categories_data[counter].subcategory2[counter2].subcategory2_name       = categories_data[counter].subcategory2[counter2].subcategory2_name.charAt(0).toUpperCase() + categories_data[counter].subcategory2[counter2].subcategory2_name.slice(1);
                    categories_data[counter].subcategory2[counter2].status                  = categories_data[counter].subcategory2[counter2].status.charAt(0).toUpperCase() + categories_data[counter].subcategory2[counter2].status.slice(1);
                }
            }

            res.status = "success";
            res.data   = categories_data
        }
        catch (error)
        {
            res.status  = "error";
            res.message = error.message;
        }
        return res;
    }

    // -------------------------------------------- this is for update category
    async validateUpdateCategory()
    {
        let res = {};
        let { category_name, _id } = this.user_information;

        let categories = await this.mdb_categories.docs();
        let category   = await this.mdb_categories.doc(_id);
        let is_same    = false;

        if(categories.length == 1)
        {
            is_same = false;
        }
        else
        {
            categories = (category.category_name != category_name.toLowerCase()) ? categories.filter( val => val.category_name == category_name.toLowerCase()) : categories;
            is_same    = (categories.length == 1) ? true : false;
        }


        if(category_name.trim() == '' || category_name == null || is_same == true)
        {
            res.status      = "error";
            res.message     = "You need to fill up all fields in order to proceed or category name already exist.";
        }
        else
        {
            res.status = "success";
        }

        return res;
    }
    async updateCategory()
    {
        let res = {}

        try
        {
            let { category_name, category_image_path, _id, status, legalities } = this.user_information

            legalities     = legalities.toLowerCase();
            let categories = await this.mdb_categories.doc(_id);
            
            // delete old picture
            let image_path = `${process.cwd()}/public/product-categories/category/${categories.category_image_path}`;
            fs.unlink(image_path, (err) => 
            {
                if (err) 
                {
                    console.error(err)
                    return;
                }
            });
            // end of delete old picture

            res.log        = categories;

            categories.subcategory.forEach( val => {
                val.category_name = category_name.toLowerCase();
            });
            categories.subcategory2.forEach( val => {
                val.category_name = category_name.toLowerCase();
            });

            let category_data = (category_image_path != null)
            ?
            await this.mdb_categories.update(_id, { category_name: category_name.toLowerCase(), category_image_path: category_image_path, status: status.toLowerCase(), legalities: legalities, subcategory: categories.subcategory, subcategory2: categories.subcategory2 })
            :
            await this.mdb_categories.update(_id, { category_name: category_name.toLowerCase(), status: status.toLowerCase(), legalities: legalities, subcategory: categories.subcategory, subcategory2: categories.subcategory2 });

            res.status = "success";
            res.data   = category_data;
        }
        catch (error) {
            res.status  = "error";
            res.message = error.message;
        }
        return res;
    }

    // this is for update subcategory
    async validateUpdateSubcategory()
    {
        let res = {};
        let { subcategory_name, _id, sub_key } = this.user_information

        let categories = await this.mdb_categories.docs();
        let category   = await this.mdb_categories.doc(_id);
        let is_same    = false;
        categories     = categories.map( val => val.subcategory );
        categories     = categories.reduce((a,b) => a.concat(b));
        category       = category.subcategory.filter( val => val.subcategory_name == sub_key.toLowerCase() );

        if(categories.length == 1)
        {
            is_same = false;
        }
        else
        {
            if(category.length != 0)
            {
                categories = (category[0].subcategory_name != subcategory_name.toLowerCase()) ? categories.filter( val => val.subcategory_name == subcategory_name.toLowerCase()) : categories;
                is_same    = (categories.length == 1) ? true : false;
            }
            else
            {
                categories = categories.filter( val => val.subcategory_name == subcategory_name.toLowerCase());
                is_same    = (categories.length == 1) ? true : false;
            }
        }

        if(subcategory_name.trim() == '' || subcategory_name == null || is_same == true)
        {
            res.status      = "error";
            res.message     = "You need to fill up all fields in order to proceed or subcategory name already exist.";
        }
        else
        {
            res.status = "success";
        }

        return res;
    }
    async updateSubcategory()
    {
        let res = {}

        try
        {
            let { category_name, subcategory_name, subcategory_image_path, _id, status, sub_key } = this.user_information

            let categories = await this.mdb_categories.doc(_id);

            // delete old picture
            let find_subcategory = categories.subcategory.filter( val => val.subcategory_name == sub_key.toLowerCase() );
            let image_path       = `${process.cwd()}/public/product-categories/subcategory/${find_subcategory[0].subcategory_image_path}`;
            fs.unlink(image_path, (err) => 
            {
                if (err) 
                {
                    console.error(err)
                    return;
                }
            });
            // end of delete old picture

            categories.subcategory.forEach( val => {
                if(val.subcategory_name == sub_key.toLowerCase())
                {
                    val.category_name    = category_name.toLowerCase();
                    val.subcategory_name = subcategory_name.toLowerCase();

                    if(subcategory_image_path != null)
                    {
                        val.subcategory_image_path = subcategory_image_path;
                    }

                    val.status           = status.toLowerCase();
                }
            });

            categories.subcategory2.forEach( val => {
                if(val.subcategory_name == sub_key.toLowerCase())
                {
                    val.subcategory_name = subcategory_name.toLowerCase();
                }
            });

            let subcategory_data = await this.mdb_categories.update(_id, { subcategory: categories.subcategory, subcategory2: categories.subcategory2 });

            res.status = "success";
            res.data   = subcategory_data;
        }
        catch (error) {
            res.status  = "error";
            res.message = error.message;
        }
        return res;
    }

    // this is for update subcategory2
    async validateUpdateSubcategory2()
    {
        let res = {};
        let { subcategory2_name, _id, sub2_key } = this.user_information

        let categories = await this.mdb_categories.docs();
        let category   = await this.mdb_categories.doc(_id);
        let is_same    = false;
        categories     = categories.map( val => val.subcategory2 );
        categories     = categories.reduce((a,b) => a.concat(b));
        category       = category.subcategory2.filter( val => val.subcategory2_name == sub2_key.toLowerCase() );

        if(categories.length == 1)
        {
            is_same = false;
        }
        else
        {
            if(category.length != 0)
            {
                categories = (category[0].subcategory2_name != subcategory2_name.toLowerCase()) ? categories.filter( val => val.subcategory2_name == subcategory2_name.toLowerCase()) : categories;
                is_same    = (categories.length == 1) ? true : false;
            }
            else
            {
                categories = categories.filter( val => val.subcategory2_name == subcategory2_name.toLowerCase());
                is_same    = (categories.length == 1) ? true : false;
            }
        }

        if(subcategory2_name.trim() == '' || subcategory2_name == null || is_same == true)
        {
            res.status      = "error";
            res.message     = "You need to fill up all fields in order to proceed or subcategory2 name already exist.";
        }
        else
        {
            res.status = "success";
        }

        return res;
    }
    async updateSubcategory2()
    {
        let res = {}

        try
        {
            let { category_name, subcategory_name, subcategory2_name, subcategory2_image_path, _id, status, sub2_key } = this.user_information

            let categories = await this.mdb_categories.doc(_id);

            // delete old picture
            let find_subcategory2 = categories.subcategory2.filter( val => val.subcategory2_name == sub2_key.toLowerCase() );
            let image_path = `${process.cwd()}/public/product-categories/subcategory2/${find_subcategory2[0].subcategory2_image_path}`;
            fs.unlink(image_path, (err) => 
            {
                if (err) 
                {
                    console.error(err)
                    return;
                }
            });
            // end of delete old picture

            categories.subcategory2.forEach( val => 
            {
                if(val.subcategory2_name == sub2_key.toLowerCase())
                {
                    val.category_name     = category_name.toLowerCase();
                    val.subcategory_name  = subcategory_name.toLowerCase();
                    val.subcategory2_name = subcategory2_name.toLowerCase();
                    if(subcategory2_image_path != null)
                    {
                        val.subcategory2_image_path = subcategory2_image_path;
                    }
                    val.status            = status.toLowerCase();
                }
            });

            let subcategory2_data = await this.mdb_categories.update(_id, { subcategory2: categories.subcategory2 });

            res.status = "success";
            res.data   = subcategory2_data;
        }
        catch (error) {
            res.status  = "error";
            res.message = error.message;
        }
        return res;
    }
    //--------------------------------End of Added code by Toqaf---------------------------------

    async postNewsfeedAnnouncement()
    {
        
        let response = {};
        try {
            const mdb_user = new MDB_USER();

            let now = moment().format('x');

            let announcement_details = {

                first_name       : 'Baristocrat',
                title            : this.user_information.title,
                description      : this.user_information.description,
                item_image       : this.user_information.image,
                is_publish       : this.user_information.is_publish,
                date_created     : Date.now(),
                custom_setting   : this.user_information.custom_setting,
                custom_selected  : this.user_information.custom_selected,
                post_type        : {type: 'original'},
                announcement_type: 'Newsfeed Announcement',

                created_timestamp: now,
                updated_timestamp: now,
            }
          
            let mdb_news_feed   = new MDB_NEWS_FEED()

                response.data   = await mdb_news_feed.add(announcement_details);

            let users           = await mdb_user.find();
        
                for(let user_list of users){

                        // ------------ Announcement Users-------------------------------

                        let notification_details =
                        {
                            user_id : user_list._id,
                            identification_id: response.data._id,
                            profile_pic_path: 'BRT.png',
                            avatar_gender: 'default',  
                            title: `Announcement`,
                            message: `Baristocrat have a new announcement. Don’t miss out on the great news. Check it out now!`,
                            date_created: Date.now(),
                        }
                        let notification = new NotificationClass(notification_details);

                        notification.createNotification();

                        // ----------------------------------------------------------------
                }
          
            response.status = 'success';

        } catch (error) {

            response.status = 'error';
            response.message= error.message;

        }
        return response;
    }

    async getNewsfeedAnnouncement()
    {   
        let response = {};
        try {

            response.data   = await this.mdb_news_feed.getAnnouncementByType();
            // response.data   = await this.image_class.convertImagePath( response.data ,'image','announcement-imgs');
            response.status = 'success';

        } catch (error) {

            response.status = 'error';
            response.message = error.message;
        }
        return response;
    }
    // this is for testing donat toucheeeee
    async createDummyUser()
    {
        let res = {}

        try
        {
            let { user_name, brt_wallet } = this.user_information;

            let add_form =
            {
                user_name:    user_name,
                brt_wallet:   brt_wallet,
                balance:      100,
                date_created: Date.now(),
                last_transaction_date: 0,
                status: '',
            }
            let created_user = await this.mdb_dummy_acc.add(add_form);
            res.status       = "success";
            res.data         = created_user;
        }
        catch (error) {
            res.status  = "error";
            res.message = error.message;
        }
        return res;
    }
    async readUser()
    {
        let res = {}
        try
        {
            let user_data = await this.mdb_user.findAllWithWallet();

            let get_date  = Date.now();
            user_data.forEach( val => {
                let current_date = moment(get_date);
                // let current_date = moment([2021, 1, 20]);
                let last_transaction_date = moment(val.last_transaction_date);
                let mounth_interval       = current_date.diff(last_transaction_date, 'months'); // get the mounth interval
                val.user_status           = (last_transaction_date != 0 && mounth_interval < 3) ? 'active' : 'inactive';
                val.first_name            = val.first_name   +" "+ val.last_name;
                val.ratings.one           = (val.ratings.one + val.ratings.two + val.ratings.three + val.ratings.four + val.ratings.five) / 5;

                if(val.birth_date != null)
                {
                    let get_year_of_birth = Number(moment(val.birth_date).format("YYYY"));
                    let get_current_year  = Number(moment(current_date).format("YYYY"));
                    val.age               = (get_year_of_birth   < get_current_year) ? get_current_year - get_year_of_birth : 0;
                    if(get_year_of_birth < Number(moment(current_date).format("YYYY")))
                    {
                        let get_current_year = Number(moment(current_date).format("YYYY"));
                        val.age = get_current_year - get_year_of_birth;

                    }
                    else
                    {
                        val.age = 0;

                    }
                }
            });

            res.status = "success";
            res.data   = user_data
        }
        catch (error)
        {
            res.status  = "error";
            res.message = error.message;
        }
        return res;
    }
    async newProduct()
    {
        let res = {}

        try
        {
            let { seller_id, item_name, price } = this.user_information;

            let add_form =
            {
                seller_id:     seller_id,
                buyer_id:      '',
                item_name:     item_name,
                status:        'available',
                price:         price,
                date_created:  Date.now(),
                escrowed_date: 0,
                released_date: 0,
            }
            let added_product = await this.mdb_dummy_item.add(add_form);
            res.status        = "success";
            res.data          = added_product;
        }
        catch (error) {
            res.status  = "error";
            res.message = error.message;
        }
        return res;
    }
    async readItem()
    {
        let res = {}

        try
        {
            let all_product = await this.mdb_dummy_item.docs();
            res.status      = "success";
            res.data        = all_product
        }
        catch (error)
        {
            res.status  = "error";
            res.message = error.message;
        }
        return res;
    }
    async barterProduct()
    {
        let res = {}

        try
        {
            let { product_id, buyer_id } = this.user_information;

            let update_item =
            {
                buyer_id:      buyer_id,
                status:        'escrowed',
                escrowed_date: Date.now(),
                is_cancel:     false,
            }

            let escrow = await this.mdb_dummy_item.update(product_id, update_item);

            res.status = "success";
            res.data   = escrow;
        }
        catch (error)
        {
            res.status  = "error";
            res.message = error.message;
        }
        return res;
    }
    async barterRelease()
    {
        let res = {}

        try
        {
            let { product_id } = this.user_information;

            let product  = await this.mdb_dummy_item.doc(product_id);
            let buyer    = await this.mdb_dummy_acc.doc(product.buyer_id);
            let seller   = await this.mdb_dummy_acc.doc(product.seller_id);
            let get_date = Date.now();

            let buyer_balance  = buyer.balance - product.price;
            let seller_balance = seller.balance + product.price

            let update_item =
            {
                status: 'bartered',
                released_date: get_date,
            }

            let final_buyer_balance =
            {
                balance: buyer_balance,
                last_transaction_date: get_date,
            }

            let final_seller_balance =
            {
                balance: seller_balance,
                last_transaction_date: get_date,
            }

            let bartered      = await this.mdb_dummy_item.update(product_id, update_item);
            let update_buyer  = await this.mdb_dummy_acc.update(product.buyer_id, final_buyer_balance);
            let update_seller = await this.mdb_dummy_acc.update(product.seller_id, final_seller_balance);

            res.status = "success";
            res.data   = bartered;
        }
        catch (error)
        {
            res.status  = "error";
            res.message = error.message;
        }
        return res;
    }

    async barterCancelled() // to be continue
    {
        let res = {}

        try
        {
            let { product_id } = this.user_information;

            let product  = await this.mdb_dummy_item.doc(product_id);
            let get_date = Date.now();

            let update_item =
            {
                status: 'available',
                cancelled_date: get_date,
                is_cancel: true,
            }

            let cancelled      = await this.mdb_dummy_item.update(product_id, update_item);

            res.status = "success";
            res.data   = cancelled;
        }
        catch (error)
        {
            res.status  = "error";
            res.message = error.message;
        }
        return res;
    }
    ///////////////////////////////////////////////////////////////////////////////////////////
    // this is real by toqaf
    // get total escrow updated
    async getTotalEscrow()
    {
        let res = {}

        try
        {
            let find_escrow =
            {
                status: 'escrowed',
            }

            let total_escrowed = await this.mdb_items.find(find_escrow);

            total_escrowed.forEach(val => 
            {
                val.seller_first_name = val.seller_first_name +" "+ val.seller_last_name;
                val.buyer_first_name  = val.buyer_first_name  +" "+ val.buyer_last_name;
            });

            res.status         = "success";
            res.data           = total_escrowed;
        }
        catch (error)
        {
            res.status  = "error";
            res.message = error.message;
        }
        return res;
    }

    // this is for get total release
    async getTotalRelease()
    {
        let res = {}

        try
        {
            let find_bartered =
            {
                status: 'bartered', // this is the key
            }

            let total_bartered = await this.mdb_items.find(find_bartered);

            total_bartered.forEach(val => 
            {
                val.seller_first_name = val.seller_first_name +" "+ val.seller_last_name;
                val.buyer_first_name  = val.buyer_first_name  +" "+ val.buyer_last_name;
            });

            res.status         = "success";
            res.data           = total_bartered;
        }
        catch (error)
        {
            res.status  = "error";
            res.message = error.message;
        }
        return res;
    }

    // this is for get total cancelled
    async getTotalCancelled()
    {
        let res = {}

        try
        {
            let find_cancelled_item =
            {
                is_cancelled: true,
            }

            let cancelled_item = await this.mdb_items.find(find_cancelled_item);

            cancelled_item.forEach(val => 
            {
                val.seller_first_name = val.seller_first_name +" "+val.seller_last_name;
            });

            res.status = "success";
            res.data   = cancelled_item;
        }
        catch (error)
        {
            res.status  = "error";
            res.message = error.message;
        }
        return res;
    }

    // this is for get over all total
    async getOverAllTotal()
    {
        let res = {}

        try
        {
            let find_escrow =
            {
                status: 'escrowed',
            }

            let total_escrowed = await this.mdb_items.find(find_escrow);
            total_escrowed.forEach(val => 
            {
                val.seller_first_name = val.seller_first_name +" "+ val.seller_last_name;
                val.buyer_first_name  = val.buyer_first_name  +" "+ val.buyer_last_name;
            });

            let find_bartered =
            {
                status: 'bartered', // this is the key..............
            }

            let total_bartered = await this.mdb_items.find(find_bartered);
            total_bartered.forEach(val => 
            {
                val.seller_first_name = val.seller_first_name +" "+ val.seller_last_name;
                val.buyer_first_name  = val.buyer_first_name  +" "+ val.buyer_last_name;
            });

            let get_latest_date  = 0;
            let get_latest_date2 = 0;
            let counter_         = 0;
            let over_all_total   = total_escrowed.concat(total_bartered); // use concat to combine

            over_all_total.forEach(val => 
            {
                // get the lates date
                val.escrowed_date = (val.escrowed_date < val.bartered_date) ? val.bartered_date : val.escrowed_date;
            });

            res.status = "success";
            res.data   = over_all_total;
        }
        catch (error)
        {
            res.status  = "error";
            res.message = error.message;
        }
        return res;
    }
    // testing by toqaf----------------------------------------------------------------------------------------

    async motherWalletHistory()
    {
        const mdb_transaction = new MDB_TRANSACTION();
        let res = {}

        try {
            let transactions = await mdb_transaction.findByTransactionHistoryAdmin(this.user_information.user_id, this.user_information.currency_abbreviation, this.user_information.skip);

            res.status = "success";
            res.data   = transactions;
        }
        catch (error) {
            res.status  = "error";
            res.message = error.message;
        }

        return res;
    }

    async makeOrderNumber(code, user_id)
    {
        const mdb_transaction   = new MDB_TRANSACTION();

        let result = '';
        let stringed_chars = ('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' + user_id).toString();
        let caps_chars = stringed_chars.toUpperCase();
        for (let i = 0; i < 9; i++)
        {
            result += caps_chars.charAt(Math.floor(Math.random() * caps_chars.length));
        }

        let reference_number = `${code}-${result}`

        // CHECKS IF THE GENERATED REFERENCE NUMBER IS ALREADY EXISTS ON transactions collection
        let is_existing = await mdb_transaction.findByReferenceNumber(reference_number);
        if(is_existing)
        {
            await this.makeOrderNumber(code, user_id);
        }
        else
        {
            return reference_number;
        }
    }

    async motherWalletSend()
    {
        let res  = {};
        let code = 'ADMIN';

        const mdb_user          = new MDB_USER();
        const mdb_wallet        = new MDB_WALLET();
        const mdb_admin_user    = new MDB_ADMIN_USERS();
        const mdb_transaction   = new MDB_TRANSACTION();

        let sender_info = await mdb_admin_user.doc(this.user_information.user_id);

        if (sender_info == null) 
        {
            res.status  = "error";
            res.message = "Transaction error, Please try again";
            return res;
        }
        else if(sender_info.google_authenticator === undefined)
        {
            res.status  = "error";
            res.message = "2FA not enabled";
            return res;
        }
        else if(sender_info.google_authenticator.is_2fa_enabled === true)
        {
            let receiver      = await mdb_wallet.findByPublicKey(this.user_information.receiver_public_key);
            let receiver_info = receiver ? await mdb_user.doc(receiver.user_id) : null;

            const account_class     = new AccountClass();
            const is_otp_verified   = await account_class.verify2faOTP(sender_info.google_authenticator.ascii, this.user_information.otp);

            if
            (
                receiver == null ||
                receiver_info == null ||
                typeof this.user_information.amount != "number"
            )
            {
                res.status  = "error";
                res.message = "Input error";
            }

            else if(is_otp_verified === false)
            {
                res.status  = "error";
                res.message = "Invalid 2FA";
            }

            else if(is_otp_verified === true)
            {
                let sender = sender_info.wallet.find(x => x.currency_abbreviation == this.user_information.currency_abbreviation);

                // SENDER
                let sender_amt             = Math.floor(this.user_information.amount * 10 ** sender.decimal_places);
                let sender_updated_balance = sender.balance - sender_amt;
                let reference_number       = await this.makeOrderNumber(code, sender_info._id);

                // Transaction
                let add_transaction_sender =
                {
                    user_id:                sender_info._id,
                    full_name:              sender_info.full_name,
                    email:                  sender_info.email,
                    public_key:             sender.public_key,
                    currency_name:          sender.currency_name,
                    currency_abbreviation:  sender.currency_abbreviation,
                    decimal_places:         sender.decimal_places,
                    transaction_type:       "admin send internal",
                    transaction_method:     "minus",
                    amount:                 sender_amt,
                    balance_before:         sender.balance,
                    balance_after:          sender_updated_balance,
                    description:            `Sent ${this.user_information.amount.toLocaleString("en-US", {
                        maximumFractionDigits: sender.decimal_places
                    })} ${sender.currency_abbreviation} to ${receiver_info.first_name} ${receiver_info.last_name}`,
                    remarks:                this.user_information.remarks,
                    triggered_by:           sender_info._id,
                    reference_number:       reference_number,
                    date_created:           this.user_information.date_created,
                    timestamp_created_at:   this.user_information.date_created
                };

                // Save DB
                mdb_admin_user.updateByPublicKey(sender.public_key, sender_updated_balance);
                let sender_transaction = await mdb_transaction.add(add_transaction_sender);

                // RECEIVER
                let updated_receiver = await mdb_wallet.findByPublicKey(this.user_information.receiver_public_key);
                let receiver_updated_balance = updated_receiver.balance + sender_amt;

                let add_transaction_receiver =
                {
                    user_id:                receiver_info._id,
                    full_name:              receiver_info.first_name + " " + receiver_info.last_name,
                    email:                  receiver_info.email,
                    public_key:             receiver.public_key,
                    currency_name:          sender.currency_name,
                    currency_abbreviation:  sender.currency_abbreviation,
                    decimal_places:         sender.decimal_places,
                    transaction_type:       "admin receive internal",
                    transaction_method:     "plus",
                    amount:                 sender_amt,
                    balance_before:         updated_receiver.balance,
                    balance_after:          receiver_updated_balance,
                    description:            `Received ${this.user_information.amount.toLocaleString("en-US", {
                        maximumFractionDigits: sender.decimal_places
                    })} ${sender.currency_abbreviation} from ${sender_info.full_name}`,
                    remarks:                this.user_information.remarks,
                    triggered_by:           sender_info._id,
                    reference_number:       reference_number,
                    date_created:           this.user_information.date_created,
                    timestamp_created_at:   this.user_information.date_created,
                };

                // Save DB
                // mdb_user.updateByIdAndPublicKey(receiver_info._id, receiver.public_key, receiver_updated_balance);
                mdb_wallet.update(receiver._id, { balance: receiver_updated_balance });
                mdb_transaction.add(add_transaction_receiver);

                res.data = sender_transaction;
                res.status = "success";
            }

            return res;
        }
    }

    async getActivityLogs() {
        let res = {};

        try {
            const mdb_activity_logs = new MDB_ACTIVITY_LOGS();
            let doc = {}
            // if(this.user_information)
            // {
            //     let date_from = new Date(this.user_information.from);
            //     let date_to = new Date(this.user_information.to);
            //     date_from = moment(date_from);
            //     date_to = moment(date_to);
            //     let date_from_timestamp = moment(date_from.hours(0).minutes(0).seconds(0).milliseconds(0)).format('x');
            //     let date_to_timestamp = moment(date_to.hours(23).minutes(59).seconds(59).milliseconds(999)).format('x')
            //     doc = await this.mdb_activity_logs.findFilteredActivityLogs(date_from_timestamp, date_to_timestamp);
            // }
            // else
            // {
            //     doc = await this.mdb_activity_logs.findByDateDesc();
            // }

            doc = await mdb_activity_logs.findByDateDesc();

            res.status = "success";
            res.data = doc;
        }
        catch (error) {
            res.status = 'error';
            res.error  = error.message;
        }

        return res;
    }

    // Admin Activity Logs -  Paul Musa
    async adminActivityLogs(admin_info, description, reference_number, date_created)
    {
        const mdb_activity_logs = new MDB_ACTIVITY_LOGS();

        const admin_activity_log = {
            user_id:              admin_info._id,
            designation:          admin_info.designation,
            full_name:            admin_info.full_name,
            description:          description,
            reference_number:     reference_number,
            date_created:         date_created,
            timestamp_created_at: date_created
        }
        mdb_activity_logs.add(admin_activity_log);
    }

    async updateAdminAnnouncement()
    {
        let res ={}

        try {

            const check_id = await this.mdb_news_feed.findById(this.user_information._id);

            const users_doc = await this.mdb_news_feed.findOneAndUpdate(
                { _id: this.user_information._id }, 
                { $set: 
                    { 
                    title           : this.user_information.title, 
                    description     : this.user_information.description, 
                    item_image      : this.user_information.image ? this.user_information.image : check_id.item_image,
                    is_publish      : this.user_information.is_publish, 
                    custom_selected : this.user_information.custom_selected,
                    custom_setting  : this.user_information.custom_setting,
                    } });
                    
                    if(this.user_information.image != '')
                    { 
                        if (check_id.item_image[0]) {
                            
                            let image_path = `${process.cwd()}/${process.env.ANNOUNCE_DIR}${check_id.item_image[0]}`;
                       
                            fs.unlink(image_path, (err) => {
                                if (err) {
                                    console.error(err)
                                    return;
                                }
                            });
                        }
                    }

            res.data   = 'success';
            res.status = 'success';

        } catch (error) {
            res.message = error.message;
            res.status  = 'error';
        }
        return res
    }

    async getPublishAnnouncement()
    {

        let res = {};
        try {
            res.data    = await this.mdb_news_feed.findAnnouncementByStatus()

            res.status  = 'success';
        } catch (error) {
            res.status  = 'error';
            res.message = error.message;
        }
        return res;
    }

    async removeAnnouncement()
    {

        let res = {};
        try {
            const query_result = await this.mdb_news_feed.deleteById(this.user_information._id)
            
            if (this.user_information.image[0]) {

                let image_path = `${process.cwd()}/${process.env.ANNOUNCE_DIR}${this.user_information.image[0]}`;

                fs.unlink(image_path, (err) => {
                    if (err) {
                        console.error(err)
                        return;
                    }
                });
            }
            res.status = "success";
            res.data = 'success';
            res.log  = query_result;

        } catch (error) {
            res.status = "error";
            res.message = error.message;
        }
        return res;
    }

    async adminFrontendMounted()
    {
        const mdb_admin_user = new MDB_ADMIN_USERS();
        const mdb_conversion = new MDB_CONVERSION();
        let res = {};

        try
        {
            let user_info  = await mdb_admin_user.doc(this.user_information.user_id);
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

    // Generate 2FA OTP - Paul Musa
    async generate2faOTP(user_id)
    {
        const mdb_admin_user = new MDB_ADMIN_USERS();
        const result = await mdb_admin_user.doc(user_id);

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

            const mdb_admin_user = new MDB_ADMIN_USERS();
            await mdb_admin_user.update(user_id, {
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

        const mdb_admin_user    = new MDB_ADMIN_USERS();
        const user              = await mdb_admin_user.doc(user_id);
        const is_verified       = await this.verify2faOTP(user.google_authenticator.ascii, otp);

        if(is_verified === true)
        {
            await mdb_admin_user.update(user_id, {
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

    static async fetchClientsByKyc({kyc_status})
    {
        let res                 = {}; 
        const mdb_user          = new MDB_USER();
        const clients_res_obj   = await mdb_user.fetchClientsByKyc({kyc_status});

        if(Array.isArray(clients_res_obj))
        {
            res.status  = 'success';
            res.clients = clients_res_obj;
        }

        if(clients_res_obj == null)
        {
            
            res.status  = 'error';
            res.message = 'returned data is equal to null';
        }

        return res;
    }
}
