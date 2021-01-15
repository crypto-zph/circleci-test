<template>
<div>
    <div>
    <!-- Mobile View -->
      <div class="mobile__header">
        <div class="row header__container">
          <div>
            <q-img  class="display__picture1" :src="user_info.avatar_path">
            </q-img>
          </div>
          <div class="flex flex-center q-ml-md">
                <h4 class="font-rubik-title name__user2"><span class="name__user_text">{{user_info.username}}</span> <br> 
                <q-rating
                    v-model="rate"
                    class="q-mb-md rating__user"
                    size="0.6em"
                    color="orange"
                    readonly
                />
                <br></h4>
          </div>
        </div>
    </div>
     <!-- End of Mobile View -->

    <!-- Cover Photo -->
    <div v-if="user_info.cover != ''">
         <q-img class="bg__cover" :src="user_info.cover_photo_path" style="border-bottom: 3px solid #FDB81F; height: 250px"></q-img>
    </div>
    <div v-else>
         <q-img class="bg__cover"  src="cover-photo/default.png" style="border-bottom: 3px solid #FDB81F; height: 250px"></q-img>
    </div>
    <!-- End of Cover Photo -->

     <!-- HEADER  -->
    <div class="row q-col-gutter-md q-px-xl">
        <!-- AVATAR -->
        <div class="col-2 com-md-12 desktop__header">
            <div>
                <div
                class="q-pt-md  text-subtitle2 flex flex-center"
                v-if="user_info.avatar != ''">
                    <q-img
                    style="
                        width: 200px;
                        height: 200px;
                        z-index: -1;
                        border-radius: 10px;"
                    :src="user_info.avatar_path">
                    </q-img>
                </div>

                <div
                    v-else
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
            </div>
        </div>
        <!-- End of AVATAR -->

        <!-- USER NAME -->
        <div class="col self-end desktop__header">
            <div>
                <h4 class="font-rubik-title "><span class="">{{user_info.username}}</span> <br> 
                <q-rating
                    v-model="rate"
                    class="q-mb-md rating__user"
                    size="0.6em"
                    color="orange"
                    readonly/>
                <br>
                </h4>
                <div class="flex" >
                    <div class="q-mr-lg">
                       <a class="followers" :href="`/#/user/follow/${user_info.user_id}`" >
                        {{Object.keys(user_info.followers).length}} Followers</a> 
                    </div>
                    <div>
                        <a class="followers" :href="`/#/user/follow/${user_info.user_id}`" >  {{Object.keys(user_info.following).length}} Following</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- End of USER NAME -->


        <!-- TABS -->
        <div class="col q-pr-xl">
            <q-tabs dense v-model="profile_tab" align="right" class="tabs__width  panels__desktop font-rubik-title" active-bg-color="accent" animated indicator-color="transparent">
                <q-tab class="bg-secondary text-white tabs__padding-desktop profile__width" name="post" >Posted</q-tab>
                <q-tab class="bg-secondary text-white tabs__padding-desktop profile__width" name="reviews" >Ratings And Reviews</q-tab>
                <q-tab class="bg-secondary text-white tabs__padding-desktop profile__width" name="trades" >Trades</q-tab>
            </q-tabs>
        </div>
        <!-- End of TABS -->
    </div>
    <!-- End of HEADER  -->

    <!-- desktop tabs -->
    <div class="row panels__desktop">

        <!-- ABOUT SECTION AND RATE AND REVIEW AND REPORT BUTTON -->
        <div class="col-5 q-px-xl q-mt-xl">
            <div class="row">
                <div class="col">
                    <div class="text-h5 font-rubik-title q-ml-md q-mb-sm">
                        About            
                    </div>
                </div>
            </div>

            <div class="bg-white q-pa-md font-rubik-labels" 
                 style="border-radius: 20px; box-shadow: 0px 5px 3px 1px #bababa">
                {{user_info.about}}
            </div>
                
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
                <!-- <div class="card_area_1 col-12">
                    <q-btn flat  class="main_btn font-rubik-title full-width">
                      FOLLOW
                    </q-btn>
                </div> -->
            </div>
        </div>
         <!-- END OF ABOUT SECTION AND RATE AND REVIEW AND REPORT BUTTON -->

        <!-- TABS -->
        <div class="col-7 q-pr-xl" style="margin-top: 88px">
            <q-tab-panels v-model="profile_tab" animated style="border-radius: 20px;box-shadow: 0px 5px 3px 1px #bababa">

                <!-- POST TAB -->
                <q-tab-panel name="post">
                    <div class="text-h6 font-rubik-labels"><b>Posted</b></div>
                    <q-separator/>
                    <span>
                    <div class="q-pa-sm">
                      <div class="row q-col-gutter-md">

                        <div class="col-3">
                            <q-card class="my-card">
                                <img src="products/product_07.jpg">
                                    <q-card-section class="q-px-sm">
                                        <div style="font-size: 13px;" class="item__title">SYCARA V SKAT YAAKUN</div>
                                        <div class="text-subtitle2 text-accent q-mt-xs">$1,212,200</div>
                                    </q-card-section>
                            </q-card>
                        </div>

                         <div class="col-3">
                            <q-card class="my-card">
                                <img src="products/product_06.jpg">
                                    <q-card-section class="q-px-sm">
                                        <div style="font-size: 13px;" class="item__title">Audi R8 v8 model 2018 330HP</div>
                                        <div class="text-subtitle2 text-accent q-mt-xs">$150,000</div>
                                    </q-card-section>
                            </q-card>
                        </div>

                        <div class="col-3">
                            <q-card class="my-card">
                                <img src="products/product_01.jpg">
                                    <q-card-section class="q-px-sm">
                                        <div style="font-size: 13px;" class="item__title">2 Stories House and lot</div>
                                        <div class="text-subtitle2 text-accent q-mt-xs">$330,000</div>
                                    </q-card-section>
                            </q-card>
                        </div>
                        
                      </div>
                    </div>
                  </span>
                </q-tab-panel>
                 <!-- END OFPOST TAB -->
                
                <!-- REVIEWS -->
                <q-tab-panel name="reviews">
                  <div class="text-h6 font-rubik-title">Ratings and Reviews </div>
                    <div class="q-mb-md">
                        <!-- <q-card class="my-card">
                        <q-card-section> -->
                            <div class="row">
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
                                    <div class="col-12" v-else>
                                          (0 Review) 
                                    </div>
                                    </div>
                                </div>
                            </div>
                        <!-- </q-card-section>
                        </q-card> -->
                    </div>
                  <q-separator/>

                  <div class="q-pt-sm" v-for="(review, i) in review_container" :key="i">
                   <q-item v-ripple v-if="review.review.length != 0">
                      <q-item-section avatar>
                        <q-avatar v-if="review.avatar_path == ''">
                            <img src="../../../public/avatar/default.jpeg" />
                        </q-avatar>
                        <q-avatar color="primary" text-color="white" v-if="review.avatar_path != ''">
                            <img :src="`http://localhost:4000/avatar/${review.gender}/${review.avatar_path}`">
                        </q-avatar>
                      </q-item-section>
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
                        <q-item-label style="font-size: 12px;">{{moment(review.created_timestamp).format('DD-MMM-YYYY hh:mm a')}}</q-item-label>
                      </q-item-section>
                      <q-item-section   >
                          {{ review.review }}
                      </q-item-section>

                      <q-item-section v-if="review.review_path[0] == '' && review.review_path[1] == '' && review.review_path[2] == '' || review.review_path == '' ">
                        <div>
                          No Uploaded Picture for review
                        </div>
                      </q-item-section>

                      <q-item-section v-if="review.review_path.length == 1 && review.review_path[0] != '' ">
                        <div>
                           <img  @click="zoomImage(`http://localhost:4000/reviews/${review.reviewer_id}/${review.review_path[0]}`)" 
                           style="height: 100px; width: 200px;" 
                           :src="`http://localhost:4000/reviews/${review.reviewer_id}/${review.review_path[0]}`">
                        </div>
                      </q-item-section>


                      <q-item-section v-if="review.review_path.length == 2 && review.review_path[0] != ''">
                           <img  
                            @click="zoomImage(`http://localhost:4000/reviews/${review.reviewer_id}/${review.review_path[0]}`)" 
                            style="height: 50px; width: 200px;" 
                            :src="`http://localhost:4000/reviews/${review.reviewer_id}/${review.review_path[0]}`">
                            <img
                            class="q-mt-sm"  
                            @click="zoomImage(`http://localhost:4000/reviews/${review.reviewer_id}/${review.review_path[1]}`)" 
                            style="height: 50px; width: 200px;" 
                            :src="`http://localhost:4000/reviews/${review.reviewer_id}/${review.review_path[1]}`" >
                      </q-item-section>

                      <q-item-section v-if="review.review_path.length == 3 && review.review_path[0] != ''">
                           <img
                           style="height: 50px; width: 200px;" 
                           :src="`http://localhost:4000/reviews/${review.reviewer_id}/${review.review_path[0]}`"  
                           @click="zoomImage(`http://localhost:4000/reviews/${review.reviewer_id}/${review.review_path[0]}`)" >
                            <img
                            class="q-mt-sm" 
                            style="height: 50px; width: 200px;" 
                            :src="`http://localhost:4000/reviews/${review.reviewer_id}/${review.review_path[1]}`"  
                            @click="zoomImage(`http://localhost:4000/reviews/${review.reviewer_id}/${review.review_path[1]}`)" >
                             <img
                             class="q-mt-sm"  
                             style="height: 50px; width: 200px;" 
                             :src="`http://localhost:4000/reviews/${review.reviewer_id}/${review.review_path[2]}`"  
                             @click="zoomImage(`http://localhost:4000/reviews/${review.reviewer_id}/${review.review_path[2]}`)" >
                      </q-item-section>
                    </q-item>
                    <q-separator/>
                </div>

                <u-q-modal :modal_data="zoom_image_modal" ref="zoom_image_modal">
                    <template v-slot:body="props">
                        <img  :src="props.data.src" />
                    </template>
                </u-q-modal>

                <q-item v-if="review_container.length === 0">
                      <q-item-section class="text-center">
                          No reviews yet
                      </q-item-section>
                    </q-item>
            </q-tab-panel>
            <!-- End of Reviews -->

            <!-- Trades Tab -->
            <q-tab-panel name="trades">
                <div class="text-h6 font-rubik-title">
                    Trades
                </div>
                <q-separator/>
                <span class="font-rubik-labels">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </span>
            </q-tab-panel>
            <!-- End of Trades Tab -->
              </q-tab-panels>

              <br><br>

        </div>
        <!-- End of Tabs -->
    </div>
    <!-- End of Desktop Tabs -->

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



    <!-- END OF RATE AND REVIEW DIALOG -->

    <!-- Mobile tabs -->
    <div class="row panels__mobile">
        <div class="col-12 q-mt-xl" style="padding: 0 48px 0 40px">
            <div class="text-h5 font-rubik-title q-ml-md q-mb-sm">
                About
            </div>
            <div class="bg-white q-pa-md" style="border-radius: 20px;box-shadow: 0px 5px 3px 1px #bababa">
                {{user_info.about}}
            </div>

            <div class="row q-mt-md q-col-gutter-sm">
                <div class="col-6" >
                    <q-btn style="background-color:#651e7f; color:white " 
                           flat 
                           class="font-rubik-title full-width"
                           @click="rateReview(
                            user_info.user_id,
                            user_info.username,
                            user_info.ratings,
                            user_info.avatar_path,
                            user_info.gender,
                            user_info.fullname,
                            userinfo
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
                <div class="card_area_1 col-12">
                    <q-btn flat  class="main_btn font-rubik-title full-width">
                      FOLLOW
                    </q-btn>
                </div>
            </div>
        </div>
                  <div class="col-12" style="padding: 0 48px 0 40px">
                     <div>
                  <q-tabs dense v-model="profile_tab" align="right" class="tabs__width2 font-rubik-title" active-bg-color="accent" animated indicator-color="transparent">
                    <q-tab class="bg-secondary text-white tabs__padding profile__width" name="post" >Posted</q-tab>
                    <q-tab class="bg-secondary text-white tabs__padding profile__width" name="reviews" >Reviews</q-tab>
                    <q-tab class="bg-secondary text-white tabs__padding profile__width" name="trades" >Trades</q-tab>
                  </q-tabs>
                </div>
                <q-tab-panels v-model="profile_tab" animated style="border-radius: 0 0 20px 20px; box-shadow: 0px 5px 3px 1px #bababa">
                <q-tab-panel name="post">
                  <div class="text-h6 font-rubik-title">Posted</div>
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </q-tab-panel>

        <q-tab-panel name="reviews">
            <div class="text-h6 font-rubik-title">Reviews</div>
                <div class="q-pt-sm" v-for="(review, i) in review_container" :key="i">
                   <q-item v-ripple v-if="review.review.length != 0">
                       <div class="row">
                           <div class="col-12 text-center">
                            <q-item-section avatar align="center">
                                <q-avatar  v-if="review.avatar_path == ''">
                                    <img class="text-center" src="../../../public/avatar/default.jpeg" />
                                </q-avatar>
                                <q-avatar color="primary" text-color="white" v-if="review.avatar_path != ''">
                                        <img :src="`http://localhost:4000/avatar/${review.gender}/${review.avatar_path}`">
                                </q-avatar>
                            </q-item-section>
                            <q-item-section class="text-center">
                                <q-item-label>{{review.reviewer_first_name}} {{review.reviewer_last_name}}</q-item-label>
                                 <q-item-label style="font-size: 12px;">{{moment(review.created_timestamp).format('DD-MMM-YYYY hh:mm a')}}</q-item-label>
                                <q-item-label>                          
                                <q-rating
                                    v-model="review.rate"
                                    class="q-mb-md rating__user"
                                    size="1em"
                                    color="orange"
                                    readonly/>
                                </q-item-label>
                           
                            </q-item-section>
                           </div>
                           <div class="col-12 text-center">           
                                <q-item-section>
                                    {{ review.review }}
                                </q-item-section>
                           </div>
                           <div class="col-12 text-center">
                                <q-item-section v-if="review.review_path[0] == '' && review.review_path[1] == '' && review.review_path[2] == '' || review.review_path == '' ">
                                    <div>
                                    No Uploaded Picture for review
                                    </div>
                                </q-item-section>

                                <q-item-section v-if="review.review_path.length == 1 && review.review_path[0] != '' ">
                                    <div class="text-center">
                                    <img  @click="zoomImage(`http://localhost:4000/reviews/${review.reviewer_id}/${review.review_path[0]}`)" 
                                    style="height: 100px; width: 200px;" 
                                    :src="`http://localhost:4000/reviews/${review.reviewer_id}/${review.review_path[0]}`">
                                    </div>
                                </q-item-section>

                                <q-item-section v-if="review.review_path.length == 2 && review.review_path[0] != ''">
                                    <div class="row text-center">
                                        <div class="col-6">
                                            <img  
                                                @click="zoomImage(`http://localhost:4000/reviews/${review.reviewer_id}/${review.review_path[0]}`)" 
                                                style="height: 50px; width: 200px;" 
                                                :src="`http://localhost:4000/reviews/${review.reviewer_id}/${review.review_path[0]}`">
                                        </div>
                                        <div class="col-6">
                                            <img
                                            class="q-mt-sm"  
                                            @click="zoomImage(`http://localhost:4000/reviews/${review.reviewer_id}/${review.review_path[1]}`)" 
                                            style="height: 50px; width: 200px;" 
                                            :src="`http://localhost:4000/reviews/${review.reviewer_id}/${review.review_path[1]}`" >
                                        </div>
                                    </div>
                                </q-item-section>
                                <q-item-section v-if="review.review_path.length == 3 && review.review_path[0] != ''">
                                    <div class="row q-col-gutter-xl">
                                        <div class="col-4">
                                            <img
                                            class="q-mt-sm"
                                            style="height: 100px; width: 150px;" 
                                            :src="`http://localhost:4000/reviews/${review.reviewer_id}/${review.review_path[0]}`"  
                                            @click="zoomImage(`http://localhost:4000/reviews/${review.reviewer_id}/${review.review_path[0]}`)" >
                                        </div>
                                        <div class="col-4">
                                            <img
                                            class="q-mt-sm" 
                                            style="height: 100px; width: 150px;" 
                                            :src="`http://localhost:4000/reviews/${review.reviewer_id}/${review.review_path[1]}`"  
                                            @click="zoomImage(`http://localhost:4000/reviews/${review.reviewer_id}/${review.review_path[1]}`)" >
                                        </div>
                                        <div class="col-4">
                                            <img
                                            class="q-mt-sm"  
                                            style="height: 100px; width: 150px;" 
                                            :src="`http://localhost:4000/reviews/${review.reviewer_id}/${review.review_path[2]}`"  
                                            @click="zoomImage(`http://localhost:4000/reviews/${review.reviewer_id}/${review.review_path[2]}`)" >
                                        </div>
                                    </div>


                                </q-item-section>
                           </div>
                       </div>
                    </q-item>
                    <q-separator/>
                </div>
                </q-tab-panel>

                <q-tab-panel name="trades">
                  <div class="text-h6 font-rubik-title">Trades</div>
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </q-tab-panel>
              </q-tab-panels>
                  </div>
                </div>
    </div>
  </div>
</template>
