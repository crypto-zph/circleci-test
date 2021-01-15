<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="text-white main nav__main">
      <!------------------------------- Navbar --------------------------------------->
      <q-toolbar class="navbar">
        <q-toolbar-title>
        </q-toolbar-title>

        <div class="nav">
          <ul>
            <li>
              <a
              class="font-rubik-labels text-black"
              style="font-weight: 400; cursor: pointer"
              @click="$router.push({ name: 'front_about' })"
              >About</a>
            </li>
            <div class="dropdown">
              <li>
                <a
                class="dropbtn font-rubik-labels text-black"
                style="font-weight: 400;  cursor: pointer"
                >Product</a>
              </li>
              <div class="dropdown-content text-black">
                <a @click="$router.push({ name: front_product_details })" clickable>Category 1</a>
                <a href="#">Category 2</a>
                <a href="#">Category 3</a>
              </div>
            </div>

            <li>
              <a class="font-rubik-labels text-black" style="font-weight: 400;  cursor: pointer">Data Privacy</a>
            </li>
            <q-separator vertical inset />
            <li class="row" v-if="user_data">
                 <img style="height: 47px;" src="icon_layout/BARISTOCRAT 3.png">
              <div class="font-rubik-labels self-center text-black" style="font-weight: 400;  cursor: pointer">BRT  1800</div>
            </li>

            <li v-if="!user_data">
              <a
              @click="$router.push({name: 'front_login'})"
              style="font-weight: 400; border-right: 1px solid white; cursor: pointer"
              class="font-rubik-labels"
              >Login</a>
            </li>

            <li v-if="!user_data">
              <a
              @click="$router.push({name: 'front_login'})"
              style="font-weight: 400; cursor: pointer"
              class="font-rubik-labels"
              id="register-nav"
              >Sign Up</a>
            </li>
          </ul>
        </div>
        
      </q-toolbar>
      <!------------------------------- End of Navbar--------------------------------------->
      <!------------------------------- Header --------------------------------------->
      <div class="row" style="padding: 20px" id="search__input">
          <div class="col-3 text-center" style="margin-top: -10px">
              <a @click="$router.push({name: 'front_landing'})" style="cursor: pointer">
                <q-img src="icons/baristocratn.png" id="logo" /> 
              </a>
          </div>
          <div class="col-6 text-center">
            <div id="search__input">
                <u-q-search @success="fromSearch" @changeType="fromSearchType" ></u-q-search>
            </div>
          </div>
          <div class="col-3">
            <div class="q-ml-md">
              <q-btn :icon="$route.name != 'front_cart' ? 'img:icon_layout/cart.png' : 'img:icon_layout/cart_fill.png'" round flat @click="$router.push({name: 'front_cart'})"/>
              <q-btn icon="img:icon_layout/bell.png" flat>
                <q-menu :offset="[100, 10]">
                  <div class="q-px-sm q-py-md">
                    <div class="row q-col-gutter-lg">
                      <div align="left" class="text-bold font-rubik-title text-h5 col-6">
                        Notification
                      </div>
                      <div class="col-6" align="right">
                        <q-btn icon="fas fa-indent" size="10px" flat round />
                      </div>
                    </div>

                    <q-separator />
                    <q-list>
                    <q-item clickable v-ripple style="border-bottom: 1px solid #e0e0e0">
                      <div class="row q-mt-md">
                        <q-item-section top avatar style="margin-top: -20px">
                          <q-avatar>
                            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                          </q-avatar>
                        </q-item-section>

                        <q-item-section style="margin-top: -20px">
                          <q-item-label>Toqaful yoasaful</q-item-label>
                          <q-item-label caption><span><b>Posted:</b></span> Nag bebenta ako ng sasakyan!.</q-item-label>
                        </q-item-section>

                        <q-item-section side top style="margin-top: -20px">
                          <img src="products/product_06.jpg" width="80px" />
                        </q-item-section>
                      </div>
                    </q-item>
                  </q-list>
                </div>
              </q-menu>
            </q-btn>
            <q-btn :icon="$route.name != 'front_wishlist' ? 'img:icon_layout/newsfeed.png' : 'img:icon_layout/newsfeed_fill.png'" round flat @click="$router.push({name: 'front_wishlist'})"/>
              <q-btn :icon="$route.name != 'front_wishlist' ? 'img:icon_layout/heart.png' : 'img:icon_layout/heart_fill.png'" round flat @click="$router.push({name: 'front_wishlist'})"/>
              <q-btn :icon="$route.name != 'front_wishlist' ? 'img:icon_layout/messages.png' : 'img:icon_layout/messages_fill.png'" round flat @click="$router.push({name: 'front_wishlist'})"/>
              <q-btn round flat>
                <q-avatar size="30px">
                  <img :src="`http://localhost:4000/avatar/${user_data.gender}/${user_data.avatar_path}`" />
                 
                </q-avatar>
                <q-tooltip content-class="bg-secondary text-white shadow-4" :offset="[10, 10]">
                  Log in as {{user_data.username}}
                </q-tooltip>
              </q-btn>

          </div>
        </div>
  </div>
        <!------------------------------- End of Header --------------------------------------->
        <hr style="border: 0;
                  height: 1px;
                  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));">
</q-header>

       <q-drawer show-if-above v-model="left" side="left" bordered>
           <div class="q-pa-lg">
                <u-q-filter></u-q-filter>
           </div>
        </q-drawer>


        <q-page-container>
          <router-view />
        </q-page-container>

<!------------------------------- Chat --------------------------------------->
<q-page-sticky position="bottom-right" :offset="[18, 18]">
  <q-btn flat round @click="open('right')">
    <q-avatar class="chat__icon" text-color="white">
      <q-img style="width: 30px; margin: 0 6px 0 0" src="chat.png" />
    </q-avatar>
  </q-btn>
  <u-q-chat-dialog ref="chat"></u-q-chat-dialog>
</q-page-sticky>
<!------------------------------- End of  Chat --------------------------------------->
  </q-layout>
</template>


<script>
import FrontLayout from "./FrontLayout.css";
import UQChatDialog from "../components/global/UQChatDialog";
import UQFilter from "../components/UQItemFilters"
import UQSearch from "../components/global/UQSearchInput"
export default {
  components: {
    UQChatDialog,
    UQSearch,
    UQFilter,
  },
  data() {
    return {
      left: true,
      right: false,
      search: "",
      user_name: "Gelo",
      dialog: false,
      position: 'right',
      data: {},
      type: 'Items',
      user_data: {}
    };
  },
    mounted()
    {
      this.isUserLoggedIn();
    },
   methods: {
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
      this.user_data = user.data.user;
    },  
  }
};
</script>
<style  scoped>
.q-drawer--standard{
    border-right: none;
}
</style>

