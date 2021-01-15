<template>
  <div>
    <div class="row items-start q-gutter-md">
      <div v-for="(user, i) in user_container" :key="i" class="col-12">
        <q-card flat bordered>
          <div>
            <q-item>
              <q-item-section avatar>
                <q-avatar v-if="user.avatar_path != ''">
                  <img
                    :src="`http://localhost:4000/avatar/${user.gender}/${user.avatar_path}`"
                  />
                </q-avatar>

                <q-avatar v-if="user.avatar_path == ''">
                  <img src="avatar/default.jpeg" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label style="cursor: pointer;">  <a :href="`/#/user/details/${user._id}`">{{ user.username }}</a>  </q-item-label>
                <q-item-label caption> {{ user.email }} </q-item-label>
                <q-item-label>
                  <q-rating
                    :value="
                      Math.round(
                        (user.ratings.one * 1 +
                          user.ratings.two * 2 +
                          user.ratings.three * 3 +
                          user.ratings.four * 4 +
                          user.ratings.five * 5) /
                          (user.ratings.one +
                            user.ratings.two +
                            user.ratings.three +
                            user.ratings.four +
                            user.ratings.five)
                      )
                    "
                    max="5"
                    size="2em"
                    color="yellow"
                    icon="star_border"
                    icon-selected="star"
                    icon-half="star_half"
                    no-dimming
                    readonly
                  />
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-separator />

            <q-responsive :ratio="16 / 9">
              <!-- notice "border-radius-inherit" below; it's important when in a QCard -->
              <q-card-section
                class="border-radius-inherit text-center bg-grey-1"
              >
              <div class="row justify-around">
                <!-- <div class="col-4">
                    <q-btn 
                      color="primary" 
                      @click="rate(
                        user._id,
                        user.username,
                        user.ratings,
                        user.avatar_path,
                        user.gender,
                      )
                    ">
                      Rate and Review
                    </q-btn>
                </div> -->
                  <div class="col-6">
                    <q-btn 
                      color="primary" 
                      @click="rateReview(
                        user._id,
                        user.username,
                        user.ratings,
                        user.avatar_path,
                        user.gender,
                      )
                    ">
                      Rate and Review
                    </q-btn>
                </div>
                <div class="col-6">
                  <q-btn color="primary"
                        @click="report(
                        user._id,
                        user.username,
                        user.ratings,
                        user.avatar_path,
                        user.gender,
                        )">
                    Report
                  </q-btn>
                </div>
              </div>
              </q-card-section>
            </q-responsive>
          </div>
        </q-card>
      </div>
    </div>

    <!-- <q-dialog v-model="indiv_user">
      <q-card style="width: 350px; max-width: 40vw; padding: 20px 10px">
        <q-card-section class="q-pt-none">
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
            @click="rateUser()"
          />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <div class="text-h6">REVIEWS</div>
          <div style="max-width: 300px">
            <q-input v-model="form_data.review" filled autogrow />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="CLOSE" color="primary" v-close-popup />
          <q-btn flat label="SUBMIT" color="primary" @click="reviewUser()" />
        </q-card-actions>
      </q-card>
    </q-dialog> -->

    <q-dialog v-model="report_user">
      <q-card style="width: 350px; max-width: 40vw; padding: 20px 10px">
        <q-card-section class="q-pt-md">
          <div class="text-h6">Report</div>
          <div style="max-width: 300px">
          <div class="field q-mt-md">
            <div>
              <q-select
                v-model="form_data.user_report"
                label="*Select a reason"
                :options="report_suggestion"
                outlined
                color="accent"
                :rules="[val => !!val]"
              />
        </div>
        <div class="field q-mt-md" v-if="form_data.user_report == 'Others'">
        <div>
          <q-input
            v-model="specified_report_reason"
            label="*Personalize your own reason"
            outlined
            color="accent"
            :rules="[val => !!val]"
          ></q-input>
        </div>
      </div>
      </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="CLOSE" color="primary" @click="closePopUpReport()" />
          <q-btn flat label="SUBMIT" color="primary" @click="reportUser()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="indiv_rate_review">
      <q-card style="width: 350px; max-width: 40vw; padding: 20px 10px">
        <q-card-section class="q-pt-none">
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
        </q-card-section>

        <q-card-section class="q-pt-md">
          <div class="text-h6">REVIEWS</div>
          <div style="max-width: 300px">
            <q-input v-model="form_data.review" filled autogrow/>
          </div>
          <q-uploader
            square
            flat
            bordered
            multiple
            style="width: 100%"
            v-model="form_data.review_path"
            accept=".jpeg, .jpg, image/*"
            max-file-size="1000000"
            max-files="3"
            @added="onFileChange"
            class="q-mt-md"
            label="Upload (Optional)"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="CLOSE" color="primary" v-close-popup />
          <q-btn flat label="SUBMIT" color="primary" @click="rateReviewUser()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {
  postGetAllUser,
  postRate,
  postrReviewUser,
  postReportUser,
  postRateReviewUser
} from "../../references/url";
import Swal from "sweetalert2";
import report_suggestion from "../../references/report"

