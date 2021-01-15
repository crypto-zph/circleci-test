<template>
  <div class="font-monseratt">
    <div v-if="!is_2fa_input">
      <q-btn
        v-close-popup
        flat
        round
        class="absolute-top-right q-mr-md"
        icon="close"
      />

      <div class="q-mb-lg">
        <div class="text-bold text-center q-mt-lg" style="font-size: 25px">
          Send {{ selected_currency.currency_name }}
        </div>
      </div>
      <div>Source wallet</div>

      <!-- Balance -->
      <div
        class="row bg-grey-3"
        style="border: 1px solid #cccccc; border-radius: 10px"
      >
        <div class="col-12 q-pa-sm">
          <div class="row">
            <div class="text-bold col-3">
              <q-icon name="fas fa-wallet" />
              <span class="q-px-sm">{{
                selected_currency.currency_abbreviation
              }}</span>
            </div>
            <div class="text-right col-9 q-mt-xs">
              {{
                (
                  selected_currency.balance /
                  10 ** selected_currency.decimal_places
                ).toLocaleString("en-US", {
                  maximumFractionDigits: selected_currency.decimal_places,
                })
              }}

              <!-- Balance Conversion Rate -->
             <q-icon name="fas fa-exchange-alt" class="text-grey-7 q-mx-xs" size="13px" />
              <span class="text-grey-7">
              {{
                selected_currency.balance | balanceConversion(selected_currency.decimal_places, res.conversion.rates[selected_currency.currency_abbreviation])
              }}
                USD
            </span>
            </div>
          </div>
        </div>
      </div>
      <br />

      <!-- Send Form -->
      <q-form @submit="is_2fa_input=true">
        <div>
          <div>Amount</div>
          <div class="row">
            <div class="col-10">
              <q-input
                placeholder="0"
                dense
                type="text"
                color="secondary"
                v-model.number="form_data.amount"
                outlined
                :rules="[(val) => val <= balance || 'Insufficient Balance']"
              />
            </div>
            <div class="col-2">
              <q-select
                @input="onChange()"
                v-model="send_conversion_currency"
                outlined
                :options="currencies"
                dense
                color="secondary"
              />
            </div>
          </div>

          <!-- Conversion Rate -->
          <span v-if="form_data.amount">
            {{ conversion }}
          </span>
        </div>
        <br />
        <div>To</div>
        <div class="q-mb-md">
          <q-input
            color="secondary"
            dense
            type="text"
            v-model="form_data.receiver_public_key"
            outlined
            label="Wallet Address"
            lazy-rules
            :rules="[(val) => !!val || '* Field is required']"
          />
        </div>
        <div class="q-mb-md">
          <q-input
            color="secondary"
            type="text"
            v-model="form_data.remarks"
            outlined
            label="Remarks"
          />
        </div>
        <div class="text-center">
          <q-btn
            color="secondary"
            style="width: 150px; border-radius: 10px"
            type="submit"
            label="Send"
          />
        </div>
      </q-form>
    </div>

    <!-- 2FA Input -->
    <div v-else>
      <q-form @submit="send()" class="q-mt-sm">
        <div class="text-right q-mb-sm">
          <q-btn
            v-close-popup
            flat
            round
            icon="close"
          />
        </div>

        <div class="q-pb-xl q-mx-xl">
        <div class="text-center q-mb-md text-grey-6" style="font-size: 17px; font-weight: 500">
            Please enter your verification code from Google Authenticator
          </div>
         
          <div class="text-h6 q-mb-sm text-grey-8" style="font-size: 17px">
           Verification Code
         </div>
          <div class="text-center">
            <q-input
              borderless
              style="border: 1px solid #e0e0e0; border-radius: 10px"
              class="q-mb-md q-px-md"
              v-model="form_data.otp"
              type="text"
              dense
            />
            <q-btn type="submit" class="full-width" label="Verify Code"  color="secondary" style="border-radius: 7px; height: 40px"/>
          </div>
        </div>
      </q-form>
    </div>

  </div>
</template>

<script>
import { postMotherWalletSend } from "../../../references/url";
import moment from "moment-timezone";
import Swal from "sweetalert2";

