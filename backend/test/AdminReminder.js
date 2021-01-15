// =============================
// Title : Unit Test for Admin Reminder
// Author: Andrea Antonio Destajo
// Contributor:
// =============================
const assert             = require('chai').assert;
const Notification_Class = require('../classes/NotificationClass');

describe('Admin Reminder', async () =>
{
    describe('It will check the functions of admin reminder', async() => {
        
        it('#createNotification()', async() =>{

            let notification_info   = {

                user_id          : '5f92b144d15bfd2eac776e92',
                message          : 'Sample Notification',
                title            : 'Sample Notification',
                date_created     :  Date.now(),
                date_opened      : '',
                is_open          :  false,
                profile_pic_path : 'BRT.png',
                avatar_gender    : 'default',
                title            : 'Reminder',
                subject          : 'Reminder',
            }

            let notification_class  =  new Notification_Class(notification_info);
            let response            =  await notification_class.createNotification();

            assert.equal(response.status, 'success');
            assert.isNotEmpty(response.data);
            
        })
    })
})
