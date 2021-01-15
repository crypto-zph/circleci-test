<template>
  <div>
    <div class="row" style="height: 90vh">
          <div class="col-md-8 col-0 bg__left" style="position: relative;">
        <div style="position: absolute; bottom: 0; left: 100px">
             <img style="width: 500px; height: 500px;" src="login_img/layer_2.png" />
        </div>
    </div>
    <div class="col-md-4 col-12 q-mt-md padding__mobile"  >
      <div class="text-center q-pb-md">
        <img src="icons/baristocrat02.png" width="150px" />
      </div>

      <div class="q-px-xl text-center">
        <u-q-success-registration v-if="is_registration_successful == true"></u-q-success-registration>
        <u-q-register @verifyOtp="toggleIsVerification" v-else-if="is_verification == false"></u-q-register>
        <u-q-confirm-registration ref="confirmRegistration" @successRegistration="successRegistration" @cancelRegistration="cancelRegistration" v-show="is_verification"></u-q-confirm-registration>
      </div>
    </div>
    </div>


  </div>
</template>

<script>
import Login from "../Login.css";
import UQRegister from "../../components/Front/UQRegistration"
import UQConfirmRegistration from "../../components/Front/UQConfirmRegistration";
import UQSuccessRegistration from "../../components/Front/UQSuccessRegistration";
export default {
  components: {
    UQRegister,
    UQConfirmRegistration,
    UQSuccessRegistration
  },
  data: () => ({
    is_verification             : false,
    is_registration_successful  : false
  }),
  mounted() {},
  methods: {
    async toggleIsVerification(value)
    {
      this.is_verification = true;
      this.$refs.confirmRegistration.setUserCredentials({
        username: value.username,
        email   : value.email,
        password: value.password,
        country : value.country,
        gender  : value.gender
      })
    },
    async cancelRegistration(value)
    {
      this.is_verification = value;
    },

    async successRegistration(value)
    {
      this.is_registration_successful = true;
      this.is_verification            = false;
    }
  }
};
</script>
