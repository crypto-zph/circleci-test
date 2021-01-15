<template>
    <div class="post">
        <div class="row" 
            v-if="
            $props.post.announcement_type != 'Newsfeed Announcement' ||
            ($props.post.is_publish == true                           && 
            $props.post.custom_setting == 'Public'                   || 
            $props.post.custom_selected.includes(user._id) == true)"         
        > 
            <div class="col-1">
                <q-avatar class="user-avatar">
                    <!--  Announcement -->
                    <q-img 
                        v-if="$props.post.is_publish == true && 
                        $props.post.custom_setting == 'Public' || 
                        $props.post.custom_selected.includes(user._id) == true"                   
                        src="http://localhost:4000/avatar/default/BRT.png" alt="">
                    </q-img>

                    <q-img 
                        v-else
                        src="https://www.bootdey.com/img/Content/avatar/avatar1.png" alt="">
                    </q-img>

                </q-avatar>
            </div>
            
            <div class="col-11 bg-white post-container">
                <div class="row">
                    <div class="post-owner col-6">
                        <strong>
                            {{ $props.post.first_name }} {{ $props.post.middle_name }} {{ $props.post.last_name }} 
                        </strong>
                        <span v-if="post.post_type.type == 'shared'">
                            shared <strong> post</strong>
                        </span>
                    </div>
                    <div class="post-date col-6">
                        {{moment(Number($props.post.updated_timestamp)).format('MMM DD, YYYY HH:mm')}}
                    </div>
                    <!-- {{post}} -->
                </div>
                <div class="post-content">
                    <div class="post-header">

                        <div class="post-caption">
                            {{ post.post_type.type == 'shared' ? $props.post.caption.share : $props.post.caption.original}}
                        </div>

                        <div class="row shared-post" v-if="post.post_type.type == 'shared'">
                            <div class="col-1">
                                <q-avatar class="user-avatar">
                                    <q-img src="https://www.bootdey.com/img/Content/avatar/avatar1.png" alt="">
                                    </q-img>
                                </q-avatar>
                            </div>
                            <div class="col-11 original-poster">
                                <div class="row">
                                    <div class="col-6">
                                        <strong class="original-post-owner">{{original_post.first_name}} {{original_post.middle_name}} {{original_post.last_name}}</strong>
                                    </div>
                                    <div class="col-6 post-date">
                                        <!--must changed-->
                                        {{moment(Number(original_post.updated_timestamp)).format('MMM DD, YYYY HH:mm')}}
                                    </div>
                                    <div class="col-12 post-caption">
                                        {{$props.post.caption.original}} <!--must changed-->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="post-details row">
                            <div class="col-12">
                                <ul v-if="$props.post.announcement_type != 'Newsfeed Announcement'">
                                    <li>
                                    <strong>Item:</strong>
                                        {{post.post_type.type == 'shared' ? original_post.item_name : $props.post.item_name}}
                                    </li>
                                    <li>
                                    <strong>Price:</strong>
                                        {{post.post_type.type == 'shared' && original_post.price != undefined ? original_post.price.BRT.$numberDecimal : $props.post.price != undefined ? $props.post.price.BRT.$numberDecimal : ''}}
                                    </li>
                                    <!-- <li>
                                        <strong>Description:</strong>
                                        {{post.post_type.type == 'shared' ? original_post.description : $props.post.description}}
                                    </li> -->
                                    <li>
                                        <strong>Condition:</strong>
                                        {{post.post_type.type == 'shared' ? original_post.condition : $props.post.condition}}
                                    </li>
                                    <li>
                                        <strong>Performance:</strong>
                                        {{post.post_type.type == 'shared' ? original_post.performance : $props.post.performance}}
                                    </li>
                                    <li>
                                        <strong>Location:</strong>
                                        {{post.post_type.type == 'shared' ? original_post.location :$props.post.location}}
                                    </li>
                                    <li>
                                        <strong>type:</strong>
                                        {{$props.post.announcement_type}}
                                    </li>
                                </ul>

                                <ul v-else>
                                    <li>
                                        <strong> {{$props.post.title}} </strong>
                                    </li>    
                                    <li>
                                        {{$props.post.description}}
                                    </li>                                                                      
                                </ul>
                                
                            </div>
                        </div>
                    </div>
                    <div class="post-body">
                        <div :class="'item-images-' + $props.post.item_image.length + ' row'" v-if="$props.post.item_image.length > 5">
                            <div class="col-6 item-image">
                                <q-img :src="`${server.IMAGE_URL}/${$props.post.user_id}/images/${$props.post.item_image[0]}`" alt="" />
                            </div>
                            <div class="col-6 item-image">
                                <q-img :src="`${server.IMAGE_URL}/${$props.post.user_id}/images/${$props.post.item_image[1]}`" alt="" />
                            </div>
                            <div class="col-4 item-image">
                                <q-img :src="`${server.IMAGE_URL}/${$props.post.user_id}/images/${$props.post.item_image[2]}`" alt="" /></div>
                            <div class="col-4 item-image">
                                <q-img :src="`${server.IMAGE_URL}/${$props.post.user_id}/images/${$props.post.item_image[3]}`" alt="" /></div>
                            <div class="col-4 item-image">
                                <q-img :src="`${server.IMAGE_URL}/${$props.post.user_id}/images/${$props.post.item_image[4]}`" alt="" />
                                <div style="height: 100%; padding: 28% 37%; font-size: 3em;">+{{image_count - 5}}</div>
                            </div>
                        </div>

                        <div :class="'item-images-' + $props.post.item_image.length + ' row'" v-else-if="$props.post.item_image.length == 5">
                            <div class="col-6 item-image">
                                <q-img :src="`${server.IMAGE_URL}/${$props.post.user_id}/images/${$props.post.item_image[0]}`" alt="" />
                            </div>
                            <div class="col-6 item-image">
                                <q-img :src="`${server.IMAGE_URL}/${$props.post.user_id}/images/${$props.post.item_image[1]}`" alt="" />
                            </div>
                            <div class="col-4 item-image">
                                <q-img :src="`${server.IMAGE_URL}/${$props.post.user_id}/images/${$props.post.item_image[2]}`" alt="" />
                            </div>
                            <div class="col-4 item-image">
                                <q-img :src="`${server.IMAGE_URL}/${$props.post.user_id}/images/${$props.post.item_image[3]}`" alt="" />
                            </div>
                            <div class="col-4 item-image">
                                <q-img :src="`${server.IMAGE_URL}/${$props.post.user_id}/images/${$props.post.item_image[4]}`" alt="" />
                            </div>
                        </div>
                        
                        <div :class="'item-images-' + $props.post.item_image.length + ' row'" v-else-if="$props.post.item_image.length == 4">
                            <div class="col-6 item-image">
                                <q-img :src="`${server.IMAGE_URL}/${$props.post.user_id}/images/${$props.post.item_image[0]}`" alt="" />
                            </div>
                            <div class="col-6 item-image">
                                <q-img :src="`${server.IMAGE_URL}/${$props.post.user_id}/images/${$props.post.item_image[1]}`" alt="" />
                            </div>
                            <div class="col-6 item-image">
                                <q-img :src="`${server.IMAGE_URL}/${$props.post.user_id}/images/${$props.post.item_image[2]}`" alt="" />
                            </div>
                            <div class="col-6 item-image">
                                <q-img :src="`${server.IMAGE_URL}/${$props.post.user_id}/images/${$props.post.item_image[3]}`" alt="" />
                            </div>
                        </div>

                        <div :class="'item-images-' + $props.post.item_image.length + ' row'" v-else-if="$props.post.item_image.length == 3">
                            <div class="col-7 item-image-col">
                                <div class="row">
                                    <div class="col-12 item-image">
                                        <q-img :src="`${server.IMAGE_URL}/${$props.post.user_id}/images/${$props.post.item_image[0]}`" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-5 item-image-col">
                                <div class="row">
                                    <div class="col-12 item-image">
                                        <q-img :src="`${server.IMAGE_URL}/${$props.post.user_id}/images/${$props.post.item_image[0]}`" alt="" />
                                    </div>
                                    <div class="col-12 item-image">
                                        <q-img :src="`${server.IMAGE_URL}/${$props.post.user_id}/images/${$props.post.item_image[0]}`" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div :class="'item-images-' + $props.post.item_image.length + ' row'" v-else-if="$props.post.item_image.length == 2">
                            <div class="row">
                                <div class="col-12 item-image">
                                    <q-img :src="`${server.IMAGE_URL}/${$props.post.user_id}/images/${$props.post.item_image[0]}`" alt="" />
                                </div>
                                <div class="col-12 item-image">
                                    <q-img :src="`${server.IMAGE_URL}/${$props.post.user_id}/images/${$props.post.item_image[1]}`" alt="" />
                                </div>
                            </div>
                        </div>

                        <div :class="'item-images-' + $props.post.item_image.length + ' row'" v-else-if="$props.post.item_image.length == 1">
                            <div class="row">
                                <div class="col-12 item-image">
                                    <q-img :src="`${server.IMAGE_URL}/${$props.post.user_id}/images/${$props.post.item_image[0]}`" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="post-footer">
                        <!-- <div class="row">
                            <div class="reacts col-4">
                                <i :class="'fa fa-thumbs-up react ' + react.type + ' ' + react.state" @click="reactPost($props.post._id, 'like')" aria-hidden="true">
                                </i>
                                <span>
                                    {{$props.post.reacts.like.num}}
                                </span>
                            </div>
                            <div class="col-4">
                                <i class="fa fa-comment comment" aria-hidden="true">
                                </i>
                            </div>
                            <div class="col-4">
                                <i class="fas fa-paper-plane share" @click="alertSharePost($props.post)"></i>
                            </div>
                        </div> -->
                        <u-q-post-interact
                            v-if="$props.post._id"
                            :post="$props.post"
                            @isCommentActive="UQPostInteractIsCommentActive"
                            @showShareModal="showShareModal"
                        >
                        </u-q-post-interact >
                        <q-separator />
                        <div ref="post_comment_ref">
                            <u-q-post-comment
                                v-if="item_post._id"
                                :post="item_post"
                            >
                            </u-q-post-comment>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import config from '../../config';
