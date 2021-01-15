<template>
	<div>
		<div class="row font-rubik-labels">
			
			<div class="col-12">
				<div class="row">
					<div class="col-12" style="border-bottom: 1px solid #e0e0e0">
           <div class="row">
            <u-q-chat-header-name></u-q-chat-header-name>
            <u-q-chat-side-bar-details></u-q-chat-side-bar-details>
            <div v-if="is_group == false && chat_name == true" class="view_details col-12">
             <div class="q-pa-sm">
              <q-btn class="q-px-lg q-mr-md" flat @click="see_details()">See Details</q-btn>
              <q-btn class="q-px-lg" flat @click="view_profile()">View Profile</q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <!-- -------------------- list of peoples -------------------- -->


  <u-q-chat-lists></u-q-chat-lists>


  <!-- -------------------- End list of peoples -------------------- -->



  <!-- -------------------- Conversation -------------------- -->
  <div class="col-12" style="height: 70vh">
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
  <!-- -------------------- Convo -------------------- -->


  <u-q-chat-box></u-q-chat-box>


  <!------------------ image modal ----------------->
  <q-dialog
  v-model="dialog"
  persistent
  :maximized="maximizedToggle"
  transition-show="slide-up"
  transition-hide="slide-down"
  >
  <q-card class="bg-grey text-white">
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
        postAddGroupChat  
        } from '../../../references/url';
import moment from "moment";
import { VEmojiPicker, emojisDefault, categoriesDefault } from "v-emoji-picker";
import config   from '../../../../config';
import imageCompression from 'browser-image-compression';
import { group } from 'console';
import UQChatHeaderName from './UQChatHeaderName';
import UQChatSideBarDetails from './UQChatSideBarDetails';
import UQChatLists from './UQChatLists';
import UQChatBox from './UQChatBox';

export default {
  components:
  {
    VEmojiPicker,
    UQChatHeaderName,
    UQChatSideBarDetails,
    UQChatLists,
    UQChatBox
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
          //  text: 'Hi, Thanks for contacting us. We\'ve received your message and appreciate you for reaching out.',
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
        chat_listDrawer: false,
  }),

  async mounted() {
    await this.isUserLoggedIn();
    await this.getUsers();

    if(this.$props.id) await this.getNewChatDetails(this.$props.id);
    this.socket = io('http://localhost:4000', {transports: ['websocket', 'polling', 'flashsocket']});  
    
    this.socket.on('new_message', (data) => {
      // console.log(data);
      if(data.is_group == false) this.getMessage();
      else this.getMessageGroup();
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
        
        if(this.message_details.chat_file)
        {
          for(let i=0;i<this.message_details.chat_file.length;i++)
          {
            let f = this.message_details.chat_file[i];
            fd.append('file', f);
          }
        }
      }

      console.log('message details', this.message_details);
    
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
            is_first: res.data.message_details[count].is_first
          });
          if(res.data.message_details[count].message_type == 'images')
          {
            this.image_arr.push(res.data.message_details[count].message);
          }
          count++;
      })
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
            chat_type: 'groups'
          });
          if(res.data.message_details[count].message_type == 'images')
          {
            this.image_arr.push(res.data.message_details[count].message);
          }
          console.log(this.messages)
          count++;
      })
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
      this.url_video = URL.createObjectURL(file);
      this.url_video_name = file.name;
    },

    // this function is when you click a name in friends tab or a chat name in barter tab, to select which chat will be opened
    async chat_input(id, name, index, user_id) {

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
      this.is_group = false;
     
      await this.checkOnlineStatus(user_id);
      this.getMessage();
    },

    // this function is when you click a name in groups tab, to select which chat will be opened
    chat_input_group(id, name, index, chat_name) {

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
      this.user_infoDrawer = false;

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