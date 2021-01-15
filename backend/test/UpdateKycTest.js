const assert        = require('chai').assert;
const moment        = require('moment');
const MemberClass   = require('../classes/MemberClass');


const updateKyc   = async () => {
    const res = await MemberClass.updateKyc({
        _id                         : '5f92b144d15bfd2eac776e92',
        first_name                  : 'John Raymund',
        middle_name                 : 'Mijares',
        last_name                   : 'Bernal',
        birth_date                  : moment().format('YYYY-MM-DD'),
        country                     : 'Philippines',
        nationality                 : 'Filipino',
        contact_code                : '+63',
        contact_number              : '9507394473',
        address_line                : '',
        street                      : 'Narra',
        city                        : 'Pasig',
        zip_code                    : '1800',
        has_other_id                : 'true',
        identification_card         : 'SSS',
        id_number                   : '122333',
        id_has_expiry               : 'true',
        id_expiry                   : moment('2020-11-13').format('YYYY-MM-DD'),
        // id_image                    : ,
        // selfie_image                : ,
        has_other_security_question : true,
        security_question           : 'Who\'s your favorite band',
        security_answer             : 'Owl City',
        kyc_status                  : 'submitted'
    });

    return res;
}

describe('UPDATE KYC', async () =>
{
    it('updateKycResult should be type object', async function () 
    {
        assert.typeOf(await updateKyc(), 'object');
    });

    it('updateKycResult status should have success value', async function ()
    {
        let updateKycResult = await updateKyc();
        assert.equal(updateKycResult.status, 'success');
    });

    it('updateKycResult kyc status should have submitted value', async function()
    {
        let updateKycResult = await updateKyc();
        assert.equal(updateKycResult.kyc.kyc_status, 'submitted');
    });
});