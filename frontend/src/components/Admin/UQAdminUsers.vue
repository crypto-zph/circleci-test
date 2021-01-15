=========================================
Title: Manage User
Design Author: Andrea Lyn Destajo
Date: 28-30 Oct 2020
Contributor:
=========================================
<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-table
        title="Admin Users"
        :data="userList"
        :hide-header="mode === 'grid'"
        :columns="admin_user_columns"
        row-key="name"
        :grid="mode=='grid'"
        :filter="filter"
        :pagination.sync="pagination"
      >
        <template v-slot:top-right="props">
          <q-btn @click="user_role_dialog=true" outline color="primary" label="Role" class="q-mr-xs"/>
          <q-btn @click="new_user_dialog=true" outline color="primary" label="Add New" class="q-mr-xs"/>

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

        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <div class="q-gutter-sm">
              <q-btn dense color="primary" icon="edit"  @click="viewUser(props.row)" />
              <q-btn dense color="red" icon="delete"  @click="removeAdminUser(props.row)" />
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-designation="props">
          <q-td :props="props">
            <q-chip
              :color="(props.row.designation == 'Administrator')?'green':(props.row.designation != 'Administrator'?'red':'grey')"
              text-color="white"
              dense
              class="text-weight-bolder"
              square
              style="width: 85px"
            >{{props.row.designation}}
            </q-chip>
          </q-td>
        </template>
      </q-table>
    </q-card>

    <q-dialog v-model="new_user_dialog">
      <q-card style="width: 600px; max-width: 60vw;">
        <q-card-section>
          <div class="text-h6">
            Add new user
            <q-btn round flat dense icon="close" class="float-right" color="grey-8" v-close-popup></q-btn>
          </div>
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Fullname</q-item-label>
                  <q-input dense outlined v-model="adminUser_obj.fullname_str" label="fullname"/>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Designation</q-item-label>
                    <q-select
                      dense
                      label="Designation"
                      outlined
                      v-model="adminUser_obj.role_str"
                      :options="options"
                      stack-label
                      options-dense
                    ></q-select>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Contact</q-item-label>
                  <q-input dense outlined type="number" v-model="adminUser_obj.contact_str" label="Contact"/>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Email</q-item-label>
                  <q-input dense outlined v-model="adminUser_obj.email_str" label="Email" type="Email"/>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Password</q-item-label>
                    <q-input dense outlined v-model="adminUser_obj.password_str" :type="isPwd ? 'password' : 'text'" borderless style="background: white; border-radius: 5px"   placeholder="Password"
                        :rules="[
                        val => !!val || '* Field is required',
                        val => val.length > 7 || 'Password must be more than 8 characters',
                        val => val.length < 16 || 'Password must not exceed 16 characters',
                        ]">
                            <template v-slot:append>
                            <q-icon
                                :name="isPwd ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPwd = !isPwd"
                            />
                            </template>
                              <template v-slot:prepend>
                            <q-icon
                                name="fas fa-lock"
                                size="14px"
                                class="cursor-pointer"
                            />
                            </template>
                      </q-input>
                </q-item-section>
              </q-item>
            </q-list>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="text-teal">
          <q-btn label="Save"  color="primary" @click="addUserAdmin()"/>
          <q-btn label="Clear"  color="primary" @click="reset()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

