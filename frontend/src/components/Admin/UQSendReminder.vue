=========================================
Title: Admin Send Reminder
Design Author: Andrea Lyn Destajo
Date: December
Contributor:
=========================================
<template>
    <div style="padding: 50px 150px">
        <div class="q-pa-md bg-white" style="border-radius: 15px">
        <q-form enctype="multipart/form-data"  @submit="submitReminder()">
            <q-list>
            <q-item>
                <q-item-section>
                  {{reminder_details.receiver}}
                    <q-select
                        dense
                        outlined
                        placeholder="To"
                        v-model="reminder_details.receiver"
                        use-input
                        use-chips
                        multiple
                        input-debounce="0"
                        @new-value="createValue"
                        :options="filterOptions"
                        @filter="filterFn"
                        class="bg-white"
                    />
                </q-item-section>
            </q-item>

            <q-item>
                <q-item-section>
                <q-input
                    dense
                    outlined
                    v-model="reminder_details.subject"
                    placeholder="Subject"
                    required
                    class="bg-white"
                />
                </q-item-section>
            </q-item>

            <q-item>
                <q-item-section>
                    <q-editor
                    class="full-width"
                    v-model="qeditor"
                    placeholder="Message"
                    :dense="$q.screen.lt.md"
                    :toolbar="[
                        [
                        {
                            label: $q.lang.editor.align,
                            icon: $q.iconSet.editor.align,
                            fixedLabel: true,
                            options: ['left', 'center', 'right', 'justify']
                        }
                        ],
                        ['bold', 'italic', 'strike', 'underline'],
                        ['token', 'hr', 'link', 'custom_btn'],
                        ['print', 'fullscreen'],
                        [
                        {
                            label: $q.lang.editor.formatting,
                            icon: $q.iconSet.editor.formatting,
                            list: 'no-icons',
                            options: [
                            'p',
                            'h1',
                            'h2',
                            'h3',
                            'h4',
                            'h5',
                            'h6',
                            'code'
                            ]
                        },
                        {
                            label: $q.lang.editor.fontSize,
                            icon: $q.iconSet.editor.fontSize,
                            fixedLabel: true,
                            fixedIcon: true,
                            list: 'no-icons',
                            options: [
                            'size-1',
                            'size-2',
                            'size-3',
                            'size-4',
                            'size-5',
                            'size-6',
                            'size-7'
                            ]
                        },
                        {
                            label: $q.lang.editor.defaultFont,
                            icon: $q.iconSet.editor.font,
                            fixedIcon: true,
                            list: 'no-icons',
                        },
                        ],

                    ]"
                    :fonts="{
                        arial: 'Arial',
                        arial_black: 'Arial Black',
                        comic_sans: 'Comic Sans MS',
                        courier_new: 'Courier New',
                        impact: 'Impact',
                        lucida_grande: 'Lucida Grande',
                        times_new_roman: 'Times New Roman',
                        verdana: 'Verdana'
                    }"
                  />
                </q-item-section>
            </q-item>
            </q-list>

            <q-card-actions align="center">

            <q-btn
                label="Send"
                type="submit"
                color="primary"
                class="q-px-xl q-py-xs"
            />
            </q-card-actions>
        </q-form>
    </div>
    </div>
</template>

<script>
import { createNotification , postUserMasterlist } from '../../references/url';
import Swal from 'sweetalert2';

const stringOptions = ['All Users']

export default {
    data(){
        return{
            qeditor: '',
            reminder_details : {},
            model: null,

            filterOptions: stringOptions,
            user_list: [],
            custom_users:[],
            admin_info:{}
        } 
    },
async mounted() {

    let auth         = await this.$_isAdminUserAuthenticated();
    this.admin_info  = auth.data.user;   

    await this.getUsers();
    console.log('admin details',auth.data.user);
},

  methods: {
    createValue (val, done) {

      if (val.length > 0) {
        const model = (this.model || []).slice()

        val
          .split(/[,;|]+/)
          .map(v => v.trim())
          .filter(v => v.length > 0)
          .forEach(v => {
            if (stringOptions.includes(v) === false) {
              stringOptions.push(v)
            }
            if (model.includes(v) === false) {
              model.push(v)
            }
          })

        done(null)
        this.model = model
      }
    },

    filterFn (val, update) {
      update(() => {
        if (val === '') {
          this.filterOptions = stringOptions
        }
        else {
          const needle = val.toLowerCase()
          this.filterOptions = stringOptions.filter(
            v => v.toLowerCase().indexOf(needle) > -1
          )
        }
      })
    },

    async reset()
    {
      this.reminder_details.receiver = [];
      this.reminder_details.user_id  = [];
      this.reminder_details.subject  = '';
      this.reminder_details.message  = '';
      this.custom_users              = [];
      this.qeditor                   = '';
    },

    async submitReminder(){

        if(this.reminder_details.receiver != 'All Users')
        {
          for(let email of this.reminder_details.receiver)
          {
            for(let user of this.user_list)
            {
             if(email == user.email)
              {
                  this.custom_users.push(user._id);
              }
            }
              
          }
           this.reminder_details.user_id = this.custom_users;
        }
        else
        {
          this.reminder_details.user_id = 'All Users';
        }

        this.reminder_details.message = this.qeditor;
        this.reminder_details.identification_id = this.admin_info._id;
        console.log(this.reminder_details)
        let result = await this.$_post(createNotification, this.reminder_details);
        
        if(result.status == 200){
            Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Sent',
            confirmButtonColor: '#2f4c7e',
            })
            this.reset();
        }

    },

      async getUsers()
      {
        let result = await this.$_post(postUserMasterlist);
        this.user_list  = result.data.data;

        for(let user of this.user_list)
        {
            stringOptions.push(user.email)
        }
      },
  }
}
</script>
