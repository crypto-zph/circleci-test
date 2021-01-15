<template>
  <div>
    <div class="q-ma-lg">
      <div>
          <div class="text-center q-mb-md">
           <q-btn
            flat
            slot="btn"
            class="q-mr-lg"
            style="background-color: #8156C6; color:white;"
            icon-right="add"
            rounded
            label="ADD COVER PHOTO"
            no-caps
            @click="coverPopUp"
          />
        </div>
        <u-q-table
          :tbl_title="table.title"
          :tbl_columns="table.columns"
          :tbl_data="table.data"
          :pgntn_is_show="false"
        >
          <template slot="table_rows" slot-scope="props">
            <q-td key="cover_photo_path">

                <img style="width: 350px; height: 50px;"
                  :src="`http://localhost:4000/cover-photo/${props.data.cover_photo_path}`"
                /> 
            </q-td>
            <!-- <q-td key="gender">{{ props.data.gender }}</q-td> -->
          </template>
        </u-q-table>
      </div>
    </div>
    <!-- content -->
    <q-dialog v-model="cover_photo" persistent>
      <q-card>
        <q-card-section class="card-add-user">
          <q-form @submit.prevent="handleSubmit" enctype="multipart/form-data">


            <div class="field q-mt-md">
              <label>Upload image</label>
              <div>
                <q-input
                  type="file"
                  v-model="form_data.cover_photo"
                  @change="uploadFile"
                  accept="image/jpeg, image/jpg"
                  class="q-mt-md"
                  dense
                  name="cover_photo_path"
                  borderless
                />
                <div
                  class="q-mr-xl"
                  v-if="form_data.cover_photo_path_object != null"
                >
                  <img
                    :src="form_data.cover_photo_path_object"
                    style="width: 200px; height: 200px; border-radius: 10px"
                  />
                </div>
              </div>
            </div>

            <div class="q-mt-lg">
              <q-btn type="submit" color="primary" unelevated class="full-width"
                >Upload</q-btn
              >
            </div>
            <div class="q-mt-sm">
              <q-btn
                type="button"
                @click="cancelHandler"
                color="primary"
                outline
                class="full-width"
                >Cancel</q-btn
              >
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { getCoverPhoto, postAddCoverPhoto } from "../../references/url";
import UQTable from "../../components/TableAndModal/UQTable";
import UQModal from "../../components/TableAndModal/UQModal";
import imageCompression from "browser-image-compression";
import Swal from "sweetalert2";

export default {
  components: {
    UQTable,
    UQModal,
  },
  data: () => ({
    table: {
      title: "Cover Photo Creation",
      columns: [
        {
          name: "cover_photo_path",
          label: "COVER PHOTO",
          field: "cover_photo_path",
          align: "left",
          sortable: true,
        },
        // {
        //   name: "gender",
        //   label: "GENDER",
        //   field: "gender",
        //   align: "left",
        //   sortable: true,
        // },
      ],
      data: [],
    },
    is_submit_disable: false,
    form_data: {
      cover_photo_path: null,
      cover_photo: null,
      cover_photo_path_object: null,
    },
    cover_photo: false,
  }),
  async mounted() {
    this.$q.loading.show();
    await this.getAllCoverPhoto();
    this.$q.loading.hide();
  },
  methods: {
    byteToMb(byte) {
      const megabyte = 0.000001;
      return byte * megabyte;
    },
    async imageCompressionProgress(progress) {
      this.is_submit_disable = progress < 100 ? true : false;
    },

    async uploadFile(files) {
        let maximumMbSize = 10;
        this.form_data.cover_photo = files.target.files[0];

        this.form_data.cover_photo_path_object = URL.createObjectURL(
          event.target.files[0]
        );
        if (this.byteToMb(this.form_data.cover_photo.size) > maximumMbSize) {
          this.form_data.cover_photo = null;
          this.$q.notify({
            message: `<div style="color: red; font-weight: bold;"><i class="fas fa-exclamation-triangle" style="margin-right: 10px;"></i>Image must not exceed to ${maximumMbSize}mb.</div>`,
            position: "top",
            color: "white",
            html: true,
          });
          this.$refs.cover_photo_path_object.reset();
        } else {
          const options = {
            maxSizeMB: 10,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
            onProgress: this.imageCompressionProgress,
          };
          this.$q.loading.show();
          const compressedFile = await imageCompression(
            this.form_data.cover_photo,
            options
          );
          this.form_data.cover_photo = compressedFile;
          this.$q.loading.hide();
        }
    },

    async handleSubmit() {
        this.$q.loading.show();
        if(this.form_data.cover_photo == null){
          this.cover_photo = false;
          this.form_data.cover_photo = null;
          this.form_data.cover_photo_path_object = null;
          Swal.fire({
          icon: "error",
          title: "Oppps...",
          text: "Error",
          });
        } else {
            const fd = new FormData();
            fd.append("cover_photo_path", this.form_data.cover_photo);
            let res = await this.$_post(postAddCoverPhoto, fd);
            if (res.status == 200) {
            this.cover_photo = false;
            this.form_data.cover_photo = null;
            this.form_data.cover_photo_path_object = null;
            await this.getAllCoverPhoto()
            this.$q.loading.hide();
            Swal.fire({
              icon: "success",
              title: "Congrats...",
              text: "Successfully Uploaded",
            });
          } 
        }
      this.$q.loading.hide();
    },

    async getAllCoverPhoto() {
      let res = await this.$_post(getCoverPhoto);
      if (res.status == 200) {
        this.table.data = res.data;
      } else if (res.data.status == "error") {
        console.error(res.data.message);
      }
    },
    async coverPopUp() {
      this.cover_photo = true;
    },
    cancelHandler() {
      this.cover_photo = false;
      this.form_data.cover_photo_path_object = null;
    },
  },
};
</script>