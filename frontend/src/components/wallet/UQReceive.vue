<template>
    <div>
	    <!-- content -->
	    <div class='content text-left'>
        <!-- Currency Name -->
        <div class="q-mb-md">
          <span style="font-size: 20px; font-weight: bold;">{{ wallet_obj.currency_name }}</span>
        </div>

        <!-- Wallet Address -->
        <div>
          <q-input 
            readonly 
            outlined 
            type="text"
            :label="`${wallet_obj.currency_abbreviation} Wallet Address`"
            v-model="wallet_obj.public_key"
          >
            <!-- Copy Button -->
            <div style="display: flex; justify-content: center; margin: 10px;">
              <q-btn @click="copy()" color="cyan-10" label="Copy" />
            </div>
          </q-input>
        </div>

        <!-- Tool Tip w/ condition -->
        <div v-if="is_copy_clipboard">
          <q-tooltip
            v-model="is_copy_clipboard"
          >
            {{ wallet_obj.currency_abbreviation }} Wallet Address Copied !
          </q-tooltip>
        </div>

      </div>
    </div>
</template>

<script>
import { copyToClipboard } from "quasar";

export default
{
  data:() => (
  {
    is_copy_clipboard: false,
    wallet_obj: {},
  }),
  async mounted()
  {
    await this.$_mainMounted(); // call this.$res for outputs
    // console.log('UQReceive', this.$mixin_res)
    this.array_find();
  },
  methods:
  {
    async array_find()
    {
      this.wallet_obj = this.$mixin_res.user_info.wallet.find(x => x.currency_abbreviation == 'BRT');
    },

    async copy() {
      copyToClipboard(this.wallet_obj.public_key)
        .then(() => {
          this.is_copy_clipboard = true;
      });

      setTimeout(() => {
        this.is_copy_clipboard = false;
      }, 2000);
    },

  }
}
</script>

<style>

</style>