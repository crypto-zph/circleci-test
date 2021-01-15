//front
exports.postLocalLogin 	            = 'front/login/local';
exports.getGoogleLogin              = 'front/auth/google';
exports.postRegisterUser            = 'front/register';
exports.postConfirmRegistration     = 'front/register/confirm';
exports.deleteCancelRegOtp          = 'front/register/remove/otp';
exports.postResendRegistrationOtp   = 'front/register/resend/otp';
exports.postForgotPassword          = 'front/forgotPassword';
exports.postResetPassword           = 'front/forgotPassword';
exports.getValidateLinkKey          = 'front/forgotPassword';
exports.isUserAuthenticated         = 'front/isauthenticatedlocal';
exports.postFollowUnfollowUser      = 'front/following/update';
exports.getFollowData               = 'front/getFollowData';
exports.postCreateUpdateWishlist    = 'front/wishlist/update';
exports.getWishlistData             = 'front/wishlist';
exports.getWishlistMatch            = 'front/wishlist/match';
exports.getInfo           			    = 'front/getInfo';

//item
exports.postItem                    = 'item/addItem';
exports.getConversion               = 'item/conversion';
exports.postUpload                  = 'item/upload';
exports.postUploadLegalities        = 'item/upload/legalities'
exports.getItem                     = 'item/getItem';
exports.postAddToCart               = 'item/addToCart';
exports.postBarter                  = 'item/barter';
exports.postReleaseAmount           = 'item/release';
exports.postCancelBarter           	= 'item/cancel';
exports.postNotifyCancel 			= 'item/cancel/notify';
exports.getCheckSavedItems          = 'item/checkSavedItem';
exports.postView                    = 'item/view';
exports.deleteFromCart              = 'item/deleteFromCart';
exports.deleteAllFromCart           = 'item/deleteAllFromCart';
exports.getItemByStatus		          = 'item/itemStatus';
exports.postFetchEnabledCategories  = 'member/items/categories';
exports.postFetchFilteredItems      = 'member/items/fetch';
exports.getSellerIdentification     = 'item/sellerIdentity';
exports.getCategories               = 'item/categories';
exports.getSubCategories            = 'item/subcategories';
exports.getSavedItems               = 'item/saved/items';
exports.postListItems           	  = 'admin/items/list';
exports.postUpdateItemStatus    	  = 'admin/items/update';
exports.getGarageSaleItems      	  = 'front/items/garageSale';
exports.getProductsHistory      	  = 'item/products/history';
exports.getLimitedItems             = 'item/limit';
exports.postUpdateItem              = 'item/update';

//admin
exports.postAdminLogin          = 'admin/login';
exports.getAdminUsers           = 'admin/users/list';
exports.addUserAdmin            = 'admin/users/add';
exports.updateAdminUsers        = 'admin/users/edit';
exports.removeAdminUser         = 'admin/users/delete';
exports.isAdminUserAuthenticated    = 'admin/isauthenticated';
//admin role
exports.addNewRole              = 'admin/role/add';
exports.getAdminRoles           = 'admin/role/get';
exports.removeAdminRole         = 'admin/role/delete';
exports.assignAccess            = 'admin/role/access';
exports.updateAdminRole         = 'admin/role/update';
exports.addNewNav               = 'admin/nav/add';
exports.getAdminNav             = 'admin/nav/get';
exports.removeAdminNavigation   = 'admin/nav/delete';
exports.updateAdminRole         = 'admin/role/update';
exports.adminChangePassword     = 'admin/change/password';
exports.postUserMasterlist      = 'admin/user_masterlist';

// account
exports.postMainMounted         = 'account/mdb_user_data';

// baristocrat token
exports.postBRTdetails          = 'baristocrat/token/details';

// wallet
exports.postWalletSend          = 'wallet/send';
exports.postWalletHistory       = 'wallet/history';

//member
exports.postUpdateProfile       = 'member/update_profile';

//search
exports.getSearchData           = 'search';
exports.getSearchAutoComplete   = 'search/autocomplete';
exports.getTrendingSearches     = 'search/trending';
exports.postSearch              = 'search/add';
// kyc
exports.putUpdateKyc            = 'member/kyc/update';
exports.postFetchKycByStatus    = 'member/kyc/fetch';
exports.putUpdateKycStatus      = 'member/kyc/status/update';
exports.postfetchUserKyc        = 'member/kyc/user/fetch'

