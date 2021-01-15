=========================================
Title: Manage User
Design Author: Andrea Lyn Destajo
Date: 16-18 Nov 2020
Contributor:
=========================================
<template>
  <q-page class="q-pa-sm">
    <div>
    <q-card>
      <q-table
        title="Announcement"
        :data="announcement_list"
        :hide-header="mode === 'grid'"
        :columns="columns"
        row-key="name"
        :grid="mode=='grid'"
        :filter="filter"
        :pagination.sync="pagination"
      >
        <template v-slot:top-right="props">
          <q-btn @click="new_annoucement_dialog=true" outline color="primary" label="Add New" class="q-mr-xs"/>
          <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>

          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            v-if="mode === 'list'"
          >
            <q-tooltip
              :disable="$q.platform.is.mobile"
              v-close-popup
            >{{props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen'}}
            </q-tooltip>
          </q-btn>

          <q-btn
            flat
            round
            dense
            :icon="mode === 'grid' ? 'list' : 'grid_on'"
            @click="mode = mode === 'grid' ? 'list' : 'grid'; separator = mode === 'grid' ? 'none' : 'horizontal'"
            v-if="!props.inFullscreen"
          >
            <q-tooltip
              :disable="$q.platform.is.mobile"
              v-close-popup
            >{{mode==='grid' ? 'List' : 'Grid'}}
            </q-tooltip>
          </q-btn>

          <q-btn
            color="primary"
            icon-right="archive"
            label="Export to csv"
            no-caps
            @click="exportTable"
          />
        </template>
        <template v-slot:body-cell-image="props">
          <q-td :props="props">
                <img style="width: 50px; height: 50px;"
                  v-for="(image , index) in props.row.item_image" :key="index" 
                  :src="`http://localhost:4000/announcement-imgs/${props.row.item_image[index]}`" 
                /> 
          </q-td>
        </template>
        <template v-slot:body-cell-is_publish="props">
          <q-td :props="props">
            <q-chip v-if="props.row.is_publish == true"
              :color="(props.row.is_publish == true)?'green':(props.row.is_publish == false?'red':'grey')"
              text-color="white"
              dense
              class="text-weight-bolder"
              square
              style="width: 85px"
            >Published
            </q-chip>
            <q-chip v-else
              :color="(props.row.is_publish == true)?'green':(props.row.is_publish == false?'red':'grey')"
              text-color="white"
              dense
              class="text-weight-bolder"
              square
              style="width: 85px"
            >Unpublished
            </q-chip>
          </q-td>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <div class="q-gutter-sm">
              <q-btn dense @click="updateAnnouncement(props.row)" color="primary" icon="edit"/>
              <q-btn dense @click="removeAnnouncement(props.row)" color="red" icon="delete"/>
            </div>
          </q-td>
        </template>
      </q-table>
    </q-card>

<!-- ========================== -->
      <div  class="q-pa-sm" v-for="list in publish_announcement_list" :key="list.id">
        <q-card>        
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar2.jpg">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{list.title}}</q-item-label>
              <q-item-label caption>{{moment(list.date_created).format('DD-MMM-YYYY HH:mm')}}</q-item-label>
            </q-item-section>
          </q-item>
            <img 
                v-for="(image, index) in list.item_image"
                :key="index"
                :src="`http://localhost:4000/announcement-imgs/${list.item_image[index]}`" 
            >
          <q-item>
            <q-card-section>
              <!-- <div class="text-overline text-orange-9">Overline</div> -->
              <div class="text-h5 q-mt-sm q-mb-xs">{{list.title}}</div>
              <div class="text-caption text-grey">
                {{list.description}}
              </div>
            </q-card-section>   
          </q-item>

          <q-item>
            <q-card-actions>
              <q-btn flat color="dark" label="Share" />
            </q-card-actions>   
          </q-item>
        </q-card>
      </div>
      
<!-- ===========Add Announcement Dialog================= -->
      <q-dialog v-model="new_annoucement_dialog">
        <q-card style="width: 650px; max-width: 60vw;">
          <q-card-section>
            <div class="text-h6">ANNOUNCEMENT</div>
          </q-card-section>

          <q-separator inset></q-separator>

          <q-card-section>
            <q-form enctype="multipart/form-data"  @submit="submitAnnouncement()">
              <q-list>
                <q-item>
                  <q-item-section>
                    <q-item-label class="q-pb-xs">Title</q-item-label>
                    <q-input
                      dense
                      outlined
                      v-model="add_announcement.title"
                      label="Title"
                      required
                    />
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="q-pb-xs">Description</q-item-label>
                      <q-input
                        v-model="add_announcement.description"
                        dense
                        outlined
                        autogrow
                        label="Description"
                        required
                      />
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label class="q-pb-xs">Image</q-item-label>
                      <q-uploader
                        square
                        flat
                        bordered
                        multiple
                        style="width: 100%"
                        v-model="add_announcement.image"
                        accept=".jpg, image/*"
                        max-file-size="1000000"
                        max-files="5"
                        @added="onFileChange"
                        @rejected="onRejected"  
                      />
                  </q-item-section>
                </q-item>

                <q-item tag="label" v-ripple>
                  <q-item-section avatar>
                    <q-radio v-model="add_announcement.custom_setting" val="Public" color="orange" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Public</q-item-label>
                    <q-item-label caption>Anyone can see the announcement</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item tag="label" v-ripple>
                  <q-item-section avatar>
                    <q-radio @input="setCustomViews()" v-model="add_announcement.custom_setting" val="Custom" color="orange" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Custom</q-item-label>
                    <q-item-label caption>Choose who can see the announcement </q-item-label>
                  </q-item-section>
                </q-item> 

                <q-item >
                  <q-item-section>
                    <q-item-label>{{(add_announcement.is_publish == true)?'Published':(add_announcement.is_publish == false?'Unpublished':'Unpublished')}}</q-item-label>
                    <q-item-label caption>Publish Announcement</q-item-label>
                  </q-item-section>
                  <q-item-section avatar>
                    <q-toggle color="green" v-model="add_announcement.is_publish" val= true />
                  </q-item-section>
                </q-item>

              </q-list>


              <q-card-actions align="right">

               <q-btn
                  label="Clear"
                  @click="reset()"
                  color="primary"
                />

                <q-btn
                  label="Create"
                  type="submit"
                  color="primary"
                />
              </q-card-actions>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
<!-- ======End of Add Announcement =============== -->

<!-- ===========Announcement Details Dialog================= -->
      <q-dialog v-model="announcement_details_dialog">
        <q-card class="my-card" flat bordered>
          <q-card-section>
            <div class="text-h6">
              Announcement Details
              <q-btn @click="change_pic=false" round flat dense icon="close" class="float-right" color="grey-8" v-close-popup></q-btn>
            </div>
          </q-card-section>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-overline">
                {{ moment(announcement.date_created).format('DD-MMM-YYYY HH:mm') }}           
                </div>
              <div class="text-h5 q-mt-sm q-mb-xs">
                <q-input borderless v-model="announcement.title" label="Title" >
                  <template v-slot:append>
                    <q-icon size="15px" round name="fas fa-pen" />
                  </template>
                </q-input>
                </div>
              <div class="text-caption text-grey">
                     <q-input
                        v-model="announcement.description"
                        borderless
                        autogrow
                        label="Description"
                      >
                       <template v-slot:append>
                          <q-icon size="15px" round name="fas fa-pen" />
                        </template>
                     </q-input>
              </div>
            </q-card-section>
            <q-card-section class="col-5" v-if="change_pic == false && announcement.item_image != ''">

              <q-img
                @dblclick="change_pic = true"
                class="rounded-borders"
                  v-for="(image , index) in announcement.item_image" :key="index" 
                  :src="`http://localhost:4000/announcement-imgs/${announcement.item_image[index]}`"                 
              />

            </q-card-section>

            <q-card-section v-if="change_pic == true || announcement.item_image == ''"  class="col-5"  >

              <q-uploader
                square
                flat
                bordered
                multiple
                style="width: 100%"
                v-model="announcement.image"
                accept=".jpg, image/*"
                max-file-size="1000000"
                max-files="5"
                @added="onUpdateFileChange"
                @rejected="onRejected"  
              />

            </q-card-section>
          </q-card-section>

              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio v-model="announcement.custom_setting" val="Public" color="orange" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Public</q-item-label>
                  <q-item-label caption>Anyone can see the announcement</q-item-label>
                </q-item-section>
              </q-item>

              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio @input="setCustomViews()" v-model="announcement.custom_setting" val="Custom" color="orange" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Custom</q-item-label>
                  <q-item-label caption>Choose who can see the announcement </q-item-label>
                </q-item-section>
              </q-item> 

              <q-item >
                <q-item-section>
                  <q-item-label>{{(announcement.is_publish == true)?'Published':(announcement.is_publish == false?'Unpublished':'Unpublished')}}</q-item-label>
                  <q-item-label caption>Publish Announcement</q-item-label>
                </q-item-section>
                <q-item-section avatar>
                  <q-toggle color="green" v-model="announcement.is_publish" val= true />
                </q-item-section>
              </q-item>

          <q-separator/>

          <q-card-actions align="right" class="text-teal">
            <q-btn label="Update"  color="primary" @click="updateAdminAnnouncement()"/>
          </q-card-actions>

        </q-card>
      </q-dialog>
<!-- ======================================== -->

<!-- ==========Custom Dialog================== -->
      <q-dialog v-model="custom_dialog">
        <q-card>

          <q-table
            title="Choose People"
            :data="user_list"
            :columns="columns1"
            row-key="_id"
            :filter="filter_user_list"
            :pagination.sync="custom_pagination"
            :selected-rows-label="getSelectedString"
            selection="multiple"
            :selected.sync="selected"
          >
            <template v-slot:top-right="props">
              <q-input outlined dense debounce="300" v-model="filter_user_list" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search"/>
                </template>
              </q-input>
            </template>

            <template v-slot:body-cell-first_name="props">
              <q-td :props="props">
                {{props.row.first_name}}
              </q-td>
            </template>

          </q-table>

          <q-card-actions align="right" class="text-teal">
            <q-btn label="Save"  color="secondary" v-close-popup/>
          </q-card-actions>
          
        </q-card>
      </q-dialog>
<!-- =========================== -->

    </div>
  </q-page>
</template>

<script>
import {getNewsfeedAnnouncement , 
        postNewsfeedAnnouncement, 
        updateAdminAnnouncement, 
        getPublishAnnouncement,
        removeAnnouncement,
        postUserMasterlist,
        } from "../../references/url";

import Swal from 'sweetalert2';
import {exportFile} from "quasar";
import UQItems from '../UQItems.vue';
import moment from 'moment-timezone';

function wrapCsvValue(val, formatFn) {
    let formatted = formatFn !== void 0 ? formatFn(val) : val;

    formatted =
        formatted === void 0 || formatted === null ? "" : String(formatted);

    formatted = formatted.split('"').join('""');

    return `"${formatted}"`;
}

export default {
  components: { UQItems },
  data() {
    return {
      moment:moment,
      announcement: {
        title:'',
        description: '',
        image:{},
        is_publish: false,
        custom_setting:'',
        custom_selected:[],
      },

      add_announcement: {
        title:'',
        description: '',
        image:{},
        is_publish: false,
        custom_setting:'',
        custom_selected:[],
      },

      announcement_list:[],
      filter: "",
      mode: "list",
      invoice: {},
      employee_dialog: false,
      columns: [
          {
              name: "image",
              align: "left",
              label: "Picture",
              field: "image",
              sortable: true
          },
          {
              name: "title",
              align: "left",
              label: "Title",
              field: "title",
              sortable: true
          },
          {
              name: "date_created",
              required: true,
              label: "Date Created",
              align: "left",
              field: "date_created",
              sortable: true
          },
          {
              name: "is_publish",
              align: "left",
              label: "Status",
              field: "is_publish",
              sortable: true
          },
          {
              name: "action",
              align: "left",
              label: "Action",
              field: "action",
              sortable: true
          }
      ],
      pagination: {
          rowsPerPage: 5
      },
      custom_pagination: {
        rowsPerPage: 5
      },
      announcement_details_dialog : false,
      new_annoucement_dialog:false,
      publish_announcement_list:[],
    
      custom_dialog: false,
      user_list: [],
      selected: [],
      filter_user_list: "",
      columns1: [
          {
              name: "first_name",
              align: "left",
              label: "First name",
              field: "first_name",
              sortable: true
          },
      ],
      change_pic : false,
      custom_viewers: [],
    };
  },

  async mounted (){

    await this.getNewsfeedAnnouncement();
    await this.getPublishAnnouncement();
    await this.getUsers();
  },

  methods: {


  exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map(col => wrapCsvValue(col.label))]
          .concat(
              this.announcement_list.map(row =>
                  this.columns
                      .map(col =>
                          wrapCsvValue(
                              typeof col.field === "function"
                                  ? col.field(row)
                                  : row[col.field === void 0 ? col.name : col.field],
                              col.format
                          )
                      )
                      .join(",")
              )
          )
          .join("\r\n");

      const status = exportFile("Announcement.csv", content, "text/csv");

      if (status !== true) {
          this.$q.notify({
              message: "Browser denied file download...",
              color: "negative",
              icon: "warning"
          });
      }
  },

    onFileChange(files) 
    {
        const file = files;
        this.add_announcement.image = file;
    },

    onUpdateFileChange(files) 
    {
        const file = files;
        this.announcement.image = file;
    },

    onRejected (rejectedEntries) {
        this.$q.notify({
            type: 'negative',
            message: `${rejectedEntries.length} file(s) did not pass validation constraints`
        })
    },

    async reset(){
      this.add_announcement.title           = '';
      this.add_announcement.description     = '';
      this.add_announcement.image           = {};
      this.add_announcement.custom_setting  = '';
      this.add_announcement.custom_selected = [];
      this.announcement.title               = '';
      this.announcement.description         = '';
      this.announcement.image               = {};
      this.announcement.custom_setting      = '';
      this.announcement.custom_selected     = [];
      this.selected                         = [];
    },

    async submitAnnouncement() {
      this.$q.loading.show();
        const fd = new FormData();
        const announcement_path = this.add_announcement.image;

        for(let user of this.selected){

          this.add_announcement.custom_selected.push( user._id);

        }

        fd.append("title", this.add_announcement.title);
        fd.append("description", this.add_announcement.description);
        fd.append("is_publish", this.add_announcement.is_publish);
        fd.append("custom_setting", this.add_announcement.custom_setting);
        fd.append("custom_selected", this.add_announcement.custom_selected);

        for (let i = 0; i < announcement_path.length; i++) 
        {   
          fd.append('image', announcement_path[i]);
        }

        let res = await this.$_post(postNewsfeedAnnouncement, fd);
        this.$q.loading.hide();

        if (res.status == 200) {
          Swal.fire({
            icon: "success",
            title: "Congrats...",
            text: "Successfully Uploaded!",
          });
          await this.getNewsfeedAnnouncement();
          await this.getPublishAnnouncement();
          this.reset();
        }
    },

    async getNewsfeedAnnouncement() {
      let result = await this.$_post(getNewsfeedAnnouncement);
      this.announcement_list = result.data;
    },

    async getPublishAnnouncement() {
      let result = await this.$_post(getPublishAnnouncement);
      this.publish_announcement_list = result.data;
    },

    async updateAnnouncement(info){
      this.announcement=info;
      this.announcement_details_dialog=true;
      this.change_pic = false;
    },

    async updateAdminAnnouncement(){
      this.announcement_details_dialog=false;

      Swal.fire({
        title: 'Are you sure you want to update?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then( async (result) => {

            const fd = new FormData();
            const announcement_path = this.announcement.image;

            for(let user of this.selected){

              this.custom_viewers.push( user._id);

            }


            fd.append("_id", this.announcement._id);
            fd.append("title", this.announcement.title);
            fd.append("description", this.announcement.description);
            fd.append("is_publish", this.announcement.is_publish);
            fd.append("custom_setting", this.announcement.custom_setting);
            fd.append("custom_viewers", this.custom_viewers);

            for (let i = 0; i < announcement_path.length; i++) 
            {   
              fd.append('image', announcement_path[i]);
            }

            let res = await this.$_post(updateAdminAnnouncement, fd);
            
            if (result.isConfirmed && res.data == 'success') {
              Swal.fire(
                'Updated!',
                'Your file has been updated.',
                'success'
              )
            }
            await this.getPublishAnnouncement();
            await this.getNewsfeedAnnouncement();
            this.change_pic = false;
            this.custom_viewers = [];
            this.reset();
      })
    },

    async removeAnnouncement(info) {
        Swal.fire({
          title: 'Are you sure want to delete this?',
          text: "You won't be able to see this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then( async (result) => {
          let res = await this.$_post(removeAnnouncement, info);
          if (result.isConfirmed && res.data == "success") {
            Swal.fire(
              'Deleted!',
              'Your file has been Deleted.',
              'success'
            )
              this.getPublishAnnouncement();
              this.getNewsfeedAnnouncement();
          }
        })
      },

      async setCustomViews()
      {
        this.custom_dialog = true;
      },

      async getUsers()
      {
        let result = await this.$_post(postUserMasterlist);
        this.user_list  = result.data.data;
      },

      getSelectedString () 
      {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.user_list.length}`
      }
  },
};
</script>

<style>
  .q-chip__content {
    display: block;
    text-align: center;
  }
  .swal2-container {
    z-index: 1000000;
  }
</style>
