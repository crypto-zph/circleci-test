// =============================
// Title : Unit Test for Notification
// Author: Andrea Antonio Destajo
// Contributor:
// =============================
const assert             = require('chai').assert;
const Notification_Class = require('../classes/NotificationClass')

describe('Notification Class', async() => {

    describe('It will check all the notification functions', async() => {

       
        it('#createNotification()', async() =>{

            let notification_info   = {

                user_id     : '5f92b144d15bfd2eac776e92',
                message     : 'Sample Notification',
                title       : 'Sample Notification',
                date_created: Date.now(),
                date_opened : '',
                is_open     : false,
            }

            let notification_class  =  new Notification_Class(notification_info);
            let response            =  await notification_class.createNotification();

            assert.equal(response.status, 'success');
            assert.isNotEmpty(response.data);
            
        })

        it('#getNotifications()', async() => {

            let notification_info   = {
                user_id     : '5f7ad6515fbf0018b82be1c2',
            }

            let notification_class  = new Notification_Class(notification_info);
            let response            = await notification_class.getNotifications();

            assert.equal(response.status, 'success');
            assert.isNotEmpty(response.data);
        })

        it('#deleteNotification', async() => {

            let notification_info = {
                _id     : '5fbb87689657b030149dc7eb',
            }

            let notification_class  = new Notification_Class(notification_info);
            let response            = await notification_class.deleteNotification();

            assert.equal(response.status, 'success');

        })

        it('#openNotif()', async() => {

            let notification_info   = {
                _id:'5fbb93c48d31d427c097a109'
            }

            let notification_class  = new Notification_Class(notification_info);
            let response            = await notification_class.openNotif();

            assert.equal(response.status, 'success');
            assert.isNotEmpty(response.data);
        })
    })
})