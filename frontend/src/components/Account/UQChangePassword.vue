<template>
  <div>
    <!-- content -->
    <div class="content text-left">
              <q-input class="q-mb-md" dense outlined v-model="form_data.old_password" :type="isOldPwd ? 'password' : 'text'" label="Old Password">
                    <template v-slot:append>
                      <q-icon
                          :name="isOldPwd ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isOldPwd = !isOldPwd"
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
              <q-input class="" dense outlined v-model="form_data.new_password" :type="isNewPass ? 'password' : 'text'" borderless style="background: white; border-radius: 5px"   placeholder="New Password" 
                        :rules="[
                        val => !!val || '* Field is required',
                        val => val.length > 7 || 'Password must be more than 8 characters',
                        val => val.length < 16 || 'Password must not exceed 16 characters',
                        ]">
                      <template v-slot:append>
                      <q-icon
                          :name="isNewPass ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isNewPass = !isNewPass"
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
                <q-input dense outlined v-model="form_data.confirm_password" :type="isConfirmPass ? 'password' : 'text'" borderless style="background: white; border-radius: 5px"   placeholder="Confirm Password"
                        :rules="[
                        val => !!val || '* Field is required',
                        val => val.length > 7 || 'Password must be more than 8 characters',
                        val => val.length < 16 || 'Password must not exceed 16 characters',     
                        ]">
                        <template v-slot:append>
                        <q-icon
                            :name="isConfirmPass ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isConfirmPass = !isConfirmPass"
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
              <q-btn color="purple" label="Change" @click="changePassword()" />
    </div>
  </div>
</template>

<script>
import {
  putUserPassword,

} from "../../references/url";
import Swal from "sweetalert2";

export default {
  components: {},
  data: () => ({
      isOldPwd: true,
      isNewPass: true,
      isConfirmPass: true,
      form_data: {
          old_password: "",
          new_password: "",
          confirm_password: "",
          email: ""
      },
      user_data: {}
  }),
  async mounted() {
    await this.isUserLoggedIn()
  },
  methods: {
      async changePassword(){
        Swal.fire({
        title: 'Are you sure you want to change your password?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then( async (result) => {
        this.form_data.email = this.user_data.email
        this.$q.loading.show();
        let res = await this.$_post(putUserPassword, this.form_data);
        this.$q.loading.hide();
        console.log(res.data)        
        if(result.isConfirmed == true && res.data.status == 'success') {
        this.clearPassField()
         Swal.fire({
            icon: "success",
            title: "Congrats...",
            text: "Successfully Changed",
          });
        }
      })
      },
      async clearPassField(){
        this.form_data.old_password = "";
        this.form_data.new_password = "";
        this.form_data.confirm_password = "";
    },

      async isUserLoggedIn()
      {
        this.$q.loading.show();
        let user = await this.$_isUserAuthenticated();
        this.$q.loading.hide();
        if (user.data.status == 'not authenticated') {
            this.$router.push({name: 'front_login'});
        } else if (user.data.status == 'authenticated') {
            this.user_data = user.data.user;
        }
      },
  },
};
</script>

