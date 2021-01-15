<template>
    <div class="transaction__container">
        <h3 class="font-rubik-title title__text" style=" color: #C37C33">Transactions</h3>
        <q-separator/>
        <br><br>
        <h4 class="font-rubik-title">Reviews</h4>
        <div class="q-py-md">
        <q-tabs
          v-model="reviews"
          dense
          no-caps
          class="text-grey bg-white font-rubik-title"
          active-color="primary"
          indicator-color="primary"
          align="left"
          narrow-indicator
        >
          <q-tab class="q-px-lg" name="review">To Be Reviewed ({{transactions_count}})</q-tab>
          <q-tab class="q-px-lg" name="history">History ({{transactions_count}})</q-tab>
        </q-tabs>
        </div>

        <q-tab-panels v-model="reviews" animated>
          <q-tab-panel name="review">
              <div class="q-pa-sm">
              <p class="font-rubik-lables text-grey-7">
            Barterd On {{barter_date}}
            </p>
            <div class="row">
                <div class="col-1.5 q-mr-md">
            <q-img style="height: 80px; width: 80px" src="products/product_06.jpg"></q-img>
                </div>
                <div class="col-6">
                    <p class="font-rubik-label text-bold">2012 Audi R8 V8<br><span class="text-weight-light">{{categorie}}</span></p>
                </div>
                   <q-separator id="desktop__vertical" vertical />
                  <div class="col-6.5 q-ml-md">
                      <br id="mobile__vertical"><q-separator id="mobile__vertical" /><br id="mobile__vertical">
                      <p class="font-rubik-labels" style="font-weight: 500">Barter by <span class="text-blue text-bold" href="" style="cursor: pointer">{{seller_name}}</span><br><br>Rate Seller<br>   <q-rating
                            v-model="ratingModel"
                            size="2em"
                            :max="5"
                            color="primary"
                            >
                            <template v-slot:tip-1>
                                <q-tooltip>bad</q-tooltip>
                            </template>
                            <template v-slot:tip-2>
                                <q-tooltip>Not bad</q-tooltip>
                            </template>
                            <template v-slot:tip-3>
                                <q-tooltip>Good</q-tooltip>
                            </template>
                               <template v-slot:tip-4>
                                <q-tooltip>Very good!</q-tooltip>
                            </template>
                               <template v-slot:tip-5>
                                <q-tooltip>Nice!</q-tooltip>
                            </template>
                            </q-rating></p>
                  </div>
            </div>
              </div>
          </q-tab-panel>


    <!-- History -->
          <q-tab-panel name="history">
                    <div class="q-pa-sm">
              <p class="font-rubik-lables text-grey-7">
            Barterd On {{barter_date}}
            </p>
            <div class="row">
                <div class="col-1.5 q-mr-md">
            <q-img style="height: 80px; width: 80px" src="products/product_06.jpg"></q-img>
                </div>
                <div class="col-6">
                    <p class="font-rubik-label text-bold">2012 Audi R8 V8<br><span class="text-weight-light">{{categorie}}</span></p>
                </div>
                   <q-separator id="desktop__vertical" vertical />
                  <div class="col-6.5 q-ml-md">
                      <br id="mobile__vertical"><q-separator id="mobile__vertical" /><br id="mobile__vertical">
                      <p class="font-rubik-labels" style="font-weight: 500">Barter by <span class="text-blue text-bold" href="" style="cursor: pointer">{{seller_name}}</span><br><br>Rate Seller<br>   <q-rating
                            v-model="ratingModel"
                            size="2em"
                            :max="5"
                            color="primary"
                            >
                            <template v-slot:tip-1>
                                <q-tooltip>bad</q-tooltip>
                            </template>
                            <template v-slot:tip-2>
                                <q-tooltip>Not bad</q-tooltip>
                            </template>
                            <template v-slot:tip-3>
                                <q-tooltip>Good</q-tooltip>
                            </template>
                               <template v-slot:tip-4>
                                <q-tooltip>Very good!</q-tooltip>
                            </template>
                               <template v-slot:tip-5>
                                <q-tooltip>Nice!</q-tooltip>
                            </template>
                            </q-rating></p>
                  </div>
            </div>
              </div>
          </q-tab-panel>
        </q-tab-panels>



        <br><br>



           <h4 class="font-rubik-title">Orders</h4>
        <div class="q-py-md">
        <q-tabs
          v-model="orders"
          no-caps
          dense
          class="text-grey bg-white font-rubik-title"
          active-color="primary"
          indicator-color="primary"
          align="left"
          narrow-indicator
        >
          <q-tab class="q-px-lg" name="all">All ({{transactions_count}})</q-tab>
           <q-tab class="q-px-lg" name="receive">To Receive ({{transactions_count}})</q-tab>
        </q-tabs>
        </div>

        <q-tab-panels v-model="orders" animated>
          <q-tab-panel name="all">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

             <q-tab-panel name="receive">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
    </div>
</template>

<script>
import Transactions from './Transactions.css';
export default {
  data () {
    return {
      reviews: 'review',
      orders: 'all',
      transactions_count: '10',
      barter_date: '27 AUG 2020',
      categorie: 'Car: Audi',
      seller_name: 'Jan Nicole',
       ratingModel: ' '
    }
  },
  components: {
  },
  methods: {
    modal_show() {
      this.$refs.modal_ref.modal_show();
    },
    modal_show_proceed() {
      this.$refs.modal_ref_2.modal_show();
    },
  },
}
</script>