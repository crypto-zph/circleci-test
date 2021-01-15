<template>
	<div>
	  <q-drawer v-model="chat_listDrawer" show-if-above bordered>
        <div class="row q-pb-sm">
          <div class="col-12 q-mb-md">
            <q-tabs
                v-model="tab"
                dense
                class="text-grey"
                active-color="primary"
                indicator-color="primary"
                align="justify"
                switch-indicator
                @click="changeTabs()"
                no-caps
                  >
                  <q-tab name="friends" label="Friends" />
                  <q-tab name="groups" label="Groups" />
                  <q-tab name="barter" label="Barter Chat" />
              </q-tabs>
            </div>
          <div class="col-2 text-center">
            <q-btn flat round icon="fas fa-bars" color="secondary" />
          </div>
          <div class="col-8">
            <q-input 
            placeholder="Search" 
            dense 
            borderless 
            style="border: 1px solid grey; border-radius: 20px; color: #9A67AC" 
            class="q-px-md">
            <template slot:append>
              <q-btn round flat style="margin-right: -18px">
                <q-icon name="fas fa-search" size="16px" />
              </q-btn>
            </template>
          </q-input>
          </div>
          <div class="col-2 text-center">
            <q-btn flat round icon="far fa-edit" color="secondary" />
          </div>
        </div>
        <!-- <div class="text-bold q-px-md text-grey-8" style="font-size: 25px;">
          Messages
        </div> -->

			<div class="col-4 text-bold q-px-xs text-black-8">
				<!-- -----------------User List------------------------------------ -->


        <q-tab-panels v-model="tab" animated style="background: transparent !important;">
          <q-tab-panel name="friends" style="background: transparent !important;">
            <q-list>
              <div v-for="(user, index) in ka_chat" 
              :key="index" class="q-my-xs">
                <q-item
                v-if="user.chat_type == 'friends'"  
                clickable 
                v-ripple
                @click="chat_input(user.chat_id, user.user_name, index, user.user_id)"
                :active="is_active && index == idx"
                active-class="my-menu-link"
                style="border-radius: 20px"
                >
                
                <q-item-section avatar v-if="user.chat_type == 'friends'">
                  <q-avatar color="primary" text-color="white" size="50px" >
                  {{ user.user_name.charAt(0).toUpperCase() }}
                  <q-badge v-if="user.last_active == 'Now'" color="green-5" floating style="border-radius: 50%; width: 10px; height: 11px; margin-top: 5px; margin-right: 5px; box-shadow: 0px 0px 0px 2px white"><span style="visibility: hidden;">o</span></q-badge>
                  </q-avatar>
                </q-item-section>

                <q-item-section v-if="user.chat_type == 'friends'">
                  <q-item-label class="q-ml-sm" >{{ user.user_name}}</q-item-label>
                  <q-item-label caption class="q-ml-sm">asdasd</q-item-label>
                </q-item-section>

                 <q-item-section side>
                    <q-item-label caption>5 min ago</q-item-label>
                  </q-item-section>
                </q-item>

                <!-- <q-item-section side>
                  <q-badge 
                    :color="user.is_online ? 'light-green-5' : 'grey-4' ">
                    {{user.is_online ? "." : "."}}
                  </q-badge>

                  {{user.is_online}}
                </q-item-section> -->

                </q-item>
              </div>
					</q-list>
          </q-tab-panel>


          <!-- Group Chat -->
          <q-tab-panel name="groups">
            <q-list>
              <q-btn @click="create_group = true" style="margin: 7px; width: 100%;">Create Group</q-btn>
              <div v-for="(user, index) in ka_chat" 
              :key="index">
                <q-item
                v-if="user.chat_type == 'groups'"  
                clickable 
                v-ripple
                @click="chat_input_group(user.chat_id, user.user_name, index, user.chat_name)"
                :active="is_active && index == idx"
                active-class="my-menu-link"
                >
                
                <q-item-section avatar>
                  <q-avatar color="primary" text-color="white" >
                  {{ user.chat_name.charAt(0).toUpperCase() }}
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label class="font-rubik-lables q-ml-sm" >{{ user.chat_name}}</q-item-label>
                </q-item-section>

                <!-- <q-item-section side>
                  <q-badge 
                    :color="user.is_online ? 'light-green-5' : 'grey-4' ">
                    {{user.is_online ? "." : "."}}
                  </q-badge>
                </q-item-section> -->

                </q-item>
                <!-- <div v-else>
                  Nothing to Display
                </div> -->
              </div>
					</q-list>
            <!-- create groups -->
            <q-dialog v-model="create_group" persistent transition-show="scale" transition-hide="scale">
              <q-card style="width: 500px; max-width: 80vw;">
                <q-card-section>
                  <div class="text-h6">Name your group and add your friends</div>
                  <div>Everyone in this conversation will see this.</div>
                </q-card-section>

                <q-card-section>
                  <div>
                    <div class="row">
                      <div class="col-3 self-end">
                        <label>Group Name: </label>
                      </div>
                      <div class="col-8">
                       <q-input v-model="group_name" dense />
                      </div>
                    </div>

                    <div class="row q-mt-lg">
                      <div class="col">
                        <label>Group Members: </label>
                      </div>
                    </div>

                    <div class="row q-mt-md">
                      <div class="col">
                          <q-option-group
                            :options="options"
                            label="Notifications"
                            type="checkbox"
                            v-model="group"
                          />
                      </div>
                    </div>
                  </div>
                  <!-- {{group}} -->
                </q-card-section>

                <q-card-actions class="bg-white text-teal" style="float: right; margin-top: 1%;">
                  <q-btn flat label="Create Group" @click="createGroup()"/>
                  <q-btn flat label="Cancel" v-close-popup />
                </q-card-actions>
              </q-card>
          </q-dialog>  

          </q-tab-panel>
          
          <!-- Chat Items for Barter -->
          <q-tab-panel name="barter">
            <q-list>
              <div v-for="(user, index) in ka_chat" 
              :key="index">
                <q-item
                v-if="user.chat_type == 'barter'"  
                clickable 
                v-ripple
                @click="chat_input(user.chat_id, user.user_name, index, user.user_id)"
                :active="is_active && index == idx"
                active-class="my-menu-link"
                >
                
                <q-item-section avatar v-if="user.chat_type == 'barter'">
                  <q-avatar color="primary" text-color="white" >
                  {{ user.user_name.charAt(0).toUpperCase() }}
                  </q-avatar>
                </q-item-section>

                <q-item-section v-if="user.chat_type == 'barter'">
                  <q-item-label class="font-rubik-lables q-ml-sm" >{{ user.chat_name}}</q-item-label>
                </q-item-section>

                <!-- <q-item-section side>
                  <q-badge 
                    :color="user.is_online ? 'light-green-5' : 'grey-4' ">
                    {{user.is_online ? "." : "."}}
                  </q-badge>
                </q-item-section> -->

                </q-item>
              </div>
			</q-list>
          </q-tab-panel>
        </q-tab-panels>
	  </div>
    </q-drawer>
  </div>
</template>

<script>
	export default {
		data: () => ({
			chat_listDrawer: false,
			drawerLeft: false,
			tab: 'friends',
		})
	}
</script>