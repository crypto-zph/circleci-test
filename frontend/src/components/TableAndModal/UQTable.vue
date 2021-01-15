=========================================
Title: Design
Author: Pergentino S. Galang II
Date: 12 Aug 2020
Contributor:
=========================================

<template>
  <div>
            <q-table
              :title="tbl_title"
              :data="tbl_data"
              :hide-header="mode === 'grid'"
              :table-class="$q.dark.isActive?'text-white':'text-grey-8'"
              :table-header-class="$q.dark.isActive?'text-white':'text-grey-9'"
              :columns="tbl_columns"
              row-key="name"
              :grid="mode=='grid'"
              :filter="filter"
              :loading="is_loading"
              :pagination.sync="tbl_pagination"
            >
              <template v-slot:top-right="props">
                <q-input outlined dense debounce="300" v-model="filter" bg-color="white" placeholder="Search">
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
                  class="text-white" 
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
                  class="text-white"
                  :class="$route.name == 'documentation_admin_categories_management' ? 'ctg_manageClass' : ''"
                >
                  <q-tooltip
                    :disable="$q.platform.is.mobile"
                    v-close-popup
                  >{{mode==='grid' ? 'List' : 'Grid'}}
                  </q-tooltip>
                </q-btn>

              <!-- Customize Button -->
               <slot name="table_button" />
               <!-- use this code for sample
                    <template slot="table_button">
                      <q-btn
                              style="background-color:#37CDE3;color:white"
                              icon-right="archive"
                              label="Export to csv"
                              no-caps
                              @click="exportTable"
                            />
                    </template> -->


              </template>

            <q-tr slot="body" slot-scope="props"  >
              <slot :data="props.row" name="table_rows"></slot>
            </q-tr>
          </q-table>
  </div>
</template>

<script>
export default {
  name: "UQTable",
  props: {
    tbl_title: { type: String, default: "" },
    tbl_data: { type: Array, default: [] },
    tbl_columns: { type: Array, default: [] },
    pgntn_is_show: { type: Boolean, default: false },
    btn_is_show: { type: Boolean, default: false },
  },
  data: () => ({
    mode: 'list',
    is_loading: false,
    tbl_pagination: {
      rowsPerPage: 10,
      page: 1,
    },
    filter: "",
  }),
  async mounted() {
  },
  computed: {
    tb_length() {
      if (this.tbl_pagination.rowsPerPage != 0) {
        return Math.ceil(
          this.$props.tbl_data.length / this.tbl_pagination.rowsPerPage
        );
      } else {
        return 1;
      }
    },
    methods: {
 
      firstPage(scope) {
        scope.firstPage();
        this.$emit("firstPage");
      },
      nextPage(scope) {
        scope.nextPage();
        this.$emit("nextPage");
      },
      prevPage(scope) {
        scope.prevPage();
        this.$emit("prevPage");
      },
      lastPage(scope) {
        scope.lastPage();
        this.$emit("lastPage");
      },
    },
  },
};
</script>


<style>
tr:nth-child(even) {
  /* background-color: #e6e6e6 !important;
  color: black; */
}

.search-bar {
  width: 51px;
  transition: 0.5s;
}
.search-bar:hover {
  width: 150px;
}

.search-bar:focus-within {
  width: 150px;
}
.q-table__top,
.q-table__bottom,
thead tr:first-child th {
  background-color: #9A67AC !important;
  color: white;
}
.ctg_manageClass {
  display: none;
}
</style>