<template>
  <q-layout view="hHh lpR fFf">
    <q-header 
     class="text-white main nav__main" 
    :class="$q.dark.isActive ? 'header_dark' : 'nav__main' && {change__color: scrollPosition > 5}" 
    :style="user_data == undefined ? 'border-bottom: 1px solid #cfcfcf; box-shadow: 0px 0px 10px 1px #cfcfcf; padding: 0 0 15px 0' : ''">
      <!------------------------------- Navbar --------------------------------------->
      <q-toolbar class="navbar navbar__paddingMbl">
        <q-toolbar-title>
        </q-toolbar-title>
        <div class="nav">
          <ul>
             <li class="self-center">
              <a
              class="font-rubik-labels wish__listTxt"
              :class="$q.dark.isActive ? 'text-white' : 'text-black'"
              style="font-weight: 400; cursor: pointer"
              @click="$router.push({ name: 'front_wishlist' })"
              >Wish List</a>
            </li>
            <li class="self-center">
              <a
              class="font-rubik-labels news__feedTxt"
              :class="$q.dark.isActive ? 'text-white' : 'text-black'"
              style="font-weight: 400; cursor: pointer"
              @click="$router.push({ name: 'front_newsfeed' })"
              >News Feed</a>
            </li>
             <li class="self-center">
              <a
              class="font-rubik-labels"
              :class="$q.dark.isActive ? 'text-white' : 'text-black'"
              style="font-weight: 400; cursor: pointer"
              @click="$router.push({ name: 'front_sell' })"
              >Sell Product</a>
            </li>
            <li class="self-center">
              <a
              class="font-rubik-labels"
              :class="$q.dark.isActive ? 'text-white' : 'text-black'"
              style="font-weight: 400; cursor: pointer"
              @click="$router.push({ name: 'front_about' })"
              >About</a>
            </li>
            <li class="self-center">
              <a class="font-rubik-labels" :class="$q.dark.isActive ? 'text-white' : 'text-black'" style="font-weight: 400;  cursor: pointer">Data Privacy</a>
            </li>
            <q-separator vertical inset />
            <li class="row" v-if="user_data != undefined" @click="redirectToClientWallet">
                 <img style="height: 47px; cursor: pointer" class="self-center" src="icon_layout/BARISTOCRAT 3.png">
              <div class="font-rubik-labels self-center" :class="$q.dark.isActive ? 'text-white' : 'text-black'" style="font-weight: 400;  cursor: pointer">BRT {{ wallet.balance | $_toClientAmount(9) }}</div>
            </li>
            <li v-if="user_data == undefined">
              <a
              @click="$router.push({name: 'front_login'})"
              style="font-weight: 400; border-right: 1px solid white; cursor: pointer"
              class="font-rubik-labels"
              :class="$q.dark.isActive ? 'text-white' : 'text-black'"
              >Login</a>
            </li>
            <li v-if="user_data == undefined">
              <a
              @click="$router.push({name: 'front_registration'})"
              style="font-weight: 400; cursor: pointer"
              class="font-rubik-labels"
              id="register-nav"
              :class="$q.dark.isActive ? 'text-white' : 'text-black'"
              >Sign Up</a>
            </li>
              <u-q-log-out  v-if="user_data != undefined" :user_data="user_data" class="q-mt-xs q-ml-sm"></u-q-log-out>
          </ul>
        </div>
        <q-btn class="q-mx-sm" dense flat round color="black" icon="menu" @click="drawerLeft = !drawerLeft" id="burger-btn" />
      </q-toolbar>
      <!------------------------------- End of Navbar--------------------------------------->
      <!------------------------------- Header --------------------------------------->
      <div class="row" id="search__input">
          <div class="self-center col-3 text-center" style="margin-top: -10px">
              <a @click="$router.push({name: 'front_landing'})" style="cursor: pointer">
                <q-img class="logo" src="icons/baristocratn.png" id="logo" /> 
                <q-img class="logo_plain" src="icons/baristocrat03.png" id="logo_2" /> 
              </a>
          </div>
          <div class="col-sm-6 col-5 text-center">
            <div id="search__input">
                <u-q-search class="search__input__class" @success="fromSearch" @changeType="fromSearchType" ></u-q-search>
                <q-input @click="$router.push({name: 'front_full_page_search'})" v-model="search" debounce="500" borderless class="bg-white q-pr-xs q-pl-md search__input__mobile" dense placeholder="Search" style="border-radius: 10px; border: 1px solid #cfcfcf">
                <template v-slot:append>
                  <q-btn  @click="$router.push({name: 'front_full_page_search'})" icon="search"  flat class="search__icon" style="padding: 0px 4px 0px 4px; color:white; border-radius: 10px" />
                </template>
              </q-input>
            </div>
          </div>
          <div class="self-center col-sm-3 col-4 btns__main">
            <div class="q-ml-md">
                <q-btn
                round 
                flat
                :icon="$route.name != 'front_cart' ? 'img:icon_layout/cart.png' : 'img:icon_layout/cart_fill.png'" 
                @click="$router.push({name: 'front_cart'})"/>

                <u-q-notification></u-q-notification>

                <q-btn
                round 
                flat 
                class="news__feedBtn" 
                :icon="$route.name != 'front_newsfeed' ? 'img:icon_layout/newsfeed.png' : 'img:icon_layout/newsfeed_fill.png'"
                @click="$router.push({name: 'front_newsfeed'})"/>

                <q-btn
                round 
                flat
                class="wish__listBtn" 
                :icon="$route.name != 'front_wishlist' ? 'img:icon_layout/heart.png' : 'img:icon_layout/heart_fill.png'" 
                @click="$router.push({name: 'front_wishlist'})"/>

                <q-btn 
                round 
                flat
                class="message__icon" 
                :icon="$route.name != 'front_message' ? 'img:icon_layout/messages.png' : 'img:icon_layout/messages_fill.png'" 
                @click="$router.push({name: 'front_message'})"/>

                <q-btn 
                round 
                flat 
                v-if="user_data != undefined && user_data.avatar_path != ''"  
                @click="$router.push({ name: 'front_profile' })">

                <q-avatar size="30px">
                  <img :src="`http://localhost:4000/avatar/${container_user.gender}/${container_user.avatar_path}`" />
                </q-avatar>
                <q-tooltip content-class="bg-secondary text-white shadow-4" :offset="[10, 10]">
                  Log in as {{user_data.username}}
                </q-tooltip>
              </q-btn>
              <q-btn round flat v-if="user_data == undefined || user_data.avatar_path == ''">
                <q-avatar size="30px">
                  <img src="icon_layout/profile_icon.png" />
                </q-avatar>
              </q-btn>

          </div>
        </div>
        <div style="margin: 0 auto;">
        <div class="nav">
          <ul> 
            <li v-for="(cat, i) in categories.slice(0, 5)" :key='i'>
              <a
              :href="`#/subcategories?category_name=${ cat.category_name }`"
              class="font-rubik-labels text-black"
              style="font-weight: 400; cursor: pointer"
              >{{cat.category_name}}</a>
            </li>
            <div class="dropdown" v-if="end = 6">
              <!-- <li>
                <a
                class="dropbtn font-rubik-labels text-black"
                style="font-weight: 400;  cursor: pointer"
                >Others</a>
              </li> -->
              <div style="z-index: 999" class="dropdown-content text-black" >
                <a :href="`#/subcategories?category_name=${ cat.category_name }`" v-for="(cat, i) in categories.slice(5, categories.length)" :key='i'>{{cat.category_name}}</a>
              </div>
            </div>
          </ul>
        </div>
        </div>
  </div>
        <!------------------------------- End of Header --------------------------------------->
