<template>
  <span>

        <!-------------------- Notification Button and Notification Badge -------------------------->
            <q-btn round  class="notification__btn" :icon="notification_data == false ? 'img:icon_layout/bell.png' : 'img:icon_layout/bell_fill.png'" flat>
              <q-badge v-if="notification_count!=0" color="red" floating>{{notification_count}}</q-badge>
            </q-btn>
        <!------------------------ End of Notification Button and Notification Badge --------------------->

        <!-------------------- Notification Content -------------------------->
      <q-menu v-model="notification_data"  :offset="[200, 50]" max-width="450px">
        <div class="text-h6 font-weight-bolder q-pa-lg" v-if="user != undefined">
          Notification  
        </div>

        <!-----------------------------------  Notification With Data ---------------------------------->
        <q-list bordered separator  v-for="list in notification_list" :key="list.id" style="width: 450px;" >
            <q-slide-item @click="readNotification(list)" @left="onLeft" @action="deleteNotification(list)" @right="onRight" left-color="secondary" v-if="list.is_open == true" >
                <template v-slot:left>
                  <div class="row items-center">
                      <q-icon left name="fa fa-times" />
                  </div>
                </template>

                <q-item class="q-pa-md">
                <q-item-section avatar >

                    <q-avatar v-if="list.identification_id == null">
                        <img :src="`${server.ADMIN_PROFILE_DIR}`" draggable="false">
                    </q-avatar>

                    <q-avatar v-else>
                        <img :src="`http://localhost:4000/avatar/${list.identification_id.gender}/${list.identification_id.avatar_path}`" draggable="false">
                    </q-avatar>

                </q-item-section>
                <q-item-section>
                <q-item-label lines="1">{{list.message}}</q-item-label>
                <q-item-label caption lines="2">
                    <span class="text-weight-bold">{{ moment(list.date_created).format('DD-MMM-YYYY HH:mm') | fromNow  }}</span>
                </q-item-label>
                </q-item-section>
                <q-item-section side>
                    <q-btn
                      v-if="list.title == 'Wishlist'          || 
                            list.title == 'Posted a product.' || 
                            list.title == 'Garage Sale!'      || 
                            list.title == 'Followed'          || 
                            list.title == 'Cancelled' "
                      outline 
                      rounded
                      color="purple"
                      size="sm"
                      :label="list.title == 'Followed'?'Profile':'View'" 
                    />
                    <q-avatar v-else square>
                        <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                    </q-avatar>
                </q-item-section>
                </q-item>
            </q-slide-item>  



            <!-- Unread -->
            <q-slide-item @click="readNotification(list)" @left="onLeft" @action="deleteNotification(list)" left-color="secondary" v-if="list.is_open == false" style="background-color:#ebebeb">
                
                <template v-slot:left>
                  <div class="row items-center">
                      <q-icon left name="fa fa-times" />
                  </div>
                </template>

                <q-item>
                <q-item-section avatar>
                    <q-avatar v-if="list.identification_id == null">
                        <img :src="`${server.ADMIN_PROFILE_DIR}`" draggable="false">
                    </q-avatar>

                    <q-avatar v-else>
                        <img :src="`http://localhost:4000/avatar/${list.identification_id.gender}/${list.identification_id.avatar_path}`" draggable="false">
                    </q-avatar>
                </q-item-section>
                <q-item-section>
                <q-item-label lines="1">{{list.message}}</q-item-label>
                <q-item-label caption lines="2">
                    <span class="text-weight-bold">{{ moment(list.date_created).format('DD-MMM-YYYY HH:mm') | fromNow }}</span>
                </q-item-label>
                </q-item-section>
                <q-item-section side>
                 <q-btn
                      v-if="list.title == 'Wishlist'          || 
                            list.title == 'Posted a product.' || 
                            list.title == 'Garage Sale!'      || 
                            list.title == 'Followed'          || 
                            list.title == 'Cancelled' "
                      outline 
                      rounded
                      color="purple"
                      :label="list.title == 'Followed' ? 'Profile':'View'" 
                      size="sm"
                    />

                    <q-avatar v-else square>
                        <img src="https://cdn.quasar.dev/img/boy-avatar.png"> 
                    </q-avatar>
                </q-item-section>
                </q-item>
            </q-slide-item>   
            <!-- End of Unread -->
        </q-list>
        <!----------------------------------- End of Notification With Data ---------------------------------->


       <!----------------------------------- No data Notification With Data ---------------------------------->
              <q-list bordered separator   v-if="notification_list.length == 0" style="width: 500px;">
                  <q-item class="q-pa-md">
                  <q-item-section class="text-center q-pa-lg">
                      <div class="text-h6">No Notification</div>
                  </q-item-section>
                  </q-item>
              </q-list>
      <!----------------------------------- End of No Notification With Data ---------------------------------->


                <q-list bordered separator   v-if="user == undefined" style="width: 500px;">

                <q-item class="q-pa-md">
                <q-item-section class="text-center" style="margin: 50px 0;">
                  <q-avatar square style="margin: 0 auto">
                      <img src="icons/baristocrat03.png"> 
                  </q-avatar>
                    <div class="q-mt-md text-h6">Log in to view notifications</div>
                </q-item-section>
                </q-item>

                <q-item  style="background-color:#f0f2f0">
                <q-item-section>
                  <div class="row text-center items-center">
                    <div class="col-6">
                       <a class="btn-notif" @click="redirectPage(redirect.login)">{{redirect.login}}</a> 
                    </div>
                    <div class="col-6">
                       <a class="btn-notif" @click="redirectPage(redirect.signup)">{{redirect.signup}}</a> 
                    </div>
                  </div>
                </q-item-section>
                </q-item>
              </q-list>
      </q-menu>
      <!-------------------- End of Notification Content -------------------------->
  </span>
