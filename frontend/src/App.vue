<template>
  <div id="q-app" class="font-rubik-labels">
    <router-view />
    <confirmation-cancel></confirmation-cancel>
  </div>
</template>

<script>
import ConfirmationCancel from 'components/PopupMessages/ConfirmationCancel';
import { getInfo, postUpdateUserOnlineStatus } from "./references/url";
import moment from "moment";
import io from 'socket.io-client';

export default {
  name: "App",
  components: {
    ConfirmationCancel,
  },
  data: () => ({
    socket: {},
  }),
  async mounted()
	{
    await this.getInfo();
    // await this.btcWebsocket();
	},
  methods:
  {
    async getInfo()
    {
      let user_info = await this.$_post(getInfo);
      if(user_info)
      {
        this.$store.commit('user/updateUser', user_info.data);
      }
    },

    // async btcWebsocket()
    // {
    //   const ws_btc = new WebSocket("wss://testnet-ws.smartbit.com.au/v1/blockchain");
    //   const btc_address = this.$static_user_info.wallet.find(x => x.currency_abbreviation == 'BTC').public_key;

    //   ws_btc.onopen = () => 
    //   {
    //     ws_btc.send(JSON.stringify({ type: "address", address: btc_address }))
    //   }

    //   ws_btc.onmessage = async (evt) => {
    //     let response = {};
    //     let received_msg = evt.data;
    //     response = JSON.parse(received_msg);

    //     console.log('APP.VUE', response)
    //   }
    // },

  },
  watch:
    {
        async '$q.appVisible' (state)
        {
            if (this.$static_user_info != null) {
                // let date = new Date();
                // date = moment(date.now).unix();
                let date = Date.now();
                // alert(date)
                let event =
                {
                  timestamp: 0,
                  status: 'active'
                };

                if (!state) {
                  event.timestamp = date;
                  event.status = 'inactive'

                  await this.$_post(postUpdateUserOnlineStatus, event);
                  // this.socket.emit('is_online', { status: event.status, timestamp: event.timestamp });
                } else {
                  event.timestamp = 0;
                  event.status = 'active'

                  await this.$_post(postUpdateUserOnlineStatus, event);
                  // this.socket.emit('is_online', { status: event.status, timestamp: event.timestamp });
                }
            }
        }
    },
    created () {
    let isDarkMode = this.$q.localStorage.has('isDarkMode')
    let value = this.$q.localStorage.getItem('isDarkMode')
    if(isDarkMode){
      this.$q.dark.set(value)
    } else {
      this.$q.dark.set(false)
    }
    
  }
};
</script>
