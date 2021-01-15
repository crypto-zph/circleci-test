// Title: PROFILE SPECIFIC USER (CLIENT SIDE) 
// Author: Pergentino S. Galang II
// Date: 24 Novemver 2020
// Contributor: 
<template>
  <div>
    <div>
      <div class="row" style="height: 78.7vh">
        <div class="col-3" style="border-right: 2px solid #c7c7c7;">
          <!------------------------------ cover photo ----------------------------------------->
          <div>
            
            <q-img v-if="user_info.cover != ''" :src="user_info.cover_photo_path"></q-img>

            <q-img v-else src="cover-photo/default.png" style="width: 100%">
            </q-img>
          </div>
          <!------------------------------ end of cover photo ----------------------------------------->
          <!------------------------------ Profile Details Container ----------------------------------------->
        <div style="padding:  0 30px">
           <!------------------------------ Avatar photo ----------------------------------------->
            <div  v-if="user_info.avatar != ''">
                <q-img  :src="user_info.avatar_path" style="width: 120px; border-radius: 50%; margin-top: -50px; border: 8px solid #f6f6f6; background: #f6f6f6"></q-img>
            </div>
            <div v-else>
                <q-img src="avatar/default.jpeg" style="width: 120px; border-radius: 50%; margin-top: -50px; border: 8px solid #f6f6f6; background: #f6f6f6"></q-img>
            </div>
          <!------------------------------ End of Avatar photo ----------------------------------------->
            <!------------------------------ First name  Last name ----------------------------------------->
          <div class="font-rubik-title" style="font-size: 22px">
            {{user_info.first_name}} {{user_info.last_name}}
          </div>
          
            <!------------------------------ End of First name  Last name ----------------------------------------->
            <!------------------------------ User name ----------------------------------------->
          <div class="font-rubik-labels" style="font-weight: 500">
            @{{user_info.username}}
          </div>
            <!------------------------------ End of User name ----------------------------------------->
            <!------------------------------ Ratings ----------------------------------------->
          <div class="q-py-xs">
            <q-rating v-model="rate" size="1.2rem" color="accent" readonly />
          </div>
            <!------------------------------End of Ratings ---------------------------------------->
            <!------------------------------ About ----------------------------------------->
            <div class="bg-white q-pa-md font-rubik-labels" 
                 style="border-radius: 20px; box-shadow: 0px 5px 3px 1px #bababa">
                {{user_info.about}}
            </div>
             <!------------------------------ End of About ----------------------------------------->
            <!------------------------------ Kyc Verification----------------------------------------->
          <div class="font-rubik-labels q-py-xs" style="font-weight: 500">
            <q-chip color="secondary" text-color="white">
              Verified
            </q-chip>
          </div>
            <!------------------------------ End of Kyc Verification----------------------------------------->
            <!------------------------------ Followinga and Followers ----------------------------------------->
          <div class="row font-rubik-labels">
            <div class="col-6" style="cursor: pointer">
              <a class="followers" :href="`/#/user/follow/${user_info.user_id}`">
              <b> {{Object.keys(user_info.followers).length}}</b> <span style="font-weight: 500"> Followers</span>
            </a>
            </div>
            <div class="col-6" style="cursor: pointer">
              <a class="followers" :href="`/#/user/follow/${user_info.user_id}`">
              <b> {{Object.keys(user_info.following).length}}</b> <span style="font-weight: 500"> Following</span>
            </a>
            </div>
          </div>
          <!------------------------------ Enf of Followinga and Followers ----------------------------------------->
          <!------------------------------ Review Report Buttons----------------------------------------->
            <div class="row q-mt-md q-col-gutter-sm">
                <div class="col-6" >
                    <q-btn style="background-color:#651e7f; color:white " 
                           flat 
                           class="font-rubik-title full-width"
                           @click="rateReview(
                            user_info.user_id,
                            user_info.username,
                            user_info.ratings,
                            user_info.gender,
                            user_info.fullname
                      )
                    "
                    >Rate and Review</q-btn>
                </div>
                <div class="card_area_1 col-6">
                    <q-btn flat  class="main_btn font-rubik-title full-width" @click="report(
                        user_info.user_id,
                        user_info.username,
                        user_info.ratings,
                        user_info.avatar_path,
                        user_info.gender,
                        user_info.fullname
                        )">
                      Report
                    </q-btn>
                </div>
                <!-- Chat Button -->
                <div class="card_area_1 col-12">
                    <q-btn flat  class="main_btn font-rubik-title full-width" @click="chat(
                        user_info.user_id,
                        user_info.username
                        )">
                      Chat
                    </q-btn>
                </div>
                <!-- /Chat Button -->
            </div>
            <!------------------------------ End of Review Report Buttons----------------------------------------->
        </div>
        <!------------------------------ End of Profile Details Container ----------------------------------------->
      </div>
      <div class="col-9">
        <div style="padding: 100px">
          <div v-if="info_tabs">
        <!------------------------------ Tabs ---------------------------------------->
            <q-tabs
            v-model="profile_tab"
            class="text-secondary"
            dense
            >
                <q-tab class="full-width" name="post" label="Posted" />
                <q-tab class="full-width" name="reviews" label="Reviews" />
                <q-tab class="full-width" name="trades" label="Trades" />
          </q-tabs>
        <!------------------------------ Enf of Tabs ---------------------------------------->
      <!------------------------------ Tabs Profile --------------------------------------->
       <q-tab-panels v-model="profile_tab" animated style="background: transparent;">
         <!------------------------------ Post Items----------------------------------------->
            <q-tab-panel name="post">
                <u-q-user-posted-products :user_id="$route.params.id"></u-q-user-posted-products>
            </q-tab-panel>
         <!------------------------------ End of Post Items----------------------------------------->

         <!------------------------------  Reviews---------------------------------------->
            <q-tab-panel name="reviews">
                  <div class="text-h6 font-rubik-title">Ratings and Reviews</div>
                   <!------------------------------ Review Details Card--------------------------------------->
                      <q-card>
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
                                                    <q-linear-progress size="10px" color="warning" :value="ratings_star.five /100" style="border-radius: 100%" />
                                                </div>
                                        </div>
                                    </div>
                                    <div class="q-mt-sm">
                                            <div class="row">
                                                <div class="col-1">
                                                    4
                                                </div>
                                                <div class="col-11 self-center">
                                                    <q-linear-progress size="10px" color="warning" :value="ratings_star.four/100" />
                                                </div>
                                        </div>
                                    </div>
                                    <div class="q-mt-sm">
                                            <div class="row">
                                                <div class="col-1">
                                                    3
                                                </div>
                                                <div class="col-11 self-center">
                                                    <q-linear-progress size="10px" color="warning" :value="ratings_star.three/100" />
                                                </div>
                                        </div>
                                    </div>
                                    <div class="q-mt-sm">
                                            <div class="row">
                                                <div class="col-1">
                                                    2
                                                </div>
                                                <div class="col-11 self-center">
                                                    <q-linear-progress size="10px" color="warning" :value="ratings_star.two/100" />
                                                </div>   
                                        </div>
                                    </div>
                                    <div class="q-mt-sm">
                                            <div class="row">
                                                <div class="col-1">
                                                    1
                                                </div>
                                                <div class="col-11 self-center">
                                                    <q-linear-progress size="10px" color="warning" :value="ratings_star.one/100" />
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
                                    <div class="col-12" v-if="user_info.total_reviews > 0">
                                          ({{user_info.total_reviews}} Reviews) 
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
                           @click="zoomImage(`http://localhost:4000/reviews/${review.reviewer_id._id}/${review.review_path[0]}`)" >
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
              </q-tab-panel>
              <!------------------------------ End of Reviews---------------------------------------->

   <!------------------------------ Trades --------------------------------------->
    <q-tab-panel name="trades">
        <div class="text-h6 font-rubik-title">
            Trades
        </div>
        <q-separator/>
        <u-q-user-products-history :user_id="$route.params.id" :is_my_profile="false"></u-q-user-products-history>
    </q-tab-panel>
    <!------------------------------ End of Trades --------------------------------------->
