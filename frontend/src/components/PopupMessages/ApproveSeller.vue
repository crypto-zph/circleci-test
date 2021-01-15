<template>
	<div>
		<q-dialog v-model="isApprove" persistent transition-show="flip-up"
        transition-hide="flip-down">
			<div class="bg-white q-px-xl q-py-md full-width round__dialog text-center">
				<div>
					<q-icon class="check__iconApprove" size="50px" name="fas fa-exclamation" />
				</div>
				<div class="text-h5 q-mt-xl">
					Do you want to approve the request?
				</div>
				<div class="q-mt-lg row q-col-gutter-md">
					<div class="col-6">
					<q-btn class="bg-secondary text-white q-py-xs full-width" flat style="border-radius: 10px; width: 100px" label="Yes" />
				</div>
				<div class="col-6">
					<q-btn class="q-py-xs full-width" outline color="secondary" style="border-radius: 10px; width: 100px" label="Negotiate" @click="isApprove = false" />
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
				isApprove: false,
			}
		},}
</script>

<style>
	.round__dialog {
		border-radius: 15px !important;
	}
	.check__iconApprove {
		background: #FDB81F;
		color: #9A67AC;
		padding: 20px;
		border-radius: 50%;
		border: 7px solid rgba(253, 184, 31, 0.7);
		-webkit-background-clip: padding-box; /* for Safari */
   		background-clip: padding-box; /* for IE9+, Firefox 4+, Opera, Chrome */
	}
</style>