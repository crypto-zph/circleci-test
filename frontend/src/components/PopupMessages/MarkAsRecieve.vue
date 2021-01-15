<template>
	<div>
		<q-dialog v-model="isRecieve" persistent transition-show="flip-up"
        transition-hide="flip-down">
			<div class="bg-white q-px-xl q-py-md full-width round__dialog text-center">
				<div>
					<q-icon class="check__icon" size="50px" name="fas fa-check" />
				</div>
				<div class="text-h5 q-mt-md text-green">
					Congratulations!
				</div>
				<div class="text-grey-8 q-mt-md" style="font-size: 18px">
					Item Bartered Successfully!
				</div>
				<div class="q-mt-lg">
					<q-btn class="bg-secondary text-white q-py-xs" flat style="border-radius: 10px; width: 100px" label="Okay" @click="isRecieve = false" />
				</div>
			</div>
		</q-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isRecieve: true,
			}
		},}
</script>

<style>
	.round__dialog {
		border-radius: 15px !important;
	}
	.check__icon {
		background: #9A67AC;
		color: #FDB81F;
		padding: 20px;
		border-radius: 50%;
		border: 7px solid rgba(154, 103, 172, 0.7);
		-webkit-background-clip: padding-box; /* for Safari */
   		background-clip: padding-box; /* for IE9+, Firefox 4+, Opera, Chrome */
	}
</style>