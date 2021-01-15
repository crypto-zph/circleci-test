<template>
    <div>

	    <!-- content -->
        <q-card-section>
            <div class="text-center text__login font-rubik-title text-h4">Sign In</div>
            <div class="row">
                <div class="col-12 font-rubik-labels">
                    <q-input 
                        placeholder="Email or username" 
                        type="text" 
                        v-model="form_data.userOrEmail" 
                        class="q-px-md text-white q-mt-sm" 
                        borderless 
                        dense 
                        style="background: white; border-radius: 3px;"
                    />
                    <q-input 
                        placeholder="Password" 
                        type="password" 
                        v-model="form_data.password" 
                        class="q-px-md text-white q-mt-sm" 
                        borderless
                        dense 
                        style="background: white; border-radius: 3px;"
                    />

                    <div class="q-pt-sm">
                        <q-btn
                            label="LOGIN" 
                            @click="localLogin"
                            class="full-width text-white" 
                            flat
                            style="background: #9A67AC"
                        />
                    </div>

                    <div class="q-pt-sm text-white" align="center">
                        Or, Login with
                    </div>

                    <a href="http://localhost:4000/api/front/auth/google" class="google btn">
                        <i class="fab fa-google-plus-square"></i> Login with Google+
                    </a>

                    <a href="https://www.facebook.com/login/" class="fb btn">
                        <i class="fab fa-facebook-square"></i> Login with Facebook
                    </a>

                    <div align="center" class="text-white">
                        New member? <a style="cursor: pointer; color: #3371ab;" @click="$router.push({name: 'document_register'})" >Register</a> here
                    </div>
                </div>
            </div>
        </q-card-section>
    </div>
</template>
<script>
import { postLocalLogin } from "../../references/url";
export default {
    data: () => ({
        form_data   : {
            userOrEmail : '',
            password    : ''
        }
    }),
    methods: {
        async localLogin()
        {
            this.$q.loading.show();
            let userLogin = await this.$_post(postLocalLogin, this.form_data);
            this.$q.loading.hide();
        }
    }
}
</script>
