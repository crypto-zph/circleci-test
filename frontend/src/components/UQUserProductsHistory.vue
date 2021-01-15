<template>
    <div class="q-pa-lg">
        <div>
            <q-tabs
                @input="getProductsHistory"
                v-model="form_data.status"
                align="justify"
                class="text-secondary"
                dense
            >
                <q-tab name="escrowed" label="Escrowed" />
                <q-tab name="bartered" label="Released" />
                <q-tab name="cancelled" label="Cancelled" />
            </q-tabs>

            <q-tab-panels style="background: transparent !important;" v-model="form_data.status" animated>
                <q-tab-panel name="escrowed">
                    <div v-show="is_escrow_open">
                        <u-q-product-component
                            v-if="is_my_profile"
                            :products="escrowed_products" 
                            :convert="convert"
                            @success="handleSuccess"
                            product_type="escrowed">
                        </u-q-product-component>
                        <u-q-product-tiles 
                            v-else
                            :tile_details="escrowed_products">
                        </u-q-product-tiles>
                    </div>

                    <q-inner-loading :showing="!is_escrow_open">
                        <q-spinner-ball size="50px" color="primary" />
                    </q-inner-loading>
                </q-tab-panel>

                <q-tab-panel name="bartered">
                    <div v-show="is_release_open">
                        <u-q-product-component 
                            v-if="is_my_profile"
                            :products="released_products"
                            :convert="convert"
                            @success="handleSuccess"
                            product_type="bartered">
                        </u-q-product-component>
                        <u-q-product-tiles 
                            v-else
                            :tile_details="released_products">
                        </u-q-product-tiles>
                    </div>
                    <q-inner-loading :showing="!is_release_open">
                        <q-spinner-ball size="50px" color="primary" />
                    </q-inner-loading>
                </q-tab-panel>

                <q-tab-panel name="cancelled">
                    <div v-show="is_cancel_open">
                        <u-q-product-component 
                            v-if="is_my_profile"
                            :products="cancelled_products" 
                            :convert="convert"
                            @success="handleSuccess"
                            product_type="cancelled">
                        </u-q-product-component>
                        <u-q-product-tiles 
                            v-else
                            :tile_details="cancelled_products">
                        </u-q-product-tiles>
                    </div>
                    <q-inner-loading :showing="!is_cancel_open">
                        <q-spinner-ball size="50px" color="primary" />
                    </q-inner-loading>
                </q-tab-panel>
            </q-tab-panels>
        </div>
    </div>
</template>

<script>
import { getProductsHistory } from '../references/url';
import { QSpinnerBall, QInnerLoading } from 'quasar';
import UQProductComponent from './UQProductComponent';
import UQProductTiles from './global/UQProductTiles';

export default
{
    props: ['user_id', 'is_my_profile'],
    data:() =>(
    {
        form_data:
        {
            status: 'escrowed'
        },
        escrowed_products: [],
        released_products: [],
        cancelled_products: [],
        is_escrow_open: false,
        is_release_open: false,
        is_cancel_open: false,
        component_key: 0,
        convert: []
    }),
    components: { QSpinnerBall, QInnerLoading, UQProductComponent, UQProductTiles },
    async mounted()
    {
        await this.getProductsHistory();
        let conversion = await this.$_getConversionRates();
        this.convert = conversion.data;
    },
    methods:
    {
        async getProductsHistory()
        {
            let res = {};

            this.form_data.user_id = this.user_id;
            if (this.form_data.status === 'escrowed' && !this.is_escrow_open)
            {
                res = await this.$_post(getProductsHistory, this.form_data);
                this.escrowed_products = res.data;
                this.is_escrow_open = true;
            }
            else if (this.form_data.status === 'bartered' && !this.is_release_open)
            {
                res = await this.$_post(getProductsHistory, this.form_data);
                this.released_products = res.data;
                this.is_release_open = true;
            }
            else if (this.form_data.status === 'cancelled' && !this.is_cancel_open)
            {
                res = await this.$_post(getProductsHistory, this.form_data);
                this.cancelled_products = res.data;
                this.is_cancel_open = true;
            }
        },

        async handleSuccess(product_type)
        {
            this.form_data.status = product_type;
            this.is_escrow_open = false;
            this.is_release_open = false;
            this.is_cancel_open = false;
            await this.getProductsHistory();
            this.component_key++;
        }
    },
    computed: 
    {

    },
    filters: 
    {
        toClientAmount(amount, decimals)
        {
            let value = amount / 10 ** decimals;
            return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: decimals });
        },
    }
}
</script>
<style>
.my-card {
width: 100%;
max-width: 250px;
}
</style>
