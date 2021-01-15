// Documentation Only

<template>
  <div>
    <!-- content -->
    <div class="content text-left">
      <q-form>
        <div class="font-raleway q-pt-md color-info">
          <b>User Name</b>
        </div>
        <q-field class="input__mobile">
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">
              <!-- {{ $user_info.full_name }} -->
              {{ container_user.username }}
            </div>
          </template>
        </q-field>

        <div class="font-raleway q-pt-md color-info">
          <b>Email Address</b>
        </div>
        <q-field class="input__mobile">
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">
              <!-- {{ $user_info.full_name }} -->
              {{ container_user.email }}
            </div>
          </template>
        </q-field>

        <div class="font-raleway q-pt-md color-info">
          <b>Gender</b>
        </div>
        <q-field class="input__mobile">
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">
              <!-- {{ $user_info.kyc.gender }} -->
              {{ container_user.gender }}
            </div>
          </template>
        </q-field>

        <div class="font-raleway q-pt-md color-info">
          <b>Address</b>
        </div>
        <q-field class="input__mobile">
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">
              <!-- {{ $user_info.kyc.address }} -->
              MANDALUYONG
            </div>
          </template>
        </q-field>
        <div class="q-pt-md">
          <div class="font-raleway q-pt-md color-info">
            <b>Ratings</b>
          </div>
          <div class="text-center" style="font-size: 50px; font-weight: bolder">
            {{ rate2 }}
          </div>
          <div class="text-center">
            <q-rating
              v-model="rate2"
              max="5"
              size="3em"
              color="yellow"
              icon="star_border"
              icon-selected="star"
              icon-half="star_half"
              no-dimming
              readonly
            />
          </div>
          <div class="text-center">Average Rating</div>
        </div>

        <div class="q-pt-md">
          <div class="font-raleway q-pt-md color-info">
            <b>Reviews</b>
          </div>
          <div v-for="(review, i) in review_container" :key="i">

            <div class="row items-start q-gutter-md q-mt-sm">
              <q-card flat bordered class="col">
                <q-item>
                  <q-item-section avatar>


                    <q-avatar v-if="review.avatar_path == ''">
                      <img src="../../../public/avatar/default.jpeg" />
                    </q-avatar>

                    <q-avatar>
                      <img
                        src="profile-imgs/boy-dp1.jpg"
                      />
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label
                      >{{ review.reviewer_first_name }}
                      {{ review.reviewer_last_name }}</q-item-label
                    >
                  </q-item-section>
                </q-item>

                <q-separator />

                <q-responsive :ratio="60 / 9">
                  <!-- notice "border-radius-inherit" below; it's important when in a QCard -->
                  <q-card-section class="border-radius-inherit bg-grey-1">
                    <div>{{ review.review }}</div>
                  </q-card-section>
                </q-responsive>
              </q-card>
            </div>
          </div>
        </div>
