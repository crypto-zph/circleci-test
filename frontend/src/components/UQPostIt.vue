<template>
  <div class="sell__container">
    <!-- -----------------Step One------------------------------------ -->
    <q-stepper
      v-model="step"
      vertical
      done-color="warning"
      active-color="purple"
      animated
    >
      <q-step :name="1" title="Step 1" icon="settings" :done="step > 1">
        <h2 class="title sell__title text-center">
          <span class="title__bg font-rubik-title">BASIC INFORMATION</span>
        </h2>

        <div class="stepper__container">
          <q-item-section style="padding: 20px 0">
            <q-item-label overline class="text-bold"
              >PRODUCT IMAGES</q-item-label
            >
          </q-item-section>
          <!-- <q-uploader
            square
            flat
            bordered
            multiple
            style="width: 100%"
            v-model="form_data.item_image"
            accept=".jpg, image/*"
            max-file-size="1000000"
            max-files="5"
            @rejected="onRejected"
            @added="onFileChange"
            @removed="onRemoved"
          /> -->
          <q-file
            v-model="form_data.item_image"
            outlined
            multiple
            append
            color="accent"
            accept=".jpg, image/*"
            max-file-size="1000000"
            max-files="5"
            @input="onFileChange"
            @rejected="onRejected"
          >
            <template v-slot:append>
              <q-icon name="attach_file" />
            </template>
          </q-file>
          <div
            class="text-center row"
            style="overflow: auto; height: 400px"
            v-if="form_data.item_image.length != 0"
          >
            <div
              v-for="(imgs, i) in images"
              :key="i"
              style="position: relative"
            >
              <div>
                <div style="position: absolute; top: 10px; right: 10px">
                  <q-btn
                    size="sm"
                    round
                    color="accent"
                    icon="fas fa-times"
                    @click="onRemoved(i)"
                  >
                    <q-tooltip content-class="bg-secondary">
                      Remove File
                    </q-tooltip>
                  </q-btn>
                </div>
                <img class="q-ma-xs" :src="imgs" style="width: 100%" />
              </div>
            </div>
          </div>
          <q-item-section style="padding: 20px 0">
            <q-item-label overline class="text-bold">PRODUCT NAME</q-item-label>
          </q-item-section>
          <q-input
            color="accent"
            outlined
            v-model="form_data.item_name"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type Product Name',
            ]"
          />

          <q-item-section style="padding: 20px 0">
            <q-item-label overline class="text-bold"
              >ESCROWED DURATION (DAYS)</q-item-label
            >
          </q-item-section>
          <q-input
            type="number"
            color="accent"
            outlined
            v-model="form_data.escrow_duration"
            hint="ex. 3 (escrowed item maximum of 3 days)"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Please type Escrowed Duration',
            ]"
          />

          <q-item-section style="padding: 20px 0">
            <q-item-label overline class="text-bold">CATEGORY</q-item-label>
          </q-item-section>
          <q-select
            color="accent"
            outlined
            v-model="form_data.item_category"
            @input="changeSubCategory"
            :options="category_options"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please select Category',
            ]"
          />

          <div v-if="form_data.has_legalities">
            <q-item-section style="padding: 20px 0">
              <q-item-label overline class="text-bold"
                >ATTACH FILE FOR LEGALITIES</q-item-label
              >
            </q-item-section>

            <q-file
              outlined
              multiple
              append
              color="accent"
              v-model="form_data.legalities"
              @input="onFileChangeLegalities"
              max-file-size="1000000"
              max-files="10"
              @rejected="onRejected"
            >
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
          <div
            class="text-center row"
            style="overflow: auto; height: 400px"
            v-if="form_data.legalities.length != 0"
          >
            <div
              v-for="(files, i) in legalities"
              :key="i"
              style="position: relative"
            >
              <div>
                <div style="position: absolute; top: 10px; right: 10px">
                  <q-btn
                    size="sm"
                    round
                    color="accent"
                    icon="fas fa-times"
                    @click="onRemovedLegalities(i)"
                  >
                    <q-tooltip content-class="bg-secondary">
                      Remove File
                    </q-tooltip>
                  </q-btn>
                </div>
                <img class="q-ma-xs" :src="files" style="width: 100%" />
              </div>
            </div>
          </div>

          <div v-if="form_data.item_category != ''">
            <q-item-section style="padding: 20px 0">
              <q-item-label overline class="text-bold"
                >SUB CATEGORY</q-item-label
              >
            </q-item-section>
            <q-select
              color="accent"
              outlined
              v-model="form_data.item_sub_category"
              @input="changeSubCategory2"
              :options="sub_category_options"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Please select Sub Category',
              ]"
            />
          </div>

          <div
            v-if="
              form_data.item_sub_category != '' &&
              sub_category2_options.length !== 0
            "
          >
            <q-item-section style="padding: 20px 0">
              <q-item-label overline class="text-bold"
                >SUB CATEGORY 2</q-item-label
              >
            </q-item-section>
            <q-select
              color="accent"
              outlined
              v-model="form_data.item_sub_category2"
              :options="sub_category2_options"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Please select Sub Category 2',
              ]"
            />
          </div>

          <q-stepper-navigation class="text-right">
            <q-btn @click="validateStepOne" color="accent" label="Continue" />
          </q-stepper-navigation>
        </div>
      </q-step>

      <!-- -----------------Step Two------------------------------------ -->
      <q-step
        :name="2"
        title="Step 2"
        icon="create_new_folder"
        :done="step > 2"
      >
        <h2 class="title sell__title text-center">
          <span class="title__bg font-rubik-title">DETAILED DESCRIPTION</span>
        </h2>

        <div class="stepper__container">
          <q-item-section style="padding: 20px 0">
            <q-item-label overline class="text-bold">LOCATION</q-item-label>
          </q-item-section>
          <q-input
            color="accent"
            outlined
            v-model="form_data.location"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type Location',
            ]"
          />

          <q-checkbox
            v-model="form_data.is_garage_sale"
            label="Garage Sale"
            color="accent"
          />
          <q-item-section
            style="padding: 20px 0"
            v-if="form_data.is_garage_sale == true"
          >
            <q-item-label overline class="text-bold"
              >GARAGE SALE %</q-item-label
            >
          </q-item-section>
          <q-input
            type="number"
            v-if="form_data.is_garage_sale == true"
            color="accent"
            outlined
            v-model="form_data.garage_sale_percentage"
            lazy-rules
          />

          <q-item-section style="padding: 20px 0">
            <q-item-label overline class="text-bold">PERFORMANCE</q-item-label>
          </q-item-section>
          <q-select
            color="accent"
            outlined
            v-model="form_data.item_performance"
            :options="performance_options"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please select Performance',
            ]"
          />

          <q-item-section style="padding: 20px 0">
            <q-item-label overline class="text-bold">CONDITION</q-item-label>
          </q-item-section>
          <q-select
            color="accent"
            outlined
            v-model="form_data.item_condition"
            :options="condition_options"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please select Condition',
            ]"
          />

          <q-item-section style="padding: 20px 0">
            <q-item-label overline class="text-bold">CAPTION</q-item-label>
          </q-item-section>
          <q-input
            color="accent"
            outlined
            v-model="form_data.caption"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Please type Caption']"
          />

          <q-item-section style="padding: 20px 0">
            <q-item-label overline class="text-bold">DESCRIPTION</q-item-label>
          </q-item-section>
          <q-editor
            v-model="form_data.item_description"
            :definitions="{
              bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' },
            }"
          />
          <q-stepper-navigation class="text-right">
            <q-btn @click="validateStepTwo" color="accent" label="Continue" />
            <q-btn flat @click="step = 1" label="Back" class="q-ml-sm" />
          </q-stepper-navigation>
        </div>
      </q-step>

      <!-- -----------------Step Three------------------------------------ -->
      <q-step title="Step 3" :name="3" icon="add_comment">
        <h2 class="title sell__title text-center">
          <span class="title__bg font-rubik-title">PRICE</span>
        </h2>
        <div class="stepper__container">
          <q-item-section style="padding: 20px 0">
            <q-item-label overline class="text-bold">USD PRICE</q-item-label>
          </q-item-section>
          <q-input
            color="accent"
            outlined
            v-model="form_data.item_price.USD"
            @input="convertFromUSD"
            type="number"
          />
          <q-item-section style="padding: 20px 0">
            <q-item-label overline class="text-bold">BRT PRICE</q-item-label>
          </q-item-section>
          <q-input
            color="accent"
            outlined
            v-model="form_data.item_price.BRT"
            @input="convertFromBRT"
            type="number"
          />
          <q-item-section style="padding: 20px 0">
            <q-item-label overline class="text-bold">PHP PRICE</q-item-label>
          </q-item-section>
          <q-input
            color="accent"
            outlined
            v-model="form_data.item_price.PHP"
            @input="convertFromOwnCurrency"
            type="number"
          />

          <q-checkbox
            v-if="has_featured_product_slot"
            v-model="form_data.is_featured_product"
            label="Feature this Product?"
            color="accent"
          />

          <div v-if="form_data.is_featured_product">
            <q-item-section style="padding: 20px 0">
              <q-item-label overline class="text-bold"
                >SET DATE & TIME</q-item-label
              >
            </q-item-section>
            <q-input
              color="accent"
              filled
              v-model="form_data.featured_product_duration_to"
            >
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="form_data.featured_product_duration_to"
                      mask="YYYY-MM-DD HH:mm"
                      @input="onDateChange"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>

              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time
                      v-model="form_data.featured_product_duration_to"
                      mask="YYYY-MM-DD HH:mm"
                      format24h
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <!-- <q-item-section style="padding: 20px 0;">
              <q-item-label overline class="text-bold">PRICE</q-item-label>
            </q-item-section>
            <q-input color="accent" outlined type="number" readonly /> -->
          </div>

          <q-stepper-navigation class="text-right">
            <q-btn @click="submitForm" color="accent" label="Finish" />
            <q-btn flat @click="step = 2" label="Back" class="q-ml-sm" />
          </q-stepper-navigation>
        </div>
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
import {
  postItem,
  postUpload,
  getConversion,
  getSellerIdentification,
  postGetCategory,
  postGetSubcategory,
  getFeaturedProductSlots,
  postUploadLegalities,
} from "../references/url";

