<template>
  <div>

    <q-btn
      flat
      slot="btn"
      class="q-mb-md"
      style="background-color: #8156C6; color:white;"
      rounded
      label="Refresh"
      no-caps
      @click="getUser()"
    />

    <q-card class="full-width bg-secondary text-white text-bold font-rubik-labels" style="font-size: 22px">
      <q-card-section>
        <div style="text-align: left">
          Total Active Users = {{ total_active }}
          <br>
          Total Inactive Users = {{ total_inactive }}
        </div>
      </q-card-section>
    </q-card>
    <br>
    <q-select outlined behavior="menu" v-model="selected" :options="options" />

    <div :class="(selected == 'Active Users') ? 'show_me' : 'hide_me'">
    <u-q-table :tbl_title="table_total_active_users.title" :tbl_columns="table_total_active_users.columns" :tbl_data="table_total_active_users.data" :pgntn_is_show="false">
        <template slot="table_rows" slot-scope="props">
            <q-td key="first_name" align="left">{{ props.data.first_name }}</q-td>
            <q-td key="username" align="left">{{ props.data.username }}</q-td>
            <q-td key="balance" align="right">{{ props.data.wallet[0].balance / 1e9 }}</q-td>
            <q-td key="country" align="left">{{ props.data.country }}</q-td>
            <q-td key="city" align="left">{{ props.data.city }}</q-td>
            <q-td key="birth_date" align="left">{{ props.data.age }}</q-td>
            <q-td key="gender" align="left">{{ props.data.gender }}</q-td>
            <q-td key="ratings" align="left">{{ props.data.ratings.one }}</q-td>
            <q-td key="total_reports" align="left">{{ props.data.total_reports }}</q-td>
            <q-td key="total_posts" align="left">{{ props.data.total_posts }}</q-td>
            <q-td key="total_item_sold" align="left">{{ props.data.total_item_sold }}</q-td>
            <q-td key="total_item_bought" align="left">{{ props.data.total_item_bought }}</q-td>
            <q-td key="total_item_traded" align="left">{{ props.data.total_item_traded }}</q-td>
            <q-td key="last_transaction_date" align="left">{{ moment(props.data.last_transaction_date).format("DD-MMM-YYYY  hh:mm a") }}</q-td>
        </template>
    </u-q-table>
    </div>

    <div :class="(selected == 'Inactive Users') ? 'show_me' : 'hide_me'">
    <u-q-table :tbl_title="table_total_inactive_users.title" :tbl_columns="table_total_inactive_users.columns" :tbl_data="table_total_inactive_users.data" :pgntn_is_show="false">
        <template slot="table_rows" slot-scope="props">
            <q-td key="first_name" align="left">{{ props.data.first_name }}</q-td>
            <q-td key="username" align="left">{{ props.data.username }}</q-td>
            <q-td key="balance" align="right">{{ props.data.wallet[0].balance / 1e9 }}</q-td>
            <q-td key="country" align="left">{{ props.data.country }}</q-td>
            <q-td key="city" align="left">{{ props.data.city }}</q-td>
            <q-td key="birth_date" align="left">{{ props.data.age }}</q-td>
            <q-td key="gender" align="left">{{ props.data.gender }}</q-td>
            <q-td key="ratings" align="left">{{ props.data.ratings.one }}</q-td>
            <q-td key="total_reports" align="left">{{ props.data.total_reports }}</q-td>
            <q-td key="total_posts" align="left">{{ props.data.total_posts }}</q-td>
            <q-td key="total_item_sold" align="left">{{ props.data.total_item_sold }}</q-td>
            <q-td key="total_item_bought" align="left">{{ props.data.total_item_bought }}</q-td>
            <q-td key="total_item_traded" align="left">{{ props.data.total_item_traded }}</q-td>
            <q-td key="last_transaction_date" align="left">{{ (props.data.last_transaction_date != 0) ? moment(props.data.last_transaction_date).format("DD-MMM-YYYY  hh:mm a") : 'No Transaction' }}</q-td>
        </template>
    </u-q-table> 
    </div>
       
  </div>
</template>

<script>
import moment from "moment";
import { getUsersTotal } from "../../references/url";
import UQTable from "../../components/TableAndModal/UQTable";

