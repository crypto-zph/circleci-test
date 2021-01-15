<template>
      <q-dialog v-model="dialog" :position="position" seamless>
             <q-card style="border-radius: 50px 0 0 50px; background: white">
               <q-btn flat icon="fas fa-chevron-right" v-close-popup style="color: black" />
                 </q-card>
                 <q-card style="width: 550px; height: auto">
                    <u-q-message v-bind:id="d"></u-q-message>
                   </q-card>
           </q-dialog>
           <!-- {{$props.id}} -->
</template>

<script>
import UQMessage from "../../pages/Front/components/UQMessage"
import global_mixins from "../../mixins/global_mixins"
export default {
    components: {
        UQMessage
    },
    props: {
    id: String
    },
    data() {
    return {
      right: false,
      dialog: false,
      position: 'right',
      d: '',
    };
  },
   mounted()
   {
    //  alert(d)
   },

   methods: {
    open (position) {
      this.position = position;
      this.dialog = true;
      this.d = this.$props.id;
    }
  }
}
</script>