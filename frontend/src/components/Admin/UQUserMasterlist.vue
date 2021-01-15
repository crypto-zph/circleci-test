=========================================
Title:  User Masterlist
Author: Paul Musa
Date:   28 Oct 2020
=========================================

<template>
  <div>
    <div class="q-ma-lg">
        <u-q-table
          :tbl_title="table.title"
          :tbl_columns="table.columns"
          :tbl_data="table.data"
          :pgntn_is_show="false"
        >
            <template slot="table_button">
                <q-btn
                    class="q-mx-md"
                    style="background-color: gray; color: white;"
                    icon-right="archive"
                    label="CSV"
                    no-caps
                    @click="createCSV()"
                />

                <q-btn
                    style="background-color: skyblue; color: white;"
                    icon-right="archive"
                    label="PDF"
                    no-caps
                    @click="createPDF()"
                />
            </template>

            <template slot="table_rows" slot-scope="props">
                <q-td key="name">{{ props.data.name }}</q-td>
                <q-td key="username">{{ props.data.username  }}</q-td>
                <q-td key="email">{{ props.data.email }}</q-td>
                <q-td key="contact">{{ props.data.contact }}</q-td>
                <q-td key="gender">{{ props.data.gender }}</q-td>
                <q-td key="country">{{ props.data.country }}</q-td>
                <!-- <q-td key="total_item_traded">{{ props.data.total_item_traded }}</q-td> -->
                <!-- <q-td key="ratings">{{ props.data.ratings }}</q-td> -->
                <!-- <q-td key="status">{{ props.data.status }}</q-td> -->
                <q-td key="created_timestamp">{{ props.data.created_timestamp }}</q-td>
            </template>
        </u-q-table>
    </div>
  </div>
</template>


<script>
import UQTable from "../TableAndModal/UQTable";
import { postUserMasterlist } from "../../references/url";
import { exportFile } from "quasar";
import jspdf from "jspdf";
import "jspdf-autotable";
import moment from "moment-timezone";

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
  components: 
  {
    UQTable
  },

  data:() => 
  ({
    moment: moment,
    table: {
      title: "User Masterlist",
      columns: [
        {
          name: "name",
          label: "NAME",
          field: "name",
          align: "left",
          sortable: true,
        },
        {
          name: "username",
          label: "USERNAME",
          field: "username",
          align: "left",
          sortable: true,
        },
        {
          name: "email",
          label: "EMAIL",
          field: "email",
          align: "left",
          sortable: true,
        },
        {
          name: "contact",
          label: "CONTACT NUMBER",
          field: "contact",
          align: "left",
          sortable: true,
        },
        {
          name: "gender",
          label: "GENDER",
          field: "gender",
          align: "left",
          sortable: true,
        },
        {
          name: "country",
          label: "COUNTRY",
          field: "country",
          align: "left",
          sortable: true,
        },
        // {
        //   name: "total_item_traded",
        //   label: "TOTAL ITEM BARTERED",
        //   field: "total_item_traded",
        //   align: "left",
        //   sortable: true,
        // },
        // {
        //   name: "ratings",
        //   label: "RATINGS",
        //   field: "ratings",
        //   align: "left",
        //   sortable: true,
        // },
        // {
        //   name: "status",
        //   label: "KYC STATUS",
        //   field: "status",
        //   align: "left",
        //   sortable: true,
        // },
        {
          name: "created_timestamp",
          label: "ACCOUNT CREATED",
          field: "created_timestamp",
          align: "left",
          sortable: true,
        },
      ],
      data: [],
    },

    pdf: {
      columns: [
        {
          title: "EMAIL",
          dataKey: "email"
        },
        {
          title: "NAME",
          dataKey: "name",
        },
        {
          title: "USERNAME",
          dataKey: "username"
        },
        {
          title: "EMAIL",
          dataKey: "email"
        },
        {
          title: "CONTACT NUMBER",
          dataKey: "contact"
        },
        {
          title: "GENDER",
          dataKey: "gender"
        },
        {
          title: "COUNTRY",
          dataKey: "country"
        },
        // {
        //   title: "TOTAL ITEM BARTERED",
        //   dataKey: "total_item_traded"
        // },
        // {
        //   title: "RATINGS",
        //   dataKey: "ratings"
        // },
        // {
        //   title: "KYC STATUS",
        //   dataKey: "status"
        // },
        {
          title: "ACCOUNT CREATED",
          dataKey: "created_timestamp"
        },
      ],
      rows: [],
    },

  }),

  async mounted() 
  {
    await this.getUsersList()
  },

  methods: 
  {
    async getUsersList()
    {
      let res = await this.$_post(postUserMasterlist);
      this.table.data = res.data.data;
      await this.newDataTable();
      this.pdf.rows = this.table.data;
    },

    async newDataTable() {
      await this.table.data.forEach((user, index) => {
        user.user_num     = index + 1;
        user.name         = user.last_name && user.first_name ? `${user.last_name}, ${user.first_name}`.toUpperCase() : '';
        user.contact      = user.contact_code && user.contact_number ? user.contact_code + user.contact_number : '';
        user.gender       = user.gender ? user.gender.toUpperCase() : '';
        user.country      = user.country ? user.country.toUpperCase() : '';
        // user.total_item_traded = user.total_item_traded ? user.total_item_traded : '';
        // user.status       = user.status ? user.status.toUpperCase() : '';
        user.created_timestamp = user.created_timestamp ? moment(user.created_timestamp).tz("Asia/Singapore").format("MMM / DD / YYYY").toUpperCase() : '';

        // user.ratings = Object.values(user.ratings).reduce((accumulator, currentValue) => accumulator + currentValue) / Object.values(user.ratings).length;
      });
    },
    
    async createCSV() {
      // naive encoding to csv format
      const content = [this.table.columns.map((col) => wrapCsvValue(col.label))]
        .concat(
          this.table.data.map((row) =>
            this.table.columns
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

      exportFile("baristocrat-client-masterlist.csv", content, "text/csv");
    },

    async createPDF() {
      let title = this.table.title;
      let doc = new jspdf("l", "pt");

      doc.autoTable(this.pdf.columns, this.pdf.rows, {
        theme: "grid",
        styles: {
          font: "helvetica",
          fontSize: 8,
          fillColor: "#733a99",
        },
        columnStyles: {
          // _id: { halign: "center"},
          // email: { halign: "center" },
        },
        createdCell: function (cell, data) {
          cell.styles.fillColor = "#ffffff";
        },
        margin: { top: 60 },
        addPageContent: function (data) {
          doc.text(title, 40, 30);
        },
      });
      doc.save("baristocrat-client-masterlist.pdf");
    },
    
  },
};
</script>

<style>
.line-break { 
  white-space: pre-wrap; /* Styled by: PAUL */
}
</style>
