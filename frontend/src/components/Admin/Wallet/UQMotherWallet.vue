<template>
  <div class="q-pa-md" :class="!$q.dark.isActive? '':'MTH_wallet_bg'">
    <div class="row">
      <!-- Column 4   Send / Receive -->
      <div v-if="res" class="col-md-3 col-12">
        <u-q-mother-currency-list
          :res="res"
          :mother_index="index"
          @success="fromUQMotherCurrencyList"
          @sent="reRender"
          :key="motherKey"
        >
        </u-q-mother-currency-list>
      </div>

      <!-- Column 8   History -->
      <div class="col-md-9 col-12">
        <u-q-mother-history 
          :res="res"
          :currency_details="currency_details"
        >
        </u-q-mother-history>
      </div>
      <!--
        :key="componentKey" -->
    </div>
  </div>
</template>

<script>
import UQMotherCurrencyList from "./UQMotherCurrencyList";
import UQMotherHistory from "./UQMotherHistory";

export default {
  components: {
    UQMotherCurrencyList,
    UQMotherHistory,
  },

  data: () => ({
    res: null,
    currency_details: {},
    // componentKey: 0,
    motherKey: 0,
    index: 0,
  }),

  async mounted() {
    await this.$_adminMainMounted();
    await this.admin_data();
  },

  methods: {
    async admin_data() {
      this.res = this.$admin_res;
    },

    async fromUQMotherCurrencyList(currency_details) {
      this.currency_details = currency_details;
      // this.componentKey++
    },

    async reRender(index) {
      this.index = index;
      await this.$_adminMainMounted();
      this.res = this.$admin_res;
      this.motherKey++;
    },
  },
};
</script>

<style>
  .wallet_isDark {
    color: black;
    background: black;
  }
  .MTH_wallet_bg {
    box-shadow: 0px 0px 0px 1000px black;
    background: black
  }
</style>