<template>
    <div>
      <div >
        <h2>
          <span class="title__bg font-rubik-title">Products</span>
        </h2>
      </div>
      <hr style="border: 0;
                height: 1px;
                background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));">
      <div>
         <u-q-product-tiles :tile_details="product_details" :user_data="user_data" class="q-mb-md"></u-q-product-tiles>
            <div class="text-center q-mb-md">
                    <q-btn :style="this.limit >= this.allCount ? 'display: none' : ''" color="secondary" @click="viewMore()">View More</q-btn>
            </div>
        <hr style="border: 0;
                  height: 1px;
                  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));">
      </div>
    </div>
</template>

<script>
import UQProductTiles from '../../components/global/UQProductTiles';
import tile_details from '../../references/tile_details';
import {
  getLimitedItems,
  postListItems
} from "../../references/url";
export default {
    components: {
        UQProductTiles
    },
    data: () => ({
        tile_details: tile_details,
        product_details: {},
        user_data: {},
        limit: 8,
        allCount: 0 
    }),

    async mounted() 
    {
        this.$q.loading.show();
        let product_details = await this.getAllProducts()
        this.product_details = product_details.items
        await this.getProductLength()
        console.log(product_details)
        this.$q.loading.hide();
    },
    created()
    {
        this.isUserLoggedIn();
    },
    methods: 
    {
        async getProductLength(){
            let res = await this.$_post(postListItems);
            this.allCount = res.data.items.length
            return res.data
        },
        async getAllProducts()
        {
            let user_id = this.$static_user_info ? this.$static_user_info._id : null;
            let res = await this.$_post(getLimitedItems, {limit: this.limit, user_id: user_id });
            return res.data
        },
        async isUserLoggedIn ()
        {
            let user = await this.$_isUserAuthenticated();
            this.user_data = (user.data.status == 'authenticated') ? user.data.user : {};
        },
        async viewMore()
        {
            this.limit += 8
            let res = await this.$_post(getLimitedItems, {limit: this.limit});
            this.product_details = res.data.items
        },
    }
}
</script>

<style>

</style>