//--------------------------------Added code by Toqaf---------------------------------
// admin
exports.postAddCategory = 'admin/category/create';
exports.postGetCategory = 'admin/category/read';
exports.postAddSubcategory = 'admin/subcategory/create';
exports.postGetSubcategory = 'admin/subcategory/read';
exports.postAddSubcategory2 = 'admin/subcategory2/create';
exports.postGetSubcategory2 = 'admin/subcategory2/read';
exports.postUpdateCategory = 'admin/category/update';
exports.postUpdateSubcategory = 'admin/subcategory/update';
exports.postUpdateSubcategory2 = 'admin/subcategory2/update';
//--------------------------------End of Added code by Toqaf--------------------------


//--------------------------------Pergent---------------------------
//accounts
exports.getAvatarById           = 'account/avatar/getbyid';
exports.getAvatarByGender       = 'account/avatar/getByGender';
exports.putAvatar               = 'account/avatar/update';
//user
exports.getUserInfo             = 'account/user/getbyid';
exports.postGetAllUser          = 'account/user/all';
exports.putUserAbout            = 'account/user/update/about'
exports.putUserCoverPhoto       = 'account/coverphoto/update'
exports.getFollowById           = 'account/getFollowers'
//admin
exports.postListUsers           = 'admin/users/list'
exports.postAddUser             = 'admin/users/add'
exports.postAddEdit             = 'admin/users/edit'
exports.postAddAvatar           = 'admin/avatar/create'
exports.getAvatar               = 'admin/avatar/find'
exports.getReviews              = 'admin/review/get'
exports.postAddCoverPhoto       = 'admin/coverphoto/create'
exports.getCoverPhoto           = 'admin/coverphoto/findAll'
exports.getAllReportUser        = 'admin/reportUsers/findAll'
exports.getRateReviewUsers      = 'admin/rateAndReview/users'
//rate
exports.postRate                = 'account/user/rate'
//review
exports.postrReviewUser         = 'account/user/review'
exports.getReviewById           = 'account/user/review/byId'
exports.getRateAndReviewByUserId = 'account/user/rateAndreview/users'
exports.postFetchUserItemReact   = 'member/item/fetch/react';
exports.postReact           = 'member/newsfeed/react';
exports.fetchNewsFeedDetails    = 'member/newsfeed/details';
//rate and review
exports.postRateReviewUser      = 'account/user/rate_review'
//report user
exports.postReportUser          = 'account/user/report'
//user details
exports.getUserDetails          = 'account/getUser';
exports.putUserPassword          = 'account/put/change/password'
//--------------------------------Pergent----------------------------------

//----------------------------Admin Product Management---------------------
exports.getGroupOfItemsByStatus = 'admin/productManagement';
exports.updateProductStatusById = 'admin/updateProductStatus';
//---------------------End of Admin Product Management---------------------

//--------------------------------Added code by Toqaf---------------------------------
exports.getTotalEscrow = '/admin/total_escrow';
exports.getTotalRelease = '/admin/total_release';
exports.getTotalCancel = 'admin/total_cancel';
exports.getOverAllTotal = 'admin/over_all_total';
exports.getUsersTotal = '/admin/users';
//--------------------------------End of Added code by Toqaf--------------------------

// --------------------------------newsfeed---------------------
exports.postFetchPostedItems = 'member/newsfeed/fetch/items';
// --------------------------------end of newsfeed---------------------

//--------------------------------socket connection---------------------
exports.wsAddPostComment   = 'wsAddPostComment';
//------------------------ notification client ----------------------------
//---------------------- Andrea Destajo -----------------------------------
exports.getNotifications   = 'user/notification/get';
exports.deleteNotification = 'user/delete/notification';
exports.openNotif          = 'user/open/notification';

//Message
exports.postSendMessage             = 'member/users/message';
exports.getMessage                  = 'member/users/get/message';
exports.postGetUsers                = 'member/users/get/users';
exports.postNewChatDetails          = 'member/users/get/details';
exports.getChatMatesStatus          = 'member/users/get/chatmates/status';
exports.getEmojiList                = 'member/users/get/emoji_list';
exports.updateChatEmoji             = 'member/user/update/emoji';
exports.postAddGroupChat            = 'member/user/add/group_chat';
exports.postNewChatDetailsPersonal  = 'member/user/get/user';
exports.getUserMessages             = 'member/user/get/messages';
exports.readMessage                 = 'member/user/update/message/read';

exports.createNotification = 'admin/create/reminder';

//---------------------- Mother Wallet - Paul Musa ---------------------
exports.postMotherWalletHistory  = 'admin/mother_wallet/history';
exports.postMotherWalletSend     = 'admin/mother_wallet/send';
//----------------------------------------------------------------------

