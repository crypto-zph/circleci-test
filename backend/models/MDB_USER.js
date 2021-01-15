const MONGOOSE  = require('../config/mongo');
const passport  = require('passport');
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate          = require('mongoose-findorcreate');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;
const bcrypt    = require('bcryptjs');

const schema    = new Schema({
    googleId            :
    {
        type        : String,
        unique      : true
    },
    facebookId            :
    {
        type        : String,
        unique      : true
    },
    first_name          :
    {
        type        : String,
        lowercase   : true,
        default     : ''
    },
    middle_name          :
    {
        type        : String,
        unique      : true
    },
    last_name           :
    {
        type        : String,
        lowercase   : true,
        default     : ''

    },
    birth_date          :
    {
        type        : Date,
    },
    gender              :
    {
        type        : String,
        lowercase   : true,
        enum        : ['male', 'female'],
    },
    avatar              :
    {
        type        : String,
        lowercase   : true,
        default     : ''
    },
    country             :
    {
        type        : String,
        lowercase   : true,
        default     : ''
    },
    nationality         :
    {
        type        : String,
        lowercase   : true,
        default     : ''
    },
    address_line        :
    {
        type        : String,
        lowercase   : true,
        default     : ''
    },
    street              :
    {
        type        : String,
        lowercase   : true,
        default     : ''
    },
    city                :
    {
        type        : String,
        lowercase   : true,
        default     : ''
    },
    avatar              :
    {
        type        : String,
        lowercase   : true,
        default     : ''
    },
    zip_code            :
    {
        type        : String,
        lowercase   : true,
        default     : ''
    },
    country             :
    {
        type        : String,
        lowercase   : true,
        default     : ''
    },
    has_other_id        :
    {
      type      : Boolean,
      default   : false
    },
    identification_card :
    {
        type    : String
    },
    id_number           :
    {
        type    : String
    },
    id_has_expiry       :
    {
        type    : Boolean,
        default : true
    },
    id_expiry           :
    {
        type    : String,
        default : null
    },
    id_image            :
    {
        type    : String,
    },
    selfie_image        :
    {
        type    : String,
    },
    role                :
    {
        type        : String,
        enum        : ['member', 'admin', 'developer'],
        lowercase   : true
    },
    has_other_security_question:
    {
        type    : Boolean
    },
    security_question   :
    {
        type    : String,
        default : ''
    },
    security_answer     :
    {
        type    : String,
        default : ''
    },
    kyc_status              :
    {
        type        : String,
        enum        : ['not submitted', 'approved', 'rejected', 'submitted'],
        lowercase   : true,
        default     : 'not submitted',
    },
    kyc_remarks             :
    {
        type        : String,
        default     : ''
    },
    is_online           :
    {
        type        : Boolean,
        default     : false
    },
    notification_count  :
    {
        type        : Number,
        min         : 0,
        default     : 0
    },
    total_item_sold     :
    {
        type        : Number,
        min         : 0,
        default     : 0
    },
    total_item_bought   :
    {
        type        : Number,
        min         : 0,
        default     : 0
    },
    total_item_traded   :
    {
        type        : Number,
        min         : 0,
        default     : 0
    },
    total_posts         :
    {
        type        : Number,
        min         : 0,
        default     : 0
    },
    ratings             :
    {
        type        : Object,
        default     : {
            one         : 0,
            two         : 0,
            three       : 0,
            four        : 0,
            five        : 0,
        }
    },
    created_timestamp   :
    {
        type        : Number,
    },
    updated_timestamp   :
    {
        type        : Number,
    },
    contact_code        :
    {
        type        : String,
    },
    contact_number      :
    {
        type        : String
    },
    email               :
    {
        type        : String,
        lowercase   : true,
        unique      : true
    },
    username            :
    {
        type        : String,
        lowercase   : true,
        unique      : true
    },
    password            :
    {
        type        : String,
    },
    total_reviews       :
    {
        type        : Number,
        min         : 0,
        default     : 0
    },
    account_type        :
    {
        type        : String,
        enum        : ['local', 'facebook', 'google']
    },
    wallet              :
    [{ 
        type: Schema.Types.ObjectId,
        ref: 'wallets' 
    }],
    avatar_path:
    {
        type: String,
        default: ""
    },
    total_reports       :
    {
        type        : Number,
        min         : 0,
        default     : 0
    },
    about:
    {
        type: String,
        default: "Hi Baristocrat is waving!"
    },
    cover              :
    {
        type        : String,
        lowercase   : true,
        default     : ''
    },
    cover_photo_path        :
    {
        type        : String,
        default     : ""
    },
    followers           :
    {
        type        : Array,
        default     : []
    },
    following           :
    {
        type        : Array,
        default     : []
    },
    chat_info:
    {
        type:       Array,
        default:    []
    },
    wishlist            :
    {
        type        : Array,
        default     : []
    },

    subscribe_admin_announcement:
    {
        type: Array,
        default: []
    },

    google_authenticator:
    {
        type: Object
    },

    last_active:
    {
        type        : Number,
        default     : 0,
    },

    //---------------------------------------------- added code by toqaf --------------------------------------
    last_transaction_date:
    {
        type: Number,
        default: 0,
    },
    user_status:
    {
        type        : String,
        default     : 'inactive',
        enum        : ['active', 'inactive'],
        lowercase   : true
    },
    age:
    {
        type: Number,
        default: 0,
    },
    //---------------------------------------------- end of added code by toqaf -------------------------------
    //---------------------------------------------- field by vermont -----------------------------------------
    fee:
    {
        type: Schema.Types.ObjectId, 
        ref: 'fees'
    },
    reviewers:
    {
        type: Array,
        default: []
    }
    //---------------------------------------------- end of field by vermont ----------------------------------
},
{
    timestamps          :
    {
        createdAt   : 'created_at',
        updatedAt   : 'updated_at'
    }
});

