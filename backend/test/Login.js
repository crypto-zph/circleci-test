const chai      = require('chai');
const chaiHttp  = require('chai-http');
const server    = require('../server');
const assert    = require('chai').assert;

const AccountClass = require('../classes/AccountClass');

chai.use(chaiHttp);

describe ('LOGIN', () =>
{
    describe ('CLIENT LOGIN', () =>
    {
        describe ('/POST login', () =>
        {
            it ('should return object of user info',
                async () =>
                {
                    let credentials =
                    {
                        userOrEmail : 'curioussince95@gmail.com',
                        password    : 'Password01'
                    };

                    let res = await chai.request('http://localhost:4000')
                                        .post('/api/front/login/local')
                                        .send(credentials);

                    assert.isObject(res);
                }
            );

            it ('should return object info with updated is_online field',
                async () =>
                {
                    let user_id = '5f92b144d15bfd2eac776e92';

                    let account_class   = new AccountClass();
                    let data            = await account_class.updateUserOnlineStatus(user_id);

                    assert.isObject(data);
                }
            );
        });
    });

    describe ('ADMIN LOGIN', () =>
    {
        describe ('/POST login', () =>
        {
            it ('should return object of admin user info',
                async () =>
                {
                    let credentials =
                    {
                        email       : 'sample@gmail.com',
                        password    : 'test123'
                    };

                    let res = await chai.request('http://localhost:4000')
                                        .post('/api/admin/login')
                                        .send(credentials);

                    assert.isObject(res);
                }
            );
        });
    });
});