</q-header>
        <q-page-container>
          <router-view />
        </q-page-container>

        

<!------------------------------- Chat --------------------------------------->
<!-- <q-page-sticky position="bottom-left" :offset="[18, 18]">
  <q-btn flat round @click="open('right')">
    <q-avatar class="chat__icon" text-color="white">
      <q-img style="width: 30px; margin: 0 6px 0 0" src="chat.png" />
    </q-avatar>
  </q-btn>
  <u-q-chat-dialog ref="chat"></u-q-chat-dialog>
</q-page-sticky> -->
<!------------------------------- Chat --------------------------------------->
<!-- <q-page-sticky position="bottom-left" :offset="[18, 18]">
  <q-btn flat round @click="open('right')">
    <q-avatar class="chat__icon" text-color="white">
      <q-img style="width: 30px; margin: 0 6px 0 0" src="chat.png" />
    </q-avatar>
  </q-btn>
  <u-q-chat-dialog ref="chat"></u-q-chat-dialog>
</q-page-sticky> -->

<q-page-sticky position="bottom-right">
  <!-- <q-btn flat round @click="openForm()">
    <q-avatar class="chat__icon" text-color="white">
      <q-img style="width: 30px; margin: 0 6px 0 0" src="chat.png" />
    </q-avatar>
  </q-btn> -->

    <div class="chat-popup" id="myForm">
      <div  class="form-container_chat" style="display: relative; height: 400px;">
          <u-q-individual-chat ref="chat"></u-q-individual-chat>
          <!-- <div style="position: absolute;    top: 10px; right: 10px">
            <q-btn @click="closeForm()" size="sm" round color="black" icon="fas fa-times" />
          </div>
        <h1>Chat</h1>

        <label for="msg"><b>Message</b></label>
        <textarea placeholder="Type message.." name="msg" required></textarea> -->
      </div>
    </div>
