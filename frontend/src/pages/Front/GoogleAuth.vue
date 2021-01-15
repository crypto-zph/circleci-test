<template>
  <div class="google__auth__container">
      <u-q-google-auth></u-q-google-auth>
  </div>
</template>

<script>
import UQGoogleAuth from '../../components/Client/Wallet/UQGoogleAuthenticator';

export default {
  data: () => ({}),
  components: {
    UQGoogleAuth
  },
  mounted() {},
  methods: {},
};
</script>
<style>
.google__auth__container{
  padding: 50px 500px 100px 500px;
}
@media (max-width: 1800px) {
  .google__auth__container{
    padding-right: 100px;
    padding-left: 100px;
    padding-bottom: 100px;
  }
}
@media (max-width: 900px) {
  .google__auth__container{
    padding-right: 50px;
    padding-left: 50px;
    padding-bottom: 100px;
  }
}
</style>