sdfsdfsdf
        <div class="q-pt-md">

          <div
            class="q-mr-xl q-pt-md"
          >
            <img
              style="
                width: 200px;
                height: 200px;
                z-index: -1;
                border-radius: 10px;
              "
              src="profile-imgs/boy-dp1.jpg"
            />
          </div>

          <div
            class="q-mr-xl q-pt-md">
            <img
              style="
                width: 200px;
                height: 200px;
                z-index: -1;
                border-radius: 10px;
              "
              src="avatar/default.jpeg"
            />
          </div>

          <div class="q-pt-md">
            <q-btn
              label="Update Avatar"
              color="primary"
              @click="medium = true"
            />
            <q-dialog v-model="medium">
              <q-card style="width: 700px; max-width: 80vw">
                <q-card-section>
                  <div class="text-h6 text-center">Choose Avatar</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <div class="row text-center">
                    <div
                     
                      class="col-6"
                    >
                      <div>
                        <img
                          style="
                            width: 100px;
                            height: 100px;
                            border-radius: 10px;
                            cursor: pointer;
                          "
                          @click="
                            updateAvatar(avatar._id, avatar.avatar_image_path)
                          "
                          src="profile-imgs/boy-dp1.jpg"
                          alt="hayup"
                        />
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </q-dialog>
          </div>
          <div
            class="q-mr-xl q-pt-md"
            v-if="container_user.cover_photo_path != ''"
          >
            <img
              style="
                width: 450px;
                height: 200px;
                z-index: -1;
                border-radius: 10px;
              "
              :src="`http://localhost:4000/cover-photo/${container_user.cover_photo_path}`"
            />
          </div>

          <div class="q-mt-md" v-else>
                  <img
                    style="
                    width: 450px;
                    height: 200px;
                    z-index: -1;
                    border-radius: 10px;
                    "
                  src="cover-photo/default.png"/>
        </div>

          <div class="q-pt-md">
            <q-btn
              label="Update Cover Photo"
              color="primary"
              @click="cover_photo_pop_up = true"
            />
            <q-dialog v-model="cover_photo_pop_up">
              <q-card style="width: 700px; max-width: 80vw">
                <q-card-section>
                  <div class="text-h6 text-center">Choose Cover Photo</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <div class="row text-center">
                    <div
                      v-for="(cover, i) in container_cover_photo"
                      :key="i"
                      class="col-6"
                    >
                      <div>
                        <img
                          style="
                            width: 100px;
                            height: 100px;
                            border-radius: 10px;
                            cursor: pointer;
                          "
                          @click="
                            updateCover(cover._id, cover.cover_photo_path)
                          "
                          v-bind:src="`http://localhost:4000/cover-photo/${cover.cover_photo_path}`"
                          alt="hayup"
                        />
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </q-dialog>
          </div>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import {
  getAvatarById,
  getAvatarByGender,
  putAvatar,
  getUserInfo,
  postRate,
  getReviewById,
  getCoverPhoto,
  putUserCoverPhoto,
  getRateAndReviewByUserId
} from "../../references/url";
import Swal from "sweetalert2";

