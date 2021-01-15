<template>
	<div>
		<div class="row font-rubik-labels">
			<div class="col-4" style="border-right: 1px solid #e0e0e0">
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
            v-model="search_keyword"
						placeholder="Search"
						dense
						borderless
						style="border: 1px solid grey; border-radius: 20px; color: #9A67AC"
						class="q-px-md"
            @input="filterSearchData"
            />
					</div>

					<div class="col-2 text-center">
						<q-btn flat round icon="far fa-edit" color="secondary" />
					</div>

				</div>
			</div>
			<div class="col-8">
				<div class="row">
					<div class="col-12" style="border-bottom: 1px solid #e0e0e0">
						 <div class="row">

							<div class="col-10 q-py-sm q-px-sm" v-if="chat_name==true">
                <q-item>
                  <q-item-section avatar>
    								<q-avatar size="40px" class="q-mr-sm">
    									<img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                      <q-badge v-if="last_active == 'Now'" color="green-5" floating style="border-radius: 50%; width: 10px; height: 11px; margin-top: 5px; margin-right: 5px; box-shadow: 0px 0px 0px 2px white"><span style="visibility: hidden;">o</span></q-badge>
    								</q-avatar>
                  </q-item-section>
                  <q-item-section align="left">
								<q-item-label clickable style="font-size: 20px; font-weight: 500"  @click="check_profile()" >{{chat_names}}</q-item-label>
                <q-item-label caption class="text-light" style="font-size: 12px" v-if="is_group == false">Active {{last_active}}</q-item-label>
              </q-item-section>
              </q-item>
							</div>
							<div class="col-2 text-right self-center" v-if="chat_name==true">
								<!-- <a style="text-decoration: none" href="https://www.facebook.com/groupcall/MESSENGER:681693155843889/?call_id=2986496682&users_to_ring[0]=100006133809711&users_to_ring[1]=100000463388287&users_to_ring[2]=100000795349314&users_to_ring[3]=100015457325236&users_to_ring[4]=100000828669584&users_to_ring[5]=100002724978697&users_to_ring[6]=100000886243401&users_to_ring[7]=100001627231397&has_video=false&initialize_video=false&server_info_data=&nonce=ogxmt1wgna6i">
									<q-btn flat round icon="fas fa-phone-alt" color="secondary" />
								</a>
								<a style="text-decoration: none" href="https://www.facebook.com/groupcall/MESSENGER:681693155843889/?call_id=1157973982&users_to_ring[0]=100006133809711&users_to_ring[1]=100000463388287&users_to_ring[2]=100000795349314&users_to_ring[3]=100015457325236&users_to_ring[4]=100002724978697&users_to_ring[5]=100000828669584&users_to_ring[6]=100000886243401&users_to_ring[7]=100001627231397&has_video=true&initialize_video=true&server_info_data=&nonce=tbk7x7p3bark">
									<q-btn flat round icon="fas fa-video" color="secondary" />
								</a> -->

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
                          <q-img :src="`${server.IMAGE_URL}/5f90343d21e259119cb22fcc/5fbb864c334b554c8cc19f51/chat_files/emoji/${emoji.emoji_name}`" @click="chooseEmoji(index)"
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
                        <q-badge v-if="last_active == 'Now'" color="green-5" floating style="border-radius: 50%; width: 10px; height: 11px; margin-top: 5px; margin-right: 5px; box-shadow: 0px 0px 0px 2px white"><span style="visibility: hidden;">o</span></q-badge>
                      </q-avatar>
                    </q-item-section>
                  <q-item-section align="left">
                <q-item-label style="font-size: 20px; font-weight: 500">{{chat_names}}</q-item-label>
                <q-item-label caption class="text-light" style="font-size: 12px" v-if="is_group == false">Active {{last_active}}</q-item-label>
              </q-item-section>
              </q-item>

            <q-separator />

            <q-item clickable>
                  <q-item-section avatar>
                   <q-avatar size="42px">
                      <q-img :src="`${server.IMAGE_URL}/5f90343d21e259119cb22fcc/5fbb864c334b554c8cc19f51/chat_files/emoji/${my_emoji}`" />
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
                        <span v-for="(message, index) in image_arr.slice().reverse()" :key ="index">
                            <span>
                              <q-img
                              :src="`${server.IMAGE_URL}/5f90343d21e259119cb22fcc/5fbb864c334b554c8cc19f51/chat_files/images/${message}`"
                              :class="'q-ma-xs image '+[message==is_active ? 'selected' : '']"
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
						</div>
					</div>
				</div>
			</div>

			<div class="col-4 text-bold q-px-xs text-black-8" style="border-right: 1px solid #e0e0e0">
				<!-- -----------------User List------------------------------------ -->

       <div v-if="search_keyword != ''">
          <div v-for="(message, index) in search_result"
          :key="index">
            <q-item
              v-if="tab == 'groups'"
              clickable
              v-ripple
              @click="chat_input_group(message.chat_id, message.user_name, index, message.chat_name, message.message_id)"
              :active="is_active && index == idx"
              active-class="my-menu-link"
              >

              <q-item-section avatar>
                <q-avatar color="primary" text-color="white" v-if="message.chat_name" >
                {{ message.chat_name.charAt(0).toUpperCase() }}
                </q-avatar>
                <q-avatar color="primary" text-color="white" v-else >
                {{ message.receiver_username.charAt(0).toUpperCase() }}
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="font-rubik-lables q-ml-sm" v-if="message.chat_name">{{ message.chat_name }}</q-item-label>
                <q-item-label class="font-rubik-lables q-ml-sm" v-else>{{ message.receiver_username }}</q-item-label>
                <q-item-label style="font-weight: normal; font-size:10px;" class="q-ml-sm" v-html="formatFoundTextSearch(message.message, search_keyword)"></q-item-label>
              </q-item-section>

            </q-item>

            <q-item
              v-else
              clickable
              v-ripple
              @click="chat_input(message.chat_id, index, message.sender_id,  message.sender_username, message.receiver_id, message.receiver_username, message.last_active, message.message_id, message.message)"
              :active="is_active && index == idx"
              active-class="my-menu-link"
            >

              <q-item-section avatar>
                <q-avatar color="primary" text-color="white" v-if="message.chat_name" >
                {{ message.chat_name.charAt(0).toUpperCase() }}
                </q-avatar>
                <q-avatar color="primary" text-color="white" v-else >
                {{ message.receiver_username.charAt(0).toUpperCase() }}
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="font-rubik-lables q-ml-sm" v-if="message.chat_name">{{ message.chat_name }}</q-item-label>
                <q-item-label class="font-rubik-lables q-ml-sm" v-else>{{ message.chat_list_username }}</q-item-label>
                <q-item-label style="font-weight: normal; font-size:10px;" class="q-ml-sm" v-html="formatFoundTextSearch(message.message, search_keyword)"></q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </div>

        <div v-else>
          <!-- <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
            @click="changeTabs()"
          >
          <q-tab name="friends" label="Friends" />
          <q-tab name="groups" label="Groups" />
          <q-tab name="barter" label="Barter Chat" />
          </q-tabs> -->

        <q-separator />

        <q-tab-panels v-model="tab" animated style="background: transparent !important;">
          <q-tab-panel name="friends" style="background: transparent !important;">
            <q-list>
              <div v-for="(user, index) in ka_chat"
              :key="index" class="q-my-xs">
                <q-item
                v-if="tab == 'friends'"
                clickable
                v-ripple
                @click="chat_input(user.chat_id, index, user.sender_id,  user.sender_username, user.receiver_id, user.receiver_username, user.last_active, user.message_id)"
                :active="is_active && index == idx"
                active-class="my-menu-link"
                style="border-radius: 20px"
                >

                <q-item-section avatar v-if="tab == 'friends'">
                  <q-avatar color="primary" text-color="white" size="50px" >
                  {{ user.chat_list_username.charAt(0).toUpperCase() }}
                  <q-badge v-if="listOnlineStatus(user.last_active) == 'Now'" color="green-5" floating style="border-radius: 50%; width: 10px; height: 11px; margin-top: 5px; margin-right: 5px; box-shadow: 0px 0px 0px 2px white"><span style="visibility: hidden;">o</span></q-badge>
                  </q-avatar>
                </q-item-section>

                <q-item-section v-if="tab == 'friends'">
                  <q-item-label class="q-ml-sm" >{{ user.chat_list_username}}</q-item-label>
                  <q-item-label caption class="q-ml-sm">{{ user.message }}</q-item-label>
                </q-item-section>

                 <q-item-section side v-if="listOnlineStatus(user.last_active) != 'Now'">
                    <q-item-label caption>{{ listOnlineStatus(user.last_active) }}</q-item-label>
                  </q-item-section>
                </q-item>

                <!-- <q-item-section side>
                  <q-badge
                    :color="user.is_online ? 'light-green-5' : 'grey-4' ">
                    {{user.is_online ? "." : "."}}
                  </q-badge>

                  {{user.is_online}}
                </q-item-section> -->
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
                v-if="tab == 'groups'"
                clickable
                v-ripple
                @click="chat_input_group(user.chat_id, user.user_name, index, user.chat_name, message.message_id)"
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
                  <q-item-label caption class="q-ml-sm">{{ user.message }}</q-item-label>
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
                v-if="tab == 'barter'"
                clickable
                v-ripple
                @click="chat_input(user.chat_id, index, user.sender_id,  user.sender_username, user.receiver_id, user.receiver_username, user.last_active, user.message_id)"
                :active="is_active && index == idx"
                active-class="my-menu-link"
                >

                <q-item-section avatar v-if="tab == 'barter'">
                  <q-avatar color="primary" text-color="white" >
                  {{ user.chat_name.charAt(0).toUpperCase() }}
                  <q-badge v-if="listOnlineStatus(user.last_active) == 'Now'" color="green-5" floating style="border-radius: 50%; width: 10px; height: 11px; margin-top: 5px; margin-right: 5px; box-shadow: 0px 0px 0px 2px white"><span style="visibility: hidden;">o</span></q-badge>
                  </q-avatar>
                </q-item-section>

                <q-item-section v-if="tab == 'barter'">
                  <q-item-label class="font-rubik-lables q-ml-sm" >{{ user.chat_name }}</q-item-label>
                  <q-item-label caption class="q-ml-sm">{{ user.message }}</q-item-label>
                </q-item-section>

                <q-item-section side v-if="listOnlineStatus(user.last_active) != 'Now'">
                    <q-item-label caption>{{ listOnlineStatus(user.last_active) }}</q-item-label>
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
			</div>

			    <!-- --------------------Conversation-------------------- -->
				<div class="col-8">
					<div class="q-pa-md flex flex-center"  style="height: 84.6vh;"  v-if="start_message == true">
						<div class="text-center font-rubik-labels column">
						<div class="q-mb-md">
						<q-icon name="fab fa-facebook-messenger" size="50px"></q-icon>
						</div>
						<div>
						<b>Once you open a conversation, <br>you’ll see it listed here.</b>
						</div>
						</div>
					</div>
					      <!-- --------------------------Convo------------------------------------------- -->
					<q-scroll-area
						v-if="chat_box==true"
						style="height: 75.4vh;"
						animated transition-prev="slide-down" transition-next="slide-up"
						id="chat_id"
					>
          	<div v-if="is_group == false &&  tab == 'barter'" class="view_details">
              <div class="q-pa-sm">
                <q-btn class="q-px-lg q-mr-md" @click="see_details()">See Details</q-btn>
                <q-btn class="q-px-lg" @click="view_profile()">View Profile</q-btn>
              </div>
            </div>
						<div class="q-pa-md column col justify-end" style="margin-top: 10%;">

						<div v-for="(message, index) in messages" :key ="index" id="chat_id">
							<q-infinite-scroll reverse>

                <div v-if="message.is_first == true || message.is_first == 'true'" style="font-size: 16px; text-align: center;">
                  {{message.date}} AT {{message.time}}
                </div>

								<div v-touch-hold.mouse="hold_to_delete"  @mousedown="delete_message(message)"  v-if="message.sender == 'me'" style="float: right;">
                  <div v-if="message.message_type == 'text' && clicked_search != '' && clicked_search == message.text" class="message_sender" id="clicked_search">
                    {{message.text}}
                  </div>
									<div v-else-if="message.message_type == 'text'" class="message_sender">
										{{message.text}}

                    <q-btn
                      class="gt-xs"
                      v-if="hold_delete_btn == true &&  message_to_remove.text == message.text"
                      @click="deleteMessage(message)"
                      size="9 px"
                      flat
                      dense
                      color="warning"
                      round
                      icon="delete"
                    />

									</div>

									<div v-else-if="message.message_type == 'images'">
										<q-img
										:src="`${server.IMAGE_URL}/5f90343d21e259119cb22fcc/5fbb864c334b554c8cc19f51/chat_files/images/${message.text}`"
                    class="message_sender_image"
                    style="width: 150px; cursor: pointer;"
                    :ratio="1"
                    @click="openAlert(message.text)"
										/>
										<!-- {{message.message_type}} -->
									</div>

                  <div @click="downloadDocument(message.text)" v-else-if="message.message_type == 'documents'" class="message_sender" style="cursor: pointer; text-decoration: underline;">
										<i class="fas fa-cloud-download-alt"></i> {{message.text}}
									</div>

                  <div v-else-if="message.message_type == 'custom_emoji'">
										<q-img
										:src="`${server.IMAGE_URL}/5f90343d21e259119cb22fcc/5fbb864c334b554c8cc19f51/chat_files/emoji/${message.text}`"
                    class="message_sender_image"
                    style="width: 50px;"
                    :ratio="1"
										/>
										<!-- {{message.message_type}} -->
									</div>
									<span style="float: right; font-size: 11px;" v-if="message.is_read">
                      <span v-if="message.chat_type == 'groups'">
                          <i style="color: #9A67AC;" class="fas fa-check"></i> Read by {{ message.read_username }}
                      </span>
                      <span v-else>
                          <i style="color: #9A67AC;" class="fas fa-check"></i> Read
                      </span> {{message.stamp}}
                  </span>
									<!-- <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
										{{message.stamp}}
									</q-tooltip> -->
									<!-- {{message}} -->
								</div>
								<div v-else style="float: left;">
									<div class="row q-mt-md">
                    <div class="self-end">
                      <!-- <q-skeleton type="QAvatar" /> -->
                      <q-avatar size="40px">
                        <img :src="`http://localhost:4000/avatar/${message.picture}`">
                      </q-avatar>
                    </div>
                        <div>
                          <div v-if="message.chat_type == 'groups'">
                          {{message.sender}}
                          </div>
                          <div v-if="message.message_type == 'text' && clicked_search != '' && clicked_search == message.text" class="message_receive" id="clicked_search">
                            {{message.text}}
                          </div>
                          <div v-else-if="message.message_type == 'text'" class="message_receive">
                            {{message.text}}
                          </div>
                          <div v-else-if="message.message_type == 'images'">
                          <q-img
                          :src="`${server.IMAGE_URL}/5f90343d21e259119cb22fcc/5fbb864c334b554c8cc19f51/chat_files/images/${message.text}`"
                          style="width: 150px; cursor: pointer;"
                          :ratio="1"
                          class="message_receive_image"
                          @click="openAlert(message.text)"
                          />
                          <!-- {{message.message_type}} -->
                        </div>
                        <div @click="downloadDocument(message.text)" v-else-if="message.message_type == 'documents'" class="message_receive" style="cursor: pointer; text-decoration: underline;">
										      <i class="fas fa-cloud-download-alt"></i> {{message.text}}
									      </div>
                        <div v-else-if="message.message_type == 'custom_emoji'">
                          <q-img
                          :src="`${server.IMAGE_URL}/5f90343d21e259119cb22fcc/5fbb864c334b554c8cc19f51/chat_files/emoji/${message.text}`"
                          class="message_receive_image"
                          style="width: 50px;"
                          :ratio="1"
                          />
                          <!-- {{message.message_type}} -->
                        </div>
                        <span style="float: left; font-size: 11px; margin-left: 5px;">
										      {{message.stamp}}
									      </span>
                      </div>
									</div>
								</div>
							<!-- <q-chat-message
							v-if="message.sender == 'me'"
							:text="[message.text]"
							sent
							:stamp="message.stamp"
							bg-color="primary"
							text-color="white"
							> -->
							<!-- <div v-if="sample && index == i">
							<q-btn @click="reply(index, message.text)">Reply</q-btn>
							<q-btn>React</q-btn>
							<q-btn>Remove</q-btn>
							</div> -->
							<!-- </q-chat-message> -->


							<!-- <q-chat-message
							v-else
							:avatar="message.picture"
							:text="[message.text]"
							:stamp="message.stamp"
							bg-color="grey-4"
							>
							</q-chat-message>	 -->
							</q-infinite-scroll>
						</div>
            <div v-if="is_typing" style="float: left;">
              <div class="row">
                <div class="self-end">
                  <!-- <q-skeleton type="QAvatar" /> -->
                  <q-avatar size="40px">
                    <img :src="`http://localhost:4000/avatar/${messages[0].picture}`">
                  </q-avatar>
                </div>
                <div>
                  <q-spinner-dots size="3rem" class="message_receive"/>
                </div>
              </div>
            </div>
							<div v-if="repliedMessage">
							<div style="background-color: black; color: white;">
								{{m}} <q-btn @click="closeReply">Close</q-btn>
							</div>
							</div>
						</div>
             <div id="preview">
                  <q-separator v-if="url_image.length > 0" />
                <div v-for="(image, index) in url_image" :key ="index" style="float: left;">
                  <img style="height: 100px; padding: 5px 5px 0px 5px; margin: 0 3px; border-radius: 10px" v-if="url_image.length > 0" :src="image" />
                  <q-btn
                  v-if="url_image.length > 0"
                  icon="fas fa-times"
                  round
                  color="primary"
                  class="remove__btn"
                  size="8px">
                  </q-btn>
                </div>
              </div>
					</q-scroll-area>

          <!------------------ image modal ----------------->
            <q-dialog
                  v-model="dialog"
                  persistent
                  :maximized="maximizedToggle"
                  transition-show="slide-up"
                  transition-hide="slide-down"
                >
                  <q-card class="bg-grey text-white">
                    <!-- <q-bar style="height: 50px;">
                      <q-space /> -->

                      <div class="row justify-center q-col-gutter-md" style="padding: 20px 0px; background-color: #000000; background-image: linear-gradient(315deg, #000000 0%, #7f8c8d 74%);">
                        <div class="col text-right">
                            <q-btn dense flat icon="fas fa-download" @click="downloadFile(modal_image)">
                              Download
                              <q-tooltip content-class="bg-white text-primary">Download</q-tooltip>
                            </q-btn>
                        </div>
                        <div class="col text-left">
                          <q-btn dense flat icon="close" v-close-popup>
                            Close
                            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
                          </q-btn>
                        </div>
                      </div>
                    <!-- </q-bar> -->
                    <br>
                    <q-card-section class="q-pt-none" style="width: 500px; height: 500px; margin: auto;">
                      <q-img
                          :src="`${server.IMAGE_URL}/5f90343d21e259119cb22fcc/5fbb864c334b554c8cc19f51/chat_files/images/${modal_image}`"
                      />
                    </q-card-section>
                    <div v-if="previousBtn" style="float: left;" class="self-center">
                      <q-btn color="black" @click="previousImage()"><i class="fas fa-chevron-left"></i></q-btn>
                    </div>
                    <div v-if="nextBtn" style="float: right;">
                      <q-btn color="black" @click="nextImage()"><i class="fas fa-chevron-right"></i></q-btn>
                    </div>

                    <q-card-section class="q-pt-none">
                      <q-page-sticky expand position="bottom">

                        <q-toolbar class="text-white" style="height: 100px; background-color: #000000; background-image: linear-gradient(315deg, #000000 0%, #7f8c8d 74%);">
                          <div v-for="(message, index) in image_arr.slice().reverse()" :key ="index" style="padding: 10px;">
                            <div>
                              <q-img
                              :src="`${server.IMAGE_URL}/5f90343d21e259119cb22fcc/5fbb864c334b554c8cc19f51/chat_files/images/${message}`"
                              style="margin: auto;"
                              :class="'q-ma-xs image '+[message==is_active ? 'selected' : '']"
                              @click.prevent="switchImage(index, message)"
                              />
                            </div>
                          </div>
                        </q-toolbar>

                      </q-page-sticky>
                    </q-card-section>
                  </q-card>
                </q-dialog>
          <!------------------ end of image modal ---------->
					      <!-- ------------------Send Message--------------------------------- -->
					<q-separator />
					<div class="row v" v-if="chat_input_send == true ">
          <!-- preview image -->
				<!-- 	<div id="preview">
            <div v-for="(image, index) in url_image" :key ="index" style="float: left;">
              <img style="height: 100px; padding: 10px;" v-if="url_image.length > 0" :src="image" />
              <q-btn v-if="url_image.length > 0"
              icon="fas fa-times"
              round
              flat
              class="remove__btn"
              size="10px"></q-btn>
            </div>
					</div> -->
          <!-- preview documents -->
					<div id="preview" v-if="url_video" style="padding: 10px;">
            <div class="docu_preview" style="position: relative;">

              <div style="float: left; height: 60px; width: 40px;">
                <i class="far fa-file-alt" style="font-size: 50px; padding: 5px;"></i>
              </div>

              <div style="float: right; padding: 20px;">
                {{url_video_name}}
              </div>
              <q-btn v-if="url_video != null"
              @click="url_video = null"
              icon="fas fa-times"
              round
              flat
              class="remove__btn"
              size="10px"
              style="position: absolute; right: 0; bottom: 35px;"></q-btn>
            </div>
						<!-- <video style="height: 100px; width: 100px" v-if="url_video" :src="url_video" /> -->
					</div>
					</div>

					<div class="row q-my-sm" v-if="chat_input_send == true">
            <div class="col-1 text-center">
                 <q-btn icon="fas fa-paperclip" class="" round flat>
                  <q-menu
                  transition-show="jump-up"
                  transition-hide="jump-down">
                    <q-list dense bordered padding class="rounded-borders" style="overflow-x: hidden !important; padding: 0;">
                      <q-item clickable v-ripple class="upload__image" v-close-popup>
                        <input ref="file" type="file" @change="onFileChange" accept="image/*" multiple />
                          <q-item-section avatar>
                            <q-icon size="20px" name="fas fa-image" />
                          </q-item-section>
                        <q-item-section>
                          Image Upload
                        </q-item-section>
                      </q-item>

                      <q-separator />

                      <q-item clickable v-ripple class="upload__video" v-close-popup>
                        <input class="file_2" type="file" @change="onFileChange2" accept="video/*" />
                        <q-item-section avatar>
                            <q-icon size="20px" name="fas fa-video" />
                          </q-item-section>
                        <q-item-section>
                          Video Upload
                        </q-item-section>
                      </q-item>

                      <q-separator />

                      <q-item clickable v-ripple class="upload__file" v-close-popup>
                        <input class="file_2" type="file" @change="onFileChange2" accept="application/msword, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
                        <q-item-section avatar>
                            <q-icon size="20px" name="fas fa-file-alt" />
                          </q-item-section>
                        <q-item-section>
                          File Upload
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                 </q-btn>
            </div>








						<!-- <q-btn icon="fas fa-plus" class="btn_file" round>
						<q-menu anchor="top middle" self="bottom middle">
							<div class="col-1.5 q-pt-xs q-mx-sm upload__file row">
							<q-item v-close-popup>
							<div class="upload__image">
							<input type="file" @change="onFileChange"  multiple/>
							<q-btn icon="far fa-image" class="btn_file q-my-xs" round></q-btn>
							</div>
							</q-item>
							<q-item v-close-popup>
							<div class="upload__video">
								<input class="file_2" type="file" @change="onFileChange2" />
							<q-btn icon="fas fa-video" class="btn_file q-my-xs" round></q-btn>
							</div>
							</q-item>
							</div>
						</q-menu>
						</q-btn> -->















						<div class="col-10">
							<q-input
								bg-color="white"
								outlined
								v-model="newMessage"
								placeholder="Aa"
								dense
                rounded
								@keyup.enter="trigger"
							>
								<template v-slot:append>
								<q-btn round @click="toogleDialogEmoji" flat style="margin-right: -10px"><i class="far fa-smile" style="font-size: 25px;"></i></q-btn>
								</template>
							</q-input>
						</div>
						<div class="col-1 text-center">
						<q-btn v-if="newMessage || url_image.length > 0 || url_video" round icon="fas fa-paper-plane" flat class="q-ml-xs q-mr-md" @click="sendMessage()" :loading="loading5">
							<template v-slot:loading>
							<q-spinner-facebook  color="secondary"/>
							</template>
						</q-btn>
						<q-btn v-else round flat class="q-ml-xs q-mr-md" @click="sendEmoji(my_emoji)" :loading="loading5">
							<q-avatar size="42px">
							  <q-img :src="`${server.IMAGE_URL}/5f90343d21e259119cb22fcc/5fbb864c334b554c8cc19f51/chat_files/emoji/${my_emoji}`" />
							</q-avatar>
							<template v-slot:loading>
							<q-spinner-facebook  color="secondary"/>
							</template>
						</q-btn>
						</div>

						<q-dialog v-model="showDialog" style="overflow-y: hidden !important;" position="right">
							<VEmojiPicker
								labelSearch="Search"
								lang="pt-BR"
								@select="onSelectEmoji"
								style="margin-right: 10px !important; margin-bottom: 25%;"
							/>
						</q-dialog>

					</div>
				</div>

		</div>
	</div>
