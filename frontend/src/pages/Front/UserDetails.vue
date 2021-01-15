<template>
    <div>
      <user-details></user-details>
    </div>
</template>

<script>
import UserDetails from "../../components/Account/UQUserDetail"
import ProfileAvatarMobile from "./ProfileAvatarMobile"
import ProfileAvatar from "./ProfileAvatar"
import Profile from "./Profile.css"
export default {
  components: {
    ProfileAvatar,
    ProfileAvatarMobile,
    UserDetails
  },
    data: () => ({
        profile_tab: 'post',
        user_name: 'Angelo Gabitan',
        ratingModel: '4',
        numbers: '12',
        numbers_2: '8',
        show_images_bg: false,
        // bg
        image_bg1: true,
        image_bg2: false,
        image_bg3: false,
        image_bg4: false,
    }),
    methods: {
      // bg
      image_bg_1() {
        this.image_bg1 = true;
        this.image_bg2 = false;
        this.image_bg3 = false;
        this.image_bg4 = false;
      },
       image_bg_2() {
        this.image_bg1 = false;
        this.image_bg2 = true;
        this.image_bg3 = false;
        this.image_bg4 = false;
      },
       image_bg_3() {
        this.image_bg1 = false;
        this.image_bg2 = false;
        this.image_bg3 = true;
        this.image_bg4 = false;
      },
       image_bg_4() {
        this.image_bg1 = false;
        this.image_bg2 = false;
        this.image_bg3 = false;
        this.image_bg4 = true;
      }
    }
}
</script>

<style>
.item__title {
  width : 140px;
  overflow:hidden;
  display:inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tabs__padding {
  padding: 0 50px 0 50px;
  border-radius: 0 0 5px 5px
}
.mobile__header
    {
    background: #764e85;
    height: 220px;
    width: 100%;
    border-radius: 0 0 70px 70px;
    }
@media (max-width: 768px) 
{
    .tabs__padding {
    padding: 0 5%;
    border-radius: 8px 8px 0 0
  }
   .bg__cover
   {
     display: none;
   }
   .avatar__desktop
   {
     display: none;
   }
   .panels__desktop
   {
     display: none;
   }
   .profile__width
   {
     width: 100%;
     margin-top: 25px;
   }
   .tabs__width
   {
     margin-left: 40px;
   }
      .tabs__width2
   {
     
   }
}
@media (min-width: 768px) 
{
  .mobile__header
  {
    display: none;
  }
     .avatar__mobile
   {
     display: none;
   }
   .panels__mobile
   {
     display: none;
   }
}
</style>

<style scoped>
.change__imgs {
  opacity: 0;
  transition: 1s;
}
.change__imgs:hover {
  opacity: 1;
}
.change__bg_imgs {
  opacity: 0;
  transition: 1s;
}
.change__bg_imgs:hover {
  opacity: 1;
}
</style>



