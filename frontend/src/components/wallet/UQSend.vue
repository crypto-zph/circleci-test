<template>
  <!-- content -->
  <div class='content text-center'>

    <!-- Transaction -->
    <div v-if="!res">
      <!-- Currency Name -->
      <div class="q-mb-md">
        <span style="font-size: 20px; font-weight: bold;">{{ wallet_obj.currency_name }}</span>
      </div>

      <!-- Balance -->
      <div class="q-mb-md">
        <label style="font-size: 17px; font-weight: bold;">Balance:</label>
        <span style="font-size: 17px;">
          {{ 
            (wallet_obj.balance / 10 ** wallet_obj.decimal_places).toLocaleString('en-US', {
            maximumFractionDigits: wallet_obj.decimal_places }) + "  " + wallet_obj.currency_abbreviation
          }}
        </span>
      </div>

      <!-- Inputs -->
      <q-form @submit="send()">
        <div>
          <q-input v-model="form_data.receiver_public_key" outlined label="Wallet Address"/>
        </div>
        <div class="q-my-md">
          <q-input 
            type="number" 
            v-model.number="form_data.amount" 
            label="Amount"
            outlined
            lazy-rules
            :rules="[val => val <= (wallet_obj.balance / 10 ** wallet_obj.decimal_places) || 'Insufficient Balance']"
          />
        </div>
        <div class="q-mb-md">
          <q-input v-model="form_data.remarks" outlined label="Remarks"/>
        </div>
        <div>
          <q-btn color="cyan-10" type="submit" label="Send"/>
        </div>
      </q-form>
    </div>

    <!-- Receipt -->
    <div v-else>
      <div>
        <span style="font-size: 19px;">{{ res.description }}</span>
      </div>

      <div>
        <label style="font-size: 17px; font-weight: bold;">Current Balance: </label>
        <span style="font-size: 17px;">
          {{ 
            (res.balance_after / 10 ** res.decimal_places).toLocaleString('en-US', { 
              maximumFractionDigits: res.decimal_places })
            + "  " + res.currency_abbreviation
          }}
        </span>
      </div>

      <div>
        <label style="font-size: 17px; font-weight: bold;">Date: </label>
        <span style="font-size: 17px;">{{ moment(res.date_created).tz("Asia/Singapore").format("MMM-DD-YYYY") }}</span>
      </div>

      <div>
        <label style="font-size: 17px; font-weight: bold;">Time: </label>
        <span style="font-size: 17px;">{{ moment(res.date_created).tz("Asia/Singapore").format("hh:mm A") }}</span>
      </div>

      <div class="q-mb-md">
        <label style="font-size: 17px; font-weight: bold;">Reference Number: </label>
        <span style="font-size: 17px;">{{ res.reference_number }}</span>
      </div>

      <div>
        <q-btn @click="backToSendForm()" label="OK" color="cyan-10" />
      </div>
    </div>
  </div>
</template>

<script>
import { postWalletSend } from '../../references/url';
import moment from "moment-timezone";

export default
{
  data:() => (
  {
    moment: moment,
    form_data: {
      receiver_public_key: '',
      amount: null,
      remarks: '',
    },
    wallet_obj: {},
    res: null,
  }),
  async mounted()
  {
    await this.$_mainMounted(); // call this.$res for outputs
    // console.log('UQSend', this.$mixin_res)
    this.array_find();
  },
  methods:
  {
    async array_find()
    {
      this.wallet_obj = this.$mixin_res.user_info.wallet.find(x => x.currency_abbreviation == 'BRT');
    },

    async send()
    {
      this.form_data.currency_abbreviation = 'BRT';

      this.$q.loading.show();
      let res = await this.$_post(postWalletSend, this.form_data);
      this.$q.loading.hide();

      this.form_data = {};
      this.res = res.data.data;
    },

    async backToSendForm()
    {
      this.wallet_obj.balance = this.res.balance_after;
      this.res = null;
    },

  }
}
</script>

<style>

</style>