// =============================
// Title : Unit Test for Profile
// Author: Pergentino S. Galang II
// Contributor:
// =============================
const assert = require('chai').assert;
const Admin_Class  = require('../classes/AdminClass');
const AccountClass = require('../classes/AccountClass');

let admin_class = new Admin_Class();
let account_class = new AccountClass();
// describe.skip('ADMIN USER', async() => {

//     it('it will get all the admin user', async() =>{
        
//         const response = await admin_class.getAdminUsers();
//         assert.isObject(response);
//     }),

//     it('it update the admin user in the given user Id and information', async() => {
//         let admin_user_info = {
//             _id      : '5fae5268e59ffa1a7ce17e5d',
//             password : 'andrea123',
//             full_name: 'Andrea Lyn',
//             contact  : '09168996546',
//             designation: 'Administrator',
//             description: 'Manage all transaction',
//         };

//         let admin_class = new Admin_Class(admin_user_info);
//         const response = await admin_class.updateAdminUsers();
//         assert.isObject(response);
//     }),

//     it.skip('It will add another admin user', async() => {
//         let admin_user_info = {
//             user_fullname   : 'Andrea Lyn Destajo',
//             user_email      : 'Andrea@gmail.com',
//             user_contact    : '0999999999',
//             user_role       : 'Administrator',
//             user_password   : 'Andrea123',
//         }

//         let admin_class = new Admin_Class(admin_user_info);
//         const response  = await admin_class.addUserAdmin();
//         assert.isObject(response);
//     }),

//     it.skip('It will delete admin user', async() => {

//         let admin_user_info = {
//             _id : '5fae5268e59ffa1a7ce17e5d',
//         }
//         let admin_class = new Admin_Class(admin_user_info);
//         const response = await admin_class.removeAdminUser();
//         assert.isObject(response);
//     })

// }),

describe('PROFILE ADMIN', async() => {

    it('it will get all the avatar', async() =>{
        
        const response = await admin_class.validate_get_avatar();
        assert.isObject(response);
    }),
    it('it will add avatar', async() => {
        let avatar_data = {
            gender      : 'MALE',
            avatar_image_path : 'asdasd.jpg'
        };

        let admin_class = new Admin_Class(avatar_data);
        const response = await admin_class.validate_create_avatar();
        assert.isObject(response);
    }),
    it('it will add cover photo', async() => {
        let avatar_data = {
            cover_photo_path : 'asdasd.jpg'
        };

        let admin_class = new Admin_Class(avatar_data);
        const response = await admin_class.validate_create_cover_photo();
        assert.isObject(response);
    }),
    it('it will get all the cover photo', async() =>{
        
        const response = await admin_class.validate_get_all_cover_photo();
        assert.isObject(response);
    }),
    it('it will get all the Rate and Review', async() =>{
        
        const response = await admin_class.getAllRateAndReview();
        assert.isObject(response);
    }),
    it('it will get all the Reported Users', async() =>{
        
        const response = await admin_class.validate_get_all_reports();
        assert.isObject(response);
    })

    

    // it.skip('It will add another admin user', async() => {
    //     let admin_user_info = {
    //         user_fullname   : 'Andrea Lyn Destajo',
    //         user_email      : 'Andrea@gmail.com',
    //         user_contact    : '0999999999',
    //         user_role       : 'Administrator',
    //         user_password   : 'Andrea123',
    //     }

    //     let admin_class = new Admin_Class(admin_user_info);
    //     const response  = await admin_class.addUserAdmin();
    //     assert.isObject(response);
    // }),

    // it.skip('It will delete admin user', async() => {

    //     let admin_user_info = {
    //         _id : '5fae5268e59ffa1a7ce17e5d',
    //     }
    //     let admin_class = new Admin_Class(admin_user_info);
    //     const response = await admin_class.removeAdminUser();
    //     assert.isObject(response);
    // })

})

describe('PROFILE CLIENT', async() => {

    it('It will update avatar', async() => {
        let avatar_info = {
            user_id  : '5f7ad6515fbf0018b82be1c2',
            avatar_id      : '5f76d0d7b9b3f61728865b7d',
            avatar_path : '1601622231452.jpeg',
        }       

        let account_class = new AccountClass(avatar_info);
        const response  = await account_class.validateAvatar();
        assert.equal(response.status,'success', 'Success status')
    }),

    it('It will show avatar', async() => {

        let avatar_info = {
            _id      : '5f76d0d7b9b3f61728865b7d',
        }  
        let account_class = new AccountClass(avatar_info);
        const response  = await account_class.validateShowAvatar();
        assert.equal(response.status, 'success', 'success');
        // assert.isObject(response, 'result in object');
        // assert.isNotEmpty(response);
    })

})