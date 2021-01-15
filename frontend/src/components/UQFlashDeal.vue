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
import { getFlashDeals } from '../references/url';

export default {
    components: { UQProductTiles },
    data: () =>
    ({
        product_details: {},
        user_data: {}
    }),
    mounted()
    {
        this.getFlashDeals();
    },
    methods:
    {
        async getFlashDeals()
        {
            let flash_deals = await this.$_get(getFlashDeals);

            this.product_details = (flash_deals) ? flash_deals.data.data : {};
        },

        isEmpty(obj)
        {
            return typeof obj === 'undefined' || Object.keys(obj).length === 0;
        }
    }
}
</script>