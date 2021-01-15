<template>
    <div>
	    <!-- content -->
	    <div class='content text-left'>
        	<div class="text-center text__login font-rubik-title text-h4">Confirm Account Registration</div>
	    	<q-form @submit="confirmCreateAccount()">
				<q-input class="q-px-md text-white q-mt-sm registration-input" v-model="form_data.otp" color="blue-grey-14"
                        outlined  label="One Time Passcode" />

                <div class="q-mt-lg q-px-md">
                    <q-btn label="SUBMIT" type="submit" class="full-width text-white" flat style="background: #9A67AC" />
                    <q-btn label="RESEND OTP" type="button" @click="resendRegistrationOtp" class="full-width q-mt-md"  outline  style="color: #9A67AC"  />
                    <!-- <q-btn label="RESET" type="reset" class="full-width text-white" flat style="background: rgba(67, 125, 255)" /> -->
                    <!-- <q-btn label="CANCEL" type="button" @click="cancelRegistration" class="full-width text-white q-mt-md" flat style="background: rgba(253, 184, 31)" /> -->
                </div>
	   		</q-form>
	    </div>
    </div>
</template>

<script>
import UQRegistration from './UQRegistration.scss';
import {postConfirmRegistration, postResendRegistrationOtp, deleteCancelRegOtp} from '../../references/url'

export default
{
	name: "UQConfirmRegistration",
    data:() =>(
    {
        form_data:
        {
            username    : '',
            email       : '',
            password    : '',
            country     : '',
            gender      : '',
            otp         : ''
        },
    }),
    async mounted()
    {
        
    },
    methods:
    {
        setUserCredentials({username, email, password, country, gender})
        {
            this.form_data.username = username;
            this.form_data.email    = email;
            this.form_data.password = password;
            this.form_data.country  = country;
            this.form_data.gender   = gender;
        },

        async confirmCreateAccount()
        {
            this.$q.loading.show();
            let confirm_registration    = await this.$_post(postConfirmRegistration, this.form_data);
            this.$q.loading.hide();
            
            if(confirm_registration.data.status == 'success')
            {
                this.$emit('successRegistration', true)
            }
        },

        async resendRegistrationOtp()
        {
            this.$q.loading.show();
            let resend_registration_otp = await this.$_post(postResendRegistrationOtp, this.form_data);
            this.$q.loading.hide();
        },

        async cancelRegistration()
        {
            
            delete this.form_data.password;
            delete this.form_data.country;
            delete this.form_data.otp;
            
            this.$q.loading.show();
            let remove_otp_res          = await this.$_delete(deleteCancelRegOtp, this.form_data)
            this.$q.loading.hide();
            this.$emit('cancelRegistration', false);
            this.form_data.otp          = '';
        }
    }
}
</script>