import moment from "moment";

export default {
  data: () => ({
    step: 1,
    images: [],
    legalities: [],
    category_options: [],
    sub_category_options: [],
    sub_category2_options: [],
    performance_options: ["Good", "Very Good", "Excellent"],
    condition_options: ["Used", "New"],
    own_currency: "",
    has_featured_product_slot: true,
    form_data: {
      seller_id: "",
      seller_avatar: "",
      seller_username: "",
      seller_first_name: "",
      seller_last_name: "",
      buyer_id: "",
      buyer_first_name: "",
      buyer_last_name: "",
      item_name: "",
      item_category: "",
      item_sub_category: "",
      item_sub_category2: "",
      caption: "",
      is_garage_sale: false,
      garage_sale_percentage: 0,
      is_featured_product: false,
      featured_product_duration_from: "",
      featured_product_duration_to: "",
      item_performance: "",
      item_condition: "",
      item_image: [],
      item_description: "",
      location: "",
      item_price: {
        BRT: "",
        PHP: "",
        USD: "",
      },
      escrow_duration: "",
      has_legalities: false,
      legalities: [],
    },
  }),
  async mounted() {
    await this.isUserLoggedIn();
    await this.fetchSellerIdentification();
    await this.getCategories();
    await this.getFeaturedProductSlots();
    /* let user_loc_info = await this.$_locateUser();
    this.form_data.location = user_loc_info.data.country_name;
    this.own_currency = user_loc_info.data.currency; */
  },
  methods: {
    onDateChange(value) { // hindi final
      let date_picked = Date.parse(value);
      let previous_date = Date.parse(
        moment(Date.now()).subtract(1, "days").format("YYYY-MM-DD HH:mm")
      );

      console.log(date_picked);
      console.log(previous_date);

      if (date_picked < previous_date) {
        alert("hindi pwede");
        this.form_data.featured_product_duration_to = "";
      } else {
        console.log(value);
        this.form_data.featured_product_duration_to = value;
      }
    },
    onFileChange(files) {
      /* if (this.form_data.item_image.length > 0)
        {
          for (let i = 0; i < files.length; i++) {
            this.form_data.item_image[0].push(files[i]);
          }
        }
        else
        {
          this.form_data.item_image.push(files);
        } */
      this.images = [];
      this.form_data.item_image = files;
      for (let i = 0; i < files.length; i++) {
        let image = URL.createObjectURL(files[i]);
        this.images.push(image);
      }
    },
    onFileChangeLegalities(files) {
      this.legalities = [];
      this.form_data.legalities = files;
      console.log(this.form_data.legalities);

      for (let i = 0; i < files.length; i++) {
        console.log(files[i].type);
        if (files[i].type == "image/jpeg" || files[i].type == "image/png") {
          let image = URL.createObjectURL(files[i]);
          this.legalities.push(image);
        } else if (files[i].type == "application/pdf") {
          this.legalities.push(
            "https://cdn4.iconfinder.com/data/icons/file-extensions-1/64/pdfs-512.png"
          );
        } else if (
          files[i].type ==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          this.legalities.push(
            "https://cdn.iconscout.com/icon/free/png-512/docx-file-14-504256.png"
          );
        } else {
          this.legalities.push(
            "https://img2.pngio.com/default-file-icon-lozengue-filetype-icons-softiconscom-file-icon-png-512_512.png"
          );
        }
      }

    },
    /* onRemoved(files)
    {
      let remaining_image = this.form_data.item_image[0].filter(data => data.name != files[0].name);
      this.form_data.item_image[0] = remaining_image;
    }, */
    async onRemoved(index) {
      this.images = [];
      let remaining_image = this.form_data.item_image.filter(
        (data) => data.name != this.form_data.item_image[index].name
      );
      this.form_data.item_image = remaining_image;

      let images = this.form_data.item_image;

      for (let i = 0; i < images.length; i++) {
        let image = URL.createObjectURL(images[i]);
        this.images.push(image);
      }

    },
    async onRemovedLegalities(index) {
      this.legalities = [];
      let remaining_image = this.form_data.legalities.filter(
        (data) => data.name != this.form_data.legalities[index].name
      );
      this.form_data.legalities = remaining_image;

      let legalities = this.form_data.legalities;

      for (let i = 0; i < legalities.length; i++) {
        let file = URL.createObjectURL(legalities[i]);
        this.legalities.push(file);
      }

    },
    async fetchSellerIdentification() {
      let id = {
        seller_id: this.form_data.seller_id,
      };

      let seller = await this.$_post(getSellerIdentification, id);

      let avatar = seller.data.seller[0];
      let avatar_gender = avatar.gender;
      let avatar_path = avatar.avatar_path;

      this.form_data.seller_avatar = avatar_path;
      this.form_data.seller_first_name = avatar.first_name;
      this.form_data.seller_last_name = avatar.last_name;
      this.form_data.seller_username = avatar.username;
    },
    async getCategories() {
      let category = await this.$_post(postGetCategory);
      let categories = category.data.data;

      console.log(categories);

      for (let i = 0; i < categories.length; i++) {
        this.category_options.push(categories[i].category_name);
      }
    },
    async submitForm() {
      if (
        this.form_data.item_price.USD == "" ||
        this.form_data.item_price.BRT == "" ||
        this.form_data.item_price.PHP == ""
      ) {
        this.$q.dialog({
          title: `Error Message`,
          message: "Please complete the form to Continue",
        });
      } else if (
        this.form_data.is_featured_product == true &&
        this.form_data.featured_product_duration_to == ""
      ) {
        this.$q.dialog({
          title: `Error Message`,
          message: "Please complete the form to Continue",
        });
      } else {
        const formData = new FormData();
        const fd = new FormData();
        const image = this.form_data.item_image;
        const legalities = this.form_data.legalities;

        for (let i = 0; i < image.length; i++) {
          formData.append("image", image[i]);
        }

        let upload = await this.$_post(postUpload, formData);

        this.form_data.item_image = upload.data.images;

        for (let i = 0; i < legalities.length; i++) {
          fd.append("legalities", legalities[i]);
        }

        let uploadLegalities = await this.$_post(postUploadLegalities, fd);

        this.form_data.legalities = uploadLegalities.data.legalities;

        if (upload.status == 200 && uploadLegalities.status == 200) {
          this.$q.loading.show();
          let addItem = await this.$_post(postItem, this.form_data);
          if (addItem) {
            this.$q.dialog({
              title: `Success Message`,
              message: "Item Add Successful",
            });
          }
          this.$q.loading.hide();
          this.submitSuccess();
        }
      }
    },
    async convertFromUSD(value) {
      let conversion = await this.$_post(getConversion);
      let convert = conversion.data;

      let BRT = value * (convert.USD / convert.XAU);
      let PHP = value * (convert.USD / convert.PHP);

      this.form_data.item_price.BRT = parseFloat(BRT).toFixed(9);
      this.form_data.item_price.PHP = parseFloat(PHP).toFixed(2);
    },
    async convertFromBRT(value) {
      let conversion = await this.$_post(getConversion);
      let convert = conversion.data;

      let USD = value * (convert.XAU / convert.USD);
      let PHP = value * (convert.XAU / convert.PHP);

      this.form_data.item_price.USD = parseFloat(USD).toFixed(2);
      this.form_data.item_price.PHP = parseFloat(PHP).toFixed(2);
    },
    async convertFromOwnCurrency(value) {
      let conversion = await this.$_post(getConversion);
      let convert = conversion.data;
      let currency = convert.PHP;

      /* if (this.own_currency == 'PHP')
        {
          currency = convert.PHP;
        } */

      let USD = value * (currency / convert.USD);
      let BRT = value * (currency / convert.XAU);

      this.form_data.item_price.USD = parseFloat(USD).toFixed(2);
      this.form_data.item_price.BRT = parseFloat(BRT).toFixed(9);
    },
    onRejected(rejectedEntries) {
      this.$q.notify({
        type: "negative",
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
      });
    },
    async validateStepOne() {
      if (
        this.form_data.item_name == "" ||
        this.form_data.item_category == "" ||
        this.form_data.item_image.length == 0
      ) {
        this.$q.dialog({
          title: `Error Message`,
          message: "Please complete the form to Continue",
        });
      } else if (
        this.sub_category_options.length > 0 &&
        this.form_data.item_sub_category == ""
      ) {
        this.$q.dialog({
          title: `Error Message`,
          message: "Please complete the form to Continue",
        });
      } else if (
        this.sub_category2_options.length > 0 &&
        this.form_data.item_sub_category2 == ""
      ) {
        this.$q.dialog({
          title: `Error Message`,
          message: "Please complete the form to Continue",
        });
      }
      else if (this.form_data.has_legalities && this.form_data.legalities.length < 0) {
        this.$q.dialog({
          title: `Error Message`,
          message: "Please complete the form to Continue",
        });
      } else {
        this.step = 2;
      }
    },
    async validateStepTwo() {
      let description = this.form_data.item_description;
      description = description.replace(/(^\s*)|(\s*$)/gi, "");
      description = description.replace(/[ ]{2,}/gi, " ");
      description = description.replace(/\n /, "\n");

      if (
        this.form_data.item_description == "" ||
        this.form_data.location == "" ||
        this.form_data.item_performance == "" ||
        this.form_data.item_condition == "" ||
        this.form_data.caption == ""
      ) {
        this.$q.dialog({
          title: `Error Message`,
          message: "Please complete the form to Continue",
        });
      } else if (
        this.form_data.is_garage_sale == true &&
        this.form_data.garage_sale_percentage == ""
      ) {
        this.$q.dialog({
          title: `Error Message`,
          message: "Please complete the form to Continue",
        });
      } else if (description.split(" ").length > 500) {
        this.$q.dialog({
          title: `Error Message`,
          message: `Your description must be 500 words or below. Current Words: ${
            description.split(" ").length
          }`,
        });
      } else {
        this.step = 3;
      }
    },
    async changeSubCategory(value) {
      this.form_data.item_sub_category = "";
      this.form_data.item_sub_category2 = "";

      let category = {
        category: value,
      };

      let sub_categ = [];

      let sub_category = await this.$_post(postGetSubcategory, category);
      let sub_categories = sub_category.data.data;

      console.log(sub_categories);

      for (let i = 0; i < sub_categories.length; i++) {
        if (sub_categories[i].category_name == value.toLowerCase()) {
          if (sub_categories[i].legalities == "yes") {
            this.form_data.has_legalities = true;
          } else {
            this.form_data.has_legalities = false;
          }

          for (let j = 0; j < sub_categories[i].subcategory.length; j++) {
            sub_categ.push(sub_categories[i].subcategory[j].subcategory_name);
          }
        }
      }

      this.sub_category_options = sub_categ;
    },
    async changeSubCategory2(value) {
      this.form_data.item_sub_category2 = "";

      let sub_category = {
        category: this.form_data.item_category.toLowerCase(),
      };

      let sub_categ2 = [];

      let sub_category2 = await this.$_post(postGetSubcategory, sub_category);
      let sub_categories2 = sub_category2.data.data;

      for (let counter = 0; counter < sub_categories2.length; counter++) {
        for (let i = 0; i < sub_categories2[counter].subcategory2.length; i++) {
          let sub_category2_filter = sub_categories2[counter].subcategory2[i];
          if (
            sub_category2_filter.category_name == sub_category.category &&
            sub_category2_filter.subcategory_name == value.toLowerCase()
          ) {
            sub_categ2.push(
              await this.capitalize(sub_category2_filter.subcategory2_name)
            );
          }
        }
      }

      this.sub_category2_options = sub_categ2;

      console.log(this.sub_category2_options);
    },
    async capitalize(word) {
      return word.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    },
    async submitSuccess() {

      this.form_data.item_name = "";
      this.form_data.item_category = "";
      this.form_data.item_sub_category = "";
      this.form_data.item_sub_category2 = "";
      this.form_data.is_garage_sale = false;
      this.form_data.garage_sale_percentage = 0;
      this.form_data.caption = "";
      this.form_data.item_performance = "";
      this.form_data.item_condition = "";
      this.form_data.item_image = [];
      this.form_data.item_description = "";
      this.form_data.item_price.USD = "";
      this.form_data.item_price.BRT = "";
      this.form_data.item_price.PHP = "";
      this.form_data.is_featured_product = false;
      this.form_data.featured_product_duration_from = "";
      this.form_data.featured_product_duration_to = "";
      this.form_data.escrow_duration = "";
      this.form_data.legalities = [];

      this.step = 1;
      
    },
    async isUserLoggedIn() {
      let user = await this.$_isUserAuthenticated();
      console.log(user);
      if (user.data.status == "not authenticated") {
        this.$router.push({ name: "front_login" });
      } else if (user.data.status == "authenticated") {
        let user_data = user.data.user;
        this.form_data.seller_id = user_data._id;
      }
    },

    async getFeaturedProductSlots() { // chi
      let slots = await this.$_get(getFeaturedProductSlots);
      slots = slots.data.count;
      console.log(slots);
      if (slots == 0) {
        this.has_featured_product_slot = false;
      }
      console.log(this.has_featured_product_slot);
    },
  },
};
</script>