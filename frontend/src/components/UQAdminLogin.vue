<template>
        <!-- content -->
        <q-card class="content shadow-24 admin_isPhone" style="border-radius: 5%;">
            <!-- <q-card-section bordered class="text-center my-card">

            </q-card-section> -->
            <q-card-section bordered class="text-center my-card">
                 <img style="height: 150px; width: 180px;" src="../../public/logo-brt.png" alt="">
                <div class="text-h6" style="color: rgb(98,99,100)">Login</div>
            </q-card-section>

            <q-card-section class="text-white">
                <q-form
                    @submit="adminLogin"
                    class="q-gutter-md"
                >
                    <q-input
                        color="blue-grey-14"
                        placeholder="Email"
                        type="text"
                        v-model="form_data.email"
                        class="q-px-md q-mt-sm"
                        outlined
                        dense
                        :rules="validateEmailField"
                    />
                    <q-input
                        color="blue-grey-14"
                        placeholder="Password"
                        :type="isPwd ? 'password' : 'text'"
                        v-model="form_data.password"
                        class="q-px-md q-mt-sm"
                        outlined
                        dense
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
                        <q-btn
                            label="LOGIN"
                            type="submit"
                            class="q-ml-sm q-mb-lg"
                            style="background-color: rgb(153, 106, 170); border-radius: 10%"
                        />
                    </div>
                </q-form>
            </q-card-section>
        </q-card>
</template>

<script>
import { postAdminLogin } from '../references/url';

export default
{
    data:() =>(
    {
        form_data:
        {
            email: '',
            password: '',
        },
        isPwd: true,
    }),
    computed:
    {
        validateEmailField ()
        {
            var email_format = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            return [
                val => !!val || 'Email is required',
                val => email_format.test(val) || 'Please enter a valid email address'

            ];
        },
        validatePasswordField ()
        {
            return [
                val => !!val || `Password is required`,
            ];
        }
    },
    methods:
    {
        async adminLogin()
        {
            this.$q.loading.show();

            let login_obj = await this.$_post(postAdminLogin, this.form_data);

            if (login_obj) {
                if (this.hasHistory) {
                    this.$router.go(-1);
                } else {
                    this.$router.push({name: 'admin_dashboard'});
                }
            }

            this.$q.loading.hide();
        },

        hasHistory()
        {
            return window.history.length > 2;
        }
    }
}
</script>

<style>
    .admin_isPhone {
        width: 400px
    }
    @media (max-width: 500px) {
             .admin_isPhone {
            width: 300px
        }
    }
</style>