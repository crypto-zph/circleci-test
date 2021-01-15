<template>
  <div>
    <div class="text-center">
          <q-btn
            flat
            slot="btn"
            class="q-mb-md"
            style="background-color: #8156C6; color:white;"
            rounded
            label="Refresh"
            no-caps
            @click="getTotalEscrowed()"
           />
    </div>


      <div style="border-radius: 4px; padding: 0 500px;">
        <div >
          <q-card class="q-pa-sm shadow q-pa-lg" style="background-color: #ebebeb">
            <q-item class="q-pb-none q-pt-xs">
              <q-item-section>
                <q-item-label :class="!$q.dark.isActive? 'text-grey-7':'text-white'" class="text-center" style="letter-spacing: 1px;"> Total Escrowed = {{ total_escrow }} Item/s</q-item-label>
                <q-item-label :class="!$q.dark.isActive? 'text-black':'text-white'" class="text-h6 text-center" style="font-weight: 500;letter-spacing: 3px;">  Amount = {{ total_brt / 1e9 }} BRT</q-item-label>
              </q-item-section>
            </q-item>
          </q-card>
        </div>
      </div>

    <!-- <q-card class="full-width">
      <q-card-section>
        <div style="text-align: left">
          Total Escrowed = {{ total_escrow }} Item/s
          <br>
          Amount = {{ total_brt / 1e9 }} BRT
        </div>
      </q-card-section>
    </q-card> -->

    <br>
    <u-q-table :tbl_title="table_total_escrow.title" :tbl_columns="table_total_escrow.columns" :tbl_data="table_total_escrow.data" :pgntn_is_show="false">
        <template slot="table_rows" slot-scope="props">
            <q-td key="seller_name" align="left">{{ props.data.seller_first_name }}</q-td>
            <q-td key="buyer_name" align="left">{{ props.data.buyer_first_name }}</q-td>
            <q-td key="item_name" align="left">{{ props.data.item_name }}</q-td>
            <q-td key="category" align="left">{{ props.data.category }}</q-td>
            <q-td key="sub_category" align="left">{{ props.data.sub_category }}</q-td>
            <q-td key="sub_category2" align="left">{{ props.data.sub_category2 }}</q-td>
            <q-td key="price" align="right">{{ props.data.price.BRT.$numberDecimal / 1e9 }}</q-td>
            <q-td key="escrowed_date" align="left">{{ moment(props.data.escrowed_date).format("DD-MMM-YYYY  hh:mm a") }}</q-td>
        </template>
    </u-q-table>
  </div>
</template>

<script>
import moment from "moment";
import { getTotalEscrow } from "../../references/url";
import UQTable from "../../components/TableAndModal/UQTable";

export default 
{
  components: 
  {
      UQTable,
  },
  data: () => (
  {
    total_brt: 0,
    total_escrow: 0,
    moment: moment,

    // this is for tables
    table_total_escrow: 
    {
        title: "Total Escrow",
        columns: 
        [
          {
            name: "seller_first_name",
            label: "Seller name",
            field: "seller_first_name",
            align: "left",
            sortable: true,
          },
          {
              name: "buyer_first_name",
              label: "Buy name",
              field: "buyer_first_name",
              align: "left",
              sortable: true,
          },
          {
            name: "item_name",
            label: "Product name",
            field: "item_name",
            align: "left",
            sortable: true,
          },
          {
            name: "category",
            label: "Category",
            field: "category",
            align: "left",
            sortable: true,
          },
          {
            name: "sub_category",
            label: "Subcategory",
            field: "sub_category",
            align: "left",
            sortable: true,
          },
          {
            name: "sub_category2",
            label: "Subcategory2",
            field: "sub_category2",
            align: "left",
            sortable: true,
          },
          {
            name: "price",
            label: "Price (BRT)",
            field: "price",
            align: "left",
            sortable: true,
          },
          {
            name: "escrowed_date",
            label: "Date Escrowed",
            field: "escrowed_date",
            align: "left",
            sortable: true,
          },
        ],
        data: [],
      },
  }),
  async mounted() 
  {
    await this.getTotalEscrowed();
  },
  methods: 
  {
    async getTotalEscrowed()
    {
      let total_escrow             = await this.$_get(getTotalEscrow);
      this.total_brt               = 0;
      this.table_total_escrow.data = total_escrow.data.data.sort((a,b) => b.escrowed_date - a.escrowed_date); // DECS

      this.table_total_escrow.data.forEach( val => {
        this.total_brt += Number(val.price.BRT.$numberDecimal.toString());
      });

      this.total_escrow = this.table_total_escrow.data.length;
    },
  },
};
</script>