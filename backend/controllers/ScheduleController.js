const ScheduleClass = require('../classes/ScheduleClass');

module.exports =
{
	async setCancelSchedule(req, res)
	{
		let item_information =
		{
			item_id: req.body.item_id,
			buyer_id: req.user_info._id,
			duration: req.body.duration
		}

		let schedule_class = new ScheduleClass(item_information);
		let result = await schedule_class.setCancelSchedule();

		if (result.status == "success")
		{
			res.send(result.status);
		}
		else if (result.status == "error")
		{
			res.status(400).send({ message: result.message });
		}
	},

    async setFlashDealSchedule(req, res)
    {
        let data =
        {
            cron_name   : 'flash_deal',
            duration    : req.body.duration
        };

        let schedule_class  = new ScheduleClass();
        let cron            = await schedule_class.setFlashDealSchedule(data);

        if (cron.status == 'success') {
            res.status(200).send(cron.status);
        } else {
            res.status(400).send({ message : cron.message });
        }
    },

    async getFlashDealSchedule(req, res)
    {
        let schedule_class  = new ScheduleClass();
        let cron            = await schedule_class.getFlashDealSchedule();

        if (cron.status == 'success') {
            res.status(200).json(cron);
        } else {
            res.status(400).send({ message : cron.message });
        }
    }
}
