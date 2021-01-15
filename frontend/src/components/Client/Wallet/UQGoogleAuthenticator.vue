<template>
  <div v-if="is_2fa_enabled != null">
    <div v-if="is_2fa_enabled == false">
      <h6 style="font-size: 18px" class="text-bold">
        Make your baristocrat account more secure.
      </h6>

      <!-- QR Code -->
      <div class="row">
        <div class="col-5">
          <img
            :src="`https://chart.googleapis.com/chart?cht=qr&chl=${secret.otpauth_url}&chs=200x200`"
            alt="2FA Secret Key"
          />
        </div>
        <div class="col-7 self-center">
          <div class="q-mb-sm">
            1. Download Google Authenticator app
          </div>
          <div class="q-mb-sm">
            2. Scan the QR code using the downloaded app
          </div>
          <div>
            3. Enter the code shown in the app.
          </div>
        </div>
      </div>

      <!-- 2FA Code Input -->
      <div class="row">
        <div>Authentication Code</div>
        <div class="col-9">
          <q-input
            borderless
            type="text"
            v-model="otp"
            dense
            class="q-mr-sm q-px-md"
            style="border-radius: 10px; border: 1px solid #c7c7c7"
          />
        </div>
        <div class="col-3">
          <!-- Verify Button -->
          <q-btn
            @click="enable2FA()"
            class="bg-secondary text-white"
            flat
            style="font-size: 13px; height: 39px; border-radius: 10px"
            label="Enable 2FA"
          />
        </div>
      </div>


      <div class="q-mt-sm">
        <!-- Secret Key -->
        <div class="row">
          <div class="col-9 q-mt-sm">
            <div style="font-size: 13px" class="text-bold">
              Can't scan the QR Code?
            </div>
            <div style="font-size: 13px">
              Enter the 2FA secret key to Google Authenticator app.
            </div>
            <q-input
              readonly
              borderless
              type="text"
              v-model="secret.base32"
              dense
              class="q-mr-sm q-px-md bg-green-2"
              style="border-radius: 10px"
            />
          </div>
          <div class="col-3 q-mt-xs">
            <div style="visibility: hidden">2FA Secret Key</div>
             <div style="visibility: hidden">2FA Secret Key</div>
            <!-- Copy Button -->
            <q-btn
              @click="copy()"
              flat
              style="
                background: #cfe4ff;
                color: #4877be;
                height: 39px;
                border-radius: 10px;
              "
              class="q-px-lg"
              label="Copy"
            >
            </q-btn>
            <div>
              <q-tooltip v-model="tool_tip"> Secret Key Copied ! </q-tooltip>
            </div>
          </div>
        </div>
      </div>

      <div class="q-pa-md text-red">
        <strong>CAUTION</strong>: <span style="font-weight: 500">Please do take note of your 2FA secret key for security purposes.
        Your 2FA secret key will help you retrieve your account if problems occur.</span>
      </div>
    </div>

    <div v-else class="text-center">
      <h5 class="q-mb-sm">2FA Enabled</h5>
      <q-btn
        @click="is_disable_2fa = true"
        label="Disable 2FA"
        color="secondary"
        class="q-mt-lg"
      />
    </div>

    <!-- Disable 2FA Dialog -->
    <q-dialog v-model="is_disable_2fa" persistent>
      <q-card style="width: 450px; border-radius: 20px">
         <div class="text-right">
            <q-btn class="q-ma-lg" icon="close" flat round dense v-close-popup />
          </div>
        <q-card-section class="q-pt-none q-pb-xl q-px-xl">

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
              type="text"
              v-model="otp"
              dense
            />
            <q-btn @click="disable2FA()" class="full-width" label="Submit" color="secondary" style="border-radius: 7px; height: 40px"/>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import speakeasy from "speakeasy";
import { copyToClipboard } from "quasar";
import { postEnable2fa, postDisable2fa } from "../../../references/url";

export default {
  data: () => ({
    is_disable_2fa: false,
    is_2fa_enabled: null,
    secret: null,
    // secret: {
    //   "ascii" : "83>9m>b{SQ",
    //   "hex" : "38333e396d3e627b5351",
    //   "base32" : "HAZT4OLNHZRHWU2R",
    //   "otpauth_url" : "otpauth://totp/Baristocrat?secret=HAZT4OLNHZRHWU2R"
    // },
    otp: null,
    tool_tip: false,
  }),

  async mounted() {
    await this.$_mainMounted();
    await this.checkUser2faStatus();
  },

  methods: {
    async generateSecretKey() {
      this.secret = speakeasy.generateSecret({
        name: "Baristocrat",
        length: 10,
      });
    },

    async checkUser2faStatus() {
      if (this.$mixin_res.user_info.google_authenticator) {
        this.is_2fa_enabled = this.$mixin_res.user_info.google_authenticator.is_2fa_enabled; // true
      } else {
        this.is_2fa_enabled = false;
        await this.generateSecretKey();
      }
    },

    async copy() {
      copyToClipboard(this.secret.base32).then(() => {
        this.tool_tip = true;
      });

      setTimeout(() => {
        this.tool_tip = false;
      }, 2000);
    },

    async enable2FA() {
      let query_inputs = {
        google_authenticator: this.secret,
        otp: Number(this.otp),
      };

      let res = await this.$_post(postEnable2fa, query_inputs);
      
      if(res.data.status == 'success')
      {
        this.is_2fa_enabled = true;
        this.otp = null;
      }
    },

    async disable2FA() {
      let res = await this.$_post(postDisable2fa, { otp: Number(this.otp) });

      if (res.data.status == "success") {
        this.is_disable_2fa = false;
        this.is_2fa_enabled = false;
        this.otp = null;
      }
    },

  },
};
</script>