</template>

<script>
import { getNotifications, deleteNotification, openNotif, postCancelBarter } from '../../references/url';
import moment from "moment-timezone";
import Swal from 'sweetalert2';
import { log } from 'console';
import config   from '../../../config';

export default {
  props: ['openNotification'],
  data () {
    return {
      drawerRight       : false,
      notification_details:{
          user_id:'',
      },
      notification_list : {},
      notification_count: 0,
      moment            : moment,
      timer             : 0,
      user              :{},
      notification_data : false,
      redirect : {
        login: "Login",
        signup: "Sign Up"
      },
      config: config,
      server: {
          ADMIN_PROFILE_DIR : config.ADMIN_PROFILE_DIR
      },
    }
  },

  async mounted(){
    await this.authenticate_user();
    await this.getNotifications();
  },

  beforeDestroy () {
    clearTimeout(this.timer)
  },

  methods: 
  {
  
    async authenticate_user()
    {
        let auth = await this.$_isUserAuthenticated();
        this.user = auth.data.user;  
    },

    onLeft ({ reset }) {

      this.$q.notify('Notification has been deleted!')
      this.finalize(reset);

    },

    onRight ({ reset }) {

      this.$q.notify('Right action triggered. Resetting in 1 second.')
      this.finalize(reset)

    },

    finalize (reset) {

      this.timer = setTimeout(() => {
        reset();
      }, 500)

    },

    async getNotifications() {

      this.notification_details.user_id = this.user._id;
      let response = await this.$_post(getNotifications, this.notification_details);
     
      if (response) {
        this.notification_list = response.data;
        this.notification_count = this.notification_list.filter((x) => x.is_open == false).length;
        console.log(this.notification_list)
      }

    },

    async deleteNotification(info){
      
      let reset = ''
      let response = await this.$_post(deleteNotification, info);

      if(response.data == 'success')
      {
        await this.getNotifications();
      }

    },

    async openNotif(info)
    {
      let response = await this.$_post(openNotif, info);
      this.getNotifications();
    },

    async readNotification(info)
    {

      if(info.is_open == false){
        this.openNotif(info)
      }

      if(info.title == 'Followed'){
        this.$router.push({name: 'front_user_detail', params: {id: info.identification_id._id} });
      }
      else if(info.title == 'Reviews')
      {
        this.$router.push({ name: 'front_user_detail', params: {id: info.user_id } });
      } 
      else if(info.title == 'Wishlist')
      {
        this.$router.push({ name: 'front_product_details', params: { id: info.item_id } });
      } 
      else if(info.title == 'Posted a product.')
      {
        this.$router.push({ name: 'front_product_details', params: { id: info.item_id } });
      }
      else if(info.title == 'Garage Sale!')
      {
        this.$router.push({ name: 'front_product_details', params: { id: info.item_id } });
      }
      else if(info.title == 'Cancelled')
      {
        Swal.fire({
          title: 'Do you want to approve the request?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes',
          cancelButtonText: 'Negotiate',
        }).then( async (result) => {
          if (result.isConfirmed) {
            let res = await this.$_post(postCancelBarter , info);
            if(res.data == true)
            {
                Swal.fire(
                    'Cancelled!',
                    'Your product is cancelled.',
                    'success'
                )
            }
          }
          else if (result.isDismissed) {
            this.$router.push({ name: 'front_message' })
          }
        })
      }     
      else 
      {
          Swal.fire({
            title: info.title,
            text: info.message,
            // imageUrl: 'https://unsplash.it/400/200',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
      }
    },
    async redirectPage(route){
      if(route == "Login"){
        this.$router.push({name: "front_login"})
      } else{
       this.$router.push({name: "front_registration"}) 
      }
    }
  },
  filters:
  {
      fromNow(time_ago)
      {
        return moment(time_ago).fromNow();
      },
      rawText(text)
      {
        return text.replace(/<\/?[^>]+(>|$)/g, " ").substring(0, 20);
      },
      rawTextNameProduct(text)
      {
        return text.replace(/<\/?[^>]+(>|$)/g, " ").substring(0, 18);
      }
  },

  beforeDestroy () 
  {
    clearTimeout(this.timer)
  }

  }
</script>
<style>
.btn-notif{
  text-decoration: none;
  color: black;
  transition: 0.2s ease-in-out;
  cursor: pointer;
}
.btn-notif:hover{
  color:  #9A67AC
}
</style>
