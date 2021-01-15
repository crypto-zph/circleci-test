<template>
    <q-page class="q-pa-lg">
        <div class="text-center q-mb-lg">
            <q-btn
                flat
                slot="btn"
                class="q-mr-lg"
                style="background-color: #8156C6; color:white;"
                icon-right="add"
                rounded
                label="Create Announcement"
                no-caps
                @click="createAnnouncementBtn()"
            />
        </div>
        <div class="q-gutter-y-md">
            <q-card>
                <q-tabs
                    v-model="tab"
                    dense
                    class="text-gray"
                    active-color="primary"
                    indicator-color="primary"
                    align="justify"
                    narrow-indicator
                >
                    <q-tab v-for="(tab, index) in tabs" :key="index" :name="tab" :label="tab" :active="tab" />
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated >
                    <q-tab-panel v-for="(item, index) in announcement_list" :key="index" :name="item._id">
                        <q-table
                            title="Announcements"
                            :data="item.announcements"
                            :hide-header="mode === 'grid'"
                            :columns="item_columns"
                            row-key="id"
                            :grid="mode=='grid'"
                            :filter="filter"
                            :pagination.sync="pagination"
                        >
                            <template v-slot:top-right="props">

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

                            <template v-slot:body-cell-name="props" >
                                <q-td :props="props" >
                                    <img :src="`data:image/jpg;base64,${props.row.image_path}`" style="width: 50px; height:50px; object-fit: contain;">
                                </q-td>
                            </template>

                            <template v-slot:body-cell-action="props">
                                <q-td :props="props">
                                    <div class="q-gutter-sm">
                                        <q-btn dense color="primary" icon="visibility" @click="viewItemDetails(props.row)" />
                                        <q-btn v-if="(item._id == 'available')" dense color="red" icon="block" @click="updateAnnouncementStatus(props.row.id, 'disabled')" />
                                        <q-btn v-if="(item._id == 'disabled')" dense color="green" icon="check" @click="updateAnnouncementStatus(props.row.id, 'available')"/>
                                        <q-btn dense color="red" icon="delete"  @click="removeAnnouncement(props.row.id)" />
                                    </div>
                                </q-td>
                            </template>

                            <template v-slot:body-cell-status="props">
                                <q-td :props="props">
                                    <q-chip
                                    :color="(props.row.designation == 'Approved')?'green':(props.row.designation == 'Rejected'?'red':'grey')"
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
                    </q-tab-panel>
                </q-tab-panels>

                <!--------------------------------- View Announcement Modal ---------------------------------->
                <q-dialog v-model="view_product_details">
                    <q-card class="my-card" flat bordered>
                        <q-card-section>
                            <q-btn round flat dense icon="close" class="float-right" color="grey-8" @click="closeView()"></q-btn>
                            <div class="text-h6" style="display: flex;">
                                Announcement:
                                <q-input v-model="modal_announcement_details_obj.name" ref="announcement_name" type="text" placeholder="Announcement Name" outlined dense style="width: 300px; margin-left: 10px;"></q-input>
                            </div>
                        </q-card-section>

                        <q-card-section class="q-pt-xs">
                            <q-carousel
                                animated
                                v-model="slide"
                                infinite
                                height="230px"
                                v-if="view_modal_image_remove"
                            >
                                <q-carousel-slide name="announcement_image" >
                                    <q-btn @click="changeView()" round flat dense icon="close" class="float-right" color="grey-8" style="position:absolute; left: 480px; top: 30px;"></q-btn>
                                    <img style="object-fit: contain; width:500px; height:200px;" :src="`data:image/jpg;base64,${modal_announcement_details_obj.image_path}`"/>
                                </q-carousel-slide>
                            </q-carousel>

                            <div class="field q-mt-md" v-if="view_modal_image_change">
                                    <q-uploader
                                        url=""
                                        label="Upload Announcement Image (for < 25MB)"
                                        color="purple"
                                        square
                                        flat
                                        bordered
                                        accept=".jpg, image/*"
                                        :filter="checkFileSize"
                                        hide-upload-btn
                                        hide-upload-progress
                                        @rejected="onRejected"
                                        @added="uploadUpdateAnnouncementImage"
                                        style="margin: auto;"
                                    />
                                </div>

                            <div class="q-gutter-sm" v-if="modal_announcement_details_obj.name">
                                <q-checkbox
                                    v-model="modal_announcement_details_obj.is_clickable"
                                    val="modal_announcement_details_obj.is_clickable = !modal_announcement_details_obj.is_clickable"
                                    label="Clickable Announcement"
                                    color="purple-3"
                                    keep-color
                                />
                                <q-input
                                    v-if="modal_announcement_details_obj.is_clickable"
                                    outlined
                                    type="text"
                                    :readonly="true"
                                    :prefix="`${carousel_url}/${modal_announcement_details_obj.name.trim().replace(/ /g, '-')}`"
                                />
                            </div>

                            <div class="q-mt-lg stacked-label">
                                <label>Description</label>
                                <textarea class="full-width" v-model="modal_announcement_details_obj.description" ></textarea>
                            </div>

                            <div class="q-gutter-sm">
                                <q-radio v-model="modal_announcement_details_obj.status" val="available" label="Available" />
                                <q-radio v-model="modal_announcement_details_obj.status" val="disabled" label="Disabled" />
                            </div>

                        </q-card-section>
                        <q-card-actions align="right" class="text-teal">
                            <q-btn label="Update"  color="primary" @click="updateAnnouncement(modal_announcement_details_obj.id)"/>
                        </q-card-actions>
                    </q-card>
                </q-dialog>
                <!--------------------------------- End of View Announcement Modal ---------------------------------->

                <!--------------------------------- Create Announcement Modal ---------------------------------->
                <q-dialog v-model="create_announcement_modal">
                    <q-card class="my-card">
                        <q-card-section>
                            <div class="text-h6">
                                Create Announcement
                                <q-btn round flat dense icon="close" class="float-right" color="grey-8" @click="closeView()"></q-btn>
                            </div>
                        </q-card-section>
                        <q-card-section class="q-pt-xs">
                            <q-form @submit.prevent="createAnouncement" enctype="multipart/form-data">
                                <div class="field">
                                    <label>Announcement</label>
                                    <q-input
                                        v-model="create_announcement_form_data.name"
                                        ref="announcement_name"
                                        type="text"
                                        placeholder="Announcement Name"
                                        outlined
                                        dense
                                        class="full-width"
                                    ></q-input>
                                </div>

                                <div class="field q-mt-md">
                                    <q-uploader
                                        url=""
                                        label="Upload Announcement Image (for < 25MB)"
                                        color="purple"
                                        square
                                        flat
                                        bordered
                                        accept=".jpg, image/*"
                                        :filter="checkFileSize"
                                        hide-upload-btn
                                        hide-upload-progress
                                        ref="uploader"
                                        @rejected="onRejected"
                                        @added="uploadAnnouncementImage"
                                    />
                                </div>

                                <div class="q-gutter-sm" v-if="create_announcement_form_data.name">
                                    <q-checkbox
                                        v-model="create_announcement_form_data.is_clickable"
                                        val="create_announcement_form_data.is_clickable = !create_announcement_form_data.is_clickable"
                                        label="Clickable Announcement"
                                        color="purple-3"
                                        keep-color
                                    />
                                    <q-input
                                        v-if="create_announcement_form_data.is_clickable"
                                        outlined
                                        type="text"
                                        :readonly="true"
                                        :prefix="`${carousel_url}/${create_announcement_form_data.name.trim().replace(/ /g, '-')}`"
                                    ></q-input>
                                </div>

                                <div class="q-mt-lg stacked-label">
                                    <label>Description</label>
                                    <textarea class="full-width" v-model="create_announcement_form_data.description"></textarea>
                                </div>

                                <div class="q-gutter-sm">
                                    <q-radio v-model="create_announcement_form_data.status" val="available" label="Available" />
                                    <q-radio v-model="create_announcement_form_data.status" val="disabled" label="Disabled" />
                                </div>

                                <div class="q-mt-lg">
                                    <q-btn type="submit" color="primary" unelevated class="full-width">Submit</q-btn>
                                </div>

                                <div class="q-mt-sm">
                                    <q-btn type="button" v-close-popup color="primary" outline class="full-width">Cancel</q-btn>
                                </div>
                            </q-form>
                        </q-card-section>
                    </q-card>
                </q-dialog>
                <!--------------------------------- Create Announcement Modal ---------------------------------->

            </q-card>
        </div>
    </q-page>
