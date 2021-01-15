<template>
  <div class="q-pa-md">
    <div class="q-gutter-md q-pa-md">
      <q-select filled v-model="status" :options="status_options" label="Select Status" @input="getItemsAvailable" />
    </div>
    <u-q-product-tiles :tile_details="item_info"></u-q-product-tiles>
  </div>
</template>
<script>
import { getItemByStatus } from "../references/url";
import UQProductTiles from './global/UQProductTiles';

export default {
  data () {
    return {
      item_info: null,
      status: '',
      status_options: ['pending', 'available', 'rejected', 'escrowed', 'bartered']
    }
  },
  components: { UQProductTiles },
  async mounted() {},
  methods: {
    async getItemsAvailable (value)
    {
      this.status = value;
      let item = {
        status: this.status
      }
      let items = await this.$_post(getItemByStatus, item);
      this.item_info = items.data;
      console.log(this.item_info)
    }
  }
}
</script>