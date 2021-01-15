<template>
  <div class="login__container2">
    <vue-particles
      color="#d991f2"
      :particleOpacity="0.7"
      :particlesNumber="100"
      shapeType="circle"
      :particleSize="2"
      linesColor="#696969"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.3"
      :linesDistance="150"
      :moveSpeed="1"
      :hoverEffect="false"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      style="position: absolute; height: 100vh; width: 100%; left: 0; top: 0;"
    ></vue-particles>
    <div class="q-mt-xl">
    <q-card class="my-card  container__login__card2">
      <q-img
        src="login-user.jpg"
        class="absolute-center"
        style="height:100px; width: 100px; top: -5px; border-radius: 50%; border-top: 3px solid  #999999;border-left: 3px solid #999999; border-right: 3px solid  #999999"
      />
      <q-card-section>
        <u-q-success-registration v-if="is_registration_successful == true"></u-q-success-registration>
        <u-q-registration @verifyOtp="toggleIsVerification" v-else-if="is_verification == false"></u-q-registration>
        <u-q-confirm-registration ref="confirmRegistration" @successRegistration="successRegistration" @cancelRegistration="cancelRegistration" v-show="is_verification"></u-q-confirm-registration>
      </q-card-section>
    </q-card>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueParticles from "vue-particles";
import UQRegistration from "../../components/Front/UQRegistration";
import UQConfirmRegistration from "../../components/Front/UQConfirmRegistration";
import UQSuccessRegistration from "../../components/Front/UQSuccessRegistration";
import "../Register.css";
Vue.use(VueParticles);
export default {
  components: {
    UQRegistration, 
    UQConfirmRegistration,
    UQSuccessRegistration
  },
  data: () => ({
    is_verification             : false,
    is_registration_successful  : false
  }),
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