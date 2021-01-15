<template>
    <span>
         <q-img v-if="image_blank" class="display__picture1" src="profile-imgs/blank.jpg">
           <div class="absolute-full text-subtitle2 flex flex-center change__imgs">
                <q-btn flat icon="fas fa-images" class="q-pa-md btn-img" round size="10px" @click="show_images = true"></q-btn>
              </div>
           </q-img>
         <q-img v-if="image_boy1" class="display__picture1" src="profile-imgs/boy-dp1.jpg" style="z-index: 5">
         <div class="absolute-full text-subtitle2 flex flex-center change__imgs">
                <q-btn flat icon="fas fa-images" class="q-pa-md btn-img" round size="10px" @click="show_images = true"></q-btn>
              </div>
              </q-img>
          <q-img v-if="image_boy2" class="display__picture1" src="profile-imgs/boy-dp2.jpg" style="z-index: 5">
          <div class="absolute-full text-subtitle2 flex flex-center change__imgs">
                <q-btn flat icon="fas fa-images" class="q-pa-md btn-img" round size="10px" @click="show_images = true"></q-btn>
              </div>
              </q-img>
           <q-img v-if="image_boy3" class="display__picture1" src="profile-imgs/boy-dp3.jpg" style="z-index: 5">
           <div class="absolute-full text-subtitle2 flex flex-center change__imgs">
                <q-btn flat icon="fas fa-images" class="q-pa-md btn-img" round size="10px" @click="show_images = true"></q-btn>
              </div>
              </q-img>
            <q-img v-if="image_boy4" class="display__picture1" src="profile-imgs/boy-dp4.jpg" style="z-index: 5">
                <div class="absolute-full text-subtitle2 flex flex-center change__imgs">
                <q-btn flat icon="fas fa-images" class="q-pa-md btn-img" round size="10px" @click="show_images = true"></q-btn>
              </div>
            </q-img>
            <!-- girls -->
              <q-img v-if="image_girl1" class="display__picture1" src="profile-imgs/girl-dp1.jpg" style="z-index: 5">
                <div class="absolute-full text-subtitle2 flex flex-center change__imgs">
                <q-btn flat icon="fas fa-images" class="q-pa-md btn-img" round size="10px" @click="show_images = true"></q-btn>
              </div>
            </q-img>
              <q-img v-if="image_girl2" class="display__picture1" src="profile-imgs/girl-dp2.jpg" style="z-index: 5">
                <div class="absolute-full text-subtitle2 flex flex-center change__imgs">
                <q-btn flat icon="fas fa-images" class="q-pa-md btn-img" round size="10px" @click="show_images = true"></q-btn>
              </div>
            </q-img>
              <q-img v-if="image_girl3" class="display__picture1" src="profile-imgs/girl-dp3.jpg" style="z-index: 5">
                <div class="absolute-full text-subtitle2 flex flex-center change__imgs">
                <q-btn flat icon="fas fa-images" class="q-pa-md btn-img" round size="10px" @click="show_images = true"></q-btn>
              </div>
            </q-img>
              <q-img v-if="image_girl4" class="display__picture1" src="profile-imgs/girl-dp4.jpg" style="z-index: 5">
                <div class="absolute-full text-subtitle2 flex flex-center change__imgs">
                <q-btn flat icon="fas fa-images" class="q-pa-md btn-img" round size="10px" @click="show_images = true"></q-btn>
              </div>
            </q-img>

            <q-dialog v-model="show_images" seamless>
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
                      <div class="col-3">
                          <q-img @click="image_boy_1" class="display__picture_boy image__hover1" src="profile-imgs/boy-dp1.jpg"></q-img>
                    </div>
                         <div class="col-3">
                             <q-img @click="image_boy_2" class="display__picture_boy image__hover2" src="profile-imgs/boy-dp2.jpg"></q-img>
                         </div>
                          <div class="col-3">
                               <q-img @click="image_boy_3" class="display__picture_boy image__hover3" src="profile-imgs/boy-dp3.jpg"></q-img>
                           </div>
                              <div class="col-3">
                                 <q-img @click="image_boy_4" class="display__picture_boy image__hover4" src="profile-imgs/boy-dp4.jpg"></q-img>
                           </div>
                             <div class="col-3">
                                   <q-img @click="image_girl_1" class="display__picture_boy image__hover5" src="profile-imgs/girl-dp1.jpg"></q-img>
                           </div>
                           <div class="col-3">
                                   <q-img @click="image_girl_2" class="display__picture_boy image__hover6" src="profile-imgs/girl-dp2.jpg"></q-img>
                           </div>
                           <div class="col-3">
                                   <q-img @click="image_girl_3" class="display__picture_boy image__hover7" src="profile-imgs/girl-dp3.jpg"></q-img>
                           </div>
                           <div class="col-3">
                                   <q-img @click="image_girl_4" class="display__picture_boy image__hover8" src="profile-imgs/girl-dp4.jpg"></q-img>
                           </div>
                        </div>
                    </q-card-section>
                </q-card>
              </q-dialog>
    </span>
