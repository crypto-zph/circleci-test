// =============================
// Title : Unit Test for Admin Reset Password
// Author: Andrea Antonio Destajo
// Contributor:
// =============================
const assert        = require('chai').assert;
const Admin_Class   = require('../classes/AdminClass');
const mdb_admin_user= require('../models/MDB_ADMIN_USER');

describe('Admin Reset Password', async() => {

    it('#adminChangePassword()', async() => {

        let admin_info = {
            email_str   : 'sample1@gmail.com',
            old_pass_str: 'password',
            new_pass_str: 'password',
        }
        let admin_class = new Admin_Class(admin_info)
        let response    = await admin_class.adminChangePassword();

        assert.equal(response.status, 'success');

    })
})