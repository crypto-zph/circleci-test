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
    report:
    {
        type: String,
        required: true
    },
    // avatar_path:
    // {
    //     type: String,
    // },
    // gender:
    // {
    //     type: String,
    //     required: true
    // },
    created_timestamp   :
    {
        type        : Date, 
    },
    updated_timestamp   :
    {
        type        : Date, 
    },
    reason  :
    {
        type        : String
    },
    report_path :
    {
        type        : String
    }
});

class MDB_USER_REPORT extends MODEL {
    constructor() {
        super('user_reports', schema);
    }

    async findReviewByUser(id) {
        const res = await this.collection.find({ user_id: id });
        return res ? res : null;
    }

    async findByReviewerId(id, options = {}) {
        const res = await this.collection.updateMany({ reviewer_id: id }, options, { new: true });
        return res ? res : null;
    }
}

module.exports = MDB_USER_REPORT;