export default {
  components: {},
  data: () => ({
    cover_photo_pop_up: false,
    rate: 0,
    rate2: 0,
    medium: false,
    container_data: {},
    container_avatar: {},
    container_cover_photo: {},
    avatar_id: "",
    user_id: "",
    container_user: {},
    compute_rate: "",
    total_stars: "",
    total_user_rate: "",
    ratings_container: {
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
    },
    average_rate: 0,
    review_container: "",
    gender: "",
    avatar_path: "",
    form_data_cover:{
      cover_id: "",
      cover_path: "",
    }
  }),
  async mounted() {
    
    this.$q.loading.show();
    let container_user = await this.getUserInfo();
    this.container_user = container_user;

    let container = await this.getAvatarById(); //displaying avatar of user
    this.container_data = container; //displaying avatar for user


    let container_avatar = await this.getAvatarByGender(); //for getting all avatars in db
    this.container_avatar = container_avatar; //for getting all avatars in db
    // console.log(this.container_avatar);

    let container_cover_photo = await this.getAllCoverPhoto();
    this.container_cover_photo = container_cover_photo
    console.log(this.container_cover_photo)

    let review_container = await this.getReviewById(); //for getting all reviews of user
    this.review_container = review_container; //for getting all reviews of user
    // console.log(this.review_container);

    await this.computeRate(); //for displaying ratings

    this.$q.loading.hide();
  },
  methods: {
    resetModel() {
      this.rate = 0;
    },
    async getAvatarById() {
      let container_user = await this.getUserInfo();
      this.container_user = container_user;
  
      if(this.container_user.avatar != ''){
        let res = await this.$_post(getAvatarById, {
        _id: this.container_user.avatar,
      });
      return res.data;
      } else {
        alert("walang profile")
      }

    },
    async getAvatarByGender() {
      let gender = this.container_user.gender;
      this.gender = gender;
      let res = await this.$_post(getAvatarByGender, {
        gender: this.gender,
      });
      return res.data;
    },

    async getAllCoverPhoto(){
      let res = await this.$_post(getCoverPhoto);
      return res.data
    },
    async getReviewById() {
      let res = await this.$_post(getReviewById, {
        user_id: "5f8fdfa15e445716ac0355e5", //local storage or session
      });
      return res.data;
    },
    async getRateReviewByUserId() {
      let res = await this.$_post(getRateAndReviewByUserId, {
        user_id: "5f8fdfa15e445716ac0355e5", //local storage or session
      });
      return res.data;
    },
    async updateAvatar(avatar_id, avatar_path) {
      this.avatar_id = avatar_id;

      this.avatar_path = avatar_path;
      this.$q.loading.show();
      let res = await this.$_post(putAvatar, {
        user_id: "5f8fdfa15e445716ac0355e5", //local storage or session
        avatar_id: this.avatar_id,
        avatar_path: this.avatar_path,
      });
      if (res.status == 200) {
        this.medium = false;
        this.$q.loading.hide();
        Swal.fire({
          icon: "success",
          title: "Congrats...",
          text: "Successfully Updated",
        });
        let container = await this.getAvatarById();
        this.container_data = container;
      } else {
        console.log("error")
      }
    },
    async getUserInfo() {
      let res = await this.$_post(getUserInfo, {
        user_id: "5f8fdfa15e445716ac0355e5", //local storage or session
      });
      return res.data;
    },

    async updateCover(cover_id, cover_path) {

      this.form_data_cover.cover_id = cover_id;
      this.form_data_cover.cover_path = cover_path;
      this.$q.loading.show();
      let res = await this.$_post(putUserCoverPhoto, {
        user_id: "5f8fdfa15e445716ac0355e5", //local storage or session
        cover: this.form_data_cover.cover_id, //cover id save to user table
        cover_photo_path: this.form_data_cover.cover_path, //cover id save to user table
      });
      if (res.status == 200) {
        this.cover_photo_pop_up = false;
        this.$q.loading.hide();
        Swal.fire({
          icon: "success",
          title: "Congrats...",
          text: "Successfully Updated",
        });
        // let container = await this.getAvatarById();
        // this.container_data = container;
        let container_user = await this.getUserInfo();
        this.container_user = container_user;
      } else {
        console.log("error")
      }
    },
    // async rateUser() {
    //   this.$q.loading.show();
    //   let res = await this.$_post(postRate, {
    //     user_id: "5f7ad6515fbf0018b82be1c2",
    //     reviewer_id: "5f7b176aeeb7951804602236",
    //     reviewer_first_name: "Pergemt",
    //     reviewer_last_name: "Galang",
    //     rate: this.rate,
    //   });
    //   this.$q.loading.hide();

    //   if (res.status == 200) {
    //     this.resetModel();
    //     this.$q.loading.hide();
    //     Swal.fire({
    //       icon: "success",
    //       title: "Congrats...",
    //       text: "Successfully Rated",
    //     });
    //   }
    // },
    async computeRate() {
      let compute_rate = await this.getUserInfo();
      this.compute_rate = compute_rate;

      this.ratings_container.one = this.compute_rate.ratings.one * 1;
      this.ratings_container.two = this.compute_rate.ratings.two * 2;
      this.ratings_container.three = this.compute_rate.ratings.three * 3;
      this.ratings_container.four = this.compute_rate.ratings.four * 4;
      this.ratings_container.five = this.compute_rate.ratings.five * 5;

      this.total_stars =
        this.ratings_container.one +
        this.ratings_container.two +
        this.ratings_container.three +
        this.ratings_container.four +
        this.ratings_container.five;

      this.total_user_rate =
        this.compute_rate.ratings.one +
        this.compute_rate.ratings.two +
        this.compute_rate.ratings.three +
        this.compute_rate.ratings.four +
        this.compute_rate.ratings.five;

      this.average_rate = Math.round(this.total_stars / this.total_user_rate);
      if (isNaN(this.average_rate) == true) {
        this.rate2 = 0;
      } else {
        this.rate2 = this.average_rate;
      }
    },
  },
};
</script>

