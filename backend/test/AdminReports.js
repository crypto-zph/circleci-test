// =============================
// Title : Unit Test for Admin Reports
// Author: Toqaful Yaosaful Herrera
// Contributor: Ahko Dhin
// =============================
const assert = require('chai').assert;
const AdminClass  = require('../classes/AdminClass');

let admin_class         = new AdminClass({});

describe('TOTAL ESCROW REPORT/S', async () => 
{
    it('it will get all the escrowed product and other details', async () =>
    {
        let response    = await admin_class.getTotalEscrow();

        assert.equal(response.status, 'success');
        assert.isNotNull(response.data);
    })
}),

describe('TOTAL RELEASE REPORT/S', async () => 
{
    it('it will get all the bartered product and other details', async () =>
    {
        let response    = await admin_class.getTotalRelease();

        assert.equal(response.status, 'success');
        assert.isNotNull(response.data);
    })
}),

describe('TOTAL CANCEL REPORT/S', async () => 
{
    it('it will get all the cancelled product and other details', async () =>
    {
        let response    = await admin_class.getTotalCancelled();

        assert.equal(response.status, 'success');
        assert.isNotNull(response.data);
    })
}),

describe('TOTAL OVER ALL TOTAL REPORT/S', async () => 
{
    it('it will get overll all total and other details', async () =>
    {
        let response    = await admin_class.getOverAllTotal();

        assert.equal(response.status, 'success');
        assert.isNotNull(response.data);
    })
}),

describe('TOTAL ACTIVE AND INACTIVE USER/S', async () => 
{
    it('it will get all the active/inactive user/s and other details', async () =>
    {
        let response    = await admin_class.readUser();

        assert.equal(response.status, 'success');
        assert.isNotNull(response.data);
    })
})