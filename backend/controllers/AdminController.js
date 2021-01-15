const passport_local = require('../config/passport');
const ItemClass      = require('../classes/ItemClass');
const AdminClass     = require('../classes/AdminClass');

module.exports =
{
    async adminLogin (req, res, next)
    {
        passport_local.authenticate('admin-login', async (err, user_info_obj, info_obj) => {
            if (err) {
                // console.log(err);
            }

            if (user_info_obj) {
                res.json(user_info_obj).status(200);

                // -------- Admin Activity Logs --------
                const logs = new AdminClass();
                const date_created = Date.now();
                logs.adminActivityLogs(req.session.admin_user, 'Logged on', '-', date_created);
                // ------------- Paul Musa -------------
            }

            if (info_obj) {
                res.status(400).send({ status: 'error', message : info_obj.message });
            }
        })(req, res, next);
    },

    async isAuthenticated (req, res)
    {
        if(req.session.admin_user) {
            delete req.session.admin_user.password;
            res.json({'status' : 'authenticated', 'user' : req.session.admin_user}).status(200);
        } else {
            res.json({'status' : 'not authenticated'}).status(200);
        }
    },

    async logout (req, res)
    {

        // -------- Admin Activity Logs --------
        const admin_class = new AdminClass();
        const date_created = Date.now();
        admin_class.adminActivityLogs(req.session.admin_user, 'Logged out', '-', date_created);
        // ------------- Paul Musa -------------

        delete req.session.admin_user;
        res.send(true).status(200);
    },

    // Title: Admin User
    // Author: Andrea Lyn Destajo
    // Date: October 2020
    // Contributor:

    async addUserAdmin(req, res)
    {

        let adminUser_obj = {
            admin_info:    req.session.admin_user,
            user_fullname: req.body.fullname_str,
            user_email: req.body.email_str,
            user_contact: req.body.contact_str,
            user_password: req.body.password_str,
            user_role: req.body.role_str,
        }

        const admin_class = new AdminClass(adminUser_obj);
        const admin_data = await admin_class.addUserAdmin();

        if (admin_data.status == 'success') {
            res.json(admin_data.data).status(200);

            // -------- Admin Activity Logs --------
            const date_created = Date.now();
            admin_class.adminActivityLogs(req.session.admin_user, `Added ${adminUser_obj.user_fullname} as ${adminUser_obj.user_role}`, '-', date_created);
            // ------------- Paul Musa -------------
        }
        else if(admin_data.status == 'registered'){
            res.json(admin_data.data).status(200);
        }
        else {
            res.json(admin_data.data).status(400);
        }
    },

    async getAdminUsers(req, res)
    {
        const admin_class = new AdminClass();
        const admin_data = await admin_class.getAdminUsers();


        if (admin_data.status == 'success') {
            res.json(admin_data.data).status(200);
        }
        else {
            res.json(admin_data.message).status(400);
        }
    },

    async updateAdminUsers(req, res)
    {
        const admin_class = new AdminClass(req.body);
        const admin_data = await admin_class.updateAdminUsers();

        if (admin_data.status == 'success') {
            res.json(admin_data.data).status(200);

            // -------- Admin Activity Logs --------
            const date_created = Date.now();
            admin_class.adminActivityLogs(req.session.admin_user, `Updated ${req.body.full_name}'s admin details`, '-', date_created);
            // ------------- Paul Musa -------------
        }
        else {
            res.json(admin_data.message).status(400);
        }
    },

    async removeAdminUser(req, res)
    {
        const admin_class = new AdminClass(req.body);
        const admin_data = await admin_class.removeAdminUser();

        if (admin_data.status == 'success'){
            res.json(admin_data.data).status(200);

            // -------- Admin Activity Logs --------
            const date_created = Date.now();
            admin_class.adminActivityLogs(req.session.admin_user, `Removed ${admin_data.log.full_name}(${admin_data.log.designation}) to admin`, '-', date_created);
            // ------------- Paul Musa -------------
        }
        else {
            res.json(admin_data.message).status(400);
        }
    },

    // Title: Admin Role
    // Author: Andrea Lyn Destajo
    // Date: October 2020
    // Contributor:

    async addNewRole(req, res)
    {
        const admin_class = new AdminClass(req.body);
        const admin_data = await admin_class.addNewRole();

        if (admin_data.status == 'success') {
            res.json(admin_data.data).status(200);

            // -------- Admin Activity Logs --------
            const date_created = Date.now();
            admin_class.adminActivityLogs(req.session.admin_user, `Added new role: ${admin_data.log.Role_str}`, '-', date_created);
            // ------------- Paul Musa -------------
        }
        else if(admin_data.status == 'Duplicate') {
            res.json(admin_data.data).status(200);
        }
        else if(admin_data.status == 'DuplicateID') {
            res.json(admin_data.data).status(200);
        }
        else {
            res.json(admin_data.message).status(400);
        }
    },

    async getAdminRoles(req, res)
    {
        const admin_class = new AdminClass();
        const admin_data = await admin_class.getAdminRoles();


        if (admin_data.status == 'success') {
            res.json(admin_data.data).status(200);
        }
        else {
            res.json(admin_data.message).status(400);
        }
    },

    async removeAdminRole(req, res)
    {
        const admin_class = new AdminClass(req.body);
        const admin_data = await admin_class.removeAdminRole();

        if (admin_data.status == 'success') {
            res.json(admin_data.data).status(200);

            // -------- Admin Activity Logs --------
            const date_created = Date.now();
            admin_class.adminActivityLogs(req.session.admin_user, `Removed ${admin_data.log.Role_str} role`, '-', date_created);
            // ------------- Paul Musa -------------
        }
        else {
            res.json(admin_data.message).status(400);
        }
    },

    async assignAccess(req, res)
    {
        const admin_class = new AdminClass(req.body);
        const admin_data = await admin_class.assignAccess();

        if (admin_data.status == 'success') {
            res.json(admin_data.data).status(200);

            // -------- Admin Activity Logs --------
            const date_created = Date.now();
            admin_class.adminActivityLogs(req.session.admin_user, `Set ${req.body.nav_name} as accessible by ${req.body.nav_access_level}`, '-', date_created);
            // ------------- Paul Musa -------------
        }
        else {
            res.json(admin_data.message).status(400);
        }
    },

    async updateAdminRole(req, res)
    {
        const admin_class = new AdminClass(req.body);
        const admin_data = await admin_class.updateAdminRole();

        if (admin_data.status == 'success')
        {
            res.json(admin_data.data).status(200);

            // -------- Admin Activity Logs --------
            const date_created = Date.now();
            admin_class.adminActivityLogs(req.session.admin_user, `Updated ${admin_data.log.Role_str} role to ${admin_data.log2.Role_str}`, '-', date_created);
            // ------------- Paul Musa -------------
        }
        else
        {
            res.json(admin_data.message).status(400);	
        }
    },
    // Title: Admin Dashboard Navigation
    // Author: Andrea Lyn Destajo
    // Date: October 2020
    // Contributor:
    async addNewNav(req, res)
    {
        const admin_class = new AdminClass(req.body);
        const admin_data = await admin_class.addNewNav();

        if (admin_data.status == 'success') {
            res.status(200).send({ message: admin_data.status })

            // -------- Admin Activity Logs --------
            const date_created = Date.now();
            admin_class.adminActivityLogs(req.session.admin_user, `Added ${req.body.nav_name} to navigation settings. Accessible by ${req.body.nav_access_level}`, '-', date_created);
            // ------------- Paul Musa -------------
        }
        else {
            res.json(admin_data.message).status(400);
        }
    },

    async getAdminNav(req, res)
    {
        const admin_class = new AdminClass();
        const admin_data = await admin_class.getAdminNav();
       
        if (admin_data.status == 'success') {
            res.json(admin_data.data).status(200);
        }
        else {
            res.json(admin_data.message).status(400);
        }
    },

    async removeAdminNavigation(req, res)
    {
        const admin_class = new AdminClass(req.body);
        const admin_data = await admin_class.removeAdminNavigation();
        if (admin_data.status == 'success') {
            res.json(admin_data.status).status(200);

            // -------- Admin Activity Logs --------
            const date_created = Date.now();
            admin_class.adminActivityLogs(req.session.admin_user, `Removed ${admin_data.data.name} to navigation settings`, '-', date_created);
            // ------------- Paul Musa -------------
        }
        else {
            res.json(admin_data.message).status(400);
        }
    },

    // Title: Admin Change Password
    // Author: Andrea Lyn Destajo
    // Date: October 2020
    // Contributor:
    async adminChangePassword(req, res)
    {
        const admin_class = new AdminClass(req.body);
        const admin_data = await admin_class.adminChangePassword();

        if (admin_data.status == 'success') {
            res.json(admin_data.data).status(200);

            // -------- Admin Activity Logs --------
            const date_created = Date.now();
            admin_class.adminActivityLogs(req.session.admin_user, `Changed password of ${admin_data.log.full_name}(${admin_data.log.designation.trim()})`, '-', date_created);
            // ------------- Paul Musa -------------
        }
        else {
            res.json(admin_data.message).status(400);
        }
    },

    async createBaristocratToken(req, res)
    {
        let date = Date.now();
        let details =
        {
            currency_name:          req.body.currency_name,
            currency_abbreviation:  req.body.currency_abbreviation,
            decimal_places:         req.body.decimal_places,
            total_supply:           req.body.total_supply,
            date_created:           date,
            timestamp_created_at:   date
        }

        let admin_class = new AdminClass(details);
        let result = await admin_class.createBaristocratToken();

        if(result.status == 'success')
        {
            res.status(200).send({ status: result.status });

            // -------- Admin Activity Logs --------
            admin_class.adminActivityLogs(req.session.admin_user, `Created ${details.currency_abbreviation} token`, '-', date);
            // ------------- Paul Musa -------------
        }
        else if (result.status == 'error')
        {
            res.status(400).json({ message: result.message });
        }
    },

    async viewBaristocratAdmin(req, res)
    {
        let admin_class = new AdminClass();
        let result = await admin_class.viewBaristocratAdmin();

        if(result.status == 'success')
        {
            res.status(200).send(result.data);
        }
        else if (result.status == 'error')
        {
            res.status(400).json({ message: result.message });
        }
    },

    async userMasterList(req, res)
    {
        let admin_class = new AdminClass();
        let result = await admin_class.userMasterList();

        if(result.status == 'success')
        {
            res.status(200).json({ status: result.status, data: result.data });
        }
        else if (result.status == 'error')
        {
            res.status(400).json({ status: result.status, message: result.message });
        }
    },

    // Title: Create Avatar
    // Author: Pergentino S. Galang II
    // Date: October 2020
    // Contributor:
    async create_avatar(req, res)
    {
        let avatar_data = req.body;

        avatar_data.avatar_image_path = req.file.filename;

        let admin_class = new AdminClass(avatar_data);
        let avatar_validation = await admin_class.validate_create_avatar();

        if (avatar_validation.status == "error") {
            res.status(400).send({ message: avatar_validation.message })
        } else if (avatar_validation.status == "success") {
            res.json(avatar_validation.data).status(200);

            // -------- Admin Activity Logs --------
            const date_created = Date.now();
            admin_class.adminActivityLogs(req.session.admin_user, `Added new avatar`, '-', date_created);
            // ------------- Paul Musa -------------
        }
    },

    // Title: Get all Avatar
    // Author: Pergentino S. Galang II
    // Date: October 2020
    // Contributor:
    async getAllAvatar(req, res) {
        let avatar_data = req.body;

        let admin_class = new AdminClass(avatar_data);
        let avatar_validation = await admin_class.validate_get_avatar();

        if (avatar_validation.status == "error") {
            res.status(400).send({ message: avatar_validation.message })
        } else if (avatar_validation.status == "success") {
            res.json(avatar_validation.data).status(200);
        }
    },

    // Title: Get all Reviews
    // Author: Pergentino S. Galang II
    // Date: October 2020
    // Contributor:
    async getAllReviews(req, res) {
        let reviews_data = req.body;

        let admin_class = new AdminClass(reviews_data);
        let avatar_validation = await admin_class.getAllReviews();

        if (avatar_validation.status == "error") {
            res.status(400).send({ message: avatar_validation.message })
        } else if (avatar_validation.status == "success") {
            res.json(avatar_validation.data).status(200);
        }
    },

    // Title: Crete Cover Photo
    // Author: Pergentino S. Galang II
    // Date: October 2020
    // Contributor:
    async create_cover_photo(req, res) {

        let cover_data = req.body;

        cover_data.cover_photo_path = req.file.filename;

        let admin_class = new AdminClass(cover_data);
        let avatar_validation = await admin_class.validate_create_cover_photo();

        if (avatar_validation.status == "error") {
            res.status(400).send({ message: avatar_validation.message })
        } else if (avatar_validation.status == "success") {
            res.json(avatar_validation.data).status(200);

            // -------- Admin Activity Logs --------
            const date_created = Date.now();
            admin_class.adminActivityLogs(req.session.admin_user, `Added new cover photo`, '-', date_created);
            // ------------- Paul Musa -------------
        }
    },

    // Title: Get all cover photo
    // Author: Pergentino S. Galang II
    // Date: October 2020
    // Contributor:
    async getAllCoverPhoto(req, res) {
        let cover_data = req.body;

        let admin_class = new AdminClass(cover_data);
        let avatar_validation = await admin_class.validate_get_all_cover_photo();

        if (avatar_validation.status == "error") {
            res.status(400).send({ message: avatar_validation.message })
        } else if (avatar_validation.status == "success") {
            res.json(avatar_validation.data).status(200);
        }
    },

    // Title: Get all Reported Users
    // Author: Pergentino S. Galang II
    // Date: October 2020
    // Contributor:
    async getAllReports(req, res) {
        let reports_data = req.body;

        let admin_class = new AdminClass(reports_data);
        let reports_validation = await admin_class.validate_get_all_reports();

        if (reports_validation.status == "error") {
            res.status(400).send({ message: reports_validation.message })
        } else if (reports_validation.status == "success") {
            res.json(reports_validation.data).status(200);
        }
    },

    // Title: Get all Rate and Review of User
    // Author: Pergentino S. Galang II
    // Date: November 9 2020
    // Contributor:
    async getAllRateAndReview(req, res) {
        let reviews_data = req.body;

        let admin_class = new AdminClass(reviews_data);
        let avatar_validation = await admin_class.getAllRateAndReview();

        if (avatar_validation.status == "error") {
            res.status(400).send({ message: avatar_validation.message })
        } else if (avatar_validation.status == "success") {
            res.json(avatar_validation.data).status(200);
        }
    },

    // Title: Upload Ra Photo
    // Author: Pergentino S. Galang II
    // Date: October 2020
    // Contributor:
    async create_review(req, res) {

        let review_data = req.body;

        // console.log(req.files.length)
        // return;
        if(req.files.length == 1){
            review_data.review_path = [req.files[0].filename];
            // review_data.review_path = req.files[1].filename;
        } else if(req.files.length == 2){
            review_data.review_path = [req.files[0].filename, req.files[1].filename ];
            // review_data.review_path = req.files[1].filename;
        } else if(req.files.length == 3){
            review_data.review_path = [req.files[0].filename, req.files[1].filename, req.files[2].filename ];
            // review_data.review_path = req.files[1].filename;
        }



        let admin_class = new AdminClass(review_data);
        let avatar_validation = await admin_class.validate_create_review();

        if (avatar_validation.status == "error") {
            res.status(400).send({ message: avatar_validation.message })
        } else if (avatar_validation.status == "success") {
            res.json(avatar_validation.data).status(200);
        }
    },

    // this is for create category
    async createCategory(req, res)
    {
        let category_information =
        {
            category_name:       req.body.category_name,
            legalities:          req.body.legalities,
            category_image_path: req.file.filename,
        }

        let admin_class         = new AdminClass(category_information);
        let category_validation = await admin_class.validateCategory();

        if(category_validation.status == "success")
        {
            let created_category    = await admin_class.createCategory();
            res.send(created_category);

            // -------- Admin Activity Logs --------
            const date_created = Date.now();
            admin_class.adminActivityLogs(req.session.admin_user, `Created ${category_information.category_name} category`, '-', date_created);
            // ------------- Paul Musa -------------
        }
        else if(category_validation.status == "error")
        {
            res.status(400).send({ message: category_validation.message });
        }
    },

    //--------------------------------Added code by Toqaf---------------------------------
    // this is for read category(all)
    async getAllCategory(req, res)
    {

        let admin_class         = new AdminClass({});
        let category_validation = await admin_class.validateGetCategory();

        if(category_validation.status == "success")
        {
            res.send(category_validation);
        }
        else if(category_validation.status == "error")
        {
            res.status(400).send({ message: category_validation.message })
        }
    },

    // this is for create subcategory
    async createSubcategory(req, res)
    {
        let subcategory_information =
        {
            category_name:          req.body.category_name,
            subcategory_name:       req.body.subcategory_name,
            subcategory_image_path: req.file.filename,
            _id:                    req.body._id,
        }

        let admin_class            = new AdminClass(subcategory_information);
        let subcategory_validation = await admin_class.validateSubcategory();

        if(subcategory_validation.status == "success")
        {
            let created_subcategory     = await admin_class.createSubcategory();
            res.send(created_subcategory);

            // -------- Admin Activity Logs --------
            const date_created = Date.now();
            admin_class.adminActivityLogs(req.session.admin_user, `Created ${subcategory_information.subcategory_name} subcategory for ${subcategory_information.category_name} category`, '-', date_created);
            // ------------- Paul Musa -------------
        }
        else if(subcategory_validation.status == "error")
        {
            res.status(400).send({ message: subcategory_validation.message });
        }
    },

    // this is for read subcategory(all)
    async getAllSubcategory(req, res)
    {

        let admin_class            = new AdminClass({});
        let subcategory_validation = await admin_class.validateGetSubcategory();

        if(subcategory_validation.status == "success")
        {
            res.send(subcategory_validation);
        }
        else if(subcategory_validation.status == "error")
        {
            res.status(400).send({ message: subcategory_validation.message })
        }
    },

    // this is for create subcategory
    async createSubcategory2(req, res)
    {
        let subcategory2_information =
        {
            category_name:           req.body.category_name,
            subcategory_name:        req.body.subcategory_name,
            subcategory2_name:       req.body.subcategory2_name,
            subcategory2_image_path: req.file.filename,
            _id:                     req.body._id,
        }

        let admin_class             = new AdminClass(subcategory2_information);
        let subcategory2_validation = await admin_class.validateSubcategory2();

        if(subcategory2_validation.status == "success")
        {
            let created_subcategory2    = await admin_class.createSubcategory2();
            res.send(created_subcategory2);

            // -------- Admin Activity Logs --------
            const date_created = Date.now();
            admin_class.adminActivityLogs(req.session.admin_user, `Created ${subcategory2_information.subcategory2_name} subcategory for ${subcategory2_information.subcategory_name} subcategory`, '-', date_created);
            // ------------- Paul Musa -------------
        }
        else if(subcategory2_validation.status == "error")
        {
            res.status(400).send({ message: subcategory2_validation.message });
        }
    },

    // this is for read subcategory(all)
    async getAllSubcategory2(req, res)
    {

        let admin_class             = new AdminClass({});
        let subcategory2_validation = await admin_class.validateGetSubcategory2();

        if(subcategory2_validation.status == "success")
        {
            res.send(subcategory2_validation);
        }
        else if(subcategory2_validation.status == "error")
        {
            res.status(400).send({ message: subcategory2_validation.message })
        }
    },

    // this is for update category
    async updateCategory(req, res)
    {
        let category_information =
        {
            category_name:       req.body.category_name,
            category_image_path: (req.file == null) ? null : req.file.filename,
            status:              req.body.status,
            legalities:          req.body.legalities,
            _id:                 req.body._id,
        }

        let admin_class         = new AdminClass(category_information);
        let category_validation = await admin_class.validateUpdateCategory();

        if(category_validation.status == "success")
        {
            let updated_category    = await admin_class.updateCategory();
            res.send(updated_category);
            // -------- Admin Activity Logs --------
            const date_created = Date.now();
            admin_class.adminActivityLogs(req.session.admin_user, `Updated ${updated_category.log.category_name} category to ${category_information.category_name}`, '-', date_created);
            // ------------- Paul Musa -------------
        }
        else if(category_validation.status == "error")
        {
            res.status(400).send({ message: category_validation.message });
        }
        // res.send(true);
    },

    // this is for update subcategory
    async updateSubcategory(req, res)
    {
        let subcategory_information =
        {
            category_name:          req.body.category_name,
            subcategory_name:       req.body.subcategory_name,
            subcategory_image_path: (req.file == null) ? null : req.file.filename,
            status:                 req.body.status,
            _id:                    req.body._id,
            sub_key:                req.body.sub_key,
        }

        let admin_class            = new AdminClass(subcategory_information);
        let subcategory_validation = await admin_class.validateUpdateSubcategory();

        if(subcategory_validation.status == "success")
        {
            let updated_subcategory    = await admin_class.updateSubcategory();
            res.send(updated_subcategory);

            // -------- Admin Activity Logs --------
            const date_created = Date.now();
            admin_class.adminActivityLogs(req.session.admin_user, `Updated ${subcategory_information.sub_key} subcategory to ${subcategory_information.subcategory_name}`, '-', date_created);
            // ------------- Paul Musa -------------
        }
        else if(subcategory_validation.status == "error")
        {
            res.status(400).send({ message: subcategory_validation.message });
        }
    },

    // this is for update subcategory
    async updateSubcategory2(req, res)
    {
        let subcategory2_information =
        {
            category_name:           req.body.category_name,
            subcategory_name:        req.body.subcategory_name,
            subcategory2_name:       req.body.subcategory2_name,
            subcategory2_image_path: (req.file == null) ? null : req.file.filename,
            status:                  req.body.status,
            _id:                     req.body._id,
            sub2_key:                req.body.sub2_key,
        }

        let admin_class             = new AdminClass(subcategory2_information);
        let subcategory2_validation = await admin_class.validateUpdateSubcategory2();

        if(subcategory2_validation.status == "success")
        {
            let updated_subcategory2    = await admin_class.updateSubcategory2();
            res.send(updated_subcategory2);

            // -------- Admin Activity Logs --------
            const date_created = Date.now();
            admin_class.adminActivityLogs(req.session.admin_user, `Updated ${subcategory2_information.sub2_key} subcategory2 to ${subcategory2_information.subcategory2_name}`, '-', date_created);
            // ------------- Paul Musa -------------
        }
        else if(subcategory2_validation.status == "error")
        {
            res.status(400).send({ message: subcategory2_validation.message });
        }
    },

    //--------------------------------End of Added code by Toqaf---------------------------------
    async getGroupOfItemsByStatus (req, res)
    {
        let item_class = new ItemClass();
        let items = await item_class.getGroupOfItemsByStatus();

        if (items.status == 'success') {
            res.status(200).json(items);
        } else {
            res.status(400).json(items);
        }
    },

    async updateProductStatusById (req, res)
    {
        let product_id = req.params.product_id;
        let status = req.body.status;

        let item_class = new ItemClass();
        let is_updated = await item_class.updateProductStatusById(product_id, status);

        if (is_updated.status == 'success') {
            res.status(200).json(is_updated);

            // -------- Admin Activity Logs --------
            const admin_class  = new AdminClass();
            const date_created = Date.now();
            admin_class.adminActivityLogs(req.session.admin_user, `Updated ${is_updated.data.item_name} product as ${status}`, '-', date_created);
            // ------------- Paul Musa -------------
        } else {
            res.status(400).json(is_updated);
        }
    },
    // Title: Announcement in newsfeed
    // Author: Andrea Lyn Destajo
    // Date: October 2020
    // Contributor:
    async postNewsfeedAnnouncement(req, res)
    {
        let user_data = {
            title           : req.body.title,
            description     : req.body.description,
            is_publish      : req.body.is_publish,
            custom_selected : req.body.custom_selected.split(','),
            custom_setting  : req.body.custom_setting,
        };
        
        if(req.files.length == 1){
            user_data.image = [req.files[0].filename];
        } else if(req.files.length == 2){
            user_data.image = [req.files[0].filename, req.files[1].filename ];
        } else if(req.files.length == 3){
            user_data.image = [req.files[0].filename, req.files[1].filename, req.files[2].filename ];
        }

        let admin_class = new AdminClass(user_data)
        let response    = await admin_class.postNewsfeedAnnouncement();

        if(response.status == 'success')
        {
            res.json(response.data).status(200);

            // -------- Admin Activity Logs --------
            const date_created = Date.now();
            admin_class.adminActivityLogs(req.session.admin_user, `Added ${req.body.title} to newsfeed announcement`, '-', date_created);
            // ------------- Paul Musa -------------
        }
        else{
            res.json(response.data).status(400);
        }
    },

    async getNewsfeedAnnouncement(req, res)
    {
        let admin_class = new AdminClass()
        let response    = await admin_class.getNewsfeedAnnouncement();

        if(response.status == 'success')
        {
            res.json(response.data).status(200);
        }else{
            res.json(response.data).status(400);
        }
    },

    // this is for testing donat toucheee
    async addDummyUser(req, res)
    {
        let user_info =
        {
            user_name:  req.query.user_name,
            brt_wallet: req.query.wallet,
        }

        let admin_class         = new AdminClass(user_info);
        let admin_validation    = await admin_class.createDummyUser();

        if(admin_validation.status == "success")
        {
            res.send(admin_validation);
        }
        else if(admin_validation.status == "error")
        {
            res.status(400).send({ message: admin_validation.message });
        }
    },
    async getAllUser(req, res)
    {

        let admin_class         = new AdminClass({});
        let admin_validation    = await admin_class.readUser();

        if(admin_validation.status == "success")
        {
            res.send(admin_validation);
        }
        else if(admin_validation.status == "error")
        {
            res.status(400).send({ message: admin_validation.message })
        }
    },
    async addProduct(req, res)
    {
        let user_info =
        {
            seller_id: req.query.seller_id,
            item_name: req.query.item_name,
            price:     req.query.price,
        }

        let admin_class         = new AdminClass(user_info);
        let admin_validation    = await admin_class.newProduct();

        if(admin_validation.status == "success")
        {
            res.send(admin_validation);
        }
        else if(admin_validation.status == "error")
        {
            res.status(400).send({ message: admin_validation.message });
        }
    },
    async getAllProduct(req, res)
    {

        let admin_class         = new AdminClass({});
        let admin_validation    = await admin_class.readItem();

        if(admin_validation.status == "success")
        {
            res.send(admin_validation);
        }
        else if(admin_validation.status == "error")
        {
            res.status(400).send({ message: admin_validation.message })
        }
    },
    async barter(req, res)
    {
        let product_info =
        {
            product_id: req.query.product_id,
            buyer_id:   req.query.buyer_id,
        }

        let admin_class         = new AdminClass(product_info);
        let admin_validation    = await admin_class.barterProduct();

        if(admin_validation.status == "success")
        {
            res.send(admin_validation);
        }
        else if(admin_validation.status == "error")
        {
            res.status(400).send({ message: admin_validation.message })
        }
    },
    async barterReleased(req, res)
    {
        let product_info =
        {
            product_id: req.query.product_id,
        }

        let admin_class         = new AdminClass(product_info);
        let admin_validation    = await admin_class.barterRelease();

        if(admin_validation.status == "success")
        {
            res.send(admin_validation);
        }
        else if(admin_validation.status == "error")
        {
            res.status(400).send({ message: admin_validation.message })
        }
    },
    async barterCancelled(req, res)
    {
        let product_info =
        {
            product_id: req.query.product_id,
        }

        let admin_class         = new AdminClass(product_info);
        let admin_validation    = await admin_class.barterCancelled();

        if(admin_validation.status == "success")
        {
            res.send(admin_validation);
        }
        else if(admin_validation.status == "error")
        {
            res.status(400).send({ message: admin_validation.message })
        }
    },

    async totalEscrow(req, res)
    {
        let admin_class         = new AdminClass({});
        let admin_validation    = await admin_class.getTotalEscrow();

        if(admin_validation.status == "success")
        {
            res.send(admin_validation);
        }
        else if(admin_validation.status == "error")
        {
            res.status(400).send({ message: admin_validation.message })
        }
    },
    async totalRelease(req, res)
    {
        let admin_class         = new AdminClass({});
        let admin_validation    = await admin_class.getTotalRelease();

        if(admin_validation.status == "success")
        {
            res.send(admin_validation);
        }
        else if(admin_validation.status == "error")
        {
            res.status(400).send({ message: admin_validation.message })
        }
    },
    async totalCancelled(req, res)
    {
        let admin_class         = new AdminClass({});
        let admin_validation    = await admin_class.getTotalCancelled();

        if(admin_validation.status == "success")
        {
            res.send(admin_validation);
        }
        else if(admin_validation.status == "error")
        {
            res.status(400).send({ message: admin_validation.message })
        }
    },
    async overAllTotal(req, res)
    {
        let admin_class         = new AdminClass({});
        let admin_validation    = await admin_class.getOverAllTotal();

        if(admin_validation.status == "success")
        {
            res.send(admin_validation);
        }
        else if(admin_validation.status == "error")
        {
            res.status(400).send({ message: admin_validation.message })
        }
    },

    async motherWalletHistory(req, res)
    {
        let details = {
            user_id:             req.session.admin_user._id,
            // user_id:                "5f902dabd7fae63658845827",
            currency_abbreviation:  req.body.currency_abbreviation,
            skip:                   req.body.skip
        }

        let admin_class = new AdminClass(details);
        let result = await admin_class.motherWalletHistory();

        if (result.status == "success")
        {
            res.status(200).json({ status: result.status, data: result.data });
        }
        else
        {
            res.status(400).json({ status: result.status, message: result.message });
        }
    },

    async motherWalletSend(req, res)
    {
        let date = Date.now();
        let details = {
            user_id:                req.session.admin_user._id,    // get sender user info
            receiver_public_key:    req.body.receiver_public_key,    // get receiver user info
            currency_abbreviation:  req.body.currency_abbreviation,
            amount:                 req.body.amount,
            remarks:                req.body.remarks,
            otp:                    req.body.otp,
            date_created:           date,
            timestamp_created_at:   date
        }

        let admin_class = new AdminClass(details);
        let result = await admin_class.motherWalletSend();

        if (result.status == "success")
        {
            res.status(200).send({ status: result.status, data: result.data });

            // -------- Admin Activity Logs --------
            admin_class.adminActivityLogs(req.session.admin_user, result.data.description, result.data.reference_number, date);
            // ------------- Paul Musa -------------
        }
        else
        {
            res.status(400).send({ status: result.status, message: result.message });
        }
    },

    async getActivityLogs(req, res) {
        // if(req.body.from != undefined && req.body.to != undefined)
        // {
        //     date =
        //     {
        //         from: req.body.from,
        //         to: req.body.to
        //     };
        // }
        // else {
        //     date = null;
        // }

        // console.log('LOGS', req.admin_user)
        // return

        // console.log('getActivityLogs'.toUpperCase(), req.session.admin_user)

        let admin_class = new AdminClass();
        let result = await admin_class.getActivityLogs();

        if (result.status == 'success')
        {
            res.status(200).json({ status: result.status, data: result.data });
        }
        else
        {
            res.status(400).json({ status: result.status, message: result.message });
        }
    },

    // Title: Update Admin Announcement
    // Author: Andrea Lyn Destajo
    // Date: November 20 2020
    // Contributor:

    async updateAdminAnnouncement(req, res)
    {
        let user_data = {
            _id             : req.body._id,
            title           : req.body.title,
            description     : req.body.description,
            is_publish      : req.body.is_publish,
            custom_selected : req.body.custom_viewers.split(','),
            custom_setting  : req.body.custom_setting,
        };

        if(req.files.length == 1){
            user_data.image = [req.files[0].filename];
        } else if(req.files.length == 2){
            user_data.image = [req.files[0].filename, req.files[1].filename ];
        } else if(req.files.length == 3){
            user_data.image = [req.files[0].filename, req.files[1].filename, req.files[2].filename ];
        } else if(req.files.length == 0)
        {
            user_data.image = ''
        }

        let admin_class     = new AdminClass(user_data);
        let response        = await admin_class.updateAdminAnnouncement();

        if(response.status == 'success')
        {
            res.json(response.data).status(200);

            // -------- Admin Activity Logs --------
            const date_created = Date.now();
            admin_class.adminActivityLogs(req.session.admin_user, `Updated ${req.body.title} in newsfeed announcement`, '-', date_created);
            // ------------- Paul Musa -------------
        }else
        {
            res.json(response.message).status(400);
        }
    },

    async getPublishAnnouncement(req, res)
    {
        let admin_class     = new AdminClass();
        let response        = await admin_class.getPublishAnnouncement();

        if(response.status == 'success')
        {
            res.json(response.data).status(200);
        }
        else
        {
            res.json(response.message).status(400);
        }
    },

    async removeAnnouncement(req, res)
    {
        const admin_class = new AdminClass(req.body);
        const admin_data = await admin_class.removeAnnouncement();

        if (admin_data.status == 'success') {
            res.json(admin_data.data).status(200);

            // -------- Admin Activity Logs --------
            const date_created = Date.now();
            admin_class.adminActivityLogs(req.session.admin_user, `Removed ${admin_data.log.title} in newsfeed announcement`, '-', date_created);
            // ------------- Paul Musa -------------
        }
        else {
            res.json(admin_data.message).status(400);
        }
    },

    // End of Announcement

    async adminFrontendMounted(req, res)
    {
        let details = {
            user_id: req.session.admin_user._id
        }

        let admin_class = new AdminClass(details);
        let result = await admin_class.adminFrontendMounted();

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

    // Enable 2FA - Paul Musa
    async enable2fa(req, res)
    {
        let details = {
            user_id:              req.session.admin_user,
            google_authenticator: req.body.google_authenticator,
            otp:                  req.body.otp
        }

        let admin_class = new AdminClass(details);
        let result = await admin_class.enable2fa();

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
            user_id:    req.session.admin_user,
            otp:        req.body.otp
        }

        let admin_class = new AdminClass(details);
        let result = await admin_class.disable2fa();

        if(result.status == 'success')
        {
            res.status(200).json({ status: result.status });
        }
        else
        {
            res.status(400).json({ status: result.status, message: result.message });
        }
    },

    async fetchClientsByKyc(req, res)
    {
        let kyc_status          = req.body.kyc_status;
        
        let clients_res_obj     = await AdminClass.fetchClientsByKyc({kyc_status});

        if(clients_res_obj.status == 'success')
        {
            res.status(200).json({clients: clients_res_obj.clients});
        }

        if(clients_res_obj.status == 'error')
        {
            res.status(200).json({status: 'error', message: clients_res_obj.message});
        }
    }

}
