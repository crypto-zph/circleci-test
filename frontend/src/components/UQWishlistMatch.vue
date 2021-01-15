<template>
    <q-page class="q-pa-md" v-if="!isEmpty(product_details)">
        <div class="q-gutter-y-md" >
            <u-q-product-tiles :tile_details="product_details" :user_data="user_data" :is_wishlist_page="true" :is_wishlist_match="true"></u-q-product-tiles>
        </div>
    </q-page>
</template>

<script>
import UQProductTiles from './global/UQProductTiles';
import { getWishlistMatch } from '../references/url';

export default {
    components: { UQProductTiles },
    data: () =>
    ({
        slide: 1,
        product_details: {},
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

                this.getWishlistMatch();
            } else {
                this.$router.push({name: 'front_login'});
            }
        },

        async getWishlistMatch()
        {
            let wishlist_match = await this.$_get(getWishlistMatch);

            this.product_details = (wishlist_match) ? wishlist_match.data.data : {};
        },

        isEmpty(obj)
        {
            return typeof obj === 'undefined' || Object.keys(obj).length === 0;
        }
    }
}
</script>