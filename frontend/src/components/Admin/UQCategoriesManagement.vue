<template>
    <div>
        <div class="q-ma-lg">

            <div class="text-center q-mb-md" :class="(selected == 'Category') ? 'show_me' : 'hide_me'">
              <q-btn
                flat
                slot="btn"
                class="q-mr-lg"
                style="background-color: #8156C6; color:white;"
                icon-right="add"
                rounded
                label="Add Category"
                no-caps
                @click="btnAddCategoryModal()"
              />
            </div>

            <div class="text-center q-mb-md" :class="(selected == 'Subcategory') ? 'show_me' : 'hide_me'">
              <q-btn
                flat
                slot="btn"
                class="q-mr-lg"
                style="background-color: #8156C6; color:white;"
                icon-right="add"
                rounded
                label="Add Subcategory"
                no-caps
                @click="btnAddSubcategoryModal()"
              />
            </div>

            <div class="text-center q-mb-md" :class="(selected == 'Subcategory2') ? 'show_me' : 'hide_me'">
              <q-btn
                flat
                slot="btn"
                class="q-mr-lg"
                style="background-color: #8156C6; color:white;"
                icon-right="add"
                rounded
                label="Add Subcategory2"
                no-caps
                @click="btnAddSubcategory2Modal()"
              />
            </div>

            <q-select outlined behavior="menu" v-model="selected" :options="options" />

            <!------------------------------------ Category table ------------------------------>
            <div :class="(selected == 'Category') ? 'show_me' : 'hide_me'">
            <u-q-table :tbl_title="table_category.title" :tbl_columns="table_category.columns" :tbl_data="table_category.data" :pgntn_is_show="false" :mode="list">

                <!-- <q-btn glossy slot="btn" class="q-mr-lg text-white" icon-right="add" label="Add Category" no-caps @click="btnAddCategoryModal()" /> -->

                <template slot="table_rows" slot-scope="props">
                    <q-td key="category_image_path">
                        <q-img :src="`data:image/jpg;base64,${props.data.category_image_path}`" style="width: 100px; height: 100px;" />   
                    </q-td>
                    <q-td key="category_name">{{ props.data.category_name }}</q-td>
                    <q-td key="date_created">{{ moment(props.data.date_created).format("DD-MMM-YYYY  hh:mm") }}</q-td>
                    <q-td key="status">{{ props.data.status }}</q-td>
                    <q-td key="legalities">{{ props.data.legalities }}</q-td>
                    <q-td align="center">
                        <q-btn @click="btnUpdateCategoryModal(props.data)" color="primary" class="">
                            <i class="fas fa-pen"></i>
                        </q-btn>
                    </q-td>
                </template>
            </u-q-table>
            </div>
            <!------------------------------------ end Category table ------------------------------>

            <!------------------------------------ Subcategory table ------------------------------>
            <div :class="(selected == 'Subcategory') ? 'show_me' : 'hide_me'">
            <u-q-table :tbl_title="table_subcategory.title" :tbl_columns="table_subcategory.columns" :tbl_data="table_subcategory.data" :pgntn_is_show="false">

                <!-- <q-btn glossy slot="btn" class="q-mr-lg text-white" icon-right="add" label="Add Subcategory" no-caps @click="btnAddSubcategoryModal()" /> -->

                <template slot="table_rows" slot-scope="props">
                    <q-td key="subcategory_image_path">
                            <q-img :src="`data:image/jpg;base64,${props.data.subcategory_image_path}`" style="width: 100px; height: 100px;" /> 
                    </q-td>
                    <q-td key="subcategory_name">{{ props.data.subcategory_name }}</q-td>
                    <q-td key="category_name">{{ props.data.category_name }}</q-td>
                    <q-td key="date_created">{{ moment(props.data.date_created).format("DD-MMM-YYYY  hh:mm") }}</q-td>
                    <q-td key="status">{{ props.data.status }}</q-td>
                    <q-td align="center">
                        <q-btn @click="btnUpdateSubcategoryModal(props.data)" color="primary" class="">
                            <i class="fas fa-pen"></i>
                        </q-btn>
                    </q-td>
                </template>
            </u-q-table>
            </div>
            <!------------------------------------ end Subcategory table ------------------------------>

            <!------------------------------------ Subcategory2 table ------------------------------>
            <div :class="(selected == 'Subcategory2') ? 'show_me' : 'hide_me'">
            <u-q-table :tbl_title="table_subcategory2.title" :tbl_columns="table_subcategory2.columns" :tbl_data="table_subcategory2.data" :pgntn_is_show="false">

                <!-- <q-btn glossy slot="btn" class="q-mr-lg text-white" icon-right="add" label="Add Subcategory2" no-caps @click="btnAddSubcategory2Modal()" /> -->

                <template slot="table_rows" slot-scope="props">
                     <q-td key="subcategory_image_path">
                            <q-img :src="`data:image/jpg;base64,${props.data.subcategory2_image_path}`" style="width: 100px; height: 100px;" /> 
                    </q-td>
                    <q-td key="subcategory_name2">{{ props.data.subcategory2_name }}</q-td>
                    <q-td key="subcategory_name">{{ props.data.subcategory_name }}</q-td>
                    <q-td key="category_name">{{ props.data.category_name }}</q-td>
                    <q-td key="date_created">{{ moment(props.data.date_created).format("DD-MMM-YYYY hh:mm") }}</q-td>
                    <q-td key="status">{{ props.data.status }}</q-td>
                    <q-td align="center">
                        <q-btn @click="btnUpdateSubcategory2Modal(props.data)" color="primary" class="">
                            <i class="fas fa-pen"></i>
                        </q-btn>
                    </q-td>
                </template>
            </u-q-table>
            </div>
            <!------------------------------------ end Subcategory2 table ------------------------------>



            <!------------------------------------ add category modal ------------------------------>
            <q-dialog v-model="add_caterogy_modal" persistent>
              <q-card>
                <q-card-section class="card-add-user">
                  <q-form @submit.prevent="addCategorySubmit" enctype="multipart/form-data">
                    <div class="field q-mt-md">
                        <label>Add Category</label>
                    </div>
                    <div class="field q-mt-md">
                        <q-input v-model="add_category_form_data.category_name" type="text" placeholder="Category name" outlined dense class="full-width"></q-input>
                    </div>
                    <div class="field q-mt-md">
                      <label>Upload image for Category</label>
                        <q-input
                          type="file"
                          v-model="add_category_form_data.category_image"
                          @change="uploadFileCategory"
                          accept="image/png, image/jpeg, image/jpg"
                          class=""
                          dense
                          name=""
                          borderless
                        />
                        <div
                          class="q-mr-xl"
                          v-if="add_category_form_data.category_image_path_object != null"
                        >
                          <img
                            :src="add_category_form_data.category_image_path_object"
                            style="width: 200px; height: 200px;"
                          />
                        </div>
                    </div>
                    <div class="field q-mt-md">
                      <label> Need Legalities? </label>
                      <q-radio v-model="legalities" val="yes" label="Yes" />
                      <q-radio v-model="legalities" val="no" label="No" />
                    </div>
                    <div class="q-mt-lg">
                      <q-btn type="submit" color="primary" unelevated class="full-width">Submit</q-btn>
                    </div>
                    <div class="q-mt-sm">
                      <q-btn type="button" v-close-popup color="primary" outline class="full-width" @click="">Cancel</q-btn>
                    </div>
                  </q-form>
                </q-card-section>
              </q-card>
            </q-dialog>
            <!------------------------------------ end add category modal ------------------------------>

            <!------------------------------------ add subcategory modal ------------------------------>
             <q-dialog v-model="add_subcaterogy_modal" persistent>
              <q-card>
                <q-card-section class="card-add-user">
                  <q-form @submit.prevent="addSubcategorySubmit" enctype="multipart/form-data">
                    <div class="field q-mt-md">
                        <label>Add Subcategory</label>
                    </div>
                    <div class="field q-mt-md">
                        <q-select outlined behavior="menu" v-model="categories_selected" :options="categories_options" />
                    </div>
                    <div class="field q-mt-md">
                        <q-input v-model="add_subcategory_form_data.subcategory_name" type="text" placeholder="Subcategory name" outlined dense class="full-width"></q-input>
                    </div>
                    <div class="field q-mt-md">
                      <label>Upload image for Subcategory</label>
                        <q-input
                          type="file"
                          v-model="add_subcategory_form_data.subcategory_image"
                          @change="uploadFileSubcategory"
                          accept="image/png, image/jpeg, image/jpg"
                          class=""
                          dense
                          name=""
                          borderless
                        />
                        <div
                          class="q-mr-xl"
                          v-if="add_subcategory_form_data.subcategory_image_path_object != null"
                        >
                          <img
                            :src="add_subcategory_form_data.subcategory_image_path_object"
                            style="width: 200px; height: 200px; border-radius: 10px"
                          />
                        </div>
                    </div>
                    <div class="q-mt-lg">
                      <q-btn type="submit" color="primary" unelevated class="full-width">Submit</q-btn>
                    </div>
                    <div class="q-mt-sm">
                      <q-btn type="button" v-close-popup color="primary" outline class="full-width" @click="">Cancel</q-btn>
                    </div>
                  </q-form>
                </q-card-section>
              </q-card>
            </q-dialog>
            <!------------------------------------ end add subcategory modal ------------------------------>

            <!------------------------------------ add subcategory2 modal ------------------------------>
             <q-dialog v-model="add_subcaterogy2_modal" persistent>
              <q-card>
                <q-card-section class="card-add-user">
                  <q-form @submit.prevent="addSubcategory2Submit" enctype="multipart/form-data">
                    <div class="field q-mt-md">
                        <label>Add Subcategory2</label>
                    </div>
                    <div class="field q-mt-md">
                        <q-select outlined behavior="menu" v-model="subcategories_selected" :options="subcategories_options" />
                    </div>
                    <div class="field q-mt-md">
                        <q-input v-model="add_subcategory2_form_data.subcategory2_name" type="text" placeholder="Subcategory2 name" outlined dense class="full-width"></q-input>
                    </div>
                    <div class="field q-mt-md">
                      <label>Upload image for Subcategory2</label>
                        <q-input
                          type="file"
                          v-model="add_subcategory2_form_data.subcategory2_image"
                          @change="uploadFileSubcategory2"
                          accept="image/png, image/jpeg, image/jpg"
                          class=""
                          dense
                          name=""
                          borderless
                        />
                        <div
                          class="q-mr-xl"
                          v-if="add_subcategory2_form_data.subcategory2_image_path_object != null"
                        >
                          <img
                            :src="add_subcategory2_form_data.subcategory2_image_path_object"
                            style="width: 200px; height: 200px; border-radius: 10px"
                          />
                        </div>
                    </div>
                    <div class="q-mt-lg">
                      <q-btn type="submit" color="primary" unelevated class="full-width">Submit</q-btn>
                    </div>
                    <div class="q-mt-sm">
                      <q-btn type="button" v-close-popup color="primary" outline class="full-width" @click="">Cancel</q-btn>
                    </div>
                  </q-form>
                </q-card-section>
              </q-card>
            </q-dialog>
            <!------------------------------------ end add subcategory2 modal ------------------------------>



            <!------------------------------------ update Category modal ------------------------------>
             <q-dialog v-model="update_category_modal" persistent>
              <q-card>
                <q-card-section class="card-add-user">
                  <q-form @submit.prevent="updateCategorySubmit" enctype="multipart/form-data">
                    <div class="field q-mt-md">
                        <label>Update Category</label>
                    </div>
                    <div class="field q-mt-md">
                        <q-input v-model="update_category_form_data.category_name" type="text" placeholder="Category name" outlined dense class="full-width"></q-input>
                    </div>
                    <div class="field q-mt-md">
                      <label>Update image for Category</label>
                        <q-input
                          type="file"
                          v-model="update_category_form_data.category_image"
                          @change="updateFileCategory"
                          accept="image/png, image/jpeg, image/jpg"
                          class=""
                          dense
                          name=""
                          borderless
                        />
                        <div
                          class="q-mr-xl"
                          v-if="update_category_form_data.category_image_path_object != null"
                        >
                          <img
                            :src="update_category_form_data.category_image_path_object"
                            style="width: 200px; height: 200px;"
                          />
                        </div>
                    </div>
                    <div class="field q-mt-md">
                        <q-select outlined behavior="menu" v-model="enable_and_disable_selected" :options="enable_and_disable_options" />
                    </div>
                    <div class="field q-mt-md">
                      <label> Need Legalities? </label>
                      <q-radio v-model="legalities" val="yes" label="Yes" />
                      <q-radio v-model="legalities" val="no" label="No" />
                    </div>
                    <div class="q-mt-lg">
                      <q-btn type="submit" color="primary" unelevated class="full-width">Submit</q-btn>
                    </div>
                    <div class="q-mt-sm">
                      <q-btn type="button" v-close-popup color="primary" outline class="full-width" @click="">Cancel</q-btn>
                    </div>
                  </q-form>
                </q-card-section>
              </q-card>
            </q-dialog>
            <!------------------------------------ end update Category modal------------------------------>

             <!------------------------------------ update Subcategory modal ------------------------------>
             <q-dialog v-model="update_subcategory_modal" persistent>
              <q-card>
                <q-card-section class="card-add-user">
                  <q-form @submit.prevent="updateSubcategorySubmit" enctype="multipart/form-data">
                    <div class="field q-mt-md">
                        <label>Update Subcategory</label>
                    </div>
                    <div class="field q-mt-md">
                        <q-input v-model="update_subcategory_form_data.category_name" type="text" placeholder="Category name" outlined dense class="full-width" readonly></q-input>
                    </div>
                    <div class="field q-mt-md">
                        <q-input v-model="update_subcategory_form_data.subcategory_name" type="text" placeholder="Subcategory name" outlined dense class="full-width"></q-input>
                    </div>
                    <div class="field q-mt-md">
                      <label>Upload image for Subcategory</label>
                        <q-input
                          type="file"
                          v-model="update_subcategory_form_data.subcategory_image"
                          @change="updateFileSubcategory"
                          accept="image/png, image/jpeg, image/jpg"
                          class=""
                          dense
                          name=""
                          borderless
                        />
                        <div
                          class="q-mr-xl"
                          v-if="update_subcategory_form_data.subcategory_image_path_object != null"
                        >
                          <img
                            :src="update_subcategory_form_data.subcategory_image_path_object"
                            style="width: 200px; height: 200px; border-radius: 10px"
                          />
                        </div>
                    </div>
                    <div class="field q-mt-md">
                        <q-select outlined behavior="menu" v-model="enable_and_disable_selected" :options="enable_and_disable_options" />
                    </div>
                    <div class="q-mt-lg">
                      <q-btn type="submit" color="primary" unelevated class="full-width">Submit</q-btn>
                    </div>
                    <div class="q-mt-sm">
                      <q-btn type="button" v-close-popup color="primary" outline class="full-width" @click="">Cancel</q-btn>
                    </div>
                  </q-form>
                </q-card-section>
              </q-card>
            </q-dialog>
            <!------------------------------------ end update Subcategory modal------------------------------>

             <!------------------------------------ update Subcategory2 modal ------------------------------>
             <q-dialog v-model="update_subcategory2_modal" persistent>
              <q-card>
                <q-card-section class="card-add-user">
                  <q-form @submit.prevent="updateSubcategory2Submit" enctype="multipart/form-data">
                    <div class="field q-mt-md">
                        <label>Update Subcategory2</label>
                    </div>
                    <div class="field q-mt-md">
                        <q-input v-model="update_subcategory2_form_data.subcategory_name" type="text" placeholder="Subcategory name" outlined dense class="full-width" readonly></q-input>
                    </div>
                    <div class="field q-mt-md">
                        <q-input v-model="update_subcategory2_form_data.subcategory2_name" type="text" placeholder="Subcategory2 name" outlined dense class="full-width"></q-input>
                    </div>
                    <div class="field q-mt-md">
                      <label>Upload image for Subcategory2</label>
                        <q-input
                          type="file"
                          v-model="update_subcategory2_form_data.subcategory2_image"
                          @change="updateFileSubcategory2"
                          accept="image/png, image/jpeg, image/jpg"
                          class=""
                          dense
                          name=""
                          borderless
                        />
                        <div
                          class="q-mr-xl"
                          v-if="update_subcategory2_form_data.subcategory2_image_path_object != null"
                        >
                          <img
                            :src="update_subcategory2_form_data.subcategory2_image_path_object"
                            style="width: 200px; height: 200px; border-radius: 10px"
                          />
                        </div>
                    </div>
                    <div class="field q-mt-md">
                        <q-select outlined behavior="menu" v-model="enable_and_disable_selected" :options="enable_and_disable_options" />
                    </div>
                    <div class="q-mt-lg">
                      <q-btn type="submit" color="primary" unelevated class="full-width">Submit</q-btn>
                    </div>
                    <div class="q-mt-sm">
                      <q-btn type="button" v-close-popup color="primary" outline class="full-width" @click="">Cancel</q-btn>
                    </div>
                  </q-form>
                </q-card-section>
              </q-card>
            </q-dialog>
            <!------------------------------------ end update Subcategory2 modal------------------------------>
        </div>
    </div>
