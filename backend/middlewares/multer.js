const multer        = require('multer');
const {v1: uuidv1}  = require('uuid');
const fs            = require('fs');

const storage =
{
    kyc: multer.diskStorage({
        destination: function(req, file, next)
        {
            const user_id   = req.session.user_info._id;
            const path = {
                id_image    : 'id/',
                selfie_image: 'selfie/'
            };

            next(null, process.env.MEMBER_DIR + '/' + user_id + '/images/' +  path[file.fieldname]);
        },
        filename: function(req, file, next)
        {
            let ext_str             = "";
            const mime_types_obj    = {
              "image/jpg"   : "jpg",
              "image/jpeg"  : "jpeg",
              "image/png"   : "png",
            };

            if(mime_types_obj.hasOwnProperty(file.mimetype))
            {
                ext_str = mime_types_obj[file.mimetype];
            }
            // changes the name of file uploaded
            file.fieldname = uuidv1();
            next(null, file.fieldname + "." + ext_str)
        }
    }),
    storageAvatar: multer.diskStorage({
        filename: async function (req, file, next) {
            let ext = "";
            const mime_types = {
                "image/jpg": "jpg",
                "image/jpeg": "jpeg"
            };

            if (mime_types.hasOwnProperty(file.mimetype)) {
                // rename the file to guid + timestamp

                // converting blob file into image
                ext = mime_types[file.mimetype];
            }

            next(null, new Date().getTime() + "." + ext);
        },
        destination: async function (req, file, next) {
            // console.log(req.body.gender)
            let folder = "";
            const image_path = {
                avatar_image_path: "avatar",
            };

            if (image_path.hasOwnProperty(file.fieldname)) {
                // rename the file to guid + timestamp

                // converting blob file into image
                folder = image_path[file.fieldname];
            }

            next(
                null,
                `public/avatar/${req.body.gender}`
            );
        },
    }),

    storageCoverPhoto: multer.diskStorage({
        filename: async function (req, file, next) {
            let ext = "";
            const mime_types = {
                "image/jpg": "jpg",
                "image/jpeg": "jpeg"
            };

            if (mime_types.hasOwnProperty(file.mimetype)) {
                // rename the file to guid + timestamp

                // converting blob file into image
                ext = mime_types[file.mimetype];
            }

            next(null, new Date().getTime() + "." + ext);
        },
        destination: async function (req, file, next) {
            // console.log(req.body.gender)
            let folder = "";
            const image_path = {
                cover_photo_path: "cover-photo",
            };

            if (image_path.hasOwnProperty(file.fieldname)) {
                // rename the file to guid + timestamp

                // converting blob file into image
                folder = image_path[file.fieldname];
            }

            next(
                null,
                `public/cover-photo`
            );
        },
    }),

    // review: multer.diskStorage({
    //     destination: async function(req, file, next)
    //     {
    //         console.log(file)
    //         const user_id   = '5f8fdfa15e445716ac0355e5'; // user id

    //         next(null, process.env.REVIEW_DIR + user_id );
    //     },
    //     filename: (req, file, cb) =>
    //     {
    //         cb(null, Date.now() + '-' + file.originalname);
    //     }
    // }),

    review: multer.diskStorage({
        filename: async function (req, file, next) {
            let ext = "";
            const mime_types = {
                "image/jpg": "jpg",
                "image/jpeg": "jpeg"
            };

            if (mime_types.hasOwnProperty(file.mimetype)) {
                // rename the file to guid + timestamp

                // converting blob file into image
                ext = mime_types[file.mimetype];
            }

            next(null, Date.now() + '-' + file.originalname);
        },
        destination: async function (req, file, next) {
            const user_id   = req.body.reviewer_id; // user id
            console.log(req.body.reviewer_id, "yochanan")
            console.log(req.body.user_id, "pergeant")

            next(
                null, process.env.REVIEW_DIR + user_id
            );
        },
    }),


    storageCategories: multer.diskStorage({
        filename: async function (req, file, next) {
            let ext = "";
            const mime_types = {
                "image/jpg": "jpg",
                "image/jpeg": "jpeg",
                "image/png": "png"
            };
            if (mime_types.hasOwnProperty(file.mimetype)) {
                // rename the file to guid + timestamp

                // converting blob file into image
                ext = mime_types[file.mimetype];
            }

            next(null, new Date().getTime() + "." + ext);
        },
        destination: async function (req, file, next) {
            let folder = "";
            const image_path = {
                categories_image_path: "product-categories",
            };

            if (image_path.hasOwnProperty(file.fieldname)) {
                // rename the file to guid + timestamp

                // converting blob file into image
                folder = image_path[file.fieldname];
            }

            next(
                null,
                `public/product-categories/${req.body.path}`
            );
        },
    }),

    storageAnnouncement: multer.diskStorage({
        filename: async function (req, file, next)
        {
            let ext = "";

            const mime_types =
            {
                "image/jpg": "jpg",
                "image/jpeg": "jpeg",
                "image/png": "png"
            };

            if (mime_types.hasOwnProperty(file.mimetype)) {
                // rename the file to guid + timestamp

                // converting blob file into image
                ext = mime_types[file.mimetype];
            }

            next(null, new Date().getTime() + "." + ext);
        },
        destination: async function (req, file, next)
        {
            let folder = "";
            const image_path = {
                cover_photo_path: "announcement",
            };

            let path = `${process.cwd()}/public/announcement`;

            // check if directory exists
            if (!fs.existsSync(path)) {
                // create directory if not
                fs.mkdirSync(path);
            }

            if (image_path.hasOwnProperty(file.fieldname)) {
                // rename the file to guid + timestamp

                // converting blob file into image
                folder = image_path[file.fieldname];
            }

            next(
                null,
                `public/announcement`
            );
        }
    }),

    announcement: multer.diskStorage({
        filename: async function (req, file, next) {
            let ext = "";
            const mime_types = {
                "image/jpg": "jpg",
                "image/jpeg": "jpeg"
            };

            if (mime_types.hasOwnProperty(file.mimetype)) {

                ext = mime_types[file.mimetype];
            }

            next(null, Date.now() + '-' + file.originalname);
        },
        destination: async function (req, file, next) {

            next(
                null, process.env.ANNOUNCE_DIR
            );
        },
    }),

    storageReportUser: multer.diskStorage({
        filename: async function (req, file, next) {
            let ext = "";
            const mime_types = {
                "image/jpg": "jpg",
                "image/jpeg": "jpeg"
            };

            if (mime_types.hasOwnProperty(file.mimetype)) {
                // rename the file to guid + timestamp

                // converting blob file into image
                ext = mime_types[file.mimetype];
            }

            next(null, new Date().getTime() + "." + ext);
        },
        destination: async function (req, file, next) {
            let folder = "";
            const image_path = {
                report_path: "report",
            };

            if (image_path.hasOwnProperty(file.fieldname)) {
                // rename the file to guid + timestamp

                // converting blob file into image
                folder = image_path[file.fieldname];
            }

            next(
                null,
                `public/report`
            );
        },
    }),

    chat_upload: multer.diskStorage({
        filename: async function(req, file, next)
        {
            // console.log('gumana ka na');
            // console.log('file', file);
            // console.log('file.originalname',file.originalname);
            // return;
            let ext_str             = "";
            const mime_types_obj    = {
              "image/jpg"                                                               : "jpg",
              "image/jpeg"                                                              : "jpeg",
              "image/png"                                                               : "png",
              "application/pdf"                                                         : "pdf",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document" : "docx"
            };

            if(mime_types_obj.hasOwnProperty(file.mimetype))
            {
                ext_str = mime_types_obj[file.mimetype];
            }

            if(req.body.message_type == 'images')
            {
                // changes the name of file uploaded
                file.fieldname = uuidv1();
                next(null, file.fieldname + "." + ext_str)
            }
            else if(req.body.message_type == 'documents')
            {
                next(null, file.originalname)
            }
        },

        destination: function(req, file, next)
        {
            const user_id   = '5f90343d21e259119cb22fcc';
            const path = {
                image    : 'images/',
                document : 'documents/'
            };

            // next(null, process.env.MEMBER_DIR + '/' + user_id + '/chat_files/' +  path[file.fieldname]);
            next(null, process.env.MEMBER_DIR + '/' + user_id + '/5fbb864c334b554c8cc19f51/chat_files/' +  req.body.message_type);
        }
    }),

    storageLegalities: multer.diskStorage({
        filename: async function (req, file, next) {
            let ext = "";
            const mime_types = {
                "image/jpg"                                                               : "jpg",
                "image/jpeg"                                                              : "jpeg",
                "image/png"                                                               : "png",
                "application/pdf"                                                         : "pdf",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document" : "docx"
            };

            if (mime_types.hasOwnProperty(file.mimetype)) {
                // rename the file to guid + timestamp

                // converting blob file into image
                ext = mime_types[file.mimetype];
            }

            next(null, new Date().getTime() + "." + ext);
        },
        destination: async function (req, file, next) {
            let folder = "";
            const path = {
                legalities: "legalities/",
            };

            if (path.hasOwnProperty(file.fieldname)) {
                // rename the file to guid + timestamp

                // converting blob file into image
                folder = path[file.fieldname];
            }

            next(
                null,
                `public/legalities`
            );
        },
    }),

// ------------------------------------  Item Image uploading------------------------------------
    fileFilter: multer.diskStorage({
        destination: async function (req, file, next) {
            const user_id   = req.session.user_info._id;
            const path = {
                transactions_image    : 'transactions/',
            };

            next(null, process.env.MEMBER_DIR + '/' + user_id + '/images/' +  path[file.fieldname]);
        },
        filename: async function (req, file, next) {
            let ext_str             = "";
            const mime_types_obj    = {
              "image/jpg"   : "jpg",
              "image/jpeg"  : "jpeg",
              "image/png"   : "png",
            };

            if(mime_types_obj.hasOwnProperty(file.mimetype))
            {
                ext_str = mime_types_obj[file.mimetype];
            }
            // changes the name of file uploaded
            file.fieldname = uuidv1();
            next(null, file.fieldname + "." + ext_str)
        }
    })
    
// ------------------------------------  End of Item Image uploading------------------------------------
}

// ------------------------------------  End of File uploading reviews------------------------------------



module.exports.kyc_upload = multer({storage: storage.kyc}).fields([
    {name: 'id_image', maxCount: 1},
    {name: 'selfie_image', maxCount: 1}
]);

module.exports.uploadAvatar     = multer({storage: storage.storageAvatar});
module.exports.uploadCoverPhoto = multer({storage: storage.storageCoverPhoto});
module.exports.uploadReviews    = multer({storage: storage.review});
module.exports.uploadItem       = multer({ fileFilter: storage.fileFilter }).fields([
    {name: 'image', maxCount: 5},
]);
module.exports.uploadItemLegalities = multer({storage: storage.storageLegalities}).array('legalities', 10);
module.exports.uploadCategories = multer({storage: storage.storageCategories });
module.exports.uploadAnnouncement = multer({ storage : storage.storageAnnouncement });
module.exports.uploadAnnouncementImage = multer({storage: storage.announcement});
module.exports.uploadReport    = multer({storage: storage.storageReportUser});
module.exports.uploadChatFile = multer({ storage: storage.chat_upload }).array('file', 5);
