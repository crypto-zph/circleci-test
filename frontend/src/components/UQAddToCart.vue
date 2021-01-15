<template>
  <div class="font-rubik-labels">
    <div class="text-center">
      <div class="text-bold q-py-md" style="font-size: 24px">
        Your Shopping Cart
      </div>
      <div style="font-weight: 400">
        Total Item ({{ saved_items.length }})
      </div>
    </div>
    <div class="padding__main">
      <div class="text-right BRT__titleMobile" style="margin-right: 100px">
        BRT
      </div>
      <q-separator />
      <div v-for="(items, i) in saved_items" :key="i">
        <div class="row q-mt-sm" style="cursor: pointer">
          <div class="col-2">
            <img style="width: 150px" :src="`http://localhost:4000/public/normal_size/${items.item_image}`" />
          </div>
          <div class="col-md-3 col-10 self-center column__title">
            <div class="margin__title">
              <div class="text-bold">
                {{ items.item_name }}
              </div>
              <div class="text-grey-8">
                {{ items.category }}
              </div>
            </div>
          </div>
          <div class="col-md-3 col-6 self-center" style="font-weight: 300">
            <div class="text-center">
            <div>
              Conversion Details 
              <q-btn v-if="conversion_btn_open" icon="fas fa-chevron-down" size="8px" flat round @click="isShowDetails()"/> 
              <q-btn v-if="conversion_btn_close" icon="fas fa-chevron-up" size="8px" flat round @click="isHideDetails()"/>
            </div>
            <div v-if="conversion_details">
              PHP {{ parseFloat(items.PHP).toFixed(2) | toClientAmount(0) }} <q-icon name="fas fa-exchange-alt" /> USD {{ parseFloat(items.USD).toFixed(2) | toClientAmount(0) }}
            </div>

             <!-- Don't remove this is a spacings from here to -->


             <div v-if="conversion_spacings" style="visibility: hidden">
              PHP 10,000 <q-icon name="fas fa-exchange-alt" /> USD 200
            </div>


            <!-- here -->

            
          </div>
          </div>
          <div class="col-md-3 col-6 mobile__align self-center" style="font-weight: 400">
            BRT {{ items.price.BRT.$numberDecimal | toClientAmount(9) }}
          </div>
          <div class="col-1 text-right self-center mobile__hideBtn">
            <q-btn size="10px" icon="close" round flat @click="removeItem(items)">
              <q-tooltip content-class="bg-accent">
                Remove Item
              </q-tooltip>
            </q-btn>
          </div>
        </div>
        <q-separator />
      </div>
      <div class="q-mt-md" style="font-weight: 400">
        Subtotal: <span class="text-bold">{{ totalBRT | toClientAmount(9) }}</span>
      </div>
      <div>
        Conversion Details
         <q-btn v-if="conversion_btn_open" icon="fas fa-chevron-down" size="8px" flat round @click="isShowDetails()"/> 
         <q-btn v-if="conversion_btn_close" icon="fas fa-chevron-up" size="8px" flat round @click="isHideDetails()"/>
      </div>
       <div v-if="conversion_details">
        PHP {{ parseFloat(totalPHP).toFixed(2) | toClientAmount(0)  }} <q-icon name="fas fa-exchange-alt" /> USD {{ parseFloat(totalUSD).toFixed(2) | toClientAmount(0)  }}
      </div>

      <!-- Don't remove this is a spacings from here to -->

       <div v-if="conversion_spacings" style="visibility: hidden;">
        PHP 50,000 <q-icon name="fas fa-exchange-alt" /> USD 1000
      </div>

      <!-- here -->

      <div>
        <q-btn label="Checkout" @click="checkOut" flat class="bg-secondary text-white q-mr-md btn__widthSize" />
        <q-btn label="Continue Shopping" outline color="secondary" class="btn__widthSize padding__onTop" />
      </div>
    </div>
  </div>
</template>

<script>
import { getSavedItems, deleteFromCart, deleteAllFromCart, postBarter, getConversion } from "../references/url";

