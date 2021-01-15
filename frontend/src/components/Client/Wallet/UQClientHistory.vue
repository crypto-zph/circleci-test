<template>
  <div>
    <!-- content -->
    <div class="content font-monseratt">
      <!-- Mobile View -->
      <div
        class="col-12 desktop__hide q-px-md q-mt-md"
        style="border-radius: 20px"
      >
        <div class="text-center text-bold q-mb-sm" style="font-size: 25px">
          Transaction History
        </div>
        <q-separator />

        <!-- Transactions List -->
        <div
          v-for="txn in currency_details.history_arr"
          :key="txn._id"
          class="row amounts_fontSize"
        >
          <div class="col-3 self-center">
            <div class="text-center">
              <div>
                {{
                  moment(txn.date_created)
                    .tz("Asia/Singapore")
                    .format("MMM-DD-YYYY")
                }}
              </div>
              <div>
                {{
                  moment(txn.date_created)
                    .tz("Asia/Singapore")
                    .format("hh:mm A")
                }}
              </div>
            </div>
          </div>
          <div class="col-5 self-center">
            <div class="q-mx-sm">
              <div>
                {{ txn.description }}
              </div>
              <div>
                Reference No.: <strong>{{ txn.reference_number }}</strong>
              </div>
            </div>
          </div>
          <div class="col-4 text-left">
            <div>
              <div>
                Amount:
                <strong>
                  {{
                    (txn.amount / 10 ** txn.decimal_places).toLocaleString(
                      "en-US",
                      {
                        maximumFractionDigits: txn.decimal_places,
                      }
                    ) +
                    "  " +
                    txn.currency_abbreviation
                  }}
                </strong>
              </div>
            </div>
            <div>
              <div>
                Running Balance:
                <strong>
                  {{
                    (
                      txn.balance_after /
                      10 ** txn.decimal_places
                    ).toLocaleString("en-US", {
                      maximumFractionDigits: txn.decimal_places,
                    }) +
                    "  " +
                    txn.currency_abbreviation
                  }}
                </strong>
              </div>
            </div>
          </div>
          <q-separator />
        </div>
        <div v-if="is_loading" class="text-center">
          <q-spinner-dots color="purple" size="2em" />
        </div>

        <!-- <div v-if="is_end_results" class="text-center q-mt-sm">
          End Results
        </div> -->
      </div>

      <!-- Desktop View -->
      <div class="col-md-7 col-12 margin_transaction">
        <div
          class="q-py-md q-px-lg text-center text-bold text-grey-9"
          style="font-size: 17px"
        >
          Your Transaction
        </div>
        <q-separator style="height: 3px" color="secondary" />
        <div class="">
          <div class="wallets__container_transact">
            <div
              v-for="txn in currency_details.history_arr"
              :key="txn._id"
              class="q-my-lg"
            >
              <div class="row">
                <div class="col-3" style="font-size: 13px">
                  <div>
                    {{
                      moment(txn.date_created)
                        .tz("Asia/Singapore")
                        .format("MMM-DD-YYYY | hh:mm A")
                    }}
                  </div>
                </div>

                <div class="col-3" style="font-size: 13px">
                  {{ txn.description }}
                </div>

                <div class="col-2 text-right" style="font-size: 13px">
                  <label>Ref. Number: </label>
                  <div style="font-weight: bold">
                    {{ txn.reference_number }}
                  </div>
                </div>
                <div class="col-2 text-right" style="font-size: 13px">
                  <div>
                    <label>Amount: </label>
                    <br />
                    <span style="font-weight: bold">
                      {{
                        (txn.amount / 10 ** txn.decimal_places).toLocaleString(
                          "en-US",
                          {
                            maximumFractionDigits: txn.decimal_places,
                          }
                        ) +
                        "  " +
                        txn.currency_abbreviation
                      }}

                      <!-- Balance Conversion Rate -->
                      <q-icon class="text-grey-7" name="fas fa-exchange-alt" />
                        <span class="text-grey-7" style="font-size: 12px">
                        {{
                            (
                              (txn.amount / 10 ** txn.decimal_places) *
                              res.conversion.rates[txn.currency_abbreviation]
                            ).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          }}
                          USD
                        </span>
                      </span>
                  </div>
                </div>
                <div class="col-2 text-right" style="font-size: 13px">
                  <label>Running Balance: </label>
                  <br />
                  <span style="font-weight: bold">
                    {{
                      (
                        txn.balance_after /
                        10 ** txn.decimal_places
                      ).toLocaleString("en-US", {
                        maximumFractionDigits: txn.decimal_places,
                      }) +
                      "  " +
                      txn.currency_abbreviation
                    }}
                  </span>
                </div>
              </div>
            </div>

            <div v-if="is_loading && !is_end_results" class="text-center">
              <q-spinner-dots color="secondary" size="3em" />
            </div>

            <!-- <div v-if="is_end_results" class="text-center">
              End Results
            </div> -->
          </div>

          <div
            class="text-center q-my-md"
            v-if="currency_details.history_arr == ''"
          >
            No Results found
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postWalletHistory } from "../../../references/url";
import moment from "moment-timezone";
// import io from "socket.io-client";

