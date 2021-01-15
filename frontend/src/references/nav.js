module.exports =
[
    {
        key: 'documentation_landing',
        label: 'Introduction',
        icon: 'fa fa-question',
        route: 'documentation_landing',
    },
    // {
    //     key: 'authenticator',
    //     label: 'Authenticator',
    //     icon: 'fa fa-key',
    //     route: 'authentication',
    // },
    {
        key: 'landing',
        label: 'Landing Page',
        icon: 'fa fa-home',
        sub:
        [
            { label: 'Login', route: 'documentation_login' },
            { label: 'Registration', route: 'documentation_registration'  },
            { label: 'Card', route: 'documentation_card' },
            { label: 'Product Tiles', route: 'documentation_product_tiles' },
            { label: 'Categories', route: 'documentation_categories' },
            { label: 'Announcement Carousel', route: 'documentation_announcement' },
            { label: 'Suggested Products', route: 'documentation_suggested_products' },
            { label: 'Change Password', route: 'documentation_change_passwsord' },
            { label: 'Featured Products', route: 'documentation_featured_products' },
            { label: 'Flash Deal', route: 'documentation_flash_deal' },
            { label: 'Homepage Flash Deal', route: 'documentation_flash_deal_homepage' },
        ]
    },
    {
        key: 'member',
        label: 'Member Page',
        icon: 'fa fa-home',
        sub:
        [
            { label: 'KYC', route: 'documentation_kyc' },
            { label: 'Profile', route: 'documentation_profile' },
            { label: 'Sellers', route: 'documentation_users' },
            { label: 'Notifications', route: 'documentation_user_notification' },
            { label: 'Follow', route: 'documentation_follow' },
            { label: 'Sellers Detail', route: 'documentation_user_detail' },
            { label: 'Wishlist', route: 'documentation_wishlist' },
            { label: 'Wishlist Match', route: 'documentation_wishlist_match' },
            { label: 'Client Wallet', route: 'documentation_client_wallet' },
            { label: 'Newsfeed', route: 'documentation_newsfeed' },
            { label: 'Google Authenticator', route: 'documentation_google_authenticator' },
            { label: 'Chat', route: 'documentation_chat'},
        ]
    },

    {
        key: 'admin',
        label: 'Admin Page',
        icon: 'fa fa-home',
        sub:
        [
            { label: 'KYC Submits', route: 'documentation_kyc_submits' },
            { label: 'Login (client)', route: 'documentation_login' },
            { label: 'Login (admin)', route: 'documentation_admin_login' },
            { label: 'Manage User', route: 'documentation_manageUser' },
            { label: 'Admin Setting', route: 'documentation_adminSetting'},
            { label: 'Avatar', route: 'documentation_avatar' },
            { label: 'Ratings', route: 'documentation_admin_ratings' },
            { label: 'Reviews', route: 'documentation_admin_reviews' },
            { label: 'Cover Photo', route: 'documentation_admin_cover_photo' },
            { label: 'Report User', route: 'documentation_admin_report_user' },
            { label: 'Admin Logs', route: 'documentation_adminLogs' },
            { label: 'Product Management', route: 'documentation_admin_product_management' },
            { label: 'Announcements', route: 'documentation_admin_announcement' },
            { label: 'User Masterlist', route: 'documentation_user_masterlist' },
            { label: 'Categories Management', route: 'documentation_admin_categories_management' },
            { label: 'Total Escrow', route: 'documentation_total_escrow' },
            { label: 'Total Active and Inactive Users', route: 'documentation_total_active_and_inactive_users' },
            { label: 'Mother Wallet', route: 'documentation_mother_wallet' },
            { label: 'Admin Activity Logs', route: 'documentation_admin_activity_logs' },
            { label: 'Admin Announcement(Newsfeed)', route: 'documentation_admin_announcement_newsfeed' },
            { label: 'Admin Google Authenticator', route: 'documentation_admin_google_authenticator' },
            { label: 'Admin Send Reminder', route: 'documentation_admin_send_reminder' },
        ]
    },
    {
        key: 'item',
        label: 'Item',
        icon: 'fa fa-shopping-cart',
        sub:
        [
            { label: 'Post It!', route: 'documentation_post_it'  },
            { label: 'Image Magnifier', route: 'documentation_image_magnifier'  },
            { label: 'Pending Items', route: 'documentation_pending'  },
            { label: 'Available Items', route: 'documentation_available'  },
            { label: 'Escrowed Items', route: 'documentation_escrowed'  },
            { label: 'Items', route: 'documentation_items'  },
            { label: 'Filter Items', route: 'documentation_item_filters'  },
            { label: 'Items (Admin)', route: 'documentation_admin_items'  },
            { label: 'Items Post', route: 'documentation_item_post'  },
            { label: 'Cart', route: 'documentation_add_to_cart'  },
            { label: 'Garage Sale', route: 'documentation_garage_sale' },
            { label: 'Related Products', route: 'documentation_related_products' },
            { label: 'User Products History', route: 'documentation_products_history' },
            { label: 'Update Item', route: 'documentation_update_item' },
        ]
    },
    {
        key: 'wallet',
        label: 'Wallet',
        icon: 'fa fa-wallet',
        sub:
        [
            { label: 'Baristocrat Token', route: 'documentation_baristocrat_token' },
            { label: 'Send', route: 'documentation_send' },
            { label: 'Receive', route: 'documentation_receive' },
            { label: 'History', route: 'documentation_history' },
        ]
    },
    {
        key: 'admin',
        label: 'Admin',
        icon: 'fa fa-home',
        sub:
        [
            { label: 'User Masterlist', route: 'documentation_user_masterlist' },
            { label: 'Product Tiles v1', route: 'documentation_product_tiles_v1' },
            { label: 'Categories Management', route: 'documentation_admin_categories_management' },
            { label: 'Product Tiles', route: 'documentation_product_tiles'  },
            { label: 'Total Escrow', route: 'documentation_total_escrow' },
            { label: 'Total Active and Inactive Users', route: 'documentation_total_active_and_inactive_users' },
            { label: 'Total Escrow Release', route: 'documentation_total_release' },
            { label: 'Total Escrow Cancel', route: 'documentation_total_cancel' },
            { label: 'Client Master List', route: 'documentation_client_master_list' },
        ]
    },
    // {
    //     key: 'user',
    //     label: 'User',
    //     icon: 'fa fa-user',
    //     sub:
    //     [
    //         { label: 'Wallet', route: 'documentation_login' },
    //     ]
    // },
    {
        key: 'search',
        label: 'Search',
        icon: 'fa fa-search',
        sub:
        [
            { label: 'Search', route: 'documentation_search' },
        ]
    },
]