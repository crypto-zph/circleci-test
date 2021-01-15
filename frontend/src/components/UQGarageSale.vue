<template>
    <div>
        <q-page class="q-pa-md" v-if="!isEmpty(product_details)">
            <div class="q-gutter-y-md" >
                <u-q-product-tiles :tile_details="product_details" :user_data="user_data"></u-q-product-tiles>
            </div>
        </q-page>
        <div v-else>
            No data found
        </div>
    </div>
</template>

<script>
import UQProductTiles from './global/UQProductTiles';
import { getGarageSaleItems } from '../references/url';

export default {
    components: { UQProductTiles },
    data: () =>
    ({
        product_details: {},
        user_data: {}
    }),
    mounted()
    {
        this.getGarageSaleItems();
    },
    methods:
    {
        async getGarageSaleItems()
        {
            let garage_sale = await this.$_get(getGarageSaleItems);

            this.product_details = (garage_sale) ? garage_sale.data.data : {};
        },

        isEmpty(obj)
        {
            return typeof obj === 'undefined' || Object.keys(obj).length === 0;
        }
    }
}
</script>