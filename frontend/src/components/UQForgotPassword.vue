<template>
    <div class="q-pa-md">
        <div>
            <q-card-section>
                <div class="text-h6">Enter your email address</div>
            </q-card-section>

            <q-card-section>
                <div align="center">
                    <q-input
                        bg-color="white"
                        color="blue-grey-14"
                        outlined
                        type="text"
                         class="q-px-md q-mt-sm"
                        v-model="form_data.email"
                        input-class="text-center"
                        style="font-size: 20px;"
                        placeholder="Email address"
                    />
                </div>
            </q-card-section>

            <q-card-actions align="center" class="text-primary">
                <q-btn push label="Confirm" type="button" @click="sendForgotPasswordLink" color="secondary"/>
                <q-btn push label="Cancel" @click="$router.push({name: 'front_login'})" color="grey-2" text-color="deep-purple-10"/>
            </q-card-actions>
        </div>
    </div>
</template>

<script>
import { postForgotPassword } from '../references/url';

export default
{
    data: () =>
    ({
        form_data:
        {
            email: '',
        }
    }),
    methods:
    {
        async sendForgotPasswordLink()
        {
            this.$q.loading.show();
            let forgot_link_obj = await this.$_post(postForgotPassword, this.form_data);

            if (forgot_link_obj) {
                this.$router.push({name: 'front_email_sent'});
            }

            this.$q.loading.hide();
        }
    }
}
</script>