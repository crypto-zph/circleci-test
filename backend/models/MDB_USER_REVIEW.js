const MONGOOSE = require('../config/mongo');
const MODEL = require('./MODEL');
const Schema = MONGOOSE.Schema;

const schema = new Schema({
    user_id:
    {
        type: String,
    },
    user_name: {
        type: String
    },
    reviewer_id:
    {
        type: String,
        required: true
    },
    reviewer_first_name:
    {
        type: String,
        required: true
    },
    reviewer_last_name:
    {
        type: String,
        required: true
    },
    review:
    {
        type: String,
        required: true
    },
    avatar_path:
    {
        type: String,
    },
    gender:
    {
        type: String,
        required: true
    },
    created_timestamp   :
    {
        type        : Number, 
        default     : (new Date()).getTime()
    },
    updated_timestamp   :
    {
        type        : Number, 
        default     : (new Date()).getTime()
    },
});

class MDB_USER_REVIEW extends MODEL {
    constructor() {
        super('user_reviews', schema);
    }

    async findReviewByUser(id) {
        const res = await this.collection.find({ user_id: id });
        return res ? res : null;
    }

    async findByReviewerId(id, options = {}) {
        const res = await this.collection.updateMany({ reviewer_id: id }, options, { new: true });
        return res ? res : null;
    }

    // async findAllReviewById(user_id, abbreviation, skip) {
    //     const res = await this.collection.find({ user_id: user_id, currency_abbreviation: abbreviation }).sort({ created_timestamp: 'desc' }).limit(10).skip(skip);
    //     return res ? res : null;
    // }
}

module.exports = MDB_USER_REVIEW;