require('dotenv');
const express                   = require('express');
const app                       = express();
const cors                      = require('cors');
const fs                        = require('fs');
const path                      = require('path');
const socket                    = require('socket.io');
const http                      = require('http');
// const server                    = http.createServer(app);
const multer                    = require('./middlewares/multer');
const member_only               = require("./middlewares/member_only");
const admin_only                = require("./middlewares/admin_only");
const MONGOOSE                  = require('./config/mongo');
const session                   = require('express-session');
const passport                  = require('./config/passport');
const GoogleStrategy            = require('passport-google-oauth20').Strategy;
const findOrCreate              = require('mongoose-findorcreate');
const User                      = require('./models/MDB_USER').User;
const MDB_USER                  = require('./models/MDB_USER');
const AccountController         = require('./controllers/AccountController');
const ItemController            = require('./controllers/ItemController');
const AdminController           = require('./controllers/AdminController');
const SearchController          = require('./controllers/SearchController');
const WalletController          = require('./controllers/WalletController');
const MemberController          = require('./controllers/MemberController');
const NotificationController    = require('./controllers/NotificationController');
const AnnouncementController    = require('./controllers/AnnouncementController');
const ScheduleController        = require('./controllers/ScheduleController');
const FlashDealController       = require('./controllers/FlashDealController');
// var multer                      = require('multer')
const MessageController = require('./controllers/MessageController');
// const http              = require('http');
const socketID          = require('socket.io');


// -----------------------Socket-----------------------

let server = http.createServer(app);
cors(server);
let io = socketID(server);

io.on('connection', (socket) =>
{
    console.log('server--- A new user just connected ---');
    socket.on('new_message', (data) => {
        console.log('new message', data)
        io.sockets.emit('new_message', {
            message             : data.message,
            sender              :  data.sender,
            receiver            : data.receiver,
            receiver_id         : data.receiver_id,
            stamp               : Date.now(),
            is_group            : data.is_group,
            receiver_username   : data.receiver_username,
        });
    });
    socket.on('new_user', (data) => {
        // console.log(data)
        io.sockets.emit('new_user', {
            user_id      :  data.user_id,
            user_name    :  data.user_name,
            user_status  :  data.user_status
        });
    });

    socket.on('is_typing', (data) => {
        // console.log(data);
        io.sockets.emit('is_typing', {
            is_typing    : data.is_typing,
            chat_id      : data.chat_id,
            sender       : data.sender,
            receiver     : data.receiver
        });
        // io.sockets.emit('receive_typing', {
        //     is_typing    : data.is_typing,
        //     chat_id      : data.chat_id,
        //     sender       : data.sender,
        //     receiver     : data.receiver
        // });
    });

    socket.on('change_chat_room', (data) => {
        // console.log(data);
        io.sockets.emit('change_chat_room', {
            chat_id          : data.chat_id,
            selected_ka_chat : data.selected_ka_chat,
            by_user          : data.by_user
        });
    });

    socket.on('initiate_chat', (data) => {
        // console.log(data);
        io.sockets.emit('initiate_chat', {
            is_active        : data.is_active,
            prod_id          : data.product_id,
        });
    });

    socket.on('initiate_chat_personal', (data) => {
        // console.log(data);
        io.sockets.emit('initiate_chat_personal', {
            is_active        : data.is_active,
            user_id          : data.user_id,
            user_name        : data.username
        });
    });

    socket.on('close_chat_box', (data) => {
        io.sockets.emit('close_chat_box', {
            is_close: data.is_close
        });
    });

    // socket.on('is_online', (data) => {
    //     console.log('is online', data);
    //     io.sockets.emit('is_online', {
    //         status    : data.status,
    //         timestamp : data.timestamp
    //     });
    // });

    socket.on('read_message', (data) => {
        io.sockets.emit('read_message', {
            is_read : data.status == 'success' ? true : false
        });
    });

    socket.on('disconnect', () =>
    {
        console.log('server--- User was disconnected ---');
    });
});
// -----------------------EndOfSocket----------------------------------



