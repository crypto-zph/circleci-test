<template>
    <div class="q-pa-lg">
        <div>
            <q-tabs
                @input="getUserProducts"
                v-model="form_data.status"
                align="justify"
                class="text-secondary"
                dense
            >
                <q-tab name="available" label="Available" />
                <q-tab name="escrowed" label="Escrowed" />
                <q-tab name="bartered" label="Bartered" />
            </q-tabs>

            <q-tab-panels style="background: transparent !important;" v-model="form_data.status" animated>
                <q-tab-panel name="available">
                    <div v-show="is_available_open">
                        <u-q-product-tiles 
                            :tile_details="available_products">
                        </u-q-product-tiles>
                    </div>

                    <q-inner-loading :showing="!is_available_open">
                        <q-spinner-ball size="50px" color="primary" />
                    </q-inner-loading>
                </q-tab-panel>

                <q-tab-panel name="escrowed">
                    <div v-show="is_escrow_open">
                        <u-q-product-tiles 
                            :tile_details="escrowed_products">
                        </u-q-product-tiles>
                    </div>
                    <q-inner-loading :showing="!is_escrow_open">
                        <q-spinner-ball size="50px" color="primary" />
                    </q-inner-loading>
                </q-tab-panel>

                <q-tab-panel name="bartered">
                    <div v-show="is_barter_open">
                        <u-q-product-tiles 
                            :tile_details="bartered_products">
                        </u-q-product-tiles>
                    </div>
                    <q-inner-loading :showing="!is_barter_open">
                        <q-spinner-ball size="50px" color="primary" />
                    </q-inner-loading>
                </q-tab-panel>
            </q-tab-panels>
        </div>
    </div>
</template>

<script>
import { getUserProducts } from '../references/url';
import { QSpinnerBall, QInnerLoading } from 'quasar';
import UQPostedProductComponent from './UQPostedProductComponent';
import UQProductTiles from './global/UQProductTiles';

export default
{
    props: ['user_id'],
    data:() =>(
    {
        form_data:
        {
            status: 'available'
        },
        available_products: [],
        escrowed_products: [],
        bartered_products: [],
        is_available_open: false,
        is_escrow_open: false,
        is_barter_open: false,
        component_key: 0
    }),
    components: { QSpinnerBall, QInnerLoading, UQPostedProductComponent, UQProductTiles },
    async mounted()
    {
        await this.getUserProducts();
    },
    methods:
    {
        async getUserProducts()
        {
            let res = {};

            this.form_data.user_id = this.user_id;
            if (this.form_data.status === 'available' && !this.is_available_open)
            {
                res = await this.$_post(getUserProducts, this.form_data);
                this.available_products = res.data;
                this.is_available_open = true;
            }
            else if (this.form_data.status === 'escrowed' && !this.is_escrow_open)
            {
                res = await this.$_post(getUserProducts, this.form_data);
                this.escrowed_products = res.data;
                this.is_escrow_open = true;
            }
            else if (this.form_data.status === 'bartered' && !this.is_barter_open)
            {
                res = await this.$_post(getUserProducts, this.form_data);
                this.bartered_products = res.data;
                this.is_barter_open = true;
            }
        },

        async handleSuccess(product_type)
        {
            this.form_data.status = product_type;
            this.is_available_open = false;
            this.is_escrow_open = false;
            this.is_barter_open = false;
            await this.getUserProducts();
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
