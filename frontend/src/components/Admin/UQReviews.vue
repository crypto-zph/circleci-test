<template>
  <div>
    <!-- <q-btn @click="deleteAllUserInfo">Delete all User</q-btn> -->
    <div class="q-ma-lg">
      <div class>
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
            <q-td key="reviewer_first_name">
                <q-avatar v-if="props.data.avatar_path == ''">
                    <img src="../../../public/avatar/default.jpeg" />
                </q-avatar>
                <q-avatar color="primary" text-color="white" v-if="props.data.avatar_path != ''" >
                  <img :src="`http://localhost:4000/avatar/${props.data.gender}/${props.data.avatar_path}`">
                </q-avatar>
              {{ props.data.reviewer_first_name }} {{ props.data.reviewer_last_name }}</q-td>
            <!-- <q-td key="reviewer_last_name">{{ props.data.reviewer_last_name }}</q-td> -->
             <q-td key="user_name_rated_reviewed">{{ props.data.user_name_rated_reviewed }}</q-td>
            <q-td key="rate">              
              <q-rating
                :value="
                  Math.round(
                    (props.data.rate)
                  )
                "
                max="5"
                size="1.3em"
                color="yellow"
                icon="star_border"
                icon-selected="star"
                icon-half="star_half"
                no-dimming
                readonly
              /></q-td>
              <q-td key="review">{{ props.data.review }}</q-td>
          </template>
        </u-q-table>
      </div>
    </div>
  </div>
</template>

<script>
import { getReviews, getRateReviewUsers } from "../../references/url";
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
      title: "Rate and Review of Users",
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
          label: "Reviwer",
          field: "reviewer_first_name",
          align: "left",
          sortable: true,
        },
        // {
        //   name: "reviewer_last_name",
        //   label: "Reviewer Last Name",
        //   field: "reviewer_last_name",
        //   align: "left",
        //   sortable: true,
        // },
        {
          name: "user_name_rated_reviewed",
          label: "User Name",
          field: "user_name_rated_reviewed",
          align: "left",
        },
        {
          name: "rate",
          label: "Ratings",
          field: "rate",
          align: "left",
        },
        {
          name: "review",
          label: "Review",
          field: "review",
          align: "left",
        },
      ],
      data: [],
    },
    // form_data: {
    //   gender: "",
    //   avatar_image_path: null,
    //   avatar_image: null,
    // },
  }),
  computed: {},
  async mounted() {
    this.$q.loading.show();
    // await this.getAllReviews();
    await this.getAllRateAndReviews();
    this.$q.loading.hide();
  },
  methods: {
    // async getAllReviews() {
    //   let res = await this.$_post(getReviews);
    //   if (res.status == 200) {
    //     this.table.data = res.data;
    //     console.log(this.table.data);
    //   } else if (res.data.status == "error") {
    //     console.error(res.data.message);
    //   }
    //   //  return res.data;
    // },
    async getAllRateAndReviews() {
      let res = await this.$_post(getRateReviewUsers);
      if (res.status == 200) {
        this.table.data = res.data;
        console.log(this.table.data);
      } else if (res.data.status == "error") {
        console.error(res.data.message);
      }
      //  return res.data;
    },
  },
};
</script>