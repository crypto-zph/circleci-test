<template>

  <div class="row">
    <div class="col-4" style="border-right: 1px solid #e0e0e0; border-bottom: 1px solid #e0e0e0 ">
      <div class="row">
        <div class="col-3">
          <q-avatar>
            <q-img style="width: 30px;" src="chat-black.png" />
          </q-avatar>
        </div>
        <div class="col-9 flex flex-center">
          <h5 class="font-rubik-title">Messages</h5>
        </div>
      </div>
    </div>

    <div class="col-8 flex flex-center" style="border-bottom: 1px solid #e0e0e0;">

      <h5 class="font-rubik-title" v-if="chat_name==true">
        {{chat_name_truncated}}
         <q-tooltip content-style="font-size: 16px" anchor="top middle" self="bottom middle" :offset="[10, 10]">
          {{chat_names}}
        </q-tooltip>
      </h5>
      <q-btn>a0</q-btn>
      <!-- <q-bt0n flat v-if="chat_name==true"><i class="fas fa-info-circle"></i></q-btn> -->
    </div>

    <div class="col-4" style="border-right: 1px solid #e0e0e0;">

      <!-- -----------------User List------------------------------------ -->

          <q-list>
            <q-item 
              v-for="(user, index) in ka_chat" 
              :key="index" 
              clickable 
              v-ripple
              @click="chat_input(user.chat_id, user.user_name, index)"
              :active="is_active && user.user_id == idx"
              active-class="my-menu-link"
              >
              
              <q-item-section avatar >
                <q-avatar color="primary" text-color="white" >
                  {{ user.user_name.charAt(0).toUpperCase() }}
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="font-rubik-lables q-ml-sm" >{{ user.user_name.charAt(0).toUpperCase() + user.user_name.slice(1) }} </q-item-label>
              </q-item-section>

              <!-- <q-item-section side>
                  <q-badge 
                    :color="user.is_online ? 'light-green-5' : 'grey-4' ">
                    {{user.is_online ? "." : "."}}
                  </q-badge>
              </q-item-section> -->

            </q-item>
          </q-list>
        <!-- </q-tab>
      </q-tabs> -->
    </div>

    <!-- --------------------Conversation-------------------- -->
    <div class="col-8">
      <div class="q-pa-md flex flex-center"  style="height: 500px;"  v-if="start_message == true">
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
        style="height: 500px;"
        animated transition-prev="slide-down" transition-next="slide-up"
        id="chat_id"
      >
        <div class="q-pa-md column col justify-end">
        
          <div v-for="(message, index) in messages" :key ="index" id="chat_id">
            <q-infinite-scroll reverse>
                		
            <q-chat-message
              v-if="message.sender == 'me'"
              :text="[message.text]"
              sent
              :stamp="message.stamp"
              bg-color="primary"
              text-color="white"
            >
            <!-- <div v-if="sample && index == i">
              <q-btn @click="reply(index, message.text)">Reply</q-btn>
              <q-btn>React</q-btn>
              <q-btn>Remove</q-btn>
            </div> -->
            </q-chat-message>


            <q-chat-message
              v-else
              :avatar="message.picture"
              :text="[message.text]"
              :stamp="message.stamp"
              bg-color="grey-4"
            >
            </q-chat-message>	
            </q-infinite-scroll>
          </div>
            <q-spinner-dots v-if = is_typing size="2rem" style="margin-left: 20%!important"/>

            <div v-if="repliedMessage">
              <div style="background-color: black; color: white;">
                {{m}} <q-btn @click="closeReply">Close</q-btn>
              </div>
            </div>

        </div>
      </q-scroll-area>

      <!-- ------------------Send Message--------------------------------- -->
      <q-separator />
      <div class="row" v-if="chat_input_send == true ">
      <div id="preview">
        <img style="height: 100px" v-if="url_image" :src="url_image" />
           <q-btn v-if="url_image != null" 
        @click="url_image = null" 
        icon="fas fa-times" 
        round
        flat
        class="remove__btn"
        size="10px"></q-btn>
      </div>
      <div id="preview">
        <video style="height: 100px; width: 100px" v-if="url_video" :src="url_video" />
        <q-btn v-if="url_video != null" 
        @click="url_video = null" 
        icon="fas fa-times" 
        round 
        flat
        class="remove__btn"
        size="10px"></q-btn>
      </div>
         </div>
      <div class="row" v-if="chat_input_send == true">
        <div class="q-mx-sm q-mt-xs">
         <q-btn icon="fas fa-plus" class="btn_file" round>
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
        </q-btn>
        </div>
        <div class="col-8 q-py-xs">
	        	<q-input  
	        		bg-color="white"
	        		outlined
	        		rounded
	        		v-model="newMessage" 
	        		placeholder="Message" 
	        		dense
              autogrow
              @keyup.enter="trigger"
              >
                <template v-slot:append>
                  <q-btn @click="toogleDialogEmoji" flat style="width: 75%; margin-left: 50%;"><i class="far fa-smile" style="font-size: 25px;"></i></q-btn>
                </template>
            </q-input>
        </div>
        <div class="col-1.5 q-py-xs">   
          <q-btn v-if="newMessage" round icon="fas fa-paper-plane" flat class="q-ml-xs q-mr-md" @click="sendMessage()" :loading="loading5">
             <template v-slot:loading>
              <q-spinner-facebook  color="secondary"/>
            </template>
          </q-btn>
          <q-btn v-else round flat class="q-ml-xs q-mr-md" @click="sendMessage()" :loading="loading5">
            <q-avatar size="42px">
              <img src="../../../../public/icons/baristocrat-01.png">
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
</template>