</q-tab-panels>
  <!------------------------------ End of Tabs Profile --------------------------------------->
</div>
</div>
</div>
</div>
</div>

    <!-- RATE AND REVIEW DIALOG -->

    <q-dialog v-model="indiv_rate_review" persistent>
      <q-card style="width: 500px; padding: 20px 10px">
        <q-form enctype="multipart/form-data"  @submit="rateReviewUser()">
        <q-card-section class="q-pt-none">
            
            <div class="q-mb-sm">
                <div class="text-h6">RATINGS</div>
                <q-rating
                    v-model="form_data.rate_user"
                    max="5"
                    size="3em"
                    color="yellow"
                    icon="star_border"
                    icon-selected="star"
                    icon-half="star_half"
                    no-dimming
                />
            </div>
          <div class="text-h6">REVIEWS</div>
          <div style="max-width: 500px">
            <q-input placeholder="Please provide a valid review" color="secondary" v-model="form_data.review" filled autogrow/>
          </div>
          <q-uploader
            square
            flat
            bordered
            multiple
            style="width: 100%; background-color:#651e7f"
            v-model="form_data.review_path"
            accept=".jpeg, .jpg, image/*"
            max-file-size="1000000"
            max-files="3"
            @added="onFileChange"
            class="q-mt-md"
            color="secondary"
            label="Upload (Optional)"
          />
        </q-card-section>

        <q-card-section>
            <div class="row q-mt-xs q-col-gutter-sm">
                <div class="card_area_1 col-12">
                    <q-btn 
                    flat 
                    style="background-color:#651e7f; color:white"  
                    class=" font-rubik-title full-width"
                    type="submit"
                   >
                    SUBMIT
                    </q-btn>
                </div> 
                <div class="card_area_1 col-12">
                    <q-btn  
                    @click="changeRatePopup"
                    v-close-popup 
                    flat 
                    class="main_btn font-rubik-title full-width">
                    CLOSE
                    </q-btn>
                </div>
            </div>
           
        </q-card-section>
        </q-form>
      </q-card>
    </q-dialog>
    <!-- End of rate and review -->


    <!-- REPORT USER DIALOG -->
    <q-dialog v-model="report_user" persistent>
      <q-card style="width: 400px;">
        <q-card-section class="q-pt-md">
          <div class="text-h6">Report</div>
          <div style="max-width: 400px">
          <div class="field q-mt-md">
            <div>
              <q-select
                v-model="form_data.user_report"
                label="*Select a reason"
                :options="report_suggestion"
                outlined
                color="secondary"
                :rules="[val => !!val]"
              />
            </div>
                 <div class="field q-mt-md" v-if="form_data.user_report == 'Others'">
                     <div>
                        <q-input
                            v-model="specified_report_reason"
                            label="*Personalize your own reason"
                            outlined
                            color="secondary"
                            :rules="[val => !!val]"
                        ></q-input>
                    </div>
                </div>

            <div class="text-h6">REASON</div>
              <div style="max-width: 500px">
                <q-input placeholder="Please provide a valid reason" color="secondary" v-model="form_data.reason" filled autogrow/>
              </div>
            <q-uploader
            square
            flat
            bordered
            multiple
            style="width: 100%; background-color:#651e7f"
            v-model="form_data.report_path"
            accept=".jpeg, .jpg, image/*"
            max-file-size="1000000"
            max-files="1"
            @added="onFileChangeReportPath"
            class="q-mt-md"
            color="secondary"
            label="Upload (Optional)"
          />
            </div>
          </div>
    </q-card-section>

        <q-card-section>
                <div class="row q-mt-xs q-col-gutter-sm">
                    <div class="card_area_1 col-12">
                        <q-btn flat style="background-color:#651e7f; color:white "  class=" font-rubik-title full-width"  @click="reportUser()">
                        SUBMIT
                        </q-btn>
                    </div> 
                    <div class="card_area_1 col-12">
                        <q-btn  @click="closePopUpReport()" flat class="main_btn font-rubik-title full-width">CLOSE</q-btn>
                    </div>
                </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- END OF REPORT USER DIALOG -->

  </div>
