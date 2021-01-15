<template>
  <div>
      
    <!-- {{kyc_submits_tbl}} -->
      <u-q-table 
          :tbl_data="kyc_submits_tbl.data"
          :tbl_columns="kyc_submits_tbl.columns"
          :pgntn_is_show="false"
          :tbl_title="kyc_submits_tbl.title"
    >
            <template v-slot:table_rows="props">
                <!-- {{props.data !== undefined}} -->
                <q-td key="updated_at" align="center">{{ props.data.updated_at  ? moment(props.data.updated_at).format('YYYY-MMM-DD').toUpperCase() : ''}}</q-td>
                <q-td key="first_name" align="left">{{props.data.first_name     ? props.data.first_name.toUpperCase() : ''}}</q-td>
                <q-td key="middle_name" align="left">{{props.data.middle_name   ? props.data.middle_name.toUpperCase() : ''}}</q-td>
                <q-td key="last_name" align="left">{{props.data.last_name       ? props.data.last_name.toUpperCase() : ''}}</q-td>
                <q-td key="action" align="center">
                <q-btn flat @click="viewDetails(props.data)" color="green-14">
                    <i class="fas fa-eye"></i>
                </q-btn>
                </q-td>
            </template>
        </u-q-table>
        <u-q-modal :modal_data="kyc_details_modal" ref="kyc_details_modal">
            <template v-slot:body="props">
                <q-list bordered separator>
                    <q-item clickable v-ripple>
                        <q-item-section>
                            <q-item-label>NAME</q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{props.data.first_name.toUpperCase() }} {{props.data.middle_name.toUpperCase() }} {{props.data.last_name.toUpperCase() }}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section>
                            <q-item-label>BIRTHDATE</q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{moment(props.data.birth_date).format('YYYY-MMM-DD').toUpperCase()}}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section>
                            <q-item-label>CONTACT NO.</q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{props.data.contact_code}} {{props.data.contact_number}}</q-item-label>
                        </q-item-section>
                    </q-item>
                    
                    <q-item clickable v-ripple>
                        <q-item-section>
                            <q-item-label>EMAIL</q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{props.data.email.toUpperCase() }}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section>
                            <q-item-label>NATIONALITY</q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{props.data.nationality.toUpperCase() }}</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-item clickable v-ripple>
                        <q-item-section>
                            <q-item-label>ADDRESS</q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>
                                {{props.data.house_number}} 
                                {{props.data.street.toUpperCase() }} 
                                {{props.data.city.toUpperCase() }} 
                                {{props.data.zip_code}}, 
                                {{props.data.country.toUpperCase() }}
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section>
                            <q-item-label>ID TYPE</q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{props.data.identification_card.toUpperCase() }}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section>
                            <q-item-label>ID NO.</q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{props.data.id_number }}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section>
                            <q-item-label>ID EXPIRY</q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{props.data.id_has_expiry == true ? moment(props.data.id_expiry).format('YYYY-MMM-DD').toUpperCase() : 'no expiry'.toUpperCase()}}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section>
                            <q-item-label>ID IMAGE</q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-img 
                                :src="`${server.IMAGE_URL}/${props.data._id}/images/${props.data.id_image}`" 
                                alt="id"
                                @click="zoomImage(`${server.IMAGE_URL}/${props.data._id}/images/${props.data.id_image}`)"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section>
                            <q-item-label>SELFIE IMAGE</q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-img 
                                :src="`${server.IMAGE_URL}/${props.data._id}/images/${props.data.selfie_image}`" alt="selfie"
                               @click="zoomImage(`${server.IMAGE_URL}/${props.data._id}/images/${props.data.selfie_image}`)"
                            />
                        </q-item-section>
                    </q-item>
                </q-list>
            </template>
            
            <template v-slot:footer="props">
                <div class="row">
                <div align="left" class="col-5">
                    <q-btn style="border-radius: 10px" label="close" class="q-pa-xs" color="orange" @click="closeModal('kyc_details_modal')" />
                </div>
                <div align="right" class="col-7">
                    <div class="row q-col-gutter-md">
                        <div class="col-6">
                            <q-btn style="border-radius: 10px" label="approve" color="secondary" @click="confirmationKycStatus({_id: props.data._id, action: 'approve'})" class="q-pa-xs" />
                        </div>
                        <div class="col-6">
                            <q-btn style="border-radius: 10px" label="reject" color="red" @click="confirmationKycStatus({_id: props.data._id, action: 'reject'})" class="q-pa-xs" />
                        </div>
                    </div>
                </div>
            </div>
            </template>
      </u-q-modal>
      <u-q-modal :modal_data="kyc_action_modal" ref="kyc_action_modal">
            <template v-slot:body="props">
                <div class="font-rubik-title q-pb-sm">
                    Are you sure you want to {{props.data.action}} this KYC?
                </div>
                <div v-if="props.data.remarks[props.data.action].length != 0">
                    <q-select
                        borderless
                        label="remarks"
                        class="q-px-md"
                        style="border-radius: 10px; border: 1px solid #9A67AC"
                        color="secondary"
                        v-model="kyc_action_modal.selected_remarks"
                        :options="props.data.remarks[props.data.action]"
                        behaviour="menu"
                    />
                    <div v-if="kyc_action_modal.selected_remarks == '(Others)'">
                        <textarea v-model="kyc_action_modal.other_remarks" style="width: 100%; height: 20vh;"></textarea>
                    </div>
                    <div ref="error_remarks" style="color:red;">
                        
                    </div>
                </div>
            </template>
            <template v-slot:footer="props">
                <div align="right">
                    <q-btn label="yes" color="secondary" @click="updateKycStatus({_id: props.data._id, action: props.data.action})" class="q-mr-sm q-pa-xs" style="border-radius: 10px; width: 80px" />
                    <q-btn label="no" color="red" @click="closeModal('kyc_action_modal')" class="q-mr-sm q-pa-xs" style="border-radius: 10px; width: 80px" />
                </div>
            </template>
      </u-q-modal>
      <u-q-modal :modal_data="zoom_image_modal" ref="zoom_image_modal">
            <template v-slot:body="props">
                <img  :src="props.data.src" />
            </template>
      </u-q-modal>
  </div>
