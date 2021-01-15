// const MONGOOSE = require('../config/mongo');
// const MODEL = require('./MODEL');
// const Schema = MONGOOSE.Schema;


// const schema = new Schema(
// {
//     category_name:
//     {
//         type        : String
//     },
//     sub_category:
//     {
//         type        : String
//     },
//     category_image_path:
//     {
//         type        : String,
//     },
//     date_created:
//     {
//         type        : Number,
//         default     : Date.now()
//     },
//     status:
//     {
//         type        : String,
//         enum        : ['enabled', 'disabled']
//     },

//     date_updated   :
//     {
//         type        : Number,
//         default     : Date.now()
//     },
// },
// {
//     timestamps          :
//     {
//         createdAt   : 'created_at',
//         updatedAt   : 'updated_at'
//     }
// });

// class MDB_CATEGORY extends MODEL 
// {
//     constructor() 
//     {
//         super('categories', schema);
//     }

//     async fetchEnabledCategories()
//     {
//         const categories = await this.collection.find({status: 'enabled'}, 
//         {
//             _id                 : 1,
//             category_name       : 1,
//             category_image_path : 1,
//             subcategory         : 1,
//             subcategory2        : 1,
//         });
//         return categories;
//     }
// }

// module.exports = MDB_CATEGORY;
