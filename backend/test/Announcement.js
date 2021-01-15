const assert            = require('chai').assert;
const { should } = require('chai');
const AnnouncementClass = require('../classes/AnnouncementClass');

describe('CAROUSEL ANNOUNCEMENT', () =>
{
    describe('ADMIN', () =>
    {
        it ('should return an object of list of announcement group by their statuses',
            async () =>
            {
                let announcement_class  = new AnnouncementClass();
                let announcements       = await announcement_class.getAnnouncements();

                assert.isObject(announcements);
            }
        );

        it.skip ('should return an object of created announcement details',
            async () =>
            {
                let data =
                {
                    name        : 'unit test',
                    image_path  : 'sample_image.jpg',
                    description : 'unit test sample',
                    status      : 'disabled'
                };

                let announcement_class  = new AnnouncementClass();
                let create              = await announcement_class.createAnnouncement(data);

                assert.isObject(create);
            }
        );

        it ('shoud return an object with key message for not valid data',
            async () =>
            {
                let data =
                {
                    name        : 'unit test',
                    image_path  : '',
                    description : '',
                };

                let announcement_class  = new AnnouncementClass();
                let valid               = await announcement_class.validateAnnouncement(data);

                assert.hasAllKeys(valid, [ 'message' ]);
            }
        );

        it ('should return a boolean true if data is valid',
            async () =>
            {
                let data =
                {
                    name        : 'unit test',
                    image_path  : 'sample_image.jpg',
                    description : 'unit test sample',
                    status      : 'disabled'
                };

                let announcement_class  = new AnnouncementClass();
                let valid               = await announcement_class.validateAnnouncement(data);

                assert.isTrue(valid);
            }
        );

        it.skip ('should return an object with updated announcement status',
            async () =>
            {
                let announcement_id = '5fc9f6b1269cf732b4f1e8c6';
                let status          = 'available';

                let announcement_class  = new AnnouncementClass();
                let update              = await announcement_class.updateAnnouncementStatusById(announcement_id, status);

                assert.isObject(update);
            }
        );

        it.skip ('should return an object of details of updated announcement',
            async () =>
            {
                let announcement_id = '5fc9f6b1269cf732b4f1e8c6';
                let data =
                {
                    description: 'unit test edited description'
                }

                let announcement_class  = new AnnouncementClass();
                let updated             = await announcement_class.updateAnnouncement(announcement_id, data);

                assert.isObject(updated);
            }
        );

        it.skip ('should return an object with status and data key if success',
            async () =>
            {
                let announcement_id = '5fc9f6b1269cf732b4f1e8c6';

                let announcement_class  = new AnnouncementClass();
                let remove              = await announcement_class.removeAnnouncementById(announcement_id);

                assert.hasAllKeys(remove, [ 'status', 'data' ]);
            }
        );
    });

    describe('CLIENT', () =>
    {
        it ('should return an object of active announcement images',
            async () =>
            {
                let announcement_class  = new AnnouncementClass();
                let announcements       = await announcement_class.getActiveAnnouncementsImage();

                assert.isObject(announcements);
            }
        );

        it ('should return an object of item added to announcement page',
            async () =>
            {
                let announcement_id = '5fc0a428aa5aae10fc837263';
                let item_id         = '5fd765830fd392319026a062';

                let announcement_class  = new AnnouncementClass();
                let items               = await announcement_class.addItemToAnnouncement(announcement_id, item_id);

                assert.isObject(items);
            }
        );

        it ('should return an object with message key if data to add is invalid',
            async () =>
            {
                let announcement_id = '';
                let item_id         = '';

                let announcement_class  = new AnnouncementClass();
                let validate            = await announcement_class.validateAnnouncementToAdd(announcement_id, item_id);

                assert.hasAllKeys(validate, [ 'message' ]);
            }
        );

        it ('should return an boolean true if data to add is valid',
            async () =>
            {
                let announcement_id = '5fc0a428aa5aae10fc837263';
                let item_id         = '5fd765830fd392319026a062';

                let announcement_class  = new AnnouncementClass();
                let validate            = await announcement_class.validateAnnouncementToAdd(announcement_id, item_id);

                assert.isTrue(validate);
            }
        );

        it ('should return an object of announcement details by id',
            async () =>
            {
                let announcement_id = '5fc0a428aa5aae10fc837263';

                let announcement_class  = new AnnouncementClass();
                let announcement        = await announcement_class.getAnnouncementImageById(announcement_id);

                assert.isObject(announcement);
            }
        );

        it ('should return an array of seller available items',
            async () =>
            {
                let seller_id       = '5fd765830fd392319026a062';
                let announcement_id = '5fc0a428aa5aae10fc837263';

                let announcement_class  = new AnnouncementClass();
                let items               = await announcement_class.getAvailableItemsBySellerId(seller_id, announcement_id);

                assert.hasAllKeys(items, [ 'status', 'data' ]);
            }
        );

        it ('should return an array of items by announcement',
            async () =>
            {
                let announcement_id = '5fc0a428aa5aae10fc837263';

                let announcement_class  = new AnnouncementClass();
                let items               = await announcement_class.getItemsByAnnouncementId(announcement_id);

                assert.hasAllKeys(items, [ 'status', 'data' ]);
            }
        );
    });
});