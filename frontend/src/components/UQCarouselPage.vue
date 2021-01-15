<template>
    <div class="landing__container" :class="$q.dark.isActive ? 'header_dark' : 'header_normal'">
        <div class="q-my-lg">
            <img :src="`data:image/jpg;base64,${announcement_image}`" style="width: 100%" />

            <q-card style="width: 100%">
                <q-card-actions align="right">
                    <q-btn align="right" color="purple-4" @click="addToAnnouncement()">Add Product</q-btn>
                </q-card-actions>
                <q-separator />
                <q-card-section v-if="!isEmpty(announcement_items)">
                    <div class="row justify-center">
                        <div class="col-9">
                        <u-q-product-tiles :tile_details="announcement_items" :user_data="user_data"></u-q-product-tiles>
                    </div>
                    </div>
                </q-card-section>
            </q-card>

            <!-------------------------------------------------- ADD TO ANNOUNCEMENT DIALOG -------------------------------------------------->
            <q-dialog v-model="add_product_modal" >
                <q-card class="my-card" style="width: 50%">
                    <q-card-section bordered class="bg-secondary text-white row items-center">
                        <div class="text-h6">Add To Announcement</div>
                        <q-space />
                        <q-btn icon="close" flat round dense v-close-popup />
                    </q-card-section>

                    <q-card-section class="q-gutter-md">
                        <q-select
                            outlined
                            v-model="selected_item"
                            use-input
                            hide-selected
                            fill-input
                            input-debounce="0"
                            :options="options"
                            label="Select Item"
                            @filter="filterFn"
                            @input="selectedItem"
                        >
                            <template v-slot:no-option>
                                <q-item>
                                    <q-item-section class="text-grey">
                                    No results
                                    </q-item-section>
                                </q-item>
                            </template>
                        </q-select>
                    </q-card-section>

                    <q-card style="width: 100%">
                        <q-card-actions align="right">
                            <q-btn align="right" color="purple-4" @click="addToAnnouncement()">Add Product</q-btn>
                        </q-card-actions>
                        <q-separator />
                        <q-card-section v-if="!isEmpty(announcement_items)">
                            <div class="row justify-center">
                                <div class="col-9">
                                <u-q-product-tiles :tile_details="announcement_items" :user_data="user_data"></u-q-product-tiles>
                            </div>
                            </div>
                        </q-card-section>
                    </q-card>
                </q-card>
            </q-dialog>

                <!-------------------------------------------------- ADD TO ANNOUNCEMENT DIALOG -------------------------------------------------->
                <q-dialog v-model="add_product_modal" >
                    <q-card class="my-card" style="width: 50%">
                        <q-card-section bordered class="bg-secondary text-white row items-center">
                            <div class="text-h6">Add To Announcement</div>
                            <q-space />
                            <q-btn icon="close" flat round dense v-close-popup />
                        </q-card-section>

                        <q-card-section class="q-gutter-md">
                            <q-select
                                outlined
                                v-model="selected_item"
                                use-input
                                hide-selected
                                fill-input
                                input-debounce="0"
                                :options="options"
                                label="Select Item"
                                @filter="filterFn"
                                @input="selectedItem"
                            >
                                <template v-slot:no-option>
                                    <q-item>
                                        <q-item-section class="text-grey">
                                        No results
                                        </q-item-section>
                                    </q-item>
                                </template>
                            </q-select>
                        </q-card-section>

                        <q-card-actions align="right">
                            <q-btn color="purple-4" @click="addItemToAnnouncement()" :disable="buttonDisable">Add</q-btn>
                        </q-card-actions>
                    </q-card>
                </q-dialog>
                <!---------------------------------------------- END OF ADD TO ANNOUNCEMENT DIALOG ---------------------------------------------->

                <u-q-login :is_login_page="is_login_page" ref="login_modal"></u-q-login>
        </div>
    </div>
</template>

