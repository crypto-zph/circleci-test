<template>
  <div  class="q-pa-xl"  :class="$q.dark.isActive ? 'header_dark' : 'header_normal'">
    <div class="row">
      <!-- Column 4   Send / Receive -->
      <div v-if="res" class="col-md-3 col-12">
        <u-q-client-currency-list
          :res="res"
          :mother_index="index"
          @success="fromUQMotherCurrencyList"
          @sent="reRender"
          :key="motherKey"
        >
        </u-q-client-currency-list>
      </div>

      <!-- Column 8   History -->
      <div class="col-md-9 col-12">
        <div class="carousel__desktop">
         <q-carousel
        style="height: 200px; border-radius: 10px"
        class="carousel__container q-ml-md"
          animated
          v-model="slide"
          infinite
          :autoplay="autoplay"
          arrows
          transition-prev="slide-right"
          transition-next="slide-left"
        >
          <q-carousel-slide :name="1" img-src="promos/promo-banner.jpg" />
          <q-carousel-slide :name="2" img-src="promos/promo-banner.jpg" />
          <q-carousel-slide :name="3" img-src="promos/promo-banner.jpg" />
          <q-carousel-slide :name="4" img-src="promos/promo-banner.jpg" />
        </q-carousel>
      </div>
        <u-q-client-history 
          :res="res"
          :currency_details="currency_details"
        >
        </u-q-client-history>
      </div>
      <!--
        :key="componentKey" -->
        
        <!-- <h1 v-scroll="scrolled">{{scroll}}</h1> -->
    </div>
  </div>
</template>

<script>
import UQClientCurrencyList from "./UQClientCurrencyList";
import UQClientHistory from "./UQClientHistory";

export default {
  components: {
    UQClientCurrencyList,
    UQClientHistory,
  },

  data: () => ({
    res: null,
    currency_details: {},
    // componentKey: 0,
    motherKey: 0,
    index: 0,
    slide: 1,
    autoplay: true,
    scroll: null
  }),

  async mounted() {
    await this.$_mainMounted();
    await this.client_data();
  },

  methods: {
    async client_data() {
      this.res = this.$mixin_res;
    },

    async fromUQMotherCurrencyList(currency_details) {
      this.currency_details = currency_details;
      // this.componentKey++
    },

    async reRender(index) {
      this.index = index;
      await this.$_mainMounted();
      this.res = this.$mixin_res;
      this.motherKey++;
    },

  },
};
</script>

<style>
  @media (max-width: 700px) {
    .carousel__desktop {
      display: none
    }
  }
  /* Dark Mode */
.header_normal {
  background-color: rgb(242, 245, 250);
  color: black;
  box-shadow: 10px 10px 5px grey;
  border-radius: 20px
   
}
.header_dark {
  /* background: linear-gradient(145deg, rgb(61, 14, 42) 15%, rgb(14, 43, 78) 70%); */
  background-color: #010101f2;
}
</style>