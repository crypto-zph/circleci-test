<template>
	<!-- v-if="chat_name == true" -->
	<div class="col-2 text-right self-center">
          <!-- todoldok -->
          <div class="q-mr-md">
				<q-btn size="7px" round icon="fas fa-user-alt" color="secondary" @click="user_infoDrawerBtnIsOpen()" v-if="user_infoDrawer == false"/>

                <q-btn size="7px" round icon="fas fa-user-alt" color="secondary" @click="user_infoDrawerBtnIsClose()" v-if="user_infoDrawer == true"/>
           </div>
                  
              <!-- change emoji modal -->
              <q-dialog v-model="change_emoji" persistent transition-show="scale" transition-hide="scale">
                <q-card style="width: 500px; max-width: 80vw;">
                  <q-card-section>
                    <div class="text-h6">Pick an emoji for this conversation</div>
                    <div>Everyone in this conversation will see this.</div>
                  </q-card-section>

                  <q-card-section>
                    <div v-for="(emoji, index) in emoji_list" :key="index">
                      <div style="float: left;">
                      <q-img src="https://cdn.quasar.dev/img/boy-avatar.png"
                      style="width: 100px; cursor: pointer; padding: 30px; border: 1px solid black; margin: 25px;"
                      :ratio="1"
                      />
                      <!-- {{emoji.emoji_name}} -->
                      </div>
                    </div>
                  </q-card-section>

                  <q-card-actions class="bg-white text-teal" style="float: right; margin-top: 1%;">
                    <q-btn flat label="OK" v-close-popup />
                    <q-btn flat label="Cancel" v-close-popup />
                  </q-card-actions>
                </q-card>
            </q-dialog>

                <q-drawer side="right" v-model="user_infoDrawer" show-else-above bordered>
                  <q-item clickable class="q-pa-lg" @click="check_profile()">
                    <q-item-section avatar>
                      <q-avatar size="50px" class="q-mr-sm">
                        <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                        <q-badge color="green-5" floating style="border-radius: 50%; width: 10px; height: 11px; margin-top: 5px; margin-right: 5px; box-shadow: 0px 0px 0px 2px white"><span style="visibility: hidden;">o</span></q-badge>
                      </q-avatar>
                    </q-item-section>
                  <q-item-section align="left">
                <q-item-label style="font-size: 20px; font-weight: 500">Pergeant</q-item-label>
                <q-item-label caption class="text-light" style="font-size: 12px">Active 5 min ago</q-item-label>
              </q-item-section>
              </q-item>

            <q-separator />

            	<q-item clickable>
                  <q-item-section avatar>
                   <q-avatar size="42px">
                   	<!-- emoji na image dapat dito hehe -->
                      <q-img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                    </q-avatar>
                  </q-item-section>
                 	 <q-item-section align="left">
                 		 <q-item-label style="font-size: 20px; font-weight: 500" @click="change_emojis()">Change Emoji</q-item-label>
               		 </q-item-section>
                </q-item>

                <q-separator />

                 <q-list class="rounded-borders">
                    <q-expansion-item
                      expand-separator
                      label="Shared Photos"
                      align="left"
                      style="font-size: 20px; font-weight: 500"
                    >
                      <q-card class="text-center">
                      	<!--  v-for="(message, index) in image_arr.slice().reverse()" :key ="index" sa span to -->
                        <span v-for="a in 10" key="a">
                            <span>
                              <q-img
                              src="https://cdn.quasar.dev/img/boy-avatar.png"
                              :class="'q-ma-xs image '+[message == is_active ? 'selected' : '']"
                              @click.prevent="switchImage(index, message)"
                              />
                            </span>
                          </span>
                      </q-card>
                    </q-expansion-item>                  
                </q-list>
              <q-separator />
         </q-drawer>
	</div>
</template>

<script>
	export default {
		data: () => ({
			user_infoDrawer: false,
			change_emoji: false,
			user_infoDrawer: true,
		})
	}
</script>