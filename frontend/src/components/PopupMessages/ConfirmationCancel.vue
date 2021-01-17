<template>
	<div>
		<q-dialog v-model="isConfirmation" persistent transition-show="flip-up"
        transition-hide="flip-down">
			<div class="bg-white q-px-xl q-py-md full-width round__dialog">
				<div class="text-h5 text-bold">
					Confirmation
				</div>
				<div class="q-mt-xl text-grey-8 text-center" style="font-size: 18px" v-if="confirm">
					Click "proceed" to confirm receipt of the product.
				</div>
				<div class="q-mt-xl text-grey-8 text-center" style="font-size: 18px" v-if="cancel">
					Are you sure you want to cancel this transaction?
				</div>
				<div class="q-mt-lg text-center">
				<div v-if="confirm">
					<q-btn class="q-py-xs bg-secondary text-white text-center" flat style="border-radius: 10px; width: 120px" label="Proceed" @click="isConfirmation = false" />
				</div>
				<div v-if="cancel">
					<q-btn class="q-py-xs bg-secondary text-white text-center" flat style="border-radius: 10px; width: 120px" label="Proceed" @click="isConfirmation = false" />
				</div>
				</div>
			</div>
		</q-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isConfirmation: false,
				cancel: true,
			}
		},}
</script>

<style>
	.round__dialog {
		border-radius: 15px !important;
	}
</style>