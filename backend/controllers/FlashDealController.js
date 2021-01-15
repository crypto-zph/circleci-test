const FlashDealClass = require('../classes/FlashDealClass');

module.exports =
{
    async getHomepageFlashDeals(req, res)
    {
        let flash_deal_class = new FlashDealClass();
        let flash_deals      = await flash_deal_class.getFlashDeals();

        if (flash_deals.status == 'success') {
            res.status(200).send(flash_deals);
        } else {
            res.status(400).send(flash_deals);
        }
    },

    async getFlashDeals(req, res)
    {
        let flash_deal_class = new FlashDealClass();
        let flash_deals      = await flash_deal_class.getFlashDeals(true);

        if (flash_deals.status == 'success') {
            res.status(200).send(flash_deals);
        } else {
            res.status(400).send(flash_deals);
        }
    },

    async addToFlashDeal(req, res)
    {
        let { item_id, flash_deal_percentage, flash_deal_price } = req.body;

        let flash_deal_class    = new FlashDealClass();
        let added               = await flash_deal_class.addToFlashDeal(item_id, flash_deal_percentage, flash_deal_price);

        if (added.status == 'success') {
            res.status(200).send(added);
        } else {
            res.status(400).send(added);
        }
    },

    async getActiveItemsToAdd(req, res)
    {
        let user_id = req.user_info._id;

        let flash_deal_class    = new FlashDealClass();
        let items               = await flash_deal_class.getFlashDealsBySellerId(user_id);

        if (items.status == 'success') {
            res.status(200).send(items);
        } else {
            res.status(400).send(items);
        }
    },

    async isGarageSaleItem(req, res)
    {
        let item_id = req.params.item_id;

        let flash_deal_class    = new FlashDealClass();
        let item                = await flash_deal_class.isGarageSaleItem(item_id);

        if (item.status == 'success') {
            res.status(200).send(item);
        } else {
            res.status(400).send(item);
        }
    },

    async removeFlashDealItems(req, res)
    {
        let flash_deal_class    = new FlashDealClass();
        let remove              = await flash_deal_class.removeFlashDealItems();

        if (remove.status == 'success') {
            res.status(200).send(remove);
        } else {
            res.status(400).send(remove);
        }
    }
}