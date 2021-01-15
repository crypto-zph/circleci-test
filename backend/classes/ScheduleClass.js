const axios             = require('axios');
const CronJob   = require('cron').CronJob;
const CronTime  = require('cron').CronTime;
const ItemClass = require('../classes/ItemClass');
const MDB_ITEMS = require('../models/MDB_ITEMS');
const FlashDealClass     = require('../classes/FlashDealClass');
const MDB_CONVERSION     = require('../models/MDB_CONVERSION');
const MDB_BLOCKCHAIN_FEE = require('../models/MDB_BLOCKCHAIN_FEE');
let schedule = {};

module.exports = class ScheduleClass
{
    constructor(item_information)
    {
        this.item_information   = item_information;
        this.mdb_items          = new MDB_ITEMS();
    }

    async mountedSetCancelSchedule()
    {
        let pending_schedule = await this.mdb_items.findPendingItems();
        let date_now = Date.now();

        for(let i = 0; i < pending_schedule.length; i++)
        {
            let duration_date = pending_schedule[i].escrow_duration_date;
            let time = new Date(duration_date);
            let item_information = 
            {
                buyer_id: pending_schedule[i].buyer_id,
                item_id: pending_schedule[i]._id
            }

            let item_class = new ItemClass(item_information);

            if(duration_date > date_now)
            {
                schedule[item_information.item_id] = new CronJob(time, async () =>
                {
                    await item_class.cancelBarter(true);
                    delete schedule[item_information.item_id];
                }, null, false);
                schedule[item_information.item_id].start();
            }
            else
            {
                await item_class.cancelBarter(true);
            }
        }
        // console.log(Object.keys(schedule));
        return;
    }

    async setCancelSchedule()
    {
        let res = {};
        let { item_id, duration } = this.item_information;
        try
        {
            res.status = 'success';

            let time = new Date();
            time.setDate(time.getDate() + duration);
            delete schedule[item_id];
            await this.mdb_items.update(item_id, { escrow_duration_date: time });

            schedule[item_id] = new CronJob(time, async () =>
            {
                let item_class = new ItemClass(this.item_information);
                await item_class.cancelBarter(true);
                delete schedule[item_id];
            }, null, false);
            schedule[item_id].start();
            // console.log(Object.keys(schedule));
        }
        catch(err)
        {
            res.status = 'error';
            res.message = err.message;
        }
        return res;
    }

    async conversionRates() {
        try
        {
            let api_key = process.env.NOMICS_API_KEY;
            let url = `https://api.nomics.com/v1/exchange-rates?key=${api_key}`;

            let convert = {};
            await axios.get(url).then(async response => {
                let contents = response.data;

                for (let i = 0; i < contents.length; i++) {
                    convert[contents[i].currency] = Number(contents[i].rate);
                }

                convert['BRT'] = 0.00009; // $0.00009 per BRT token - static price
            });

            const mdb_conversion = new MDB_CONVERSION();
            await mdb_conversion.updateByAbbreviation('USD', { rates: convert });
        }
        catch(error)
        {
            return error.message;
        }
    }

    /**
     * @return { Object }
     */
    async setFlashDealSchedule(data)
    {
        let res = {};
        let { cron_name, duration } = data;

        try {
            res.status = 'success';

            let time = new Date();
            time.setHours(time.getHours() + duration);
            delete schedule[cron_name];

            schedule[cron_name] = new CronJob(time, async () =>
            {
                let flash_deal_class = new FlashDealClass();
                let flash_deal = await flash_deal_class.removeFlashDealItems();

                await this.setFlashDealSchedule(data);
                delete schedule[cron_name];
            }, null, false, 'Asia/Manila');

            schedule[cron_name].start();
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }

    /**
     * @return { Object } with flash deal schedule
     */
    async getFlashDealSchedule()
    {
        let res = {};

        try {
            res.status = 'success';

            let schedule_time = 0;

            if (typeof schedule.flash_deal !== 'undefined') {
                schedule_time = schedule['flash_deal'].nextDates().toLocaleString("en-US", {timeZone: "Asia/Manila"});
                schedule_time = new Date(schedule_time).getTime();
            }

            res.time = schedule_time;
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }

    async cryptoFee() {
        const mdb_blockchain_fee = new MDB_BLOCKCHAIN_FEE();

        try {
            let eth_gas_api_key = process.env.ETH_GAS_API_KEY;
            let btc_url = 'https://api.blockcypher.com/v1/btc/main';
            let eth_url = `https://data-api.defipulse.com/api/v1/egs/api/ethgasAPI.json?api-key=${eth_gas_api_key}`;

            // Bitcoin API Fees
            await axios.get(btc_url).then(async response => {
                let res = response.data;
                let btc_fee = {
                    slow:    res.low_fee_per_kb,
                    average: res.medium_fee_per_kb,
                    fast:    res.high_fee_per_kb
                }

                let btc_blockchain = await mdb_blockchain_fee.updateByAbbreviation('BTC', { crypto_fee: btc_fee });
                console.log(btc_blockchain.crypto_fee)
            });

            // Ethereum API Fees
            await axios.get(eth_url).then(async response => {
                let res = response.data;
                let eth_fee = 
                {
                    slow:    (res.average / 10) + 1,
                    average: (res.fast / 10) + 1,
                    fast:    (res.fastest / 10) + 1
                }
                let { slow, average, fast } = eth_fee;
                if (!(slow.toString() === "NaN" || average.toString() === "NaN" || fast.toString() === "NaN"))
                {

                    let eth_blockchain = await mdb_blockchain_fee.updateByAbbreviation('ETH', { crypto_fee: eth_fee });
                    console.log(eth_blockchain.crypto_fee);
                }
                else
                {
                    console.log("Error Fetching Fees");
                }
            });
        }
        catch(error) 
        {
            return error.message;
        }
    }

}

new module.exports().mountedSetCancelSchedule();

// Every 5 mins, It updates conversion collection - Paul Musa
const scheduleUpdateConversion = new CronJob('*/5 * * * *', async () =>
{
    await new module.exports().conversionRates();
}, null, false)
scheduleUpdateConversion.start();

// Every 5 mins, It updates blockchain_fees collection - Paul Musa
// const scheduleUpdateCryptoFee = new CronJob('*/5 * * * *', async () =>
// {
//     await new module.exports().cryptoFee();
// }, null, false)
// scheduleUpdateCryptoFee.start();
