const MONGOOSE = require('../config/mongo');
const MODEL = require('./MODEL');
const Schema = MONGOOSE.Schema;


const schema = new Schema({
    cover_photo_path    :
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

class MDB_COVER_PHOTO extends MODEL {
    constructor() {
        super('cover_photos', schema);
    }
}

module.exports = MDB_COVER_PHOTO;