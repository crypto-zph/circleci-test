<template>
  <div class="">
  <!--   <vue-particles
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
    ></vue-particles> -->

   <!--  <q-card class="my-card q-mt-xl container__login__card">
      <q-img
        src="login-user.jpg"
        class="absolute-center"
        style="height:100px; width: 100px; top: -5px; border-radius: 50%; border-top: 3px solid  #999999;border-left: 3px solid #999999; border-right: 3px solid  #999999"
      />
      <u-q-login></u-q-login>
    </q-card> -->
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
        <u-q-login></u-q-login>
      </div>
    </div>
    </div>


  </div>
</template>

<script>
import Login from "../Login.css";
import UQLogin from "../../components/UQLogin";

export default {
  components: {
    UQLogin,
  },
  data: () => ({}),
  mounted() {},
  methods: {},
};
</script>
