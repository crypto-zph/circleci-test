const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema({
    currency_abbreviation: 
    {
        type: String
    },
    currency_name:
    {
        type: String
    },
    rates:
    {
        type: Object
    }
});

class MDB_CONVERSION extends MODEL
{
	constructor()
	{
		super('conversions', schema);
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

module.exports = MDB_CONVERSION;