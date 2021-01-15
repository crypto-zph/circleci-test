const MONGOOSE = require('../config/mongo');
const MODEL = require('./MODEL');
const Schema = MONGOOSE.Schema;

const schema = new Schema({
    user_id:
    {
        type: String,
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
    rate:
    {
        type: Number,
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

class MDB_USER_RATING extends MODEL {
    constructor() {
        super('user_ratings', schema);
    }

    async findAndUpdate(id, rate) {
        const res = await this.collection.findOneAndUpdate({ _id: id }, { ratings: rate });
        return res ? res : null;
    }
}

module.exports = MDB_USER_RATING;