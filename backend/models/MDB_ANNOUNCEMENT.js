const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema = new Schema({

    name:
    {
        type    : String
    },
    image_path:
    {
        type    : String,
        default : ''
    },
    description:
    {
        type    : String
    },
    status:
    {
        type    : String,
    },
    is_clickable:
    {
        type    : Boolean,
    }
},

{
    timestamps:
    {
        createdAt   : 'created_at',
        updatedAt   : 'updated_at'
    },
});

class MDB_ANNOUNCEMENT extends MODEL
{
    constructor()
    {
        super('announcements', schema);
    }

    /**
     * @return { Object } announcements that is group by available and disabled
     */
    async getAnnouncements ()
    {
        let res = await this.collection.aggregate(
            [
                {
                    '$group' : {
                        '_id' : {
                            _id                 : '$_id',
                            name                : '$name',
                            status              : '$status',
                            created_at          : { '$dateToString' : { 'format' : '%Y-%m-%d %H:%M', 'date' : '$created_at' } },
                            image_path          : '$image_path',
                            description         : '$description',
                            is_clickable        : { '$ifNull' : [ '$is_clickable', false ] } ,
                        }
                    },
                },
                {
                    '$group' : {
                        '_id' : '$_id.status',
                        'announcements' :{
                            '$push' : {
                                'id'                    : '$_id._id',
                                'name'                  : '$_id.name',
                                'image_path'            : '$_id.image_path',
                                'date_posted'           : '$_id.created_at',
                                'description'           : '$_id.description',
                                'status'                : '$_id.status',
                                'is_clickable'          : '$_id.is_clickable',
                            }
                        }
                    }
                }
            ]);

        return res;
    }

    /**
     *
     * @param { String } announcement_id will be used to removed specific announcement
     *
     */
    async removeAnnouncementById(announcement_id)
    {
        let res = await this.collection.findOneAndDelete({ _id: announcement_id });

        return res ? res : null;
    }

    /**
     *
     * @param { String } announcement_id will be used to get specific announcement image path
     *
     * @return { String } announcement image_path
     */
    async getAnnouncementImagePathById(announcement_id)
    {
        let image_path = await this.collection.findOne({ _id: announcement_id }, { _id: 0, image_path: 1 });

        return image_path ? image_path : null;
    }

    /**
     *
     * @param { String } announcement_id  will be used to update specific announcement
     * @param { Object } data - data to update
     */
    async updateAnnouncementById(announcement_id, data)
    {
        let res = await this.collection.findOneAndUpdate({ _id : announcement_id }, data, { new: true });

        return res;
    }

    /**
     * @return { Array } will return image_path of all active announcements
     */
    async getActiveAnnouncementsImage()
    {
        let announcements = await this.collection.find({ status : 'available' });

        return announcements;
    }

}

module.exports = MDB_ANNOUNCEMENT;