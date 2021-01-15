<template>
    <q-page class="q-pa-md">
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
                    <q-tab-panel v-for="(item, index) in item_list" :key="index" :name="item._id">
                        <q-table
                            title="Products"
                            :data="item.items"
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

                                <q-btn
                                    color="primary"
                                    icon-right="archive"
                                    label="Export to CSV"
                                    no-caps
                                    @click="createCSV(item.items)"
                                />
                            </template>

                            <template v-slot:body-cell-action="props">
                                <q-td :props="props">
                                    <div class="q-gutter-sm">
                                        <q-btn dense color="primary" icon="visibility" @click="viewItemDetails(props.row)" />
                                        <q-btn v-if="(item._id == 'available')" dense color="red" icon="block" @click="updateProductStatus(props.row.id, 'disabled')" />
                                        <q-btn v-if="(item._id == 'disabled')" dense color="green" icon="check" @click="updateProductStatus(props.row.id, 'available')"/>
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

                <q-dialog v-model="view_product_details">
                    <q-card class="my-card" flat bordered style="width: 600px; max-width: 60vw;">
                        <q-card-section>
                            <div class="text-h6">
                                Product: {{ modal_product_details_obj.item_name }}
                                <q-btn round flat dense icon="close" class="float-right" color="grey-8" v-close-popup></q-btn>
                            </div>
                        </q-card-section>

                        <q-card-section class="q-pt-xs">
                            <q-carousel
                                animated
                                v-model="slide"
                                arrows
                                navigation
                                infinite
                            >
                                <q-carousel-slide v-for="(image, index) in modal_product_details_obj.item_image" :key="index" :name="index" :img-src="`data:image/jpg;base64,${image}`" />
                            </q-carousel>

                            <div class="price-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th v-for="(price, index) in price_columns" :key="index">{{ price }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td v-for="(price, index) in modal_product_details_obj.prices" :key="index">{{ convertPrice(price.$numberDecimal) }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        <div class="desc-table">
                            <table>
                                <tbody>
                                    <tr>
                                        <td class="desc-name">Description</td>
                                        <td>{{ modal_product_details_obj.description }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        </q-card-section>
                    </q-card>
                </q-dialog>
            </q-card>
        </div>
    </q-page>
</template>

<script>
import Swal from 'sweetalert2';
import { exportFile } from "quasar";
import {
    getGroupOfItemsByStatus,
    postUpdateProfile,
    updateProductStatusById
    }  from '../references/url';

function wrapCsvValue(val, formatFn) {

  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`;
}

export default {
    data: () =>
    ({
        item_list: [],
        'mode': 'list',
        'filter': '',
        'tab': 'available',
        'slide': 0,
        'disabled' : true,
        'view_product_details': false,
        'modal_product_details_obj': {},
        pagination: {
            rowsPerPage: 10
        },
        'item_columns': [
            {
                'name'          : 'item_name',
                'label'         : 'Product Name',
                'align'         : 'left',
                'field'         : 'item_name',
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
                sortable        : true,
                headerClasses   : 'bg-primary text-white'
            }
        ],
        'tabs' : ['available', 'escrowed', 'pending', 'disabled'],
        'price_columns': ['USD', 'BRT', 'PHP']
    }),
    async mounted ()
    {
        await this.getItems();
    },
    methods:
    {
        async getItems ()
        {
            let items = await this.$_get(getGroupOfItemsByStatus);

            if (items != null) {
                this.item_list = Object.values(items.data.data);
            }
        },

        async updateProductStatus (product_id, status)
        {
            Swal.fire(
                {
                    title: `Are you sure you ${(status == 'available') ? 'activate' : status} this product?`,
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
                            'Your file has been updated.',
                            'success'
                        )
                        let result = await this.$_post(`${updateProductStatusById}/${product_id}`, { 'status' : status });
                        this.getItems();
                    }
                });
        },

        async viewItemDetails (details)
        {
            this.modal_product_details_obj = details;
            this.view_product_details = true;
        },

        convertPrice (price)
        {
            return Number.parseFloat(price).toFixed(2);
        },

        async createCSV(items) {
            // naive encoding to csv format
            const content = [this.item_columns.map((col) => wrapCsvValue(col.label))]
                .concat(
                items.map((row) =>
                    this.item_columns
                    .map((col) =>
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

            exportFile("baristocrat-product-management-report.csv", content, "text/csv");
        }
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