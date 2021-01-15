<template>
    <div>

	    <!-- content -->
	    <div class="q-pa-md">

            <u-q-table
            :tbl_title="title"
            :tbl_columns="columns"
            :tbl_data="data">
                <template v-slot:table_rows="props">
                    <!-- {{props.data}} -->
                    <q-td key="item_image" align="left"><q-img :src="`data:image/jpg;base64,${props.data.item_image[0]}`" /></q-td>
                    <q-td key="item_name" align="left">{{props.data.item_name}}</q-td>
                    <q-td key="price_BRT" align="left">{{ Number(props.data.price.BRT.$numberDecimal) | toClientAmount(9) }}</q-td>
                    <q-td key="category" align="left">{{ props.data.category}}</q-td>
                    <q-td key="action" align="center">
                        <q-btn flat @click="editItem(props.data)" color="warning">
                            <i class="fas fa-pen"></i>
                        </q-btn>
                        <q-btn flat @click="removeItem(props.data)" color="red-14">
                            <i class="fas fa-trash"></i>
                        </q-btn>
                    </q-td>
                </template>
            </u-q-table>

            <u-q-modal :modal_data="item_details_modal" :modal_style="`width: 1000px`" ref="item_details_modal">
                <template v-slot:modal-content="props">
                    <q-list bordered separator>
                        <q-item clickable v-ripple>
                            <q-item-section>
                                <q-item-label>FIRST NAME</q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-input v-model="item_info.seller_first_name"/>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple>
                            <q-item-section>
                                <q-item-label>LAST NAME</q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-input v-model="item_info.seller_last_name"/>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple>
                            <q-item-section>
                                <q-item-label>CREATED AT</q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>{{moment(props.data.data.created_at).format('YYYY-MMM-DD').toUpperCase()}}</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple>
                            <q-item-section>
                                <q-item-label>ITEM NAME</q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-input v-model="item_info.item_name" />
                            </q-item-section>
                        </q-item>

                        <q-item clickable v-ripple>
                            <q-item-section>
                                <q-item-label>CATEGORY</q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-input v-model="item_info.category" />
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple>
                            <q-item-section>
                                <q-item-label>SUB CATEGORY</q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-input v-model="item_info.sub_category" />
                            </q-item-section>
                        </q-item>

                        <q-item clickable v-ripple>
                            <q-item-section>
                                <q-item-label>DESCRIPTION</q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-input v-model="item_info.description" />
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple>
                            <q-item-section>
                                <q-item-label>STATUS</q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-input v-model="item_info.status" />
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple>
                            <q-item-section>
                                <q-item-label>PRICE BRT</q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-input v-model="item_info.price.BRT" />
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple>
                            <q-item-section>
                                <q-item-label>IMAGE</q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-img
                                    v-for="(image, i) in props.data.data.item_image"
                                    :key="i"
                                    :src="`data:image/jpg;base64,${image}`"
                                    alt="id"
                                    @click="zoomImage(`data:image/jpg;base64,${image}`)"
                                />
                            </q-item-section>
                        </q-item>
                    </q-list>
                </template>

                <template v-slot:modal-footer>
                    <div align="right">
                        <q-btn label="update" color="secondary" @click="update" class="q-mr-sm" />
                        <q-btn label="close" color="orange" @click="closeModal('item_details_modal')" />
                    </div>
                </template>
            </u-q-modal>

        </div>
    </div>
</template>

<script>
import moment   from 'moment';
import { postListItems, postUpdateItem } from "../references/url";
import UQTable from "./TableAndModal/UQTable";
import UQModal from "./TableAndModal/UQModal";
export default
{
    data:() =>(
    {
        moment: moment,
        item_details_modal: {
            title: "Edit Item",
            data: {},
        },
        title: "Items",
        columns: [
            {
                name    : 'item_image',
                label   : 'Item Image',
                field   : 'item_image',
                align   : 'center',
                sortable: true
            },
            {
                name    : 'item_name',
                label   : 'Item Name',
                field   : 'item_name',
                align   : 'center',
                sortable: true
            },
            {
                name    : 'price_BRT',
                label   : 'Item Price (BRT)',
                field   : 'price_BRT',
                align   : 'center',
                sortable: true
            },
            {
                name    : 'category',
                label   : 'Category',
                field   : 'category',
                align   : 'center',
                sortable: true
            },
            {
                name    : 'action',
                label   : 'Action',
                field   : 'action',
                align   : 'center',
            },
        ],
        data: [],
        item_info: {
            id: "",
            seller_first_name: "",
            seller_last_name: "",
            item_name: "",
            category: "",
            sub_category: "",
            description: "",
            status: "",
            price: {
                BRT: ""
            }
        }
    }),
    components: { UQTable, UQModal },
    async mounted()
    {
        await this.fetchItems();
    },
    methods:
    {
        async fetchItems()
        {
            let items = await this.$_post(postListItems);
            // let convert = await this.convertToDecimal(items.data.saved_items[0].price.BRT.$numberDecimal, 9);
            this.data = items.data.items;
            console.log(this.data)
            
        },
        async editItem(details)
        {
            this.item_details_modal.data = details;
            this.item_info.id = details._id;
            this.item_info.seller_first_name = details.seller_first_name;
            this.item_info.seller_last_name = details.seller_last_name;
            this.item_info.item_name = details.item_name;
            this.item_info.category = details.category;
            this.item_info.sub_category = details.sub_category;
            this.item_info.description = details.description;
            this.item_info.status = details.status;
            this.item_info.price.BRT = details.price.BRT.$numberDecimal;

            this.$refs['item_details_modal'].showModal()
            console.log(this.item_info)
        },
        async update()
        {
            this.$q.loading.show();

            let update_item = await this.$_post(postUpdateItem, this.item_info);

            if(update_item)
            {
                this.$q.dialog({ title: `Success Message`, message: "Successfully Updated" });
            }

            await this.fetchItems()

            this.$q.loading.hide();
        },  
        async removeItem(details)
        {
            console.log(details)
        },
        convertToDecimal(amount, decimals)
        {
            let value = amount/10 ** decimals;
            return value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
        },
        closeModal(ref)
        {
            this.$refs[ref].hideModal();
        }
    },
    filters: {
        toUpperCase(words)
        {
            return words.toUpperCase();
        },
        toClientAmount(amount, decimals)
        {
            let value = amount/10 ** decimals;
            return value.toLocaleString('en-US', { maximumFractionDigits: decimals });
        }
    }
}
</script>