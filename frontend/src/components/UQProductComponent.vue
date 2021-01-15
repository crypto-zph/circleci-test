<template>
    <div>
        <div v-for="product in products" :key="product._id" class="q-my-lg" style="font-weight: 400">
            <q-item class="q-pl-none q-mb-md">
                <q-item-section avatar>
                    <!-- <q-avatar>
                        <img :src="`http://localhost:4000/public/${product.seller_id.avatar}`">
                    </q-avatar> -->
                    <q-avatar v-if="product.seller_id.avatar.length > 100">
                        <img :src="`data:image/jpg;base64,${product.seller_id.avatar}`">
                    </q-avatar>
                    <q-skeleton v-else type="QAvatar" />
                </q-item-section>
                <q-item-section>
                    <q-item-label caption><strong class="text-black">{{ product.seller_first_name }}</strong></q-item-label>
                    <q-item-label caption>
                        {{ product.seller_id.ratings | toRating }}
                        <i class="fas fa-star text-yellow-7"></i>
                    </q-item-label>
                </q-item-section>
            </q-item>

            <div class="row q-col-gutter-none">
                <div class="col-3">
                    <q-card class="my-card" flat bordered>
                        <q-card-section horizontal>
                            <!-- <q-img
                                class="col"
                                src="`http://localhost:4000/public/normal_size/${product.item_image[0]}`"
                            /> -->
                            <!-- <a :href="`/#/product/details/${product._id}`"> -->
                                <!-- <q-card-section style="cursor: pointer;"> -->
                                    <q-img v-if="product.item_image[0].length > 100" class="img-shadow view" style="border-radius: 5%; position:relative;" :src="`data:image/jpg;base64,${product.item_image[0]}`">
                                        <div class="product__tiles__overlay">
                                            <div class="product__tiles__border">
                                                <div class="view__details" style="'font-size: 15px">
                                                    View
                                                </div>
                                            </div>
                                        </div>
                                    </q-img>
                                    <q-skeleton v-else height="140px" width="100%" square />
                                <!-- </q-card-section> -->
                            <!-- </a> -->
                        </q-card-section>
                    </q-card>
                </div>
                <div class="col-3 self-center text-center">
                    <div><strong>{{ product.item_name }}</strong></div>
                    <div>{{ product.category }}</div>
                </div>
                <div class="col-3 self-center text-center">
                    <strong>Conversion Details</strong>
                    <q-btn v-if="conversion_btn_open" icon="fas fa-chevron-down" size="8px" flat round @click="isShowDetails(product._id)"/> 
                    <q-btn v-if="conversion_btn_close" icon="fas fa-chevron-up" size="8px" flat round @click="isHideDetails(product._id)"/>
                    <div v-if="conversion_details">
                        <div>
                            {{ product.escrowed_price | $_toClientAmount(9) }} BRT
                        </div>
                        <div>
                            {{ product.escrowed_price * convert['BRT'] / convert['PHP'] | $_toClientFiatAmount(9) }} PHP
                        </div>
                        <div>
                            {{ product.escrowed_price * convert['BRT'] | $_toClientFiatAmount(9) }} USD
                        </div>
                    </div>
                </div>
                <div class="col-3 self-center text-center">
                    <div v-if="product.is_garage_sale || product.is_flash_deal" class="text-strike text-grey-7 q-ml-sm" style="font-weight: 500 !important">
                        {{ product.price.BRT.$numberDecimal | $_toClientFiatAmount(9) }} BRT
                    </div>
                    <div>
                        {{ product.price.BRT.$numberDecimal | $_toSalePrice(product.is_garage_sale, product.is_flash_deal, product.garage_sale_percentage, product.flash_deal_percentage) }} BRT
                    </div>
                </div>
            </div>

            <q-separator class="q-mt-sm" />

            <div class="text-right q-mt-sm">
                Order Total: 
                <span class="q-ml-md">
                    {{ product.price.BRT.$numberDecimal | $_toSalePrice(product.is_garage_sale, product.is_flash_deal, product.garage_sale_percentage, product.flash_deal_percentage) }} BRT
                </span>
            </div>

            <q-separator class="q-mt-sm" />

            <div v-if="product_type === 'escrowed'" class="text-right q-mt-sm">
                
                <div v-if="!product.is_pending_cancel" class="q-gutter-x-sm">
                    <q-btn 
                        @click="confirmRelease(product._id, product.seller_id._id, product.buyer_id)" 
                        color="secondary">
                        Mark as Received
                    </q-btn>
                    <q-btn
                        @click="confirmCancel(product._id, product.seller_id._id)" 
                        outline 
                        color="red-4">
                        Cancel Barter
                    </q-btn>
                </div>
                <div v-else>
                    <q-btn
                        outline 
                        readonly
                        no-caps
                        color="red-4">
                        Waiting for Seller Confirmation
                    </q-btn>
                </div>

            </div>
            <div v-if="product_type === 'bartered'" class="text-right q-mt-sm">
                
                <q-btn 
                    :to="`/user/details/${product.seller_id._id}`"
                    @click="changeRatePopup(product.seller_id.reviewers, $static_user_info._id)"
                    color="secondary">
                    {{ product.seller_id.reviewers | toLabel($static_user_info._id) }}
                </q-btn>

            </div>
            <div v-if="product_type === 'cancelled'" class="text-right q-mt-sm">
                
                <q-btn 
                    @click="confirmBarter(product._id, product.escrow_duration, product.seller_id._id)" 
                    color="secondary">
                    Barter Buy
                </q-btn>

            </div>
        </div>
    </div>
