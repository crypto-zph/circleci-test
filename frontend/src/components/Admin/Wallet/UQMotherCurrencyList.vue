<template>
    <div>
        <div class='content font-monseratt'>

        <div class="crypto_box col-md-4 col-12 text-center q-pb-sm q-pt-md q-mx-xs">
            <div style="font-size: 18px; font-weight: 500" color="text-grey-7">
                {{ currency_name }} Wallet
            </div>

            <!-- <div style="font-size: 25px; color: black;" class="q-py-lg text-bold" :class="!$q.dark.isActive? '':'text-white'"> -->
            <div class="q-py-lg">
                <div style="font-size: 25px; color: black;" class="text-bold">
                    <!-- Balance -->
                    {{ 
                        (currentBalance / 10 ** decimal_places).toLocaleString('en-US', {
                            maximumFractionDigits: decimal_places
                        }) 
                    }}

                    <!-- Selected Currency -->
                    <span style="font-size: 25px">{{ currency_abbreviation }}</span>
                </div> 

                <!-- Conversion Rate -->
                <div>
                    <span>
                        <strong>$</strong>
                        <span style="font-weight: 500; letter-spacing: 1px"> {{ 
                            (res.conversion.rates[currency_abbreviation] * (currentBalance / 10 ** decimal_places)).toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }) 
                        }}
                        </span>
                    </span>
                </div>
            </div>

             <div class="row q-mb-md wallet_titleOnDesktop" style="margin-left: 25px; margin-right: 25px">
                    <div v-for="(wallet, index) in wallet_arr" :key="index" class="col" >
                        <q-btn 
                            @click="getSelectedCurrency(
                                wallet.public_key,
                                wallet.currency_name,
                                wallet.currency_abbreviation,
                                wallet.decimal_places,
                                wallet.balance,
                                index
                            )"
                            :class="index == indexNum ? 'active-wallet-mobile' : '' "
                            class="text-bold full-width"
                            flat
                        >
                            <div> 
                                {{ wallet.currency_abbreviation }}
                            </div>
                        </q-btn>
                    </div>
                </div>

            <!-- Receive / Send Button -->
            <div class="row q-col-gutter-md justify-center">
                <div class="col-5">
                    <q-btn style="border-radius: 10px" outline @click="is_show_receive = true" class="full-width" label="Receive" color="secondary" />
                </div>
                <div class="col-5">
                    <q-btn style="border-radius: 10px" outline @click="is_show_send = true" class="full-width" label="Send" color="secondary" />
                </div>
            </div>
        </div>

        <!-- List of Crypto Currency -->
        <div class="col-md-4 col-12 q-mt-lg">
            <div class="q-py-md text-center q-px-lg text-bold wallet_titleOnMobile" style="font-size: 17px" :class="!$q.dark.isActive? 'text-grey-9':'text-white'">
                ALL WALLETS
            </div>
            <div class="q-mx-md wallet_titleOnMobile" :class="!$q.dark.isActive? '':'bg-white'">
                <q-separator />
            </div>
            <div class="q-mx-xs">
                <div v-for="(wallet, index) in wallet_arr" :key="index" class="wallet_titleOnMobile">
                    <div
                        @click="getSelectedCurrency(
                            wallet.public_key,
                            wallet.currency_name,
                            wallet.currency_abbreviation,
                            wallet.decimal_places,
                            wallet.balance,
                            index
                        )"
                        :class="index == indexNum ? 'active-wallet' : '' "
                        class="row q-py-md q-px-md text-bold" style="cursor: pointer"
                    >
                        <div class="col-6"> 
                            {{ wallet.currency_abbreviation }}
                        </div>

                        <div class="col-6 text-right">
                            {{ 
                            (wallet.balance / 10 ** wallet.decimal_places).toLocaleString('en-US', {
                                maximumFractionDigits: wallet.decimal_places }) 
                            }}
                        </div>
                    </div>
                </div>

               
            </div>
        </div>

        <!-- Receive Dialog -->
        <q-dialog v-model="is_show_receive" persistent>
            <q-card style="width: 450px; border-radius: 20px">
                <!-- Currency Name and Close Button -->
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">{{ selected_currency.currency_name }}</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>

                <!-- UQMotherReceive Component -->
                <q-card-section class="q-pt-none">
                    <u-q-mother-receive
                        :selected_currency="selected_currency"
                    >
                    </u-q-mother-receive>
                </q-card-section>
            </q-card>
        </q-dialog>

        <!-- Send Dialog -->
        <q-dialog v-model="is_show_send" persistent>
            <q-card style="width: 450px; border-radius: 20px">
                <!-- UQMotherSend Component -->
                <q-card-section class="q-pt-none">
                    <u-q-mother-send
                        :res="res"
                        :selected_currency="selected_currency"
                        @sent="handleSent"
                    >
                    </u-q-mother-send>
                </q-card-section>
            </q-card>
        </q-dialog>

        </div>
    </div>
