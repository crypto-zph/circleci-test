<template>
        <q-card  class="my-card q-mx-auto q-my-md" :style="is_search_route == true ? 'min-width: 290px; height: 450px; border-radius: 2%' : 'min-width: 300px; height: 550px;' " style="border-radius: 1%;" >
            <div v-if="sale_percentage" class="ribbon ribbon-top-right"><span>SALE</span></div>
            <!--    USER AVATAR    -->
            <q-item>
                <q-item-section  avatar>
                    <q-avatar v-if="!!seller_id.avatar_path">
                            <img :src="`http://localhost:4000/public/${seller_id.gender}/${seller_id.avatar_path}`"></img>
                    </q-avatar>
                     <q-skeleton v-else type="QAvatar" />
                </q-item-section>

                <q-item-section>

                  <q-item-label>
                      <a v-if="!!username" :href="user_data._id != seller_id._id ? `/#/user/details/${seller_id._id}` : `/#/profile`"  :style="$q.dark.isActive ? 'color:white' : 'color:black'" style="text-decoration: none;">{{ username }}</a>
                    <q-skeleton v-else type="text" />
                      </q-item-label>
                  <q-item-label caption :style="$q.dark.isActive ? 'color:grey' : 'color:grey'">
                      <div v-if="!!time">
                           <span>{{ time | fromNow }}</span>
                      </div>
                    <q-skeleton v-else type="text" />
                  </q-item-label>
                </q-item-section>
            </q-item>
            <!--    /USER AVATAR    -->


            <!--    IMAGE    -->
            <q-card-section>
                <a :href="`/#/product/details/${product_id}`">
                <q-card-section style="cursor: pointer;">
                    <q-img v-if="image != false" class="img-shadow view" style="border-radius: 5%; position:relative;" :src="`http://localhost:4000/public/normal_size/${image}`">
                    <div class="product__tiles__overlay">
                        <div class="product__tiles__border">
                            <div class="view__details" :style="is_search_route == true ? 'font-size: 15px' : ''">View</div>
                        </div>
                    </div>
                    </q-img>
                    <q-skeleton style="cursor: pointer;" v-else height="140px" square />
                </q-card-section>
                </a>
            </q-card-section>
            <!--    /IMAGE    -->


            <!-- CONTENTS -->
            <q-card-section>
              <div>
                <div class=" text-h6 ellipsis row">
                    <div v-if="product_name.length >= 18" class="col" :style="is_search_route == true ? 'font-size: 1rem' : ''">
                         {{ product_name | rawTextNameProduct }}...
                    </div>
                    <div v-else class="col" :style="is_search_route == true ? 'font-size: 1rem' : ''">
                          {{ product_name}}
                    </div>
                    <div class="col text-right" :class="is_search_route == true ? 'q-mr-xs' : 'q-mr-md'" :disabled="isDisabledWishlist">
                        <a class="favorite" @click="updateWishlist($event)" :id="product_id">
                            <i :class="wishlist" aria-hidden="true"></i>
                        </a>
                    </div>
                    <!-- <q-skeleton v-else  type="text" /> -->
                </div>
                <div class="text-h6 text-grey">
                    <q-icon name="place" />
                    <span v-if="location.length != 0">
                            <span class="q-ml-sm" style="font-size: 15px;" :style="is_search_route == true ? 'font-size: 13px' : ''"> {{ location }}</span>
                    </span>
                    <q-skeleton v-else  type="text" />
                </div>
                <div class="text-subtitle1">
                    <div v-if="sale_price.length != 0">
                        BRT {{ sale_price | toClientAmount(9) }}
                        <div style="display:flex;">
                            <div style="text-decoration: line-through; font-size: 0.75rem; width: 65%; text-align: right; margin-right: 5%;">
                                BRT {{ price | toClientAmount(9)}}
                            </div>
                            <div style="width: 35%; text-align: left; font-size: 1.5rem; font-weight: bold; color: #FDB81F;">
                            {{ sale_percentage * 100 }} %
                            </div>
                        </div>
                    </div>
                    <div v-else-if="price.length != 0">
                        BRT {{ price | toClientAmount(9)}}
                    </div>
                     <q-skeleton v-else  type="text" />
                </div>
                <!-- <div class="row">
                    <div v-if="description.length >= 20"  class="col text-caption text-grey ">
                          {{ description | rawText }}...
                    </div>
                    <div v-else class="col text-caption text-grey ">
                          {{ description }}
                    </div>
                    <div class="col text-right" :class="is_search_route == true ? 'q-mr-xs' : 'q-mr-md'">
                        <q-btn rounded color="secondary" class="text-white" :style="is_search_route == true ? 'font-size: 0.68em' : ''">Add to cart</q-btn>
                    </div>
                </div> -->
                <div class="row">
                    <div class="col ">
                        <q-badge outline color="secondary" label="Excellent" />
                    </div>
                    <div class="col text-right" :class="is_search_route == true ? 'q-mr-xs' : 'q-mr-md'">
                        <!-- <q-btn rounded color="secondary" class="text-white" :style="is_search_route == true ? 'font-size: 0.68em' : ''">Add to cart</q-btn> -->
                        <u-q-add-to-cart
                        :btn_is_rounded='true'
                        :class="btn_is_fullscreen"
                        :btn_has_color_purple="color_red"
                        :add_to_cart_data='add_to_cart_data'
                        :item_id='product_id'
                        >
                        </u-q-add-to-cart>
                    </div>
                </div>
              </div>
              </q-card-section>
            <!-- /CONTENTS -->
            <u-q-login :is_login_page="is_login_page" ref="login_modal"></u-q-login>
        </q-card>
