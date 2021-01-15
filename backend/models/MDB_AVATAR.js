const MONGOOSE = require('../config/mongo');
const MODEL = require('./MODEL');
const Schema = MONGOOSE.Schema;


const schema = new Schema({
    avatar_image_path:
    {
        type: String,
        default: ''
    },
    gender:
    {
        type: String,
        default: ''
    },
    created_timestamp   :
    {
        type        : Date, 
        default     : (new Date()).getTime()
    },
    updated_timestamp   :
    {
        type        : Date, 
        default     : (new Date()).getTime()
    },
});

class MDB_AVATAR extends MODEL {
    constructor() {
        super('avatars', schema);
    }
    async findAllAvatarByGender(options = {}) {
        const res = await this.collection.find({ gender: options });
        return res ? res : null;
    }

    

}

module.exports = MDB_AVATAR;