</template>

<script>
import Profile from "./ProfileMobile.css";
export default {
    data: () => ({
         show_images: false,
         image_blank: true,
          // boy
        image_boy1: false,
        image_boy2: false,
        image_boy3: false,
        image_boy4: false,
        // girl
        image_girl1: false,
        image_girl2: false,
        image_girl3: false,
        image_girl4: false,
    }),
      methods: {
      image_boy_1() {
        this.image_blank = false;
        this.image_boy1 = true;
        this.image_boy2 = false;
        this.image_boy3 = false;
        this.image_boy4 = false;
        this.image_girl1 = false;
        this.image_girl2 = false;
        this.image_girl3 = false;
        this.image_girl4 = false;
      },
       image_boy_2() {
        this.image_blank = false;
        this.image_boy1 = false;
        this.image_boy2 = true;
        this.image_boy3 = false;
        this.image_boy4 = false;
        this.image_girl1 = false;
        this.image_girl2 = false;
        this.image_girl3 = false;
        this.image_girl4 = false;
      },
       image_boy_3() {
        this.image_blank = false;
        this.image_boy1 = false;
        this.image_boy2 = false;
        this.image_boy3 = true;
        this.image_boy4 = false;
        this.image_girl1 = false;
        this.image_girl2 = false;
        this.image_girl3 = false;
        this.image_girl4 = false;
      },
       image_boy_4() {
        this.image_blank = false;
        this.image_boy1 = false;
        this.image_boy2 = false;
        this.image_boy3 = false;
        this.image_boy4 = true;
        this.image_girl1 = false;
        this.image_girl2 = false;
        this.image_girl3 = false;
        this.image_girl4 = false;
      },
      // girl
       image_girl_1() {
        this.image_blank = false;
        this.image_girl1 = true;
        this.image_girl2 = false;
        this.image_girl3 = false;
        this.image_girl4 = false;
         this.image_boy1 = false;
        this.image_boy2 = false;
        this.image_boy3 = false;
        this.image_boy4 = false;
      },
       image_girl_2() {
        this.image_blank = false;
        this.image_girl1 = false;
        this.image_girl2 = true;
        this.image_girl3 = false;
        this.image_girl4 = false;
        this.image_boy1 = false;
        this.image_boy2 = false;
        this.image_boy3 = false;
        this.image_boy4 = false;
      },
       image_girl_3() {
        this.image_blank = false;
        this.image_girl1 = false;
        this.image_girl2 = false;
        this.image_girl3 = true;
        this.image_girl4 = false;
        this.image_boy1 = false;
        this.image_boy2 = false;
        this.image_boy3 = false;
        this.image_boy4 = false;
      },
       image_girl_4() {
        this.image_blank = false;
        this.image_girl1 = false;
        this.image_girl2 = false;
        this.image_girl3 = false;
        this.image_girl4 = true;
        this.image_boy1 = false;
        this.image_boy2 = false;
        this.image_boy3 = false;
        this.image_boy4 = false;
      },
    }
}
</script>

<style>
.btn-img {
    z-index: 5;
}
.change__imgs {
  opacity: 0;
  transition: 1s;
  z-index: 3;
}
.change__imgs:hover {
  opacity: 1;
}
</style>