export default {
  props: ["res", "selected_currency"],
  data: () => ({
    moment: moment,
    form_data: {
      receiver_public_key: "",
      amount: null,
      remarks: "",
      otp: null
    },
    is_2fa_input: false,
    currencies: [],
    send_conversion_currency: "",
  }),

  async mounted() {
    await this.defaultVal()
  },

  filters: {
    balanceConversion(balance, decimal, conversion_rate) {
      const decimal_balance    = balance / 10 ** decimal;
      const converted_balance  = decimal_balance * conversion_rate;
      const cut_excess_decimal = Math.floor(converted_balance * 10 ** 2) / 10 ** 2; // for USD decimal
      const with_comma_balance = cut_excess_decimal.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
      return with_comma_balance;
    },
  },

  computed: {
    conversion() {
      let converted_amount = this.send_conversion_currency == 'USD' 
      ?
        (this.form_data.amount / this.res.conversion.rates[this.selected_currency.currency_abbreviation]).toLocaleString("en-US", {
          maximumFractionDigits: this.selected_currency.decimal_places
        })
      :
        (this.form_data.amount * this.res.conversion.rates[this.selected_currency.currency_abbreviation]).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
      return `${converted_amount} ${this.currencies[0]}`;
    },

    balance() {
      let balance_amt = Math.floor(this.selected_currency.balance) / 10 ** this.selected_currency.decimal_places;
      let result = this.send_conversion_currency == 'USD' 
      ?
        Math.floor((balance_amt * this.res.conversion.rates[this.selected_currency.currency_abbreviation]) * 10 ** 2) / 10 ** 2
      : 
      balance_amt;

      return result;
    },
  },

  methods: {
    async defaultVal()
    {
      this.send_conversion_currency = this.selected_currency.currency_abbreviation;
      this.currencies.push('USD');
    },

    async onChange()
    {
      if(this.send_conversion_currency == 'USD') {
        this.currencies = [];
        this.currencies.push(this.selected_currency.currency_abbreviation);
        this.form_data.amount = Math.floor((this.form_data.amount * this.res.conversion.rates[this.selected_currency.currency_abbreviation]) * 10 ** 2) / 10 ** 2;
      }
      else {
        this.currencies = [];
        this.currencies.push('USD')
        this.form_data.amount = Math.floor((this.form_data.amount / this.res.conversion.rates[this.selected_currency.currency_abbreviation]) * 10 ** this.selected_currency.decimal_places) / 10 ** this.selected_currency.decimal_places;
      }
    },

    async send() {
      this.form_data.currency_abbreviation = this.selected_currency.currency_abbreviation;
      this.form_data.otp = Number(this.form_data.otp);

      this.$q.loading.show();
      let res = await this.$_post(postMotherWalletSend, this.form_data);
      this.$q.loading.hide();

      this.$emit("sent", true); // reRender UQMotherCurrencyList
      let receipt = res.data.data;

      Swal.fire({
        icon: "success",
        title: "Success",
        html: `
          <div>
            <span style="font-size: 19px;">${receipt.description}</span>
          </div>

          <div>
            <label style="font-size: 17px; font-weight: bold;">Current Balance: </label>
            <span style="font-size: 17px;">
              ${
                (
                  receipt.balance_after /
                  10 ** receipt.decimal_places
                ).toLocaleString("en-US", {
                  maximumFractionDigits: receipt.decimal_places,
                }) +
                "  " +
                receipt.currency_abbreviation
              }
            </span>
          </div>

          <div>
          <label style="font-size: 17px; font-weight: bold;">Date / Time: </label>
            <span style="font-size: 17px;">
              ${moment(receipt.date_created)
                .tz("Asia/Singapore")
                .format("MMM-DD-YYYY / hh:mm A")}
            </span>
          </div>

          <div class="q-mb-md">
            <label style="font-size: 17px; font-weight: bold;">Reference Number: </label>
            <span style="font-size: 17px;">
              ${receipt.reference_number}
            </span>
          </div>`,
        confirmButtonColor: "#2f4c7e",
        allowEnterKey: true,
        allowOutsideClick: false,
      });
    },
  },
};
</script>

<style>
</style>