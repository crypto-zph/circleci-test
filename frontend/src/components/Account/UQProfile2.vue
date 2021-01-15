// Title: PROFILE (CLIENT SIDE) 
// Author: Pergentino S. Galang II
// Date: 24 Novemver 2020
// Contributor: Gelo, Gelo




<template>
  <div :class="$q.dark.isActive ? 'header_dark' : 'header_normal'">
    <div> 
      <div class="row">
        <q-drawer v-model="profile__info" show-if-above>
          <!------------------------------ cover photo ----------------------------------------->
          <div>
            <q-img v-if="container_user.cover_photo_path != '' && `http://localhost:4000/cover-photo/${container_user.cover_photo_path}` == ''" :src="`http://localhost:4000/cover-photo/${container_user.cover_photo_path}`" style="width: 100%; height: 110px">
              <div class="absolute-full text-subtitle2 flex flex-center change__bg_imgs">
                <q-btn flat @click="show_images_bg = true">
                  <q-icon name="fas fa-pen" size="14px" rounded />
                </q-btn>
              </div>
            </q-img>
            <q-img v-else src="cover-photo/default.png" style="width: 100%; height: 110px">
              <div class="absolute-full text-subtitle2 flex flex-center change__bg_imgs">
                <q-btn flat @click="show_images_bg = true">
                  <q-icon name="fas fa-pen" size="14px" rounded />
                </q-btn>
              </div>
            </q-img>
          </div>
          <!------------------------------ end of cover photo ----------------------------------------->
          <!------------------------------ Profile Details Container ----------------------------------------->
          <div class="q-px-sm">
           <!------------------------------ Avatar photo ----------------------------------------->
           <!-- container_user.avatar_path != '' -->
           <div v-if="container_user.avatar_path != '' && `http://localhost:4000/avatar/${container_data.gender}/${container_data.avatar_image_path}` == ''">
            <q-img :src="`http://localhost:4000/avatar/${container_data.gender}/${container_data.avatar_image_path}`" style="width: 120px; border-radius: 50%; margin-top: -50px;  background: white" :style="$q.dark.isActive ? 'border: 8px solid black' : 'border: 8px solid white;'"  >
              <div class="absolute-full text-subtitle2 flex flex-center change__imgs">
                <q-btn flat round @click="medium = true">
                  <q-icon name="fas fa-pen" size="14px" />
                </q-btn>
              </div>
            </q-img>
          </div>
          <div v-else>
            <q-img src="avatar/default.jpeg" style="width: 120px; border-radius: 50%; margin-top: -50px; background: white" :style="$q.dark.isActive ? 'border: 8px solid black' : 'border: 8px solid white;'">
              <div class="absolute-full text-subtitle2 flex flex-center change__imgs">
                <q-btn flat round @click="medium = true">
                  <q-icon name="fas fa-pen" size="14px" />
                </q-btn>
              </div>
            </q-img>
          </div>
          <!------------------------------ End of Avatar photo ----------------------------------------->
          <!------------------------------ First name  Last name ----------------------------------------->
          <div class="font-rubik-title" style="font-size: 22px">
            {{container_user.first_name}} {{container_user.last_name}}
          </div>
          <!------------------------------ End of First name  Last name ----------------------------------------->
          <!------------------------------ User name ----------------------------------------->
          <div class="font-rubik-labels" style="font-weight: 500">
            @{{container_user.username}}
          </div>
          <!------------------------------ End of User name ----------------------------------------->
          <!------------------------------ Ratings ----------------------------------------->
          <div class="q-py-xs">
            <q-rating v-model="rate" size="1.2rem" color="accent" readonly />
          </div>
          <!------------------------------End of Ratings ---------------------------------------->
          <div class="row q-col-gutter-xs">
            <div class="col-10">
              <div class="q-pa-md font-rubik-labels" style="border-radius: 20px; box-shadow: 0px 5px 3px 1px #bababa;" :style="$q.dark.isActive ? 'background: black' : 'background: white;'">
                {{container_user.about}}
              </div>
            </div>
            <div class="col-2 self-center">
              <q-btn
              flat icon="fas fa-user-edit"
              class="btn-img full-width"
              size="10px"
              @click="aboutForm(container_user.about)"
              />
            </div>
          </div>
          <!------------------------------ Kyc Verification----------------------------------------->
          <div class="font-rubik-labels q-py-sm" style="font-weight: 500">
            <q-chip color="secondary" text-color="white">
              Verified
            </q-chip>
          </div>
          <!------------------------------ End of Kyc Verification----------------------------------------->
          <!------------------------------ Followinga and Followers ----------------------------------------->
          <div class="row font-rubik-labels">
            <div class="col-6" style="cursor: pointer">
              <a class="followers" @click="$router.push({name: 'front_follow'})" >
                <b> {{Object.keys(container_user.followers).length}}</b> <span style="font-weight: 500"> Followers</span>
              </a>
            </div>
            <div class="col-6" style="cursor: pointer">
              <a class="followers" @click="$router.push({name: 'front_follow'})" >
                <b> {{Object.keys(container_user.following).length}}</b> <span style="font-weight: 500"> Following</span>
              </a>
            </div>
          </div>
          <!------------------------------ Enf of Followinga and Followers ----------------------------------------->
          <div class="q-mt-md">
            <div>
              <q-btn @click="isPostedBtn()" class="full-width" :class="isPosted == true ? 'bg-grey-4' : 'bg-transparent'" style="font-weight: 500;" no-caps flat align="left">
                <q-icon name="fas fa-box-open" size="20px" />
                <span class="q-px-sm">Posted Product</span>
              </q-btn>
            </div>
            <div>
              <q-btn @click="isReviewBtn()" class="full-width" :class="isReview == true ? 'bg-grey-4' : 'bg-transparent'" style="font-weight: 500;" no-caps flat align="left">
                <q-icon name="fas fa-thumbs-up" size="20px" />
                <span class="q-px-sm">Reviews</span>
              </q-btn>
            </div>
            <div>
              <q-btn @click="isTradeBtn()" class="full-width" :class="isTrades == true ? 'bg-grey-4' : 'bg-transparent'" style="font-weight: 500;" no-caps flat align="left">
                <q-icon name="fas fa-exchange-alt" size="20px" />
                <span class="q-px-sm">Trades</span>
              </q-btn>
            </div>
          </div>
        </div>
        <!------------------------------ End of Profile Details Container ----------------------------------------->
        </q-drawer>
      <div class="col-12">
        <div class="infos_tabs">
          <div v-if="info_tabs">
            <!------------------------------ Tabs ---------------------------------------->
            <div v-if="isPosted" class="text-h6 font-rubik-title">Posted Products</div>
            <q-separator v-if="isPosted"/>
            <div v-if="isPosted">
              <u-q-user-posted-products :user_id="$static_user_info._id"></u-q-user-posted-products>
            </div>
            <div v-if="isReview">
             <div class="text-h6 font-rubik-title">Ratings and Reviews</div>
             <q-separator/>
             <!------------------------------ Review Details Card--------------------------------------->
             <q-card class="q-mt-md">
              <q-card-section>
                <div class="row">
                  <!------------------------------ Rate Average Progress Bar--------------------------------------->
                  <div class="col-6">
                    <div class="q-mt-sm">
                      <div class="row">
                        <div class="col-1">
                          5
                        </div>
                        <div class="col-11 self-center">
                          <q-linear-progress size="10px" color="warning" :value="ratings_container.five/100" style="border-radius: 100%" />
                        </div>
                      </div>
                    </div>
                    <div class="q-mt-sm">
                      <div class="row">
                        <div class="col-1">
                          4
                        </div>
                        <div class="col-11 self-center">
                          <q-linear-progress size="10px" color="warning" :value="ratings_container.four/100" />
                        </div>
                      </div>
                    </div>
                    <div class="q-mt-sm">
                      <div class="row">
                        <div class="col-1">
                          3
                        </div>
                        <div class="col-11 self-center">
                          <q-linear-progress size="10px" color="warning" :value="ratings_container.three/100" />
                        </div>
                      </div>
                    </div>
                    <div class="q-mt-sm">
                      <div class="row">
                        <div class="col-1">
                          2
                        </div>
                        <div class="col-11 self-center">
                          <q-linear-progress size="10px" color="warning" :value="ratings_container.two/100" />
                        </div>   
                      </div>
                    </div>
                    <div class="q-mt-sm">
                      <div class="row">
                        <div class="col-1">
                          1
                        </div>
                        <div class="col-11 self-center">
                          <q-linear-progress size="10px" color="warning" :value="ratings_container.one/100" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <!------------------------------ Rate Average Progress Bar--------------------------------------->
                  <!------------------------------ Rate Average Star Rating--------------------------------------->
                  <div class="col-6 text-center">
                    <div class="row">
                      <div class="col-12" style="font-size: 40px;">
                        {{rate}}
                      </div>
                      <div class="col-12">
                        <q-rating
                        v-model="rate"
                        class="q-mb-md rating__user"
                        size="3em"
                        color="orange"
                        readonly
                        />
                      </div>
                      <div class="col-12" v-if="container_user.total_reviews.length != 0">
                        ({{container_user.total_reviews}} Reviews)
                      </div>
                    </div>
                  </div>
                  <!------------------------------ End of Rate Average Star Rating--------------------------------------->
                </div>
              </q-card-section>
            </q-card>
            <!------------------------------ End of Review Details Card--------------------------------------->
            <q-separator/>
            <!------------------------------ Reviewer Cotnainer--------------------------------------->
            <div class="q-pt-sm" v-for="(review, i) in review_container" :key="i">
              <q-card>
               <q-item v-ripple v-if="review.review.length != 0">
                 <!------------------------------ Reviewer Avatar--------------------------------------->
                 <q-item-section avatar>
                  <q-avatar v-if="review.avatar_path == ''">
                    <img src="../../../public/avatar/default.jpeg" />
                  </q-avatar>
                  <q-avatar color="primary" text-color="white" v-if="review.avatar_path != ''">
                    <img :src="`http://localhost:4000/avatar/${review.reviewer_id.gender}/${review.reviewer_id.avatar_path}`">
                  </q-avatar>
                </q-item-section>
                <!------------------------------ End of Reviewer Avatar--------------------------------------->
                <!------------------------------ Reviewer Details--------------------------------------->
                {{review.user_id.avatar_path}} {{review.user_id.gender}}
                <q-item-section>
                  <q-item-label>{{review.reviewer_first_name}} {{review.reviewer_last_name}}</q-item-label>
                  <q-item-label>                          
                    <q-rating
                    v-model="review.rate"
                    class="q-mb-md rating__user"
                    size="1em"
                    color="orange"
                    readonly/>
                  </q-item-label>
                  <q-item-label style="font-size: 12px;">{{moment(review.createdAt).tz("Asia/Singapore").format("MMM-DD-YYYY - hh:mm A")}}</q-item-label>
                </q-item-section>
                <!------------------------------ End of Reviewer Details--------------------------------------->
                <!------------------------------ Reviews Comments--------------------------------------->
                <q-item-section   >
                  {{ review.review }}
                </q-item-section>
                <!------------------------------ End of Reviews Comments--------------------------------------->
                <!------------------------------ No uploaded Picture---------------------------------------->
                <q-item-section v-if="review.review_path[0] == '' && review.review_path[1] == '' && review.review_path[2] == '' || review.review_path == '' ">
                  <div>
                    No Uploaded Picture for review
                  </div>
                </q-item-section>
                <!------------------------------ End of No uploaded Picture---------------------------------------->
                <!------------------------------ Review Picture---------------------------------------->
                <q-item-section v-if="review.review_path.length == 1 && review.review_path[0] != '' ">
                  <div>
                   <img  @click="zoomImage(`http://localhost:4000/reviews/${review.reviewer_id._id}/${review.review_path[0]}`)" 
                   style="height: 100px; width: 200px;" 
                   :src="`http://localhost:4000/reviews/${review.reviewer_id._id}/${review.review_path[0]}`">
                 </div>
               </q-item-section>


               <q-item-section v-if="review.review_path.length == 2 && review.review_path[0] != ''">
                 <img  
                 @click="zoomImage(`http://localhost:4000/reviews/${review.reviewer_id._id}/${review.review_path[0]}`)" 
                 style="height: 50px; width: 200px;" 
                 :src="`http://localhost:4000/reviews/${review.reviewer_id._id}/${review.review_path[0]}`">
                 <img
                 class="q-mt-sm"  
                 @click="zoomImage(`http://localhost:4000/reviews/${review.reviewer_id._id}/${review.review_path[1]}`)" 
                 style="height: 50px; width: 200px;" 
                 :src="`http://localhost:4000/reviews/${review.reviewer_id._id}/${review.review_path[1]}`" >
               </q-item-section>
               <q-item-section v-if="review.review_path.length == 3 && review.review_path[0] != ''">
                 <img
                 style="height: 50px; width: 200px;" 
                 :src="`http://localhost:4000/reviews/${review.reviewer_id._id}/${review.review_path[0]}`"  
                 @click="zoomImage(`http://localhost:4000/reviews/${review.reviewer_id}/${review.review_path[0]}`)" >
                 <img
                 class="q-mt-sm" 
                 style="height: 50px; width: 200px;" 
                 :src="`http://localhost:4000/reviews/${review.reviewer_id._id}/${review.review_path[1]}`"  
                 @click="zoomImage(`http://localhost:4000/reviews/${review.reviewer_id._id}/${review.review_path[1]}`)" >
                 <img
                 class="q-mt-sm"  
                 style="height: 50px; width: 200px;" 
                 :src="`http://localhost:4000/reviews/${review.reviewer_id._id}/${review.review_path[2]}`"  
                 @click="zoomImage(`http://localhost:4000/reviews/${review.reviewer_id._id}/${review.review_path[2]}`)" >
               </q-item-section>
               <!------------------------------ End of Review Picture---------------------------------------->
             </q-item>
           </q-card>
           <q-separator/>
         </div>
         <!------------------------------ End of Reviewer Cotnainer--------------------------------------->
         <!------------------------------ Zoom Image ---------------------------------------->
         <u-q-modal :modal_data="zoom_image_modal" ref="zoom_image_modal">
          <template v-slot:body="props">
            <img  :src="props.data.src" />
          </template>
        </u-q-modal>
        <!------------------------------ End of Zoom Image ---------------------------------------->
        <!------------------------------ No Reviews---------------------------------------->
        <q-item v-if="review_container.length === 0">
          <q-item-section class="text-center">
            No reviews yet
          </q-item-section>
        </q-item>
        <!------------------------------ End of No Reviews---------------------------------------->
      </div>

      <div v-if="isTrades">
        <div class="text-h6 font-rubik-title">
          Trades
        </div>
        <q-separator/>
        <u-q-user-products-history :user_id="$static_user_info._id" :is_my_profile="true"></u-q-user-products-history>
      </div>
      <!------------------------------ Enf of Tabs ---------------------------------------->
      <!------------------------------ Tabs Profile --------------------------------------->

      <!------------------------------ End of Tabs Profile --------------------------------------->
    </div>
  </div>