</template>

<script>
import { 
getProductsHistory, 
postBarter, 
postReleaseAmount, 
postCancelBarter, 
postSetCancelTimer,
postNotifyCancel
} from '../references/url';
import { QSpinnerBall, QInnerLoading } from 'quasar';
import Swal from 'sweetalert2';

export default
{
    props: ['products', 'product_type', 'convert'],
    data:() =>({
        conversion_details: false,
        conversion_btn_open: true,
        conversion_btn_close: false,
    }),
    components: { QSpinnerBall, QInnerLoading },
    async mounted()
    {
    },
    methods:
    {
        confirmBarter (item_id, escrow_duration, seller_id) {
          this.$q.dialog({
            title: 'Confirmation',
            message: 'Would you like to barter this Item?',
            cancel: true,
            persistent: true
          }).onOk(() => {
            console.log('OK');
            this.barter(item_id, escrow_duration, seller_id);
          }).onCancel(() => { 
            console.log('Cancel');
          });
        },

        confirmRelease (item_id, seller_id) {
          this.$q.dialog({
            title: 'Confirmation',
            message: 'Click "Proceed" to confirm receipt of the product.',
            ok: 'Proceed'
          }).onOk(() => {
            this.releaseAmount(item_id, seller_id);
          })
        },

        confirmCancel (item_id, seller_id, buyer_id) {
          this.$q.dialog({
            title: 'Confirmation',
            message: 'Are you sure you want to cancel your barter? The process cannot be undone.',
            cancel: true,
            persistent: true
          }).onOk(() => {
            console.log('OK');
            this.cancelBarter(item_id);
          }).onCancel(() => { 
            console.log('Cancel');
          });
        },

        async barter(item_id, escrow_duration, seller_id)
        {
          let buyer_info = {
            item_id: item_id,
            duration: escrow_duration,
            seller_id: seller_id
          }

          this.$q.loading.show();
          let barter = await this.$_post(postBarter, buyer_info);
          
          if (barter)
          {
            this.$q.dialog({ title: `Success Message`, message: "Item Bartered Successfully!" });
          }
          this.$emit('success', true);
          this.$q.loading.hide();
        },

        async releaseAmount(item_id, seller_id)
        {
          let seller_info = {
            item_id: item_id,
            seller_id: seller_id
          }
          this.$q.loading.show();
          let release = await this.$_post(postReleaseAmount, seller_info);

          if (release)
          {
            // this.$q.dialog({ title: `Success Message`, message: "Marked as Received!" });
            Swal.fire({
                icon: 'success',
                title: 'Marked as Received!',
                text: 'Please Rate Seller',
                confirmButtonText: `Okay`,
                allowOutsideClick: false
            })
            .then((result) => 
            {
                if (result.isConfirmed) 
                {
                    this.$emit('success', 'bartered');
                }
            })
          }
          this.$q.loading.hide();
        },

        async cancelBarter(item_id, seller_id, buyer_id)
        {
          let buyer_info = {
            item_id: item_id,
            seller_id: seller_id,
            buyer_id: buyer_id
          }
          console.log(buyer_info)
          this.$q.loading.show();
          let cancel = await this.$_post(postNotifyCancel, buyer_info);
          
          if (cancel)
          {
            this.$q.dialog({ title: `Success Message`, message: "Barter was Cancelled!" });
          }
          this.$emit('success', true);
          this.$q.loading.hide();
        },

        changeRatePopup(reviewers, user_id)
        {
            if(!reviewers.includes(user_id))
            {
                this.$store.commit('user/changeRatePopup', true);
            }
        },
        isShowDetails(item_id) {
          this.conversion_details = true;
          this.conversion_btn_open = false;
          this.conversion_btn_close = true;
        },
        isHideDetails(item_id) {
          this.conversion_details = false;
          this.conversion_btn_open = true;
          this.conversion_btn_close = false;
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
        toRating(rate_obj)
        {
            let ratings_container = {};
            ratings_container.one = rate_obj.one * 1;
            ratings_container.two = rate_obj.two * 2;
            ratings_container.three = rate_obj.three * 3;
            ratings_container.four = rate_obj.four * 4;
            ratings_container.five = rate_obj.five * 5;

            let total_stars = Object.values(ratings_container).reduce((x, y) => x + y);
            let total_user_rate = Object.values(rate_obj).reduce((x, y) => x + y);

            let average_rate = 
                (total_stars / total_user_rate)
                .toLocaleString('en-US', 
                { 
                    minimumFractionDigits: 1, 
                    maximumFractionDigits: 1 
                });

            if (isNaN(average_rate)) 
            {
                return 0;
            } 
            else 
            {
                return average_rate;
            }
        },
        toLabel(reviewers, user_id)
        {
            if(reviewers.includes(user_id))
            {
                return 'View More Products'
            }
            else
            {
                return 'Rate Seller'
            }
        }
    }
}
</script>
<style>
.my-card {
width: 100%;
max-width: 250px;
}
</style>
