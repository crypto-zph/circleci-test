<template>
  <div class="product_image_area">
    <div class="container">
      <h2 class="title products__title">
        <span class="title__bg font-rubik-title">Product Details</span>
      </h2>
      <div class="row q-col-gutter-xl">

        <!-- -----------------Image List------------------------------------ -->
        <div class="col-md-6 col-12">
          <div class="s_product_img">
            <div>
              <div class="q-pa-md">
                <product-zoomer></product-zoomer>
              </div>
            </div>
          </div>
        </div>
        <!-- -----------------Item Information------------------------------------ -->
        <div class="col-md-5 col-12">
          <div class="s_product_text">
            <q-item class="q-mb-sm">
              <q-item-section avatar>
                <q-avatar>
                  <img :src="item_info.seller_avatar" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ item_info.seller_name | toUpperCase }}</q-item-label>
                <q-item-label caption v-if="seller_review == 0">No Reviews</q-item-label>
                <q-item-label caption v-else>{{seller_review}} Reviews</q-item-label>
              </q-item-section>
              <q-item-section align="right">
                <div class="font-rubik-label text-h6" v-if="!item_info.is_garage_sale">BRT {{ Number(item_info.item_price.BRT) | toClientAmount(brt_decimal) }}</div>
                <div class="font-rubik-label text-h6" v-if="item_info.is_garage_sale">BRT {{ Number(item_info.item_price.BRT)-(Number(item_info.item_price.BRT)*item_info.garage_sale_percentage) | toClientAmount(brt_decimal) }}</div>
                <div>
                    <div>
                      Conversion Details 
                      <q-btn v-if="conversion_btn_open" icon="fas fa-chevron-down" size="8px" flat round @click="isShowDetails()"/> 
                      <q-btn v-if="conversion_btn_close" icon="fas fa-chevron-up" size="8px" flat round @click="isHideDetails()"/>
                    </div>
                     <div v-if="conversion_details">
                    PHP {{ Number(item_info.item_price.BRT) * convert['BRT'] / convert['PHP'] | $_toClientFiatAmount(9) }}
                    <q-icon name="fas fa-exchange-alt" />
                    USD {{ Number(item_info.item_price.BRT) * convert['BRT'] | $_toClientFiatAmount(9) }}
            </div>
                </div>
              </q-item-section>
            </q-item>
            <div class="row q-col-gutter-sm">
              
              <!-- Chat button -->
              <div class="card_area_1 col-6">
                <q-btn flat class="main_btn font-rubik-title full-width" @click="open('right')" style="border-radius: 7px">Chat</q-btn>
              </div>
              <!-- /chat button -->

              <div class="card_area col-6">
                
                 <q-btn flat v-if="is_saved == false" class="main_btn font-rubik-title full-width" :disabled="is_escrowed || is_bartered ? true : false" @click="addToCart" style="border-radius: 7px">
                  Add to Cart
                </q-btn>
                <q-btn flat v-else class="main_btn font-rubik-title full-width" :disabled="is_escrowed ? true : false" @click="removeToCart" style="border-radius: 7px">
                  Remove to Cart
                </q-btn>
              </div>

              <div v-if="is_reserved" class="card_area col-6">
                <q-btn flat class="main_btn font-rubik-title full-width" @click="confirmRelease" style="border-radius: 7px">Mark as Received</q-btn>
              </div>

              <div v-if="is_reserved" class="card_area_1 col-6">
                <q-btn flat class="main_btn font-rubik-title full-width" @click="confirmCancel" style="border-radius: 7px">Cancel Barter</q-btn>
              </div>

              <div v-else class="card_area_1 col-12">
                <q-btn flat v-if="!is_escrowed && !is_bartered" class="main_btn font-rubik-title full-width" :disabled="is_escrowed ? true : false" @click="showDisclaimer" style="border-radius: 7px">Barter Buy</q-btn>
                <q-btn flat v-else-if="is_bartered" disable class="main_btn font-rubik-title full-width" :disabled="true" style="border-radius: 7px">No Longer Available</q-btn>
                <q-btn flat v-else disable class="main_btn font-rubik-title full-width" :disabled="is_escrowed ? true : false" style="border-radius: 7px">Reserved</q-btn>
              </div>
              
            </div>

            <u-q-chat-dialog v-bind:id="prms" ref="chat"></u-q-chat-dialog>
            <h1 style="font-size: 30px" class="font-rubik-title">{{ item_info.item_name }}</h1>
            <h2 class="font-rubik-title">BRT {{ Number(item_info.item_price.BRT) | toClientAmount(brt_decimal) }}</h2>

           <!--  <h2 class="font-rubik-title">USD {{ item_info.item_price.USD }}</h2>
            <h2 class="font-rubik-title">PHP {{ item_info.item_price.PHP }}</h2> -->
            <ul class="list font-rubik-labels" style="list-style: none; font-weight: 500">
              <li>
                  <span><q-icon name="fas fa-th-large" class="q-mr-xs"/>Category</span>
                   : <b>{{ item_info.item_sub_category }}</b>
              </li>
              <li>
                  <span><q-icon name="fas fa-map-marker-alt" class="q-mr-xs"/>Location</span>
                  : <b>{{ item_info.location }}</b>
              </li>
              <li v-if="item_info.is_featured_product">
                  <span><q-icon name="fas fa-clock" class="q-mr-xs"/>Featured Duration</span>
                  : <b>{{ moment(item_info.featured_product_duration_to).format("YYYY-MM-DD HH:mm") }}</b>
              </li>

              <div v-if="item_info.is_garage_sale && !item_info.is_flash_deal">
                <li>
                    <span><q-icon name="fas fa-warehouse" class="q-mr-xs"/>Garage Sale</span>
                    : <b>{{ item_info.garage_sale_percentage*100 }}%</b>
                </li>

                <li>
                    <span><q-icon name="fas fa-money-bill" class="q-mr-xs"/>Price</span>
                    : <b>{{ Number(item_info.item_price.BRT)-(Number(item_info.item_price.BRT)*item_info.garage_sale_percentage) | toClientAmount(9) }}</b>
                </li>
              </div>

              <div v-if="item_info.is_flash_deal && item_info.is_garage_sale">
                <li>
                    <span><q-icon name="fas fa-percent" class="q-mr-xs"/>Flash Deal Percentage</span>
                    : <b>{{ Number(item_info.flash_deal_percentage) }} %</b>
                </li>

                <li>
                    <span><q-icon name="fas fa-wallet" class="q-mr-xs"/>Flash Deal Price</span>
                    : <b>BRT {{ Number(item_info.flash_deal_price) | toClientAmount(9) }}</b>
                </li>
              </div>

              <div v-if="item_info.is_flash_deal && !item_info.is_garage_sale">
                <li>
                    <span><q-icon name="fas fa-percent" class="q-mr-xs"/>Flash Deal Percentage</span>
                    : <b>{{ Number(item_info.flash_deal_percentage) }} %</b>
                </li>

                <li>
                    <span><q-icon name="fas fa-wallet" class="q-mr-xs"/>Flash Deal Price</span>
                    : <b>BRT {{ Number(item_info.flash_deal_price) | toClientAmount(9) }}</b>
                </li>
              </div>
              
            </ul>

            <p class="font-rubik-labels" style="font-weight: 400" v-html="item_info.item_description">
            </p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col-6" style="padding: 0 50px">
          <u-q-post-interact
            v-if="post.newsfeed._id"
            :post="post.newsfeed"
            @isCommentActive="UQPostInteractIsCommentActive"
            @showShareModal="showShareModal"
          >
          </u-q-post-interact >
          <q-separator />
          <div ref="post_comment_ref">
            <u-q-post-comment
              v-if="post.newsfeed._id"
              :post="post.newsfeed"
            >
            </u-q-post-comment>
          </div>
        </div>
      </div>
    </div>
    
      <h2 class="title products__title">
        <span class="title__bg font-rubik-title">Related Products</span>
      </h2>
    <u-q-related-products :product_id="$route.params.id"></u-q-related-products>
    
    <u-q-modal :modal_data="modal_data" ref="share_modal">
      <template v-slot:body>
        <div>
            You're going to share this post. Confirm to continue.
        </div>
        <textarea class="textarea-share" v-model="share.caption" name="" id="" placeholder="What do you want to say?">

        </textarea>
      </template>
      <template v-slot:footer="props">
                <q-btn label="share" style="background-color: #9a67ac; color: white;" @click="sharePost(props.data)" />
                <q-btn label="cancel" class="q-ml-sm" @click="closeModal('share_modal')" />
      </template>
    </u-q-modal>
  
    <div>
        <!-- <q-dialog v-model="is_show_legal_disclaimer">
            <div v-for="section in Object.keys(legal_disclaimer)">
                <div>{{ section }}</div>
            </div>
        </q-dialog> -->
        <q-dialog v-model="is_show_legal_disclaimer" persistent>
            <q-card class="q-pa-lg">
                <div class="text-center q-mb-md">
                    <div class="text-h6">
                        BEFORE YOU BARTER
                    </div>
                    <div>
                        (Legal Disclaimer)
                    </div>
                </div>

                <q-scroll-area style="height: 340px; max-width: 500px; width: 500px; border: solid grey 1px">
                    <q-img src="../../../../public/info.jpg" style="width: 100%" />
                    <div v-for="section in Object.keys(legal_disclaimer)" :key="section">
                        <q-card-section class="text-left q-pb-none">
                            <div>
                                {{ section }}
                            </div>
                        </q-card-section>
                        <q-card-section>
                            <p style="font-weight: 400" v-html="legal_disclaimer[section]" />
                        </q-card-section>
                    </div>
                </q-scroll-area>

                <div class="q-mt-md">
                    <q-checkbox v-model="check_one" :label="`Communication and meet-up should be done within ${item_info.escrow_duration} ${item_info.escrow_duration > 1 ? 'days' : 'day'} or else transaction will be cancelled.`" />
                </div>
                <div>
                    <q-checkbox v-model="check_two" label="Signed Deed of Sale is a requirement when necessary in barter." />
                </div>

                <div class="text-right q-mt-md q-gutter-x-sm">
                    <q-btn @click="confirmBarter" :class="check_one && check_two ? '' : 'disable'" color="secondary">
                        Proceed
                    </q-btn>
                    <q-btn v-close-popup outline color="secondary">Cancel</q-btn>
                </div>
            </q-card>
        </q-dialog>
    </div>

  </div>