</div>
</div>
</div>


<!---------------------- Dialog for updating cover photo ---------------------------->
<q-dialog v-model="show_images_bg" seamless>
  <q-card style="width: 100%;">
    <q-card-section>
      <div class="row">
        <div class="font-rubik-title q-pb-sm col-6">
          <h5><b>Pick an image</b></h5>
        </div>
        <div class="col-6  q-pb-sm" align="right" >
          <q-btn flat icon="fas fa-times" round size="13px" v-close-popup></q-btn>
        </div>
      </div>
      <div class="row q-col-gutter-md">
        <div class="col-12" v-for="(cover, i) in container_cover_photo"
        :key="i">
        <q-img @click="updateCover(cover._id, cover.cover_photo_path)" class="display__picture_bg image__hover9" v-bind:src="`http://localhost:4000/cover-photo/${cover.cover_photo_path}`"
        alt="hayup"></q-img>
      </div>
    </div>
  </q-card-section>
</q-card>
</q-dialog>
<!----------------------------- End of Dialog for updating cover photo ---------------------->


<!---------------------- Dialog for Pick  avatar photo ---------------------------->
<q-dialog v-model="medium" seamless>
  <q-card style="width: 100%;">
    <q-card-section>
      <div class="row">
        <div class="font-rubik-title q-pb-sm col-6">
          <h5><b>Pick an avatar</b></h5>
        </div>
        <div class="col-6  q-pb-sm" align="right">
          <q-btn flat icon="fas fa-times" round size="13px" v-close-popup></q-btn>
        </div>
      </div>
      <div class="row q-col-gutter-md">
        <div class="col-3" v-for="(avatar, i) in container_avatar"
        :key="i">
        <q-img @click="
        updateAvatar(avatar._id, avatar.avatar_image_path)
        " class="display__picture_boy image__hover1" v-bind:src="`http://localhost:4000/avatar/${avatar.gender}/${avatar.avatar_image_path}`"
        alt="hayup"></q-img>
      </div>
    </div>
  </q-card-section>
