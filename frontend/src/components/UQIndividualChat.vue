<template>
	<div>
		<div class="row font-rubik-labels">
           <!--  <div style="border-radius: 5px; height: 40px; padding: 5px; width: 100%; background-color: blue; color: white;">
                <div style="float: left; ">{{chat_names}}</div>
                <div style="float: right;"><q-btn flat @click="closeBox()"><i class="fas fa-times"></i></q-btn></div>   
            </div> -->

              <q-item class="full-width q-pa-xs">
                  <q-item-section avatar>
                    <q-avatar size="40px" class="q-mr-sm">
                      <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                      <q-badge v-if="last_active == 'Now'" color="green-5" floating style="border-radius: 50%; width: 10px; height: 11px; margin-top: 5px; margin-right: 5px; box-shadow: 0px 0px 0px 2px white"><span style="visibility: hidden;">o</span></q-badge>
                    </q-avatar>
                  </q-item-section>
                  <q-item-section align="left">
                <q-item-label style="font-size: 20px; font-weight: 500">{{chat_names}}</q-item-label>
                <q-item-label caption class="text-light" style="font-size: 12px">Active 1 hour ago</q-item-label>
              </q-item-section>
               <q-item-section side>
               <q-btn class="text-black" round flat @click="closeBox()" icon="fas fa-times"></q-btn> 
              </q-item-section>
              </q-item>

              <q-separator />

            <div style="width: 100%; margin-top: 2px;">
                <!-- Message Here -->
                    <!-- <q-infinite-scroll reverse>
                        {{messages}}
                    </q-infinite-scroll> -->
                
          <q-scroll-area
						v-if="chat_box==true"
						style="height: 300px; width: 100%"
						animated transition-prev="slide-down" transition-next="slide-up"
						id="chat_id"
					>
						<div class="q-pa-md column row justify-end">
	
						<div class="col-6" v-for="(message, index) in messages" :key ="index" id="chat_id">
              
							<q-infinite-scroll reverse>
								<div v-if="message.sender == 'me'" style="float: right;">
									<div v-if="message.message_type == 'text'" class=" message_sender">
										{{message.text}}
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
									<span style="float: right; font-size: 11px;">
										{{message.stamp}}
									</span>
									<!-- <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
										{{message.stamp}}
									</q-tooltip> -->
									<!-- {{message}} -->
								</div>
					<div v-else style="float: left;">
					<div class="row">
                        <div class="self-center col-1">
                        <!-- <q-skeleton type="QAvatar" /> -->
                            <q-avatar size="30px">
                                <img :src="`http://localhost:4000/avatar/${message.picture}`">
                            </q-avatar>
                        </div>
                        <div class="col-11">
                          <div v-if="message.message_type == 'text'" class="message_receivePopup">
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
					</q-scroll-area>
            </div>

            <q-separator />

            <div style="width: 100%; height: 48px; margin-top: 2px;">
                <div class="row q-py-xs">
                    <div class="col-1.5">
                        <q-btn style="float: left;" flat><i class="fas fa-paperclip"></i></q-btn>
                    </div>
                    <div class="col">
                        <q-input  
                            bg-color="white"
                            outlined
                            autogrow
                            v-model="newMessage" 
                            placeholder="Aa" 
                            dense
                            rounded
                            style="height: 35px; width: 100%;"
                        >
                         <!-- @keyup.enter="trigger" -->
                            <template v-slot:append>
                            <q-btn round @click="toogleDialogEmoji" flat style="margin-left: 25%;"><i class="far fa-smile" style="font-size: 25px;"></i></q-btn>
                            </template>
                        </q-input>
                    </div>
                    <div class="text-center q-mx-xs">
                        <q-btn size="12px" v-if="newMessage || url_image || url_video" round icon="fas fa-paper-plane" flat @click="sendMessage()" :loading="loading5">
                        <template v-slot:loading>
                        <q-spinner-facebook  color="secondary"/>
                        </template>
                    </q-btn>
                    <q-btn size="12px" v-else round flat @click="sendEmoji(custom_emoji)" :loading="loading5">
                        <q-avatar size="30px">
                            <q-img :src="`${server.IMAGE_URL}/5f90343d21e259119cb22fcc/5fbb864c334b554c8cc19f51/chat_files/emoji/${custom_emoji}`" />
                        </q-avatar>
                        <template v-slot:loading>
                        <q-spinner-facebook  color="secondary"/>
                        </template>
                    </q-btn>
                    </div>
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
        postNewChatDetailsPersonal  
        } from '../references/url';
import moment from "moment";
import { VEmojiPicker, emojisDefault, categoriesDefault } from "v-emoji-picker";
import config   from '../../config';
import imageCompression from 'browser-image-compression';