</template>

<script>
import { postCreateUpdateWishlist } from '../../references/url';
import UQLogin  from './../UQLogin';
import UQCardCss from './UQCard.css';
import UQAddToCart from "../global/UQAddToCartButton"
import moment from 'moment';
    export default
    {
        props: [
            'username',
            'time',
            'avatar',
            'image',
            'product_name',
            'price',
            'location',
            'description',
            'product_id',
            'seller_id',
            'user_data',
            'sale_price',
            'sale_percentage',
            'category'
        ],
        components: { UQLogin, UQAddToCart },
        data:() =>(
        {
            is_login_page : false,
            form_data: {
                item_id : ''
            },
            wishlist: 'far fa-heart',
            is_search_route: false,
            user: {},
            add_to_cart_data: {},
            color_red: 'secondary',
            isDisabledWishlist: false,
        }),
         async mounted()
        {
           await this.isUserLoggedIn()
           await this.changeWishlistButtonClass();
           await this.checkRoute();
        },
        methods:
        {
            async isUserLoggedIn()
            {
                let user = await this.$_isUserAuthenticated();
                this.user = user.data.user;
                this.add_to_cart_data = {
                    product_name : this.product_name,
                    seller_id : this.seller_id._id,
                    price : this.price,
                    image : this.image,
                    category : this.category,
                    garage_sale_percentage: this.sale_percentage,
                    product_id: this.product_id
                }

                if (this.user._id == this.seller_id._id) {
                    this.isDisabledWishlist = true;
                }
            // }
            },
            async updateWishlist(event)
            {
                if (!this.isEmpty(this.user)) {
                    let target_id = event.currentTarget.id;
                    this.form_data.item_id = this.product_id;
                    this.$q.loading.show();
                    let wishlist = await this.$_post(postCreateUpdateWishlist, this.form_data);
                    let action = 'add';
                    if (this.wishlist == 'fas fa-heart') {
                        action = 'delete';
                    }
                    if (action == 'delete') {
                        this.$emit('remove', this.product_id);
                    }
                    this.wishlist = (this.wishlist == 'fas fa-heart' && target_id == this.form_data.item_id) ? 'far fa-heart' : 'fas fa-heart';
                    // alert(this.wishlist)
                    this.$q.loading.hide();
                } else {
                    this.$refs['login_modal'].show();
                }
            },
            changeWishlistButtonClass()
            {
                if (!this.isEmpty(this.user)) {
                    this.wishlist = (this.user.wishlist.length && this.user.wishlist.includes(this.product_id)) ? 'fas fa-heart' : 'far fa-heart';
                }
            },
            isEmpty(obj)
            {
                return typeof obj === 'undefined' || Object.keys(obj).length === 0;
            },
            async checkRoute()
            {
                this.is_search_route = (this.$route.name == 'search_page' || this.$route.name == 'front_wishlist') ? true : false;
                // alert(this.is_search_route)
            }
        },
        filters:
        {
            fromNow(time_ago)
            {
                return moment(time_ago).fromNow();
            },
            rawText(text)
            {
                return text.replace(/<\/?[^>]+(>|$)/g, " ").substring(0, 20);
            },
            rawTextNameProduct(text)
            {
                return text.replace(/<\/?[^>]+(>|$)/g, " ").substring(0, 18);
            },
            toClientAmount(amount, decimals)
            {
                let value = amount / 10 ** decimals;
                return value.toLocaleString('en-US', {maximumFractionDigits: decimals})
            }
        }
    }
</script>

<style>
.img-shadow
{
    -webkit-box-shadow: 0 3px 20px rgba(34, 48, 53, 0.81) !important;
    box-shadow: 0 3px 20px rgba(34, 48, 53, 0.81) !important;
}
.view:hover .product__tiles__overlay
{
    opacity: 1;
}
.product__tiles__overlay
{
  position: absolute;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
  opacity: 0;
  width: 100%;
  height: 100%;
  padding: 10px;
  border-radius: 5%;
}
.product__tiles__border
{
  border: 2px solid white;
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  color: white;
  font-family: 'Oswald', sans-serif;
  letter-spacing: 2px;
  font-size: 25px;
}
.view__details{
    text-decoration: none;
    color: white;
}
.favorite {
    font-size: 30px;
    color:  #FDB81F !important;
    cursor: pointer;
    width: 30px;
    margin: auto;
}
</style>