</template>

<script>
import Swal from 'sweetalert2';

import {
    getAnnouncements,
    postAnnouncement,
    postUpdateAnnouncementStatus,
    postRemoveAnnouncement,
    postUpdateAnnouncement
    }  from '../../references/url';

import config from '../../../config';

export default {
    data: () =>
    ({
        view_modal_image_remove: true,
        view_modal_image_change: false,
        announcement_list: [],
        mode: 'list',
        filter: '',
        tab: 'available',
        slide: 'announcement_image',
        disabled : true,
        view_product_details: false,
        create_announcement_modal: false,
        modal_announcement_details_obj: {},
        pagination: {
            rowsPerPage: 10
        },
        item_columns: [
            {
                'name'          : 'image',
                'label'         : 'Announcement',
                'align'         : 'left',
                'field'         : 'name',
                'sortable'      : true,
                headerClasses   : 'bg-primary text-white'
            },
            {
                'name'          : 'name',
                'label'         : 'Image',
                'align'         : 'left',
                'field'         : 'name',
                'sortable'      : true,
                headerClasses   : 'bg-primary text-white'
            },
            {
                'name'          : 'date_posted',
                'label'         : 'Date Posted',
                'align'         : 'left',
                'field'         : 'date_posted',
                'sortable'      : true,
                headerClasses   : 'bg-primary text-white'
            },
            {
                name            : "action",
                align           : "left",
                label           : "Action",
                field           : "action",
                sortable        : false,
                headerClasses   : 'bg-primary text-white'
            }
        ],
        create_announcement_form_data:
        {
            name            : '',
            image_path      : '',
            status          : 'available',
            description     : '',
            is_clickable    : false
        },
        tabs : ['available', 'disabled'],
        carousel_url : config.CAROUSEL_URL,
    }),
    async mounted ()
    {
        await this.isUserLoggedIn();
    },
    methods:
    {
        async isUserLoggedIn()
        {
            let user = await this.$_isAdminUserAuthenticated();

            if (user.data.status == 'not authenticated') {
                this.$router.push({name: 'documentation_admin_login'});
            } else if (user.data.status == 'authenticated') {
                await this.getAnnouncements();
            }
        },

        async createAnnouncementBtn ()
        {
            this.create_announcement_modal = true;
        },

        async getAnnouncements ()
        {
            let announcement = await this.$_get(getAnnouncements);

            if (announcement != null) {
                this.announcement_list = Object.values(announcement.data.data);
            }
        },

        async updateAnnouncementStatus (id, status)
        {
            Swal.fire(
                {
                    title: `Are you sure you ${(status == 'available') ? 'activate' : status} this Announcement?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes'
                })
                .then(
                    async result =>
                    {
                        if (result.isConfirmed) {
                            Swal.fire(
                            'Updated!',
                            'Announcement has been updated.',
                            'success'
                        )
                        let result = await this.$_post(`${postUpdateAnnouncementStatus}/${id}`, { 'status' : status });
                        this.getAnnouncements();
                    }
                });
        },

        async viewItemDetails (details)
        {
            this.modal_announcement_details_obj = details;
            this.view_product_details = true;
        },

        checkFileSize (files) {
            return files.filter(file => file.size < 2.5e+7);
        },

        validateImageHeightWidth(file, callback)
        {
            var reader = new FileReader();

            //Read the contents of Image File.
            reader.readAsDataURL(file);
            reader.onload = function (e) {

                //Initiate the JavaScript Image object.
                var image = new Image();

                //Set the Base64 string return from FileReader as source.
                image.src = e.target.result;

                //Validate the File Height and Width.
                image.onload = function () {
                    var height = this.height;
                    var width = this.width;

                    if (height != 418 && width != 1200) {
                        return callback(false);
                    }

                    return callback(true);
                };
            };
        },

        onRejected (rejectedEntries) {
            // Notify plugin needs to be installed
            // https://quasar.dev/quasar-plugins/notify#Installation
            this.$q.notify({
                type: 'negative',
                message: `${rejectedEntries.length} file(s) did not pass validation constraints`
            });
        },

        uploadAnnouncementImage (file)
        {
            if (file.length != 0) {

                this.validateImageHeightWidth(file[0], (isValid) => {
                    if (!isValid) {
                        this.$q.notify({
                            type: 'negative',
                            message: `Image must be 418pixels in width and 1200pixels in height`
                        });
                        this.$refs.uploader.reset();
                    } else {
                        this.create_announcement_form_data.image_path = file[0];
                    }
                });
            }
        },

        uploadUpdateAnnouncementImage (file)
        {
            if (file.length != 0) {
                this.modal_announcement_details_obj.image_path = file[0];
            }
        },

        async createAnouncement()
        {
            const fd = new FormData();
            fd.append("announcement_image_path", this.create_announcement_form_data.image_path);
            fd.append("name", this.create_announcement_form_data.name);
            fd.append("status", this.create_announcement_form_data.status);
            fd.append("description", this.create_announcement_form_data.description);
            fd.append("is_clickable", this.create_announcement_form_data.is_clickable);

            this.$q.loading.show();

            let announcement                                = await this.$_post(postAnnouncement, fd);

            this.create_announcement_form_data.name         = '';
            this.isClickableCreate                          = false;
            this.create_announcement_form_data.url          = '';
            this.create_announcement_form_data.status       = 'available';
            this.create_announcement_form_data.description  = '';
            this.create_announcement_modal                  = false;

            this.getAnnouncements();

            this.$q.loading.hide();
        },

        async removeAnnouncement(announcement_id)
        {
            Swal.fire(
                {
                    title: `Are you sure you remove this announcement?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes'
                })
                .then(
                    async result =>
                    {
                        if (result.isConfirmed) {
                            Swal.fire(
                                'Deleted!',
                                'Announcement has been deleted.',
                                'success'
                            )
                        let result = await this.$_post(`${postRemoveAnnouncement}/${announcement_id}`);
                        this.getAnnouncements();
                    }
                });
        },

        changeView()
        {
            this.view_modal_image_change = true;
            this.view_modal_image_remove = false;
        },

        closeView()
        {
            this.view_product_details               = false;
            this.view_modal_image_change            = false;
            this.view_modal_image_remove            = true;

            this.create_announcement_modal          = false;
            this.create_announcement_form_data.url  = '';

            this.modal_announcement_details_obj.is_clickable    = false;
            this.create_announcement_form_data.is_clickable     = false;
        },

        async updateAnnouncement(announcement_id)
        {
            const fd = new FormData();

            this.modal_announcement_details_obj.image_path = (this.view_modal_image_change == true) ? this.modal_announcement_details_obj.image_path : '';

            fd.append("announcement_image_path", this.modal_announcement_details_obj.image_path);
            fd.append("name", this.modal_announcement_details_obj.name);
            fd.append("status", this.modal_announcement_details_obj.status);
            fd.append("description", this.modal_announcement_details_obj.description);
            fd.append("is_clickable", this.modal_announcement_details_obj.is_clickable);

            this.$q.loading.show();
            let announcement = await this.$_post(`${postUpdateAnnouncement}/${announcement_id}`, fd);

            this.getAnnouncements();
            this.closeView();
            this.$q.loading.hide();
        },
    }
}
</script>

<style>
.price-table table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    width: 100%;
}
.price-table table thead tr {
    background-color: #760685;
    color: #ffffff;
    text-align: left;
}
.price-table table th,
.price-table table td {
    padding: 12px 15px;
}
.price-table table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.price-table table tbody tr:last-of-type {
    border-bottom: 2px solid #760685;
}
.price-table table tbody tr {
    border-bottom: 1px solid #dddddd;
}
.desc-table table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    width: 100%;
    text-align: center;
}
.desc-table table td {
    padding: 12px 15px;
}
.desc-table table tbody td:first-of-type {
    background-color: #760685;
    color: #ffffff;
    font-weight: bold;
}
</style>