</template>

<script>
import { postMotherWalletHistory } from '../../../references/url';
import UQMotherSend from './UQMotherSend';
import UQMotherReceive from './UQMotherReceive';
// import io from "socket.io-client";

export default
{
    props: ['res', 'mother_index'],

    components: 
    { 
        UQMotherSend,
        UQMotherReceive,
    },

    data() {
       return {
            skip: 0,
            is_show_send: false,
            is_show_send_lexicoin: false,
            is_show_receive: false,
            public_key: '',
            currency_name: '',
            currency_abbreviation: '',
            decimal_places: 0,
            balance: 0,
            indexNum: 0,
            selected_currency: {},
            wallet_arr: null,
        }
    },

    async mounted()
    {
        // await this.socketInit();
        this.indexNum = this.mother_index;
        await this.getWalletList();
        await this.defaultCurrency();
        await this.getSelectedCurrency(this.public_key, this.currency_name, this.currency_abbreviation, this.decimal_places, this.balance, this.indexNum);
    },

    computed:
    {
        currentBalance()
        {
            if(this.wallet_arr) {
                return this.wallet_arr[this.indexNum].balance;
            }
            else {
                return 0;
            }
        }
    },

    methods:
    {
        async handleSent()
        {
            this.is_show_send = false;
            this.$emit('sent', this.indexNum);
        },

        async getWalletList()
        {
            this.wallet_arr = this.res.user_info.wallet;
        },

        async defaultCurrency()
        {
            this.public_key             = this.wallet_arr[this.mother_index].public_key;
            this.currency_name          = this.wallet_arr[this.mother_index].currency_name;
            this.currency_abbreviation  = this.wallet_arr[this.mother_index].currency_abbreviation;
            this.decimal_places         = this.wallet_arr[this.mother_index].decimal_places;
            this.balance                = this.wallet_arr[this.mother_index].balance;
        },

        async getSelectedCurrency(public_key, name, abbreviation, decimal, balance, index) {
            this.currency_name          = name;
            this.currency_abbreviation  = abbreviation;
            this.decimal_places         = decimal;
            this.balance                = balance;
            this.indexNum               = index;

            let selected_currency_obj = {
                public_key:             public_key,
                currency_name:          name,
                currency_abbreviation:  abbreviation,
                decimal_places:         decimal,
                balance:                balance,
                index:                  index
            }

            this.selected_currency = selected_currency_obj;
            
            // get initial history array
            let history_arr = await this.currencyHistory(0, abbreviation);
            
            // pass data in parent component => UQMotherWallet.vue
            this.$emit('success', { selected_currency_obj, history_arr });
        },

        async currencyHistory(num, abbreviation)
        {
            let history = [];

            this.skip = this.skip + num;

            let query_inputs = {
                skip: this.skip,
                currency_abbreviation: abbreviation
            }

            let res = await this.$_post(postMotherWalletHistory, query_inputs);
            history = res.data.data;

            return history;
        },

        // async socketInit()
        // {
        //     this.socket = io('http://localhost:4000');
        //     this.socket.on('connect', () => 
        //     {
        //       console.log(' client--- Connected to the server --- crypto');
        //     });   
        //     this.socket.on('update_motherwallet', async (data) => 
        //     {
        //         if(this.$user_info._id == data.user_id)
        //         {
        //             this.wallet_arr.find(x => x.currency_abbreviation === data.currency_abbreviation).balance = data.balance;
        //         }
        //     });
        // },

    }
}
</script>

<style>
.wallets_list {
    transition: 0.5s;
    border-radius: 5px;
}
.active-wallet{
    color: #9A67AC;
}
.active-wallet-mobile{
    color: #9A67AC;
    background: #cfcfcf;
}
.wallets__container {
    background: #d6d6d6;
    border-radius: 30px;
}
@media (max-width: 700px) {
    .wallet_titleOnMobile {
        display: none
    }
}
@media (min-width: 700px) {
    .wallet_titleOnDesktop {
        display: none
    }
}
</style>