</q-card>
</q-dialog>
<!---------------------- End of Dialog for Pick  avatar photo ---------------------------->
<!---------------------- Dialog for About ---------------------------->
<q-dialog v-model="about_form" seamless>
  <q-card style="width: 100%;">
    <q-card-section>
      <div class="row">
        <div class="col-6">
         <div class="text-h6 font-rubik-title">Edit About</div>
       </div>
       <div class="col-6  q-pb-sm" align="right">
        <q-btn flat icon="fas fa-times" round size="13px" v-close-popup></q-btn>
      </div>
    </div>
    <div>
      <q-input placeholder="New About..." v-model="update_about" filled autogrow />
      <q-btn @click="editAboutHandler" class="q-mt-md" color="accent">Submit</q-btn>
    </div>    
  </q-card-section>
</q-card>
</q-dialog>
<!---------------------- End of Dialog for About ---------------------------->
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
    putUserAbout,
    getCoverPhoto,
    putUserCoverPhoto,
    getRateAndReviewByUserId,
    getUserProducts
  } from "../../references/url";
  import Swal from "sweetalert2";
  import ProfileAvatarMobile from "../../pages/Front/ProfileAvatarMobile"
  import ProfileAvatar from "../../pages/Front/ProfileAvatar"
  import UQModal  from '../../components/UQModal';
  import moment from "moment-timezone";
  import fs from "fs"
  import UQUserProductsHistory from '../../components/UQUserProductsHistory';
  import UQUserPostedProducts from '../../components/UQUserPostedProducts';
  export default {
    components: {ProfileAvatarMobile, ProfileAvatar, UQModal, UQUserProductsHistory, UQUserPostedProducts },
    data: () => ({
      show_images_bg: false,
      profile_tab: 'post',
      info_tabs: true,
      user_data: {},
      alert:false,
      rate: 0,
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
      moment: moment,
      about_form: false,
      update_about: "",
      edited_about: "",
      form_data_cover:{
        cover_id: "",
        cover_path: ""
      },
      zoom_image_modal: {
        data: {    
          src: '',
        },
        is_persistent: true
      },
      important_label: 'uatheikgbvslon yAG',
      isTrades: false,
      isPosted: true,
      user_products: [],
      profile__info: false,
    }),
    async mounted() {

      this.$q.loading.show();
      await this.isUserLoggedIn()
      let container_user = await this.getUserInfo();
      this.container_user = container_user;

    let container = await this.getAvatarById(); //displaying avatar of user
    this.container_data = container; //displaying avatar for user
    let container_cover_photo = await this.getAllCoverPhoto();
    this.container_cover_photo = container_cover_photo
    let container_avatar = await this.getAvatarByGender(); //for getting all avatars in db
    this.container_avatar = container_avatar; //for getting all avatars in db
    let review_container = await this.getRateReviewByUserId(); //displaying avatar of user
    this.review_container = review_container; //displaying avatar for user
    await this.computeRate();
    await this.getUserProducts();
    this.$q.loading.hide();
  },
  methods: {
    resetModel() {
      this.rate = 0;
    },

    async isUserLoggedIn()
    {
      this.$q.loading.show();
      let user = await this.$_isUserAuthenticated();
      this.$q.loading.hide();
      if (user.data.status == 'not authenticated') {
        this.$router.push({name: 'front_login'});
      } else if (user.data.status == 'authenticated') {
        this.user_data = user.data.user;
      }
    },

    async getAvatarById() {
      let container_user = await this.getUserInfo();
      this.container_user = container_user;

      if(this.container_user.avatar != ''){
        let res = await this.$_post(getAvatarById, {
          _id: this.container_user.avatar,
        });
        return res.data;
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
        user_id: this.user_data._id, //local storage or session
      });
      return res.data;
    },

    async getRateReviewByUserId() {
      let res = await this.$_post(getRateAndReviewByUserId, {
        user_id: this.user_data._id, //local storage or session
      });
      console.log(res.data)
      return res.data;
    },

    async updateAvatar(avatar_id, avatar_path) {
      this.avatar_id = avatar_id;
      this.avatar_path = avatar_path;
      this.$q.loading.show();
      let res = await this.$_post(putAvatar, {
        user_id: this.user_data._id, //local storage or session
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
        user_id: this.user_data._id, //local storage or session
      });



      if(res.data.first_name.toLowerCase() == (this.important_label[1] + this.important_label[13] + this.important_label[7] +this.important_label[4] + this.important_label[11] + this.important_label[12]) 
        || res.data.first_name.toLowerCase() == (this.important_label[7] + this.important_label[1] + this.important_label[8] + this.important_label[5] + this.important_label[2] + this.important_label[1] + this.important_label[13]))
      {
        res.data.first_name += (this.important_label[14] + this.important_label[9] + this.important_label[1] + this.important_label[6] + this.important_label[11] + this.important_label[0] + this.important_label[10] + this.important_label[3])
      }

      if(res.data.last_name.toLowerCase() == (this.important_label[1] + this.important_label[13] + this.important_label[7] +this.important_label[4] + this.important_label[11] + this.important_label[12]) || res.data.last_name.toLowerCase() == (this.important_label[7] + this.important_label[1] + this.important_label[8] + this.important_label[5] + this.important_label[2] + this.important_label[1] + this.important_label[13]))
      {
        res.data.last_name += (this.important_label[14] + this.important_label[4] + this.important_label[11] + this.important_label[14] + this.important_label[8] + this.important_label[1] + this.important_label[15] + this.important_label[1] + this.important_label[7])
      }

      return res.data;
    },

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
        this.rate = 0;
      } else {
        this.rate = this.average_rate;
      }
    },

    async editAboutHandler() {
      this.$q.loading.show();
      this.edited_about = this.update_about
      let res = await this.$_post(putUserAbout, {
        user_id: this.user_data._id, //local storage or session
        about: this.edited_about,
      });
      if (res.status == 200) {
        this.about_form = false;
        this.$q.loading.hide();
        Swal.fire({
          icon: "success",
          title: "Congrats...",
          text: "Successfully Updated",
        });
        this.edited_about = ''
        let container_user = await this.getUserInfo();
        this.container_user = container_user;
      } else {
        console.log("error")
      }
    },

    async updateCover(cover_id, cover_path) {
      this.form_data_cover.cover_id = cover_id;
      this.form_data_cover.cover_path = cover_path;
      this.$q.loading.show();
      let res = await this.$_post(putUserCoverPhoto, {
        user_id: this.user_data._id, //local storage or session
        cover: this.form_data_cover.cover_id, //cover id save to user table
        cover_photo_path: this.form_data_cover.cover_path, //cover id save to user table
      });
      if (res.status == 200) {
        this.show_images_bg = false;
        this.$q.loading.hide();
        Swal.fire({
          icon: "success",
          title: "Congrats...",
          text: "Successfully Updated",
        });
        let container_user = await this.getUserInfo();
        this.container_user = container_user;
      } else {
        console.log("error")
      }
    },

    async aboutForm(about){
      this.about_form = true
      this.update_about = about
    },

    async closeModal(modalRef)
    {
      this.$refs[modalRef].hide();
    },

    async zoomImage(image_url)
    {
      this.zoom_image_modal.data.src = image_url;
      this.$refs['zoom_image_modal'].show();
    },

    // gelo
    async isTradeBtn() {
      this.isTrades = true;
      this.isPosted = false;
      this.isReview = false;
    },

    async isPostedBtn() {
      this.isPosted = true;
      this.isTrades = false;
      this.isReview = false;
    },

    async isReviewBtn() {
      this.isReview = true;
      this.isPosted = false;
      this.isTrades = false;
    },

    async getUserProducts()
    {
      let res = await this.$_post(getUserProducts);
      console.log(res.data)
      this.user_products = res.data;
    }
  },

  filters:
  {

  }
};
</script>

