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
                        <q-btn  round color="secondary" icon="keyboard_arrow_right" class="q-ml-md" :disable="total_related <= skip ? true : false" @click="next()"/>
                    </div>
                </div>
        </q-page>
        <div v-else>
            No data found
        </div>
    </div>
</template>

<script>
import UQProductTiles from './global/UQProductTiles';
import { getItemRelatedProducts, getItemRelatedProductsNoLimit } from '../references/url';

export default {
    components: { UQProductTiles },
            props: [
            'product_id',
        ],
    data: () =>
    ({
        product_details: {},
        user_data: {},
        skip: 0,
        total_related: 0
    }),
    async mounted()
    {
        await this.getItemRelatedProducts();
        await this.getItemRelatedProductsNoLimit();
    },
    methods:
    {
        async getItemRelatedProducts()
        {
            let item_id = this.product_id;
            let skip = this.skip

            let related_products = await this.$_get(`${getItemRelatedProducts}/${item_id}/${skip}`);
            this.product_details = (related_products) ? related_products.data.data : {};
        },
        
        async next()
        {
            let item_id = this.product_id;
            this.skip += 5

            let related_products = await this.$_get(`${getItemRelatedProducts}/${item_id}/${this.skip}`);
            this.product_details = (related_products) ? related_products.data.data : {};
        },

        async previous()
        {
            let item_id = this.product_id;
            this.skip -= 5

            let related_products = await this.$_get(`${getItemRelatedProducts}/${item_id}/${this.skip}`);

            this.product_details = (related_products) ? related_products.data.data : {};
        },

        isEmpty(obj)
        {
            return typeof obj === 'undefined' || Object.keys(obj).length === 0;
        },

        async getItemRelatedProductsNoLimit()
        {
            let item_id = this.product_id;

            let related_products = await this.$_get(`${getItemRelatedProductsNoLimit}/${item_id}`);
            this.total_related = related_products.data.data.length - 5
        },
        
    }
}
</script>