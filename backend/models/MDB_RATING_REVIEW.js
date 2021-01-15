const MONGOOSE = require('../config/mongo');
const MODEL = require('./MODEL');
const Schema = MONGOOSE.Schema;
// const User = require('./MDB_USER').User

const schema = new Schema({
    user_id:
    {
        type: String,
    },
    user_name_rated_reviewed: 
    {
        type: String
    },
    reviewer_id:
    {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    reviewer_first_name:
    {
        type: String,
    },
    reviewer_last_name:
    {
        type: String,
    },
    rate:
    {
        type: Number,
    },
    review:
    {
        type: String,
    },
    review_path:
    {
        type        : Object,
        default     : {
            0         :  '',
            1         :  '',
            2       :  '',
  
        }
    },
},
{
    timestamps: {
        createAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

class MDB_RATING_REVIEW extends MODEL {
    constructor() {
        super('ratings_reviews', schema);
    }

    // async findAndUpdate(id, rate) {
    //     const res = await this.collection.findOneAndUpdate({ _id: id }, { ratings: rate });
    //     console.log(res)
    //     return res ? res : null;
    // }

    async findReviewByUser(id) {
        const res = await this.collection.find({ user_id: id });
        return res ? res : null;
    }

    async findReview(id){
        const res = await this.collection.find({user_id: id }).populate('reviewer_id')
        return res ? res : null;
    }
    async findByReviewerId(id, options = {}) {
        const res = await this.collection.updateMany({ reviewer_id: id }, options, { new: true });
        return res ? res : null;
    }

    async createRateReview(options = {}) {
        const collection   = this.collection;
        let res = new collection (options);
        res = await res.save()
        return res ? res : null;
    }
}

module.exports = MDB_RATING_REVIEW;