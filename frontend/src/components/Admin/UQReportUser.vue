<template>
  <div>
    <!-- <q-btn @click="deleteAllUserInfo">Delete all User</q-btn> -->
    <div class="q-ma-lg">
      <div>
        <u-q-table
          :tbl_title="table.title"
          :tbl_columns="table.columns"
          :tbl_data="table.data"
          :pgntn_is_show="false"
        >
          <template slot="table_rows" slot-scope="props">
            <!-- <q-td key="updated_at">{{
              moment(props.data.updated_at)
                .tz("Europe/London")
                .format("DD-MMM-YYYY")
            }}</q-td> -->
            <q-td key="reviewer_first_name">{{ props.data.reviewer_first_name }} {{ props.data.reviewer_last_name }}</q-td>
            <q-td key="user_name">{{ props.data.user_name }}</q-td>
            <q-td align="center" key="report">{{ props.data.report }}</q-td>
            <q-td  align="center"><q-btn dense color="primary" icon="visibility" @click="viewDetails(props.data)" /></q-td>
          </template>
        </u-q-table>


                       <!--------------------------------- View Announcement Modal ---------------------------------->
                <q-dialog v-model="view_report_details" persistent>
                    <q-card class="my-card" flat bordered >
                        <q-card-section>
                            <q-btn round flat dense icon="close" class="float-right" color="grey-8" v-close-popup></q-btn>
                            <div class="text-h6" style="display: flex;">
                                REPORTED DETAILS:
                            </div>
                        </q-card-section>

                        <q-card-section class="q-pt-xs">
                              <div class="text-h6" >
                                Screenshot
                            </div>
                             <img style="object-fit: contain; width:500px; height:200px;" :src="`http://localhost:4000/report/${modal_details.report_path}`"/>
                            <div class="q-mt-lg stacked-label">
                              <div class="text-h6" >
                                Reason
                            </div>
                                <div>
                                  <p>{{modal_details.reason}}</p>
                                </div>
                            </div>

                            <div class="q-gutter-sm">
                            </div>

                        </q-card-section>
                    </q-card>
                </q-dialog>
                <!--------------------------------- End of View Announcement Modal ---------------------------------->
      </div>
    </div>
  </div>
</template>

<script>
import { postGetAllUser, getAllReportUser } from "../../references/url";
import UQTable from "../../components/TableAndModal/UQTable";
import UQModal from "../../components/TableAndModal/UQModal";
import Swal from "sweetalert2";

export default {
  components: {
    UQTable,
    UQModal,
  },
  data: () => ({
    table: {
      title: "Report User Table",
      columns: [
        // {
        //   name: "updated_at",
        //   label: "DATE ",
        //   field: "updated_at",
        //   align: "left",
        //   sortable: true,
        // },
        {
          name: "reviewer_first_name",
          label: "REVIEWER",
          field: "reviewer_first_name",
          align: "left",
          sortable: true,
        },
        {
          name: "user_name",
          label: "REPORTED",
          field: "user_name",
          align: "left",
          sortable: true,
        },

        {
          name: "report",
          label: "REASON",
          field: "report",
          align: "center",
        },

        {
          name: "action",
          label: "ACTION",
          field: "action",
          align: "center",
        },
      ],
      data: [],
    },
    modal_details: {},
    view_report_details: false
    // form_data: {
    //   gender: "",
    //   avatar_image_path: null,
    //   avatar_image: null,
    // },
  }),
  computed: {},
  async mounted() {
    this.$q.loading.show();
    await this.getAllReportUser();
    this.$q.loading.hide();
  },
  methods: {
    async getAllReportUser(){
      let res = await this.$_post(getAllReportUser);
      if (res.status == 200) {
        this.table.data = res.data;
        console.log(this.table.data);
      } else if (res.data.status == "error") {
        console.error(res.data.message);
      }
    },
    async viewDetails (details)
    {
        this.modal_details = details;
        this.view_report_details = true;
        console.log(this.modal_details)
    },
  },
  
};
</script>