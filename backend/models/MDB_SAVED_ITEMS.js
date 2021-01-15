const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema 	= new Schema({
	seller_id :
	{
		type: String,
		required: true
	},
	buyer_id :
	{
		type: String,
		required: true
	},
	item_id :
	{
		type: String,
		required: true
	},
	item_name :
	{
		type: String,
		required: true
	},
	item_image :
	{
		type: String,
		required: true
	},
	category :
	{
		type: String,
		required: true
	},
	price :
	{
        BRT:
        {
            type:       Schema.Types.Decimal128,
            required:   true,
        }
	},
	created_timestamp :
	{
		type: Number
	},
	updated_timestamp :
	{
		type: Number
	},
	created_at :
	{
		type: Date
	},
	updated_at :
	{
		type: Date
	}
});

class MDB_SAVED_ITEMS extends MODEL
{
    constructor ()
    {
        super('saved_items', schema);
    }

    async findByItemAndBuyerId (info)
    {
    	const res = await this.collection.findOne({ item_id: info.item_id, buyer_id: info.buyer_id });
        return res ? res : null;
    }

    async deleteByItemAndBuyerId (info)
    {
    	const res = await this.collection.deleteOne({ item_id: info.item_id, buyer_id: info.buyer_id });
        return res ? res : null;
	}
	
	async deleteByBuyerId (info)
	{
		const res = await this.collection.deleteMany({ buyer_id: info.buyer_id });
        return res ? res : null;
	}
}

module.exports = MDB_SAVED_ITEMS;