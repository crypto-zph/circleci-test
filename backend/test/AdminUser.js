// =============================
// Title : Unit Test for Admin User
// Author: Andrea Antonio Destajo
// Contributor:
// =============================
const assert = require('chai').assert;
const Admin_Class  = require('../classes/AdminClass');
const MDB_ROLE     = require('../models/MDB_ADMIN_ROLE');

let admin_class = new Admin_Class();

describe.skip('ADMIN USER', async() => {

    it('it will get all the admin user', async() =>{
        
        const response = await admin_class.getAdminUsers();
        assert.isObject(response);
    }),

    it('it update the admin user in the given user Id and information', async() => {
        let admin_user_info = {
            _id      : '5fae5268e59ffa1a7ce17e5d',
            password : 'andrea123',
            full_name: 'Andrea Lyn',
            contact  : '09168996546',
            designation: 'Administrator',
            description: 'Manage all transaction',
        };

        let admin_class = new Admin_Class(admin_user_info);
        const response = await admin_class.updateAdminUsers();
        assert.isObject(response);
    }),

    it.skip('It will add another admin user', async() => {
        let admin_user_info = {
            user_fullname   : 'Andrea Lyn Destajo',
            user_email      : 'Andrea@gmail.com',
            user_contact    : '0999999999',
            user_role       : 'Administrator',
            user_password   : 'Andrea123',
        }

        let admin_class = new Admin_Class(admin_user_info);
        const response  = await admin_class.addUserAdmin();
        assert.isObject(response);
    }),

    it.skip('It will delete admin user', async() => {

        let admin_user_info = {
            _id : '5fae5268e59ffa1a7ce17e5d',
        }
        let admin_class = new Admin_Class(admin_user_info);
        const response = await admin_class.removeAdminUser();
        assert.isObject(response);
    })

}),

describe.skip('MANAGE ADMIN ROLE', async() => {


    it('It will add admin role', async() => {
        let role_info = {
            role_title_str  : 'sample11',
            access_str      : 'sample role',
            description_str : 'sample role ',
        }       

        let admin_class = new Admin_Class(role_info);
        const response  = await admin_class.addNewRole();
        
        role_id = response._id;

        assert.equal(response.status,'success', 'Success status')

    }),

    it('It will check if it will get the admin roles', async() => {

        let admin_class = new Admin_Class();
        let response    = await admin_class.getAdminRoles();

        assert.equal(response.status, 'success', 'success');
        assert.isObject(response, 'result in object');
        assert.isNotEmpty(response);
    }),

    it('It will check if it will delete the role by the given ID', async() => {

        let role_info = {
            _id : role_id,
        }

        let admin_class = new Admin_Class(role_info);
        let response    = await admin_class.removeAdminRole();

        assert.equal(response.status, 'success');
        assert.isNotNull(response.data);
    })

}),

describe('ASSIGNING RESTRICTION TO ADMIN USER', async()=> {

    it('It will check if it will set restriction to Navigation', async() => {

        let nav_details = {
            nav_id              : '5fbb51508585481340b297d4',
            nav_access_level    : 'Administrator',
        }

        let admin_class = new Admin_Class(nav_details);
        let response    = await admin_class.assignAccess();

        assert.equal(response.status, 'success');
        assert.isNotNull(response.data);

    })
}),


describe('MANAGE ADMIN NAVIGATION', async() => {
    

    it('It will check if it will add new navigation.', async() =>{

        let navInfo = {
            nav_name        : 'Sample Navigation',
            nav_route       : 'Sample_url',
            nav_icon        : 'settings',
            nav_access_level: 'Administrator',
            Nav_type        : 'Admin Navigation',
        }

        let admin_class = new Admin_Class(navInfo);
        let response    = await admin_class.addNewNav();

        assert.equal(response.status, 'success');
        assert.isNotNull(response.data);

    }),

    it('It will check if it will get all navigation', async() => {

        let admin_class = new Admin_Class();
        let response    = await admin_class.getAdminNav();
 
        assert.equal(response.status, 'success');
        assert.isNotNull(response.data);
    }),

    it('It will check if it will remove the admin navigation', async() => {

        let mdb_admin_role = new MDB_ROLE();
        let res            = await mdb_admin_role.findByNavigation('Sample Navigation');

        let nav_info       = {

             _id : res._id,
             
        }

        let admin_class = new Admin_Class(nav_info);
        let response    = await admin_class.removeAdminNavigation();

        assert.equal(response.status, 'success');
        assert.isNotNull(response.data)
    })
})