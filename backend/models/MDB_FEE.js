const MONGOOSE = require('../config/mongo');
const MODEL = require('./MODEL');
const Schema = MONGOOSE.Schema;


const schema = new Schema(
{
    percentage:
    {
        type: Number,
    },
    has_promo_code:
    {
        type: Boolean,
    }
});

new MONGOOSE.model("fees", schema);
class MDB_FEE extends MODEL 
{
    constructor()
    {
        super('fees', schema);
    }

    async findByPromoCode(bool)
    {
        const res = await this.collection.findOne({ has_promo_code: bool });
        return res ? res : null;
    }
}

module.exports = MDB_FEE;