</template>

<script>
import io from 'socket.io-client';
import {postSendMessage,
        getMessage,
        postGetUsers,
        postNewChatDetails,
        getChatMatesStatus,
        getEmojiList,
        updateChatEmoji,
        postAddGroupChat,
        deleteMessage,
        getUserMessages,
        readMessage
        } from '../../references/url';
import moment from "moment";
import { VEmojiPicker, emojisDefault, categoriesDefault } from "v-emoji-picker";
import config   from '../../../config';
import imageCompression from 'browser-image-compression';
import { group } from 'console';
import Swal from "sweetalert2";
import { Notify } from 'quasar';

export default {
  components:
  {
    VEmojiPicker
  },
  props:{
    id: String
  },
  data: () => ({
        socket: {},
        user: {},
        config: config,
        server: {
            IMAGE_URL: config.IMAGE_URL
        },
        users : [],
        newMessage: '',
        message_details:
        {
          newMessage: '',
          chat_file: null,
          message_type: 'text',
          receiver_id: '',
          is_first: false
        },

        messages:
        [
					// {
					// 	text: 'Hi, Thanks for contacting us. We\'ve received your message and appreciate you for reaching out.',
          //   sender: 'me',
          //   stamp:''
					// }
        ],

        seller_name: '',
        chat_list: "",
        url_image: [],
        url_video: null,
        loading5: false,
        chat_input_send: false,
        start_message: true,
        chat_box: false,
        chat_name: false,
        chat_id: '',
        is_typing: false,
        showDialog: false,
        my_id:
        {
          id : '',
        },
        ka_chat: [],
        current_chat_mates: [],
        selected_ka_chat: '',
        selected: {
          by_user : '',
          ka_chat : '',
          chat_id : ''
        },
        user: '',
        current_chat: {
          is_typing: '',
          chat_id: '',
          sender: '',
          receiver: ''
        },
        sample: false,
        sample_leave: false,
        i : 0,
        repliedMessage: false,
        m: '',
        is_active: false,
        idx: null,
        chat_name_truncated: '',
        chat_names: '',
        dialog: false,
        maximizedToggle: true,
        modal_image: '',
        is_active: null,
        url_video_name: '',
        custom_emoji: 'now-01.2.png',
        image_arr: [],
        previousBtn: true,
        nextBtn: true,
        tab: 'friends',
        chatmates_id: [],
        prod_id: '',
        last_active: '',
        change_emoji: false,
        emoji_list: [],
        my_emoji: '',
        create_group: false,
        group: [],
        options: [],
        group_name: '',
        is_group: false,
        initiated: {
          user_id : '',
          username: ''
        },
        user_infoDrawer: false,
        hold_delete_btn: false,
        message_to_remove:{},
        document_name: null,
        search_result: [],
        user_messages: [],
        search_keyword: '',
        clicked_search: '',
        friendOnlineStatus: '',
        onlineStatus: '',
  }),

  async mounted() {
    await this.isUserLoggedIn();
    // await this.getUsers();

    if(this.$props.id) await this.getNewChatDetails(this.$props.id);
    this.socket = io('http://localhost:4000', {transports: ['websocket', 'polling', 'flashsocket']});

    this.socket.on('new_message', (data) => {
      console.log(data);
      if(data.is_group == false) this.getMessage();
      else this.getMessageGroup();

        if(this.my_id.id == data.receiver_id){
        this.$q.notify({
          message: 'Jim pinged you.',
          color: 'purple',
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png'
        })
        }

    });

    this.socket.on('new_user', (data) => {
          this.users.push({
            id: data.user_id,
            name: data.user_name,
            online: data.user_status
          });
        });

    this.socket.on('is_typing', (data) => {
      this.current_chat.chat_id = data.chat_id;
      this.current_chat.is_typing = data.is_typing;
      this.current_chat.sender = data.sender;
      this.current_chat.receiver = data.receiver;
      this.setTyping();
    });

    this.socket.on('change_chat_room', (data) => {
      // console.log(data)
      this.selected.by_user = data.by_user;
      this.selected.ka_chat = data.selected_ka_chat;
      this.selected.chat_id = data.chat_id;

      this.setTyping();
    });

    // this.socket.on('initiate_chat_personal', (data) => {
    //   this.initiateChatPersonal(data.user_id, data.username);
    // });
    // this.socket.on('is_online', (data) => {
    //   console.log('is online', data);
    //   console.log('chat info', this.user.data.user)
    // });

    // this.socket.on('disconnect', () =>
    // {
    //       console.log('client--- Disconnected to the server ---');
    // });

    await this.getUserMessages();
    this.filterSearchData();
  },

  watch:{

    // sets the typing function
    newMessage: function(){
      if(this.newMessage == '')
      {
        let a = this.user.data.user.username;
        // let receiver_username  = this.messages.filter(x => x.sender == 'me');
        let receiver_username = this.ka_chat.filter(x => x.chat_id == this.chat_id);
        this.socket.emit('is_typing', { is_typing: false, chat_id: this.chat_id, sender: a, receiver: receiver_username[0].user_name});
      }
      else
      {
        let a = this.user.data.user.username;
        this.message_details.newMessage = this.newMessage;
        // let receiver_username  = this.messages.filter(x => x.sender == 'me');
        let receiver_username = this.ka_chat.filter(x => x.chat_id == this.chat_id);
        this.socket.emit('is_typing', { is_typing: true, chat_id: this.chat_id, sender: a, receiver: receiver_username[0].user_name });
      }
    },
  },

  methods: {
    trigger()
    {
      if(this.newMessage.trim() != '') this.sendMessage();
    },

    async setTyping()
    {
      let a = this.user.data.user.username;
      if((this.current_chat.chat_id == this.chat_id) && (this.current_chat.receiver == a))
      {
        this.is_typing = this.current_chat.is_typing;
      }
      else
      {
        this.is_typing = false;
      }
    },

    async getUsers()
    {
      let res = await this.$_post(postGetUsers, this.my_id);
      this.ka_chat = res.data;

      // store user's ka chat personal to be used in the group chat members options
      let frnds = this.ka_chat.filter(x => x.chat_type == 'friends');
      let details = {
        label : '',
        value : '',
      }
      for(let i=0;i<frnds.length;i++)
      {
        details = {
          label : frnds[i].user_name,
          value : frnds[i].user_id
        }
        this.options.push(details);
      }
    },

    toogleDialogEmoji() {
      this.showDialog = !this.showDialog;
    },

    onSelectEmoji(emoji) {
      this.newMessage += emoji.data;
      this.toogleDialogEmoji();
    },

    async sendMessage() {
      console.log('gumana ka', this.message_details);

      const date_tdy = moment(Date.now()).format('MMM DD YYYY');
      let filter_by_today = this.messages.filter(x => x.full_date == date_tdy);
      // console.log('1', filter_by_today.length)
      if(filter_by_today.length > 0 && filter_by_today[0].is_first == 'true') this.message_details.is_first = 'false';
      else this.message_details.is_first = 'true';

      const fd = new FormData();
      if(this.is_group)
      {
        this.message_details.chat_id = this.chat_id;
        this.message_details.sender_username = this.user.data.user.username;
        this.message_details.sender_id = this.user.data.user._id;

        console.log('message details1', this.message_details);
        // return;
        fd.append('chat_id', this.message_details.chat_id);
        fd.append('sender_id', this.message_details.sender_id);
        fd.append('sender_username', this.message_details.sender_username);
        fd.append('receiver_id', null);
        fd.append('receiver_username', this.group);
        fd.append('message', this.message_details.newMessage);
        fd.append('message_type', this.message_details.message_type);
        fd.append('is_first', this.message_details.is_first);

        if(this.message_details.chat_file)
        {
          for(let i=0;i<this.message_details.chat_file.length;i++)
          {
            let f = this.message_details.chat_file[i];
            fd.append('file', f);
          }
        }

      }
      else
      {
        this.message_details.chat_id = this.chat_id;
        this.message_details.sender_username = this.user.data.user.username;
        this.message_details.sender_id = this.user.data.user._id;

        console.log('message details1', this.message_details);

        fd.append('chat_id', this.message_details.chat_id);
        fd.append('sender_id', this.message_details.sender_id);
        fd.append('sender_username', this.message_details.sender_username);
        fd.append('receiver_id', this.message_details.receiver_id);
        fd.append('receiver_username', this.message_details.receiver_username);
        fd.append('message', this.message_details.newMessage);
        fd.append('message_type', this.message_details.message_type);
        fd.append('is_first', this.message_details.is_first);

        if( this.document_name)
        {
            let f = this.document_name;
            fd.append('file', f);
        }

        if(this.message_details.chat_file)
        {
          for(let i=0;i<this.message_details.chat_file.length;i++)
          {
            let f = this.message_details.chat_file[i];
            fd.append('file', f);
          }
        }
      }
      let res = await this.$_post(postSendMessage, fd);
      if (res.status == 200)
      {
        this.newMessage = '';
        this.message_details.newMessage = '';
        this.url_image = [];
        this.message_details.message_type = 'text';
        this.message_details.chat_file = null;
        this.socket.emit('new_message', { message: this.message_details.newMessage, sender: this.message_details.sender, receiver: this.message_details.receiver, is_group: this.is_group});
      }
    },

    // gets message for the chat that are for personal/barter
    async getMessage(){
      this.messages = [];
      let get_details = { user_id: this.chat_id }
      let res = await this.$_post(getMessage, get_details);

      let count = 0;

      this.chatmates_id.push(res.data.message_details[0].sender_id);
      this.chatmates_id.push(res.data.message_details[0].receiver_id);
      this.prod_id = res.data.prod_id;

      this.current_chat_mates[0] = res.data.message_details[0].sender_username;
      this.current_chat_mates[1] = res.data.message_details[0].receiver_username;

      this.my_emoji = res.data.emoji;

      if(res.data.message_details[0].chat_name)
      {
        if(res.data.message_details[0].chat_name.length > 20) {
          this.chat_name_truncated = res.data.message_details[0].chat_name.substring(0, 20) + '...';
          this.chat_names = res.data.message_details[0].chat_name;
          this.seller_name = res.data.message_details[0].user_name;
        }else {
          this.chat_names = res.data.message_details[0].chat_name;
          this.seller_name = res.data.message_details[0].user_name;
        }
      }
      else
      {
        let receiver = res.data.message_details[0].receiver_username == this.user.data.user.username ? res.data.message_details[0].sender_username : res.data.message_details[0].receiver_username;

        if(res.data.message_details[0].receiver_username.length > 20) {
          this.chat_name_truncated = res.data.message_details[0].receiver_username.substring(0, 20) + '...';
          this.chat_names = receiver;
          this.seller_name = res.data.message_details[0].sender_username;
        }else {
          this.chat_names = receiver;
          this.seller_name = res.data.message_details[0].sender_username;
        }
      }

      res.data.message_details.forEach( item => {
          let ts = res.data.message_details[count].created_at;
		//   ts = moment(ts).fromNow();
			 ts = moment(ts).format("ddd, hA");

          let sender = res.data.message_details[count].sender_username == this.user.data.user.username ? 'me' : res.data.message_details[count].sender_username;

          this.messages.push({
            picture: 'MALE/1601622250685.jpeg',
            text: res.data.message_details[count].message,
            sender: sender,
            receiver: res.data.message_details[count].receiver_username,
            stamp: ts,
            full_date: moment(res.data.message_details[count].created_at).format('MMM DD YYYY'),
            date: moment(res.data.message_details[count].created_at).format('MMM DD'),
            time: moment(res.data.message_details[count].created_at).format('h:mm a'),
            message_type: res.data.message_details[count].message_type,
            is_first: res.data.message_details[count].is_first,
            is_read: (typeof res.data.message_details[count].is_read != 'undefined') ? res.data.message_details[count].is_read : false
          });
          if(res.data.message_details[count].message_type == 'images')
          {
            this.image_arr.push(res.data.message_details[count].message);
          }
          count++;
      })

      // search clicked to edit chi
      console.log(document.getElementById('clicked_search'));
      if (this.messages != [] && this.clicked_search != '' && document.getElementById('clicked_search') != null) {
        // this.$nextTick(() => {
        //   this.$refs.clicked_search[0].focus();
        // });
        this.$nextTick(() => {
          console.log(document.getElementById('clicked_search'));
          let container = document.getElementById('clicked_search');
          container.scrollIntoView({behavior: "smooth", inline: "end"});
          document.getElementById('clicked_search').focus();
        });
      }

      let index = res.data.message_details.length - 1;
      this.readMessage(this.chat_id, res.data.message_details[index].message_id, 'individual');
    },

    // gets the message for group chats
    async getMessageGroup(){
      this.messages = [];
      let get_details = { user_id: this.chat_id }
      let res = await this.$_post(getMessage, get_details);

      let count = 0;

      // this.chatmates_id.push(res.data.message_details[0].sender_id);
      // this.chatmates_id.push(res.data.message_details[0].receiver_id);
      // this.prod_id = res.data.prod_id;

      // this.current_chat_mates[0] = res.data.message_details[0].sender_username;
      // this.current_chat_mates[1] = res.data.message_details[0].receiver_username;

      this.my_emoji = res.data.emoji;

      if(res.data.message_details[0].chat_name.length > 20)
      {
        this.chat_name_truncated = res.data.message_details[0].chat_name.substring(0, 20) + '...';
        this.chat_names = res.data.message_details[0].chat_name;
        this.seller_name = res.data.message_details[0].user_name;
      }else
      {
        this.chat_names = res.data.message_details[0].chat_name;
        this.seller_name = res.data.message_details[0].user_name;
      }

      res.data.message_details.forEach( item => {
          let ts = res.data.message_details[count].created_at;
		//   ts = moment(ts).fromNow();
			 ts = moment(ts).format("ddd, hA");

          let sender = res.data.message_details[count].sender_username == this.user.data.user.username ? 'me' : res.data.message_details[count].sender_username;
          let read_username = typeof res.data.message_details[count].read_username != 'undefined' ? res.data.message_details[count].read_username.join(', ') : '';

          this.messages.push({
            picture: 'MALE/1601622250685.jpeg',
            text: res.data.message_details[count].message,
            sender: sender,
            receiver: res.data.message_details[count].receiver_username,
            stamp: ts,
            full_date: moment(res.data.message_details[count].created_at).format('MMM DD YYYY'),
            date: moment(res.data.message_details[count].created_at).format('MMM DD'),
            time: moment(res.data.message_details[count].created_at).format('h:mm a'),
            message_type: res.data.message_details[count].message_type,
            is_first: res.data.message_details[count].is_first,
            chat_type: 'groups',
            is_read: (typeof res.data.message_details[count].is_read != 'undefined') ? res.data.message_details[count].is_read : false
          });
          if(res.data.message_details[count].message_type == 'images')
          {
            this.image_arr.push(res.data.message_details[count].message);
          }
          console.log(this.messages)
          count++;
      });

      let index = res.data.message_details.length - 1;
      this.readMessage(this.chat_id, res.data.message_details[index].message_id, 'group');
    },

    // for images
    async onFileChange(e) {
      const file = e.target.files;
      // console.log('f', file);
      // const options = {
      //   maxSizeMB: 1,
      //   useWebWorker: true
      // }

      // const compressedFile = await imageCompression(file, options);
      // console.log(compressedFile)
      // return;
      // this.message_details.chat_file = compressedFile;
      this.message_details.chat_file = file;
      this.message_details.message_type = 'images';
      for(let i = 0; i < file.length; i++)
      {
        this.url_image.push(URL.createObjectURL(file[i]));
      }
      console.log('chat file', this.message_details.chat_file)
    },

    // for documents
    onFileChange2(e) {
      const file = e.target.files[0];

      this.message_details.chat_file = file;
      this.message_details.message_type = 'documents';
      this.document_name = file;
      this.url_video = URL.createObjectURL(file);
      this.url_video_name = file.name;

      console.log('chat document', this.message_details.chat_file)
    },

    // this function is when you click a name in friends tab or a chat name in barter tab, to select which chat will be opened
    async chat_input(id, index, sender_id, sender_username,  receiver_id, receiver_username, last_active, message_id, clicked_message = '') {

      this.message_details.receiver_id = (this.my_id.id == receiver_id) ? sender_id : receiver_id;
            this.message_details.receiver_username = (this.my_id.id == receiver_id) ? sender_username : receiver_username;
            this.message_details.sender_id = (this.my_id.id == receiver_id) ? receiver_id : sender_id;
            this.message_details.sender_username = (this.my_id.id == receiver_id) ? receiver_username : sender_username;
      this.chat_id = id;
      this.message_details.chat_id = id;
      this.seller_name = name;
      this.chat_input_send = true;
      this.chat_box = true;
      this.start_message = false;
      this.chat_name = true;
      this.messages = [];
      this.is_active = true;
      this.idx = index;
      this.is_group = false;
      this.last_active = this.listOnlineStatus(last_active);

      if (clicked_message != '') {
        this.clicked_search = clicked_message;
      }

      // await this.checkOnlineStatus(user_id);

      this.getMessage();
      this.readMessage(id, message_id);
    },

    // this function is when you click a name in groups tab, to select which chat will be opened
    chat_input_group(id, name, index, chat_name, message_id) {

      this.message_details.receiver_username = name;
      this.chat_id = id;
      this.message_details.chat_id = id;
      this.seller_name = chat_name;
      this.chat_input_send = true;
      this.chat_box = true;
      this.start_message = false;
      this.chat_name = true;
      this.messages = [];
      this.is_active = true;
      this.idx = index;
      this.is_group = true;

      this.getMessageGroup();
      this.readMessage(id, message_id, 'group');
    },

    async isUserLoggedIn()
    {
      this.user = await this.$_isUserAuthenticated();
      this.my_id.id = this.user.data.user._id;
    },

    // triggers when you initiate a chat in the product details
    async getNewChatDetails(id)
    {
      let newChat = await this.$_post(postNewChatDetails, {id: id});
      console.log('new chat', newChat);
      this.is_active = true;
      // this.idx = index;
      // console.log(this.my_id)
      await this.getUsers();
      console.log('ka-chat', this.ka_chat);
      console.log('new chat', newChat);
      this.idx = newChat.data[0].user_id;
      this.chat_id = newChat.data[0].chat_id;
      if(newChat.data[0].chat_name.length > 20)
      {
        this.chat_name_truncated = newChat.data[0].chat_name.substring(0, 20) + '...';
        this.chat_names = newChat.data[0].chat_name;
        this.seller_name = newChat.data[0].user_name;
      }else
      {
        this.chat_names = newChat.data[0].chat_name;
        this.seller_name = newChat.data[0].user_name;
      }
      this.chat_input_send = true;
      this.chat_box = true;
      this.start_message = false;
      this.chat_name = true;
      this.messages = [];
      this.getMessage();
    },

    // keyEvent()
    // {
    //   // @keypress="keyEvent"
    //   // this.is_typing = true;
    //   // this.socket.emit('is_typing', { is_typing: true});
    // }

    // opens a modal for viewing sent images
    openAlert(image)
    {
      this.dialog = true;
      this.modal_image = image;
      this.is_active = image;

      let currentImageIndex = this.image_arr.findIndex(x => x == image);

      if(currentImageIndex == this.image_arr.length - 1)
      {
        this.previousBtn = false;
        this.nextBtn = true;
      }

      if(currentImageIndex == 0)
      {
        this.nextBtn = false;
        this.previousBtn = true;
      }

      if(currentImageIndex != 0 && currentImageIndex != this.image_arr.length - 1)
      {
        this.previousBtn = true;
        this.nextBtn = true;
      }
    },

    downloadFile(image)
    {
      this.$axios({
        url: this.server.IMAGE_URL + '/5f90343d21e259119cb22fcc/5fbb864c334b554c8cc19f51/chat_files/images/' + image,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement('a');

        fileLink.href = fileURL;
        fileLink.setAttribute('download', image);
        document.body.appendChild(fileLink);

        fileLink.click();
      });
    },

    async switchImage(index, image)
    {
      // alert(index)
      this.modal_image = image;
      this.is_active = image;

      let currentImageIndex = this.image_arr.findIndex(x => x == image);

      if(currentImageIndex == this.image_arr.length - 1)
      {
        this.previousBtn = false;
        this.nextBtn = true;
      }

      if(currentImageIndex == 0)
      {
        this.nextBtn = false;
        this.previousBtn = true;
      }

      if(currentImageIndex != 0 && currentImageIndex != this.image_arr.length - 1)
      {
        this.previousBtn = true;
        this.nextBtn = true;
      }
    },

    async downloadDocument(file)
    {
      this.$axios({
        url: this.server.IMAGE_URL + '/5f90343d21e259119cb22fcc/5fbb864c334b554c8cc19f51/chat_files/documents/' + file,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement('a');

        fileLink.href = fileURL;
        fileLink.setAttribute('download', file);
        document.body.appendChild(fileLink);

        fileLink.click();
      });
    },

    // triggers when sending the custom emoji
    async sendEmoji(emoji)
    {
      const date_tdy = moment(Date.now()).format('MMM DD YYYY');
      let filter_by_today = this.messages.filter(x => x.full_date == date_tdy);
      console.log('1', filter_by_today.length)
      if(filter_by_today.length > 0 && filter_by_today[0].is_first == 'true') this.message_details.is_first = 'false';
      else this.message_details.is_first = 'true';

      this.message_details.chat_id = this.chat_id;
      this.message_details.sender_username = this.user.data.user.username;
      this.message_details.sender_id = this.user.data.user._id;
      this.message_details.message_type = 'custom_emoji';

      // console.log(this.message_details);
      // return;
      const fd = new FormData();

      fd.append('chat_id', this.message_details.chat_id);
      fd.append('sender_id', this.message_details.sender_id);
      fd.append('sender_username', this.message_details.sender_username);
      fd.append('receiver_id', this.message_details.receiver_id);
      fd.append('receiver_username', this.message_details.receiver_username);
      fd.append('message', emoji);
      fd.append('message_type', this.message_details.message_type);
      fd.append('file', this.message_details.chat_file);
      fd.append('is_first', this.message_details.is_first);

      let res = await this.$_post(postSendMessage, fd);

      if (res.status == 200) {
        this.socket.emit('new_message', { message: this.message_details.newMessage, sender: this.message_details.sender, receiver: this.message_details.receiver});
        this.newMessage = '';
        this.message_details.newMessage = '';
        this.url_image = [];
        this.message_details.message_type = 'text';
      }
    },

    // for right button in the image modal
    nextImage()
    {
      let currentImageIndex = this.image_arr.findIndex(x => x == this.modal_image);
      // let nextImageValue = this.image_arr.find(x => x == this.modal_image);

      let nextImageIndex = currentImageIndex - 1;
      if(nextImageIndex == 0)
      {
        this.nextBtn = false;
      }
      let nextImageValue = this.image_arr.filter((x, index) => index == nextImageIndex);

      this.previousBtn = true;
      this.modal_image = nextImageValue;
      this.is_active = nextImageValue;
    },

    // for left button in the image modal
    previousImage()
    {
      let currentImageIndex = this.image_arr.findIndex(x => x == this.modal_image);
      let nextImageIndex = currentImageIndex + 1;
      if(nextImageIndex == this.image_arr.length - 1)
      {
        this.previousBtn = false;
      }
      let nextImageValue = this.image_arr.filter((x, index) => index == nextImageIndex);

      this.nextBtn = true;
      this.modal_image = nextImageValue;
      this.is_active = nextImageValue;
    },

    // redirects to ka chat's profile
    async view_profile()
    {
      const viewed_id = this.chatmates_id.filter(x => x != this.user.data.user._id);
      window.location.href = `#/user/details/${viewed_id}`;
      // http://localhost:8080/#/user/details/5f7ad6515fbf0018b82be1c2
    },

    // redirects to product details
    async see_details()
    {
      window.location.href = `#/product/details/${this.prod_id}`;
    },

    // checks if the ka chat is online or how many hours not online; Note: Not yet dynamic
    async checkOnlineStatus(user_id)
    {
      let res = await this.$_post(getChatMatesStatus, {ids: user_id});

      if(res.status == 200)
      {
          if(res.data.timestamp == 0)
          {
            this.last_active = 'Now';
          }
          else
          {
            let ts = moment(res.data.timestamp).fromNow();
            this.last_active = ts;
          }
      }
    },

    // displays all available emoji in the modal
    async change_emojis()
    {
      let res = await this.$_get(getEmojiList);
      this.emoji_list = res.data;
      this.change_emoji = true;
    },

    // triggers when you choose an emoji
    async chooseEmoji(index)
    {

      this.my_emoji = this.emoji_list[index].emoji_name;

      let res = await this.$_post(updateChatEmoji, {emoji_name: this.my_emoji, chat_id: this.chat_id});

      if(res.status == 200)
      {
        this.change_emoji = false;
      }
    },

    // creating group chat
    async createGroup()
    {
      if(this.group_name == '' || this.group.length < 1)
      {
        alert('Group name/Group members must not be empty.')
      }
      else
      {
        this.group.push(this.user.data.user._id);
        let group_details = {
          group_name : this.group_name,
          members    : this.group,
          chat_type  : 'groups'
        }

        let res = await this.$_post(postAddGroupChat, group_details);

        console.log('group res', res);
      }
    },

    // changing the 3 tabs (friends, group, barter)
    changeTabs()
    {
      this.start_message = true;
      this.chat_box = false;
      this.chat_name = false;
      this.is_active = false;
      this.idx = null;
      this.chat_input_send = false;

      this.ka_chat = [];
      // if (this.search_keyword != '') {
        this.filterSearchData();
      // }
    },
    async user_infoDrawerBtnIsOpen()
    {
      this.user_infoDrawer = true;

        if(this.user_infoDrawer == true) {
             this.$q.localStorage.set('user_infoDrawer', true)
          } else {
            this.$q.localStorage.set('user_infoDrawer', false)
          }
    },
    async user_infoDrawerBtnIsClose()
    {
      this.user_infoDrawer = true;

        if(this.user_infoDrawer == true) {
             this.$q.localStorage.set('user_infoDrawer', true)
          } else {
            this.$q.localStorage.set('user_infoDrawer', false)
          }
    },
// Contributor: Andrea Lyn Destajo
    check_profile()
    {
       this.$router.push({name: 'front_user_detail', params: {id: this.message_details.receiver_id } });
    },

    hold_to_delete ({ evt, ...info }) {
      this.hold_delete_btn = true;
    },

    delete_message(details)
    {
      this.message_to_remove=details;
      console.log(this.message_details)
    },

    async deleteMessage(details)
    {
      details.chat_id = this.message_details.chat_id;
      console.log(details)
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are sure you want to delete this message?',
        cancel: true,
        persistent: true
      }).onOk( async () => {
        let result = await this.$_post(deleteMessage, details);

        console.log(result)
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })

    },

    async getUserMessages()
    {
      let messages = await this.$_get(getUserMessages);

      if (messages.data.status == 'success') {
        this.user_messages = messages.data.data;
      }
    },

    filterSearchData()
    {
      if (this.search_keyword != '') {
        let receiver_username = [];

        this.user_messages.forEach(messages => {
            if (messages._id == this.tab) {
                messages.data.forEach(m => {
                    m.messages.forEach(message => {
                        this.search_result = message.message_details.filter(msg => {
                            let chat_name = (this.tab != 'friends') ? message.message_details[0].chat_name : '';
                            msg.chat_name = chat_name;
                            return msg.message.toLowerCase().indexOf(this.search_keyword.toLowerCase()) > -1;
                        });

                        if (this.search_result.length == 0) {
                            this.search_result = message.message_details.reverse().filter(msg => {
                                if (!receiver_username.includes(msg.receiver_username)) {
                                    receiver_username.push(msg.receiver_username);
                                    return msg.receiver_username.indexOf(this.search_keyword.toLowerCase()) > -1;
                                }
                            });
                        }
                    });
                });
            }
        });
    } else {
        let receiver_username = [];

        this.user_messages.forEach(messages => {

            if (messages._id == this.tab) {

                messages.data.reverse().forEach(m => {
                    m.messages.forEach((message, index) => {
                        let last = message.message_details.length - 1;

                        if (this.tab == 'friends') {
                            this.onlineStatus = m.last_active[0];

                            message.message_details[last].last_active = this.onlineStatus;
                            message.message_details[last].user_id = m.friend_user_id;

                            if (message.message_details[last].receiver_id == this.my_id.id) {
                                message.message_details[last].chat_list_username = message.message_details[last].sender_username;
                            } else {
                                message.message_details[last].chat_list_username = message.message_details[last].receiver_username;
                            }

                            if (!receiver_username.includes(message.message_details[last].chat_list_username)) {
                                receiver_username.push(message.message_details[last].chat_list_username);
                                this.ka_chat.push(message.message_details[last]);
                            }
                        } else if (typeof message.message_details[0].chat_name != 'undefined') {
                            if (this.tab == 'barter') {
                                this.onlineStatus = m.last_active[0];
                                message.message_details[last].last_active = this.onlineStatus;
                                message.message_details[last].user_id = m.friend_user_id;
                            }

                            let chat_name = message.message_details[0].chat_name;

                            message.message_details[last].chat_name = chat_name;

                            if (index == 0) {
                                message.message_details[last].chat_id = message._id;
                            }

                            this.ka_chat.push(message.message_details[last]);
                        }
                    });
                });
            }
        });
        console.log(this.ka_chat, 'ka_chat')
      }
    },

    listOnlineStatus(timestamp)
    {
      if (timestamp !== 0) {
        return moment(timestamp).fromNow();;
      } else {
        return 'Now';
      }
    },

    formatFoundTextSearch(text, search_keyword)
    {
      const regexp = new RegExp(search_keyword, 'ig'); // ignore case (optional) and match all
      const replaceMask = `<span class="search_highlight">${search_keyword}</span>`;

      return text.replace(regexp, replaceMask);
    },

    async readMessage(chat_id, message_id, type = 'individual')
    {
        await this.$_post(readMessage, {
            chat_id     : chat_id,
            message_id  : message_id,
            type        : type
        });
    }
  },

  created () {
    let user_infoDrawer = this.$q.localStorage.has('user_infoDrawer')
    let value = this.$q.localStorage.getItem('user_infoDrawer')
    if(user_infoDrawer){
      this.user_infoDrawer = value;

    } else {
      this.user_infoDrawer.set(false)
    }
  }

}
</script>

