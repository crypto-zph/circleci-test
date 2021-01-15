const MONGOOSE = require('../config/mongo');
const MODEL = require('./MODEL');
const Schema = MONGOOSE.Schema;

const schema = new Schema({
    currency_name:
    {
        type:    String
    },
    currency_abbreviation:
    {
        type:    String
    },
    decimal_places:
    {
        type:   Number 
    },
    total_supply:
    {
        type:    Number
    },
    remaining_supply:
    {
        type:    Number,
        default: 0
    },
    circulating_supply:
    {
        type:    Number,
        default: 0
    },
    market_cap:
    {
        type:    String,
        default: ""
    },
    price:
    {
        type:    String,
        default: ""
    },
    date_created:
    {
        type: Date
    },
    timestamp_created_at:
    {
        type: Number
    }
},  {   
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

class MDB_BARISTOCRAT extends MODEL 
{
    constructor() 
    {
        super('baristocrat_token', schema);
    }

    async findBaristocrat() 
    {
        const res = await this.collection.findOne();
        // .sort({ date_created: 'desc' });
        return res ? res : null;
    }
}

module.exports = MDB_BARISTOCRAT;