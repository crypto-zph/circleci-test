const AnnouncementClass = require('../classes/AnnouncementClass');
const AdminClass        = require('../classes/AdminClass');

module.exports =
{
    async createAnnouncement(req, res)
    {
        let user = req.admin_info;

        if (user.designation != 'Administrator') {
            res.status(403).send({ status : 'error', message : 'Only admin users can access this page' });
        }

        let announcement_data = req.body;

        announcement_data.image_path = req.file.filename;

        let announcement_class  = new AnnouncementClass();
        let announcement        = await announcement_class.createAnnouncement(announcement_data);

        if (announcement.status == 'success') {
            res.status(201).send(announcement);

            // -------- Admin Activity Logs --------
            const admin_class   = new AdminClass();
            const date_created  = Date.now();
            admin_class.adminActivityLogs(req.session.admin_user, `Created ${announcement_data.name} announcement`, '-', date_created);
            // ------------- Paul Musa -------------
        } else {
            res.status(400).send(announcement);
        }
    },

    async getAnnouncements(req, res)
    {
        let user = req.admin_info;

        if (user.designation != 'Administrator') {
            res.status(403).send({ status : 'error', message : 'Only admin users can access this page' });
        }

        let announcement_class  = new AnnouncementClass();
        let announcement        = await announcement_class.getAnnouncements();

        if (announcement.status == 'success') {
            res.status(200).send(announcement);
        } else {
            res.status(400).send(announcement);
        }
    },

    async updateAnnouncementStatusById (req, res)
    {
        let user = req.admin_info;

        if (user.designation != 'Administrator') {
            res.status(403).send({ status : 'error', message : 'Only admin users can access this page' });
        }

        let announcement_id = req.params.announcement_id;
        let status = req.body.status;

        let announcement_class  = new AnnouncementClass();
        let is_updated          = await announcement_class.updateAnnouncementStatusById(announcement_id, status);

        if (is_updated.status == 'success') {
            res.status(200).json(is_updated);

            // -------- Admin Activity Logs --------
            const admin_class   = new AdminClass();
            const date_created  = Date.now();
            admin_class.adminActivityLogs(user, `Updated ${is_updated.data.name} announcement status to ${status}`, '-', date_created);
            // ------------- Paul Musa -------------
        } else {
            res.status(400).json(is_updated);
        }
    },

    async removeAnnouncementById (req, res)
    {
        let user = req.admin_info;

        let announcement_id = req.params.announcement_id;

        let announcement_class  = new AnnouncementClass();
        let announcement        = await announcement_class.removeAnnouncementById(announcement_id);

        if (announcement.status == 'success') {
            res.status(200).send(announcement);

            // -------- Admin Activity Logs --------
            const admin_class   = new AdminClass();
            const date_created  = Date.now();
            admin_class.adminActivityLogs(user, `Removed ${announcement.log.name} announcement`, '-', date_created);
            // ------------- Paul Musa -------------
        } else {
            res.status(400).send(announcement);
        }
    },

    async updateAnnouncement(req, res)
    {
        let user = req.admin_info;

        if (!user) {
            res.status(403).send({ status : 'error', message : 'Please login to continue' });
        }

        if (user.designation != 'Administrator') {
            res.status(403).send({ status : 'error', message : 'Only admin users can access this page' });
        }

        let announcement_id     = req.params.announcement_id;
        let announcement_data   = req.body;

        announcement_data.image_path = '';

        if (req.file) {
            announcement_data.image_path = req.file.filename;
        }

        let announcement_class  = new AnnouncementClass();
        let update_announcement = await announcement_class.updateAnnouncement(announcement_id, announcement_data);

        if (update_announcement.status == 'success') {
            res.status(201).send(update_announcement);

            // -------- Admin Activity Logs --------
            const admin_class   = new AdminClass();
            const date_created  = Date.now();
            admin_class.adminActivityLogs(user, `Updated the ${announcement_data.name} announcement`, '-', date_created);
            // ------------- Paul Musa -------------
        } else {
            res.status(400).send(update_announcement);
        }
    },

    async getActiveAnnouncementsImage(req, res)
    {
        let announcement_class  = new AnnouncementClass();
        let announcements       = await announcement_class.getActiveAnnouncementsImage();

        if (announcements.status == 'success') {
            res.status(200).send(announcements);
        } else {
            res.status(400).send(announcements);
        }
    },

    async addItemToAnnouncement(req, res)
    {
        let announcement_id     = req.params.announcement_id;
        let item_id             = req.body.item_id;

        let announcement_class  = new AnnouncementClass();
        let add                 = await announcement_class.addItemToAnnouncement(announcement_id, item_id);

        if (add.status == 'success') {
            res.status(200).send(add);
        } else {
            res.status(400).send(add);
        }
    },

    async getAnnouncementImageById(req, res)
    {
        let announcement_id = req.params.announcement_id;

        let announcement_class  = new AnnouncementClass();
        let announcement        = await announcement_class.getAnnouncementImageById(announcement_id);

        if (announcement.status == 'success') {
            res.status(200).send(announcement);
        } else {
            res.status(400).send(announcement);
        }
    },

    async getAvailableItemsBySellerId(req, res)
    {
        let user    = req.user_info;
        let user_id = user._id;

        let announcement_id = req.params.announcement_id;

        let announcement_class = new AnnouncementClass();
        let items              = await announcement_class.getAvailableItemsBySellerId(user_id, announcement_id);

        if (items.status == 'success') {
            res.status(200).send(items);
        } else {
            res.status(400).send(items);
        }
    },

    async getItemsByAnnouncementId(req, res)
    {
        let announcement_id = req.params.announcement_id;

        let announcement_class = new AnnouncementClass();
        let items              = await announcement_class.getItemsByAnnouncementId(announcement_id);

        if (items.status == 'success') {
            res.status(200).send(items);
        } else {
            res.status(400).send(items);
        }
    }
}