<style lang="sass">
.my-emoticon
  vertical-align: middle
  height: 2em
  width: 2em
</style>

<style>
*{
  scroll-behavior: unset !important;
}
.upload__image input {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 20px;
    height: 20px;
    opacity: 0;
    cursor: pointer;
    z-index: 10;
  }
  .upload__image input[type="file"] {
    padding: 100px;
    background: #2d2d2d;
  }
  .upload__video input {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    width: 10px;
    height: 10px;
    opacity: 0;
    cursor: pointer;
    z-index: 10;
  }
  .upload__video input[type="file"] {
    padding: 16px 200px;
    background: #2d2d2d;
  }
  .upload__file input {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    width: 10px;
    height: 10px;
    opacity: 0;
    cursor: pointer;
    z-index: 10;
  }
  .upload__file input[type="file"] {
    padding: 12px 200px;
    background: #2d2d2d;
  }
  .btn_file {
    z-index: 8px;
  }
  .remove__btn {
    margin-left: -35px;
    margin-top: -25px;
    color: black;
    z-index: 10;
  }
  .my-menu-link {
    color: black;
    background: #e8e8e8;
  }

  #message_text {
	   width: 300px;
  margin: 50px auto;
  border: 4px solid #00bfb6;
  padding: 20px;
  text-align: center;
  font-weight: 900;
  color: #00bfb6;
  font-family: arial;
  position: relative;
  }

  .message_sender {
	border-radius: 1em;
	padding: 10px;
	margin: 0.0625em;
	max-width: 100%;
	/* border: 1px solid black; */
	/* margin: 10px auto; */
	align-self: flex-end;
	background-color: #bd80d3;
	color: #fff;
	border-bottom-right-radius: 0.1em;
  }

  .message_sender_image {
	border-radius: 1em;
	padding: 10px;
	margin: 0.0625em;
	/* width: 100%; */
	/* border: 1px solid black; */
	/* margin: 10px auto; */
	align-self: flex-end;
	/* background-color: cornflowerblue;
	color: #fff; */
	border-bottom-right-radius: 0.1em;
  }

  .message_receive {
	border-radius: 1em;
	padding: 10px;
	margin: 0.0625em;
  margin-left: 5px;
	max-width: 100%;
	/* min-width: 50%; */
	align-self: flex-start;
	background-color: #fde9d1;
	border-bottom-left-radius: 0.1em;
  }

  .message_receive_image {
	border-radius: 1em;
	padding: 10px;
	margin: 0.0625em;
  margin-left: 5px;
	max-width: 100%;
	/* min-width: 50%; */
	align-self: flex-start;
	/* background-color: #efefef; */
	border-bottom-left-radius: 0.1em;
  }

  .image:hover {
    border: 2px solid #9A67AC;

}

.image {
    cursor: pointer;
    height: 100px;
    width: 100px;
    border: 2px solid #FDB81F;
     transition: 0.5s;
}

.selected {
    border: 3px solid #9A67AC;
}

.docu_preview {
  border: 1px solid black;
  border-radius: 5px;
  height: 100%;
  width: 100%;
}

.view_details {
  height: 60px;
  /* border: 1px solid black; */
  background-color: gray;
  position: fixed;
  width: 100%;
  z-index: 1;
}

.search_highlight {
  font-weight: bold;
}
</style>