export default {
  components:
  {
    VEmojiPicker
  },
  data: () => ({
        socket: {},
        user: {},
        config: config,
        server: {
            IMAGE_URL: config.IMAGE_URL
        },
        users : 
        [ {
            id: '5f7c4996b862ce3544f5475a',
            name: 'Ruddy ',
            online: true,
            }, {
            id: '5fa142c45869eb85e1225605',
            name: 'Mallorie ',
            online: true,
            }, {
            id: '5fa142cc5869eb85e1225668',
            name: 'Elisabetta',
            online: true,
        } ],
        newMessage: '',
        message_details:
        {
          newMessage: '',
          chat_file: '',
          message_type: 'text',
          receiver_id: '',
        },
    
        messages: 
        [
					// {
					// 	text: 'Hi, Thanks for contacting us. We\'ve received your message and appreciate you for reaching out.',
          //   sender: 'me',
          //   stamp:''
					// }									
        ],
        
        seller_name: "Gamaliel",
        chat_list: "",
        url_image: null,
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
          id : '5fa285ce5869eb85e13d7265',
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
        is_active: 0,
        url_video_name: '',
        custom_emoji: 'like-01.2.png',
        image_arr: [],
        previousBtn: true,
        nextBtn: true,
        initiated: {
          user_id : '',
          username: ''
        },
        chatmates_id: [],
  }),

  async mounted() {
    await this.isUserLoggedIn();
    await this.getUsers();

    this.socket = io('http://localhost:4000', {transports: ['websocket', 'polling', 'flashsocket']});  

    this.socket.on('new_message', (data) => {
      console.log(data);
      this.getMessage();
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
      this.selected.by_user = data.by_user;
      this.selected.ka_chat = data.selected_ka_chat;
      this.selected.chat_id = data.chat_id;
  
      this.setTyping();
    });

    this.socket.on('initiate_chat', (data) => {
      console.log(data)
        this.getNewChatDetails(data);
    });

    this.socket.on('initiate_chat_personal', (data) => {
      this.initiateChatPersonal(data);
    });

    // this.socket.on('disconnect', () => 
    // {
    //       console.log('client--- Disconnected to the server ---');
    // });
  },

  watch:{

    // for the typing function : sees if the person is typing or not, applicable on personal and barter chat only
    newMessage: function(){
      if(this.newMessage == '')
      {
        let a = this.user.data.user.username;
        let receiver_username  = this.messages.filter(x => x.sender == 'me');
        this.socket.emit('is_typing', { is_typing: false, chat_id: this.chat_id, sender: a, receiver: receiver_username[0].receiver});
      }
      else
      {
        let a = this.user.data.user.username;
        this.message_details.newMessage = this.newMessage;
        let receiver_username  = this.messages.filter(x => x.sender == 'me');
        this.socket.emit('is_typing', { is_typing: true, chat_id: this.chat_id, sender: a, receiver: receiver_username[0].receiver });
      }
    }
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

    // gets data to be displayed in the left side of messge screen, displays all of users "ka chat"
    async getUsers()
    {
      let res = await this.$_post(postGetUsers, this.my_id);
      this.ka_chat = res.data;
    },

    toogleDialogEmoji() {
      this.showDialog = !this.showDialog;
    },
    
    onSelectEmoji(emoji) {
      this.newMessage += emoji.data;
      // console.log(emoji)
      // Optional
      this.toogleDialogEmoji();
    },

    // send message function
    async sendMessage() { 
      this.message_details.chat_id = this.chat_id;
      this.message_details.sender_username = this.user.data.user.username;
      this.message_details.sender_id = this.user.data.user._id;

      console.log('message details1', this.message_details);
      const fd = new FormData();

      fd.append('chat_id', this.message_details.chat_id);
      fd.append('sender_id', this.message_details.sender_id);
      fd.append('sender_username', this.message_details.sender_username);
      fd.append('receiver_id', this.message_details.receiver_id);
      fd.append('receiver_username', this.message_details.receiver_username);
      fd.append('message', this.message_details.newMessage);
      fd.append('message_type', this.message_details.message_type);
      fd.append('file', this.message_details.chat_file);

      console.log('message details', this.message_details);
      let res = await this.$_post(postSendMessage, fd);

      if (res.status == 200) {

        this.newMessage = '';
        this.message_details.newMessage = '';
        this.url_image = null;
        this.message_details.message_type = 'text';
        this.message_details.chat_file = '';
        this.socket.emit('new_message', { message: this.message_details.newMessage, sender: this.message_details.sender, receiver: this.message_details.receiver});
      }
    },

    async getMessage(){
        // alert('eeey')
      // alert(this.user_id)
    //   this.messages = [];
    //   let get_details = { user_id: this.chat_id }
    //   let res = await this.$_post(getMessage, get_details);
    //   // console.log('res', res.data.message_details);

    //   // return;
    //   let count = 0;

    //   this.current_chat_mates[0] = res.data.message_details[0].sender_username;
    //   this.current_chat_mates[1] = res.data.message_details[0].receiver_username;
      
    //   if(res.data.message_details[0].chat_name.length > 20)
    //   {
    //     this.chat_name_truncated = res.data.message_details[0].chat_name.substring(0, 20) + '...';
    //     this.chat_names = res.data.message_details[0].chat_name;
    //     this.seller_name = res.data.message_details[0].user_name;
    //   }else 
    //   {
    //     this.chat_names = res.data.message_details[0].chat_name;
    //     this.seller_name = res.data.message_details[0].user_name;
    //   }

    //   // console.log(this.current_chat_mates)

    //   res.data.message_details.forEach( item => { 
    //       let ts = res.data.message_details[count].created_at;
		// //   ts = moment(ts).fromNow();
		// 	 ts = moment(ts).format("ddd, hA");
          
    //       // this.messages.push({
    //       //   picture: 'profile-imgs/image.png',
    //       //   text: res.data.message_details[count].message,
    //       //   sender: res.data.message_details[count].sender,
    //       //   receiver: res.data.receiver_first_name,
    //       //   stamp: ts,
    //       // })
    //       // let a = localStorage.getItem('user_name');
    //       // console.log(this.user.data.user.username)
    //       let sender = res.data.message_details[count].sender_username == this.user.data.user.username ? 'me' : res.data.message_details[count].sender_username;
    //       // console.log(sender)  
    //       this.messages.push({
    //         picture: 'MALE/1601622250685.jpeg',
    //         text: res.data.message_details[count].message,
    //         sender: sender,
    //         receiver: res.data.message_details[count].receiver_username,
		// 	      stamp: ts,
		// 	      message_type: res.data.message_details[count].message_type
    //       });
    //       if(res.data.message_details[count].message_type == 'images')
    //       {
    //         this.image_arr.push(res.data.message_details[count].message);
    //         // console.log('arr', this.image_arr);
    //         // this.image_arr.reverse();
    //         // console.log('arr1', this.image_arr);
    //       }
    //       count++;
    //   })
    //   console.log(this.messages)
    //   // this.user_id = '';
      this.messages = [];
      let get_details = { user_id: this.chat_id }
      let res = await this.$_post(getMessage, get_details);
      console.log('res', res.data);

      // return;

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
          this.chat_names = res.data.message_details[0].chat_name.substring(0, 20) + '...';
          // this.chat_names = res.data.message_details[0].chat_name;
          this.seller_name = res.data.message_details[0].user_name;
        }else {
          this.chat_names = res.data.message_details[0].chat_name;
          this.seller_name = res.data.message_details[0].user_name;
        }
      }
      else
      {
        let receiver = res.data.message_details[0].receiver_username == this.user.data.user.username ? res.data.message_details[0].sender_username : res.data.message_details[0].receiver_username;

        if(receiver.length > 20) {
          this.chat_names = receiver.substring(0, 20) + '...';
          // this.chat_names = receiver;
          this.seller_name = res.data.message_details[0].sender_username;
        }else {
          this.chat_names = receiver;
          this.seller_name = res.data.message_details[0].sender_username;
        }      
      }

      // return;
      // console.log(this.current_chat_mates)

      res.data.message_details.forEach( item => { 
          let ts = res.data.message_details[count].created_at;
		//   ts = moment(ts).fromNow();
			 ts = moment(ts).format("ddd, hA");
          
          // this.messages.push({
          //   picture: 'profile-imgs/image.png',
          //   text: res.data.message_details[count].message,
          //   sender: res.data.message_details[count].sender,
          //   receiver: res.data.receiver_first_name,
          //   stamp: ts,
          // })
          // let a = localStorage.getItem('user_name');
          // console.log(this.user.data.user.username)
          let sender = res.data.message_details[count].sender_username == this.user.data.user.username ? 'me' : res.data.message_details[count].sender_username;
          // console.log(sender)  
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
            is_first: res.data.message_details[count].is_first
          });
          if(res.data.message_details[count].message_type == 'images')
          {
            this.image_arr.push(res.data.message_details[count].message);
            // console.log('arr', this.image_arr);
            // this.image_arr.reverse();
            // console.log('arr1', this.image_arr);
          }
          count++;
      })
      console.log('m', this.messages)
      // this.user_id = '';
    },

    async onFileChange(e) {
      const file = e.target.files[0];
      // console.log('f', file);
      const options = {
        maxSizeMB: 1,
        useWebWorker: true
      }

      const compressedFile = await imageCompression(file, options);
      // console.log(compressedFile)
      // return;
      this.message_details.chat_file = compressedFile;
      this.message_details.message_type = 'images';
      this.url_image = URL.createObjectURL(file);
      // console.log(this.url_image)
    },
    onFileChange2(e) {
      const file = e.target.files[0];

      // console.log('file', file);
      this.message_details.chat_file = file;
      this.message_details.message_type = 'documents';
      this.url_video = URL.createObjectURL(file);
      this.url_video_name = file.name;
    },

    chat_input(id, name, index, user_id) {
      // alert(index)
      this.message_details.receiver_id = user_id;
      this.message_details.receiver_username = name;
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
      // alert(this.seller_name)
      this.getMessage();
      // this.socket.emit('change_chat_room', { chat_id: this.user_id, selected_ka_chat: this.seller_name, by_user: this.user});
      // console.log(this.user_id)
      // console.log(this.seller_name)
    },

    async isUserLoggedIn()
    {
      this.user = await this.$_isUserAuthenticated();
      this.my_id.id = this.user.data.user._id;
      // console.log('user', this.user)
    },

    async getNewChatDetails(data)
    {
      let newChat = await this.$_post(postNewChatDetails, data);
      console.log('new chat', newChat);
      let index = newChat.data.length - 1;
      if(newChat.data[index].chat_name.length > 20)
      {
        this.chat_names = newChat.data[index].chat_name.substring(0, 20) + '...';
        // this.chat_names = newChat.data[0].chat_name;
        this.seller_name = newChat.data[index].user_name;
      }else 
      {
        this.chat_names = newChat.data[index].chat_name;
        this.seller_name = newChat.data[index].user_name;
      }
      // return;
      this.is_active = true;
      // this.idx = index;
      // console.log(this.my_id)
    //   await this.getUsers();
    //   console.log('ka-chat', this.ka_chat);
    //   console.log('new chat', newChat);
      this.idx = newChat.data[0].user_id;
      this.chat_id = newChat.data[0].chat_id;
      this.chat_input_send = true;
      this.chat_box = true;
      this.start_message = false;
      // this.chat_name = true;
      this.messages = [];
      this.getMessage();
    },

    async initiateChatPersonal(data)
    {
      this.initiated.user_id  = data.user_id;
      this.initiated.username = data.username;
      this.is_active = true;

      let newChat = await this.$_post(postNewChatDetailsPersonal, this.initiated);
      console.log('newasdasdasdaschatat', newChat);
      this.chat_id = newChat.data[0].chat_id;
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

    async sendEmoji(emoji)
    {
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

      // console.log(this.message_details);
      // return;
      let res = await this.$_post(postSendMessage, fd);

      if (res.status == 200) {
        this.socket.emit('new_message', { message: this.message_details.newMessage, sender: this.message_details.sender, receiver: this.message_details.receiver});
        this.newMessage = '';
        this.message_details.newMessage = '';
        this.url_image = null;
        this.message_details.message_type = 'text';
      }
    },

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

    previousImage()
    {

      let currentImageIndex = this.image_arr.findIndex(x => x == this.modal_image);
      // alert(currentImageIndex)
      // let nextImageValue = this.image_arr.find(x => x == this.modal_image);
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

    closeBox()
    {
      this.chat_input_send = false;
      this.chat_box = false;
      this.start_message = true;
      this.chat_name = false;
      this.messages = [];
      this.socket.emit('close_chat_box', { is_close: true });
    },


  },
};
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
    bottom: 13px;
    left: 17px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    opacity: 0;
    cursor: pointer;
    z-index: 10;
  }
  .upload__image input[type="file"] {
    padding: 20px;
    background: #2d2d2d;
  }
  .upload__video input {
    position: absolute;
    bottom: 13px;
    left: 17px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    opacity: 0;
    cursor: pointer;
    z-index: 10;
  }
  .upload__video input[type="file"] {
    padding: 20px;
    background: #2d2d2d;
  }
  .btn_file {
    z-index: 8px;
  }
  .remove__btn {
    margin-left: -30px;
    margin-top: -20px;
    color: black;
    z-index: 10;
  }
  .my-menu-link {
    color: black;
    background: #c7c6c1;
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
	padding: 5px;
	margin: 0.0625em;
	max-width: 100%;
	/* border: 1px solid black; */
	/* margin: 10px auto; */
	align-self: flex-end;
	background-color: #bd80d3;
	color: #fff;
	border-bottom-right-radius: 0.1em;
  }

   .message_senderPopup {
  border-radius: 1em;
  padding: 5px 8px;
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
	padding: 5px;
	margin: 0.0625em;
    margin-left: 5%;
	max-width: 100%;
	/* min-width: 50%; */
	align-self: flex-start;
	background-color: #fde9d1;
	border-bottom-left-radius: 0.1em;
  }

  .message_receivePopup {
  border-radius: 1em;
  padding: 5px;
  margin: 0.0625em;
    margin-left: 8%;
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
</style>