<script>
import io from 'socket.io-client';
import {postSendMessage, 
        getMessage,
        postGetUsers,
        postNewChatDetails  
        } from '../../../references/url';
import moment from "moment";
import { VEmojiPicker, emojisDefault, categoriesDefault } from "v-emoji-picker";

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
        user_id: '',
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
  }),

  async mounted() {
    // console.log(this.$props.id);
    // this.user = await localStorage.getItem('user_name'); // temporary
    await this.isUserLoggedIn();
    await this.getUsers();
    if(this.$props.id) await this.getNewChatDetails(this.$props.id);
    // console.log(this.$el)
    this.socket = io('http://localhost:4000', {transports: ['websocket', 'polling', 'flashsocket']});  
    // this.socket.on('connect', () => 
    // {
    //       console.log(' client--- Connected to the server ---');
    // });
    this.socket.on('new_message', (data) => {
      // console.log(data)
          // let ts = moment(Date.now()).fromNow();
          // this.messages.push({
          //   picture: 'profile-imgs/image.png',
          //   text: data.message,
          //   from: data.sender,
          //   stamp: ts
          // });
          this.getMessage();
    });
    
    // this.socket.emit('new_user', { user_id:'2', user_name: 'Trish', online: true})
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

    // this.socket.on('receive_typing', (data) => {
    //   this.setReceiveTyping(data);
    // });
    
    this.socket.on('change_chat_room', (data) => {
      // console.log(data)
      this.selected.by_user = data.by_user;
      this.selected.ka_chat = data.selected_ka_chat;
      this.selected.chat_id = data.chat_id;
      // this.setSellerName();
      this.setTyping();
      // console.log('selected', this.selected)
    });

    // this.socket.on('disconnect', () => 
    // {
    //       console.log('client--- Disconnected to the server ---');
    // });
  },

  watch:{
    newMessage: function(){
      if(this.newMessage == '')
      {
        let a = localStorage.getItem('user_name');
        if(this.seller_name == a)
        {
          this.seller_name = 'Paul';
        }
        // this.is_typing = false;
        this.socket.emit('is_typing', { is_typing: false, chat_id: this.user_id, sender: a, receiver: this.seller_name});
      }
      else
      {
        // this.is_typing = true;
        let a = localStorage.getItem('user_name');
        // console.log(a)
        this.message_details.newMessage = this.newMessage;
        if(this.seller_name == a)
        {
          this.seller_name = 'Paul';
        }
        this.socket.emit('is_typing', { is_typing: true, chat_id: this.user_id, sender: a, receiver: this.seller_name });
      }
    }
  },

  methods: {
    // async setSellerName()
    // {
    //   console.log('ssn', this.selected)
    // },
    // closeReply()
    // {
    //   this.repliedMessage = false;
    // },

    // reply(index, text)
    // {
    //   this.repliedMessage = true;
    //   this.m = text;
    // },

    trigger()
    {
      if(this.newMessage.trim() != '') this.sendMessage();
    },

    // sampleClick(index)
    // {
    //   this.sample = true;
    //   this.i = index;
    // },
    // sampleOut()
    // {
    //   this.sample = false;
    // },

    async setTyping()
    {
      let a = localStorage.getItem('user_name'); 
      // console.log(this.current_chat.chat_id);
      // console.log(this.selected.chat_id); 
      if((this.current_chat.chat_id == this.selected.chat_id) && (this.current_chat.receiver == a))
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
      // console.log('ka chat', this.ka_chat)
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

    async sendMessage() {
      // console.log('send', this.seller_name) 
      // this.message_details.sender = localStorage.getItem('user_name');
      this.message_details.user_id = this.user_id;
      this.message_details.sender = this.user.data.user.username;
      this.message_details.receiver = this.seller_name;
      let res = await this.$_post(postSendMessage, this.message_details);

      if (res.status == 200) {
        this.socket.emit('new_message', { message: this.message_details.newMessage, sender: this.message_details.sender, receiver: this.message_details.receiver});
        this.newMessage = '';
      }
    },

    async getMessage(){
      // alert(this.user_id)
      this.messages = [];
      let get_details = { user_id: this.user_id }
      let res = await this.$_post(getMessage, get_details);
      console.log(res.data.message_details)
      let count = 0;

      this.current_chat_mates[0] = res.data.message_details[0].sender;
      this.current_chat_mates[1] = res.data.message_details[0].receiver;
      
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

      // console.log(this.current_chat_mates)

      res.data.message_details.forEach( item => { 
          let ts = res.data.message_details[count].created_at;
          ts = moment(ts).fromNow();
          
          // this.messages.push({
          //   picture: 'profile-imgs/image.png',
          //   text: res.data.message_details[count].message,
          //   sender: res.data.message_details[count].sender,
          //   receiver: res.data.receiver_first_name,
          //   stamp: ts,
          // })
          // let a = localStorage.getItem('user_name');
          let sender = res.data.message_details[count].sender == this.user.data.user.username ? 'me' : res.data.message_details[count].sender;  
          this.messages.push({
            picture: 'avatar/male/1601622250685.jpeg',
            text: res.data.message_details[count].message,
            sender: sender,
            receiver: res.data.receiver_first_name,
            stamp: ts,
          })
          count++;
      })
      // this.user_id = '';
    },

    onFileChange(e) {
      const file = e.target.files[0];
      this.url_image = URL.createObjectURL(file);
    },
    onFileChange2(e) {
      const file = e.target.files[0];
      this.url_video = URL.createObjectURL(file);
    },

    chat_input(id, name, index) {
      // alert(name)
      this.user_id = id;
      this.message_details.user_id = id;
      this.seller_name = name;
      this.chat_input_send = true;
      this.chat_box = true;
      this.start_message = false;
      this.chat_name = true;
      this.messages = [];
      this.is_active = true;
      this.idx = index;
      this.getMessage();
      // this.socket.emit('change_chat_room', { chat_id: this.user_id, selected_ka_chat: this.seller_name, by_user: this.user});
      // console.log(this.user_id)
      // console.log(this.seller_name)
    },

    async isUserLoggedIn()
    {
      this.user = await this.$_isUserAuthenticated();
      this.my_id.id = this.user.data.user._id;
      console.log('user', this.user)
    },

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
      this.user_id = newChat.data[0].chat_id;
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

  },
};
</script>

<style lang="sass">
.my-emoticon
  vertical-align: middle
  height: 2em
  width: 2em
</style>

<style scoped>
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
    color: white;
    z-index: 10;
  }
  .my-menu-link {
    color: black;
    background: #c7c6c1;
  }
</style>
