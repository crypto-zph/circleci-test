<template>
  <q-layout view="lHh LpR lFf">
    <!-- HEADER -->
    <q-header
      reveal
      :class="$q.dark.isActive ? 'header_dark' : 'header_normal'"
    >
      <q-toolbar>
        <q-btn
          @click="left = !left"
          flat
          round
          dense
          icon="menu"
          class="q-mr-sm"
        />
          <q-toolbar-title>Baristocrat Admin</q-toolbar-title>
              <q-btn
                class="q-mr-xs"
                flat
                round
                @click="$q.dark.toggle()"
                :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
              />

              <q-avatar>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>

            <div class="q-mx-md q-mr-xl" style="font-weight: bolder">
              Pergentino S. Galang II
            </div>
      </q-toolbar>
    </q-header>
    <!-- END OF HEADER -->

    <q-drawer
      class="left-navigation text-white"
      show-if-above
      v-model="left"
      style="background-image: url(https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg) !important;"
      side="left"
      elevated
    >
      <div
        class="full-height"
        :class="$q.dark.isActive ? 'drawer_dark' : 'drawer_normal'"
      >
        <div style="height: calc(100% - 117px);padding:10px;">
            <!-- <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar> -->
            <div class="text-center">
              <img style="height: 150px; width: 200px;" src="../../public/logo-brt.png" alt="">
            </div>
          <!-- <hr /> -->
          <q-scroll-area style="height:100%;">
            <q-list
              v-for="(nav, i) in navs"
              :key= "i"
            >
              <q-item
                exact
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
                @click="$router.push({ name: nav.route })"
                :active="$route.name == nav.route"
                :active-class="$route.name == nav.route ? 'tab-active' : null "
                v-if ="nav.Access_level == 'Administrator'"
              >
                <q-item-section avatar>
                  <q-icon :name="nav.icon" />
                </q-item-section>

                <q-item-section>
                  {{nav.name}}
                </q-item-section>
              </q-item>
        
            </q-list>
          </q-scroll-area>
          <q-list>
            <!-- Sign Out -->
              <q-item
                active-class="tab-active"
                class="q-ma-sm navigation-item"
                clickable
                @click.prevent="logout()"
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="fas fa-sign-out-alt" />
                </q-item-section>

                <q-item-section>
                  Sign out
                </q-item-section>
              </q-item>
              <!-- End of sign out -->
          </q-list>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <q-page class="row no-wrap">
        <div class="col">
          <div class="full-height">
            <q-scroll-area class="col q-pr-sm full-height" visible>
              <router-view />
            </q-scroll-area>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import {
    getAdminUsers,
    getAdminNav,
    logoutAdmin
} from "../references/url";
export default {
  data() {
    return {
      userList_arr:[],
      navigation_arr:[],
      drawer: false,
      miniState: false,
       link: 'dashboard',
      left: false,
      navs: [
        {name: 'Dashboard', route: 'admin_dashboard', icon: 'dashboard', styleObject: {width: '50%'}},
        {name: 'Trades', route: 'admin_trades', icon: 'swap_horiz',   styleObject: {width: '90%'}},
        {name: 'KYC Submits', route: 'admin_kyc_submits', icon: 'money', styleObject: {width: '20%'}},
        {name: 'Avatar Creation', route: 'admin_avatar', icon: 'account_box', styleObject: {width: '70%'}},
        {name: 'User', route: 'admin_ratings', icon: 'assignment', styleObject: {width: '20%'}},
        {name: 'Rate and Review User', route: 'admin_rate_reviews', icon: 'send', styleObject: {width: '20%'}},
        {name: 'Cover Photo Creation', route: 'admin_cover_photo', icon: 'list', styleObject: {width: '20%'}},
        {name: 'Reported Users', route: 'admin_reported_user', icon: 'money', styleObject: {width: '20%'}},
        {name: 'Settings', route: 'admin_settings', icon: 'settings', styleObject: {width: '20%'}},
        {name: 'motherWallet', route: 'admin_mother_wallet', icon: 'fas fa-wallet', styleObject: {width: '20%'}},
        {name: 'Logs', route: 'admin_logs', icon: 'fas fa-clipboard-list', styleObject: {width: '20%'}},
      ],
      user_info: {},
    };
  },
  async mounted(){
    this.$q.loading.show();
    this.isUserLoggedIn();
    this.getAdminUsers();
    this.getAdminNav()
    this.$q.loading.hide();
  },

  methods: {
    logoutNotify() {
      this.$q.notify({
        message: "Logged out"
      });
    },

    async getAdminUsers() {
      let result = await this.$_post(getAdminUsers);
      if (result != null) {
          this.userList_arr = result.data;
      }
    },
    async getAdminNav() {
      this.$q.loading.show();
      let result = await this.$_post(getAdminNav);
      this.$q.loading.hide();
      if (result != null)
      {
          this.navs = result.data;
      }

    },

    logoutNotify() {
      this.$q.notify({
        message: "Logged out"
      });
    },

    async isUserLoggedIn()
    {
        this.user_info = await this.$_isAdminUserAuthenticated();
        console.log(this.user_info.data.user)
        if (this.user_info.data.status == 'not authenticated') {
            this.$router.push({name: 'admin_login'});
        }
    },

    async logout()
    {
        let logout = await this.$_get(logoutAdmin);

        if (logout.data == true) {
            this.$router.push({name: 'documentation_admin_login'});
        }
    },
  }
}
</script>

<style>
.drawer_normal {
  background-color: rgb(255, 255, 255);
  color: black
}
.drawer_dark {
  background-color: #010101f2;
}
.navigation-item {
  border-radius: 5px;
}
.tab-active {
  background-color: rgb(244, 247, 252);
}
body {
  background:  rgb(242, 245, 250) !important;
}
.header_normal {
  background-color: rgb(242, 245, 250);
  color: black;
}
.header_dark {
  /* background: linear-gradient(145deg, rgb(61, 14, 42) 15%, rgb(14, 43, 78) 70%); */
  background-color: #010101f2;
}
</style>