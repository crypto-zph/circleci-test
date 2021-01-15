<template>
    <div class="q-pa-md row items-start q-gutter-md">
        <q-card style="width: 100%" v-if="time !== 0">
            <q-card-section horizontal>
                <q-card-actions align="left" style="width: 50%">
                    <!-- <q-knob
                        :max="8"
                        show-value
                        class="text-purple-4 q-pa-xs"
                        v-model="hours"
                        size="50px"
                        center-color="purple-1"
                        color="purple-4"
                        track-color="purple-2"
                    />
                    <q-knob
                        :max="60"
                        show-value
                        class="text-purple-4 q-pa-xs"
                        v-model="minutes"
                        size="50px"
                        center-color="purple-1"
                        color="purple-4"
                        track-color="purple-2"
                    />
                    <q-knob
                        :max="60"
                        show-value
                        class="text-purple-4 q-pa-xs"
                        v-model="seconds"
                        size="50px"
                        center-color="purple-1"
                        color="purple-4"
                        track-color="purple-2"
                    /> -->

                            <!-- <div>
          <h2>
              <span class="title__bg font-rubik-title">Flash Deal</span>
          </h2>
      </div> -->
                    <div class="title__bg font-rubik-title">F⚡ash Deals</div>
                    <div class="text-overline" v-if="days !== 0">day(s)</div>
                    <span class="flip-clock flip-clock__piece flip-clock__slot" v-if="days !== 0">{{ days }}</span>
                    <span class="flip-clock flip-clock__piece flip-clock__slot">{{ hours }}</span> :
                    <span class="flip-clock flip-clock__piece flip-clock__slot">{{ minutes }}</span> :
                    <span class="flip-clock flip-clock__piece flip-clock__slot">{{ seconds }}</span>
                </q-card-actions>

                <q-card-actions align="right" style="width: 50%">
                    <q-btn align="right" size="md" color="secondary" @click="addToFlashDeal()">Add Product</q-btn>
                    <q-btn outline color="secondary" size="md" @click="$router.push({name: 'documentation_flash_deal'})">View Alls</q-btn>
                </q-card-actions>
            </q-card-section>
            <q-separator />
            <q-card-section v-if="!isEmpty(flash_deal_items)">
                <div class="q-gutter-y-md" >
                    <u-q-product-tiles :tile_details="flash_deal_items" :user_data="user_data" :is_flash_deal="true"></u-q-product-tiles>
                </div>
            </q-card-section>
        </q-card>

                <hr style="border: 0;
                  height: 1px;
                  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));">

        <!-------------------------------------------------- ADD TO FLASH DEAL DIALOG -------------------------------------------------->
        <q-dialog v-model="add_product_modal" >
            <q-card class="my-card" style="width: 50%">
                <q-card-section bordered class="bg-secondary text-white row items-center">
                    <div class="text-h6">Add To Flash Deal</div>
                    <q-space />
                    <q-btn icon="close" flat round dense @click="close()" />
                </q-card-section>

                <q-card-section class="q-gutter-md">
                    <q-select
                        outlined
                        v-model="selected_item"
                        use-input
                        hide-selected
                        fill-input
                        input-debounce="0"
                        :options="options"
                        label="Select Item"
                        @filter="filterFn"
                        @input="selectedItem"
                    >
                        <template v-slot:no-option>
                            <q-item>
                                <q-item-section class="text-grey">
                                No results
                                </q-item-section>
                            </q-item>
                        </template>
                    </q-select>
                </q-card-section>
                <q-card-section class="q-gutter-xs">
                    <div>Original Price : {{ original_price }} BRT</div>
                </q-card-section>

                <q-card-section class="q-gutter-xs">
                    <q-input
                        color="blue-grey-14"
                        :value="flash_deal_discount"
                        label="Flash Deal Discount Percentage"
                        outlined
                        type="text"
                        suffix="%"
                        input-class="text-right"
                        :disable="disable"
                        :rules="validatePercentage"
                        ref="flash_deal_percentage"
                        @keyup="updatePrice"
                    />
                </q-card-section>

                <q-card-section class="q-gutter-xs">
                    <q-input
                        outlined
                        :value="flash_deal_price"
                        label="Flash Deal Discounted Price"
                        mask="#.##"
                        fill-mask="0"
                        reverse-fill-mask
                        input-class="text-right"
                        :disable="disable"
                        @keyup="updatePercentage"
                    />
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn color="purple-4" @click="addItemToFlashDeal()" :disable="buttonDisable">Add</q-btn>
                </q-card-actions>
            </q-card>
        </q-dialog>
        <!---------------------------------------------- END OF ADD TO FLASH DEAL DIALOG ---------------------------------------------->

        <u-q-login :is_login_page="is_login_page" ref="login_modal"></u-q-login>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import moment from "moment";
import UQLogin  from './UQLogin';
import UQProductTiles from './global/UQProductTiles';
import { getFlashDealTime, getHomepageFlashDeals, getFlashDeals, getFlashDealsBySellerId, postAddToFlashDeal, isGarageSaleItem } from '../references/url';

