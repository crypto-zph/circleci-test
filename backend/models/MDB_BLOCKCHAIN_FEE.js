const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema({
    currency_name:
    {
        type: String
    },
    currency_abbreviation: 
    {
        type: String
    },
    crypto_fee:
    {
        type: Object
    }
});

class MDB_BLOCKCHAIN_FEE extends MODEL
{
	constructor()
	{
		super('blockchain_fees', schema);
    }
    
    async updateByAbbreviation(abbreviation, options = {})
    {
        const res = await this.collection.findOneAndUpdate({currency_abbreviation: abbreviation}, options, {new: true});
        return res ? res : null;
    }

    async findByAbbreviation(abbreviation)
    {
        const res = await this.collection.findOne({currency_abbreviation: abbreviation});
        return res ? res : null;
    }
}

module.exports = MDB_BLOCKCHAIN_FEE;