const MONGOOSE = require('../config/mongo');
const MODEL = require('./MODEL');
const Schema = MONGOOSE.Schema;


const schema = new Schema(
{
    user_name:
    {
        type: String,
    },
    brt_wallet:
    {
        type: String,
    },
    balance:
    {
        type: Number,
    },
    date_created:
    {
        type: Number,
    },
    last_transaction_date:
    {
        type: Number,
    },
    status:
    {
        type: String,
    }
});

class MDB_DUMMY_ACC extends MODEL 
{
    constructor() 
    {
        super('dummy_acc', schema);
    }
}

module.exports = MDB_DUMMY_ACC;