</q-page-sticky>
<!------------------------------- End of  Chat --------------------------------------->

<!-- <q-page-sticky position="bottom-right" :offset="[18, 18]">
  <q-btn flat round @click="openForm()">
    <q-avatar class="chat__icon" text-color="white">
      <q-img style="width: 30px; margin: 0 6px 0 0" src="chat.png" />
    </q-avatar>
  </q-btn>

    <div class="chat-popup" id="myForm">
      <div  class="form-container" style="display: relative">
                        <div style="position: absolute; top: 10px; right: 10px">
                    <q-btn @click="closeForm()" size="sm" round color="black" icon="fas fa-times" />
                  </div>
        <h1>Chat</h1>

        <label for="msg"><b>Message</b></label>
        <textarea placeholder="Type message.." name="msg" required></textarea>
      </div>
    </div>
</q-page-sticky> -->
<!------------------------------- End of  Chat --------------------------------------->


  <!--------------------------- Navigation Mobile  --------------------------------->
    <q-drawer show-else-above v-model="drawerLeft" side="right" bordered>
      <q-toolbar>
        
          <div class="column full-width">
            <div v-if="authenticated" class="text-left q-mt-md q-mx-md" style="font-weight: bold">
          {{user_data.first_name}} {{user_data.last_name}}
        </div>
        <div v-if="authenticated" class="text-left q-mx-md text-grey-5" style="font-weight: bold; font-size: 13px">
          @{{user_data.username}}
        </div>
        <div v-if="authenticated" class="text-left q-mb-md q-mx-sm row" style="font-weight: bold"  @click="redirectToClientWallet">
           <img style="height: 40px; cursor: pointer" class="self-center" src="icon_layout/BARISTOCRAT 3.png">
              <div class="font-rubik-labels self-center" :class="$q.dark.isActive ? 'text-white' : 'text-black'" style="font-weight: 400;  cursor: pointer">BRT {{ wallet.balance | $_toClientAmount(9) }}</div>
        </div>
         <q-btn align="left" v-if="user_data == undefined" @click="$router.push({name: 'front_profile'})" no-caps class="q-mt-sm" flat>
           <q-icon name="img:icon_layout/profile_icon.png" v-if="user_data == undefined" class="q-mr-md" />
            <q-avatar size="25px" v-if="user_data != undefined" class="q-mr-md" >
                  <img :src="`http://localhost:4000/avatar/${user_data.gender}/${user_data.avatar_path}`" />
                </q-avatar>
         Profile</q-btn>
           <q-btn align="left" @click="$router.push({name: 'front_sell'})" no-caps class="q-mt-sm" flat>
            <q-icon name="img:icon_layout/sell.png" class="q-mr-md" />
           Sell</q-btn>
            <q-btn align="left" @click="$router.push({name: ' '})" no-caps class="q-mt-sm" flat>
             <q-icon name="img:icon_layout/product.png" class="q-mr-md" />
           Product</q-btn>
            <q-btn align="left" @click="$router.push({name: 'front_cart'})" no-caps class="q-mt-sm" flat>
              <q-icon name="img:icon_layout/cart.png" class="q-mr-md" />
            Cart</q-btn>
            <q-btn align="left" @click="$router.push({name: 'front_transactions'})" no-caps class="q-mt-sm" flat>
              <q-icon name="img:icon_layout/transactions.png" class="q-mr-md" />
            Transactions</q-btn>
             <q-btn align="left" @click="$router.push({name: ' '})" no-caps class="q-mt-sm" flat>
              <q-icon name="img:icon_layout/data_privacy.png" class="q-mr-md" />
             Data Privacy</q-btn>
             <q-btn align="left" @click="$router.push({name: 'front_about'})" no-caps class="q-mt-sm" flat>
               <q-icon name="img:icon_layout/about.png" class="q-mr-md" />
             About</q-btn>
                  <q-btn v-if="user_data != undefined" align="left" @click.prevent="logout()" no-caps class="q-mt-sm" flat >Logout</q-btn>
                   <q-btn v-if="user_data == undefined" align="left" @click="$router.push({name: 'front_login'})" no-caps class="q-mt-sm" flat>Login / Signup</q-btn>
        </div>
      </q-toolbar>
      <!-- drawer content -->
    </q-drawer>
  </q-layout>