//--------------------Announcement -------------------
//--------------------ADMIN -------------------
exports.postAnnouncement                = 'admin/announcement/create';
exports.postUpdateAnnouncement          = 'admin/announcement/update';
exports.postUpdateAnnouncementStatus    = 'admin/announcement/update/status';
exports.postRemoveAnnouncement          = 'admin/announcement/delete';
exports.getAnnouncements                = 'admin/announcements';
//--------------------CLIENT ----------------------------------------------
exports.getActiveAnnouncementsImage     = 'front/announcements/image';
exports.getAnnouncementImageById        = 'front/announcement/image';
exports.getItemsBySellerId              = 'front/announcement/seller/items';
exports.getItemsByAnnouncementId        = 'front/announcement'
exports.postAddItemToAnnouncement       = 'front/announcement/add';

//--------------------Suggested Products ----------------------------------
exports.getSuggestedProducts = 'front/suggestedProducts';

//--------------------Logout Client ---------------------------------------
exports.logoutClient = 'front/logout';

//--------------------Logout Admin -------------------
exports.logoutAdmin = 'admin/logout';

// Admin Activity Logs - Paul Musa
exports.postAdminLogs                   = 'admin/activity_logs';
//---------------- ---- Admin Announcement --------------------------------
//---------------------- Andrea Destajo -----------------------------------
exports.postNewsfeedAnnouncement   = 'admin/upload/announcement';
exports.getNewsfeedAnnouncement = 'admin/get/announcement';
exports.updateAdminAnnouncement = 'admin/update/announcement';
exports.getPublishAnnouncement  = 'admin/get/publish';
exports.removeAnnouncement      = 'admin/remove/announcement';
exports.getUsers                = 'admin/announcement/getusers';
//---------------- ---- End of Admin Announcement --------------------------

//------------------------Related Products ---------------------------------
exports.getItemRelatedProducts = 'front/relatedProducts';
exports.getItemRelatedProductsNoLimit = 'front/relatedProductsNoLimit'

// Admin Global Mounted -  Paul Musa
exports.postAdminMounted        = 'admin/mdb_admin_user_data'; // get user collection

//------------------------End of Related Products --------------------------

// Admin Global Mounted -  Paul Musa
exports.postAdminMounted         = 'admin/mdb_admin_user_data'; // get user collection

// Enable 2FA - Paul Musa
exports.postEnable2fa            = 'account/2fa/enable';

// Disable 2FA - Paul Musa
exports.postDisable2fa           = 'account/2fa/disable';

// ADMIN Enable 2FA - Paul Musa
exports.postEnable2faAdmin       = 'admin/2fa/enable';

// ADMIN Disable 2FA - Paul Musa
exports.postDisable2faAdmin      = 'admin/2fa/disable';

//------------------------End of Related Products --------------------------

exports.postSharePostToGlobal   = 'member/share/post/global';
exports.postFetchOriginalPost   = 'member/fetch/original/post';

exports.postReactPost  = 'member/react/post';
exports.postFetchUserReact = 'member/fetch/user/react';
//------------------------Online Status ------------------------------------
exports.postUpdateUserOnlineStatus = 'front/user/update/status'
//------------------------End of Online Status ------------------------------------

//--------------------Featured Products --------------------------
exports.getFeaturedProducts         = 'front/featuredProducts';
exports.getFeaturedProductSlots     = 'front/featuredProducts/slots';
exports.getTotalFeaturedProducts    = 'front/featuredProducts/total'
//--------------------End of Featured Products -------------------

//--------------------Logout Client -------------------

//-------------------------------- Scheduler -------------------------------
// exports.postSetCancelTimer = 'schedule/cancel/set';
//----------------------------- End of Scheduler ----------------------------

exports.postFetchComments = 'member/comments/fetch';

//--------------------Flash Deals -----------------------------
exports.getHomepageFlashDeals   = 'front/flashDeal/homepage';
exports.getFlashDeals           = 'front/flashDeal';
exports.getFlashDealsBySellerId = 'front/flashDeal/seller/items';
exports.isGarageSaleItem        = 'front/flashDeal/seller/items/garageSale';
exports.postAddToFlashDeal      = 'front/flashDeal/add';
exports.getFlashDealTime        = 'schedule/flashDeal/get';

exports.fetchPostfilteredClients= 'admin/fetch/clients';
//--------------------End of Flash Deals ----------------------

//-------------------- Profile Product ----------------------------
exports.getUserProducts = 'profile/products';
//--------------------End of Profile Product ----------------------

// -------------------Andrea-Chat -----------------------------
exports.deleteMessage           = 'member/user/deleteMessage';
// -------------------Andrea-EndChat --------------------------

//-------------------- Conversion Rate ----------------------------
exports.getConversionRates = 'conversion/rates';
//--------------------End of Conversion Rate ----------------------

