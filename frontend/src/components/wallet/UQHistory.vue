<template>
    <div>
	    <!-- content -->
	    <div class='content text-center'>
        <!-- Currency Name -->
        <div>
          <span style="font-size: 20px; font-weight: bold;">Baristocrat</span>
        </div>

        <!-- Transactions List -->
        <div v-for="txn in history_arr" :key="txn._id" class="q-my-md">
            <div style="border: 2px solid gray">
                <div>
                    <span>{{ txn.description }}</span>
                </div>
                <div>
                    <label style="font-weight: bold;">Previous Balance: </label>
                    <span>
                        {{ 
                            (txn.balance_before / 10 ** txn.decimal_places).toLocaleString('en-US', {
                                maximumFractionDigits: txn.decimal_places })
                            + "  " + txn.currency_abbreviation
                        }}
                    </span>
                </div>
                <div>
                    <label style="font-weight: bold;">Running Balance: </label>
                    <span>
                        {{ 
                            (txn.balance_after / 10 ** txn.decimal_places).toLocaleString('en-US', { 
                                maximumFractionDigits: txn.decimal_places })
                            + "  " + txn.currency_abbreviation
                        }}
                    </span>
                </div>
                <!-- <div>
                    <div v-if="txn.transaction_type == 'send internal'">
                        <label>*Minus_Icon*</label>
                        <span>
                            {{ 
                                (txn.amount / 10 ** txn.decimal_places).toLocaleString('en-US', { 
                                    maximumFractionDigits: txn.decimal_places })
                                + "  " + txn.currency_abbreviation
                            }}
                        </span>
                    </div>
                    <div v-else-if="txn.transaction_type == 'receive internal'">
                        <label>*Plus_Icon*</label>
                        <span>
                            {{ 
                                (txn.amount / 10 ** txn.decimal_places).toLocaleString('en-US', { 
                                    maximumFractionDigits: txn.decimal_places })
                                + "  " + txn.currency_abbreviation
                            }}
                        </span>
                    </div>
                </div> -->
                <div>
                    <label style="font-weight: bold;">Reference: </label>
                    <span class="q-mr-sm">{{ txn.reference_number }}</span>
                </div>
                <div>
                    <label style="font-weight: bold;">Date: </label>
                    <span class="q-mr-sm">{{ moment(txn.date_created).tz("Asia/Singapore").format("MMM-DD-YYYY - hh:mm A") }}</span>
                </div>
            </div>
        </div>

        <!-- See more button -->
        <div>
            <q-btn @click="gethistory(3)" color="cyan-10" label="See more" />
        </div>

      </div>
    </div>
</template>

<script>
import { postWalletHistory } from '../../references/url';
import moment from "moment-timezone";

export default
{
  data:() => (
  {
    moment: moment,
    skip: 0,
    history_arr: [],
  }),
  async mounted()
  {
    this.gethistory(0);
  },
  methods:
  {
    async gethistory(num)
    {
        this.skip = this.skip + num;
        let query_inputs = {
            currency_abbreviation: "BRT",
            skip: this.skip
        }
        let res = await this.$_post(postWalletHistory, query_inputs);
        this.history_arr = this.history_arr.concat(res.data.data);
    }

  }
}
</script>

<style>

</style>