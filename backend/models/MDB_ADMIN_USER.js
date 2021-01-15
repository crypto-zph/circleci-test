const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;
const bcrypt    = require('bcryptjs');

const schema = new Schema({
    full_name :
    {
        type: String,
    },
    email :
    {
        type: String,
        unique: true
    },
    contact :
    {
        type: String
    },
    password :
    {
        type: String
    },
    date_created :
    {
        type: Number,
        default: (new Date()).getTime()
    },
    description :
    {
        type: String
    },
    designation :
    {
        type: String
    },
    wallet:
    {
        type: Array,
        default: []
    },
    google_authenticator:
    {
        type: Object
    },
});

let AdminUser = new MONGOOSE.model('admin_users', schema);
class MDB_ADMIN_USER extends MODEL
{
    constructor ()
    {
        super('admin_users', schema);
    }

    async validatePassword (password, hash_password)
    {
        return bcrypt.compareSync(password, hash_password);
    }

    async findByEmail(email) {
        const res = await this.collection.findOne({ email: email });
        return res ? res.toJSON() : null;
    }

    async findAllUser() {
        const res = await this.collection.find().sort({ "date_created": -1 });
        return res ? res : null;
    }

    async findOneAndUpdate(doc, updates) {
        const res = await this.collection.findOneAndUpdate(doc, updates, { new: true })
        return res ? res : null;
    }

    async delUser(userID) {
        const res = await this.collection.findOneAndDelete({ _id: userID });
        return res ? res : null;
    }

    async updateByPublicKey(public_key, balance)
    {
        const res = await this.collection.findOneAndUpdate({ "wallet.public_key": public_key }, { "wallet.$.balance": balance }, { new: true });
        return res ? res : null;
    }

    async findByPublicKey(public_key)
    {
        const res = await this.collection.findOne({ "wallet.public_key": public_key });
        return res ? res : null;
    }

    async findByPublicKey(public_key)
    {
        const res = await this.collection.findOne({ "wallet.public_key": public_key });
        return res ? res : null;
    }
}

module.exports = MDB_ADMIN_USER;
module.exports.AdminUser = AdminUser;