</template>

<script>
import moment             from "moment";
// import UQTable            from "../../components/UQTable";
import UQTable            from "../../components/TableAndModal/UQTable";
import imageCompression   from "browser-image-compression";
import Swal               from "sweetalert2";

import 
{  
  postAddCategory, 
  postGetCategory, 
  postAddSubcategory, 
  postGetSubcategory, 
  postAddSubcategory2, 
  postGetSubcategory2, 
  postUpdateCategory, 
  postUpdateSubcategory, 
  postUpdateSubcategory2 
} from "../../references/url";

export default
{
  components: 
  {
      UQTable,
  },
  data:() =>(
  {
      moment: moment,

      // this is for tables
      table_category: 
      {
          title: "Categories Table",
          columns: 
          [
              {
                name: "category_image_path",
                label: "Category image",
                field: "category_image_path",
                align: "left",
                sortable: true,
              },
              {
                  name: "category_name",
                  label: "Category name ",
                  field: "category_name",
                  align: "left",
                  sortable: true,
              },
              {
                name: "date_created",
                label: "Date created",
                field: "date_created",
                align: "left",
                sortable: true,
              },
              {
                name: "status",
                label: "Status",
                field: "status",
                align: "left",
                sortable: true,
              },
              {
                name: "legalities",
                label: "Legalities",
                field: "legalities",
                align: "left",
                sortable: true,
              },

              { name: "action", label: "Action", field: "action", align: "center" },
          ],
          data: [],
      },
      table_subcategory: 
      {
          title: "Subcategories Table",
          columns: 
          [
              {
                name: "subcategory_image_path",
                label: "Subcategory image",
                field: "subcategory_image_path",
                align: "left",
                sortable: true,
              },
              {
                name: "subcategory_name",
                label: "Subcategory name",
                field: "subcategory_name",
                align: "left",
                sortable: true,
              },
              {
                  name: "category_name",
                  label: "Category name ",
                  field: "category_name",
                  align: "left",
                  sortable: true,
              },
              {
                name: "date_created",
                label: "Date created",
                field: "date_created",
                align: "left",
                sortable: true,
              },
              {
                name: "status",
                label: "Status",
                field: "status",
                align: "left",
                sortable: true,
              },

              { name: "action", label: "Action", field: "action", align: "center" },
          ],
          data: [],
      },
      table_subcategory2: 
      {
          title: "Subcategories2 Table",
          columns: 
          [   
              {
                name: "subcategory2_image_path",
                label: "Subcategory2 image",
                field: "subcategory2_image_path",
                align: "left",
                sortable: true,
              },
              {
                name: "subcategory2_name",
                label: "Subcategory2 name ",
                field: "subcategory2_name",
                align: "left",
                sortable: true,
              },
              {
                name: "subcategory_name",
                label: "Subcategory name",
                field: "subcategory_name",
                align: "left",
                sortable: true,
              },
              {
                  name: "category_name",
                  label: "Category name ",
                  field: "category_name",
                  align: "left",
                  sortable: true,
              },
              {
                name: "date_created",
                label: "Date created",
                field: "date_created",
                align: "left",
                sortable: true,
              },
              {
                name: "status",
                label: "Status",
                field: "status",
                align: "left",
                sortable: true,
              },

              { name: "action", label: "Action", field: "action", align: "center" },
          ],
          data: [],
      },

      // this is for add form
      add_category_form_data:
      {
        category_name: "",
        category_image_path: null,
        category_image: null,
        category_image_path_object: null,
      },
      add_subcategory_form_data:
      {
        category_name: "",
        subcategory_name: "",
        subcategory_image_path: null,
        subcategory_image: null,
        subcategory_image_path_object: null,
      },
      add_subcategory2_form_data:
      {
        category_name: "",
        subcategory_name: "",
        subcategory2_name: "",
        subcategory2_image_path: null,
        subcategory2_image: null,
        subcategory2_image_path_object: null,
      },

      // this is for add form
      update_category_form_data:
      {
        category_name: "",
        category_image_path: null,
        category_image: null,
        category_image_path_object: null,
      },
      update_subcategory_form_data:
      {
        category_name: "",
        subcategory_name: "",
        subcategory_image_path: null,
        subcategory_image: null,
        subcategory_image_path_object: null,
      },
      update_subcategory2_form_data:
      {
        category_name: "",
        subcategory_name: "",
        subcategory2_name: "",
        subcategory2_image_path: null,
        subcategory2_image: null,
        subcategory2_image_path_object: null,
      },

    // this is for add modal
    add_caterogy_modal: false,
    add_subcaterogy_modal: false,
    add_subcaterogy2_modal: false,

    selected: 'Category', // must be static
    options: ['Category', 'Subcategory', 'Subcategory2'], // must be static

    // this is use for add subcategory
    categories_options: ['Select Category'], // must be dynamic
    categories_selected: 'Select Category', // must be default

    // this is use for add subcategory2
    subcategories_options: ['Select Subcategory'], // must be dynamic
    subcategories_selected: 'Select Subcategory', // must be default

    // this is use for update modal
    update_category_modal: false,
    update_subcategory_modal: false,
    update_subcategory2_modal: false,

    // this is for enable and disable
    enable_and_disable_options: ['Enabled', 'Disabled'],
    enable_and_disable_selected: 'Enabled', // must be default

    data: [],
    legalities: 'no',
  }),
  async mounted()
  {
    await this.getCategory();
    await this.getSubcategory();
    await this.getSubcategory2();
  },
  methods:
  {
    async btnAddCategoryModal()
    {
      this.add_caterogy_modal = true;
    },
    async btnAddSubcategoryModal()
    {
      this.add_subcaterogy_modal = true;
    },
    async btnAddSubcategory2Modal()
    {
      this.add_subcaterogy2_modal = true;
    },

    // update modal
    async btnUpdateCategoryModal(category_data)
    {
      this.data                                                 = category_data;
      this.update_category_form_data.category_name              = this.data.category_name;
      this.update_category_form_data.category_image_path_object = `data:image/jpg;base64,${this.data.category_image_path}`;
      this.enable_and_disable_selected                          = this.data.status;
      this.legalities                                           = this.data.legalities.toLowerCase();
      this.update_category_modal                                = true;
    },
    async btnUpdateSubcategoryModal(subcategory_data)
    {
      this.data                                                       = subcategory_data;
      this.update_subcategory_form_data.category_name                 = this.data.category_name;
      this.update_subcategory_form_data.subcategory_name              = this.data.subcategory_name;
      this.update_subcategory_form_data.subcategory_image_path_object = `data:image/jpg;base64,${this.data.subcategory_image_path}`;
      this.enable_and_disable_selected                                = this.data.status;
      this.update_subcategory_modal                                   = true;
    },
    async btnUpdateSubcategory2Modal(subcategory2_data)
    {
      this.data                                                         = subcategory2_data;
      this.update_subcategory2_form_data.category_name                  = this.data.category_name;
      this.update_subcategory2_form_data.subcategory_name               = this.data.subcategory_name;
      this.update_subcategory2_form_data.subcategory2_name              = this.data.subcategory2_name;
      this.update_subcategory2_form_data.subcategory2_image_path_object = `data:image/jpg;base64,${this.data.subcategory2_image_path}`;
      this.enable_and_disable_selected                                  = this.data.status;
      this.update_subcategory2_modal                                    = true;
    },
      
    // upload File for Category
    async uploadFileCategory(files) 
    {
      try 
      {
        let maximumMbSize                                       = 10;
        this.add_category_form_data.category_image              = files.target.files[0];
        this.add_category_form_data.category_image_path_object  = URL.createObjectURL(
          event.target.files[0]
        );

        if (this.byteToMb(this.add_category_form_data.category_image.size) > maximumMbSize) 
        {
          this.add_category_form_data.category_image = null;
          this.$q.notify(
          {
            message: `<div style="color: red; font-weight: bold;"><i class="fas fa-exclamation-triangle" style="margin-right: 10px;"></i>Image must not exceed to ${maximumMbSize}mb.</div>`,
            position: "top",
            color: "white",
            html: true,
          });
          this.$refs.category_image_path_object.reset();
        } 
        else 
        {
          const options = 
          {
            maxSizeMB:        10,
            maxWidthOrHeight: 1920,
            useWebWorker:     true,
            onProgress:       this.imageCompressionProgress,
          };

          this.$q.loading.show();
          const compressedFile = await imageCompression(this.add_category_form_data.category_image, options);
          this.add_category_form_data.category_image = compressedFile;
          this.$q.loading.hide();
        }
      } 
      catch (error) 
      {
        console.log(error);
      }
    },
    
    // upload file for subcategory
    async uploadFileSubcategory(files) 
    {
      try 
      {
        let maximumMbSize                                           = 10;
        this.add_subcategory_form_data.subcategory_image            = files.target.files[0];

        this.add_subcategory_form_data.subcategory_image_path_object = URL.createObjectURL(
          event.target.files[0]
        );

        if (this.byteToMb(this.add_subcategory_form_data.subcategory_image.size) > maximumMbSize) 
        {
          this.add_subcategory_form_data.subcategory_image = null;

          this.$q.notify(
          {
            message: `<div style="color: red; font-weight: bold;"><i class="fas fa-exclamation-triangle" style="margin-right: 10px;"></i>Image must not exceed to ${maximumMbSize}mb.</div>`,
            position: "top",
            color: "white",
            html: true,
          });

          this.$refs.subcategory_image_path_object.reset();
        } 
        else 
        {
          const options = 
          {
            maxSizeMB:        10,
            maxWidthOrHeight: 1920,
            useWebWorker:     true,
            onProgress:       this.imageCompressionProgress,
          };

          this.$q.loading.show();
          const compressedFile = await imageCompression(this.add_subcategory_form_data.subcategory_image, options);
          this.add_subcategory_form_data.subcategory_image = compressedFile;
          this.$q.loading.hide();
        }
      } 
      catch (error) 
      {
        console.log(error);
      }
    },

    // upload file for subcategory2
    async uploadFileSubcategory2(files) 
    {
      try 
      {
        let maximumMbSize                                               = 10;
        this.add_subcategory2_form_data.subcategory2_image              = files.target.files[0];

        this.add_subcategory2_form_data.subcategory2_image_path_object  = URL.createObjectURL(
          event.target.files[0]
        );

        if (this.byteToMb(this.add_subcategory2_form_data.subcategory2_image.size) > maximumMbSize) 
        {
          this.add_subcategory2_form_data.subcategory2_image = null;

          this.$q.notify(
          {
            message: `<div style="color: red; font-weight: bold;"><i class="fas fa-exclamation-triangle" style="margin-right: 10px;"></i>Image must not exceed to ${maximumMbSize}mb.</div>`,
            position: "top",
            color: "white",
            html: true,
          });

          this.$refs.subcategory2_image_path_object.reset();
        } 
        else 
        {
          const options = 
          {
            maxSizeMB:        10,
            maxWidthOrHeight: 1920,
            useWebWorker:     true,
            onProgress:       this.imageCompressionProgress,
          };

          this.$q.loading.show();
          const compressedFile = await imageCompression(this.add_subcategory2_form_data.subcategory2_image, options);
          this.add_subcategory2_form_data.subcategory2_image = compressedFile;
          this.$q.loading.hide();
        }
      } 
      catch (error) 
      {
        console.log(error);
      }
    },
      
    // submit button for Add Category
    async addCategorySubmit() 
    {
      const fd = new FormData();

      if(this.add_category_form_data.category_image != null)
      {
        fd.append("path",                   "category");
        fd.append("category_name",          this.add_category_form_data.category_name);
        fd.append("legalities",             this.legalities);
        fd.append("categories_image_path",  this.add_category_form_data.category_image);

        // this.$q.loading.show();
        let add_caterogy = await this.$_post(postAddCategory, fd);
        console.log(add_caterogy);
        await this.getCategory();
        await this.getSubcategory();
        await this.getSubcategory2();
        // this.$q.loading.hide();

        if (add_caterogy.data.status == 'success') 
        {
          this.add_category_form_data.category_name               = "";
          this.legalities                                         = 'no';
          this.add_category_form_data.category_image              = null;
          this.add_category_form_data.category_image_path_object  = null;
          this.add_caterogy_modal                                 = false;
          Swal.fire({
            icon: "success",
            title: "Congrats...",
            text: "Successfully Create Category",
          });
        }  
      }
      else
      {
        this.add_caterogy_modal = false;
        Swal.fire({
          icon: "error",
          title: "Warning...",
          text: "You need to fill up all fields in order to proceed.",
        });
      }
    },
      
    // submit button for Add Subcategory
    async addSubcategorySubmit() 
    {
      const fd = new FormData();

      if(this.add_subcategory_form_data.subcategory_image != null)
      {
        fd.append("path",                     "subcategory");
        fd.append("category_name",            this.categories_selected);
        fd.append("subcategory_name",         this.add_subcategory_form_data.subcategory_name);
        fd.append("subcategories_image_path", this.add_subcategory_form_data.subcategory_image);

        let find_category = this.table_category.data.find( val => val.category_name == this.categories_selected );
        // console.log(find_category._id);

        fd.append("_id",                       find_category._id);

        // this.$q.loading.show();
        let add_subcaterogy = await this.$_post(postAddSubcategory, fd);
        console.log(add_subcaterogy);
        // await this.getSubcategory();
        await this.getCategory();
        await this.getSubcategory();
        await this.getSubcategory2();

        // this.$q.loading.hide();

        if (add_subcaterogy.data.status == 'success') 
        {
          this.categories_selected                                      = "Select Category";
          this.add_subcategory_form_data.subcategory_name               = "";
          this.add_subcategory_form_data.subcategory_image              = null;
          this.add_subcategory_form_data.subcategory_image_path_object  = null;
          this.add_subcaterogy_modal                                    = false;
          Swal.fire({
            icon: "success",
            title: "Congrats...",
            text: "Successfully Create Subcategory",
          });
        }  
      }
      else
      {
        this.add_subcaterogy_modal = false;
        Swal.fire({
          icon: "error",
          title: "Warning...",
          text: "You need to fill up all fields in order to proceed.",
        });
      }
    },

    // submit button for Add Subcategory2
    async addSubcategory2Submit() 
    {
      const fd = new FormData();

      if(this.add_subcategory2_form_data.subcategory2_image != null)
      {
        fd.append("path",                       "subcategory2");

        let find = this.table_subcategory.data.find( val => val.subcategory_name == this.subcategories_selected );
        // console.log(find);
        fd.append("category_name", find.category_name);

        fd.append("subcategory_name",           this.subcategories_selected);
        fd.append("subcategory2_name",          this.add_subcategory2_form_data.subcategory2_name);
        fd.append("subcategories2_image_path",  this.add_subcategory2_form_data.subcategory2_image);

        let x                 = this.table_category.data.map(x => x.subcategory);
        let y                 = x.reduce((a,b) => a.concat(b)); 
        let find_subcategory  = y.find( val => val.subcategory_name == this.subcategories_selected.toLowerCase() );
        let find_category     = this.table_category.data.find( val => val.category_name.toLowerCase() == find_subcategory.category_name.toLowerCase() );

        fd.append("_id",                        find_category._id);

        // this.$q.loading.show();
        let add_subcaterogy2 = await this.$_post(postAddSubcategory2, fd);
        console.log(add_subcaterogy2);
        // await this.getSubcategory2();
        await this.getCategory();
        await this.getSubcategory();
        await this.getSubcategory2();

        // this.$q.loading.hide();

        if (add_subcaterogy2.data.status == 'success') 
        {
          this.subcategories_selected                                     = "Select Subcategory";
          this.add_subcategory2_form_data.subcategory2_name               = "";
          this.add_subcategory2_form_data.subcategory2_image              = null;
          this.add_subcategory2_form_data.subcategory2_image_path_object  = null;
          this.add_subcaterogy2_modal                                     = false;
          Swal.fire({
            icon: "success",
            title: "Congrats...",
            text: "Successfully Create Subcategory2",
          });
        }  
      }
      else
      {
        this.add_subcaterogy2_modal = false;
        Swal.fire({
          icon: "error",
          title: "Warning...",
          text: "You need to fill up all fields in order to proceed.",
        });
      }
    },
      
    // this for get all category data
    async getCategory() 
    {
      this.$q.loading.show();
      let get_category            = await this.$_post(postGetCategory);
      if(get_category)
      { 
        this.table_category.data  = get_category.data.data.sort((a,b) => { return b.date_created - a.date_created });
        this.categories_options   = this.table_category.data.map( val => val.category_name );
        this.categories_options.unshift('Select Category'); 
      }
      // this.$q.loading.hide();
    },

    // this for get all subcategory data
    async getSubcategory() 
    {
      // this.$q.loading.show();
      let get_subcategory           = await this.$_post(postGetSubcategory);
      if(get_subcategory)
      {
        let x                       = get_subcategory.data.data.map(x => x.subcategory); 
        let y                       = (x.length != 0) ? x.reduce((a,b) => a.concat(b)) : [];
        this.table_subcategory.data = y.sort((a,b) => { return b.date_created - a.date_created });
        this.subcategories_options  = this.table_subcategory.data.map( val => val.subcategory_name );
        this.subcategories_options.unshift('Select Subcategory'); 
      }
      // this.$q.loading.hide();
    },

    // this for get all subcategory2 data
    async getSubcategory2() 
    {
      // this.$q.loading.show();
      let get_subcategory2            = await this.$_post(postGetSubcategory2);
      if(get_subcategory2)
      {
        let x                         = get_subcategory2.data.data.map(x => x.subcategory2); 
        let y                         = (x.length != 0) ? x.reduce((a,b) => a.concat(b)) : [];
        this.table_subcategory2.data  = y.sort((a,b) => { return b.date_created - a.date_created });
      }
      this.$q.loading.hide();
    },

      
    // update File for Category
    async updateFileCategory(files) 
    {
      try 
      {
        let maximumMbSize                                         = 10;
        this.update_category_form_data.category_image             = files.target.files[0];

        this.update_category_form_data.category_image_path_object = URL.createObjectURL(
          event.target.files[0]
        );

        if (this.byteToMb(this.update_category_form_data.category_image.size) > maximumMbSize) 
        {
          this.update_category_form_data.category_image = null;

          this.$q.notify(
          {
            message: `<div style="color: red; font-weight: bold;"><i class="fas fa-exclamation-triangle" style="margin-right: 10px;"></i>Image must not exceed to ${maximumMbSize}mb.</div>`,
            position: "top",
            color: "white",
            html: true,
          });

          this.$refs.category_image_path_object.reset();
        } 
        else 
        {
          const options = 
          {
            maxSizeMB:        10,
            maxWidthOrHeight: 1920,
            useWebWorker:     true,
            onProgress:       this.imageCompressionProgress,
          };

          this.$q.loading.show();
          const compressedFile = await imageCompression(this.update_category_form_data.category_image, options);
          this.update_category_form_data.category_image = compressedFile;
          this.$q.loading.hide();
        }
      } 
      catch (error) 
      {
        console.log(error);
      }
    },

    // update File for Subcategory
    async updateFileSubcategory(files) 
    {
      try 
      {
        let maximumMbSize                                               = 10;
        this.update_subcategory_form_data.subcategory_image             = files.target.files[0];

        this.update_subcategory_form_data.subcategory_image_path_object = URL.createObjectURL(
          event.target.files[0]
        );

        if (this.byteToMb(this.update_subcategory_form_data.subcategory_image.size) > maximumMbSize) 
        {
          this.update_subcategory_form_data.subcategory_image = null;

          this.$q.notify(
          {
            message: `<div style="color: red; font-weight: bold;"><i class="fas fa-exclamation-triangle" style="margin-right: 10px;"></i>Image must not exceed to ${maximumMbSize}mb.</div>`,
            position: "top",
            color: "white",
            html: true,
          });

          this.$refs.subcategory_image_path_object.reset();
        } 
        else 
        {
          const options = 
          {
            maxSizeMB:        10,
            maxWidthOrHeight: 1920,
            useWebWorker:     true,
            onProgress:       this.imageCompressionProgress,
          };

          this.$q.loading.show();
          const compressedFile = await imageCompression(this.update_subcategory_form_data.subcategory_image, options);
          this.update_subcategory_form_data.subcategory_image = compressedFile;
          this.$q.loading.hide();
        }
      } 
      catch (error) 
      {
        console.log(error);
      }
    },

    // update File for Subcategory2
    async updateFileSubcategory2(files) 
    {
      try 
      {
        let maximumMbSize                                                 = 10;
        this.update_subcategory2_form_data.subcategory2_image             = files.target.files[0];

        this.update_subcategory2_form_data.subcategory2_image_path_object = URL.createObjectURL(
          event.target.files[0]
        );

        if (this.byteToMb(this.update_subcategory2_form_data.subcategory2_image.size) > maximumMbSize) 
        {
          this.update_subcategory2_form_data.subcategory2_image = null;

          this.$q.notify(
          {
            message: `<div style="color: red; font-weight: bold;"><i class="fas fa-exclamation-triangle" style="margin-right: 10px;"></i>Image must not exceed to ${maximumMbSize}mb.</div>`,
            position: "top",
            color: "white",
            html: true,
          });

          this.$refs.subcategory2_image_path_object.reset();
        } 
        else 
        {
          const options = 
          {
            maxSizeMB:        10,
            maxWidthOrHeight: 1920,
            useWebWorker:     true,
            onProgress:       this.imageCompressionProgress,
          };

          this.$q.loading.show();
          const compressedFile = await imageCompression(this.update_subcategory2_form_data.subcategory2_image, options);
          this.update_subcategory2_form_data.subcategory2_image = compressedFile;
          this.$q.loading.hide();
        }
      } 
      catch (error) 
      {
        console.log(error);
      }
    },
      
    // submit button for Update Category
    async updateCategorySubmit() 
    {
      const fd                    = new FormData();
      fd.append("path",           "category");
      fd.append("category_name",  this.update_category_form_data.category_name);
      fd.append("_id",            this.data._id);
      
      fd.append("status",         this.enable_and_disable_selected);
      fd.append("legalities",         this.legalities);

      if(this.update_category_form_data.category_image != null)
      {
        fd.append("categories_image_path", this.update_category_form_data.category_image);
      }

      // this.$q.loading.show();

      let update_caterogy = await this.$_post(postUpdateCategory, fd);
      // console.log(update_caterogy);
      await this.getCategory();
      await this.getSubcategory();
      await this.getSubcategory2();

      // this.$q.loading.hide();

      if (update_caterogy.data.status == 'success') 
      {
        this.update_category_form_data.category_name              = "";
        this.legalities                                           = 'no';
        this.update_category_form_data.category_image             = null;
        this.update_category_form_data.category_image_path_object = null;
        this.update_category_modal                                = false;
        Swal.fire({
          icon: "success",
          title: "Congrats...",
          text: "Successfully Update Category",
        });
      }  
    },

    // submit button for Update Subcategory
    async updateSubcategorySubmit() 
    {
      const fd                      = new FormData();
      fd.append("path",             "subcategory");
      fd.append("category_name",    this.update_subcategory_form_data.category_name);
      fd.append("subcategory_name", this.update_subcategory_form_data.subcategory_name);
      fd.append("sub_key",          this.data.subcategory_name);

      let find_category = this.table_category.data.find( val => val.category_name == this.update_subcategory_form_data.category_name );

      fd.append("_id",    find_category._id);

      fd.append("status", this.enable_and_disable_selected);

      if(this.update_subcategory_form_data.subcategory_image != null)
      {
        fd.append("subcategories_image_path", this.update_subcategory_form_data.subcategory_image);
      }

      // this.$q.loading.show();
      let update_subcaterogy = await this.$_post(postUpdateSubcategory, fd);
      // console.log(update_subcaterogy);
      await this.getCategory();
      await this.getSubcategory();
      await this.getSubcategory2();
      // this.$q.loading.hide();

      if (update_subcaterogy.data.status == 'success') 
      {
        this.update_subcategory_form_data.category_name                 = "";
        this.update_subcategory_form_data.subcategory_name              = "";
        this.update_subcategory_form_data.subcategory_image             = null;
        this.update_subcategory_form_data.subcategory_image_path_object = null;
        this.update_subcategory_modal                                   = false;
        Swal.fire({
          icon: "success",
          title: "Congrats...",
          text: "Successfully Update Subcategory",
        });
      }  
    },

    // submit button for Update Subcategory2
    async updateSubcategory2Submit() 
    {
      const fd = new FormData();
      fd.append("path",               "subcategory2");
      fd.append("category_name",      this.update_subcategory2_form_data.category_name);
      fd.append("subcategory_name",   this.update_subcategory2_form_data.subcategory_name);
      fd.append("subcategory2_name",  this.update_subcategory2_form_data.subcategory2_name);
      fd.append("sub2_key",           this.data.subcategory2_name);

      let find_category = this.table_category.data.find( val => val.category_name == this.update_subcategory2_form_data.category_name );

      fd.append("_id",    find_category._id);

      fd.append("status", this.enable_and_disable_selected);

      if(this.update_subcategory2_form_data.subcategory2_image != null)
      {
        fd.append("subcategories2_image_path", this.update_subcategory2_form_data.subcategory2_image);
      }

      // this.$q.loading.show();
      let update_subcaterogy2 = await this.$_post(postUpdateSubcategory2, fd);
      // console.log(update_subcaterogy2);
      await this.getCategory();
      await this.getSubcategory();
      await this.getSubcategory2();
      // this.$q.loading.hide();

      if (update_subcaterogy2.data.status == 'success') 
      {
        this.update_subcategory2_form_data.category_name                  = "";
        this.update_subcategory2_form_data.subcategory_name               = "";
        this.update_subcategory2_form_data.subcategory2_name              = "";
        this.update_subcategory2_form_data.subcategory2_image             = null;
        this.update_subcategory2_form_data.subcategory2_image_path_object = null;
        this.update_subcategory2_modal                                    = false;
        Swal.fire({
          icon: "success",
          title: "Congrats...",
          text: "Successfully Update Subcategory2",
        });
      }  
    },
  },
}
</script>

<style>
.hide_me {
  display: none;
}

.show_me {
  display: block;
}
</style>