import UQPostInteract   from '../components/UQPostInteract';
import UQPostComment from '../components/UQPostComment';
import socket from '../boot/socket-client';
import {postSharePostToGlobal, postFetchOriginalPost, postReact, postReactPost, postFetchUserReact} from '../references/url';
export default {
    name: "UQPost",
    props: {
        post        : { type: Object     , default: () => {return {}}},
    },
    components: {
        UQPostInteract,
        UQPostComment
    },
    data: () => 
    ({
        
        config          : config,
        server          : {
            IMAGE_URL       : config.IMAGE_URL,
        },
        moment          : moment,
        socket          : socket,
        image_count     : 9,
        original_post   : {},
        user            : {},
        react     : {
            state   : 'inactive',
            type    : 'like'
        },
        item_post: {}
    }),

    async mounted()
    {
        this.isUserLoggedIn();
        this.initializeWebSocketEvents();

        await this.fetchUserReact();
        if(this.$props.post.post_type.type == 'shared')
        {
            // get details of original post
            let original_post = await this.fetchOriginalPost(this.$props.post.post_type.original_post);

            this.original_post = {...original_post};
        }

        this.item_post._id = this.$props.post._id;

        this.UQPostInteractIsCommentActive({is_active: true});
    },

    methods:
    {
        async isUserLoggedIn()
        {
            this.user = await this.$_isUserAuthenticated();
            this.user = this.user.data.user;
        },
        async initializeWebSocketEvents()
        {
            this.wsReactPostEvent();
        },

        async wsReactPostEvent()
        {
            // this.socket.on(wsReactPost, async (data) =>
            // {
            // });
        },

        async wsReactPost(post_id, react)
        {
            // this.socket.emit(wsReactPost, {
            //     post_id, 
            //     react, 
            //     user_id: this.user._id
            // });
        },

        async showShareModal(post)
        {
            this.$emit('showShareModal', post);
        },
        async sharePost(original_post, post_type)
        {
            let share_post_res_obj = await this.$_post(postSharePostToGlobal,
            {
                original_post,
                post_type
            });
        },

        async fetchUserReact()
        {
            let react_res_obj = await this.$_post(postFetchUserReact,
            {
                post_id: this.$props.post._id
            });

            if(react_res_obj.data.react != null)
            {
                this.react.state    = 'active';
                this.react.type     = react_res_obj.data.react.react;
            }
        },

        async reactPost(post_id, react)
        {
            // this.wsReactPost(post_id, react);
            let react_post_res_obj = await this.$_post(postReactPost, {
                post_id,
                react,
            });

            if(react_post_res_obj.data.react_state == 'added')
            {
                this.react.state    = 'active';
                this.react.type     = react_post_res_obj.data.react_details.react_res.react;
            }

            if(react_post_res_obj.data.react_state == 'removed')
            {
                this.react.state    = 'inactive';
                this.react.type     = 'like';
            }

            this.$props.post.reacts.like.num = react_post_res_obj.data.react_details.update_count.reacts.like.num;
        },

        async fetchOriginalPost (original_post_id)
        {
            let original_post_res_obj = await this.$_post(postFetchOriginalPost, {original_post_id})

            return original_post_res_obj.data.original_post;
        },

        async UQPostInteractIsCommentActive(val)
        {
            
            this.$refs['post_comment_ref'].style.display = val.is_active ? 'block' : 'none';

            // console.log(val.is_active);
            // console.log(this.$refs['post_comment_ref']);
        },
    }
}
</script>