export default {
    components: { UQLogin, UQProductTiles },
    data: () =>
    ({
        time: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        add_product_modal: false,
        is_login_page: false,
        is_logged_in: false,
        selected_item: null,
        flash_deal_discount: 0,
        items: [],
        options: [],
        stringOptions: [],
        original_price: 0,
        flash_deal_price: 0,
        disable: true,
        buttonDisable: true,
        total_time: 0,
        item_id: '',
        flash_deal_items: [],
        user_data: {},
    }),
    computed:
    {
        validatePercentage (val)
        {
            return [
                val => !!val || `Flash Deal Percentage is required`,
                val => Number.isFinite(Number(val)) || "The value must be an integer number",
                val => val < 101 || `Flash Deal Percentage must not be greater than 100`,
                val => val > 0 || `Flash Deal Percentage must not be less than 0`,
            ];
        },
    },
    mounted ()
    {
        this.setTimer();
        this.isUserLoggedIn();
        this.getHomepageFlashDeals();
    },
    methods:
    {
        async getHomepageFlashDeals()
        {
            let items = await this.$_get(getHomepageFlashDeals);
            if (items.data.status == 'success' && items.data.data.length > 0) {
                this.flash_deal_items = items.data.data;
                console.log(this.flash_deal_items)
            }
        },

        async isUserLoggedIn()
        {
            let user = await this.$_isUserAuthenticated();

            if (user.data.status == 'authenticated') {
                this.user_data = user.data.user;
                this.is_logged_in = true;

                await this.getFlashDealsBySellerId();
            }
        },

        async getFlashDealsBySellerId()
        {
            let items = await this.$_get(getFlashDealsBySellerId);
            this.items = items.data.data.length > 0 ? items.data.data : [];

            if (this.items.length > 0) {
                for (let counter = 0; counter < this.items.length; counter++) {
                    this.stringOptions.push(this.items[counter].item_name);
                }
            }

            this.options = this.stringOptions
        },

        async addToFlashDeal ()
        {
            if (this.is_logged_in) {
                this.add_product_modal = true;
            } else {
                this.$refs['login_modal'].show();
            }
        },

        async addItemToFlashDeal()
        {
            let form_data =
            {
                item_id: this.item_id,
                flash_deal_percentage: this.flash_deal_discount,
                flash_deal_price: this.flash_deal_price
            };

            this.$q.loading.show();

            let add = await this.$_post(postAddToFlashDeal, form_data);

            this.stringOptions = [];

            await this.getFlashDealsBySellerId();
            await this.getHomepageFlashDeals();
            this.close();
            this.$q.loading.hide();
        },

        filterFn (val, update, abort)
        {
            update(() => {
                const needle = val.toLocaleLowerCase()
                this.options = this.stringOptions.filter(v => v.toLocaleLowerCase().indexOf(needle) > -1)
            })
        },

        async selectedItem(val)
        {
            this.selected_item = val;

            for (let counter = 0; counter < this.items.length; counter++) {
                if (this.items[counter].item_name == val) {
                    this.item_id = this.items[counter]._id;

                    // check if item is on garage sale
                    let item = await this.$_get(`${isGarageSaleItem}/${this.item_id}`);

                    if (item.data.status == 'success' && item.data.is_garage_sale) {
                        Swal.fire(
                            {
                                title: `Item is on Garage Sale, do you still want to proceed?`,
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes',
                            })
                            .then(
                                async result =>
                                {
                                    if (result.isConfirmed) {
                                        this.original_price = this.items[counter].price.BRT.$numberDecimal;
                                    } else {
                                        this.selected_item = '';
                                        this.original_price = 0;
                                    }
                                }
                            );
                    } else {
                        this.original_price = this.items[counter].price.BRT.$numberDecimal;
                    }
                }
            }

            this.disable = this.selected_item ? false : true;
        },

        updatePrice(event)
        {
            let t = event.target.value;
            event.target.value = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3)) : t;

            let percentage = event.target.value;
            this.flash_deal_discount = percentage;

            if (percentage && Number.isFinite(Number(percentage)) && (percentage < 101 ) && (percentage > 0 )) {
                this.buttonDisable = false;
            } else {
                this.buttonDisable = true;
            }

            this.flash_deal_price = (this.original_price - ((percentage/100) * this.original_price)).toLocaleString('en', { useGrouping : false, minimumFractionDigits : 2 });
        },

        updatePercentage (val)
        {
            let new_price = event.target.value;
            this.flash_deal_price = new_price;
            this.flash_deal_discount = Math.round(((this.original_price - new_price) / new_price) * 10000) / 100;
        },

        async setTimer () {
            let time = await this.$_get(getFlashDealTime); // 28800 - 8 hours
            this.time = (time.data.time);

            if (time !== 0) {
                var now = moment(new Date().getTime()); //todays date
                var end = moment(this.time); // another date
                var duration = moment.duration(end.diff(now));
                let interval = 1000;

                setInterval(() => {
                    duration        = moment.duration(duration - interval, 'milliseconds');
                    this.total      = duration;
                    this.days       = duration.days();
                    this.hours      = duration.hours();
                    this.minutes    = duration.minutes();
                    this.seconds    = duration.seconds();
                }, interval);
            }
        },

        close ()
        {
            this.selected_item = '';
            this.original_price = 0;
            this.flash_deal_price = 0;
            this.flash_deal_discount = 0.00;

            this.add_product_modal = false;
        },

        isEmpty(obj)
        {
            return typeof obj === 'undefined' || Object.keys(obj).length === 0;
        }
    }
}

</script>

<style>
.flip-clock {
  text-align: center;
  perspective: 400px;
  margin: 20px auto;
  color: #ccc;
  background: #9A67AC;
  padding: 0.15em 0.15em;
  border-radius: 0.15em ;
  transform-style: preserve-3d;
  width: 1.4em;
  transform: translateZ(0);
}

.flip-clock__piece {
  display: inline-block;
  margin: 0 5px;
}

.flip-clock__slot {
  font-size: 1.5vw;
}

.swal2-container {
    z-index: 1000000;
}
</style>