export default {
  components: {},
  data: () => ({
    report_user: false,
    indiv_user: false,
    indiv_rate_review: false,
    user_container: {},
    form_data: {
      username: "",
      ratings: "",
      user_id: "",
      avatar_path: "",
      review: "",
      gender: "",
      fullname: "",
      rate_user: 0,
      user_report: "",
      review_path: {}
    },
    specified_report_reason: "",
    report_suggestion: report_suggestion
  }),

  computed:
  {
        validateReviewField()
        {
            return [
                val => !!val || `Review is required`,
            ];
           
        },
  },
  async mounted() {
    this.$q.loading.show();

    let users = await this.getAllUser();
    this.user_container = users;

    this.$q.loading.hide();
  },

  methods: {
    viewUser(username){
      alert(username)
    },
    resetModel() {
      this.form_data.rate_user = 0;
    },
    onFileChange(files) 
    {
        const file = files;
        this.form_data.review_path = file;
        console.log(this.form_data.review_path)
    },
    async getAllUser() {
      let res = await this.$_post(postGetAllUser);
      return res.data;
    },
    async rate(id, username, ratings, avatar, gender, fullname) {
      this.form_data.username = username;
      this.form_data.avatar_path = avatar;
      this.form_data.user_id = id;
      this.form_data.atings = ratings;
      this.form_data.gender = gender;
      this.form_data.fullname = fullname
      this.indiv_rate_review = true;
    },

    async rateReview(id, username, ratings, avatar, gender, fullname){
      this.form_data.username = username;
      this.form_data.avatar_path = avatar;
      this.form_data.user_id = id;
      this.form_data.atings = ratings;
      this.form_data.gender = gender;
      this.form_data.fullname = fullname
      this.indiv_rate_review = true;
    },

    async report(id, username, ratings, fullname) {
      this.form_data.username = username;
      this.form_data.user_id = id;
      this.form_data.ratings = ratings;
      this.form_data.fullname = fullname;
      this.report_user = true;
    },
    async rateUser() {
      this.$q.loading.show();
      let res = await this.$_post(postRate, {
        user_id: this.form_data.user_id,
        reviewer_id: "5f8fdfa15e445716ac0355e5", //localstorage or session storage
        reviewer_first_name: "Andrea", //localstorage or session storage
        reviewer_last_name: "Destajo", //localstorage or session storage
        rate: this.form_data.rate_user,
      });
      this.$q.loading.hide();

      if (res.status == 200) {
        this.resetModel();
        this.indiv_user = false;
        Swal.fire({
          icon: "success",
          title: "Congrats...",
          text: "Successfully Rated",
        });
      }
      await this.getAllUser();
    },
    async reviewUser() {
      this.$q.loading.show();
      let res = await this.$_post(postrReviewUser, {
        user_id: this.form_data.user_id, //pergent
        user_name: this.form_data.username,
        reviewer_id: "5f8fdfa15e445716ac0355e5", //localstorage or session storage
        reviewer_first_name: "Andrea", //localstorage or session storage
        reviewer_last_name: "Destajo", //localstorage or session storage
        review: this.form_data.review,
        // avatar_path: this.avatar_path, //localstorage or session storage //kailangan to para masave yung current avatar ni reviewer
        gender: "FEMALE", //localstorage or session storage
        avatar_path: "1601622265575.jpeg", //localstorage or session storage
      });

      this.$q.loading.hide();
      if (res.status == 200) {
        this.indiv_user = false;
        this.form_data.review = ''
        Swal.fire({
          icon: "success",
          title: "Congrats...",
          text: "Successfully Reviewed",
        });
      }
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
      let res = await this.$_post(postReportUser, {
        user_id: this.form_data.user_id, //pergent
        user_name: this.form_data.username,
        reviewer_id: "5f8fdfa15e445716ac0355e5", //localstorage or session storage
        reviewer_first_name: "Andrea", //localstorage or session storage
        reviewer_last_name: "Destajo", //localstorage or session storage
        report: this.form_data.user_report,
      });

      this.$q.loading.hide();
      if (res.status == 200) {
        this.report_user = false;
        this.form_data.user_report = ''
        this.specified_report_reason = ''
        Swal.fire({
          icon: "success",
          title: "Congrats...",
          text: "Successfully Reported",
        });
      }
      }
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
          Swal.fire({
          icon: "error",
          title: "Error",
          text: "Review Field is required",
        });
        this.$q.loading.hide();
      } else {
        const fd = new FormData();
        const review_path = this.form_data.review_path;

        for (let i = 0; i < review_path.length; i++) 
        {   
          fd.append('review_path', review_path[i]);
        }
        fd.append("user_id", this.form_data.user_id);
        fd.append("user_name_rated_reviewed", this.form_data.username);
        fd.append("reviewer_id", "5f8fdfa15e445716ac0355e5"); //localstorage or session storage
        fd.append("reviewer_first_name", "Toqaful"); //localstorage or session storage
        fd.append("reviewer_last_name", "Yoasaful"); //localstorage or session storage
        fd.append("rate", this.form_data.rate_user);
        fd.append("review", this.form_data.review);
        fd.append("gender", "MALE"); //localstorage or session storage
        fd.append("avatar_path", "1601622238633.jpeg"); //localstorage or session storage

      let res = await this.$_post(postRateReviewUser, fd);
      this.$q.loading.hide();
      if (res.status == 200) {
        this.resetModel();
        this.indiv_rate_review = false;
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
  },
};
</script>