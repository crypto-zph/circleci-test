<template>
    <div>

	    <!-- content -->
	    <div class='content text-left'>
        	<div class="text-center text__login font-rubik-title text-h4">Registration Successful</div>
                <h6>Your account has been created, you may now <a href="#">sign in</a></h6>
	    	<!-- <q-form @submit="createAccount()">
                <q-select bg-color="white" class="q-px-md text-white q-mt-sm registration-input" dense borderless v-model="form_data.country" :options="countries" label="Country" />

				<q-input class="q-px-md text-white q-mt-sm registration-input" borderless dense style="" v-model="form_data.username" label="Username" />

				<q-input class="q-px-md text-white q-mt-sm registration-input" borderless dense style="" v-model="form_data.email" label="Email" />

				<q-input class="q-px-md text-white q-mt-sm registration-input" borderless dense style="" v-model="form_data.password" type="password" label="Password" />

				<q-input class="q-px-md text-white q-mt-sm registration-input" borderless dense style="" v-model="form_data.confirm_password" type="password" label="Confirm Password" />
				<div class="q-mt-lg"><q-btn label="SUBMIT" type="submit" class="full-width text-white" flat style="background: #9A67AC" /></div>
	   		</q-form> -->
	    </div>
    </div>
</template>
<script>
import UQRegistration from './UQRegistration.scss';
export default {
    name: "UQSuccessRegistration",
    data:() =>(
    {
        form_data:
        {
            
        },
    }),
    async mounted()
    {
    },
    methods:
    {

    }
}
</script>