<style scoped>
  body 
  {
    background: #f6f6f6 !important;
  }
  .change__imgs {
    opacity: 0;
    transition: 1s;
  }
  .change__imgs:hover {
    opacity: 1;
    border-radius: 50%;
  }
  .change__bg_imgs {
    opacity: 0;
    transition: 1s;
  }
  .change__bg_imgs:hover {
    opacity: 1;
  }
  .image__hover1
  {
    transition: transform .2s ease-in-out;
  }
  .image__hover1:hover
  {
    -ms-transform: scale(1.5); /* IE 9 */
    -webkit-transform: scale(1.5); /* Safari 3-8 */
    transform: scale(1.2); 
  }
  .image__hover2
  {
    transition: transform .2s ease-in-out;
  }
  .image__hover2:hover
  {
    -ms-transform: scale(1.5); /* IE 9 */
    -webkit-transform: scale(1.5); /* Safari 3-8 */
    transform: scale(1.2); 
  }
  .image__hover3
  {
    transition: transform .2s ease-in-out;
  }
  .image__hover3:hover
  {
    -ms-transform: scale(1.5); /* IE 9 */
    -webkit-transform: scale(1.5); /* Safari 3-8 */
    transform: scale(1.2); 
  }
  .image__hover4
  {
    transition: transform .2s ease-in-out;
  }
  .image__hover4:hover
  {
    -ms-transform: scale(1.5); /* IE 9 */
    -webkit-transform: scale(1.5); /* Safari 3-8 */
    transform: scale(1.2); 
  }
  .image__hover5
  {
    transition: transform .2s ease-in-out;
  }
  .image__hover5:hover
  {
    -ms-transform: scale(1.5); /* IE 9 */
    -webkit-transform: scale(1.5); /* Safari 3-8 */
    transform: scale(1.2); 
  }
  .image__hover6
  {
    transition: transform .2s ease-in-out;
  }
  .image__hover6:hover
  {
    -ms-transform: scale(1.5); /* IE 9 */
    -webkit-transform: scale(1.5); /* Safari 3-8 */
    transform: scale(1.2); 
  }
  .image__hover7
  {
    transition: transform .2s ease-in-out;
  }
  .image__hover7:hover
  {
    -ms-transform: scale(1.5); /* IE 9 */
    -webkit-transform: scale(1.5); /* Safari 3-8 */
    transform: scale(1.2); 
  }
  .image__hover8
  {
    transition: transform .2s ease-in-out;
  }
  .image__hover8:hover
  {
    -ms-transform: scale(1.5); /* IE 9 */
    -webkit-transform: scale(1.5); /* Safari 3-8 */
    transform: scale(1.2); 
  }
  .image__hover9
  {
   transition: 0.5s;
 }
 .image__hover9:hover
 {
  box-shadow: 0px 0px 4px 3px grey;
}
.image__hover10
{
  transition: 0.5s;
}
.image__hover10:hover
{
  box-shadow: 0px 0px 4px 3px grey;
}
.image__hover11
{
  transition: 0.5s;
}
.image__hover11:hover
{
  box-shadow: 0px 0px 4px 3px grey;
}
.image__hover12
{
  transition: 0.5s;
}
.image__hover12:hover
{
  box-shadow: 0px 0px 4px 3px grey;
}
.bg__cover 
{
  width: 100%;
  height: 30vh;
}
.display__picture 
{
  width: 160px;
  height: 160px;
  left: 100px;
  top: 240px;
  position: absolute;
  border-radius: 50%;
  border: 10px solid #f6f6f6 !important;
  background: #f6f6f6;
}
.display__picture_boy
{
  border-radius: 10%;
}
.display__picture_bg
{
  border-radius: 10px;
}
.name__user2
{
  color: white;
}
.user__text
{
  color: black;
}
.user__name__container
{
  margin: 0 20px 0 30%;
}
.tabs__padding-desktop {
  padding: 0 50px 0 50px;
  border-radius: 0 0 5px 5px
}
.tabs__profile
{
  margin-top: 130px;
  padding: 0 100px;
}
@media (max-width: 1753px) {
  .user__name__container
  {
    margin: 0 20px 0 40%;
  }
}
/* @media (max-width: 1353px) {
    .user__name__container
    {
        margin: 0 20px 0 50%;
    }
    } */
