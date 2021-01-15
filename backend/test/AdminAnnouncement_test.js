// =============================
// Title : Unit Test for Admin Announcement
// Author: Andrea Antonio Destajo
// Contributor:
// =============================
const assert            = require('chai').assert;
const AdminClass        = require("../classes/AdminClass");

describe('Admin Announcement', async() => {

    it('#postNewsfeedAnnouncement()', async() => {

        let announcement_details = {
            title            : 'Sample Title',
            description      : 'Sample Description',
            image            : 'Sample.jpg',
            is_publish       : false,
            date_created     : Date.now(),
            custom_setting   : 'Public',
            custom_selected  : [],
            announcement_type: 'Newsfeed Announcement',
        }

        let admin_class     = new AdminClass(announcement_details);
        let response        = await admin_class.postNewsfeedAnnouncement();

        assert.equal(response.status,'success');
        assert.isNotEmpty(response.data);

    })

    it('#getNewsfeedAnnouncement()', async () => {

        let admin_class     = new AdminClass();
        let response        = await admin_class.getNewsfeedAnnouncement();

        assert.equal(response.status, 'success');
        assert.isNotEmpty(response.data)
    })

    it('#updateAdminAnnouncement()', async () => {

        let announcement_info = {
            _id             : '5fc61e2bd9aa1a0c180a887a',
            title           : 'Sample title Update', 
            description     : 'Sample title Description', 
            is_publish      : false, 
            custom_selected : [], 
        }

        let admin_class     = new AdminClass(announcement_info);
        let response        = await admin_class.updateAdminAnnouncement();

        assert.equal(response.status, 'success');
        assert.isNotEmpty(response.data)

    })

    it('#getPublishAnnouncement()', async () => {

        let admin_class     = new AdminClass();
        let response        = await admin_class.getPublishAnnouncement();

        assert.equal(response.status, 'success');
        assert.isNotEmpty(response.data)

    })

    it('#removeAnnouncement()', async () => {

        let admin_class     = new AdminClass({_id: '5fc61c3677a664286848b402', image : []});
        let response        = await admin_class.removeAnnouncement();

        assert.equal(response.status, 'success');
        assert.isNotEmpty(response.data)
        
    })
    
})

