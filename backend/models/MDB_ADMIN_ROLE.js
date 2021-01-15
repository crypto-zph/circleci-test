const MONGOOSE      = require('../config/mongo');       
const MODEL         = require('./MODEL');
const Schema        = MONGOOSE.Schema;

const schema         = new Schema({
    Access_level:	
    {	
        type: String	
    },
    
    Role_str:
    {
        type: String
    },

    Access_str:
    {
        type : String,
    },

    Description_str:
    {
        type: String
    },
    IsRole:
    {
        type      : Boolean,
        default   : false,  
    },

    Nav_type:{
        type: String
    },
    name:
    {
        type: String
    },
    route:
    {
        type: String
    },
    icon:
    {
        type: String
    }
});

class MDB_ADMIN_ROLE extends MODEL {
    constructor () 
    {
        super('admin_role', schema);
    }

    async findRole() {
        const res = await this.collection.find({ IsRole: true});
        return res ? res : null;
    }

    async delRole(roleID) {
        const res = await this.collection.findOneAndDelete({ _id: roleID });
        return res ? res : null;
    }

    async findByIdAndUpdate(doc, updates) {
        const res = await this.collection.findOneAndUpdate(doc, updates, { new: true })
        return res ? res : null;
    }

    async findByRole(role) {
        const res = await this.collection.findOne({ Role_str: role });
        return res ? res.toJSON() : null;
    }

    async findByNavigation(nav) {
        const res = await this.collection.findOne({ name: nav });
        return res ? res : null;
    }
    async findNav() {
        const res = await this.collection.find({Nav_type:'Admin Navigation'});
        return res ? res : null;
    }

    async findByRoleId(id){
        const res = await this.collection.find({ _id: id });
        return res ? res.toJSON() : null;       
    }

}

module.exports = MDB_ADMIN_ROLE;