schema.plugin(passportLocalMongoose);
schema.plugin(findOrCreate);

let User = new MONGOOSE.model("users", schema);
class MDB_USER extends MODEL
{
    constructor ()
    {
        super('users', schema);
    }

    async findByUsernameAndPassword(info)
    {
        const res = await this.collection.findOne({ email: info.email, password: info.password });
        return res ? res : null;
    }
    async findByUsername(username)
    {
        let res = await this.find({username});
        return res;
    }

    async googleLogin()
    {
        passport.use(User.createStrategy());

        // await passport.serializeUser(User.serializeUser());
        // await passport.deserializeUser(User.deserializeUser());


        passport.serializeUser(function(user, done) {
            done(null, user.id);
        });

        passport.deserializeUser(function(id, done) {
            User.findById(id, function(err, user) {
                done(err, user);
            });
        });

        passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:4000/auth/google/baristocrat",
            userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
        },
        function(accessToken, refreshToken, profile, cb) 
        {
            User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
            });
        }));
    }

    async localLogin(data)
    {
        // let User = new MONGOOSE.model("users", schema);
        passport.use(User.createStrategy());

        // await passport.serializeUser(User.serializeUser());
        // await passport.deserializeUser(User.deserializeUser());


        passport.serializeUser(function(user, done) {
            done(null, user.id);
        });

        passport.deserializeUser(function(id, done) {
            User.findById(id, function(err, user) {
                done(err, user);
            });
        });
        let user = new User();

        return this.findByUsername(data.username)
    }

    async register(data)
    {
        // passport.use(User.createStrategy());

        // await passport.serializeUser(User.serializeUser());
        // await passport.deserializeUser(User.deserializeUser());

        // passport.serializeUser(function(user, done) {
        //     done(null, user.id);
        // });

        // passport.deserializeUser(function(id, done) {
        //     User.findById(id, function(err, user) {
        //         done(err, user);
        //     });
        // });

        // hashing password of local registration
        let res = await User.register({username: data.username, gender: data.gender, email: data.email, country: data.country, first_name: 'John Raymund'}, data.password);/* , function(err, user){
            if (err) {
              console.log(err);
            } else {
              passport.authenticate("local")(r.req, r.res, function()
              {
                  console.log('registered')
              })
            }
        }); */
        return res;
    }

    async findByEmail(email)
    {
        let res = await this.collection.findOne({email});
        return res;
    }

    async findByUsername(username)
    {
        let res = await this.collection.findOne({username});
        return res;
    }

    async validatePassword (password, hash_password) {
        return bcrypt.compareSync(password, hash_password);
    }

    async findByUsernameOrEmail (userOrEmail)
    {
        let res = await this.collection.findOne({ $or : [{ 'email' : userOrEmail }, { 'username' : userOrEmail }] });
        return res;
    }

    async findAllClients() // User Masterlist
    {
        const res = await this.collection.find();
        return res ? res : null;
    }

    async updateKyc(data = {})
    {
        const res = await this.collection.findOneAndUpdate({_id: data._id}, data, {new: true, fields: {
            _id: 1,
            kyc_status: 1
        }});
        return res;
    }

    async updateKycStatus(data = {})
    {
        const res = await this.collection.findOneAndUpdate({_id: data._id}, {
            kyc_status: data.kyc_status == 'approve' ? 'approved' : data.kyc_status == 'reject' ? 'rejected' : '',
            kyc_remarks: data.kyc_status == 'approve' ? '' : data.kyc_remarks
        }, {new: true, projected: {_id: 1, kyc_status: 1}});
        return res;
    }

    async fetchUserKyc(_id)
    {
        const res = await this.collection.findOne({_id}, {kyc_status: 1, kyc_remarks: 1});
        return res
    }

    async fetchKyc(kyc_status)
    {
        const res = await this.collection.find({kyc_status}, {
            __v                 : 0,
            salt                : 0,
            hash                : 0,
            wallet              : 0,
            notification_count  : 0,
            version             : 0,
            security_question   : 0,
            security_answer     : 0,
            total_reviews       : 0,
            total_item_traded   : 0,
            total_posts         : 0,
            total_item_bought   : 0,
            total_item_sold     : 0,
            password            : 0,
        });
        return res;
    }

    async findById(info) {
        const res = await this.collection.findById({ _id: info });
        return res ? res : null;
    }

    async updateUser(_id, options = {}) {
        try {
            // const collection = this.collection;

            const res = await this.collection.findByIdAndUpdate({ _id }, options, { new: true });

            return res;
        }
        catch (error) {
            // console.log(error);
            return error;
        }
    }

    async getFollowDataByIds(ids)
    {
        let res = await this.collection.find({ _id : { $in : ids } },
            {
            _id : 1,
            first_name: 1,
            last_name: 1,
            username: 1,
            avatar_path: 1,
            gender: 1,
            followers: 1
        });

        return res;
    }

    async findByEmailAddress(email)
    {
        const res = await this.collection.findOne({ email: email });
        return res ? res.toJSON() : null;
    }
 

    /**
     *
     * @param { String } user_id -> logged in user id
     *
     * @return { Object } of user_info with updated is_online field
     */
    async updateUserOnlineStatus(user_id, status)
    {
        let res = await this.collection.findOneAndUpdate({ _id : user_id }, { is_online : status }, { new : true });

        return res;
    }

    /**
     *
     * @param { String } user_id of user to update
     * @param { Int } last_active can be 0 for active and timestamp of inactive
     *
     * @return { Object } user info of updated user info
     */
    async updateUserOnlineStatus(user_id, last_active, status)
    {
        let res = await this.collection.findOneAndUpdate({ _id : user_id }, { is_online : status, last_active: last_active }, { new : true });

        return res;
    }

    async findWithFee(id)
    {
        let res = await this.collection.findById(id).populate('fee');
        return res;
    }

    async findAllWithWallet()
    {
        const res = await this.collection.find().populate('wallet');
        return res ? res : null;
    }

    async findByUserId(id)
    {
        const res = await this.collection.findById(id).populate('wallet');
        return res ? res : null;
    }

    async fetchClientsByKyc({kyc_status})
    {
        let res;
        if(kyc_status.length == 0)
        {
            res = await this.collection.find({kyc_status: {$in: ['not submitted', 'submitted', 'approved', 'rejected']}});
        }
        else
        {
            res = await this.collection.find({kyc_status: {$in: kyc_status}}, {}, {$order_by: {created_at: 'DESC'}});
        }

        console.log(res);
        return res;
    }
}

module.exports = MDB_USER;
module.exports.User = User;