</template>
<script>
import FrontLayout from "./FrontLayout.css";
import UQChatDialog from "../components/global/UQChatDialog";
import UQIndividualChat from "../components/UQIndividualChat";
import UQSearch from "../components/global/UQSearchInput"
import UQProductTiles from '../components/global/UQProductTiles';
import UQUserTiles from '../components/global/UQUserTiles';
import { postGetCategory, getUserInfo } from "../references/url";
import UQLogOut from "../components/UQLoginLanding";
import UQNotification from "../components/Account/UQNotification";
import io from 'socket.io-client';
import { logoutClient } from '../references/url';

export default {
  components: {
    UQChatDialog,
    UQSearch,
    UQProductTiles,
    UQUserTiles,
    UQIndividualChat,
    UQLogOut,
    UQNotification
  },
  props: {
    openNotification: {
      type: Boolean,
      default: false
    },
    // user_data: {type: Object, default: () => {}}
  },
  data() {
    return {
      search: "",
      user_name: "Gelo",
      dialog: false,
      position: 'right',
      data: {},
      type: 'Items',
      user_data: {},
      categories: [],
      start: 0,
      end: 6,
      wallet: {},
      socket: {},
      socket_data: null,
      container_user: {},
      drawerLeft: false,
      authenticated: false,
      scrollPosition: null
    };
  },
   async mounted()
   {
      await this.isUserLoggedIn();
      await this.getCategory();

      //for chat purpose
      this.socket = io('http://localhost:4000', {transports: ['websocket', 'polling', 'flashsocket']});

      this.socket.on('initiate_chat', (data) => {
        // console.log(data);
        this.openForm(data);
      });

      this.socket.on('initiate_chat_personal', (data) => {
        this.openForm(data);
      });

      this.socket.on('close_chat_box', (data) => {
        this.closeForm();
      });
      //end of chat purpose
      let container_user = await this.getUserInfo();
      this.container_user = container_user;

      window.addEventListener('scroll', this.updateScroll);

    },
   methods: {
     openForm(){
        document.getElementById("myForm").style.display = "block";
     },

      closeForm(){
        document.getElementById("myForm").style.display = "none";
     },
     
    open (position) {
      this.$refs.chat.open(position);
    },
    submit() {
      this.$router.push("/catalog/"+this.search);
    },
    fromSearch(data)
    {
     this.data = data;
    },
    fromSearchType(type)
    {
      this.type = type;
      console.log(type);
    },
    async isUserLoggedIn()
    {
      let user = await this.$_isUserAuthenticated();
      if (user.data.status == 'not authenticated') {
          // this.$router.push({name: 'documentation_login'});

      } else if (user.data.status == 'authenticated') {
          this.authenticated = true;
          this.user_data = user.data.user;
      }
      this.user_data = user.data.user;
      let brt_wallet = this.user_data.wallet.find(x => x.currency_abbreviation == 'BRT');
      this.wallet = brt_wallet;
    },
    
    async getCategory() 
    {
      this.$q.loading.show();
      let get_category    = await this.$_post(postGetCategory); 
      if(get_category)
      {
        this.categories = get_category.data.data;
        this.categories = this.categories.filter( val => val.status == 'Enabled');
      }
      this.$q.loading.hide();
    },

    //for chat purpose
    openForm(data){
      document.getElementById("myForm").style.display = "block";
     },

    closeForm(){
      document.getElementById("myForm").style.display = "none";
     },
     //end of chat purpose

    async getUserInfo() {
      let res = await this.$_post(getUserInfo, {
        user_id: this.user_data._id, //local storage or session
      });
      return res.data;
    },
    
    redirectToClientWallet()
    {
      this.$router.push({name: 'front_client_wallet'})
    }, 
    
    async logout()
    {
      let logout = await this.$_get(logoutClient);
      await this.$store.commit("user/updateUser", null);

      if (logout.data == true) {
        this.$router.push({name: 'front_login'});
      }
    },

    updateScroll() {
      this.scrollPosition = window.scrollY
    }

  }
}
</script>

