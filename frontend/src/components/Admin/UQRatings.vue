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
            <q-td key="email">{{ props.data.email }}</q-td>
            <q-td key="username">{{ props.data.username }}</q-td>
            <q-td align="left" key="ratings">
              <q-rating
                :value="
                  Math.round(
                    (props.data.ratings.one * 1 +
                      props.data.ratings.two * 2 +
                      props.data.ratings.three * 3 +
                      props.data.ratings.four * 4 +
                      props.data.ratings.five * 5) /
                      (props.data.ratings.one +
                        props.data.ratings.two +
                        props.data.ratings.three +
                        props.data.ratings.four +
                        props.data.ratings.five)
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
              />
            </q-td>
          </template>
        </u-q-table>
      </div>
    </div>
  </div>
</template>

<script>
import { postGetAllUser } from "../../references/url";
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
      title: "Ratings of Users",
      columns: [
        // {
        //   name: "updated_at",
        //   label: "DATE ",
        //   field: "updated_at",
        //   align: "left",
        //   sortable: true,
        // },
        {
          name: "email",
          label: "EMAIL ADDRESS",
          field: "email",
          align: "left",
          sortable: true,
        },
        {
          name: "username",
          label: "USER NAME",
          field: "username",
          align: "left",
          sortable: true,
        },

        {
          name: "ratings",
          label: "RATINGS",
          field: "ratings",
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
    await this.getAllUser();
    this.$q.loading.hide();
  },
  methods: {
    async getAllUser() {
      let res = await this.$_post(postGetAllUser);
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