<template>
    <q-card class="content shadow-24">
        <q-card-section bordered class="bg-indigo-10 my-card text-white">
            <div class="text-h6">Reset Password</div>
        </q-card-section>

        <q-card-section class="bg-deep-purple-2 text-white">
            <q-form
                @submit="resetPassword"
                class="q-gutter-md"
            >
                <q-input
                    color="blue-grey-14"
                    placeholder="Password"
                    :type="isPwd ? 'password' : 'text'"
                    v-model="form_data.password"
                    class="q-px-md q-mt-sm"
                    outlined
                    dense
                    ref="fldPassword"
                    @input="trigger"
                >
                    <template v-slot:append>
                        <q-icon
                            :name="isPwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isPwd = !isPwd"
                        />
                    </template>
                </q-input>
                <div class="indicator">
                    <span :class="weak_indicator" ref="weak"></span>
                    <span :class="medium_indicator" ref="medium"></span>
                    <span :class="strong_indicator" ref="strong"></span>
                </div>
                <div :class="text">{{ text_content }}</div>
                <q-input
                    color="blue-grey-14"
                    placeholder="Confirm Password"
                    :type="isCnfrmPwd ? 'password' : 'text'"
                    v-model="form_data.confirm_password"
                    class="q-px-md q-mt-sm"
                    outlined
                    dense
                    ref="fldConfirmPassword"
                    :rules="confirmPasswordChange"
                >
                    <template v-slot:append>
                        <q-icon
                            :name="isCnfrmPwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isCnfrmPwd = !isCnfrmPwd"
                        />
                    </template>
                </q-input>

                <div align="center">
                    <q-btn
                        label="RESET PASSWORD"
                        type="submit"
                        color="indigo-10" class="q-ml-sm"
                    />
                </div>
            </q-form>
        </q-card-section>
    </q-card>
</template>

<script>
import { postResetPassword, getValidateLinkKey } from '../references/url';

export default
{
    data: () =>
    ({
        form_data:
        {
            password: '',
            confirm_password: '',
        },
        isPwd: true,
        isCnfrmPwd: true,
        secureLength: 8,
        weak_indicator: '',
        medium_indicator: '',
        strong_indicator: '',
        text: 'text',
        text_content: ''
    }),
    computed: {
        confirmPasswordChange () {
            return [
                val => val === this.$refs.fldPassword.value || "Password didn't match"
            ]
        },
        validatePassword () {
            return [
                val => !!val || 'Password is required',
                val => val.length >= 8 || 'Min of 8 characters',
                val => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/.test(val) || 'Password must be 8+ chars long and contain lowercase & uppercase letter, special char and a number'
            ]
        }
    },
    beforeMount()
    {
        this.validateLinkKey();
    },
    methods:
    {
        async resetPassword()
        {
            this.$q.loading.show();
            let key = this.$route.params.key;
            let link = `${postResetPassword}/${key}`;
            let forgot_link_obj = await this.$_post(link, this.form_data);

            if (forgot_link_obj) {
                this.$router.push({name: 'documentation_reset_pass_success'});
            }

            this.$q.loading.hide();
        },

        async validateLinkKey()
        {
            let key = this.$route.params.key;

            let reset_obj = await this.$_get(`${getValidateLinkKey}/${key}`);

            if (reset_obj.data.status == 'error') {
                this.$router.push('/documentation');
            }
        },

        trigger() {
            const indicator = document.querySelector(".indicator");
            const input = document.querySelector("input");
            const weak = document.querySelector(".weak");
            const medium = document.querySelector(".medium");
            const strong = document.querySelector(".strong");
            const text = document.querySelector(".text");
            const showBtn = document.querySelector(".showBtn");
            let regExpWeak = /[a-z]/;
            let regExpMedium = /\d+/;
            let regExpStrong = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/;
            let no = 0;

            if (input.value != "") {
                indicator.style.display = "block";
                indicator.style.display = "flex";
                if (input.value.length <= 3 && (input.value.match(regExpWeak) || input.value.match(regExpMedium) || input.value.match(regExpStrong)))no=1;
                if (input.value.length >= 6 && ((input.value.match(regExpWeak) && input.value.match(regExpMedium)) || (input.value.match(regExpMedium) && input.value.match(regExpStrong)) || (input.value.match(regExpWeak) && input.value.match(regExpStrong))))no=2;
                if (input.value.length >= 8 && input.value.match(regExpWeak) && input.value.match(regExpMedium) && input.value.match(regExpStrong))no=3;

                if (no == 1) {
                    this.weak_indicator = 'weak active';
                    this.text = 'text text-block weak';
                    this.text_content = 'Your password is too weak';
                }

                if (no == 2) {
                    this.medium_indicator = 'medium active';
                    this.text = 'text text-block medium';
                    this.text_content = 'Your password is medium';
                } else {
                    this.medium_indicator = 'medium';
                }

                if (no == 3) {
                    this.weak_indicator = 'weak active';
                    this.medium_indicator = 'medium active';
                    this.strong_indicator = 'strong active';
                    this.text = 'text text-block strong';
                    this.text_content = 'Your password is strong';
                } else {
                    this.strong_indicator = 'strong';
                }
            }
        }
    }
}
</script>

<style>
    form .indicator{
        height: 10px;
        margin: 2% 10%;
        padding-left: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        display: none;
    }

    form .indicator span{
        position: relative;
        height: 100%;
        width: 100%;
        background: lightgrey;
        border-radius: 5px;
    }

    form .indicator span:nth-child(2){
        margin: 0 3px;
    }

    form .indicator span.active:before{
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        border-radius: 5px;
    }

    form .indicator span.weak:before {
        background-color: #ff4757;
    }

    form .indicator span.medium:before {
        background-color: orange;
    }

    form .indicator span.strong:before {
        background-color: #23ad5c;
    }

    form .text{
        font-size: 14px;
        font-weight: 500;
        display: none;
        margin: auto 10%;
        padding-left: 15px;
    }

    form .text-block {
        display: block;
    }

    form .text.weak{
        color: #ff4757;
    }

    form .text.medium{
        color: orange;
    }

    form .text.strong{
        color: #23ad5c;
    }
</style>