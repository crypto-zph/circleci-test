<template>
	<div>
		<q-scroll-area
		v-if="chat_box == true"
		style="height: 100%"
		animated transition-prev="slide-down" transition-next="slide-up"
		id="chat_id">
		<div v-if="is_group == false &&  tab == 'barter'" class="view_details">
			<div class="q-pa-sm">
				<q-btn class="q-px-lg q-mr-md" @click="see_details()">See Details</q-btn>
				<q-btn class="q-px-lg" @click="view_profile()">View Profile</q-btn>
			</div>
		</div>
		<div class="q-pa-md column col justify-end" style="margin-top: 10%; width: 100%">
			<div v-for="(message, index) in messages" :key ="index" id="chat_id" style="width: 100%">
				<q-infinite-scroll reverse>
					<div v-if="message.is_first == true || message.is_first == 'true'" style="font-size: 16px; text-align: center;">
						{{message.date}} AT {{message.time}}
					</div>
					<div v-if="message.sender == 'me'" style="float: right;">
						<div v-if="message.message_type == 'text'" class="message_sender">
							{{message.text}}
						</div>
						<div v-else-if="message.message_type == 'images'">
							<q-img
							:src="`${server.IMAGE_URL}/5f90343d21e259119cb22fcc/5fbb864c334b554c8cc19f51/chat_files/images/${message.text}`"
							class="message_sender_image"
							style="width: 150px; cursor: pointer;"
							:ratio="1"
							@click="openAlert(message.text)"/>
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
						<span style="float: right; font-size: 11px;">
							{{message.stamp}}
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
											<div v-if="message.message_type == 'text'" class="message_receive">
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
							<!-- <q-spinner-dots size="3rem" class="message_receive"/> -->
							<div class="snippet message_receive_typing" data-title=".dot-falling">
								<div class="stage">
									<div class="dot-falling"></div>
								</div>
							</div>
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
		<!-- -------------------- Send Message below -------------------- -->
		<q-separator v-if="chat_input_send == true " />
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
	</template>

	<script>
		export default {

		}
	</script>