<template>
  <div>
    <div class="content">
      <!-- QR Code -->
      <div class="text-center">
        <img
          :src="`https://chart.googleapis.com/chart?cht=qr&chl=${selected_currency.public_key}&chs=300x300`"
          alt="wallet address"
        />
      </div>

      <!-- Wallet Address -->
      <div>
        <q-input
          readonly
          outlined
          type="text"
          :label="`${selected_currency.currency_abbreviation} Wallet Address`"
          v-model="selected_currency.public_key"
        >
          <div style="display: flex; justify-content: center; margin: 10px">
            <q-btn @click="copy()" color="secondary" label="Copy" />
          </div>
        </q-input>
      </div>

      <!-- Tool Tip -->
      <div v-if="is_copy_clipboard">
        <q-tooltip v-model="is_copy_clipboard">
          {{ selected_currency.currency_abbreviation }} Wallet Address Copied !
        </q-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import { copyToClipboard } from "quasar";

export default {
  props: ["selected_currency"],

  data: () => ({
    is_copy_clipboard: false,
  }),

  async mounted() {},

  methods: {
    async copy() {
      copyToClipboard(this.selected_currency.public_key).then(() => {
        this.is_copy_clipboard = true;
      });

      setTimeout(() => {
        this.is_copy_clipboard = false;
      }, 2000);
    },
  },
};
</script>

<style>
</style>