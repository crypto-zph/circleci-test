<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="text-white main" :class="$q.dark.isActive ? 'header_dark' : 'nav__main'">
      <q-toolbar class="navbar">
        <q-toolbar-title>
          <a @click="$router.push({name: 'front_landing'})" style="cursor: pointer">
            <q-img src="icons/logo.png" id="logo" />
          </a>
        </q-toolbar-title>

        <!-- <div class="nav">
          <ul>
            <li class="q-mt-xs">
              <a
                @click="$router.push({ name: 'front_sell' })"
                class="font-rubik-labels"
                style="font-weight: 400;olid white; cursor: pointer"
              >Sell</a>
            </li>
            <div class="dropdown q-mt-xs">
              <li>
                <a class="dropbtn font-rubik-labels" style="font-weight: 400">Product</a>
              </li>
              <div class="dropdown-content">
                <a @click="$router.push({ name: front_product_details })" clickable>Category 1</a>
                <a href="#">Category 2</a>
                <a href="#">Category 3</a>
              </div>
            </div>

            <li class="q-mt-xs">
              <a class="font-rubik-labels" style="font-weight: 400">Data Privacy</a>
            </li>

            <div class="dropdown q-mt-xs">
              <li>
                <a class="dropbtn font-rubik-labels" style="font-weight: 400">
                  <q-icon name="fas fa-user" size="13px"></q-icon>
                  {{user_data.username}}
                </a>
              </li>
              <div class="dropdown-content">
                <a @click="$router.push({name: 'front_profile'})" clickable>Profile</a>
                <a href="#" @click="$router.push({name: 'front_wishlist'})">Wishlist</a>
                <a href="#">Transactions</a>
                <a href="#">Logout</a>
              </div>
            </div>
            <li class="q-mt-xs">
              <a
                @click="$router.push({name: 'front_login'})"
                style="font-weight: 400; border-right: 1px solid white; cursor: pointer"
                class="font-rubik-labels"
              >Login</a>
            </li>
            <li class="q-mt-xs">
              <a
                @click="$router.push({name: 'front_login'})"
                style="font-weight: 400; cursor: pointer"
                class="font-rubik-labels"
                id="register-nav"
              >Sign Up</a>
            </li>
            <li>
              <a @click="$router.push({name: 'front_cart'})" style="cursor: pointer">
                <q-icon
                  name="fas fa-shopping-cart"
                  style="padding: 20px 10px; font-size: 20px; color: black;"
                />
              </a>
            </li>
          </ul>
        </div> -->
        <q-btn dense flat round color="black" icon="menu" @click="right = !right" id="burger-btn" />
      </q-toolbar>
    </q-header>

    <q-drawer show-else-above v-model="right" side="right" bordered>
      <q-toolbar>
          <div class="column full-width">
          <q-btn  @click="$router.push({name: 'front_about'})" no-caps class="q-mt-sm" flat>About</q-btn>
          <q-separator />
           <q-btn @click="$router.push({name: 'front_sell'})" no-caps class="q-mt-sm" flat>Sell</q-btn>
           <q-separator />
            <q-btn  @click="$router.push({name: ' '})" no-caps class="q-mt-sm" flat>Product</q-btn>
            <q-separator />
             <q-btn  @click="$router.push({name: ' '})" no-caps class="q-mt-sm" flat>Data Privacy</q-btn>
             <q-separator />
              <q-btn  @click="$router.push({name: 'front_profile'})" no-caps class="q-mt-sm" flat>Profile</q-btn>
              <q-separator />
               <q-btn  @click="$router.push({name: 'front_transactions'})" no-caps class="q-mt-sm" flat>Transactions</q-btn>
               <q-separator />
                <q-btn  @click="$router.push({name: 'front_cart'})" no-caps class="q-mt-sm" flat>Cart</q-btn>
                <q-separator />
                  <q-btn  @click="$router.push({name: ' '})" no-caps class="q-mt-sm" flat>Logout</q-btn>
                  <q-separator />
                   <q-btn  @click="$router.push({name: 'front_login'})" no-caps class="q-mt-sm" flat>Login / Signup</q-btn>
        </div>
      </q-toolbar>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>Title
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>-->
  </q-layout>
</template>


<script>
import FrontLayout from "./FrontLayout.css";
export default {
  data() {
    return {
      right: false,
      search: "",
      user_name: "Gelo",
      user_data:{}
    };
  },
  async mounted() {
  },
    methods: {

  }
};
</script>
<style  scoped>
.header_dark {
  /* background: linear-gradient(145deg, rgb(61, 14, 42) 15%, rgb(14, 43, 78) 70%); */
  background-color: #010101f2;
}
</style>