</template>

<script>
import Swal from 'sweetalert2';
import ProductDetails from "./ProductDetails.css";
import ProductZoomer from "./ProductZoomer";
import UQModal from '../../../components/UQModal';
import UQChatDialog from "../../../components/global/UQChatDialog";
import LegalDisclaimer from "../../../references/legal_disclaimer";
import moment from "moment";
import { 
  getItem, 
  getCheckSavedItems, 
  postAddToCart, 
  postBarter, 
  postView, 
  deleteFromCart, 
  postReleaseAmount, 
  postCancelBarter,
  postSetCancelTimer,
  getConversion,
  postSharePostToGlobal
} from "../../../references/url";
import UQRelatedProducts from "../../../components/UQRelatedProducts"
import io from 'socket.io-client';
import UQPostInteract from '../../../components/UQPostInteract';
import UQPostComment from '../../../components/UQPostComment';

export default {
  components: {
    UQChatDialog,
    ProductZoomer,
    UQRelatedProducts,
    UQPostInteract,
    UQPostComment,
    UQModal
  },
    props: {
      product_id : String,
    },
  data: () => ({
    legal_disclaimer: LegalDisclaimer,
    is_show_legal_disclaimer: false,
    moment: moment,
    check_one: false,
    check_two: false,
    brt_decimal: 9,
    is_saved: false,
    is_escrowed: false,
    is_bartered: false,
    seller_review: 0,
    USD: '',
    PHP: '',
    conversion_details: {},
    post: {},
    item_info:
    {
      seller_id: "",
      seller_avatar: "",
      seller_name: "",
      item_id: "",
      item_name: "",
      item_price: {
        BRT: null
      },
      item_category: "",
      item_sub_category: "",
      item_description: "",
      location: "",
      item_image: [],
      is_garage_sale: false,
      garage_sale_percentage: null,
      is_featured_product: null,
      featured_product_duration_to: "",
      is_flash_deal: false,
      flash_deal_percentage: 0,
      flash_deal_price: 0
    },
    buyer_info:
    {
      buyer_id: "",
      buyer_first_name: "",
      buyer_last_name: "",
      status: ""
    },
    prms: '',
    socket: {},
    conversion_btn_open: true,
    conversion_btn_close: false,
    share : {
          caption    : ''
    },
    
    modal_data      : 
    {
        title: 'Share post',
        data: {},
    },
    convert: []
    }),
  computed: 
  {
    is_reserved()
    {
      return this.is_escrowed && this.$static_user_info && this.$static_user_info._id === this.item_info.buyer_id;
    }
  },
  methods: {
    //chat purpose
    open (position) {

      this.socket.emit('initiate_chat', { is_active: true, product_id: this.$route.params.id });
      return;// Note: do not remove this return code (Gam)
      console.log(product_id, 'product_id' )
      this.$refs.chat.open(position);
      // alert(position)
      this.prms = this.$route.params.id;
    },
    //end of chat purpose

    async getItem()
    {
      let id = this.$route.params.id;
      let item = await this.$_get(`${getItem}/${id}`);
      let convert = await this.$_post(getConversion);
      let BRT;
      // console.log('item.data')
      console.log(item)
      
      this.item_info.seller_id = item.data.item._id;
      // console.log(this.item_info)
      this.item_info.seller_avatar = `http://localhost:4000/public/${item.data.item.gender}/${item.data.item.avatar_path}`;
      this.item_info.seller_name = `${item.data.item.seller_first_name} ${item.data.item.seller_last_name}`;
      this.seller_review = item.data.item.total_reviews;
      this.item_info.item_id = item.data.item._id;
      this.item_info.item_price.BRT = item.data.item.price.BRT.$numberDecimal;
      this.item_info.item_name = item.data.item.item_name;
      this.item_info.item_category = item.data.item.category;
      this.item_info.item_sub_category = item.data.item.sub_category;
      this.item_info.item_description = item.data.item.description;
      this.item_info.location = item.data.item.location;
      this.item_info.item_image = item.data.item.item_image;
      this.item_info.buyer_id = item.data.item.buyer_id;
      this.item_info.is_garage_sale = item.data.item.is_garage_sale;
      this.item_info.garage_sale_percentage = item.data.item.garage_sale_percentage;
      this.item_info.is_featured_product = item.data.item.is_featured_product;
      this.item_info.featured_product_duration_to = item.data.item.featured_product_duration_to;
      this.item_info.escrow_duration = item.data.item.escrow_duration;
      this.item_info.is_flash_deal = item.data.item.is_flash_deal;
      this.item_info.flash_deal_percentage = item.data.item.flash_deal_percentage;
      this.item_info.flash_deal_price = item.data.item.flash_deal_price;

      if (item.data.item.is_garage_sale)
      {
        BRT = item.data.item.price.BRT.$numberDecimal-(item.data.item.price.BRT.$numberDecimal*item.data.item.garage_sale_percentage);
        }
      else
      {
        BRT = item.data.item.price.BRT.$numberDecimal;
      }

      this.USD = this.toClientAmount(BRT, 9) * (convert.data.XAU/convert.data.USD);
      this.PHP = this.toClientAmount(BRT, 9) * (convert.data.XAU/convert.data.PHP);

      this.post = {
        // _id   : item.data.newsfeed_id,
        // data  : item.data
        ...item.data
      }

      // console.log(item.data)

      // console.log('this.post')
      // console.log(this.post)

    },

    async showShareModal(val)
    {
        this.$refs['share_modal'].show();
        this.modal_data.data = val;
    },

    async sharePost(post)
    {

        let request = {
            original_post   : post.post_type.original_post,
            post_type       : post.post_type.type,
            caption         : {
                                original: post.caption.original,
                                share   : this.share.caption
                            }
        }

        let share_post_res_obj = await this.$_post(postSharePostToGlobal,
        {
            ...request
        });

        this.closeModal('share_modal');
    },

    async closeModal(modalRef)
    {
        this.$refs[modalRef].hide();
    },

    toClientAmount(amount, decimals)
    {
      let value = amount/10 ** decimals;
      return value;
    },

    async checkSavedItem ()
    {
      let id = {
        id: this.$route.params.id,
        buyer_id: this.buyer_info.buyer_id
      };
      
      let item = await this.$_post(getCheckSavedItems, id);
      if (item.data == "")
      {
        this.is_saved = false;
      }
      else
      {
        this.is_saved = true;
      }
      
    },

    async checkBarteredItem ()
    {
      let id = this.$route.params.id;
      let bartered = await this.$_get(`${getItem}/${id}`);
      let status = bartered.data.status;

      if (status == "escrowed")
      {
        this.is_escrowed = true;
      }
      else if (status == "bartered")
      {
        this.is_bartered = true;
      }

    },

    async addToCart()
    {
      let price = {
        BRT : Number(this.item_info.item_price.BRT)-(Number(this.item_info.item_price.BRT)*this.item_info.garage_sale_percentage),
      };

      let save_item = 
      {
        seller_id: this.item_info.seller_id,
        buyer_id: this.buyer_info.buyer_id,
        item_id: this.item_info.item_id,
        item_name: this.item_info.item_name,
        item_image: this.item_info.item_image,
        item_category: this.item_info.item_category,
        item_price: price
      }

      this.$q.loading.show();
      let added = await this.$_post(postAddToCart, save_item);
      console.log(added);
      if (added)
      {
        this.$q.notify('Added To Cart.');
        this.is_saved = true;
      }
      this.$q.loading.hide();
    },

    async removeToCart()
    {
      let id = {
        id: this.$route.params.id,
        buyer_id: this.buyer_info.buyer_id
      };
      this.$q.loading.show();
      let remove = await this.$_post(deleteFromCart, id);
      console.log(remove);
      if (remove) {
        this.is_saved = false;
      }
      this.$q.loading.hide();
    },

    showDisclaimer () 
    {
        this.is_show_legal_disclaimer = true;
    },

    confirmBarter () 
    {
        if(this.check_one && this.check_two)
        {
            this.is_show_legal_disclaimer = false;
            this.barter();
        }
    },

    confirmRelease () 
    {
      this.$q.dialog({
        title: 'Confirmation',
        message: 'Are you sure you received this item? The process cannot be undone.',
        cancel: true,
        persistent: true
      }).onOk(() => {
        console.log('OK');
        this.releaseAmount();
      }).onCancel(() => { 
        console.log('Cancel');
      });
    },

    confirmCancel () 
    {
      this.$q.dialog({
        title: 'Confirmation',
        message: 'Are you sure you want to cancel your barter? The process cannot be undone.',
        cancel: true,
        persistent: true
      }).onOk(() => {
        console.log('OK');
        this.cancelBarter();
      }).onCancel(() => { 
        console.log('Cancel');
      });
    },

    async barter()
    {
      let buyer_info = {
        item_id: this.item_info.item_id,
        duration: this.item_info.escrow_duration,
        seller_id: this.item_info.seller_id
      }
      this.$q.loading.show();
      let barter = await this.$_post(postBarter, buyer_info);
      
      if (barter)
      {
        if (this.is_saved)
        {
          await this.removeToCart();
        }
        // this.$q.dialog({ title: `Success Message`, message: "Item Bartered Successfully!" });
        Swal.fire({
          title: 'Congratulations!',
          icon: 'success',
          text: 'Item Bartered Successfully!',
          showCloseButton: true,
          showCancelButton: true,
          confirmButtonText: 'View Escrowed Products',
          cancelButtonText: 'Shop More',
          allowOutsideClick: false
        }).then((result) => 
        {
          if (result.isConfirmed) 
          {
            this.$router.push({ name: "products_history" });
          } 
          else if (result.isDismissed) 
          {
            this.$router.push({ name: 'front_landing' });
          }
        })
        await this.getItem();
        this.is_saved = false;
        this.is_escrowed = true;
      }
      this.$q.loading.hide();
    },

    async releaseAmount()
    {
      let seller_info = {
        item_id: this.item_info.item_id,
        seller_id: this.item_info.seller_id
      }
      this.$q.loading.show();
      let release = await this.$_post(postReleaseAmount, seller_info);

      if (release)
      {
        this.$q.dialog({ title: `Success Message`, message: "Marked as Received!" });
      }
      this.$q.loading.hide();
      this.$router.push({name: 'front_landing'});
    },

    async cancelBarter()
    {
      let buyer_info = {
        item_id: this.item_info.item_id
      }
      this.$q.loading.show();
      let cancel = await this.$_post(postCancelBarter, buyer_info);
      
      if (cancel)
      {
        this.$q.dialog({ title: `Success Message`, message: "Barter was Cancelled!" });
        await this.getItem();
        await this.checkSavedItem();
        await this.checkBarteredItem();
        this.is_saved = false;
        this.is_escrowed = false;
      }
      this.$q.loading.hide();
    },

    async views ()
    {
      let id = 
      {
        id: this.$route.params.id,
        buyer_id: this.$static_user_info ? this.$static_user_info._id : null
      }

      let view = await this.$_post(postView, id);
    },

    async isUserLoggedIn()
    {
        let user = await this.$_isUserAuthenticated();
        let user_data = user.data.user;
        this.buyer_info.buyer_id = user_data._id;
        this.buyer_info.buyer_first_name = user_data.first_name;
        this.buyer_info.buyer_last_name = user_data.last_name;
    },

    async UQPostInteractIsCommentActive(val)
    {
        if(val.is_active == true)
        {
          this.$refs['post_comment_ref'].style.display = "none";
        }
        else
        {
          this.$refs['post_comment_ref'].style.display = "block";
        }
    },
    isShowDetails() {
      this.conversion_details = true;
      this.conversion_btn_open = false;
      this.conversion_btn_close = true;
    },
    isHideDetails() {
      this.conversion_details = false;
      this.conversion_btn_open = true;
      this.conversion_btn_close = false;
    },
  },
  async mounted () {
    await this.isUserLoggedIn();
    await this.getItem();
    await this.checkSavedItem();
    await this.checkBarteredItem();
    await this.views();
    let conversion = await this.$_getConversionRates();
    this.convert = conversion.data;
    // Chat purpose
    this.socket = io('http://localhost:4000', {transports: ['websocket', 'polling', 'flashsocket']});
    // end of chat purpose
  },
  filters: {
    toUpperCase(words)
    {
      return words.toUpperCase();
    },
    toClientAmount(amount, decimals)
    {
      let value = amount/10 ** decimals;
      return value.toLocaleString('en-US', { maximumFractionDigits: decimals });
    }
  }
};
</script>

<style>
.textarea-share
{
    width: 100%;
    height: 103px;
    border-radius: 5px;
    border: 1px solid #9a67ac;
}

.textarea-share:focus
{
    outline: none !important;
    border: 2px solid #9a67ac;
}

    .disable{
        opacity: 0.5;
        cursor: auto;
    }
</style>
