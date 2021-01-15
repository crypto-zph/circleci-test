const MONGOOSE = require('../config/mongo');
const MODEL = require('./MODEL');
const Schema = MONGOOSE.Schema;


const schema = new Schema(
{
    category_name:
    {
        type: String,
    },
    category_image_path:
    {
        type: String,
    },
    date_created:
    {
        type: Number,
    },
    status:
    {
        type: String,
        enum        : ['enabled', 'disabled']
    },
    date_updated   :
    {
        type        : Number,
        default     : Date.now()
    },
    legalities:
    {
        type: String,
    },
    subcategory:
    {
        type: Array,
        default: [],
    },
    subcategory2:
    {
        type: Array,
        default: [],
    },
},
{
    timestamps          :
    {
        createdAt   : 'created_at',
        updatedAt   : 'updated_at'
    }
});

class MDB_CATEGORIES extends MODEL 
{
    constructor() 
    {
        super('categories', schema);
    }

    async findOneAndUpdate(doc, updates) 
    {
        const res = await this.collection.findOneAndUpdate(doc, updates, { new: true })
        return res;
    }

    async fetchEnabledCategories()
    {
        const categories = await this.collection.find({status: 'enabled'},
        {
            _id                 : 1,
            category_name       : 1,
            category_image_path : 1,
            subcategory         : 1,
            subcategory2        : 1,
        });
        return categories;
    }
}

module.exports = MDB_CATEGORIES;