export default {
  data: () => ({
    model: 1,
    conversion_details: false,
    conversion_spacings: true,
    conversion_btn_open: true,
    conversion_btn_close: false,
    saved_items: '',
    buyer_info:
    {
        buyer_id: "b1",
        buyer_first_name: "Test",
        buyer_last_name: "Sample",
        status: "escrowed"
    }
  }),
  components: {},
  async mounted() {
    await this.isUserLoggedIn();
    await this.fetchSavedItems();
  },
  methods:
  {
    isShowDetails() {
      this.conversion_details = true;
      this.conversion_spacings = false;
      this.conversion_btn_open = false;
      this.conversion_btn_close = true;
    },
    isHideDetails() {
      this.conversion_details = false;
      this.conversion_spacings = true;
      this.conversion_btn_open = true;
      this.conversion_btn_close = false;
    },
    // async convertToUSD(value)
    // {
    //     let conversion = await this.$_post(getConversion);
    //     let convert = conversion.data;

    //     let USD = value * (convert.XAU/convert.USD);

    //     return USD;

    // },
    // async convertToPHP(value)
    // {
    //     let conversion = await this.$_post(getConversion);
    //     let convert = conversion.data;

    //     let PHP = value * (convert.XAU/convert.PHP);

    //     return PHP;

    // },
    async fetchSavedItems()
    {
        let buyer = {
            buyer_id: this.buyer_info.buyer_id
        }

        let items = await this.$_post(getSavedItems, buyer);
        let convert = await this.$_post(getConversion);

        // let convert = await this.convertToDecimal(items.data.saved_items[0].price.BRT.$numberDecimal, 9);
        
        this.saved_items = items.data.saved_items;

        for (let i = 0; i < this.saved_items.length; i++)
        {
          this.saved_items[i].USD = await this.convertToDecimal(this.saved_items[i].price.BRT.$numberDecimal, 9) * (convert.data.XAU/convert.data.USD);
          this.saved_items[i].PHP = await this.convertToDecimal(this.saved_items[i].price.BRT.$numberDecimal, 9) * (convert.data.XAU/convert.data.PHP);
        }

        console.log(this.saved_items)
        
    },
    convertToDecimal(amount, decimals)
    {
        let value = amount/10 ** decimals;
        return value;
    },
    async checkNumber(number)
    {
        let result = (number - Math.floor(number)) !== 0;

        if (result)
        {
            return "decimal";
        }
        else{
            return "whole";
        }
    },
    async removeItem(details)
    {    
        this.isHideDetails()

        let item = {
            id: details.item_id, 
            buyer_id: details.buyer_id
        }

        this.$q.loading.show()
        let remove = await this.$_post(deleteFromCart, item);
        this.$q.loading.hide()
        await this.fetchSavedItems();
    },
    async checkOut()
    {
        //change status to escrowed
        this.$q.loading.show();

        for (let i = 0; i < this.saved_items.length; i++) {
            let item_info = {
                item_id: this.saved_items[i].item_id,
                buyer_id: this.buyer_info.buyer_id,
                buyer_first_name: this.buyer_info.buyer_first_name,
                buyer_last_name: this.buyer_info.buyer_last_name,
                status: this.buyer_info.status
            };
            
            await this.$_post(postBarter, item_info);

            console.log(item_info);
        }

        //remove to cart
        
        let buyer_info = {
            buyer_id: this.buyer_info.buyer_id
        }

        let remove_all = await this.$_post(deleteAllFromCart, buyer_info);

        if(remove_all)
        {
            this.$q.dialog({ title: `Success Message`, message: "Successfully Escrowed" });
        }

        await this.fetchSavedItems();

        this.$q.loading.hide(); 


    },
    async isUserLoggedIn()
    {
        let user = await this.$_isUserAuthenticated();
        let user_data = user.data.user;
        this.buyer_info.buyer_id = user_data._id;
        this.buyer_info.buyer_first_name = user_data.first_name;
        this.buyer_info.buyer_last_name = user_data.last_name;
    },
  },
  computed: {
      totalBRT: function() {

          if (this.saved_items.length === 0)
          {
              return 0;
          }
          else
          {
              return this.saved_items.reduce(function (total, value) {
                  return total + Number(value.price.BRT.$numberDecimal);
              }, 0);
          }
          
      },
      totalUSD: function() {

          if (this.saved_items.length === 0)
          {
              return 0;
          }
          else
          {
              return this.saved_items.reduce(function (total, value) {
                  return total + Number(value.USD);
              }, 0);
          }
          
      },
      totalPHP: function() {

          if (this.saved_items.length === 0)
          {
              return 0;
          }
          else
          {
              return this.saved_items.reduce(function (total, value) {
                  return total + Number(value.PHP);
              }, 0);
          }
          
      },
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