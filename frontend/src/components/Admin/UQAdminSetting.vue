=========================================
Title: Manage User
Design Author: Andrea Lyn Destajo
Date: 28-30 Oct 2020
Contributor: Gelo
=========================================
<template>
  <div class="font-rubik-labels">
    <div>
      <div class="row">
        <div class="col-6">
         <div class="text-bold text-h5 q-px-lg q-py-md">
          Settings
        </div>
        <div>
          <q-list bordered separator>
            <q-item clickable v-ripple @click="navigation()">
              <q-item-section>Navigation</q-item-section>
               <q-item-section avatar>
              <q-icon name="fas fa-angle-right" />
            </q-item-section>
            </q-item>
             <q-item clickable v-ripple @click="security()">
              <q-item-section>Security</q-item-section>
                <q-item-section avatar>
              <q-icon name="fas fa-angle-right" />
            </q-item-section>
            </q-item>
             <q-item clickable v-ripple @click="fee()">
              <q-item-section>Fee</q-item-section>
                <q-item-section avatar>
              <q-icon name="fas fa-angle-right" />
            </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
      <div class="col-6" v-if="isShow_navigation">
         <div class="text-bold text-h5 q-px-lg q-py-md">
          Navigation
        </div>
        <div>
            <q-list bordered class="rounded-borders" style="max-width: 700px"
                v-for="(navi_arr)  in navi_arr "
                :key="navi_arr._id"
            >
            <q-item>
                <q-item-section avatar top>
                  <q-icon :name="navi_arr.icon" />
                </q-item-section>

                <q-item-section top class="col-2 gt-sm">
                <q-item-label class="q-mt-sm">{{navi_arr.name}}</q-item-label>
                </q-item-section>

                <q-item-section top>
                  
                </q-item-section>

                <q-item-section top side>
                  {{navi_arr.Access_level}}
                <div class="text-grey-8 q-gutter-xs">
                    <q-btn  flat dense round icon="delete" @click="removeAdminNavigation(navi_arr)" />
                    <q-btn size="12px" flat dense round icon="more_vert" @click="accessLevel(navi_arr)" />
                </div>
                </q-item-section>
            </q-item>
          </q-list>
      </div>
    </div>
    <div class="col-6" v-if="isShow_security">
       <div class="text-bold text-h5 q-px-lg q-py-md">
        Security
      </div>
        <div>
              <q-input dense outlined v-model="admin_user_credentials.email_str" label="Email" />
              <q-input dense outlined v-model="admin_user_credentials.old_pass_str" :type="isPwd ? 'password' : 'text'" borderless style="background: white; border-radius: 5px"   placeholder="Old Password" >
                      <template v-slot:append>
                      <q-icon
                          :name="isPwd ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isPwd = !isPwd"
                      />
                      </template>
                        <template v-slot:prepend>
                      <q-icon
                          name="fas fa-lock"
                          size="14px"
                          class="cursor-pointer"
                      />
                      </template>
                </q-input>
                <q-input dense outlined v-model="admin_user_credentials.new_pass_str" :type="isPass ? 'password' : 'text'" borderless style="background: white; border-radius: 5px"   placeholder="New Password"
                        :rules="[
                        val => !!val || '* Field is required',
                        val => val.length > 7 || 'Password must be more than 8 characters',
                        val => val.length < 16 || 'Password must not exceed 16 characters',
                        ]">
                        <template v-slot:append>
                        <q-icon
                            :name="isPass ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isPass = !isPass"
                        />
                        </template>
                        <template v-slot:prepend>
                        <q-icon
                            name="fas fa-lock"
                            size="14px"
                            class="cursor-pointer"
                        />
                        </template>
                  </q-input>
              <q-btn color="purple" label="Change" @click="adminChangePassword()" />
        </div>
      </div>
    </div>
     <div class="col-6" v-if="isShow_fee">
       <div class="text-bold text-h5 q-px-lg q-py-md">
        Fee
      </div>
      <div style="border: 1px solid #e0e0e0">
         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.
      </div>
    </div>
  </div>
   <q-page-sticky position="bottom-right" :offset="[18, 18]">
              <q-btn class="bg-white text-black" icon="add" round>
                <q-menu>
                    <div class="row no-wrap q-pa-md">
                      <div class="column">
                        <div class="text-h6 q-mb-md text-bold">Navigation</div>
                        <q-input dense outlined color="secondary" class="q-mb-xs" v-model="navigation_obj.nav_name" label="Name" />
                        <q-input dense outlined color="secondary" class="q-mb-xs" v-model="navigation_obj.nav_url" label="Url" />
                        <q-input dense outlined color="secondary" class="q-mb-xs" v-model="navigation_obj.nav_icon" label="Icon" />
                        <q-select dense outlined color="secondary" class="q-mb-xs" round v-model="navigation_obj.nav_access_level" :options="options" label="Access Level" />
                        <q-btn
                          color="secondary"
                          label="Save"
                          size="sm"
                          @click="addNewNav()"
                        />
                      </div>
                    </div>
                  </q-menu>
                </q-btn>
              </q-page-sticky>
</div>
</template>

<script>
import {getAdminRoles,
        addNewNav,
        getAdminNav,
        adminChangePassword,
        assignAccess,
        removeAdminNavigation
        } from "../../references/url";
