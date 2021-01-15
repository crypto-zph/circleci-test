<template>
    <div>
        <q-page class="q-pa-md" v-if="!isEmpty(product_details)">
            <div class="q-gutter-y-md" >
                <hr>
                <u-q-product-tiles :tile_details="wishlist" :user_data="user_data" @toRemove="fromProductTiles" :is_wishlist_page="true"></u-q-product-tiles>
            </div>
        </q-page>
        <div v-else>
            No data found
        </div>
    </div>
</template>

<script>
import UQProductTiles from './global/UQProductTiles';
import { getWishlistData } from '../references/url';

export default {
    components: { UQProductTiles },
    data: () =>
    ({
        product_details: {},
        user_data: {},
        wishlist: []
    }),
    mounted()
    {
        this.isUserLoggedIn();
    },
    methods:
    {
        async isUserLoggedIn ()
        {
            // console.log(this.tile_details);
            let user = await this.$_isUserAuthenticated();

            if (user.data.status == 'authenticated') {
                this.user_data = user.data.user;

                this.getWishlist();
            } else {
                this.$router.push({name: 'front_login'});
            }
        },

        async getWishlist()
        {
            let wishlist = await this.$_get(getWishlistData);

            this.product_details = (wishlist) ? wishlist.data.data : {};
            this.wishlist = this.product_details;
        },

        fromProductTiles(item_id)
        {
            for (let count = 0; count < this.product_details.length; count++) {
                if (this.product_details[count]._id === item_id){
                    this.wishlist.splice(count, 1);
                }
            }
        },

        isEmpty(obj)
        {
            return typeof obj === 'undefined' || Object.keys(obj).length === 0;
        }
    }
}
</script>