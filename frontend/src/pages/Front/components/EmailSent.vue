<template>
  <div class="">
    <div class="row" style="height: 90vh">
          <div class="col-8 bg__left" style="position: relative;">
        <div style="position: absolute; bottom: 0; left: 100px">
             <img style="width: 500px; height: 500px;" src="login_img/layer_2.png" />
        </div>
    </div>
    <div class="col-4 q-mt-md">
      <div class="text-center q-pb-md">
        <img src="icons/baristocrat02.png" width="150px" />
      </div>

      <div class="q-px-xl text-center">
        <u-q-email-sent></u-q-email-sent>
      </div>
    </div>
    </div>


  </div>
</template>

<script>
import UQEmailSent from "../../../components/UQEmailSent";
export default {
  components: {
    UQEmailSent,
  },
  data: () => ({}),
  mounted() {},
  methods: {},
};
</script>
