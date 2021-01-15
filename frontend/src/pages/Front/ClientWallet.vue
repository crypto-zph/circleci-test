<template>
	<div class="client-wallet-containerPage">
		<u-q-client-wallet></u-q-client-wallet>
	</div>
</template>

<script>
	import UQClientWallet from '../../components/Client/Wallet/UQClientWallet';
	export default {
		components: { UQClientWallet },
	}
</script>


<style scoped>
.client-wallet-container{
	margin-top: 100px;
   padding-right: 250px;
  padding-left: 250px;
  padding-bottom: 100px;
}
.client-wallet-containerPage{
   padding-right: 250px;
  padding-left: 250px;
  padding-bottom: 100px;
}
@media (max-width: 1800px) {
  .client-wallet-container{
    padding-right: 100px;
    padding-left: 100px;
    padding-bottom: 100px;
  }
}
@media (max-width: 900px) {
  .client-wallet-container{
    padding-right: 50px;
    padding-left: 50px;
    padding-bottom: 100px;
  }
}
</style>
