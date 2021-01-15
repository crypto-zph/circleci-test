
const routes =
    [
        {
            path: '/',
            component: () => import('layouts/FrontLayout.vue'),
            children:
                [
                    // { name: 'front_dashboard', path: '', component: () => import('pages/Front/Dashboard.vue') },
                    { name: 'front_landing', path: '/', component: () => import('pages/Front/Landing.vue') },
                    { name: 'front_transactions', path: '/transactions', component: () => import('pages/Front/Transactions.vue') },
                    { name: 'front_product_details', path: 'product/details/:id', component: () => import('pages/Front/ProductDetails.vue') },
                    { name: 'front_categories', path: '/categories', component: () => import('pages/Front/Category.vue') },
                    { name: 'front_cart', path: '/cart', component: () => import('pages/Front/Cart.vue') },
                    { name: 'front_wishlist', path: '/wishlist', component: () => import('pages/Front/Wishlist.vue') },
                    { name: 'front_about', path: '/about', component: () => import('pages/Front/About.vue') },
                    { name: 'catalog', path: '/catalog', component: () => import('pages/Front/Catalog.vue') },
                    { name: 'front_profile', path: '/profile', component: () => import('pages/Front/Profile.vue') },
                    // { name: 'front_login', path: '/login', component: () => import('pages/Front/Login.vue') },
                    { name: 'front_newsfeed', path: '/news/feed', component: () => import('pages/Front/NewsFeed.vue') },
                    { name: 'front_subcategories', path: '/subcategories', component: () => import('pages/Front/SubcategoriesFront.vue') },
                    { name: 'front_subcategories2', path: '/subcategories2', component: () => import('pages/Front/Subcategories2Front.vue') },
                    // { name: 'front_login', path: '/login', component: () => import('pages/Front/Login.vue') },
                    { name: 'front_user_detail', path: 'user/details/:id', component: () => import('pages/Front/UserDetails.vue') },
                    { name: 'products_history', path: 'products/history', component: () => import('pages/Front/UserProductsHistory.vue') },
                    { name: 'front_client_wallet', path: 'wallet', component: () => import('pages/Front/ClientWallet.vue') },
                    { name: 'front_google_auth', path: 'client/google/auth', component: () => import('pages/Front/GoogleAuth.vue') },
                    { name: 'front_carousel', path: 'carousel/:announcement_id', component: () => import('components/UQCarouselPage.vue') },
                ]
        },
        {
            path: '/documentation',
            component: () => import('layouts/DocumentationLayout.vue'),
            children:
                [
                    { name: 'documentation_landing', path: '', component: () => import('pages/Documentation/Landing.vue') },
                    { name: 'documentation_login', path: 'login', component: () => import('pages/Documentation/Login.vue') },
                    { name: 'documentation_registration', path: 'registration', component: () => import('pages/Documentation/Registration.vue') },
                    { name: 'documentation_card', path: 'card', component: () => import('pages/Documentation/Card.vue') },
                    { name: 'documentation_product_tiles', path: 'product_tiles', component: () => import('pages/Documentation/ProductTiles.vue') },
                    { name: 'documentation_post_it', path: 'post_it', component: () => import('pages/Documentation/PostIt.vue') },
                    { name: 'documentation_image_magnifier', path: 'image_magnifier/:id', component: () => import('pages/Documentation/ImageMagnifier.vue') },
                    { name: 'documentation_items', path: 'item', component: () => import('pages/Documentation/Items.vue') },
                    { name: 'documentation_login_success', path: 'success', component: () => import('pages/Documentation/LoginLanding.vue') },
                    { name: 'documentation_admin_login', path: 'admin_login', component: () => import('pages/Documentation/AdminLogin.vue') },
                    { name: 'documentation_item_filters', path: 'items', component: () => import('pages/Documentation/ItemFilters.vue') },
                    { name: 'documentation_add_to_cart', path: 'cart', component: () => import('pages/Documentation/AddToCart.vue') },
                    { name: 'documentation_search_page', path: 'search', component: () => import('pages/Documentation/SearchPage.vue') },
                    { name: 'documentation_admin_items', path: 'admin_items', component: () => import('pages/Documentation/AdminItems.vue')},
                    { name: 'documentation_baristocrat_token', path: 'baristocrat-token', component: () => import('pages/Documentation/BaristocratToken.vue') },
                    { name: 'documentation_send', path: 'send', component: () => import('pages/Documentation/Send.vue') },
                    { name: 'documentation_receive', path: 'receive', component: () => import('pages/Documentation/Receive.vue') },
                    { name: 'documentation_history', path: 'history', component: () => import('pages/Documentation/History.vue') },
                    { name: 'documentation_user_masterlist', path: 'user-masterlist', component: () => import('pages/Documentation/UserMasterlist.vue') },
                    { name: 'documentation_item_filters', path: 'items', component: () => import('pages/Documentation/ItemFilters.vue') },
                    { name: 'documentation_kyc', path: 'kyc', component: () => import('pages/Documentation/Kyc.vue') },
                    { name: 'documentation_kyc_submits', path: 'kyc/submits', component: () => import('pages/Documentation/KycSubmits.vue') },
                    { name: 'documentation_manageUser', path: 'manage_user', component: () => import('pages/Admin/AdminUsers.vue') },
                    { name: 'documentation_adminSetting', path: 'admin_setting', component: () => import('pages/Admin/AdminSetting.vue') },
                    { name: 'documentation_adminLogs', path: 'admin/logs', component: () => import('pages/Admin/AdminLogs.vue') },
                    { name: 'documentation_admin_product_management', path: 'admin_product_management', component: () => import('pages/Documentation/AdminProductManagement.vue') },
                    { name: 'documentation_admin_categories_management', path: 'categories_management', component: () => import('pages/Documentation/Admin/CategoriesManagement.vue') },
                    { name: 'documentation_categories', path: 'categories', component: () => import('pages/Documentation/Categories.vue') },
                    { name: 'documentation_subcategories', path: 'subcategories', component: () => import('pages/Documentation/Subcategories.vue') },
                    { name: 'documentation_subcategories2', path: 'subcategories2', component: () => import('pages/Documentation/Subcategories2.vue') },
                    { name: 'documentation_update_item', path: 'update_item', component: () => import('pages/Documentation/UpdateItem.vue') },
                    // added code 12/3/2020 9:55pm remove comment later and spacing
                    { name: 'documentation_product', path: 'product', component: () => import('pages/Documentation/Products.vue') },
                    // end 12/3/2020 9:55pm

                    { name: 'documentation_follow', path: 'follow', component: () => import('pages/Documentation/Follow.vue') },
                    { name: 'documentation_search', path: 'search_input', component: () => import('pages/Documentation/SearchInput.vue') },
                    { name: 'documentation_barter', path: 'barter', component: () => import('pages/Documentation/Barter.vue') },
                    { name: 'documentation_wishlist', path: 'wishlist', component: () => import('pages/Documentation/Wishlist.vue') },
                    { name: 'documentation_wishlist_match', path: 'wishlist/match', component: () => import('pages/Documentation/WishlistMatch.vue') },
                    { name: 'documentation_products_history', path: 'products/history', component: () => import('pages/Documentation/UserProductsHistory.vue') },

                    // pergent
                    { name: 'documentation_avatar', path: 'avatar', component: () => import('pages/Documentation/Admin/Avatar.vue') },
                    { name: 'documentation_profile', path: 'profile', component: () => import('pages/Documentation/Account/Profile.vue') },
                    { name: 'documentation_users', path: 'users', component: () => import('pages/Documentation/Account/User.vue') },
                    { name: 'documentation_admin_ratings', path: 'ratings', component: () => import('pages/Documentation/Admin/Rating.vue') },
                    { name: 'documentation_admin_reviews', path: 'reviews', component: () => import('pages/Documentation/Admin/Review.vue') },
                    { name: 'documentation_admin_cover_photo', path: 'cover_photo', component: () => import('pages/Documentation/Admin/CoverPhoto.vue') },
                    { name: 'documentation_admin_report_user', path: 'report_user', component: () => import('pages/Documentation/Admin/ReportUser.vue') },
                    { name: 'documentation_product_tiles_v1', path: 'product/tiles', component: () => import('pages/Documentation/ProductTilesSample.vue') },
                    { name: 'documentation_change_passwsord', path: 'change/password', component: () => import('pages/Documentation/Account/ChangePassword.vue') },
                    // { name: 'documentation_user_detail', path: 'user/details/:id', component: () => import('pages/Documentation/Account/UserDetail.vue') },
                    //end of pergent
                    { name: 'documentation_forgot_password', path: 'forgot_password', component: () => import('pages/Documentation/ForgotPassword.vue') },
                    { name: 'documentation_reset_password', path: 'forgot_password/:key', component: () => import('pages/Documentation/ResetPassword.vue') },
                    { name: 'documentation_email_sent', path: 'email_sent', component: () => import('pages/Documentation/EmailSent.vue') },
                    { name: 'documentation_reset_pass_success', path: 'reset_pass_success', component: () => import('pages/Documentation/ResetPassSuccess.vue') },
                    { name: 'documentation_total_escrow', path: 'total_escrow', component: () => import('pages/Documentation/Admin/TotalEscrow.vue') },
                    { name: 'documentation_total_active_and_inactive_users', path: 'total_active_and_inactive_users', component: () => import('pages/Documentation/Admin/TotalActiveAndInactiveUsers.vue') },
                    { name: 'documentation_total_release', path: 'total_release', component: () => import('pages/Documentation/Admin/TotalRelease.vue') },
                    { name: 'documentation_total_cancel', path: 'total_cancel', component: () => import('pages/Documentation/Admin/TotalCancel.vue') },
                    { name: 'documentation_over_all_total', path: 'over_all_total', component: () => import('pages/Documentation/Admin/OverAllTotal.vue') },
                    { name: 'documentation_item_post', path: 'item/:item_id', component: () => import('pages/Documentation/ItemPost.vue') },
                    { name: 'documentation_user_notification', path: 'user_notification', component: () => import('pages/Documentation/Notification.vue')},

                    {name: 'documentation_newsfeed', path: 'newsfeed', component: () => import('pages/Documentation/Newsfeed.vue')},

                    { name: 'documentation_admin_announcement_newsfeed', path: 'documentation_admin_announcement_newsfeed', component: () => import('pages/Admin/AdminAnnouncement.vue')},
                    { name: 'documentation_garage_sale', path: 'items/garage_sale', component: () => import('pages/Documentation/GarageSale.vue') },
                    { name: 'documentation_mother_wallet', path: 'mother/wallet', component: () => import('pages/Documentation/Admin/MotherWallet.vue') },
                    { name: 'documentation_admin_activity_logs', path: 'admin/activity-logs', component: () => import('pages/Documentation/Admin/AdminActivityLogs.vue') },
                    { name: 'documentation_admin_announcement', path: 'announcement', component: () => import('pages/Documentation/Announcement.vue') },
                    { name: 'documentation_announcement', path: 'announcement/carousel', component: () => import('pages/Documentation/AnnouncementCarousel.vue') },
                    { name: 'documentation_suggested_products', path: 'suggested_products', component: () => import('pages/Documentation/SuggestedProducts.vue') },
                    { name: 'documentation_featured_products', path: 'featured_products', component: () => import('pages/Documentation/FeaturedProducts.vue') },
                    { name: 'documentation_related_products', path: 'related_products/:item_id', component: () => import('pages/Documentation/RelatedProducts.vue') },
                    { name: 'documentation_client_wallet', path: 'wallet', component: () => import('pages/Documentation/ClientWallet.vue') },
                    { name: 'documentation_google_authenticator', path: 'google-authenticator', component: () => import('pages/Documentation/GoogleAuthenticator.vue') },
                    { name: 'documentation_admin_google_authenticator', path: 'admin/google-authenticator', component: () => import('pages/Documentation/AdminGoogleAuthenticator.vue') },
                    { name: 'documentation_admin_send_reminder', path: 'documentation_admin_send_reminder', component: () => import('pages/Documentation/Admin/SendReminder.vue')},
                    { name: 'documentation_flash_deal', path: 'flash-deal', component: () => import('pages/Documentation/FlashDeal.vue') },
                    { name: 'documentation_flash_deal_homepage', path: 'flash-deal/homepage', component: () => import('pages/Documentation/HomepageFlashDeal.vue') },

                    
                    { name: 'documentation_client_master_list', path: 'client/masterlist', component: () => import('pages/Admin/ClientMasterList.vue') },
                    { name: 'documentation_carousel_page', path: 'carousel/:announcement_id', component: () => import('pages/Documentation/CarouselPage.vue') },

                    // Chat - Andrea
                    { name: 'documentation_chat', path: 'documentation_chat',  component: () => import('pages/Documentation/Account/Messages.vue')}
                ]
        },

        // navbar withour search input
        {
            path: '/',
            component: () => import('layouts/FrontLayout2.vue'),
            children:
                [
                    { name: 'front_login', path: '/login', component: () => import('pages/Front/Login.vue') },
                    { name: 'front_registration', path: '/registration', component: () => import('pages/Front/Registration.vue') },
                    { name: 'front_register', path: '/register', component: () => import('pages/Front/Register.vue') },
                    { name: 'front_sell', path: '/sell', component: () => import('pages/Front/components/Sell.vue') },
                    { name: 'front_kyc', path: '/kyc', component: () => import('pages/Front/kyc.vue') },
                    { name: 'front_user_detail', path: 'user/details/:id', component: () => import('pages/Front/UserDetails.vue') },
                    { name: 'front_follow', path: 'follow', component: () => import('pages/Front/Follow.vue') },
                    { name: 'front_wishlist', path: 'wishlist', component: () => import('pages/Front/Wishlist.vue') },
                    { name: 'front_follow_by_id', path: 'user/follow/:id', component: () => import('pages/Front/FollowById.vue') },
                    // { name: 'front_client_wallet', path: 'client/wallet', component: () => import('pages/Front/ClientWallet.vue') },
                    { name: 'front_forgot_password', path: 'user/forgot/password', component: () => import('pages/Front/components/ForgotPassword.vue') },
                    { name: 'front_full_page_search', path: 'search/?', component: () => import('pages/Front/SearchFullPage.vue') },
                    { name: 'front_email_sent', path: 'email/sent', component: () => import('pages/Front/components/EmailSent.vue') },
                ]
        },

            {
            path: '/admin',
            component: () => import('layouts/FrontLayout3.vue'),
            children:
                [
                    { name: 'admin_login', path: 'login', component: () => import('pages/Admin/AdminLogin.vue') },
                ]
        },

        {
            path: '/admin',
            component: () => import('layouts/AdminLayout.vue'),
            children:
                [
                    { name: 'admin_dashboard', path: 'dashboard', component: () => import('pages/Admin/AdminDashboard.vue') },
                    { name: 'admin_trades', path: 'trades', component: () => import('pages/Admin/AdminTrades.vue') },
                    { name: 'admin_users', path: 'users', component: () => import('pages/Admin/AdminUsers.vue') },
                    { name: 'admin_kyc_submits', path: 'kyc/submits', component: () => import('pages/Admin/AdminKycSubmits.vue') },
                    { name: 'admin_avatar', path: 'avatar/create', component: () => import('pages/Admin/AdminAvatar.vue') },
                    { name: 'admin_ratings', path: 'ratings/users', component: () => import('pages/Admin/AdminRatings.vue') },
                    { name: 'admin_rate_reviews', path: 'rate/reviews/users', component: () => import('pages/Admin/AdminRateReview.vue') },
                    { name: 'admin_cover_photo', path: 'coverphoto/create', component: () => import('pages/Admin/AdminCoverPhoto.vue') },
                    { name: 'admin_reported_user', path: 'reported/users', component: () => import('pages/Admin/AdminReportedUsers.vue') },
                    { name: 'admin_settings', path: 'settings', component: () => import('pages/Admin/AdminSetting.vue') },
                    { name: 'admin_logs', path: 'logs', component: () => import('pages/Admin/AdminLogs.vue') },
                    { name: 'admin_manageUser', path: 'manage_user', component: () => import('components/admin/UQAdminUsers.vue') },
                    { name: 'admin_adminSetting', path: 'admin_setting', component: () => import('components/admin/UQAdminSetting.vue') },
                    { name: 'admin_mother_wallet', path: 'mother/wallet', component: () => import('components/Admin/Wallet/UQMotherWallet.vue') },
                    { name: 'admin_google_auth', path: 'google-authenticator', component: () => import('components/Admin/Wallet/UQAdminGoogleAuthenticator.vue') },
                    { name: 'admin_total_escrow', path: 'total/escrow', component: () => import('pages/Admin/AdminTotalEscrow.vue') },
                    { name: 'admin_total_cancel', path: 'total/cancel', component: () => import('pages/Admin/AdminTotalCancel.vue') },
                    { name: 'admin_total_release', path: 'total/release', component: () => import('pages/Admin/AdminTotalRelease.vue') },
                    { name: 'admin_total_active_and_inactive_users', path: 'total/users', component: () => import('pages/Admin/AdminTotalActiveAndInactiveUsers.vue') },
                    { name: 'admin_over_all_total', path: 'over_all_total', component: () => import('pages/Admin/AdminOverAllTotal.vue') },
                    { name: 'admin_reminder', path: 'reminder', component: () => import('components/Admin/UQSendReminder.vue') },
                ]
        },

        {
            path: '/search',
            component: () => import('layouts/SearchAndFilterLayout.vue'),
            children:
                [
                    { name: 'search_page', path: '', component: () => import('pages/Front/SearchPage.vue') },
                    { name: 'front_products', path: 'product', component: () => import('pages/Front/ProductsFront.vue') },
                ]
        },

        // No Header and footer
        {
            path: '/',
            component: () => import('layouts/MainLayout.vue'),
            children:
                [
                     { name: 'front_message', path: '/messages', component: () => import('pages/Front/MessagesComponents/Message.vue') },
                ]
        },

        // Always leave this as last one,
        // but you can also remove it
        {
            path: '*',
            component: () => import('pages/Error404.vue')
        }
    ]

export default routes