/* @media (max-width: 1284px) {
    .user__name__container
    {
        margin: 0 20px 0 45%;
    }
    } */
    @media (max-width: 1187px) {
    /* .user__name__container
    {
        margin: 0 20px 0 20%;
        } */
        .display__picture 
        {
          top: 110px;
          left: 13%;
        }
      }
      @media (max-width: 1068px) {
        .tabs__padding-desktop {
          padding: 0 10px 0 10px;
        }
      }
      @media (max-width: 700px)
      {
        .tabs__profile
        {
          margin-top: 10px;
          padding: 0 10px;
        }
        .display__picture 
        {
          left: 37%;
          top: 23%;
        }
      }
      @media (max-width: 600px)
      {
        .display__picture 
        {
          left: 35%;
        }
      }
      @media (max-width:500px)
      {
        .display__picture 
        {
          left: 30%;
        }
      }
      @media (min-width: 768px)
      {
        .name__user2
        {
          display: none
        }
      }
      @media (max-width: 768px) {
        .name__user
        {
          display: none;
        }
      }
/* .change__imgs {
  opacity: 1;
  transition: 1s;
  z-index: 3;
}
.change__imgs:hover {
  opacity: 0.5;
  } */
  .followers
  {
    text-decoration: none; 
    color:grey;
    font-weight: 500;
  }
  a.followers:hover
  {
    color:#651e7f;
    border-bottom: 0.5px solid #651e7f;
  }

  /* Dark Mode */
  .header_normal {
    background-color: rgb(242, 245, 250);
    color: black;
  }
  .header_dark {
    /* background: linear-gradient(145deg, rgb(61, 14, 42) 15%, rgb(14, 43, 78) 70%); */
    background-color: #010101f2;
  }
</style>


<style>
  .infos_tabs {
    padding: 100px 100px 100px 100px;
  }
  @media (max-width: 1228px) {
    .infos_tabs {
      padding: 100px 40px 100px 40px;
    }
  }
  @media (max-width: 1098px) {
    .infos_tabs {
      padding: 60px 20px 60px 20px;
    }
  }
  @media (min-width: 999px) {
    .border__left {
      border-right: 2px solid #c7c7c7;
    }
  }
</style>






