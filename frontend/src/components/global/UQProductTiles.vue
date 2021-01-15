<template>
    <div>
        <div v-if="!isEmpty(tile_details)">
            <q-carousel
                v-if="is_wishlist_match"
                v-model="slide"
                transition-prev="slide-right"
                transition-next="slide-left"
                swipeable
                animated
                control-color="primary"
                padding
                arrows
                height="595px"
                class="bg-white text-black shadow-1 rounded-borders no-shadow"
            >
                <q-carousel-slide v-for="(tile, index) in tile_details" :key="index" :name="index">
                    <div class="row">
                        <u-q-card
                        class="col-12"
                        :username="tile.seller_first_name"
                        :time="tile.created_at"
                        :avatar="tile.seller_avatar"
                        :image="tile.item_image[0]"
                        :product_name="tile.item_name"
                        :price="convertPrice(tile.price.BRT.$numberDecimal)"
                        :location="tile.location"
                        :description="tile.description"
                        :product_id="tile._id"
                        :seller_id="tile.seller_id"
                        :user_data="user_data"
                        :sale_percentage="(tile.is_flash_deal) ? (tile.flash_deal_percentage / 100) : (tile.is_garage_sale && !!tile.garage_sale_percentage) ? tile.garage_sale_percentage : ''"
                        :sale_price="(tile.is_flash_deal) ? tile.flash_deal_price : (tile.is_garage_sale && !!tile.garage_sale_percentage) ? getGarageSalePrice(tile.garage_sale_percentage, tile.price.BRT.$numberDecimal) : ''"
                        :category="tile.category"
                        @remove="passRemoveItemId"
                    ></u-q-card>
                    </div>
                </q-carousel-slide>
            </q-carousel>
            <div v-else class="flex">
                <u-q-card
                    v-for="(tile, index) in tile_details" :key="index"
                    :username="tile.seller_id.username"
                    :time="tile.created_at"
                    :avatar="tile.seller_avatar"
                    :image="tile.item_image[0]"
                    :product_name="tile.item_name"
                    :price="convertPrice(tile.price.BRT.$numberDecimal)"
                    :location="tile.location"
                    :description="tile.description"
                    :product_id="tile._id"
                    :seller_id="tile.seller_id"
                    :user_data="user_data"
                    :sale_percentage="(tile.is_flash_deal) ? (tile.flash_deal_percentage / 100) : (tile.is_garage_sale && !!tile.garage_sale_percentage) ? tile.garage_sale_percentage : ''"
                    :sale_price="(tile.is_flash_deal) ? tile.flash_deal_price : (tile.is_garage_sale && !!tile.garage_sale_percentage) ? getGarageSalePrice(tile.garage_sale_percentage, tile.price.BRT.$numberDecimal) : ''"
                    :category="tile.category"
                    :garage_sale_percentage="tile.garage_sale_percentage"
                    @remove="passRemoveItemId"
                ></u-q-card>
            </div>
        </div>
        <div v-else>
           <div class="text-center text-h6">
               No Item Found
            </div>
        </div>
    </div>
</template>

<script>
import UQCard from './UQCard';
// import tile_details from '../../references/tile_details.js';

export default
{
    props: {
        tile_details : { default: {} },
        user_data: { default: {} },
        is_wishlist_page : {
            type: Boolean,
            default: false
        },
        is_wishlist_match : {
            type: Boolean,
            default: false
        },
        is_flash_deal : {
            type: Boolean,
            default: false
        }
    },
    data:() =>(
    {
        slide: 0,
        product_details: [],
        starting: 0,
        ending: 8,
        is_search_route_search_page: false,
        is_search_route_wishlist: false,
    }),
    components: { UQCard },
    created()
    {
        this.setProduct();
    },
    mounted()
    {
        this.checkRouteSearchPage();
        this.checkRouteWishList();
        if(this.is_search_route == true){
            this.ending = 8
        } else if(this.is_search_route_wishlist == true) {
            this.ending = this.tile_details.length
        } else {
            this.ending = 8
        }
    },
    methods:
    {
        setProduct()
        {
            this.product_details = this.tile_details;
        },

        convertPrice (price)
        {
            return Number.parseFloat(price);
        },

        passRemoveItemId (item_id)
        {
            if (this.is_wishlist_page) {
                this.$emit('toRemove', item_id);
            }
        },

        getGarageSalePrice (percentage, price)
        {
            price = this.convertPrice(price);

            return Number.parseFloat(price - (price * percentage)).toFixed(2);
        },

        // convertPercentage(percentage)
        // {
        //     // return (Math.round((percentage * 100) * 100) / 100);

        // },

        isEmpty(obj)
        {
            return Object.keys(obj).length === 0;
        },
        async checkRouteSearchPage()
        {
            this.is_search_route = (this.$route.name == 'search_page') ? true : false;
        },
        async checkRouteWishList()
        {
            this.is_search_route_wishlist = (this.$route.name == 'front_wishlist') ? true : false;
        }
    }
}
</script>

<style>
.my-card {
  width: 100%;
  max-width: 220px;
}
</style>