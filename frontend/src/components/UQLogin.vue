<template>
    <div>
	    <!-- content -->
        <div v-if="is_login_page" class="content q-mt-md">
            <div class="text-white">
                <q-form
                    @submit="localLogin"
                    class="q-gutter-md"
                >
                    <q-input
                        :color="!$q.dark.isActive? 'blue-grey-14':'white'"
                        placeholder="Email or username"
                        type="text"
                        v-model="form_data.userOrEmail"
                        class="q-px-md q-mt-sm"
                        outlined
                        :rules="validateEmailField"
                        :bg-color="!$q.dark.isActive? 'white':'grey-7'"
                    />
                    <q-input
                        :bg-color="!$q.dark.isActive? 'white':'grey-7'"
                        :color="!$q.dark.isActive? 'blue-grey-14':'white'"
                        placeholder="Password"
                        :type="isPwd ? 'password' : 'text'"
                        v-model="form_data.password"
                        class="q-px-md q-mt-sm"
                        outlined
                        :rules="validatePasswordField"
                    >
                        <template v-slot:append>
                            <q-icon
                                :name="isPwd ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPwd = !isPwd"
                            />
                        </template>
                    </q-input>

                    <div class="row q-col-gutter-sm">
                        <div class="col-6">
                            <q-btn class="full-width" icon="fab fa-facebook" flat style="color: white; background: #3b5998; border-radius: 10px" @click="redirectToFacebook()"/>
                        </div>
                        <div class="col-6">
                            <q-btn  class="full-width" icon="fab fa-google" flat style="color: red; border: 1px solid grey; border-radius: 10px; background-color: white;" @click="redirectToGoogle()"/>
                        </div>
                    </div>

                    <div align="center">
                        <q-btn
                            flat
                            label="LOGIN"
                            type="submit"
                            style="border-radius: 10px; background: #9a68ac; color: white; width: 150px"
                        />
                    </div>

                    <div align="center">
                        <a style="cursor: pointer;" :class="!$q.dark.isActive? 'text-register-here':'text-accent'"  @click="$router.push({name: 'front_forgot_password'})">forgot password?</a>
                    </div>

                    <!-- <div align="center">
                        <span class="label text-grey-10">or, Login with</span>
                    </div> -->

                    <!-- <div align="center">
                        <a href="http://localhost:4000/api/front/auth/google" class="google btn" align="center">
                            <i class="fab fa-google-plus-square"></i> Login with Google+
                        </a>
                    </div> -->

                    <!-- <div align="center">
                        <a href="https://www.facebook.com/login/" class="fb btn" align="center">
                            <i class="fab fa-facebook-square"></i> Login with Facebook
                        </a>
                    </div> -->

                    <div align="center">
                        <span class="label" :class="!$q.dark.isActive? 'text-grey-10':'text-white'">New member? <a :class="!$q.dark.isActive? 'text-register-here':'text-accent'" style="cursor: pointer;" @click="$router.push({name: 'front_registration'})" >Register</a> here</span>
                    </div>
                </q-form>
            </div>
        </div>

        <q-dialog v-model="is_show">
            <q-card class="content shadow-24">
                <q-card-section bordered class="bg-secondary text-white row items-center">
                    <div class="text-h6">Login</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>

                <q-card-section class="q-mt-md text-white">
                    <q-form
                        @submit="localLogin"
                        class="q-gutter-md"
                    >
                        <q-input
                            color="blue-grey-14"
                            placeholder="Email or username"
                            type="text"
                            v-model="form_data.userOrEmail"
                            class="q-px-md q-mt-sm"
                            outlined
                            :rules="validateEmailField"
                        />
                        <q-input
                            color="blue-grey-14"
                            placeholder="Password"
                            :type="isPwd ? 'password' : 'text'"
                            v-model="form_data.password"
                            class="q-px-md q-mt-sm"
                            outlined
                            :rules="validatePasswordField"
                        >
                            <template v-slot:append>
                                <q-icon
                                    :name="isPwd ? 'visibility_off' : 'visibility'"
                                    class="cursor-pointer"
                                    @click="isPwd = !isPwd"
                                />
                            </template>
                        </q-input>

                        <div align="center">
                            <a style="cursor: pointer; color: #1f3c88;" @click="$router.push({name: 'documentation_forgot_password'})" >forgot password?</a>
                        </div>

                    <div align="center">
                        <q-btn
                            flat
                            label="LOGIN"
                            type="submit"
                            style="border-radius: 10px; background: #9a68ac; color: white; width: 150px"
                        />
                    </div>

                        <div align="center">
                            <span class="label text-grey-10">or, Login with</span>
                        </div>

                        <div class="row  q-col-gutter-sm">
                            <div class="col-6">
                                <q-btn class="full-width" icon="fab fa-facebook" flat style="color: white; background: #3b5998; border-radius: 10px" @click="redirectToFacebook()"/>
                            </div>
                            <div class="col-6">
                                <q-btn class="full-width" icon="fab fa-google" flat style="color: red; border: 1px solid grey; border-radius: 10px" @click="redirectToGoogle()" />
                            </div>
                        </div>

                        <!-- <div align="center">
                            <a href="http://localhost:4000/api/front/auth/google" class="google btn" align="center">
                                <i class="fab fa-google-plus-square"></i> Login with Google+
                            </a>
                        </div>

                        <div align="center">
                            <a href="https://www.facebook.com/login/" class="fb btn" align="center">
                                <i class="fab fa-facebook-square"></i> Login with Facebook
                            </a>
                        </div> -->

                        <div align="center" class="text-white">
                            <span class="label text-grey-10">New member? <a style="cursor: pointer; color: #1f3c88;" @click="$router.push({name: 'document_register'})" >Register</a> here</span>
                        </div>
                    </q-form>
                </q-card-section>
            </q-card>
        </q-dialog>

    </div>
</template>

<script>
import Login from "../pages/Login.css";
import { postLocalLogin } from '../references/url';

export default
{
    props: {
        is_login_page : {
            type: Boolean,
            default: true
        }
    },
    data:() =>(
    {
        form_data:
        {
            userOrEmail: '',
            password: '',
        },
        isPwd: true,
        is_show: false,
    }),
    computed:
    {
        validateEmailField ()
        {
            var email_format = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            return [
                val => !!val || 'Email Or Username is required',

            ];
        },
        validatePasswordField ()
        {
            return [
                val => !!val || `Password is required`,
            ];
        }
    },
    mounted ()
    {
        this.isUserLoggedIn();
    },
    methods:
    {
        async localLogin()
        {
            this.$q.loading.show();

            let login_obj = await this.$_post(postLocalLogin, this.form_data);

            if (login_obj) 
            {
                await this.$store.commit("user/updateUser", login_obj.data.data);
                this.$router.push({name: 'front_landing'});
            }

            this.$q.loading.hide();
        },

        show()
        {
            this.is_show = true;
        },

        hide()
        {
            this.is_show = false;
        },

        async isUserLoggedIn()
        {
            if (this.is_login_page) {
                let user = await this.$_isUserAuthenticated();

                if (user.data.status == 'authenticated') {
                    this.$router.push({name: 'front_landing'});
                }
            }
        },
        redirectToGoogle()
        {
            window.location.href = 'http://localhost:4000/api/front/auth/google'
        },

        redirectToFacebook()
        {
            window.location.href = 'https://www.facebook.com/login/'
        },

        hasHistory()
        {
            return window.history.length > 2;
        }
    }
}
</script>
<style scoped>
.text-register-here{
    color: #1f3c88
}
</style>