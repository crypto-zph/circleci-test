<template>
    <div>
	    <!-- content -->
	    <div class='content text-left'>
	    	<q-form @submit="createAccount()">
                <q-select 
                   :bg-color="!$q.dark.isActive? 'white':'grey-7'"
                    class="q-px-md text-white q-mt-sm" 
                    outlined
                    v-model="form_data.country" 
                    :options="countries" 
                    label="Country" 
                    option-value="name"
                    option-label="name"
                     :color="!$q.dark.isActive? 'blue-grey-14':'white'"
                >
                    <template v-slot:prepend>
                        <img :src="'https://www.countryflags.io/' + form_data.country.code + '/flat/32.png'" v-if="form_data.country != ''" />
                        
                        
                    </template>
                    <template v-slot:option="scope">
                        <q-item
                            v-bind="scope.itemProps"
                            v-on="scope.itemEvents"
                        >
                        <q-item-section side>
                            <img :src="'https://www.countryflags.io/' + scope.opt.code + '/flat/32.png'" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label v-html="scope.opt.name" />
                        </q-item-section>
                        </q-item>

                    </template>
                </q-select>


				<q-input class="q-px-md text-white q-mt-sm"  :color="!$q.dark.isActive? 'blue-grey-14':'white'"
                        outlined v-model="form_data.username" label="Username"  :bg-color="!$q.dark.isActive? 'white':'grey-7'" />
                
                <!-- <div style="text-align: center;" > -->
                    <q-option-group class="q-px-md q-mt-sm" 
                        v-model="form_data.gender"
                        :options="gender_options"
                        label="gender"
                        :color="!$q.dark.isActive? 'blue-grey-14':'white'"
                        outlined
                        :bg-color="!$q.dark.isActive? 'white':'grey-7'"
                    />
                <!-- </div> -->
				<q-input class="q-px-md text-white q-mt-sm" :bg-color="!$q.dark.isActive? 'white':'grey-7'"  :color="!$q.dark.isActive? 'blue-grey-14':'white'"
                        outlined v-model="form_data.email" label="Email" />

				<q-input class="q-px-md text-white q-mt-sm " :bg-color="!$q.dark.isActive? 'white':'grey-7'"  :color="!$q.dark.isActive? 'blue-grey-14':'white'"
                        outlined style="" v-model="form_data.password" type="password" label="Password" />

				<q-input class="q-px-md text-white q-mt-sm"  :bg-color="!$q.dark.isActive? 'white':'grey-7'"  :color="!$q.dark.isActive? 'blue-grey-14':'white'"
                        outlined v-model="form_data.confirm_password" type="password" label="Confirm Password" />
				<div class="q-m q-pa-md" align="center"><q-btn label="CREATE ACCOUNT" type="submit" class="full-width text-white" flat style="border-radius: 10px; background: #9a68ac; color: white; width: 150px" /></div>
                    <div align="center" class="text-white">
                        <span class="label" :class="!$q.dark.isActive? 'text-grey-10':'text-white'">Already member? <a style="cursor: pointer;" :class="!$q.dark.isActive? 'text-login-here':'text-accent'" @click="$router.push({name: 'front_login'})" >Login</a> here</span>
                    </div>

	   		</q-form>
	    </div>
    </div>
</template>

<script>
import UQRegistration from './UQRegistration.scss';
import {postRegisterUser} from '../../references/url'
import countries from '../../references/countries'

export default
{
	name: "UQRegistration",
    data:() =>(
    {
        countries           : countries,
        selected_country    : '',
        gender_options      : [
            {
                label: 'Male',
                value: 'male'
            },
            {
                label: 'Female',
                value: 'female'
            }
        ],
        form_data:
        {
            country         : '',
            username		: '',
            gender          : '',
			email			: '',
			password		: '',
			confirm_password: ''
        },
    }),
    async mounted()
    {
        let userLocation        = await this.$_locateUser();
        this.form_data.country  = userLocation.data.country_name;
    },
    methods:
    {
        async createAccount()
        {
            this.$q.loading.show();
            const create_account     = await this.$_post(postRegisterUser, this.form_data);
            this.$q.loading.hide();
            
            if(create_account.data.status == 'success')
            {
                this.$emit('verifyOtp', {
                    username: this.form_data.username,
                    email   : this.form_data.email,
                    password: this.form_data.password,
                    country : this.form_data.country.hasOwnProperty('name') ? this.form_data.country.name : this.form_data.country,
                    gender  : this.form_data.gender
                });
            }
        }
    }
}
</script>

<style scoped>

.q-radio__inner
{
    color: white !important;
}

.text-login-here{
    color: #1f3c88
}

</style>