export default 
{
  components: 
  {
      UQTable,
  },
  data: () => (
  {
    moment: moment,
    total_active: 0,
    total_inactive: 0,

    // this is for tables
    table_total_active_users: 
    {
        title: "Total Active Users",
        columns: 
        [
          {
            name: "first_name",
            label: "Full name",
            field: "first_name",
            align: "left",
            sortable: true,
          },
          {
            name: "user_name",
            label: "User name",
            field: "user_name",
            align: "left",
            sortable: true,
          },
          {
            name: "balance",
            label: "Balance",
            field: "balance",
            align: "left",
            sortable: true,
          },
          {
            name: "country",
            label: "Country",
            field: "country",
            align: "left",
            sortable: true,
          },
          {
              name: "city",
              label: "City",
              field: "city",
              align: "left",
              sortable: true,
          },
          {
            name: "birth_date",
            label: "Age",
            field: "birth_date",
            align: "left",
            sortable: true,
          },
          {
            name: "gender",
            label: "Gender",
            field: "gender",
            align: "left",
            sortable: true,
          },
          {
            name: "ratings",
            label: "Ratings",
            field: "ratings",
            align: "left",
            sortable: true,
          },
          {
            name: "total_reports",
            label: "Total Reports",
            field: "total_reports",
            align: "left",
            sortable: true,
          },
          {
            name: "total_posts",
            label: "Total Posts",
            field: "total_posts",
            align: "left",
            sortable: true,
          },
          {
            name: "total_item_sold",
            label: "Total Item Sold",
            field: "total_item_sold",
            align: "left",
            sortable: true,
          },
          {
            name: "total_item_bought",
            label: "Total Item Bought",
            field: "total_item_bought",
            align: "left",
            sortable: true,
          },
          {
            name: "total_item_traded",
            label: "Total Item Traded",
            field: "total_item_traded",
            align: "left",
            sortable: true,
          },
          {
            name: "last_transaction_date",
            label: "Last Transaction Date",
            field: "last_transaction_date",
            align: "left",
            sortable: true,
          },
        ],
        data: [],
      },
      table_total_inactive_users: 
      {
        title: "Total Inactive Users",
        columns: 
        [
          {
            name: "first_name",
            label: "Full name",
            field: "first_name",
            align: "left",
            sortable: true,
          },
          {
            name: "username",
            label: "Username",
            field: "username",
            align: "left",
            sortable: true,
          },
          {
            name: "balance",
            label: "Balance",
            field: "balance",
            align: "left",
            sortable: true,
          },
          {
            name: "country",
            label: "Country",
            field: "country",
            align: "left",
            sortable: true,
          },
          {
              name: "city",
              label: "City",
              field: "city",
              align: "left",
              sortable: true,
          },
          {
            name: "birth_date",
            label: "Age",
            field: "birth_date",
            align: "left",
            sortable: true,
          },
          {
            name: "gender",
            label: "Gender",
            field: "gender",
            align: "left",
            sortable: true,
          },
          {
            name: "ratings",
            label: "Ratings",
            field: "ratings",
            align: "left",
            sortable: true,
          },
          {
            name: "total_reports",
            label: "Total Reports",
            field: "total_reports",
            align: "left",
            sortable: true,
          },
          {
            name: "total_posts",
            label: "Total Posts",
            field: "total_posts",
            align: "left",
            sortable: true,
          },
          {
            name: "total_item_sold",
            label: "Total Item Sold",
            field: "total_item_sold",
            align: "left",
            sortable: true,
          },
          {
            name: "total_item_bought",
            label: "Total Item Bought",
            field: "total_item_bought",
            align: "left",
            sortable: true,
          },
          {
            name: "total_item_traded",
            label: "Total Item Traded",
            field: "total_item_traded",
            align: "left",
            sortable: true,
          },
          {
            name: "last_transaction_date",
            label: "Last Transaction Date",
            field: "last_transaction_date",
            align: "left",
            sortable: true,
          },
        ],
        data: [],
      },
      selected: 'Active Users', // must be static
      options: ['Active Users', 'Inactive Users'], // must be static
  }),
  async mounted() 
  {
    await this.getUser();
  },
  methods: 
  {
    async getUser()
    {
      let users = await this.$_get(getUsersTotal);
      this.table_total_active_users.data = users.data.data.reverse().filter( val => val.user_status == 'active' );
      this.table_total_inactive_users.data = users.data.data.filter( val => val.user_status == 'inactive' );
      this.total_active = this.table_total_active_users.data.length;
      this.total_inactive = this.table_total_inactive_users.data.length;
    },
  },
};
</script>

<style>
.hide_me {
  display: none;
}

.show_me {
  display: block;
}
</style>
