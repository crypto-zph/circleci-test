<template>
    <div>
        <q-page class="q-pa-md" v-if="!isEmpty(product_details)">
            <div class="q-gutter-y-md" >
                <u-q-product-tiles :tile_details="product_details" :user_data="user_data"></u-q-product-tiles>
            </div>
                <!-- Button Next and Previous -->
                <div class="row q-mb-md">
                    <div class="col-6">
                        <q-btn  round color="secondary" icon="keyboard_arrow_left" :disable="skip <= 0 ? true : false"  @click="previous()"/>          
                    </div>
                    
                    <div class="col-6 text-right">
                        <q-btn  round color="secondary" icon="keyboard_arrow_right" class="q-ml-md" :disable="total_featured <= skip ? true : false" @click="next()"/>
                    </div>
                </div>
                 <!-- Button Next and Previous -->
        </q-page>
        <div v-else>
            No data found
        </div>
    </div>
</template>

<script>
import UQProductTiles from './global/UQProductTiles';
import { getFeaturedProducts, getTotalFeaturedProducts } from '../references/url';

export default {
    components: { UQProductTiles },
    data: () =>
    ({
        product_details: {},
        user_data: {},
        limit: 4,
        skip: 0,
        total_featured: {}
    }),
    mounted()
    {
        this.getFeaturedProducts();
        this.getTotalFeaturedProducts()
    },
    methods:
    {
        async getFeaturedProducts()
        {
            let featured_products = await this.$_get(`${getFeaturedProducts}?limit=${this.limit}&skip=${this.skip}`);
            this.product_details = (featured_products) ? featured_products.data.data : {};
            
        },

        isEmpty(obj)
        {
            return typeof obj === 'undefined' || Object.keys(obj).length === 0;
        },

        async next()
        {
            this.skip += 4

            let featured_products = await this.$_get(`${getFeaturedProducts}?limit=${this.limit}&skip=${this.skip}`);

            this.product_details = (featured_products) ? featured_products.data.data : {};
        },

        async previous()
        {
            this.skip -= 4

            let featured_products = await this.$_get(`${getFeaturedProducts}?limit=${this.limit}&skip=${this.skip}`);

            this.product_details = (featured_products) ? featured_products.data.data : {};
        },

        async getTotalFeaturedProducts()
        {
            let featured_products = await this.$_get(getTotalFeaturedProducts);

            this.total_featured = featured_products.data.data.length - 4
        },
    }
}
</script>