</template>

<script>
import moment   from 'moment';
import config   from '../../config';
import UQTable  from '../components/TableAndModal/UQTable';
import UQModal  from '../components/UQModal';
import { postFetchKycByStatus, putUpdateKycStatus } from '../references/url';
import kyc_rejected_remarks from '../references/kyc_rejected_remarks';

export default {
    components: {
        UQTable,
        UQModal
    },
    name: 'UQKycSubmits',
    data: () => ({
        moment: moment,
        config: config,
        server: {
            IMAGE_URL: config.IMAGE_URL
        },
        kyc_details_modal: {
            data: {},
            title: 'KYC Details'
        },
        kyc_action_modal: {
            title: 'KYC Action',
            data: {
                action  : '',
                _id     : '',
                remarks : {
                    approve : [],
                    reject  : kyc_rejected_remarks
                },
            },
            style: 'width: 50vw;',
            selected_remarks: '',
            other_remarks   : ''
        },
        zoom_image_modal: {
            data: {    
                src: '',
            },
            is_persistent: false
        },
        kyc_submits_tbl: {
            title: 'KYC Submits',
            columns: [
                { 
                    name    : 'updated_at', 
                    label   : 'date created', 
                    field   : 'updated_at',
                    align   : 'left',
                    sortable: true 
                },
                { 
                    name    : 'first_name', 
                    label   : 'firstname', 
                    field   : 'first_name',
                    align   : 'left',
                    sortable: true 
                },
                { 
                    name    : 'middle_name', 
                    label   : 'middlename', 
                    field   : 'middle_name', 
                    align   : 'left',
                    sortable: true 
                },
                { 
                    name    : 'last_name', 
                    label   : 'lastname', 
                    field   : 'last_name', 
                    align   : 'left',
                    sortable: true 
                },
                { 
                    name    : 'action', 
                    label   : 'action', 
                    field   : 'action', 
                    align   : 'left',
                },
            ],
            data: []
        }
    }),
    async mounted()
    {
        await this.fetchKycByStatus()
    },
    methods: {
        async fetchKycByStatus(status = 'submitted')
        {
            this.$q.loading.show();
            const kyc_res_obj = await this.$_post(postFetchKycByStatus, {
                status
            });
            this.$q.loading.hide();

            this.kyc_submits_tbl.data = kyc_res_obj.data.kyc;
            console.log('kyc_res_obj.data.kyc')
            console.log(kyc_res_obj.data.kyc)
        },

        async viewDetails(details)
        {
            this.kyc_details_modal.data = details;
            this.$refs['kyc_details_modal'].show();
        },

        async closeModal(modalRef)
        {
            this.$refs[modalRef].hide();
        },

        async zoomImage(image_url)
        {
            this.zoom_image_modal.data.src = image_url;
            this.$refs['zoom_image_modal'].show();
        },

        async confirmationKycStatus({_id, action})
        {
            this.kyc_action_modal.data.action   = action;
            this.kyc_action_modal.data._id      = _id;
            this.$refs['kyc_action_modal'].show();
        },

        async updateKycStatus({_id, action})
        {
            console.log({_id, action})
            let errors = [];
            let remarks = '';

            if(action == 'reject')
            {
                if(this.kyc_action_modal.selected_remarks == '')
                {
                    this.$refs['error_remarks'].innerHTML = '*remarks must not be empty';
                    errors.push('*remarks must not be empty');
                    return;
                }

                if(this.kyc_action_modal.selected_remarks == '(Others)' && this.kyc_action_modal.other_remarks == '')
                {
                    this.$refs['error_remarks'].innerHTML = '*please specify your own remarks';
                    errors.push('*please specify your own remarks');
                    return;
                }

                if(errors.length == 0)
                {
                    remarks = this.kyc_action_modal.selected_remarks == '(Others)' ? this.kyc_action_modal.other_remarks : this.kyc_action_modal.selected_remarks
                }
            }

            this.$q.loading.show();
            const kyc_res_obj = await this.$_put(putUpdateKycStatus, {
                _id,
                kyc_status: action,
                remarks
            })
            this.$q.loading.hide();
            this.$refs['kyc_details_modal'].hide();
            this.$refs['kyc_action_modal'].hide();

            await this.fetchKycByStatus()
        }
    },
    filters: {
        toUpperCase(val)
        {
            return val.toUpperCase();
        }
    }
}
</script>

<style scoped>
</style>