const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema({
    seller_id :
    {
        type:       String,
    },
    buyer_id :
    {
        type:       String
    },
    item_name :
    {
        type:       String,
    },
    status :
    {
        type:       String,
        // enum:       ['pending', 'rejected', 'available', 'escrowed', 'bartered'],
        // lowercase:   true
    },
    price:
    {
        type: Number,
    },
    date_created:
    {
        type: Number,
    },
    escrowed_date:
    {
        type: Number,
    },
    released_date: // bartered_date
    {
        type: Number,
    }, // this is the next task canceled_date
    cancelled_date:
    {
        type: Number,
    },
    is_cancel:
    {
        type: Boolean,
        default: false, // this is for getting cancelled items
    },
});

class MDB_DUMMY_ITEM extends MODEL
{
    constructor ()
    {
        super('dummy_item', schema);
    }
}

module.exports = MDB_DUMMY_ITEM;