app.use(cors({credentials: true, origin: process.env.ADDRESS}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public/product-imgs/')));
app.use('/public', express.static(path.join(__dirname, 'public/avatar/')));
// app.use('/public', express.static(path.join(__dirname, 'public/announcement-imgs/')));
app.use(express.static('public')) // access public folder to browser
// io.on('connect', (socket) => {
//     console.log('connection established!');
//     socket.on('initial', (data) =>
//     {
//         console.log(data)
//     })
// })




app.use('/user/:user_id/:category/:folder', (req, res, next) =>
{
    const user_id   = req.params.user_id;
    const category  = req.params.category;
    const folder    = req.params.folder;

    app.use('/user/:user_id/:category/:folder', express.static(process.env.MEMBER_DIR + '/' + user_id + '/' + category + '/' + folder));
    next();
});

app.use('/categories/main/', express.static(process.env.CATEGORY_DIR + '/'));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const connection_info = {
    DB_USER         :   process.env.DB_USER,
    DB_PASS         :   process.env.DB_PASS,
    DB_HOST         :   process.env.DB_HOST,
    DB_PORT         :   process.env.DB_PORT,
    DB_NAME         :   process.env.DB_NAME,
    DB_AUTH_SOURCE  :   process.env.DB_AUTH_SOURCE
};

app.post('/api/front/login/local', AccountController.localLogin);
// app.post('/api/front/login/google', AccountController.googleLogin);
app.get('/api/front/auth/google',
    passport.authenticate('google', {scope: ['profile', 'email', 'openid']}));
app.get("/api/front/auth/google/baristocrat",
    passport.authenticate('google', { failureRedirect: "/login", successRedirect: '/api/front/isauthenticatedlocal' }));
app.post('/api/front/register',  AccountController.register);
app.post('/api/front/register/confirm',  AccountController.confirmRegistration);
app.post('/api/front/register/resend/otp', AccountController.resendRegistrationOtp);
app.get('/api/front/isauthenticated', AccountController.isAuthenticated);
app.delete('/api/front/register/remove/otp', AccountController.cancelRegistrationOtp);
app.get('/api/front/isauthenticatedlocal', AccountController.isAuthenticatedLocal);
app.get('/api/front/logout', member_only, AccountController.logout);
app.post('/api/front/forgotPassword', AccountController.forgotPassword);
app.post('/api/front/forgotPassword/:key', AccountController.resetUserPassword);
app.get('/api/front/forgotPassword/:key', AccountController.validateLinkKey);
app.post('/api/front/getInfo', AccountController.getInfo);

// client authentication
// post methods
app.post('/api/admin/login', AdminController.adminLogin);
app.post('/api/admin/fetch/clients', AdminController.fetchClientsByKyc);

// get methods
app.get('/api/admin/isauthenticated', AdminController.isAuthenticated);
app.get('/api/admin/logout', AdminController.logout);

app.post('');

//secure routes
app.get(
    '/api/users',
    passport.authenticate('jwt-client', { session : false }),
    AccountController.getUsersData
);

// kyc
app.put('/api/member/kyc/update', multer.kyc_upload, MemberController.updateKyc);
// updates kyc_status
app.put('/api/member/kyc/status/update', MemberController.updateKycStatus)
// fetch user kyc by defined status
app.post('/api/member/kyc/fetch', MemberController.fetchKyc);
app.post('/api/member/kyc/user/fetch', MemberController.fetchUserKyc);

// ------------------------------ Item -------------------------------------
app.post('/api/item/addItem', ItemController.addItem);
app.post('/api/item/upload' , multer.uploadItem, ItemController.upload);
app.post('/api/item/upload/legalities', multer.uploadItemLegalities, ItemController.uploadLegalities);
app.get('/api/item/getItem/:id', ItemController.getItem);
app.post('/api/item/checkSavedItem', ItemController.checkSavedItem);
app.post('/api/item/addToCart', ItemController.addToCart);
app.post('/api/item/barter', member_only, ItemController.barter);
app.post('/api/item/release', member_only, ItemController.releaseAmount);
app.post('/api/item/cancel', member_only, ItemController.cancelBarter);
app.post('/api/item/cancel/notify', member_only, ItemController.notifyCancel);
app.post('/api/item/conversion', ItemController.conversion);
app.post('/api/item/view', ItemController.view);
app.post('/api/item/deleteFromCart', ItemController.removeToCart);
app.post('/api/item/deleteAllFromCart', ItemController.removeAllToCart);
app.post('/api/item/itemStatus', ItemController.itemStatus);
app.post('/api/member/items/fetch', ItemController.fetchFilteredItems);
app.post('/api/item/saved/items', ItemController.fetchSavedItems);
app.post('/api/item/products/history', member_only, ItemController.getProductsHistory);
app.post('/api/item/limit', ItemController.getLimitedItems);
app.post('/api/item/update', ItemController.updateItems);
app.get('/api/cicd', function(req, res)
{
    res.send('Initial deploy of CI/CD');
});
// ---------------------------EndOfItem------------------------------------

/* ---------------------------Category------------------------------------ */
app.post('/api/member/items/categories', MemberController.fetchEnabledCategories);
app.post('/api/item/categories', ItemController.getCategories);
app.post('/api/item/subcategories', ItemController.getSubCategories);
/* ---------------------------End of Category------------------------------ */
app.post('/api/item/sellerIdentity', ItemController.identifySeller);

// --------------------------Item (Admin)----------------------------------
app.post('/api/admin/items/list', ItemController.listItem);
app.post('/api/admin/items/update', ItemController.updateItem);

// ----------------Automatic Checking of Products--------------------------
app.post('/api/checkItemForApproval', ItemController.checkItemForApproval);

// ---------------------------EndOfItem------------------------------------


//------------------------------admin--------------------------------------
//--------------------------Andrea Destajo --------------------------------
app.post('/api/admin/users/add', AdminController.addUserAdmin );
app.post('/api/admin/users/list', AdminController.getAdminUsers);
app.post('/api/admin/users/edit', AdminController.updateAdminUsers);
app.post('/api/admin/users/delete', AdminController.removeAdminUser);

// ---------------------------Roles----------------------------------------
//--------------------------Andrea Destajo --------------------------------
app.post('/api/admin/role/add', AdminController.addNewRole);
app.post('/api/admin/role/get', AdminController.getAdminRoles);
app.post('/api/admin/role/delete', AdminController.removeAdminRole);
app.post('/api/admin/role/access', AdminController.assignAccess);
app.post('/api/admin/role/update',AdminController.updateAdminRole)
app.post('/api/admin/nav/add', AdminController.addNewNav);
app.post('/api/admin/nav/get',  admin_only, AdminController.getAdminNav);
app.post('/api/admin/nav/delete', AdminController.removeAdminNavigation);
app.post('/api/admin/change/password', AdminController.adminChangePassword);
// -------------------------------------------------------------------------

// ------------------------------------ Paul Musa --------------------------
// ACCOUNT CONTROLLER
app.post('/api/account/mdb_user_data', AccountController.frontendMounted); // global mounted - get mdb_user
app.post('/api/account/2fa/enable', AccountController.enable2fa);
app.post('/api/account/2fa/disable', AccountController.disable2fa);

// WALLET CONTROLLER
app.post('/api/wallet/send', member_only, WalletController.send);
app.post('/api/wallet/history', WalletController.history);

// ADMIN CONTROLLER
app.post('/api/baristocrat/token/create', admin_only, AdminController.createBaristocratToken);
app.post('/api/baristocrat/token/details', AdminController.viewBaristocratAdmin);
app.post('/api/admin/user_masterlist', AdminController.userMasterList);
app.post('/api/admin/mother_wallet/history', AdminController.motherWalletHistory);
app.post('/api/admin/mother_wallet/send', admin_only, AdminController.motherWalletSend);
app.post('/api/admin/activity_logs', AdminController.getActivityLogs);
app.post('/api/admin/mdb_admin_user_data', AdminController.adminFrontendMounted); // ADMIN global mounted - get mdb_user
app.post('/api/admin/2fa/enable', AdminController.enable2fa); // admin enable 2fa
app.post('/api/admin/2fa/disable', AdminController.disable2fa); // admin disable 2fa
// --------------------------------------------------------------------------------------

// -------------------------Pergentino S. Galang II-------------------------
//Avatar
app.post('/api/account/avatar/update', AccountController.updateAvatar);
app.post('/api/account/avatar/getbyid', AccountController.showAvatarById);
app.post('/api/account/avatar/getByGender', AccountController.getAvatarByGender);
//User
app.post('/api/account/user/getbyid', AccountController.getInfoUser);
app.post('/api/account/user/all', AccountController.getAllUser);
app.post('/api/account/user/update/about', AccountController.updateAbout)
app.post('/api/account/coverphoto/update', AccountController.updateCoverPhoto);
app.get('/api/account/getUser/:id', AccountController.getUser);
app.get('/api/account/getFollowers/:id', AccountController.getFollowersDataSpecificUser);
app.post('/api/account/put/change/password', AccountController.putChangePassword);
//rate
app.post('/api/account/user/rate', AccountController.rateUser) //need to be dynamic
//reviews
app.post('/api/account/user/review', AccountController.reviewUser); //need to be dynamic
app.post('/api/account/user/review/byId', AccountController.getReviewUser); //profile reviews
//rate and review
app.post('/api/account/user/rate_review', multer.uploadReviews.array('review_path', 3), AccountController.validateRateAndReview);
app.post('/api/account/user/rateAndreview/users', AccountController.getRateAndReviewUser); //profile reviews
app.post('/api/account/review/create', multer.uploadReviews.array('review_path', 3), AdminController.create_review );
//report user
app.post('/api/account/user/report', multer.uploadReport.single('report_path'), AccountController.reportUser);
// Admin
app.post('/api/admin/avatar/create', multer.uploadAvatar.single('avatar_image_path'), AdminController.create_avatar);
app.post('/api/admin/avatar/find', AdminController.getAllAvatar)
app.post('/api/admin/review/get', AdminController.getAllReviews);
app.post('/api/admin/coverphoto/create', multer.uploadCoverPhoto.single('cover_photo_path'), AdminController.create_cover_photo );
app.post('/api/admin/coverphoto/findAll', AdminController.getAllCoverPhoto);
app.post('/api/admin/reportUsers/findAll', AdminController.getAllReports);
app.post('/api/admin/rateAndReview/users', AdminController.getAllRateAndReview);
//------------------------End of Pergentino S. Galang II------------------------------------

app.get('/api/admin/productManagement', AdminController.getGroupOfItemsByStatus);
app.post('/api/admin/updateProductStatus/:product_id', AdminController.updateProductStatusById);
// ------------------End of Admin Product Management----------------------------------------

var multer1 = require('multer');
app.use(express.static('public')); // access public folder to browser

//---------------------------------------------- added code by toqaf --------------------------------------
// admin category
app.post('/api/admin/category/create', multer.uploadCategories.single('categories_image_path'), AdminController.createCategory);
app.post('/api/admin/category/read', AdminController.getAllCategory);
// admin subcategory
app.post('/api/admin/subcategory/create', multer.uploadCategories.single('subcategories_image_path'), AdminController.createSubcategory);
app.post('/api/admin/subcategory/read', AdminController.getAllSubcategory);
// admin subcategory
app.post('/api/admin/subcategory2/create', multer.uploadCategories.single('subcategories2_image_path'), AdminController.createSubcategory2);
app.post('/api/admin/subcategory2/read', AdminController.getAllSubcategory2);
// admin update category
app.post('/api/admin/category/update', multer.uploadCategories.single('categories_image_path'), AdminController.updateCategory);
// admin update subcategory
app.post('/api/admin/subcategory/update', multer.uploadCategories.single('subcategories_image_path'), AdminController.updateSubcategory);
// admin update subcategory2
app.post('/api/admin/subcategory2/update', multer.uploadCategories.single('subcategories2_image_path'), AdminController.updateSubcategory2);
//---------------------------------------------- end of added code by toqaf -------------------------------

// --------------------------Follow ------------------------------------
app.get('/api/front/getFollowData', member_only, AccountController.getFollowersData);
app.post('/api/front/following/update', member_only, AccountController.addFollowing);
// --------------------------End of Follow ------------------------------------

//---------------------------------------------- added code by toqaf --------------------------------------
// this is for testing
app.get('/test/register', AdminController.addDummyUser);
app.get('/api/admin/users', AdminController.getAllUser);
app.get('/test/add_product', AdminController.addProduct);
app.get('/test/products', AdminController.getAllProduct);
app.get('/test/barter', AdminController.barter);
app.get('/test/released', AdminController.barterReleased);
app.get('/test/cancelled', AdminController.barterCancelled);
app.get('/api/admin/total_escrow', AdminController.totalEscrow);
app.get('/api/admin/total_release', AdminController.totalRelease);
app.get('/api/admin/total_cancel', AdminController.totalCancelled);
app.get('/api/admin/over_all_total', AdminController.overAllTotal);
//---------------------------------------------- end of added code by toqaf -------------------------------


// --------------------------Wishlist ------------------------------------
app.get('/api/front/wishlist', member_only, AccountController.getWishlist);
app.get('/api/front/wishlist/match', member_only, AccountController.getWishlistMatch);
app.post('/api/front/wishlist/update', member_only, AccountController.updateWishlist);
// --------------------------End of Wishlist ------------------------------------

// ------------------------------ Notification ---------------------------
app.post('/api/user/notification/get', member_only, NotificationController.getNotifications);
app.post('/api/user/delete/notification', member_only, NotificationController.deleteNotification);
app.post('/api/user/open/notification',member_only, NotificationController.openNotif);
app.post('/api/admin/create/reminder', NotificationController.createNotification);
// ------------------------- End of Notification -------------------------

// ------------------------------- item react ----------------------------
// app.post('/api/member/item/fetch/react', MemberController.fetchUserItemReact);
app.post('/api/member/react/post', MemberController.react);
app.post('/api/member/fetch/user/react', MemberController.fetchUserReact);

// ----------------------------- end of item react -----------------------

// --------------------------Garage Sale ---------------------------------
app.get('/api/front/items/garageSale', ItemController.getGarageSaleItems);
// --------------------------End of Garage Sale --------------------------

// --------------------------------- newsfeed ----------------------------
app.post('/api/member/newsfeed/fetch/items', MemberController.fetchPostedItem);
app.post('/api/member/newsfeed/details', MemberController.fetchNewsfeed);

// --------------------------Announcement---------------------------------
// --------------------------Admin----------------------------------------
app.get('/api/admin/announcements', admin_only, AnnouncementController.getAnnouncements);
app.post('/api/admin/announcement/create', admin_only, multer.uploadAnnouncement.single('announcement_image_path'), AnnouncementController.createAnnouncement);
app.post('/api/admin/announcement/update/status/:announcement_id', admin_only, AnnouncementController.updateAnnouncementStatusById);
app.post('/api/admin/announcement/delete/:announcement_id', admin_only, AnnouncementController.removeAnnouncementById);
app.post('/api/admin/announcement/update/:announcement_id', admin_only, multer.uploadAnnouncement.single('announcement_image_path'), AnnouncementController.updateAnnouncement);
// --------------------------Client---------------------------------------
app.get('/api/front/announcements/image', AnnouncementController.getActiveAnnouncementsImage);
app.get('/api/front/announcement/image/:announcement_id', AnnouncementController.getAnnouncementImageById);
app.get('/api/front/announcement/seller/items/:announcement_id', member_only, AnnouncementController.getAvailableItemsBySellerId);
app.get('/api/front/announcement/:announcement_id', AnnouncementController.getItemsByAnnouncementId)
app.post('/api/front/announcement/add/:announcement_id', member_only, AnnouncementController.addItemToAnnouncement);
// --------------------------End of Announcement--------------------------

// --------------------------Suggested Products---------------------------
app.get('/api/front/suggestedProducts', ItemController.getSuggestedProducts);
// --------------------------End Suggested Products-----------------------

//---------------------------- Announcement ------------------------------
app.post('/api/admin/upload/announcement', multer.uploadAnnouncementImage.array('image', 3), AdminController.postNewsfeedAnnouncement);
app.post('/api/admin/get/announcement', AdminController.getNewsfeedAnnouncement);
app.post('/api/admin/update/announcement', multer.uploadAnnouncementImage.array('image', 3), AdminController.updateAdminAnnouncement);
app.post('/api/admin/get/publish', AdminController.getPublishAnnouncement);
app.post('/api/admin/remove/announcement', AdminController.removeAnnouncement);
// ------------------------- End of Announcement--------------------------

app.post('/api/member/share/post/global', MemberController.sharePostGlobal);
app.post('/api/member/fetch/original/post', MemberController.fetchOriginalPost);

// --------------------------Related Products------------------------------------
app.get('/api/front/relatedProducts/:item_id/:skip', ItemController.getRelatedProducts);
app.get('/api/front/relatedProductsNoLimit/:item_id', ItemController.getRelatedProductsNoLimit);
// --------------------------End of Related Products-----------------------------

// --------------------------Change User Last Activity---------------------------
app.post('/api/front/user/update/status', member_only, AccountController.updateUserOnlineStatus);
app.get('/api/front/message/friends/status', member_only, AccountController.getUserMessageFriendsOnlineStatus);
// --------------------------End of Change User Last Activity--------------------

// --------------------------Featured Products------------------------------------
app.get('/api/front/featuredProducts', ItemController.getFeaturedProducts);
app.get('/api/front/featuredProducts/slots', ItemController.getFeaturedProductSlots);
app.get('/api/front/featuredProducts/check/:item_id', ItemController.checkFeaturedProductItem);
app.get('/api/front/featuredProducts/total', ItemController.getTotalFeaturedProducts);
// --------------------------End of Featured Products-----------------------------

// -------------------------- Set Schedule Cancel ------------------------------
// app.post('/api/schedule/cancel/set', member_only, ScheduleController.setCancelSchedule);
app.post('/api/schedule/flashDeal/set', ScheduleController.setFlashDealSchedule); //admin_only
app.get('/api/schedule/flashDeal/get', ScheduleController.getFlashDealSchedule);
// ----------------------- End of Set Schedule Cancel --------------------------
// const MDB_ITEMS = require('./models/MDB_ITEMS'); let mdb_item = new MDB_ITEMS(); mdb_item.deleteLahat();

app.post('/api/member/comments/fetch', MemberController.fetchPostComments);

// --------------------------Flash Deal-------------------------------------------
app.get('/api/front/flashDeal/homepage', FlashDealController.getHomepageFlashDeals);
app.get('/api/front/flashDeal', FlashDealController.getFlashDeals);
app.get('/api/front/flashDeal/seller/items', member_only, FlashDealController.getActiveItemsToAdd);
app.get('/api/front/flashDeal/seller/items/garageSale/:item_id', member_only, FlashDealController.isGarageSaleItem);
app.post('/api/front/flashDeal/add', member_only, FlashDealController.addToFlashDeal);
// --------------------------End of Flash Deal------------------------------------

// -------------------------- Search ------------------------------------
app.get('/api/search', SearchController.getSearchData);
app.get('/api/search/autocomplete', SearchController.getSearchAutoComplete);
app.get('/api/search/trending', SearchController.getTrendingSearches);
app.post('/api/search/add', SearchController.addToSearches);
// -------------------------- End of Search ------------------------------------

// ---------------------------Message------------------------------------
app.post('/api/member/users/message', multer.uploadChatFile, MessageController.sendMessage);
app.post('/api/member/users/get/message', member_only, MessageController.getMessage);
app.post('/api/member/users/get/users', member_only, MessageController.postGetUsers);
app.post('/api/member/users/get/details', member_only, MessageController.getChatDetails);
app.post('/api/member/users/get/chatmates/status', MessageController.getChatMatesStatus);
app.post('/api/admin/add/emoji', MessageController.addEmoji);
app.get('/api/member/users/get/emoji_list', member_only, MessageController.getEmojiList);
app.post('/api/member/user/update/emoji', member_only, MessageController.updateChatEmoji);
app.post('/api/member/user/add/group_chat', member_only, MessageController.addGroupChat);
app.post('/api/member/user/get/user', member_only, MessageController.getChatDetailsPersonal);
app.post('/api/member/user/deleteMessage', member_only, MessageController.deleteMessage);
app.get('/api/member/user/get/messages', member_only, MessageController.getMessages);
app.post('/api/member/user/update/message/read', member_only, MessageController.updateReadMessage);
// -------------------------EndOfMessage---------------------------------

// -------------------------- BlockChain Notification ------------------------------------
// app.post('/api/eth/blockchain/notification', NotificationController.getEthBlockchainNotif);
// app.post('/api/crypto/notify_frontend', WalletController.notifyFrontend);
// app.post('/api/crypto/notify_motherwallet', WalletController.notifyMotherwallet);

//-------------------- Profile Product ----------------------------
app.post('/api/profile/products', member_only, ItemController.getUserProducts);
//--------------------End of Profile Product ----------------------

//-------------------- Conversion Rate ----------------------------
app.post('/api/conversion/rates', WalletController.getConversionRates);
//--------------------End of Conversion Rate ----------------------

server.listen({port: 4000}, (err) => {
    if(err) {
        console.log(err);
        process.exit(1);
    }else {
        WalletController.socketServer(io);
        console.log('Server is up and running on port 4000...');
    }
});

module.exports.io = io;


































