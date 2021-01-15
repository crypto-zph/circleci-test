const MONGOOSE = require('../config/mongo');
const MODEL = require('./MODEL');
const Schema = MONGOOSE.Schema;


const schema = new Schema(
{
    emoji_name:
    {
        type: String,
    },
    created_at:
    {
        type: Number,
    },
    is_enabled:
    {
        type: Boolean,
        default: true
    },
    updated_at    :
    {
        type        : Number,
        default     : Date.now()
    },
},
{
    timestamps          :
    {
        createdAt   : 'created_at',
        updatedAt   : 'updated_at'
    }
});

class MDB_EMOJI extends MODEL 
{
    constructor() 
    {
        super('emoji_list', schema);
    }

    async findOneAndUpdate(doc, updates) 
    {
        const res = await this.collection.findOneAndUpdate(doc, updates, { new: true })
        return res;
    }

    async fetchEnabledEmoji()
    {
        const emoji = await this.collection.find({is_enabled: true});
        return emoji;
    }
}

module.exports = MDB_EMOJI;
