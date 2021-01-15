const WalletClass = require('../classes/WalletClass');

module.exports =
{
    async socketServer(server)
    { 
        let wallet_class = new WalletClass();
        await wallet_class.socketServer(server);
    },

    async send(req, res)
    {
        let date = Date.now();
        let details = {
            user_id:                req.session.user_info._id,       // get sender user info
            receiver_public_key:    req.body.receiver_public_key,    // get receiver user info
            currency_abbreviation:  req.body.currency_abbreviation,
            amount:                 req.body.amount,
            remarks:                req.body.remarks,
            otp:                    req.body.otp,
            date_created:           date,
            timestamp_created_at:   date
        }

        let wallet_class = new WalletClass(details);
        let result = await wallet_class.send();

        if (result.status == "success") 
        {
            res.status(200).send({ status: result.status, data: result.data });
        }
        else
        {
            res.status(400).send({ status: result.status, message: result.message });
        }
    },

    async history(req, res) {
        let details = {
            user_id:                req.session.user_info._id,
            currency_abbreviation:  req.body.currency_abbreviation,
            skip:                   req.body.skip
        }

        let wallet_class = new WalletClass(details);
        let result = await wallet_class.history();

        if (result.status == "success") 
        {
            res.status(200).json({ status: result.status, data: result.data });
        }
        else
        {
            res.status(400).json({ status: result.status, message: result.message });
        }
    },

    async getConversionRates(req, res)
    {
        let wallet_class = new WalletClass();
        let result = await wallet_class.getConversionRates();

        res.status(200).send(result)
    },

    async notifyFrontend(req, res)
    {
        let details = 
        {
            user_id:               req.body.user_id,
            currency_abbreviation: req.body.currency_abbreviation
        }

        let wallet_class = new WalletClass(details);
        await wallet_class.notifyFrontend();
    },

    // async notifyMotherwallet(req, res)
    // {
    //     let details = 
    //     {
    //         balance:               req.body.balance,
    //         user_id:               req.body.user_id,
    //         transaction:           req.body.transaction,
    //         currency_abbreviation: req.body.currency_abbreviation
    //     }
    //     let wallet_class = new WalletClass(details);
    //     await wallet_class.notifyMotherwallet();
    //     res.status(200).send(true);
    // },

}
