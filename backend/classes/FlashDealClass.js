const MDB_ITEMS = require('../models/MDB_ITEMS');

module.exports = class FlashDealClass
{
    constructor()
    {
        this.mdb_items = new MDB_ITEMS();
    }

    /**
     *
     * @param { Boolean } is_flash_deal_page
     *
     * @return { Object } of flash deal items
     */
    async getFlashDeals(is_flash_deal_page = false)
    {
        let res = {};

        try {
            res.status = 'success';

            res.data = await this.mdb_items.getFlashDeals(is_flash_deal_page);
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }

    /**
     *
     * @param { String } item_id
     * @param { Int } flash_deal_percentage - percentage
     * @param { Int } flash_deal_price
     *
     * @return { Object } of updated item details
     */
    async addToFlashDeal(item_id, flash_deal_percentage, flash_deal_price)
    {
        let res = {};

        try {
            // check if item_id is valid
            let item = await this.mdb_items.doc({ _id : item_id });

            if (item) {
                let data =
                {
                    flash_deal_percentage   : flash_deal_percentage,
                    flash_deal_price        : flash_deal_price
                };

                // validate data
                let valid = this.validateFlashDealData(data);

                if (valid.message) {
                    res.status = 'error';
                    res.message = valid.message;
                } else {
                    res.status = 'success';
                    data.is_flash_deal = true;

                    let update = await this.mdb_items.addToFlashDeal(item_id, data);

                    res.data = update;
                }
            } else {
                res.status = 'error';
                res.message = 'Invalid item';
            }
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }

    /**
     *
     * @param { String } user_id
     *
     * @return { Object } of seller active items on flash deal
     */
    async getFlashDealsBySellerId(user_id)
    {
        let res = {};

        try {
            res.status = 'success';

            let items = await this.mdb_items.getFlashDealsBySellerId(user_id);

            res.data = items;
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }

    /**
     *
     * @param { Object } data = flash deal post fields to validate
     *
     * @return { Boolean | Object.message } = will return boolean if valid and object if not
     */
    async validateFlashDealData(data)
    {
        if (typeof data.flash_deal_percentage === 'undefined' || typeof data.flash_deal_price === 'undefined' ||
            data.flash_deal_percentage.length == 0 || data.flash_deal_price.length == 0) {
            return { message : 'Please fill up all required fields to proceed' };
        }

        return true;
    }

    /**
     *
     * @param { String } item_id
     *
     * @return { Object } status & is_garage_sale that return a boolean value
     */
    async isGarageSaleItem(item_id)
    {
        let res = {};

        try {
            res.status = 'success';

            let items = await this.mdb_items.isGarageSaleItem(item_id);

            res.is_garage_sale = items.length > 0 ? true : false;
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }

    /**
     * @return { Object } of updated items details
     */
    async removeFlashDealItems()
    {
        let res = {};

        try {
            res.status = 'success';

            let remove = await this.mdb_items.removeFlashDealItems();
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }
}