import Swal from 'sweetalert2';
export default {
  data () {
    return {
      isShow_navigation: false,
      isShow_security: false,
      isShow_fee: false,
      isPwd: true,
      isPass:true,
      model: null,
      options: [],
      navigation_obj:{
        nav_id:'',
        nav_name:'',
        nav_url: '',
        nav_icon: '',
        nav_access_level: '',
      },
      nav_access_level: '',
      navi_arr:[],

      splitterModel: 50,
      selected: 'Food',
      simple: [
        {
          label: 'Admin Setting',
          children: [
            {
              label: 'Navigation',
              icon: 'restaurant_menu'
            },
            {
              label: 'Security',
              icon: 'lock'
            },
            {
              label: 'Fee',
              icon: 'photo'
            }
          ]
        }
      ],
      roleList_arr:[],
      admin_user_credentials: 
      {
        email_str: '',
        old_pass_str:'',
        new_pass_str:'',
      },
    }
  },

  async mounted()
  {
      await this.getAdminRoles();
      await this.getAdminNav();
  },

  methods:
  {
    async reset(){
      this.navigation_obj.nav_name = "";
      this.navigation_obj.nav_url  = "";
      this.navigation_obj.nav_icon = "" ;
    },
    async getAdminRoles() {
        this.$q.loading.show();
        let result = await this.$_post(getAdminRoles);
        this.$q.loading.hide();
        if (result != null) {
            this.roleList_arr = result.data;
            for (let role of this.roleList_arr) {
                this.options.push(role.Role_str);
            }
        }
    },
    async addNewNav() {
      if (
          this.navigation_obj.nav_name  == "" || 
          this.navigation_obj.nav_url   == "" || 
          this.navigation_obj.nav_icon  == "" )
          {
          Swal.fire({
          icon: 'error',
          title: 'Empty Field',
          text: 'You need to fill up the form.',
          confirmButtonColor: '#2f4c7e',
          })
      } else {
        let result = await this.$_post(addNewNav, this.navigation_obj);
        
          if(result.data != 'error'){
              Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'User added successfully.',
              confirmButtonColor: '#2f4c7e',
              })
              this.navi_arr = result.data;
              this.getAdminNav();
              this.reset();
          }else{
              Swal.fire({
              icon: 'error',
              title: 'Existing Data',
              text: '',
              confirmButtonColor: '#2f4c7e',
              })
          }                      
      }
    },
    async getAdminNav() {
      this.$q.loading.show();
      let result = await this.$_post(getAdminNav);
      this.$q.loading.hide();
      if (result != null) {
          this.navi_arr = result.data;
      }
    },
    async removeAdminNavigation(info) {
      Swal.fire({
        title: 'Are you sure want to delete this?',
        text: "You won't be able to see this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then( async (result) => {
        let res = await this.$_post(removeAdminNavigation, info);
        if (result.isConfirmed && res.data == 'success') {
          Swal.fire(
            'Deleted!',
            'Your file has been Deleted.',
            'success'
          )
          this.getAdminNav();
        }
      })
    },
    async clearPassField(){
      this.admin_user_credentials.email_str ="";
      this.admin_user_credentials.old_pass_str ="";
      this.admin_user_credentials.new_pass_str ="";
    },
    async adminChangePassword()
    {
      Swal.fire({
        title: 'Are you sure you want to change your password?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then( async (result) => {
        let result_change = await this.$_post(adminChangePassword, this.admin_user_credentials);     
        if (result.isConfirmed && result_change.data == 'success') {
          Swal.fire(
            'Updated!',
            'Your password has been changed.',
            'success'
          )
          this.clearPassField();
        }else if (result.isConfirmed && result_change.data == 'password did not matched!' ){
          Swal.fire({
          icon: 'error',
          title: 'Old password did not matched!',
          text: '',
          confirmButtonColor: '#2f4c7e',
          })         
        }else if (result.isConfirmed && result_change.data == 'Invalid Email'){
          Swal.fire({
          icon: 'error',
          title: 'Invalid Email!',
          text: '',
          confirmButtonColor: '#2f4c7e',
          })           
        }
      })
    },
    async accessLevel(info)
    {
      const { value: access } = await Swal.fire({
        title: 'Restriction',
        input: 'select',
        inputOptions:{
            'Access' : this.options,
        },
        inputPlaceholder: 'Select Access Level',
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise( async (resolve) => {
            if (value === '') {
              resolve('You must select a level.');
            } else {

              Swal.fire({
                title: ` Change to ${this.options[value]}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
              }).then( async (result) => {

                this.navigation_obj.nav_id = info._id;
                this.navigation_obj.nav_name = info.name;
                this.navigation_obj.nav_access_level = this.options[value];

                let res = await this.$_post(assignAccess, this.navigation_obj);

                if (result.isConfirmed && res.status == 200) {
                  Swal.fire(
                    'Updated!',
                    'Your file has been updated.',
                    'success'
                  )
                  await this.getAdminNav();
                }
              })
              
            }
          });
        }
      })
    },
        async navigation() {
      this.isShow_navigation = true;
      this.isShow_security = false;
      this.isShow_fee = false;
    },
     async security() {
      this.isShow_navigation = false;
      this.isShow_security = true;
      this.isShow_fee = false;
    },
    async fee() {
      this.isShow_navigation = false;
      this.isShow_security = false;
      this.isShow_fee = true;
    },
  }
}
</script>