<style scoped>

.item-images-more .item-image,
.item-images-5 .item-image,
.item-images-4 .item-image
{
    border: solid 1px #777;
    height: 200px;
}

.item-images-3 .item-image-col,
.item-images-3 .item-image-col .item-image
{
    border: solid 1px #777;
    height: 400px;
}
.item-images-3 .col-5.item-image-col .item-image
{
    height: 200px !important;
}

.item-images-2 .item-image,
.item-images-1 .item-image
{
    border: solid 1px #777;
    height: 400px;
}

.post
{
    width: 100%;
    margin-bottom: 5vh;
}

.post-owner,
.post-content
{
    text-align: left;
}

.user-avatar
{
    cursor: pointer;
}

.post-date
{
    padding-bottom: 10px;
}

.original-post-owner,
.post-owner > strong
{
    text-transform: capitalize;
}

.post-owner > strong,
.post-owner strong
{
    cursor: pointer;
}

.post-date
{
    color: #777;
    text-align: right;
    font-size: 85%;
}
.post-caption
{
    padding: 10px 0;
}
.post-details
{
    padding: 10px 0;
}
.post-details ul
{
    list-style: none;
    text-transform: capitalize;
}

.post-container
{
    padding: 10px;
    border-radius: 5px;
}

.post-footer
{
    padding: 10px;
    text-align: center;
    font-size: 20px;
}


.post-footer i
{
    cursor: pointer;
    transition: all 100ms;
}

.shared-post
{
    border-top: 1px solid rgb(255 178 255);
    padding-top: 15px;
}

.original-poster
{
    /* text-transform: capitalize; */
    padding: 10px 0 0 0;
}

.reacts .like.inactive,
.reacts .heart.inactive,
.reacts .dislike.inactive,
.comment,
.share
{
    color: #636363;
}

.reacts .like.active
{
    color: #7600fd;
}

.reacts .like:hover,
.reacts .heart:hover,
.reacts .dislike:hover,
.comment:hover,
.share:hover
{
    transform: scale(1.3, 1.3);
}

.reacts .like:active,
.reacts .heart:active,
.reacts .dislike:active,
.comment:active,
.share:active
{
    transform: scale(1.4, 1.4) rotate(-30deg);
}
</style>
