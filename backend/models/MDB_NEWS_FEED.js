const moment    = require('moment');
const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;


const schema = new Schema(
{

 // ------------------------------------
    // Admin Announcement in Newsfeed
    // Andrea Lyn Destajo
    // ------------------------------------
    
    title :
    {
        type       :String,
    },

    image:
    {
        type        : Object,
        default     :
        {
            0       :  '',
            1       :  '',
            2       :  '',
        }

    },

    page_location:
    {
        type        : String,
    },

    date_created:
    {
        type        : Date,
    },

    is_publish:
    {
        type        : Boolean,
    },

    custom_setting:
    {
        type        : String,
    },

    custom_selected:
    {
        type        :Array,
        default     :[],
    },

    announcement_type:
    {
        type        :String,
    },
    // ------------------------------------
    // End Admin Announcement in Newsfeed
    // ------------------------------------   
    item_id :
    {
        type: Schema.Types.ObjectId,
        ref: "items"
    },

    user_id :
    {
        type    : String,
    },

    first_name :
    {
        type    : String,
    },

    middle_name:
    {
        type    : String,
    },

    last_name  :
    {
        type    : String,
    },

    item_name   :
    {
        type    : String,
    },

    item_image :
    {
        type:       Array,
        // default:    []
    },

    description :
    {
        type    : String
    },

    performance:
    {
        type        : String,
        enum        : ['good', 'very good', 'excellent'],
        lowercase   : true,
    },
    condition:
    {
        type        : String,
        enum        : ['used', 'new'],
        lowercase   : true,
    },
    price :
    {
        USD:
        {
            type:       Schema.Types.Decimal128,
        },
        BRT:
        {
            type:       Schema.Types.Decimal128,
        },
        PHP:
        {
            type:       Schema.Types.Decimal128,
        }
    },

    location :
    {
        type:       String
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
    },
    
    share   :
    {
        type    : Object,
        default : {
            num: 0
        }
    },

    comment   :
    {
        type    : Object,
        default : {
            num: 0
        }
    },

    post_type   : 
    {
        type    : Object,
    },

    caption     : 
    {
        type    : Object,
        default : {
            original: '',
            share   : ''
        }
    },

    created_timestamp    :
    {
        type    : String,
        // required: true
    },

    updated_timestamp    :
    {
        type    : String,
        // required: true
    },

    
},
{
    timestamps:
    {
        createdAt   : 'created_at',
        updatedAt   : 'updated_at'
    }
});

class MDB_NEWS_FEED extends MODEL
{
    constructor ()
    {
        super('newsfeed', schema);
    }

    async addPostedItem({item_id, user_id, first_name, middle_name, last_name, item_name, item_image, description, performance, condition, price, caption, location, country, post_type})
    {
        let now = moment().format('x');
        const res  = await this.add({
            item_id,
            user_id,
            first_name,
            middle_name,
            last_name,
            item_name,
            item_image,
            performance,
            condition,
            description,
            price,
            location,
            country,
            'caption.original': caption,
            post_type: {...post_type},
            created_timestamp: now,
            updated_timestamp: now,
        });

        await this.collection.findOneAndUpdate({_id: res._id}, {'post_type.original_post': res._id + ''});
        return res;
    }

    async fetchPostedItems(sort = {}, opt = {})
    {
        let res = await this.collection.find({})
            .sort(sort)
            .skip(opt.skip)
            .limit(opt.limit)
            .populate('item_id');

        return res;
    }

    async incrementShareCount(original_post)
    {
        const res = await this.collection.findOneAndUpdate({_id: original_post}, { $inc: {'share.num': 1}});
        return res;
    }

    async sharePostGlobal({original_post, post_type, caption, first_name, middle_name, last_name})
    {
        let now = moment().format('x');
        let res = await this.add({
            post_type: {
                'original_post': original_post,
                'type': post_type
            },
            caption,
            first_name, 
            middle_name, 
            last_name,
            created_timestamp: now,
            updated_timestamp: now
        });

        let inc = await this.incrementShareCount(original_post);

        return res;
    }

    async fetchOriginalPost(filters)
    {
        let res = await this.collection.findOne(filters);
        
        return res;
    }

    async fetchPost(filters, fields = {})
    {
        let res = await this.collection.findOne(filters, fields).populate('item_id');
        
        return res;
    }

    async increaseReactCount({_id, react})
    {
        let res = {}

        let update = {}
        if(react == 'like')
        {
            update = {$inc: {'reacts.like.num': 1}}
        }
        res = await this.collection.findOneAndUpdate({_id}, update, {new: true});

        return res;
    }

    async decreaseReactCount({_id, react})
    {
        let res = {}

        let update = {}
        if(react == 'like')
        {
            update = {$inc: {'reacts.like.num': -1}}
        }
        res = await this.collection.findOneAndUpdate({_id}, update, {new: true});

        return res;

    }
    // ------------------------------------
    // Admin Announcement in Newsfeed
    // Andrea Lyn Destajo
    // ------------------------------------
    async getAnnouncementByType(){

        const query_result = await this.collection.find({announcement_type: 'Newsfeed Announcement'}).sort({'date_created': -1});
        return query_result ? query_result : null;
    }

    async findAnnouncementByStatus()
    {
        let query_result = await this.collection.find({is_publish: true}).sort({'date_created': -1});
        return query_result ? query_result : null;
    }

    async findOneAndUpdate(id, updates)
    {
        const query_result = await this.collection.findOneAndUpdate(id, updates, { new: true })
        return query_result ? query_result : null;
    }

    async deleteById(id) {
        const res = await this.collection.findOneAndDelete({ _id: id });
        return res ? res : null;
    }

    async findById(id)
    {
        const res = await this.collection.findOne({_id : id});
        return res ? res : null ;
    }

    async incrementCommentCount(filter = {})
    {
        const res = await this.collection.findOneAndUpdate(filter, {
            $inc: {'comment.num': 1}
        });

        return res;
    }
}


module.exports = MDB_NEWS_FEED;