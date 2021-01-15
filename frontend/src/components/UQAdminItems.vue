<template>
    <div>
        <u-q-table :tbl_data="items_tbl">
            <template v-slot:table_rows="props">
                <!-- {{props.data}} -->
                <q-td key="seller_first_name" align="left">{{props.data.seller_first_name}}</q-td>
                <q-td key="seller_last_name" align="left">{{props.data.seller_last_name}}</q-td>
                <q-td key="item_name" align="left">{{ props.data.item_name}}</q-td>
                <q-td key="category" align="left">{{ props.data.category}}</q-td>
                <q-td key="created_at" align="center">{{moment(props.data.created_at).format('YYYY-MMM-DD').toUpperCase()}}</q-td>
                <q-td key="action" align="center">
                    <q-btn flat @click="viewDetails(props.data)" color="green-14">
                        <i class="fas fa-eye"></i>
                    </q-btn>
                </q-td>
            </template>
        </u-q-table>
        <u-q-modal :modal_data="item_details_modal" ref="item_details_modal">
            <template v-slot:body="props">
                <q-list bordered separator>
                    <q-item clickable v-ripple>
                        <q-item-section>
                            <q-item-label>NAME</q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{props.data.seller_first_name}} {{props.data.seller_last_name}}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section>
                            <q-item-label>CREATED AT</q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{moment(props.data.created_at).format('YYYY-MMM-DD').toUpperCase()}}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section>
                            <q-item-label>ITEM NAME</q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{props.data.item_name}}</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-item clickable v-ripple>
                        <q-item-section>
                            <q-item-label>CATEGORY</q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{props.data.category}}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section>
                            <q-item-label>SUB CATEGORY</q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{props.data.sub_category}}</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-item clickable v-ripple>
                        <q-item-section>
                            <q-item-label>DESCRIPTION</q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label v-html="props.data.description">
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section>
                            <q-item-label>STATUS</q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{props.data.status}}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section>
                            <q-item-label>PRICE</q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>
                                BRT {{props.data.price.BRT.$numberDecimal}}
                                USD {{props.data.price.USD.$numberDecimal}}
                                PHP {{props.data.price.PHP.$numberDecimal}}
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section>
                            <q-item-label>IMAGE</q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-img
                                v-for="(image, i) in props.data.item_image"
                                :key="i"
                                :src="`http://localhost:4000/public/normal_size/${image}`"
                                alt="id"
                                @click="zoomImage(`http://localhost:4000/public/normal_size/${image}`)"
                            />
                        </q-item-section>
                    </q-item>
                </q-list>
            </template>

            <template v-slot:footer="props">
                <div align="right">
                    <q-btn label="approve" color="primary" @click="confirmationItemStatus({_id: props.data._id, action: 'available'})" class="q-mr-sm" />
                    <q-btn label="reject" color="deep-orange" @click="confirmationItemStatus({_id: props.data._id, action: 'rejected'})" class="q-mr-sm" />
                    <q-btn label="close" color="orange" @click="closeModal('item_details_modal')" />
                </div>
            </template>
      </u-q-modal>
      <u-q-modal :modal_data="item_action_modal" ref="item_action_modal">
            <template v-slot:body="props">
                Are you sure you want this ITEM to be {{props.data.action}}?
            </template>
            <template v-slot:footer="props">
                <div align="right">
                    <q-btn label="yes" color="primary" @click="updateItemStatus({_id: props.data._id, action: props.data.action})" class="q-mr-sm" />
                    <q-btn label="no" color="deep-orange" @click="closeModal('item_action_modal')" class="q-mr-sm" />
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
import UQTable  from '../components/UQTable';
import UQModal  from '../components/UQModal';
import { postListItems, getItemByStatus, postUpdateItemStatus } from "../references/url";
export default {
  data () {
    return {
        moment: moment,
        item_details_modal: {
            data: {},
            title: 'Item Details'
        },
        item_action_modal: {
            title: 'Item Action',
            data: {
                _id: '',
                action: ''
            },
            style: 'width: 50vw;'
        },
        zoom_image_modal: {
            data: {
                src: '',
            },
            is_persistent: false
        },
        items_tbl: {
            title: 'Items',
            columns: [
                {
                    name    : 'seller_first_name',
                    label   : 'seller first name',
                    field   : 'seller_first_name',
                    align   : 'center',
                    sortable: true
                },
                {
                    name    : 'seller_last_name',
                    label   : 'seller last name',
                    field   : 'seller_last_name',
                    align   : 'center',
                    sortable: true
                },
                {
                    name    : 'item_name',
                    label   : 'item name',
                    field   : 'item_name',
                    align   : 'center',
                    sortable: true
                },
                {
                    name    : 'category',
                    label   : 'category',
                    field   : 'category',
                    align   : 'center',
                    sortable: true
                },
                {
                    name    : 'created_at',
                    label   : 'date created',
                    field   : 'updated_at',
                    align   : 'center',
                    sortable: true
                },
                {
                    name    : 'action',
                    label   : 'action',
                    field   : 'action',
                    align   : 'center',
                },
            ],
            data: []
        }
    }
  },
  components: {
    UQTable,
    UQModal
  },
  async mounted()
  {
      await this.fetchItemList();
  },
  methods: {
      async fetchItemList ()
      {
          let item = {
              status: "pending"
          }
          let items = await this.$_post(getItemByStatus, item);

          this.items_tbl.data = items.data;
      },
      async viewDetails (details)
      {
          this.item_details_modal.data = details;
          this.$refs['item_details_modal'].show();
      },
      async zoomImage (image_url)
      {
        this.zoom_image_modal.data.src = image_url;
        this.$refs['zoom_image_modal'].show();
      },
      async closeModal (modalRef)
      {
          this.$refs[modalRef].hide();
      },
      async confirmationItemStatus ({_id, action})
      {
        this.item_action_modal.data.action   = action;
        this.item_action_modal.data._id      = _id;
        this.$refs['item_action_modal'].show();
      },
      async updateItemStatus ({_id, action})
      {
          let item = {
              id: _id,
              status: action
          }


          this.$q.loading.show();

          let item_status = await this.$_post(postUpdateItemStatus, item);
          console.log(item_status);
          if(item_status)
          {
              this.$q.dialog({ title: `Success Message`, message: "Successfully Updated" });
          }
          this.$q.loading.hide();

          this.$refs['item_details_modal'].hide();
          this.$refs['item_action_modal'].hide();

          await this.fetchItemList();
      }
  }
}
</script>