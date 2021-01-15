<template>
	<!-- v-if="chat_name == true" -->
	<div class="col-10 q-py-sm q-px-sm">
        <q-item>
            <q-item-section avatar>
				<q-avatar size="40px" class="q-mr-sm" :class="last_active == 'Now' ? 'active__user' : 'inactive__user'">
					<img src="https://cdn.quasar.dev/img/boy-avatar.png" style="border: 2px solid white" />
  						<!-- <q-badge v-if="last_active == 'Now'" color="green-5" floating style="border-radius: 50%; width: 10px; height: 11px; margin-top: 5px; margin-right: 5px; box-shadow: 0px 0px 0px 2px white"><span style="visibility: hidden;">o</span></q-badge> -->
				</q-avatar>
              </q-item-section>
                  <q-item-section align="left">
						<q-item-label 
						clickable 
						style="font-size: 20px; font-weight: 500" 
						 @click="check_profile()" >
						 pergeant
						</q-item-label>
           				  <q-item-label
           				   caption class="text-light" 
           				   style="font-size: 12px" 
           				   >Active 5 min ago
           				</q-item-label>
              </q-item-section>
        </q-item>
	</div>
</template>

<script>
	export default {
		data: () => ({
			last_active: 'Now',
		}),
		methods: {

		}
	}
</script>