=========================================
Title:  Activity Logs
Author: Paul Musa
Date:   23 Nov 2020
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
            <q-td key="date_created">{{ props.data.date_created }}</q-td>
            <q-td key="full_name">{{ props.data.full_name }}</q-td>
            <q-td key="designation">{{ props.data.designation }}</q-td>
            <q-td key="description">{{ props.data.description }}</q-td>
            <q-td key="reference_number" v-if="admin_role == 'Administrator'">{{ props.data.reference_number }}</q-td>
          </template>
        </u-q-table>
    </div>
  </div>
</template>


<script>
import UQTable from "../../components/TableAndModal/UQTable";
import { postAdminLogs } from "../../references/url";
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
    admin_role: null,
    date: 
    {
      from: "",
      to: ""
    },
    table: {
      title: "Activity Logs",
      columns: [
        {
          name: "date_created",
          label: "DATE",
          field: "date_created",
          align: "left",
          sortable: true,
        },

        {
          name: "full_name",
          label: "FULL NAME",
          field: "full_name",
          align: "left",
          sortable: true,
        },

        {
          name: "designation",
          label: "ROLE",
          field: "designation",
          align: "left",
          sortable: true,
        },

        {
          name: "description",
          label: "DESCRIPTION",
          field: "description",
          align: "left",
          sortable: true,
        },

        {
          name: "reference_number",
          label: "REFERENCE NUMBER",
          field: "reference_number",
          align: "left",
          sortable: true,
        },
      ],
      data: []
    },

    pdf: {
      columns: [
        {
          title: "DATE",
          dataKey: "date_created"
        },

        {
          title: "FULL NAME",
          dataKey: "full_name"
        },

        {
          title: "ROLE",
          dataKey: "designation"
        },

        {
          title: "DESCRIPTION",
          dataKey: "description"
        },

        {
          title: "REFERENCE NUMBER",
          dataKey: "reference_number"
        },
      ],
      rows: []
    },

  }),

  async mounted() 
  {
    await this.$_adminMainMounted()
    await this.checkAdminRole()
    await this.fetchAdminLogs()
  },

  methods: 
  {
    async fetchAdminLogs() {
      this.$q.loading.show();
      let res = await this.$_post(postAdminLogs);
      this.$q.loading.hide();

      // Changes the value in array to display in <template>
      await res.data.data.forEach((val, index) => {
        val.date_created = val.date_created ? moment(val.date_created).tz("Asia/Singapore").format("MMM-DD-YYYY | hh:mm A") : '';
        val.reference_number = this.admin_role == 'Administrator' ? val.reference_number : undefined;
      });

      this.table.data = res.data.data;
      this.pdf.rows   = res.data.data;

      // this.date.from = this.moment(this.table.data[this.table.data.length - 1].date_created).format("DD-MMM-YYYY");
      // this.date.to = this.moment(this.table.data[0].date_created).format("DD-MMM-YYYY");

    },

    async checkAdminRole()
    {
      this.admin_role = this.$admin_res.user_info.designation ? this.$admin_res.user_info.designation : null;
      if(this.admin_role != 'Administrator')
      {
        let index = this.table.columns.findIndex(x => x.name == 'reference_number');
        this.table.columns.splice(index, 1);
        this.pdf.columns.splice(index, 1);
      }
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

      exportFile("admin-activity-logs.csv", content, "text/csv");
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
      doc.save("admin-activity-logs.pdf");
    },
    
  },
};
</script>

<style>
.line-break { 
  white-space: pre-wrap; /* Styled by: PAUL */
}
</style>
