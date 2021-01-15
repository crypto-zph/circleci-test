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
            label="ADD AVATAR"
            no-caps
            @click="avatarPopUp"
          />
        </div>
        <u-q-table
          :tbl_title="table.title"
          :tbl_columns="table.columns"
          :tbl_data="table.data"
          :pgntn_is_show="false"
        > 

        <template slot="table_button">
          <q-btn
                  style="background-color:#37CDE3;color:white"
                  icon-right="archive"
                  label="Export to csv"
                  no-caps
                  @click="exportTable"
                />
        </template>

          <template slot="table_rows" slot-scope="props" >
            <q-td key="avatar_image_path">
              <q-avatar>
                <img
                  :src="`http://localhost:4000/avatar/${props.data.gender}/${props.data.avatar_image_path}`"
                /> </q-avatar
            ></q-td>
            <q-td key="gender">{{ props.data.gender }}</q-td>
          </template>
        </u-q-table>
      </div>
    </div>
    <!-- content -->
    <q-dialog v-model="avatar" persistent>
      <q-card>
        <q-card-section class="card-add-user">
          <q-form @submit.prevent="handleSubmit" enctype="multipart/form-data">
            <div class="field q-mt-md">
              <label class="font-raleway">Gender :</label>
              <q-radio
                class="font-raleway"
                color="accent"
                v-model="gender"
                val="male"
                label="Male"
                :rules="[(val) => !!val]"
                selected
              />

              <q-radio
                class="font-raleway"
                color="accent"
                v-model="gender"
                val="female"
                label="Female"
                :rules="[(val) => !!val]"
              />
            </div>

            <div class="field q-mt-md">
              <label>Upload image</label>
              <div>
                <q-input
                  type="file"
                  v-model="form_data.avatar_image"
                  @change="uploadFile"
                  accept="image/jpeg, image/jpg"
                  class="q-mt-md"
                  dense
                  name="avatar_image_path"
                  borderless
                />
                <div
                  class="q-mr-xl"
                  v-if="form_data.avatar_image_path_object != null"
                >
                  <img
                    :src="form_data.avatar_image_path_object"
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
import { postAddAvatar, getAvatar } from "../../references/url";
import UQTable from "../../components/TableAndModal/UQTable";
import UQModal from "../../components/TableAndModal/UQModal";
import imageCompression from "browser-image-compression";
import Swal from "sweetalert2";
import moment   from 'moment';

export default {
  components: {
    UQTable,
    UQModal,
  },
  data: () => ({
    moment: moment,
    table: {
      title: "Avatar Creation",
      columns: [
        {
          name: "avatar_image_path",
          label: "AVATAR",
          field: "avatar_image_path",
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
      ],
      data: [],
    },
    is_submit_disable: false,
    gender: "male",
    form_data: {
      gender: "",
      avatar_image_path: null,
      avatar_image: null,
      avatar_image_path_object: null,
    },
    avatar: false,
  }),
  async mounted() {
    this.$q.loading.show();
    await this.getAllAvatar();
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
        this.form_data.avatar_image = files.target.files[0];

        this.form_data.avatar_image_path_object = URL.createObjectURL(
          event.target.files[0]
        );
        if (this.byteToMb(this.form_data.avatar_image.size) > maximumMbSize) {
          this.form_data.avatar_image = null;
          this.$q.notify({
            message: `<div style="color: red; font-weight: bold;"><i class="fas fa-exclamation-triangle" style="margin-right: 10px;"></i>Image must not exceed to ${maximumMbSize}mb.</div>`,
            position: "top",
            color: "white",
            html: true,
          });
          this.$refs.avatar_image_path_object.reset();
        } else {
          const options = {
            maxSizeMB: 10,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
            onProgress: this.imageCompressionProgress,
          };
          this.$q.loading.show();
          const compressedFile = await imageCompression(
            this.form_data.avatar_image,
            options
          );
          this.form_data.avatar_image = compressedFile;
          this.$q.loading.hide();
        }
    
    },

    async handleSubmit() {
              this.$q.loading.show();
            if(this.form_data.avatar_image == null){
              this.avatar = false;
              this.form_data.avatar_image = null;
              this.form_data.avatar_image_path_object = null;
              Swal.fire({
              icon: "error",
              title: "Oppps...",
              text: "Error",
              });
            } else {
              this.form_data.gender = this.gender.toUpperCase();
              const fd = new FormData();
              fd.append("gender", this.form_data.gender);
              fd.append("avatar_image_path", this.form_data.avatar_image);
              let res = await this.$_post(postAddAvatar, fd);
              if (res.status == 200) {
              this.avatar = false;
              this.gender = "male";
              this.form_data.avatar_image = null;
              this.form_data.avatar_image_path_object = null;
              await this.getAllAvatar()
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

    async getAllAvatar() {
      let res = await this.$_post(getAvatar);
      if (res.status == 200) {
        this.table.data = res.data;
        console.log(this.table.data);
      } else if (res.data.status == "error") {
        console.error(res.data.message);
      }
      //  return res.data;
    },
    async avatarPopUp() {
      this.avatar = true;
    },
    cancelHandler() {
      this.avatar = false;
      this.form_data.avatar_image_path_object = null;
    },
    exportTable(){
      alert("Hi")
    }
  },
};
</script>