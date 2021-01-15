<template>
	<div>
		<q-dialog v-model="isRate" persistent transition-show="flip-up"
        transition-hide="flip-down">
			<div class="bg-white q-px-xl q-py-md full-width round__dialog">
				<div class="text-h5 text-bold">
					RATINGS
				</div>
				<div class="q-my-sm">
					<q-rating color="accent" size="35px" v-model="isRateStar" />
				</div>
				<div class="text-h5 text-bold">
					REVIEWS
				</div>
				<div class="q-my-sm">
					<q-input placeholder="Please provide a valid review" borderless class="full-width input__style" autogrow />
				</div>
				<div>
					<q-uploader
				        url="http://localhost:8080/upload"
				        label="Upload (Optional)"
				        accept=".jpg, image/*"
				        multiple
				        batch
				        class="full-width"
				      />
				</div>
				<div class="q-my-md">
					<q-btn class="bg-secondary full-width text-white" flat style="border-radius: 15px" label="submit" />
				</div>
				<div>
					<q-btn class=" full-width" color="secondary" outline style="border-radius: 15px" label="cancel" @click="isRate = false" />
				</div>
			</div>
		</q-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isRate: false,
				isRateStar: '1',
			}
		}
	}
</script>

<style>
	.round__dialog {
		border-radius: 15px !important;
	}
	.q-uploader__file {

	}
</style>