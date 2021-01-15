<template>
    <div style="margin-top: 20px">
        <q-card v-if="user_data._id != _id" class="q-pa-md">
            <div class="row">
                <div class="col-6">
                    <a class="nostyle" :href="`/#/user/details/${_id}`">
                    <q-separator />
                        <div class="q-pa-md">
                            <!--    USER AVATAR    -->
                            <q-item>
                                <q-item-section avatar>
                                    <q-avatar>
                                         <!-- <img :src="`data:image/jpg;base64,${avatar}`"> -->
                                       <img :src="`http://localhost:4000/public/${gender}/${avatar}`">
                                    </q-avatar>
                                </q-item-section>
                                <q-item-section style="text-align: left;">
                                <q-item-label>{{ username }}</q-item-label>
                                <q-item-label caption>{{ full_name }}</q-item-label>
                                <q-item-label caption>{{ followers }}</q-item-label>
                                </q-item-section>

                            <!-- FOLLOW USER BUTTON -->
                            <!-- <q-item-setion style="text-align: right;">
                                <q-item-label>
                                    <q-btn
                                        label="Follow"
                                        type="submit"
                                        class="q-ml-sm"
                                        outline
                                        rounded
                                        style="color: #764e85"
                                    />
                                </q-item-label>
                            </q-item-setion> -->
                            </q-item>
                            <!--    /USER AVATAR    -->
                            </div>

                        <q-separator />

                    </a>
                </div>
                <div style="margin: auto; text-align: right;" class="col-6" >
                    <q-btn
                        :id="_id"
                        :label="follow_btn_label"
                        type="submit"
                        class="q-ml-sm"
                        style="color: white; width: 25%; font-size: 80%; "
                         :style="follow_btn_label == 'Unfollow' ? 'background-color: #764e85; ': 'background-color: #FDB81F;' "
                        @click="handleClick($event)"
                    />
                    <u-q-login :is_login_page="is_login_page" ref="login_modal"></u-q-login>
                </div>
            </div>
        </q-card>
    </div>
</template>

<script>
import moment from 'moment';
import UQLogin  from './../UQLogin';
import Card from '../../pages/Documentation/Card.vue';
import { postFollowUnfollowUser } from '../../references/url';
export default
{
    props: ['username', 'avatar', 'full_name', 'followers', '_id', 'user_data', 'tab', 'gender'],
    components: { UQLogin },
    data:() =>(
    {
        is_login_page : false,
        users_following : [],
        is_logged_in: false,
        form_data: {
            user_id: {}
        },
        follow_btn_label: 'Follow',
        is_search_route: false,
        is_follow_by_id_route: false
    }),
    async mounted()
    {   
        await this.checkFollowing();
        await this.changeBtnLabel();
        await this.checkRoute();
        await this.checkRouteFollowUserById()
    },
    methods:
    {
        async handleClick(event)
        {
            let target_id = event.currentTarget.id;
            if (!this.isEmpty(this.user_data) && this.is_logged_in && target_id === this._id) {
                this.$q.loading.show();
                this.form_data.user_id = this._id;
                let follow = await this.$_post(postFollowUnfollowUser, { user_id : this._id });
                let action = 'follow';
                if (this.follow_btn_label == 'Unfollow') {
                    action = 'unfollow';
                }
                if (action == 'unfollow') {
                    this.$emit('unfollow', this._id);
                } else if (action == 'follow') {
                    this.$emit('follow', this._id);
                }
    
                if(action == 'unfollow' && this.is_search_route == false && this.tab == 'following' && this.is_follow_by_id_route == false){
                    this.follow_btn_label = 'Unfollow'
                } else if(action == 'unfollow' && this.is_search_route == false && this.tab == 'followers'){
                    this.follow_btn_label = 'Follow'
                }else if(action == 'follow' && this.is_search_route == false){
                        this.follow_btn_label = 'Unfollow'
                } else if(action == 'follow' && this.is_search_route == true) {
                        this.follow_btn_label = 'Unfollow'
                } else if(action == 'unfollow' && this.is_search_route == true){
                    this.follow_btn_label = 'Follow'
                } else if(action == 'unfollow' && this.is_follow_by_id_route == true && this.tab == 'following') {
                    this.follow_btn_label = 'Follow'
                }
                //eto yung nag papamali
                // this.follow_btn_label = (action === 'Follow') ? 'Unfollow' : 'Follow';
                this.$q.loading.hide();
            } else {
                this.$refs['login_modal'].show();
            }
        },
        checkFollowing ()
        {
            if (!this.isEmpty(this.user_data)) {
                this.is_logged_in = true;
                if (this.user_data.following) {
                    this.users_following = this.user_data.following;
                }
            } else {
                this.is_logged_in = false;
            }
        },
        changeBtnLabel()
        {
            this.follow_btn_label = (this.users_following.length && this.users_following.includes(this._id)) ? 'Unfollow' : 'Follow';
        },
        isEmpty(obj)
        {
            return Object.keys(obj).length === 0;
        },
        async checkRoute()
        {
            this.is_search_route = (this.$route.name == 'search_page') ? true : false;
        },
        async checkRouteFollowUserById()
        {
            this.is_follow_by_id_route = (this.$route.name == 'front_follow_by_id') ? true : false;
        }
    },
}
</script>

<style>
.my-card {
  width: 100%;
}
a.nostyle:link {
    text-decoration: inherit;
    color: inherit;
}
a.nostyle:visited {
    text-decoration: inherit;
    color: inherit;
}
</style>