<script>
import UQLogin  from './UQLogin';
import UQProductTiles from './global/UQProductTiles';
import { getAnnouncementImageById, getItemsBySellerId, postAddItemToAnnouncement, getItemsByAnnouncementId } from '../references/url';

export default {
    components: { UQLogin, UQProductTiles },
    data: () =>
    ({
        announcement_image: '',
        item_id: '',

        selected_item: null,

        user_data: {},

        items: [],
        options: [],
        stringOptions: [],
        announcement_items: [],

        is_logged_in: false,
        is_login_page: false,
        add_product_modal: false,

        buttonDisable: true,
    }),
    mounted()
    {
        this.getAnnouncementImageById();
        this.isUserLoggedIn();
        this.getItemsByAnnouncementId();
    },
    methods:
    {
        async getAnnouncementImageById()
        {
            let announcement_id = this.$route.params.announcement_id;

            let image               = await this.$_get(`${getAnnouncementImageById}/${announcement_id}`);
            this.announcement_image = image.data.image;
        },

        async isUserLoggedIn()
        {
            let user = await this.$_isUserAuthenticated();

            if (user.data.status == 'authenticated') {
                this.user_data = user.data.user;
                this.is_logged_in = true;

                await this.getItemsBySellerId();
            }
        },

        async getItemsBySellerId()
        {
            let announcement_id = this.$route.params.announcement_id;
            let items = await this.$_get(`${getItemsBySellerId}/${announcement_id}`);
            this.items = items.data.data.length > 0 ? items.data.data : [];

            if (this.items.length > 0) {
                for (let counter = 0; counter < this.items.length; counter++) {
                    this.stringOptions.push(this.items[counter].item_name);
                }
            }

            this.options = this.stringOptions
        },

        addToAnnouncement()
        {
            if (this.is_logged_in) {
                this.add_product_modal = true;
            } else {
                this.$refs['login_modal'].show();
            }
        },

        filterFn (val, update, abort)
        {
            update(() => {
                const needle = val.toLocaleLowerCase()
                this.options = this.stringOptions.filter(v => v.toLocaleLowerCase().indexOf(needle) > -1)
            })
        },

        async selectedItem(val)
        {
            this.selected_item = val;

            for (let counter = 0; counter < this.items.length; counter++) {
                if (this.items[counter].item_name == val) {
                    this.item_id = this.items[counter]._id;
                }
            }

            this.buttonDisable = this.selected_item ? false : true;
        },

        async addItemToAnnouncement()
        {
            let announcement_id = this.$route.params.announcement_id;

            this.$q.loading.show();

            let add             = await this.$_post(`${postAddItemToAnnouncement}/${announcement_id}`, { item_id : this.item_id });

            this.stringOptions = [];

            await this.getItemsBySellerId();
            await this.getItemsByAnnouncementId();

            this.add_product_modal = false;

            this.$q.loading.hide();
        },

        async getItemsByAnnouncementId()
        {
            let announcement_id = this.$route.params.announcement_id;
            let items = await this.$_get(`${getItemsByAnnouncementId}/${announcement_id}`);

            if (items.data.status == 'success' && items.data.data.length > 0) {
                this.announcement_items = items.data.data;
            }
        },

        isEmpty(obj)
        {
            return typeof obj === 'undefined' || Object.keys(obj).length === 0;
        }
    }
}
</script>

<style>
.landing__container{
  padding-right: 250px;
  padding-left: 250px;
  padding-bottom: 100px;
}
@media (max-width: 1800px) {
  .landing__container{
    padding-right: 100px;
    padding-left: 100px;
    padding-bottom: 100px;
  }
}
@media (max-width: 900px) {
  .landing__container{
    padding-right: 50px;
    padding-left: 50px;
    padding-bottom: 100px;
  }
}

/* Dark Mode */
.header_normal {
  background-color: rgb(242, 245, 250);
  color: black;
}
.header_dark {
  /* background: linear-gradient(145deg, rgb(61, 14, 42) 15%, rgb(14, 43, 78) 70%); */
  background-color: #010101f2;
}

</style>