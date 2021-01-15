const { time } = require('console');
const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema({
    seller_id :
    {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    seller_avatar :
    {
        type:       String
    },
    seller_username :
    {
        type:       String
    },
    seller_first_name :
    {
        type:       String
    },
    seller_last_name :
    {
        type:       String
    },
    buyer_id :
    {
        type:       String
    },
    buyer_first_name :
    {
        type:       String
    },
    buyer_last_name :
    {
        type:       String
    },
    item_name :
    {
        type:       String
    },
    item_image :
    {
        type:       Array,
        default:    []
    },
    category :
    {
        type:       String,
        lowercase:   true
    },
    sub_category :
    {
        type:       String,
        lowercase:   true
    },
    sub_category2 :
    {
        type:       String,
        lowercase:   true
    },
    performance:
    {
        type        : String,
        enum        : ['good', 'very good', 'excellent'],
        lowercase   : true
    },
    condition:
    {
        type        : String,
        enum        : ['used', 'new'],
        lowercase   : true
    },
    caption:
    {
        type        : String
    },
    price :
    {
        BRT:
        {
            type:       Schema.Types.Decimal128 // price.BRT.$numberDecimal for displaying in frontend
        }
    },
    description :
    {
        type:       String
    },
    location :
    {
        type:       String
    },
    status :
    {
        type:       String,
        enum:       ['pending', 'rejected', 'available', 'escrowed', 'bartered'],
        lowercase:   true
    },
    country: {
        type: Object
    },
    total_views :
    {
        type:       Object,
        default:    {
            total: 0,
            viewers: []
        }
    },
    reacts      :
    {
        type    : Object,
        default : {
            like    : {
                num     : 0,
                reactors: []
            },
            heart   : {
                num     : 0,
                reactors: []
            },
            happy   : {
                num     : 0,
                reactors: []
            },

            dislike : {
                num     : 0,
                reactors: []
            }
        }
    },
    share   :
    {
        type    : Object,
        default : {
            num: 0
        }
    },
    is_garage_sale :
    {
        type:       Boolean,
        default:    false
    },
    garage_sale_percentage :
    {
        type:       Number
    },
    is_featured_product :
    {
        type:       Boolean,
        default:    false
    },
    featured_product_duration_from :
    {
        type:       Number
    },
    featured_product_price :
    {
        type:       Number
    },
    created_timestamp :
    {
        type:       Number
    },
    updated_timestamp :
    {
        type:       Number,
    },
    escrowed_date:
    {
        type:       Number,
    },
    bartered_date:
    {
        type:       Number,
    },
    cancelled_date:
    {
        type:       Number,
    },
    is_cancelled:
    {
        type:       Boolean,
        default:    false
    },
    cancelled_buyer_ids:
    {
        type:       Array,
        default:    []
    },
    featured_product_duration_to :
    {
        type:       Number
    },
    featured_product_price :
    {
        type:       Number
    },
    escrow_duration :
    {
        type:       Number
    },
    escrow_duration_date :
    {
        type:       Number
    },
    is_pending_cancel :
    {
        type:       Boolean,
        default:    false
    },
    is_flash_deal:
    {
        type:       Boolean,
        default:    false
    },
    flash_deal_percentage:
    {
        type:       Number
    },
    flash_deal_price:
    {
        type:       Number
    },
    flash_deal_added_time:
    {
        type:       Number
    },
    escrowed_price:
    {
        type:       Number
    },
    has_legalities:
    {
        type:       Boolean,
        default:    false
    },
    legalities:
    {
        type:       Array,
        default:    []
    },
    carousel:
    {
        type:       Array,
        default:    []
    },
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

let Item = new MONGOOSE.model('items', schema);

class MDB_ITEMS extends MODEL
{
    constructor ()
    {
        super('items', schema);
    }

    async findByStatus (info) // chi
    {
        const res = await this.collection.find({ status: info.status});
        return res ? res : null;
    }
    // don
    async fetchFilteredItems ({item_name, category, sub_category, sub_category2, country, performance, condition, sort_by, min_price, max_price})
    {
        let category_filter = {category: 'hey', sub_category: 'hey', sub_category2: 'hey'};

        if(category != '')
        {
            category_filter.category        = category;
        }
        if(sub_category != '')
        {
            category_filter.sub_category    = sub_category;
        }
        if(sub_category2 = '')
        {
            category_filter.sub_category2   = sub_category2;
        }

        let sort_method = null;
        if(sort_by == 'recent')
        {
            sort_method = {created_timestamp: 'desc'}
        }
        else
        if(sort_by == 'highest price')
        {
            sort_method = {'price.BRT': 'desc'}
        }
        else
        if(sort_by == 'lowest price')
        {
            sort_method = {'price.BRT': 'asc'}
        }

        const res = await this.collection.find(
            /* filters */
            {item_name: {$regex: item_name, $options: 'i'}, ...category_filter, 'price.BRT': {$gte: min_price, $lte: max_price} /* sub_category, country, performance: {$in: performance},condition: {$in: condition},*/  },
            null,
            {
                sort: sort_method
            }
        );

        return res;
    }

    async getGroupOfItemsByStatus () // chi
    {
        let res = await this.collection.aggregate(
            [
                {
                    '$group' : {
                        '_id' : {
                            _id         : '$_id',
                            item_name   : '$item_name',
                            status      : '$status',
                            created_at  : { '$dateToString' : { 'format' : '%Y-%m-%d %H:%M', 'date' : '$created_at' } },
                            price       : '$price',
                            description : '$description',
                            item_image  : '$item_image'
                        }
                    },
                },
                {
                    '$group' : {
                        '_id' : '$_id.status',
                        'items' :{
                            '$push' : {
                                'id'            : '$_id._id',
                                'item_name'     : '$_id.item_name',
                                'prices'        : '$_id.price',
                                'description'   : '$_id.description',
                                'item_image'    : '$_id.item_image',
                                'date_posted'   : '$_id.created_at'
                            }
                        }
                    }
                }
            ]);

        return res;
    }

    async getWishlistDataByIds(wishlist_ids) // chi
    {
        let res = await this.collection.find({ _id : { $in : wishlist_ids } }).populate('seller_id');

        return res;
    }

    /**
     *
     * @param { Array } wishlist_ids
     *
     * @return { Array } of wishlist names
     */
    async getWishlistNamesByIds(wishlist_ids) // chi
    {
        let names = [];

        let items= await this.collection.find({ _id : { $in : wishlist_ids } }, { _id: 0, item_name : 1 });

        if (items) {
            for (let count = 0; count < items.length; count++) {
                names.push(items[count].item_name);
            }
        }

        return names;
    }

    /**
     *
     * @param { Array } wishlist_names criteria to get wishlist match
     * @param { Array } wishlist_ids disregard wishlist ids for wishlist match
     *
     * @return { Object } wishlist match items with details
     */
    async getWishlistMatchByWishlistName(wishlist_names, wishlist_ids) // chi
    {
        let res = await this.collection.find({ item_name : { $in : wishlist_names }, _id: { $nin : wishlist_ids }, status: 'available' }).populate('seller_id');

        return res;
    }

     /**
     * @return { Object } of available featured products
     */
    async getFeaturedProducts(limit, skip) // chi
    {
        let date_time = Date.now();
        date_time = new Date(date_time);
        let timestamp = date_time.getTime();

        let query =
        {
            status : 'available',
            is_featured_product : true,
            featured_product_duration_from : { $lte : timestamp },
            featured_product_duration_to : { $gte : timestamp }
        };

        let res = await this.collection.find(query).populate('seller_id').sort({ featured_product_duration_from : -1 }).limit(Number(limit)).skip(Number(skip));
        return res;
    }

    async fetchPostedItem(item_id) // don
    {
        const res = await this.collection.findById(item_id);
        return res;
    }

    async updateItemReact({react, prev_react, status, item_id}) // don
    {
        if(status == 'added')
        {
            let update = {};

            if(react == 'like')
            {
                update = {'reacts.like.num': 1}
            }

            if(react == 'dislike')
            {
                update = {'reacts.dislike.num': 1}
            }

            await this.collection.findOneAndUpdate({_id: item_id}, {$inc: update });
        }

        if(status == 'updated')
        {
            let update_new_react = {};
            let update_old_react = {};
            if(react == 'like')
            {
                update_new_react = { 'reacts.like.num': 1 };
            }

            if(react == 'dislike')
            {
                update_new_react = { 'reacts.dislike.num': 1 };
            }

            if(prev_react == 'like')
            {
                update_old_react = { 'reacts.like.num': -1 };
            }

            if(prev_react == 'dislike')
            {
                updated_old_react = { 'reacts.dislike.num': -1 };
            }

            await this.collection.findOneAndUpdate({_id: item_id}, {$inc: update_new_react });
            await this.collection.findOneAndUpdate({_id: item_id}, {$inc: { 'reacts.like.num': -1 } });
        }

        if(status == 'deleted')
        {
            let update = {}
            if(react == 'like')
            {
                update = { 'reacts.like.num': -1 }
            }

            if(react == 'dislike')
            {
                update = { 'reacts.dislike.num': -1 }
            }

            await this.collection.findOneAndUpdate({_id: item_id}, {$inc: update });
        }

        return {
            status: status
        };
    }
    /**
     * @return { Object } will return object of garage sale items
     */
    async getGarageSaleItems() // chi
    {
        let res = await this.collection.find({ status: 'available', is_garage_sale: true, is_flash_deal: false });

        return res;
    }

    async fetchItem(filter = {}) // pergeant
    {
        let res = await this.collection.findOne(filter);
        return res;
    }
    /**
     *
     * @param { Array } searches -> get items based on user searches
     *
     * @return { Object } of items that matched user searches
     */
    async getSuggestedProducts(searches) // chi
    {
        let keyword = searches.join('|');

        let query = {
            'item_name' :
            {
                '$regex' : keyword,
                '$options' : 'i'
            },
            status: 'available',
        };

        let res = await this.collection.aggregate([
            { "$match": query },
            { "$sample": { "size": 4 } },
            {
            $lookup: {
                   from: 'users',
                   localField: 'seller_id',
                   foreignField: '_id',
                   as: 'seller_id'
                }
             },

        ])
        // .populate('seller_id');
        return res;
    }

    /**
     *
     * @param { Object } data -> which contains item_name | sub_category | sub_category2
     *
     * @return { Object } will return related products based on the given data
     */
    async getRelatedProducts(data, skip) // chi
    {
        let res = await this.collection.find(
        {
            $or :
            [
                { 'item_name' :
                    {
                        '$regex' : data.item_name,
                        '$options' : 'i'
                    }
                },
                { sub_category : data.sub_category },
                { sub_category2 : data.sub_category2 },
            ],
            status : 'available'
        })
        .populate('seller_id')
        .sort('-created_at')
        .limit(5).skip(Number(skip));

        return res;
    }

    async getRelatedProductsNoLimit(data) // chi
    {
        let res = await this.collection.find(
        {
            $or :
            [
                { 'item_name' :
                    {
                        '$regex' : data.item_name,
                        '$options' : 'i'
                    }
                },
                { sub_category : data.sub_category },
                { sub_category2 : data.sub_category2 },
            ],
            status : 'available'
        })

        return res;
    }

    async findEscrowedByStatusAndBuyerId(status, buyer_id) // vermont
    {
        let res = await this.collection.find({ status: status, buyer_id: buyer_id }).sort({ escrowed_date: 'desc' }).populate('seller_id', '-salt -hash');
        return res;
    }

    async findReleasedByStatusAndBuyerId(status, buyer_id) // vermont
    {
        let res = await this.collection.find({ status: status, buyer_id: buyer_id }).sort({ bartered_date: 'desc' }).populate('seller_id', '-salt -hash');
        return res;
    }

    async findByStatusAndCancelledId(buyer_id) // vermont
    {
        let res = await this.collection.find({ buyer_id: { $ne: buyer_id }, cancelled_buyer_ids: { $in: buyer_id } }).populate('seller_id', '-salt -hash');
        return res;
    }


    /**
     * @return { Int } number of available slots for feature products
     */
    async getFeaturedProductSlots() // chi
    {
        let date_time = Date.now();
        date_time = new Date(date_time);
        let timestamp = date_time.getTime();

        let query =
        {
            status : 'available',
            is_featured_product : true,
            featured_product_duration_from : { $lte : timestamp },
            featured_product_duration_to : { $gte : timestamp }
        };

        let count = await this.collection.countDocuments(query);

        let res = (20 - count);

        return res;
    }

    async getLimitedProducts(limit, user_id) // pergent
    {
        let query = 
        {
            status: 'available',
            seller_id: { $ne: user_id }
        }
        if(!user_id)
        {
            delete query.seller_id;
        }

        const res = await this.collection.find(query).limit(limit).populate('seller_id', '-salt -hash');
        return res;
    }

    /**
     *
     * @param { String } item_id -> product id to check if item is still valid for features products
     *
     * @return { Boolean } true if product is on featured products false if not
     */
    async checkFeaturedProductItem(item_id) // chi
    {
        let date_time = Date.now();
        date_time = new Date(date_time);
        let timestamp = date_time.getTime();

        let query =
        {
            _id : item_id,
            status : 'available',
            is_featured_product : true,
            featured_product_duration_from : { $lte : timestamp },
            featured_product_duration_to : { $gte : timestamp }
        };

        let res = await this.collection.find(query);

        return (res.length != 0) ? true : false;
    }

    async findPendingItems() // hindi
    {
        let res = await this.collection.find({ status: 'escrowed', escrow_duration_date: { $ne: null } });
        return res;
    }

    async getTotalFeaturedProducts() //chi
    {
        let date_time = Date.now();
        date_time = new Date(date_time);
        let timestamp = date_time.getTime();

        let query =
        {
            status : 'available',
            is_featured_product : true,
            featured_product_duration_from : { $lte : timestamp },
            featured_product_duration_to : { $gte : timestamp }
        };

        let res = await this.collection.find(query).populate('seller_id');
        return res;
    }

    async getProductDetails(id) // david
    {
        const res = await this.collection.findById(id).populate('seller_id');
        return res ? res : null;

    }

    /**
     *
     * @param { Boolean } is_flash_deal_page
     *
     * @return { Object } of flash deal items
     */
    async getFlashDeals(is_flash_deal_page = false) // chi
    {
        let query =
        {
            status: 'available',
            is_flash_deal: true
        };

        if (is_flash_deal_page) {
            return await this.collection.aggregate([
                { "$match": query }
            ]);
        } else {
            return await this.collection.aggregate([
                { "$match": query },
                { "$sample": { "size": 20 } }
            ]);
        }
    }

    /**
     *
     * @param { String } item_id
     * @param { Int } percentage
     *
     * @return { Object } of updated item details
     */
    async addToFlashDeal(item_id, data) // chi
    {
        let date_time = Date.now();
        date_time = new Date(date_time);

        data.flash_deal_added_time = date_time.getTime();

        let res = await this.collection.findOneAndUpdate({ _id : item_id }, data, { new: true });

        return res;
    }

    /**
     *
     * @param { String } user_id
     *
     * @return { Object } of seller active items on flash deal
     */
    async getFlashDealsBySellerId(user_id) // chi
    {
        let res = await this.collection.find({ seller_id: user_id, status: 'available', is_flash_deal : { $ne : true } });

        return res;
    }

    /**
     *
     * @param { String } item_id
     *
     * @return { Object } of item details
     */
    async isGarageSaleItem(item_id) // chi
    {
        let res = await this.collection.find({ _id : item_id, is_garage_sale : true });

        return res;
    }

    /**
     * @return { Object } of updated is_flash_deal items
     */
    async removeFlashDealItems() // chi
    {
        let now = new Date();
        now = now.getTime();

        // condition
        let query =
        {
            is_flash_deal : true,
            flash_deal_added_time :
            {
                $lt : now
            }
        };

        // fields to update
        let update =
        {
            $set:
            {
                is_flash_deal: false
            }
        };

        // fields to remove
        let unset =
        {
            $unset: [ 'flash_deal_added_time', 'flash_deal_percentage', 'flash_deal_price' ]
        };

        let res = await this.collection.updateMany(query, update, unset);

        return res;
    }
  
    async getUserProducts(user_id, status)
    {
        let res = await this.collection.find({ seller_id: user_id, status: status }).populate('seller_id', '-salt -hash');
        return res;
    }

    async findAndUpdate(item_id, options = {})
    {
        let item = await this.collection.findById(item_id);
        if(item.status != 'available')
        {
            return false;
        }

    	options.escrowed_price = Number(item.price.BRT.toString());
        if(item.is_flash_deal)
        {
            options.escrowed_price = item.flash_deal_price;
        }
        else if(item.is_garage_sale)
        {
            options.escrowed_price = Math.floor(options.escrowed_price * (1 - item.garage_sale_percentage));
        }

        let res = await this.collection.findByIdAndUpdate(item_id, options, {new: true});

        return res;
    }

    async checkAndUpdate(item_id, options = {})
    {
        let item = await this.collection.findById(item_id);
        if(item.status != 'escrowed')
        {
            return false;
        }
        
        let res = await this.collection.findByIdAndUpdate(item_id, options, {new: true});
        return res;
    }

    async findSearchData(filters) // chi
    {
        // const collection    = this.collection;
        // const res           = await collection.find(filters);
        // return res;

        let res = await this.collection.find(filters).populate('seller_id');

        return res;
    }

    /**
     *
     * @param { String } item_id
     * @param { String } announcement_id
     *
     * @return { Object } of updated item details
     */
    async addItemToAnnouncement(item_id, announcement_id) // hindi
    {
        let res = await this.collection.findOneAndUpdate({ _id : item_id }, { $push : { carousel : announcement_id } }, { new : true });

        return res;
    }

    /**
     *
     * @param { String } seller_id
     * @param { String } announcement_id
     *
     * @return { Array } of items by seller id
     */
    async getAvailableItemsBySellerId(seller_id, announcement_id) // chi
    {
        let res = await this.collection.find({ status : 'available', seller_id : seller_id, carousel : { $nin: [ announcement_id ] } });

        return res;
    }

    /**
     *
     * @param { String } announcement_id
     *
     * @return { Array } of items by announcement_id
     */
    async getItemsByAnnouncementId(announcement_id) //chi
    {
        let res = await this.collection.find({ status : 'available', carousel : { $in : [ announcement_id ] } });

        return res;
    }

}

module.exports = MDB_ITEMS;
module.exports.Item = Item;
