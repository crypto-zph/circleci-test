const assert        = require('chai').assert;
const ScheduleClass = require('../classes/ScheduleClass');

describe('SCHEDULE CLASS', () =>
{
    it ('it should return an object with status success for setCancelSchedule class',
        async () =>
        {
            let item_information =
            {
                item_id     : '5fa3cb41cab18339f401cfd2',
                duration    : 5
            };

            let schedule_class      = new ScheduleClass(item_information);
            let set_cancel_schedule = await schedule_class.setCancelSchedule();

            assert.equal(set_cancel_schedule.status, 'success');
        }
    );

    it ('it should return an object with status success for setFlashDealSchedule class',
        async () =>
        {
            let data =
            {
                cron_name : 'flash_deal',
                duration  : 72
            }

            let schedule_class          = new ScheduleClass();
            let set_flash_deal_sched    = await schedule_class.setFlashDealSchedule(data);

            assert.equal(set_flash_deal_sched.status, 'success');
        }
    );1

    it ('should have status and time key',
        async () =>
        {
            let schedule_class      = new ScheduleClass();
            let flash_deal_sched    = await schedule_class.getFlashDealSchedule();

            assert.hasAllKeys(flash_deal_sched,[ 'status', 'time' ]);
        }
    );
});