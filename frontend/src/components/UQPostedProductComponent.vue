<template>
    <div>
        <div class="row q-col-gutter-md">
            <div class="col-sm-3 col-6" v-for="product in user_products" :key="product._id">
                <q-card class="my-card">
                  <div class="row">
                    <div class="col-3">
                      <div class="q-pa-xs">
                        <q-avatar size="35px">
                          <img src="profile-imgs/boy-dp1.jpg" style="border: 1px solid #9A67AC"/>
                        </q-avatar>
                      </div>
                    </div>
                    <div class="col-9 text-left">
                      <div class="text-bold">{{ product.seller_id.username }}</div>
                      <div caption class="text-grey-6">5 min ago</div>
                    </div>
                  </div>
                  <img src="products/product_07.jpg">
                  <q-card-section class="q-px-sm">
                    <div style="font-size: 13px;" class="item__title text-bold">
                      {{ product.item_name }}
                    </div>
                    <div class="text-subtitle2 text-grey-6" style="font-weight: 300">
                      <q-icon size="12px" name="fas fa-map-marker-alt" />
                      <span style="font-size: 12px">{{ product.location }}</span>
                    </div>
                    <div class="text-subtitle2 text-bold">
                      BRT {{ product.price.BRT.$numberDecimal | toSalePrice(product.is_garage_sale, product.is_flash_deal, product.garage_sale_percentage, product.flash_deal_percentage) }}
                      <span v-if="product.is_garage_sale || product.is_flash_deal" class="text-strike text-grey-7 q-ml-sm" style="font-weight: 500 !important">
                        BRT {{ product.price.BRT.$numberDecimal | $_toClientAmount(9) }} 
                      </span>
                    </div>
                  </q-card-section>
                </q-card>
            </div>
        </div>
    </div>
</template>

<script>
import { QSpinnerBall, QInnerLoading } from 'quasar';
import Swal from 'sweetalert2';

export default
{
    props: ['user_products'],
    data:() =>({
    }),
    components: { QSpinnerBall, QInnerLoading },
    async mounted()
    {
    },
    methods:
    {
    },
    computed: 
    {

    },
    filters: 
    {
    }
}
</script>
<style>
.my-card {
width: 100%;
max-width: 250px;
}
</style>
