const MDB_ITEMS             = require('../models/MDB_ITEMS');
const MDB_NEWS_FEED         = require('../models/MDB_NEWS_FEED');
const MDB_ITEMS_REVIEWS     = require('../models/MDB_ITEM_REVIEWS');
const MDB_SAVED_ITEMS       = require('../models/MDB_SAVED_ITEMS');
const MDB_USER              = require('../models/MDB_USER');
const MDB_WALLET            = require('../models/MDB_WALLET');
const axios                 = require('axios');
const sharp                 = require('sharp');
const dotenv                = require('dotenv').config();
const fs                    = require('fs');
const { parse }             = require('path');
const Item                  = require('../models/MDB_ITEMS').Item;
const ImageClass            = require('./ImageClass');
const MDB_CATEGORIES        = require('../models/MDB_CATEGORIES');
const NotificationClass     = require('./NotificationClass');
const MDB_FEE               = require('../models/MDB_FEE');
const MDB_TRANSACTION       = require('../models/MDB_TRANSACTION');
const MDB_ADMIN_USER        = require('../models/MDB_ADMIN_USER');

module.exports = class ItemClass
{
    constructor(item_information)
    {
        this.mdb_items = new MDB_ITEMS();
        this.mdb_saved_items = new MDB_SAVED_ITEMS();
        this.mdb_user = new MDB_USER();
        this.mdb_categories = new MDB_CATEGORIES();
        this.mdb_wallet = new MDB_WALLET();
        this.mdb_fee = new MDB_FEE();
        this.item_information = item_information;
    }

    toClientAmount(value)
    {
        let amount = value / 1e9;
        return amount.toLocaleString( "en-US", { maximumFractionDigits: 9 } );
    }

    async makeOrderNumber(code, user_id)
    {
        const mdb_transaction   = new MDB_TRANSACTION();

        let result = '';
        let stringed_chars = ('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' + user_id).toString();
        let caps_chars = stringed_chars.toUpperCase();
        
        for (let i = 0; i < 9; i++)
        {
            result += caps_chars.charAt(Math.floor(Math.random() * caps_chars.length));
        }

        let reference_number = `${code}-${result}`

        // CHECKS IF THE GENERATED REFERENCE NUMBER IS ALREADY EXISTS ON transactions collection
        let is_existing = await mdb_transaction.findByReferenceNumber(reference_number);
        if(is_existing)
        {
            await this.makeOrderNumber(code, user_id);
        }
        else
        {
            return reference_number;
        }
    }

    async conversion()
    {
        let res = {};

        try
        {
            let api_key = process.env.API_KEY;
            let url = `https://api.nomics.com/v1/exchange-rates?key=${api_key}`;

            await axios.get(url).then(async response => {
                let convert = {};
                let contents = response.data;

                for (let i = 0; i < contents.length; i++) {
                    convert[contents[i].currency] = Number(contents[i].rate);
                }

                res = convert;
            });
        }
        catch (error)
        {
            res.status = "error";
            res.message = error.message;
        }

        return res;
    }

    async addItem()
    {
        let res = {};
        try
        {
            res.status = "success";

            let USD = await this.toDbAmount(this.item_information.price.USD, 2);
            let BRT = await this.toDbAmount(this.item_information.price.BRT, 9);
            let PHP = await this.toDbAmount(this.item_information.price.PHP, 2);

            let price = {
                USD: USD,
                BRT: BRT,
                PHP: PHP
            }

            let featured = this.item_information.is_featured_product;
            let duration_to = "";

            if (featured)
            {
                duration_to = new Date(this.item_information.featured_product_duration_to);
            }

            let seller_data =
            {
                seller_id                       : this.item_information.seller_id,
                seller_avatar                   : this.item_information.seller_avatar,
                seller_username                 : this.item_information.seller_username,
                seller_first_name               : this.item_information.seller_first_name,
                seller_last_name                : this.item_information.seller_last_name,
                buyer_id                        : this.item_information.buyer_id,
                buyer_first_name                : this.item_information.buyer_first_name,
                buyer_last_name                 : this.item_information.buyer_last_name,
                item_name                       : this.item_information.item_name,
                category                        : this.item_information.category,
                sub_category                    : this.item_information.sub_category,
                sub_category2                   : this.item_information.sub_category2,
                performance                     : this.item_information.performance,
                condition                       : this.item_information.condition,
                caption                         : this.item_information.caption,
                is_garage_sale                  : this.item_information.is_garage_sale,
                garage_sale_percentage          : this.item_information.garage_sale_percentage/100,
                is_featured_product				: this.item_information.is_featured_product,
			    featured_product_duration_from	: Number(Date.now()),
                featured_product_duration_to	: duration_to,
                escrow_duration                 : this.item_information.escrow_duration,
                item_image                      : this.item_information.item_image,
                description                     : this.item_information.description,
                location                        : this.item_information.location,
                status                          : 'available',
                price                           : price,
                total_views                     : [],
                has_legalities                  : this.item_information.has_legalities,
                legalities                      : this.item_information.legalities,
                created_timestamp               : Number(Date.now()),
                updated_timestamp               : null,
                created_at                      : Date.now(),
                updated_at                      : null
            }

            let item_res_obj = await this.mdb_items.add(seller_data);
          
            let follower_information = await this.mdb_user.findById(this.item_information.seller_id);

            for(let follower of follower_information.followers){

                // -----------Notify All Followers -----------------
                let notification_details =
                {
                    user_id : follower,
                    seller_name: this.item_information.seller_first_name,
                    identification_id: item_res_obj._id,
                    profile_pic_path: this.item_information.seller_avatar,
                    avatar_gender: follower_information.gender,                    
                    title: `Posted a product.`,
                    message: `${ this.item_information.seller_first_name } just posted ${this.item_information.item_name} for barter.`,
                    date_created: Date.now(),
                }

                let notification = new NotificationClass(notification_details);
                notification.createNotification();

                // ----------------------------------------------------------------
            }

            let list_of_users = await this.mdb_user.find();

            for(let buyer of list_of_users)
            {
                if(seller_data.is_garage_sale == true && this.item_information.seller_id != buyer._id )
                {
                    // ------------ Garage Sale Notification ------------
                    let garage_notification =
                    {
                        user_id : buyer._id,
                        seller_name: this.item_information.seller_first_name,
                        identification_id: item_res_obj._id,
                        profile_pic_path: this.item_information.seller_avatar,
                        avatar_gender: follower_information.gender, 
                        title: `Garage Sale!`,
                        message: `${seller_data.garage_sale_percentage} OFF. Don’t miss the chance! ${this.item_information.item_name} is now on garage sale. `,
                        date_created: Date.now(),
                    }
                    let notification = new NotificationClass(garage_notification);
                    notification.createNotification();
                    // ----------------------------------------------------------------
                }

                let buyer_information = await this.mdb_user.findById(buyer._id);

                for(let wishlistId of buyer_information.wishlist){

                    let getWishlist = await this.mdb_items.getWishlistNamesByIds(wishlistId);

                    if(getWishlist[0] == this.item_information.item_name && this.item_information.seller_id != buyer._id)
                    {
                        // ------------ wishlist Match and notify Users----------------

                        let wishlist_notification =
                        {
                            user_id : buyer._id,
                            seller_name: this.item_information.seller_first_name,
                            identification_id: item_res_obj._id,
                            profile_pic_path: 'BRT.png',
                            avatar_gender: 'default',
                            title: `Wishlist`,
                            message: `Atlas! Your wishlist ${getWishlist[0]} matched with ${this.item_information.seller_first_name} post. Check it out before others do.`,
                            date_created: Date.now(),
                        }

                        let notification = new NotificationClass(wishlist_notification);

                        notification.createNotification();

                        // ----------------------------------------------------------------
                    }
                }
            }
            // adds to newsfeed
            let mdb_news_feed   = new MDB_NEWS_FEED()
            let posted_item_res_obj = await mdb_news_feed.addPostedItem({
                item_id         : item_res_obj._id,
                user_id         : item_res_obj.seller_id,
                first_name      : item_res_obj.seller_first_name,
                middle_name     : '',
                last_name       : item_res_obj.seller_last_name,
                item_name       : item_res_obj.item_name,
                item_image      : item_res_obj.item_image,
                performance     : item_res_obj.performance,
                condition       : item_res_obj.condition,
                description     : item_res_obj.description,
                price           : item_res_obj.price,
                location        : item_res_obj.location,
                country         : item_res_obj.country,
                caption         : this.item_information.caption,
                post_type       : {type: 'original'}
            });
        }
        catch (error)
        {
            res.status = "error";
            res.message = error.message;
        }

        return res;
    }

    async resizeImage (image_buffer, image_name)
    {
        let res = {};
        try
        {
            fs.access('./public', (error) => {
                if (error) {

                    fs.mkdirSync('./public');
                    fs.access('./public/product-imgs', (error) => {

                        if (error) {

                            fs.mkdirSync('./public/product-imgs');
                            fs.access('./public/product-imgs/normal_size', (error) => {
                                if (error) {
                                    fs.mkdirSync('./public/product-imgs/normal_size');
                                    fs.mkdirSync('./public/product-imgs/large_size');
                                }
                            });

                        }

                    });

                }
            });

            await sharp(image_buffer)
            .resize({width: 502, height: 340})
            .toFile(`./public/product-imgs/normal_size/${image_name}`);

            await sharp(image_buffer)
            .resize({width: 640, height: 480})
            .toFile(`./public/product-imgs/large_size/${image_name}`);

            res.message = "success";

        }
        catch (error)
        {
            res.status = "error";
            res.message = error.message;
        }

        return res;
    }

    async getItem()
    {
        let res = {};
        try
        {
            let item_id         = this.item_information.id;
            let product_details = await this.mdb_items.getProductDetails(item_id);
            let mdb_news_feed   = new MDB_NEWS_FEED();
            let item            = await this.mdb_items.doc(item_id);
            let newsfeed        = await mdb_news_feed.fetchPost({item_id: item_id._id}, {
                newsfeed_id: 1, 
                item_id: 1, 
                reacts: 1, 
                post_type: 1, 
                caption: 1,
                image: 1
            });

            // res = {
            //     ...product_details._doc,
            //     ...item._doc, 
            //     newsfeed_id : newsfeed._doc._id
            // }

            // res.item = {
            //     ...item._doc,
            //     newsfeed_id : newsfeed._doc._id
            // };
            res = await this.mdb_items.getProductDetails(item_id);

            res = {
                // item_id
                item        : {...res._doc},
                // newsfeed_id : newsfeed._doc._id,
                newsfeed: newsfeed._doc
            }


        }
        catch (error)
        {
            res.status = "error";
            res.message = error.message;
        }

        return res;
    }

    async checkSavedItem ()
    {
        let res = {};
        try
        {

            let item_data = {
                item_id     : this.item_information.item_id,
                buyer_id    : this.item_information.buyer_id
            }

            res = await this.mdb_saved_items.findByItemAndBuyerId(item_data);

        }
        catch (error)
        {
            res.status = "error";
            res.message = error.message;
        }

        return res;
    }

    async addToCart()
    {
        let res = {};
        try
        {
            res.status = "success";

            let buyer_data =
            {
                seller_id           : this.item_information.seller_id,
                buyer_id            : this.item_information.buyer_id,
                item_id             : this.item_information.item_id,
                item_name           : this.item_information.item_name,
                item_image          : this.item_information.item_image,
                category            : this.item_information.category,
                price               : this.item_information.price,
                created_timestamp   : Number(Date.now()),
                updated_timestamp   : null,
                created_at          : Date.now(),
                updated_at          : null
            }

            await this.mdb_saved_items.add(buyer_data);

        }
        catch (error)
        {
            res.status = "error";
            res.message = error.message;
        }

        return res;
    }

    async removeToCart()
    {
        let res = {};
        try
        {
            res.status = "success";

            let item_data =
            {
                item_id     : this.item_information.item_id,
                buyer_id    : this.item_information.buyer_id
            }

            await this.mdb_saved_items.deleteByItemAndBuyerId(item_data);

        }
        catch (error)
        {
            res.status = "error";
            res.message = error.message;
        }

        return res;
    }

    async removeAllToCart()
    {
        let res = {};
        try
        {
            res.status = "success";

            await this.mdb_saved_items.deleteByBuyerId(this.item_information);
        }
        catch (error)
        {
            res.status = "error";
            res.message = error.message;
        }

        return res;
    }

    async barter()
    {
        let res = {};
        res.status                  = "success";

        let abbreviation            = 'BRT';
        let { item_id, buyer, seller_id } = this.item_information;

        if(buyer._id == seller_id)
        {
            res.status = 'error';
            res.message = 'You cannot barter your own product.';
            return res;
        }

        let buyer_wallet            = await this.mdb_wallet.findByCurrencyAndUserId(abbreviation, buyer._id);
        let date_now                = Date.now();

        let buyer_data =
        {
            buyer_id                : buyer._id,
            buyer_first_name        : buyer.first_name,
            buyer_last_name         : buyer.last_name,
            status                  : 'escrowed',
            updated_timestamp       : date_now,
            updated_at              : date_now,
            escrowed_date           : date_now,
            is_cancelled            : false
        }

        let item                    = await this.mdb_items.findAndUpdate(item_id, buyer_data);
        if(!item)
        {
            res.status = 'error';
            res.message = 'The product is not available at the moment.';
            return res;
        }

        let price                   = item.escrowed_price;
        let updated_balance         = buyer_wallet.balance - price;

        if(updated_balance < 0)
        {
            res.status = 'error';
            res.message = 'Insufficient Balance';

            let buyer_data =
            {
                status                      : 'available',
                updated_timestamp           : date_now,
                updated_at                  : date_now,
                $unset                      : 
                {
                    escrow_duration_date    : "",
                    buyer_id                : "",
                    buyer_first_name        : "",
                    buyer_last_name         : "",
                    escrowed_price          : "",
                    escrowed_date           : ""
                }
            }
            this.mdb_items.update(item._id, buyer_data);
            return res;
        }

        await this.mdb_wallet.update(buyer_wallet._id, { balance: updated_balance });

        // ---------------Barter Notification-----------------
        let notification_details =
        {
            user_id: item.seller_id,
            seller_name: `${item.seller_first_name} ${item.seller_last_name}`,
            identification_id: buyer._id,
            profile_pic_path: buyer.avatar_path,
            avatar_gender: buyer.gender,
            title: 'Item Status',
            message: `${item.buyer_first_name} bartered your item. Your ${item.item_name} is now safe in our Escrow System. Message ${item.buyer_first_name} to finalize transaction.`,
            date_created: Date.now(),
        }
        let notification = new NotificationClass(notification_details);
        notification.createNotification();
        // ---------------End Barter Notification--------------

        return res;
    }

    async releaseAmount()
    {
        let res = {};

        try
        {
            res.status                  = 'success';
            let code                    = 'FEE';
            let mdb_admin_user          = new MDB_ADMIN_USER();
            let mdb_transaction         = new MDB_TRANSACTION();

            let abbreviation            = 'BRT';
            let { seller_id, item_id }  = this.item_information;
            let seller                  = await this.mdb_user.findWithFee(seller_id);
            let seller_wallet           = await this.mdb_wallet.findByCurrencyAndUserId(abbreviation, seller_id);
            let date_now                = Date.now();

            let seller_data =
            {
                status                  : 'bartered',
                updated_timestamp       : date_now,
                updated_at              : date_now,
                bartered_date           : date_now,
                $unset                  : { escrow_duration_date: "" }
            }

            let item                    = await this.mdb_items.update(item_id, seller_data);
            let price                   = item.escrowed_price;
            let updated_balance         = seller_wallet.balance + Math.floor(((100 - seller.fee.percentage) / 100 ) * price);

            // --------------------------------added code by toqaf-----------------------------------------------------
            let seller_last_transaction = { last_transaction_date: date_now }
            let buyer_last_transaction  = { last_transaction_date: date_now }
            await this.mdb_user.update(item.seller_id, seller_last_transaction); // update the last transaction of the seller
            await this.mdb_user.update(item.buyer_id,  buyer_last_transaction);  // update the last transaction of the buyer
            // -----------------------------end of added code by toqaf-------------------------------------------------

            if (!seller.fee.has_promo_code)
            {
                let MOTHERWALLET_ADDRESS    = process.env.MOTHERWALLET_ADDRESS;
                let admin_info              = await mdb_admin_user.findByPublicKey(MOTHERWALLET_ADDRESS);
                let [ receiver ]            = admin_info.wallet;
                let reference_number        = await this.makeOrderNumber(code, seller_id);
                let fee_collected           = Math.floor(((seller.fee.percentage) / 100 ) * price);
                let receiver_updated        = receiver.balance + fee_collected;

                let add_transaction_receiver =
                {
                    user_id:                admin_info._id,
                    full_name:              admin_info.full_name,
                    email:                  admin_info.email,
                    public_key:             receiver.public_key,
                    currency_name:          "Baristocrat",
                    currency_abbreviation:  "BRT",
                    decimal_places:         9,
                    transaction_type:       "fee",
                    transaction_method:     "plus",
                    amount:                 fee_collected,
                    balance_before:         receiver.balance,
                    balance_after:          receiver_updated,
                    description:            `Received ${this.toClientAmount(fee_collected)} BRT fee from ${seller.first_name} ${seller.last_name}`,
                    triggered_by:           seller_id,
                    reference_number:       reference_number,
                    date_created:           date_now,
                    timestamp_created_at:   date_now,
                };

                // Save DB
                mdb_admin_user.updateByPublicKey(MOTHERWALLET_ADDRESS, receiver_updated);
                mdb_transaction.add(add_transaction_receiver);
            }

            await this.mdb_wallet.update(seller_wallet._id, { balance: updated_balance });
            
            let notification_details_seller =
            {
                user_id: item.seller_id,
                seller_name: `${item.seller_first_name} ${item.seller_last_name}`,
                identification_id: item.buyer_id,
                profile_pic_path: 'BRT.png',
                avatar_gender: 'default',
                title: 'Payment',
                message: `The payment for ${item.item_name} has been credited to your account.`,
                date_created: Date.now(),
            }
            let notification_release = new NotificationClass(notification_details_seller);
            notification_release.createNotification();

            let notification_details_buyer =
            {
                user_id: item.buyer_id,
                buyer_name: `${item.buyer_first_name} ${item.buyer_last_name}`,
                identification_id: item.seller_id,
                profile_pic_path: 'BRT.png',
                avatar_gender: 'default',
                title: `Payment`,
                message: `Payment transfer alert: ${price} BRT tokens was already paid to  ${item.seller_first_name} ${item.seller_last_name} for the ${item.item_name}. Rate this transaction so that we can serve you better.`,
                date_created: Date.now(),
            }
            let notification   =  new NotificationClass(notification_details_buyer);
            notification.createNotification();
        }
        catch (err)
        {
            res.status = 'error';
            res.message = err.message;
        }
        return res;
    }

    async cancelBarter(is_auto_cancel = false)
    {
        let res = {};
        try
        {
            res.status                  = "success";

            let abbreviation            = 'BRT';
            let { item_id, buyer_id }   = this.item_information;
            let buyer_wallet            = await this.mdb_wallet.findByCurrencyAndUserId(abbreviation, buyer_id);
            let date_now                = Date.now();

            let buyer_data =
            {
                status                      : 'available',
                updated_timestamp           : date_now,
                updated_at                  : date_now,
                cancelled_date              : date_now,
                is_cancelled                : true,
                is_pending_cancel           : false,
                $addToSet                   : { cancelled_buyer_ids: buyer_id },
                $unset                      : 
                { 
                    escrow_duration_date    : "",
                    buyer_id                : "",
                    buyer_first_name        : "",
                    buyer_last_name         : "",
                    escrowed_date           : "",
                }
            }
            
            let item                = await this.mdb_items.checkAndUpdate(item_id, buyer_data);
            if(!item)
            {
                res.status = 'error';
                res.message = 'Cancellation is already approved.';
                return res;
            }

            let price               = item.escrowed_price;
            let updated_balance     = buyer_wallet.balance + price;

            await this.mdb_wallet.update(buyer_wallet._id, { balance: updated_balance });

            if(!is_auto_cancel)
            {
                let notification_details_buyer =
                {
                    user_id: buyer_id,
                    seller_name: `${item.seller_first_name} ${item.seller_last_name}`,
                    profile_pic_path: 'BRT.png',  
                    avatar_gender: 'default',
                    title: 'Cancel approved',
                    message: `The seller approved your cancellation.`,
                    date_created: Date.now(),
                }

                let notification = new NotificationClass(notification_details_buyer);
                notification.createNotification();
            }
            
        }
        catch (error)
        {
            res.status = "error";
            res.message = error.message;
        }
        
        return res;
    }

    async views()
    {
        let res = {};
        try
        {
            res = await this.mdb_items.doc(this.item_information.id);

            res.status = "success";
        }
        catch (error)
        {
            res.status = "error";
            res.message = error.message;
        }

        return res;
    }

    async addView()
    {
        let res = {};
        try
        {
            res.status = "success";

            let { id, buyer_id } = this.item_information

            let item_data =
            {
                $addToSet: { total_views: buyer_id }
            }

            if(buyer_id)
            {
                res.item = await this.mdb_items.update(id, item_data);
            }
            else
            {
                res.item = await this.mdb_items.doc(id);
            }
        }
        catch (error)
        {
            res.status = "error";
            res.message = error.message;
        }

        return res;
    }

    async itemStatus()
    {
        let res = {};
        try
        {
            let item_data = {
                status  : this.item_information.status
            }

            res = await this.mdb_items.findByStatus(item_data);

            res.status = "success";
        }
        catch (error)
        {
            res.status = "error";
            res.message = error.message;
        }

        return res;
    }

    async listItem()
    {
        let res = {};
        try
        {
            let items = await this.mdb_items.docs();
            
            let image_class = new ImageClass();
            items = await image_class.convertImagePath(items, 'item_image', 'product-imgs/normal_size');

            res.items = items;

            res.status = "success";
        }
        catch (error)
        {
            res.status = "error";
            res.message = error.message;
        }

        return res;
    }

    async updateItem()
    {
        let res = {};
        try
        {
            res.status = "success";

            let item_data = {
                id      : this.item_information.id,
                status  : this.item_information.status
            };

            await this.mdb_items.update(item_data.id, item_data);
        }
        catch (error)
        {
            res.status = "error";
            res.message = error.message;
        }

        return res;
    }

    async toDbAmount (amount, decimal_places)
    {
        let db_amount = Math.floor(amount * 10 ** decimal_places); // amounut x 10 "*" and "**" is exponent

        return db_amount;
    }

    async identifySeller()
    {
        let res = {};
        try
        {
            res.status = "success";

            let item_data = {
                _id : this.item_information.seller_id
            }

            res.seller = await this.mdb_user.find(item_data);
        }
        catch (error)
        {
            res.status = "error";
            res.message = error.message;
        }

        return res;
    }

	static async fetchFilteredItems({item_name = '', category = '', sub_category = '', sub_category2 = '', country = '', performance = [], condition = [], sort_by = '', min_price = 0.00, max_price = 0.00})
	{
		let res = {};
		const mdb_items     = new MDB_ITEMS();
		min_price = parseFloat(min_price);
		max_price = parseFloat(max_price);

		const items			= await mdb_items.fetchFilteredItems({item_name, category, sub_category, sub_category2, country, performance, condition, sort_by, min_price, max_price});

		if(items == null || !items)
		{
			res.status 	= 'error';
			res.message = 'null result';
		}

		if (items.length >= 0) {
			res.status	= 'success';
			res.items 	= items;
		}

		return res;
    }

    /**
     *
     * @param { String } keyword = all|(text) entered by user
     * @param { Object } filters
     *
     * @return { Object } will return specific item(s) if keyword is specified and available
     */
    async getItems(keyword, filters)
    {
        let res = {};

        filters = (!filters) ? {} : filters;

        try {
            res.status = 'success';
            filters.status = 'available';

            if (keyword !== 'all') {
                filters.$expr =  {
                        '$regexMatch': {
                            'input'     : '$item_name',
                            'regex'     : keyword,
                            'options'   : 'i'
                        }
                    };
            }

            let data = await this.mdb_items.findSearchData(filters);

            // let image_class = new ImageClass();
            // let items = await image_class.convertImagePath(data, ['seller_avatar', 'item_image'], ['avatar', 'product-imgs/normal_size']);

            res.data = data;

        } catch (error) {
            res.status  = 'error';
            res.message = error.message;
        }

        return res;
    }

    /**
     * @return { Object } will return object of avaialable item's item_name
     */
    async getItemNameList()
    {
        let res = {}

        try {
            res.status = 'success';

            let item_name = [];

            await Item.find({status: 'available'}, { item_name : 1 }, (err, items) => {
                if (items) {
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].item_name) {
                            item_name.push(items[i].item_name);
                        }
                    }
                }
            });

            res.data = item_name;
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }

	/* async listItem()
	{
		let res = {};
		try
		{
			res.items = await this.mdb_items.docs();

	// 		res.status = "success";
	// 	}
	// 	catch (error)
	// 	{
	// 		res.status = "error";
	// 		res.message = error.message;
	// 	}

		return res;
	} */

	async toDbAmount (amount, decimal_places)
	{
		let db_amount = Math.floor(amount * 10 ** decimal_places);

		return db_amount;
	}

	async identifySeller()
	{
		let res = {};
		try
		{
			res.status = "success";

			let item_data = {
				_id: this.item_information.seller_id
			}

			res.seller = await this.mdb_user.find(item_data);
		}
		catch (error)
		{
			res.status = "error";
			res.message = error.message;
		}

		return res;
    }

    /**
     * @return { Object } of items group by their status
     */
    async getGroupOfItemsByStatus ()
    {
        let res = {};

        try {
            res.status = 'success';

            let items = await this.mdb_items.getGroupOfItemsByStatus();

            let statuses = ['available', 'escrowed', 'pending', 'disabled'];

            let item_statuses = [];

            items.forEach(item => {
                if (!item_statuses.includes(item._id)) {
                    item_statuses.push(item._id);
                }
            })

            let difference = statuses.filter(toAdd => !item_statuses.includes(toAdd));

            if (difference) {
                let length = items.length;

                difference.forEach((toAdd, index) => {
                    items[length + index] = {
                        _id : toAdd,
                        items: []
                    }
                });
            }

            let image_class = new ImageClass();
            items = [items];

            for (let counter = 0; counter < items.length; counter++) {
                for (let count = 0; count < items[counter].length; count++) {
                    items[counter][count].items = await image_class.convertImagePath(items[counter][count].items, 'item_image', 'product-imgs/normal_size');
                }
            }

            res.data = items[0];
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }

    /**
     *
     * @param { String } product_id
     * @param { String } status -> can be available|disabled
     *
     * @return { Object } -> product details with updated status
     */
    async updateProductStatusById (product_id, status)
    {
        let res = {};

        try {
            res.status = 'success';

            if (!status) {
                res.status = 'error';
                res.message = 'Status is required';
            } else {
                let update = await this.mdb_items.update(product_id, { status : status });

                res.data = update;
            }
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }

    static async fetchPostedItem(item_id)
    {
        let res = {};
        const mdb_items             = new MDB_ITEMS();
        const mdb_items_reviews     = new MDB_ITEMS_REVIEWS();
        const item_res_obj          = await mdb_items.fetchPostedItem(item_id);
        const item_comments_res_obj = await mdb_items_reviews.fetchItemComments(item_id);

        if(item_res_obj == null)
        {
            res.status  = 'error';
            res.message = 'no item found';
        }

        if(item_res_obj != null)
        {
            res.status          = 'success';
            res.item            = item_res_obj;
            res.item_comments   = item_comments_res_obj;
        }

        return res;
    }
    async getCategories()
    {
    	let res = {};
    	try
    	{
    		res.status = "success";

    		res.categories = await this.mdb_categories.docs();
    	}
    	catch (error)
    	{
    		res.status = 'error';
            res.message = error.message;
    	}

    	return res;
    }

    async getSubCategories()
    {
    	let res = {};
    	try
    	{
    		res.status = "success";

    		res.sub_categories = await this.mdb_categories.find(this.item_information);
    	}
    	catch (error)
    	{
    		res.status = 'error';
            res.message = error.message;
    	}

    	return res;
    }

    async fetchSavedItems()
    {
    	let res = {};
    	try
    	{
    		res.status = "success";

            let image_class = new ImageClass();

            let items = await this.mdb_saved_items.find(this.item_information);
            // items = await image_class.convertImagePath(items, 'item_image', 'product-imgs/normal_size')

            res.saved_items = items;
    	}
    	catch (error)
    	{
    		res.status = "error";
    		res.message = error.message;
    	}

    	return res;
    }

    /**
     * @return { Object } will return object of garage sale items
     */
    async getGarageSaleItems()
    {
        let res = {};

        try {
            res.status = 'success';

            let image_class = new ImageClass();

            let garage_sale = await this.mdb_items.getGarageSaleItems();
            garage_sale = await image_class.convertImagePath(garage_sale, ['seller_avatar', 'item_image'], ['avatar', 'product-imgs/normal_size']);

            res.data = garage_sale;
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }

    /**
     *
     * @param { Array } searches -> user stored cookie searches
     *
     * @return { Object } will return object of suggested products that is matched with user searches
     */
    async getSuggestedProducts(searches)
    {
        let res = {};

        try {
            res.status = 'success';

            let image_class = new ImageClass();

            let suggested_products = await this.mdb_items.getSuggestedProducts(searches);
            // suggested_products = await image_class.convertImagePath(suggested_products, ['seller_avatar', 'item_image'], ['avatar', 'product-imgs/normal_size']);

            res.data = suggested_products;
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }

    /**
     *
     * @param { String } item_id's name/sub_category/sub_category2 to search in database
     *
     * @return { Object } will return object of related products
     */
    async getRelatedProducts(item_id, skip)
    {
        let res = {};


        try {
            if (item_id.match(/^[0-9a-fA-F]{24}$/)) {
                // check if item_id exist in records
                let item = await this.mdb_items.doc(item_id);

                if (item) {
                    res.status = 'success';

                    let data =
                    {
                        item_name : (item.item_name) ? item.item_name : '',
                        sub_category : (item.sub_category) ? item.sub_category : '',
                        sub_category2 : (item.sub_category2) ? item.sub_category2 : ''
                    };

                    let image_class = new ImageClass();

                    let related_products = await this.mdb_items.getRelatedProducts(data, skip);
                    // related_products = await image_class.convertImagePath(related_products, ['seller_avatar', 'item_image'], ['avatar', 'product-imgs/normal_size']);

                    res.data = related_products;
                } else {
                    res.error = 'error';
                    res.message = 'Invalid Item';
                }
            } else {
                res.error = 'error';
                res.message = 'Invalid Item';
            }
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }

    async getRelatedProductsNoLimit(item_id)
    {
        let res = {};

        try {
            if (item_id.match(/^[0-9a-fA-F]{24}$/)) {
                // check if item_id exist in records
                let item = await this.mdb_items.doc(item_id);

                if (item) {
                    res.status = 'success';

                    let data =
                    {
                        item_name : (item.item_name) ? item.item_name : '',
                        sub_category : (item.sub_category) ? item.sub_category : '',
                        sub_category2 : (item.sub_category2) ? item.sub_category2 : ''
                    };

                    let image_class = new ImageClass();

                    let related_products = await this.mdb_items.getRelatedProductsNoLimit(data);
                    related_products = await image_class.convertImagePath(related_products, ['seller_avatar', 'item_image'], ['avatar', 'product-imgs/normal_size']);

                    res.data = related_products;
                } else {
                    res.error = 'error';
                    res.message = 'Invalid Item';
                }
            } else {
                res.error = 'error';
                res.message = 'Invalid Item';
            }
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }

    async getProductsHistory()
    {
        let res = {};
        let { status, user_id } = this.item_information;

        try
        {
            res.status = 'success';

            if (status === 'escrowed')
            {
                res.data = await this.mdb_items.findEscrowedByStatusAndBuyerId(status, user_id);
            }
            else if (status === 'bartered')
            {
                res.data = await this.mdb_items.findReleasedByStatusAndBuyerId(status, user_id);
            }
            else if (status === 'cancelled')
            {
                res.data = await this.mdb_items.findByStatusAndCancelledId(user_id);
            }
        }
        catch (err)
        {
            res.status = 'error';
            res.message = err.message;
        }
        return res;
    }

    async limitedItems()
    {
        let res = {};
        try
        {
		let { user_id, limit } = this.item_information;
            let items = await this.mdb_items.getLimitedProducts(limit, user_id);
            //can't convert in base 64 from populate
            // let image_class = new ImageClass();
            // items = await image_class.convertImagePath(items, ['seller_id.avatar_path'], ['avatar']);

            res.items = items;
            res.status = "success";
        }
        catch (error)
        {
            res.status = "error";
        }

        return res
    }

    /**
     * @return { Object } list of available featured products
     */
    async getFeaturedProducts()
    {
        let res = {};

        try {
            res.status = 'success';

            // let image_class = new ImageClass(); 

            let featured_products = await this.mdb_items.getFeaturedProducts(this.item_information.limit, this.item_information.skip);
            // featured_products = await image_class.convertImagePath(featured_products, ['seller_avatar', 'item_image'], ['avatar', 'product-imgs/normal_size']);

            res.data = featured_products;
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }

    /**
     * @return { Object } list of available featured products
     */
    async getTotalFeaturedProducts()
    {
        let res = {};

        try {
            res.status = 'success';

            let featured_products = await this.mdb_items.getTotalFeaturedProducts();

            res.data = featured_products;
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }

    /**
     * @return { Object } with number of available slots for feature products
     */
    async getFeaturedProductSlots()
    {
        let res = {};

        try {
            res.status = 'success';

            let count = await this.mdb_items.getFeaturedProductSlots();

            res.count = count;
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }

    /**
     *
     * @param { String } item_id -> product id to check if item is still valid for featured products
     *
     * @return { Object } which contains status and boolean if product is on featured products
     */
    async checkFeaturedProductItem(item_id)
    {
        let res = {};

        try {
            res.status = 'success';

            let is_featured_product = await this.mdb_items.checkFeaturedProductItem(item_id);

            res.is_featured_product = is_featured_product;
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }
    
    async updateItems()
    {
        let res = {};

        try 
        {
            res.status = 'success';

            let item_id = this.item_information.id;

            await this.mdb_items.update(item_id, this.item_information);
        } 
        catch (error) 
        {
            res.status = 'error';
            res.message = error.message;
        }

        return res;
    }

    async notifyCancel()
    {
        let res = {};
        try
        {
            res.status                  = "success";

            let { item_id, buyer }  = this.item_information;
            let item                = await this.mdb_items.update(item_id, { is_pending_cancel: true });

            let notification_details_seller =
            {
                buyer_id: buyer._id,
                user_id: item.seller_id,
                seller_name: `${item.seller_first_name} ${item.seller_last_name}`,
                item_id: item_id,
                profile_pic_path: buyer.avatar_path,
                avatar_gender: buyer.gender,
                title: 'Cancelled',
                message: `${buyer.first_name} ${buyer.last_name} cancelled the Item - ${item.item_name}`,
                date_created: Date.now(),
            }

            let notification = new NotificationClass(notification_details_seller);
            notification.createNotification();

        }
        catch (error)
        {
            res.status = "error";
            res.message = error.message;
        }

        return res;
    }

    async getUserProducts()
    {
        let res = {};
        let { user_id, status } = this.item_information;

        let user_products = await this.mdb_items.getUserProducts(user_id, status);
        res.status = 'success';
        res.data = user_products;

        return res;
    }
}
