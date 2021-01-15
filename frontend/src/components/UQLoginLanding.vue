<template>
    <div>
<div class="q-py-sm">
    <q-btn  :class="$q.dark.isActive ? 'bg-dark-violet' : 'bg-secondary'" no-caps flat class="bg-secondary" style="border-radius: 10px">
      @{{user_data.username}}
      <q-menu>
        <div class="row no-wrap q-pa-md">
          <div class="column">
            <div class="text-h6 q-mb-md">Settings</div>
            <!-- <q-toggle v-model="mobileData" label="Dark Mode" /> -->
            <div style="margin: 0 50px;">
              <q-btn
                round
                flat
                @click="darkModeHandler()"
                size="md"
                :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
            />
            </div>
              <q-btn label="Google Authenticator" color="primary" @click="redirectToGoogleAuth()" />
          </div>

          <q-separator vertical inset class="q-mx-lg" />

          <div class="column items-center">
            <q-avatar size="72px" v-if="user_data != undefined && user_data.avatar_path != ''">
                  <img :src="`http://localhost:4000/avatar/${user_data.gender}/${user_data.avatar_path}`" />
                </q-avatar>
                <q-avatar size="72px" v-if="user_data == undefined || user_data.avatar_path == ''">
                  <img src="icon_layout/profile_icon.png" />
                </q-avatar>
            <div class="text-subtitle1 q-mt-md q-mb-xs">{{user_data.username}}</div>

            <q-btn
              :class="$q.dark.isActive ? 'bg-dark-violet' : 'bg-secondary'"
              label="Logout"
              @click.prevent="logout()"
              push
              size="sm"
              class="text-white"
            />
          </div>
        </div>
      </q-menu>
    </q-btn>
  </div>
  </div>
</template>

<script>
import UQProductTiles from './global/UQProductTiles';
import UQGoogleAuth from "../components/Client/Wallet/UQGoogleAuthenticator"
import { logoutClient, getUserInfo } from '../references/url';

export default {
    components: { UQProductTiles, UQGoogleAuth },
    props:['user_data'],
    data: () =>
    ({
        product_details: {},
        // user_data: {},
        mobileData: false,
        bluetooth: false,
        container_user: {}
    }),
    async mounted()
    {
      let container_user = await this.getUserInfo();
      this.container_user = container_user;
    },
    methods:
    {
        async logout()
        {
            let logout = await this.$_get(logoutClient);
            await this.$store.commit("user/updateUser", null);
            
            if (logout.data == true) {
                this.$router.push({name: 'front_login'});
            }
        },

        isEmpty(obj)
        {
            return typeof obj === 'undefined' || Object.keys(obj).length === 0;
        },

        darkModeHandler()
        {
         
          if(this.$q.dark.isActive == true) {
             this.$q.localStorage.set('isDarkMode', false)
          } else {
            this.$q.localStorage.set('isDarkMode', true)
          }
          this.$q.dark.toggle()
        },
        redirectToGoogleAuth()
        {
          this.$router.push({name: "front_google_auth"})
        },
        async getUserInfo() {
        let res = await this.$_post(getUserInfo, {
          user_id: this.user_data._id, //local storage or session
        });
        return res.data;
    },
        
    }
}
</script>
<style scoped>
.bg-dark-violet{
  background-color: #7950C1;
}
</style>