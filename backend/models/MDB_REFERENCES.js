const moment    = require('moment');
const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;


const schema = new Schema(
{
    users   : {
        type    : Object,
        default : {
            total               : 0,

            kyc_not_submitted   : 0,
            kyc_submitted       : 0,
            kyc_rejected        : 0,
            kyc_approved        : 0,

            active              : 0,
            block               : 0,

            online              : 0,
            offline             : 0
        }
    }
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});


module.exports = class MDB_REFERENCES extends MODEL
{
    #main_doc = {
        _id: '5fdb15f944bb191fd8fb81f5'
    };

    constructor ()
    {
        super('references', schema);
    }

    // total users
    async incrementTotal(inc = 1)
    {
        const res           = this.collection.findOneAndUpdate(
            this.#main_doc._id, 
            {
                $inc: {
                    'users.total': inc
                }
            },
            {
                fields: {
                    'users.total': 1
                }
            }
        );
        
        return res;
    }
    // end of total users

    // kyc not_kyc_submitted users
    async incrementKycNotSubmitted(inc = 1)
    {
        const res           = this.collection.findOneAndUpdate(
            this.#main_doc._id, 
            {
                $inc: {
                    'users.not_kyc_submitted': inc
                }
            },
            {
                fields: {
                    'users.not_kyc_submitted': 1
                }
            }
        );
        
        return res;
    }

    async decrementKycNotSubmitted(dec = -1)
    {
        const res           = this.collection.findOneAndUpdate(
            this.#main_doc._id, 
            {
                $inc: {
                    'users.not_kyc_submitted': dec
                }
            },
            {
                fields: {
                    'users.not_kyc_submitted': 1
                }
            }
        );
        
        return res;
    }
    // end of not_kyc_submitted users

    // kyc kyc_submitted users
    async incrementKycSubmitted(inc = 1)
    {
        const res           = this.collection.findOneAndUpdate(
            this.#main_doc._id, 
            {
                $inc: {
                    'users.kyc_submitted': inc
                }
            },
            {
                fields: {
                    'users.kyc_submitted': 1
                }
            }
        );
        
        return res;
    }

    async decrementKycSubmitted(dec = -1)
    {
        const res           = this.collection.findOneAndUpdate(
            this.#main_doc._id, 
            {
                $inc: {
                    'users.kyc_submitted': dec
                }
            },
            {
                fields: {
                    'users.kyc_submitted': 1
                }
            }
        );
        
        return res;
    }
    // end of kyc_submitted users

    // kyc kyc_approved users
    async incrementKycApproved(inc = 1)
    {
        const res           = this.collection.findOneAndUpdate(
            this.#main_doc._id, 
            {
                $inc: {
                    'users.kyc_approved': inc
                }
            },
            {
                fields: {
                    'users.kyc_approved': 1
                }
            }
        );
        
        return res;
    }

    async decrementKycApproved(dec = -1)
    {
        const res           = this.collection.findOneAndUpdate(
            this.#main_doc._id, 
            {
                $inc: {
                    'users.kyc_approved': dec
                }
            },
            {
                fields: {
                    'users.kyc_approved': 1
                }
            }
        );
        
        return res;
    }
    // end kyc kyc_approved users

    // kyc_rejected users
    async incrementKycRejected(inc = 1)
    {
        const res           = this.collection.findOneAndUpdate(
            this.#main_doc._id, 
            {
                $inc: {
                    'users.kyc_rejected': inc
                }
            },
            {
                fields: {
                    'users.kyc_rejected': 1
                }
            }
        );
        
        return res;
    }

    async decrementKycRejected(dec = -1)
    {
        const res           = this.collection.findOneAndUpdate(
            this.#main_doc._id, 
            {
                $inc: {
                    'users.kyc_rejected': dec
                }
            },
            {
                fields: {
                    'users.kyc_rejected': 1
                }
            }
        );
        
        return res;
    }
    // end kyc_rejected users

    // creates reference document. Must trigger once only
    async create()
    {
        return await this.add();
    }
}