<!-- --------------------------------Update User Dialog------------------------------------------- -->
    <q-dialog v-model="update_user_dialog">
      <q-card class="my-card" flat bordered style="width: 600px; max-width: 60vw;">
        <q-card-section>
          <div class="text-h6">
            Update Details
            <q-btn round flat dense icon="close" class="float-right" color="grey-8" v-close-popup></q-btn>
          </div>
        </q-card-section>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-h5 q-mt-sm q-mb-xs"><q-input borderless v-model="modal_user_info_obj.full_name" label="Full name" /></div>
            <div class="text-caption text-grey">

              <q-input class="text-caption text-grey" borderless v-model="modal_user_info_obj.email" label="Email" type="Email"/>
              <q-input class="text-caption text-grey" borderless v-model="modal_user_info_obj.contact" label="Phone number" />
              <q-select class="text-caption text-grey" borderless v-model="modal_user_info_obj.designation" :options="options" label="Designation" />
            </div>
          </q-card-section>

          <q-card-section class="col-5 flex flex-center">
            <q-img
              class="rounded-borders"
              src="https://cdn.quasar.dev/img/boy-avatar.png"
            />
          </q-card-section>
        </q-card-section>
        <q-separator/>

        <q-card-section>
          <q-input borderless v-model="modal_user_info_obj.description" label="Description" />
        </q-card-section>
        <q-card-actions align="right" class="text-teal">
          <q-btn label="Update"  color="primary" @click="updateAdminUsers()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- ----------------------------------- Role ------------------------------------------------------ -->
    <q-dialog v-model="user_role_dialog">
      <q-card class="my-card" flat bordered style="width:70%; max-width: 60vw;">
        <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
          <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <q-card flat bordered class>
              <q-card-section>
                <div class="text-h6">New Role</div>
              </q-card-section>

              <q-separator inset></q-separator>

              <q-card-section>
                <q-form>
                  <q-list>
                    <q-item>
                      <q-item-section>
                        <q-item-label class="q-pb-xs">Role</q-item-label>
                        <q-input
                          dense
                          outlined
                          v-model="role_list_obj.role_title_str"
                          label="Title"
                        />
                      </q-item-section>
                    </q-item>
                    <q-item>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label class="q-pb-xs">Access</q-item-label>
                        <q-input
                          dense
                          outlined
                          v-model="role_list_obj.access_str"
                          label="Access"
                        />
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label class="q-pb-xs">Description</q-item-label>
                          <q-input
                            v-model="role_list_obj.description_str"
                            label="Description"
                            dense
                            outlined
                            autogrow
                          />
                      </q-item-section>
                    </q-item>
                  </q-list>
                  <q-card-actions align="right" class="text-teal">
                    <q-btn
                      label="Save"
                      @click="addNewRole()"
                      color="primary"

                    />
                  </q-card-actions>
                </q-form>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
            <q-card flat bordered class>
              <q-card-section>
                <div class="text-h6">Admin Role</div>
              </q-card-section>

              <q-separator inset></q-separator>

              <q-card-section>
                <q-table
                  :data="roleList"
                  :columns="role_columns"
                  row-key="name"
                  :filter="role_filter"
                >
                  <template v-slot:top-right="">
                    <q-input outlined dense debounce="300" v-model="role_filter" placeholder="Search">
                      <template v-slot:append>
                        <q-icon name="search"/>
                      </template>
                    </q-input>
                  </template>
                  <template v-slot:body-cell-detail="props">
                    <q-td :props="props">
                      <q-btn @click="user_dialog = true" dense round color="secondary" icon="pageview"/>
                    </q-td>
                  </template>
                  <template v-slot:body-cell-action="props">
                    <q-td :props="props">
                      <div class="q-gutter-sm">
                        <q-btn dense color="primary" icon="edit"  @click="updateRole(props.row)" />
                        <q-btn dense color="red" icon="delete"  @click="removeAdminRole(props.row)" />
                      </div>
                    </q-td>
                  </template>
                </q-table>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
    import Swal from 'sweetalert2';
    import {
        addUserAdmin,
        getAdminUsers,
        updateAdminUsers,
        updateAdminRole,
        removeAdminUser,
        addNewRole,
        getAdminRoles,
        removeAdminRole,
    } from "../../references/url";

    export default {
        data() {
            return {
                role_list_obj:{
                  role_id: "",
                  role_title_str: "",
                  access_str: "",
                  description_str: "",
                },

                filter: "",
                role_filter:"",
                adminUser_obj: {
                  fullname_str: '',
                  contact_str:'',
                  role_str: '',
                  email_str:'',
                  password_str:'',
                },
                options: [],
                user_info_arr: [],
                password: '',
                isPwd: true,
                new_user_dialog: false,
                user_dialog: false,
                user_role_dialog: false,
                update_user_dialog: false,
                mode: "list",
                admin_user_columns: [
                    {
                        name: "desc",
                        required: true,
                        label: "Name",
                        align: "left",
                        field: row => row.full_name,
                        sortable: true
                    },
                    {
                        name: "email",
                        align: "left",
                        label: "Email",
                        field: "email",
                        sortable: true
                    },
                    {
                        name: "designation",
                        align: "left",
                        label: "Designation",
                        field: "designation",
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
                role_columns:
                [
                  {
                    name:'Role_str',
                    align:'left',
                    label:'Role Title',
                    field:'Role_str',
                    sortable: true,
                  },
                  {
                    name: 'Access_str',
                    align: 'left',
                    label: 'Access',
                    field: 'Access_str',
                    sortable: true,
                  },
                  {
                    name: 'Description_str',
                    align: 'left',
                    label: 'Description',
                    field: 'Description_str',
                    sortable: true,
                  },
                  {
                      name: "action",
                      align: "left",
                      label: "Action",
                      field: "action",
                      sortable: true
                  }
                ],
                userList: [],
                roleList: [],
                modal_user_info_obj:{},
                pagination: {
                    rowsPerPage: 10
                }
            };
        },

        async mounted()
        {
            await this.getAdminUsers();
            await this.getAdminRoles();
        },

        methods: {

            async reset()
            {
                this.adminUser_obj.fullname_str = "";
                this.adminUser_obj.email_str    = "";
                this.adminUser_obj.contact_str  = "";
                this.adminUser_obj.password_str = "";
                this.adminUser_obj.email_str    = "";
                this.adminUser_obj.role_str     = "";
            },

            async resetRole()
            {
                this.role_list_obj.role_id = "";
                this.role_list_obj.role_title_str = "";
                this.role_list_obj.access_str     = "";
                this.role_list_obj.description_str= "";
            },

            async addUserAdmin ()
            {
                if (
                    this.adminUser_obj.fullname_str == "" ||
                    this.adminUser_obj.email_str    == "" ||
                    this.adminUser_obj.contact_str  == "" ||
                    this.adminUser_obj.password_str == "" ||
                    this.adminUser_obj.role_str     == ""
                ) {
                    Swal.fire({
                    icon: 'error',
                    title: 'Empty Field',
                    text: 'You need to fill up the form.',
                    confirmButtonColor: '#2f4c7e',
                    })

                } else {
                    let user_info = await this.$_post(addUserAdmin, this.adminUser_obj);
                    if (user_info.data == 'success') {
                        this.user_info_arr = user_info.data;
                        Swal.fire({
                          icon: 'success',
                          title: 'Success',
                          text: 'User has been added successfully.',
                          confirmButtonColor: '#2f4c7e',
                        })
                        this.getAdminUsers();
                        this.reset();
                    }else if(user_info.data == 'Email already registered!'){
                      Swal.fire({
                      icon: 'error',
                      title: user_info.data,
                      confirmButtonColor: '#2f4c7e',
                      })
                    }
                }
            },

            async getAdminUsers() {
                let result = await this.$_post(getAdminUsers);
                if (result != null) {
                    this.userList = result.data;
                }
            },

            async getAdminRoles() {
                this.$q.loading.show();
                let result = await this.$_post(getAdminRoles);
                this.$q.loading.hide();

                if (result != null) {
                  this.options = [];
                    this.roleList = result.data;
                    for (let role of this.roleList) {
                      this.options.push(role.Role_str);
                    }
                }
            },

            async viewUser(userInfo) {
                this.modal_user_info_obj = userInfo;
                this.update_user_dialog=true;
            },

            async updateAdminUsers() {
                  this.update_user_dialog=false;
                  Swal.fire({
                    title: 'Are you sure you want to update?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes'
                  }).then( async (result) => {
                    let res = await this.$_post(updateAdminUsers, this.modal_user_info_obj);
                    if (result.isConfirmed && res.data == 'success') {
                      Swal.fire(
                        'Updated!',
                        'Your file has been updated.',
                        'success'
                      )
                    }
                  })
                },

                async removeAdminUser(userInfo) {
                    Swal.fire({
                      title: 'Are you sure want to delete this?',
                      text: "You won't be able to see this!",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Yes'
                    }).then( async (result) => {
                      let res = await this.$_post(removeAdminUser, userInfo);
                      if (result.isConfirmed && res.data == "success") {
                        Swal.fire(
                          'Deleted!',
                          'Your file has been deleted.',
                          'success'
                        )
                        this.getAdminUsers();
                      }
                    })
                  },

                async removeAdminRole(userInfo) {
                    Swal.fire({
                      title: 'Are you sure want to delete this?',
                      text: "You won't be able to see this!",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Yes'
                    }).then( async (result) => {
                      let res = await this.$_post(removeAdminRole, userInfo);
                      if (result.isConfirmed && res.data == "success") {
                        Swal.fire(
                          'Deleted!',
                          'Your file has been Deleted.',
                          'success'
                        )
                         this.getAdminRoles();
                      }
                    })
                  },

                  async addNewRole() {

                    if (this.role_list_obj.role_title_str  == "" || this.role_list_obj.access_str  == "" || this.role_list_obj.description_str == "" )
                        {
                        Swal.fire({
                        icon: 'error',
                        title: 'Empty Field',
                        text: 'You need to fill up the form.',
                        confirmButtonColor: '#2f4c7e',
                        })

                    } else {
                      let result = await this.$_post(addNewRole, this.role_list_obj);
                      if (result.data == 'success') {
                          Swal.fire({
                          icon: 'success',
                          title: 'Success',
                          text: 'User added successfully.',
                          confirmButtonColor: '#2f4c7e',
                          })
                          this.data = result.data;
                          this.getAdminRoles();
                          this.resetRole();
                      }else if(result.data == 'Duplicate'){
                        Swal.fire({
                        icon: 'error',
                        title: 'Role already Exist.',
                        confirmButtonColor: '#2f4c7e',
                        })
                      }else if(result.data == 'DuplicateID'){
                          Swal.fire({
                            title: 'Role Found!',
                            text: `Are you sure you want to update ${this.role_list_obj.role_title_str} role?`,
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes'
                          }).then( async (result) => {
                            let update_result = await this.$_post(updateAdminRole, this.role_list_obj);
                            if (result.isConfirmed && update_result.data == 'success') {
                              Swal.fire(
                                'Updated!',
                                'Your file has been updated.',
                                'success'
                              )
                              this.getAdminRoles();
                              this.resetRole();
                            }
                          })
                      }
                    }
                  },

                  async updateRole(roleInfo) {
                      this.role_list_obj.role_id = roleInfo._id
                      this.role_list_obj.role_title_str = roleInfo.Role_str;
                      this.role_list_obj.access_str     = roleInfo.Access_str;
                      this.role_list_obj.description_str = roleInfo.Description_str;
                  },
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
