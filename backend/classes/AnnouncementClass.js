const MDB_ANNOUNCEMENT  = require('../models/MDB_ANNOUNCEMENT');
const MDB_ITEMS         = require('../models/MDB_ITEMS');
const ImageClass        = require('../classes/ImageClass');
const fs                = require('fs');

module.exports = class AnnouncementClass
{
    constructor ()
    {
        this.mdb_announcement           = new MDB_ANNOUNCEMENT;
        this.mdb_item                   = new MDB_ITEMS;
        this.announcement_image_path    = `${process.cwd()}/public/announcement/`;
    }

    /**
     *
     * @param { Object } announcement_data = data/info to insert in collection
     *
     * @return { Object } created announce data from db
     */
    async createAnnouncement(announcement_data)
    {
        let res = {};

        // validate announcement data
        let is_valid = await this.validateAnnouncement(announcement_data);

        if (is_valid.message) {
            res.status = 'error';
            res.message = is_valid.message;
        } else {
            try {
                res.status = 'success';

                let announcement = await this.mdb_announcement.add(announcement_data);

                res.data = announcement;
            } catch (error) {
                res.status = 'error';
                res.message = error.message;
            }
        }

        return res;
    }

    /**
     *
     * @param { Object } announcement_data = announce post fields to validate
     *
     * @return { Boolean | Object.message } = will return boolean if valid and object if not
     */
    async validateAnnouncement(announcement_data)
    {
        if (announcement_data.name.length == 0 || announcement_data.image_path.length == 0 || announcement_data.description.length == 0) {
            return { message : 'Please fill up all required fields to proceed' };
        }

        return true;
    }

    /**
     * @return { Object } will return all announcement regardless of its status
     */
    async getAnnouncements()
    {
        let res = {};

        try {
            res.status = 'success';

            let announcements = await this.mdb_announcement.getAnnouncements();


            let statuses = ['available', 'disabled'];

            let announcement_statuses = [];

            announcements.forEach(announcement => {
                if (!announcement_statuses.includes(announcement._id)) {
                    announcement_statuses.push(announcement._id);
                }
            })

            let difference = statuses.filter(toAdd => !announcement_statuses.includes(toAdd));

            if (difference) {
                let length = announcements.length;

                difference.forEach((toAdd, index) => {
                    announcements[length + index] = {
                        _id : toAdd,
                        announcements: []
                    }
                });
            }

            let image_class = new ImageClass();
            announcements = [announcements];

            for (let counter = 0; counter < announcements.length; counter++) {
                for (let count = 0; count < announcements[counter].length; count++) {
                    announcements[counter][count].announcements = await image_class.convertImagePath(announcements[counter][count].announcements, 'image_path', 'announcement');
                }
            }

            res.data = announcements[0];
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }

    /**
     *
     * @param { String } announcement_id - announcement to edit
     * @param { String - available|disabled } status to set
     *
     * @return { Object } updated status announcement data
     */
     async updateAnnouncementStatusById (announcement_id, status)
    {
        let res = {};

        try {
            res.status = 'success';

            if (!status) {
                res.status = 'error';
                res.message = 'Status is required';
            } else {
                let update = await this.mdb_announcement.update(announcement_id, { status : status });

                res.data = update;
            }
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }

    /**
     *
     * @param { String } announcement_id
     *
     * @return { Object }
     */
    async removeAnnouncementById(announcement_id)
    {
        let res = {};

        try {
            res.status = "success";
            let image_path = await this.mdb_announcement.getAnnouncementImagePathById(announcement_id);
            let remove = await this.mdb_announcement.removeAnnouncementById(announcement_id);

            if (image_path) {
                image_path = `${this.announcement_image_path}${image_path.image_path}`;

                fs.unlink(image_path, (err) => {
                    if (err) {
                        console.error(err)
                        return;
                    }
                });
            }

            res.data = 'success';
            res.log  = remove;
        } catch (error) {
            res.status = "error";
            res.message = error.message;
        }

        return res;
    }

    /**
     *
     * @param { String } announcement_id - announcement to update
     * @param { Object } announcement_data
     *
     * @return { Object } updated announcement details
     */
    async updateAnnouncement(announcement_id, announcement_data)
    {
        let res = {};
        let { name, image_path, status, description, is_clickable } = announcement_data;

        try {
            // check if announcement_id is valid
            let announcement = await this.mdb_announcement.doc({ _id : announcement_id});

            if  (announcement) {
                res.status = 'success';

                if (image_path != '') {
                    let image_to_remove = `${this.announcement_image_path}${announcement.image_path}`;

                    fs.unlink(image_to_remove, (err) => {
                        if (err) {
                            console.error(err)
                            return;
                        }
                    });
                }

                let data =
                {
                    name        : name,
                    image_path  : (image_path != '') ? image_path : announcement.image_path,
                    status      : status,
                    description : description,
                    is_clickable: is_clickable,
                    upfated_at  : new Date().getTime()
                };

                let update = await this.mdb_announcement.updateAnnouncementById(announcement_id, data);

                res.data = update;
            } else {
                res.status = 'error';
                res.message = 'Announcement not found!';
            }
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }

    /**
     * @return { Object } active announcement images
     */
    async getActiveAnnouncementsImage()
    {
        let res = {};

        try {
            res.status = 'success';

            let image_class = new ImageClass();

            let announcements_image = await this.mdb_announcement.getActiveAnnouncementsImage();
            announcements_image = await image_class.convertImagePath(announcements_image, 'image_path', 'announcement');

            res.data = announcements_image;
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }

    /**
     *
     * @param { String } announcement_id
     * @param { String } item_id
     *
     * @return { Object } of updated item details
     */
    async addItemToAnnouncement(announcement_id, item_id)
    {
        let res = {}

        try {
            // validate announcement_id & item_id
            let valid = await this.validateAnnouncementToAdd(announcement_id, item_id);

            if (valid.message) {
                res.status  = 'error';
                res.message = valid.message;
            } else {
                res.status = 'success';

                let add = await this.mdb_item.addItemToAnnouncement(item_id, announcement_id);

                res.data = add;
            }
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }

    /**
     *
     * @param { String } announcement_id
     * @param { String } item_id
     *
     * @return { Object | Boolean } bolean true if valid and object with message key if not
     */
    async validateAnnouncementToAdd(announcement_id, item_id)
    {
        if (typeof announcement_id === 'undefined' || typeof item_id === 'undefined' ||
            announcement_id.length === 0 || item_id.length === 0) {
                return { message : 'Please fill up all required fields to proceed' };
        } else {
            // check if announcement_id is existing
            let announcement = await this.mdb_announcement.doc(announcement_id);

            if (!announcement) {
                return { message : 'Announcement do not exist in our records' };
            }

            // check if item_id is existing
            let item = await this.mdb_item.doc(item_id);

            if (!item) {
                return { message : 'Item do not exist in our records' };
            }
        }

        return true;
    }

    /**
     *
     * @param { String } announcement_id
     *
     * @return { Object } with image key of converted image to base64
     */
    async getAnnouncementImageById(announcement_id)
    {
        let res = {};

        try {
            let announcement    = await this.mdb_announcement.doc(announcement_id);

            if (announcement) {
                res.status = 'success';

                let image_class = new ImageClass();
                let image       = await image_class.convertImage(announcement.image_path, 'announcement');

                res.image = image;
            } else {
                res.status = 'error';
                res.message = 'Announcement not found';
            }
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }

    /**
     *
     * @param { String } seller_id
     * @param { String } announcement_id
     *
     * @return { Object } of seller available items
     */
    async getAvailableItemsBySellerId(seller_id, announcement_id)
    {
        let res = {};

        try {
            res.status = 'success';

            let items = await this.mdb_item.getAvailableItemsBySellerId(seller_id, announcement_id);

            res.data = items;
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }

    /**
     * @return { Object } of carousel announcement available items
     */
    async getItemsByAnnouncementId(announcement_id)
    {
        let res = {};

        try {
            res.status = 'success';

            let image_class = new ImageClass();

            let items = await this.mdb_item.getItemsByAnnouncementId(announcement_id);
            items = await image_class.convertImagePath(items, 'item_image', 'product-imgs/normal_size');

            res.data = items;
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }
}