</template>







<script>
import {
    getUserDetails, 
    getAvatarByGender, 
    getRateAndReviewByUserId,
    postReportUser,
    postRateReviewUser,
    getUserInfo
} from "../../references/url";
import Swal from "sweetalert2";
import moment from "moment-timezone";
import UQModal  from '../../components/UQModal';
import UQUserPostedProducts from '../../components/UQUserPostedProducts';
import UQUserProductsHistory from '../../components/UQUserProductsHistory';
import report_suggestion from "../../references/report";
import io from 'socket.io-client';

export default {
  components: { UQModal, UQUserPostedProducts, UQUserProductsHistory },
  data: () => ({
    moment: moment,
    report_user: false,
    indiv_rate_review: false,
    specified_report_reason: "",
    report_suggestion: report_suggestion,
    profile_tab: 'post',
    info_tabs: true,
    average_rate: 0,
    rate: 0,
    user_info:
    {
      user_id: "",
      first_name: "",
      last_name: "",
      avatar_path: "",
      username: "",
      email: "",
      gender: "",
      cover_photo_path: "",
      about: "",
      total_reviews: "",
      ratings: {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0
      },
      avatar: "",
      cover: ""
    },
    form_data: 
    {
      username: "",
      ratings: "",
      user_id: "",
      avatar_path: "",
      review: "",
      gender: "",
      fullname: "",
      rate_user: 0,
      user_report: "",
      review_path: {},
      reason: "",
      report_path: ""
    },
    ratings_star: {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0
      },
    zoom_image_modal: {
      data: {    
        src: '',
            },
        is_persistent: true
        },
    review_container: {},
    container_avatar: {},
    user_data: {},
    socket: {},
  }),
  async mounted() {
    this.indiv_rate_review = this.$is_rate_open;
    await this.isUserLoggedIn()
    await this.getUserDetails();

    let review_container = await this.getRateReviewByUserId();
    this.review_container = review_container; 

    let avatar = await this.getUserInfo();
    this.form_data.avatar_path = avatar

    this.computeRate()
    this.socket = io('http://localhost:4000', {transports: ['websocket', 'polling', 'flashsocket']});
  },
  methods: {
    resetModel() {
      this.form_data.rate_user = 0;
    },
    onFileChange(files) 
    {
        const file = files;
        this.form_data.review_path = file;
        
    },

    onFileChangeReportPath(files) 
    {
        const file = files[0];
        this.form_data.report_path = file;
        console.log(this.form_data.report_path)
    },

    async isUserLoggedIn()
    {
        let user = await this.$_isUserAuthenticated();
        console.log(user)
        if (user.data.status == 'not authenticated') {
            this.$router.push({name: 'documentation_login'});
        } else if (user.data.status == 'authenticated') {
            this.user_data = user.data.user;
        }
    },
      
    async getUserDetails()
    {
      let id = this.$route.params.id;
      let user = await this.$_get(`${getUserDetails}/${id}`);
      
      this.user_info.username = user.data.username;
      this.user_info.avatar_path = `http://localhost:4000/avatar/${user.data.gender}/${user.data.avatar_path}`;
      this.user_info.avatar = user.data.avatar_path
      this.user_info.email = user.data.email;
      this.user_info.gender = user.data.gender;
      this.user_info.cover_photo_path = `http://localhost:4000/cover-photo/${user.data.cover_photo_path}`;
      this.user_info.cover = user.data.cover_photo_path
      this.user_info.user_id = user.data._id
      this.user_info.about = user.data.about
      this.user_info.ratings.one = user.data.ratings.one 
      this.user_info.ratings.two = user.data.ratings.two 
      this.user_info.ratings.three = user.data.ratings.three 
      this.user_info.ratings.four = user.data.ratings.four 
      this.user_info.ratings.five = user.data.ratings.five
      this.user_info.total_reviews = user.data.total_reviews
      this.user_info.first_name = user.data.first_name
      this.user_info.last_name = user.data.last_name
      this.user_info.followers = user.data.followers
      this.user_info.following = user.data.following
    },

    async getRateReviewByUserId() {
      let res = await this.$_post(getRateAndReviewByUserId, {
        user_id: this.user_info.user_id, //local storage or session
      });
      return res.data;
    },

    async closeModal(modalRef)
    {
        this.$refs[modalRef].hide();
    },

    async zoomImage(image_url)
    {
        this.zoom_image_modal.data.src = image_url;
        console.log(this.$refs['zoom_image_modal'])
        this.$refs['zoom_image_modal'].show();
    },

    async computeRate() {
      
      this.ratings_star.one = this.user_info.ratings.one * 1;
      this.ratings_star.two= this.user_info.ratings.two * 2;
      this.ratings_star.three = this.user_info.ratings.three * 3;
      this.ratings_star.four = this.user_info.ratings.four * 4;
      this.ratings_star.five = this.user_info.ratings.five * 5;

      this.total_stars =
        this.ratings_star.one +
        this.ratings_star.two +
        this.ratings_star.three +
        this.ratings_star.four +
        this.ratings_star.five;

      this.total_user_rate =
        this.user_info.ratings.one +
        this.user_info.ratings.two +
        this.user_info.ratings.three +
        this.user_info.ratings.four +
        this.user_info.ratings.five;

      this.average_rate = Math.round(this.total_stars / this.total_user_rate);
      if (isNaN(this.average_rate) == true) {
        this.rate2 = 0;
      } else {
        this.rate = this.average_rate;
      }
    },

    async rateReview(id, username, ratings, gender, fullname){
      this.form_data.user_id = id;
      this.form_data.username = username;
      this.form_data.ratings = ratings;
      this.form_data.gender = gender;
      this.form_data.fullname = fullname;
      this.indiv_rate_review = true;
    },

    async report(id, username, ratings, avatar_path, gender, fullname) {
      this.form_data.user_id = id;
      this.form_data.username = username;
      this.form_data.ratings = ratings;
      this.form_data.avatar_path = avatar_path;
      this.form_data.gender = gender;
      this.form_data.fullname = fullname;
      this.report_user = true;
    },

    async closePopUpReport(){
        this.form_data.user_report = ''
        this.specified_report_reason = ''
        this.report_user = false;
    },

   async rateReviewUser(){
      this.$q.loading.show();

      if(this.form_data.review == ''){
          this.indiv_rate_review = false;
          this.$store.commit('user/changeRatePopup', false);
          Swal.fire({
          icon: "error",
          title: "Error",
          text: "Review Field is required",
        });
        this.$q.loading.hide();
      } else {
        const fd = new FormData();
        const review_path = this.form_data.review_path;


        fd.append("user_id", this.form_data.user_id);
        fd.append("user_name_rated_reviewed", this.form_data.username);
        fd.append("reviewer_id", this.user_data._id); //localstorage or session storage
        fd.append("reviewer_first_name", this.user_data.first_name); //localstorage or session storage
        fd.append("reviewer_last_name", this.user_data.last_name); //localstorage or session storage
        fd.append("rate", this.form_data.rate_user);
        fd.append("review", this.form_data.review);
        fd.append("gender", this.user_data.gender); //localstorage or session storage
        fd.append("avatar_path", this.form_data.avatar_path); //localstorage or session storage

        for (let i = 0; i < review_path.length; i++) 
        {   
          fd.append('review_path', review_path[i]);
        }

      let res = await this.$_post(postRateReviewUser, fd);
      this.$q.loading.hide();
      if (res.status == 200) {
        this.resetModel();
        this.indiv_rate_review = false;
        this.$store.commit('user/changeRatePopup', false);
        this.form_data.review = ''
        this.form_data.review_path = ''
        Swal.fire({
          icon: "success",
          title: "Congrats...",
          text: "Successfully Rated",
        });
      }
      }
      await this.getAllUser();
    },

    async reportUser() {
        if(this.form_data.user_report == 'Others')
        {
          this.form_data.user_report = this.specified_report_reason;
        }else {
          this.form_data.user_report = this.form_data.user_report;
        }
      this.$q.loading.show();

      if(this.form_data.user_report == ''){
          this.report_user = false;
          Swal.fire({
          icon: "error",
          title: "Error",
          text: "Report Field is required",
        });
      this.$q.loading.hide();
      } else {

        const fd = new FormData();
        fd.append("user_id", this.form_data.user_id);
        fd.append("user_name", this.form_data.username);
        fd.append("reviewer_id", this.user_data._id);
        fd.append("reviewer_first_name", this.user_data.first_name);
        fd.append("reviewer_last_name", this.user_data.last_name);
        fd.append("report", this.form_data.user_report);
        fd.append("reason", this.form_data.reason);
        fd.append("report_path", this.form_data.report_path);

        let res = await this.$_post(postReportUser, fd);

      this.$q.loading.hide();
      if (res.status == 200) {
        this.report_user = false;
        this.form_data.user_report = ''
        this.specified_report_reason = ''
        this.form_data.reason
        Swal.fire({
          icon: "success",
          title: "Congrats...",
          text: "Successfully Reported",
        });
      }
      }
    },

    changeRatePopup()
    {
        this.$store.commit('user/changeRatePopup', false);
    },

    async getUserInfo() {
      let res = await this.$_post(getUserInfo, {
        user_id: this.user_data._id , //local storage or session
      });
      return res.data.avatar_path;
    },
    // chat purpose
    async chat(id, username) {
      this.socket.emit('initiate_chat_personal', { is_active: true, user_id: id, username: username });
    },
    //end of chat purpose
  },
};
</script>
<style scoped>
body 
{
    background: #f6f6f6 !important;
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
            .desktop__header
        {
            display: none;
        }
}
.change__imgs {
  opacity: 1;
  transition: 1s;
  z-index: 3;
}
.change__imgs:hover {
  opacity: 0.5;
}
.card_area_1 .main_btn {
    padding: 0 10px;
    color: black;
    text-decoration: none;
    border:1px solid #651e7f;
    text-transform: uppercase;
    transition: 0.5s;
  }
 .card_area_1 .main_btn:hover {
    background-color:#651e7f;
    color: white;
  }

  .followers{
    text-decoration: none; 
    color:grey;
    font-weight: 500;
  }
  a.followers:hover{
      color:#651e7f;
      border-bottom: 0.5px solid #651e7f;
  }



</style>