<style>
@media (max-width: 637px) {
  .search__input__class {
    display: none;
  }
}

/* Button used to open the chat form - fixed at the bottom of the page */
.open-button {
  background-color: #555;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  position: fixed;
  bottom: 23px;
  right: 28px;
  width: 280px;
}

/* The popup chat - hidden by default */
.chat-popup {
  display: none;
  position: fixed;
  bottom: 0;
  right: 15px;
  z-index: 9;
}

/* Add styles to the form container */
.form-container {
  width: 330px;
  padding: 10px;
  background-color: white;
}
.form-container_chat {
  width: 330px;
  background-color: white;
  border-radius: 10px;
  margin-bottom: 10px;
  border: 1px solid #e0e0e0;
}

/* Full-width textarea */
.form-container textarea {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;
  resize: none;
  min-height: 200px;
}

/* When the textarea gets focus, do something */
.form-container textarea:focus {
  background-color: #ddd;
  outline: none;
}

/* Set a style for the submit/send button */
.form-container .btn {
  background-color: #4CAF50;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-bottom:10px;
  opacity: 0.8;
}

/* Add a red background color to the cancel button */
.form-container .cancel {
  background-color: red;
}

/* Add some hover effects to buttons */
.form-container .btn:hover, .open-button:hover {
  opacity: 1;
}

/* Dark Mode */
.header_normal {
  background-color: rgb(242, 245, 250);
  color: black;
}
.header_dark {
  /* background: linear-gradient(145deg, rgb(61, 14, 42) 15%, rgb(14, 43, 78) 70%); */
  background-color: #010101f2;
}
@media (max-width: 871px) {
  .navbar__paddingMbl {
    padding: 0;
    text-align: left;
  }
}
</style>

<style scoped>
   .change__color {
       border-bottom: 1px solid #cfcfcf;
      box-shadow: 0px 0px 10px 1px #cfcfcf;
      background: white;
   }
</style>