export default {
  props: ["res", "currency_details"],
  data: () => ({
    moment: moment,
    is_loading: false,
    is_end_results: false,
    skip: 0,
    thumbStyle: {
      right: "4px",
      borderRadius: "5px",
      backgroundColor: "#c7c7c7",
      width: "5px",
      opacity: 0.75,
    },

    barStyle: {
      right: "2px",
      borderRadius: "9px",
      backgroundColor: "#c7c7c7",
      width: "9px",
      opacity: 0.2,
    },
  }),

  async mounted() {
    // await this.socketInit();
    this.onScrollBottom(this.getHistoryOnScroll);
  },

  methods: {
    async onScrollBottom(func) {
      window.onscroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
          func();
        }
      };
    },

    async getHistoryOnScroll() {
      this.skip += 5;

      let query_inputs = {
        currency_abbreviation: this.currency_details.selected_currency_obj
          .currency_abbreviation,
        skip: this.skip,
      };

      this.is_loading = true;
      let res = await this.$_post(postWalletHistory, query_inputs);

      // if(res.data.data.length == 0)
      // {
      //   this.is_end_results = true;
      // }

      this.currency_details.history_arr = this.currency_details.history_arr.concat(
        res.data.data
      );
      this.is_loading = false;
    },

    // async socketInit() {
    //   this.socket = io("http://localhost:4000");
    //   this.socket.on("connect", () => {
    //     console.log(" client--- Connected to the server --- crypto");
    //   });
    //   this.socket.on("update_motherwallet", async (data) => {
    //     let {
    //       currency_abbreviation,
    //     } = this.currency_details.selected_currency_obj;
    //     if (
    //       this.$user_info._id == data.user_id &&
    //       currency_abbreviation == data.currency_abbreviation
    //     ) {
    //       await this.updatehistory(data.transaction);
    //     }
    //   });
    // },

    // async updatehistory(transaction) {
    //   let history_arr = this.currency_details.history_arr;
    //   history_arr.unshift(transaction);
    //   history_arr.pop();
    //   this.currency_details.history_arr = history_arr;
    // },
  },
};
</script>

<style>
.wallets__container {
  background: #e6e6e6;
  border-radius: 30px;
}
.wallets__container_transact {
}
a.nostyle:link {
  text-decoration: inherit;
  color: inherit;
}
a.nostyle:visited {
  text-decoration: inherit;
  color: inherit;
}
.amounts_fontSize {
  font-size: 13px;
}
@media (max-width: 437px) {
  .amounts_fontSize {
    font-size: 12px;
  }
}
@media (min-width: 1023px) {
  .margin_transaction {
    margin-left: 15px;
  }
  .desktop__hide {
    display: none;
  }
}
@media (max-width: 1023px) {
  .mobile__hide {
    display: none;
  }
  .crypto_padding {
    padding: 30px 80px 30px 80px;
  }
  .margin_transaction {
    display: none;
  }
  @media (max-width: 486px) {
    .crypto_padding {
      padding: 30px 0px 30px 0px;
    }
  }
}
</style>