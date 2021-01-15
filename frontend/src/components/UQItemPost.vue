<template>
    <div class="row">
        <div class="col-9">
            {{item}}
            <div>
                <i class="fa fa-thumbs-up like react-inactive" ref="like-react" aria-hidden="true" @click="wsSendItemReact(item._id, 'like')"></i>
            </div>
        </div>

        <div class="col-3" style="height: 100vh; overflow-y: auto !important;" ref="comment_section">
            <div class="row">
                <div v-for="(user, index) in comments" :key="index" class="comment">
                    <div style="; float: left;">
                        <q-avatar>
                            <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
                        </q-avatar>
                    </div>
                    <div style="; float: left;">
                        <div>
                            {{user.user_first_name}} {{user.user_middle_name}} {{user.user_last_name}}
                        </div>
                        <div>
                            {{user.user_comment}}
                        </div>
                    </div>
                </div>
                <div>
                    <q-form>
                        <q-input bottom-slots v-model="comment" outlined>
                            <template v-slot:before>
                                <q-avatar>
                                    <img src="https://cdn.quasar.dev/img/avatar5.jpg">
                                </q-avatar>
                            </template>
                        </q-input>
                        <q-btn label="submit" @click="wsSendItemComment" />
                    </q-form>
                </div>
            </div>
        </div>\
    </div>
</template>

<script>
import { postFetchPostedItem, postFetchUserItemReact, wsDummy, wsSendItemComment, wsSendItemReact } from '../references/url';
import socket from '../boot/socket-client';
export default {
    data: () => ({
        user                : {},
        socket              : socket,
        comment_is_loading  : true,
        item        : {},
        comment     : '',
        comments    : [],

        socket_details  : {
            first_name  : '',
            middle_name : '',
            last_name   : '',
            comment     : ''
        }
    }),

    async mounted()
    {
        await this.authenticate_user();
        this.wsConnectToDummy();
        this.initializeWebSocketEvents();
        this.postFetchUserItemReact();

        const item_id       = this.$route.params.item_id;

        const posted_item   = await this.postFetchPostedItem(item_id);

        this.item           = posted_item.item;
        this.comments       = posted_item.comments;

    },

    methods: {
        async authenticate_user()
        {
            let auth = await this.$_isUserAuthenticated();
            console.log(auth.data.status)
            if(auth.data.status == 'authenticated')
            {
                this.user = auth.data.user;
            }
            else
            {
                this.$router.push({ name: 'front_login'})
            }
        },
        async postFetchUserItemReact()
        {
            const user_item_react_res_obj = await this.$_post(postFetchUserItemReact, {
                item_id: this.$route.params.item_id
            });

            if(user_item_react_res_obj.data != null && user_item_react_res_obj.data.user_id == this.user._id && user_item_react_res_obj.data.item_id == this.$route.params.item_id)
            {
                this.$refs[user_item_react_res_obj.data.user_react + '-react'].classList.remove('react-inactive');
                this.$refs[user_item_react_res_obj.data.user_react + '-react'].classList.add('react-active');
            }
        },

        async wsConnectToDummy()
        {
            this.socket.emit(wsDummy, {greet: 'hello'})
        },

        async initializeWebSocketEvents()
        {
            this.wsSendItemCommentEvent();
            this.wsSendItemReactEvent();
        },
// ---------------------------------- Websocket Events ----------------------------
        async wsSendItemCommentEvent ()
        {
            this.socket.on(wsSendItemComment, async (data) =>
            {
                if(data.item_id === this.$route.params.item_id)
                {
                    await this.setNewComment({
                        first_name  : data.user_first_name,
                        middle_name : data.user_middle_name,
                        last_name   : data.user_last_name,
                    },
                    data.user_comment,
                    data.timestamp_created_at
                    )
                }
            });
        },

        async wsSendItemReactEvent ()
        {
            this.socket.on(wsSendItemReact, async (data) =>
            {
                if(data.item_id == this.$route.params.item_id && data.user_id == this.user._id)
                {
                    if(data.status == 'added')
                    {
                        this.$refs[data.react + '-react'].classList.remove('react-inactive');
                        this.$refs[data.react + '-react'].classList.add('react-active');
                    }

                    if(data.status == 'deleted')
                    {
                        this.$refs[data.react + '-react'].classList.remove('react-active');
                        this.$refs[data.react + '-react'].classList.add('react-inactive');
                    }
                }
            })
        },
// ----------------------------------end of Websocket Events ----------------------
// ----------------------------------Websocket requests --------------------------------
        async wsSendItemComment()
        {
            if(this.comment != '')
            {
                this.socket.emit(wsSendItemComment, {
                    user_id     : 1,
                    first_name  : 'John Raymund',
                    middle_name : 'Mijares',
                    last_name   : 'Bernal',
                    comment     : this.comment,
                    item_id     : this.$route.params.item_id
                });
                this.comment = ''
            }
        },

        
        async wsSendItemReact(item_id, react)
        {
            item_id = item_id || this.$route.params.item_id;
            
            this.socket.emit(wsSendItemReact, {
                react,
                item_id,
                user: {
                ...this.user
                },
            })
        },
// ---------------------------------- end of Websocket request --------------------------------
        async setNewComment({first_name, middle_name, last_name}, comment, date_created)
        {

            let comments        = await this.$refs['comment_section'].querySelectorAll('div.row')[0].getElementsByClassName('comment');
            let lastComment     = await comments[comments.length - 1]
            let newComment      =  document.createElement('div');
            
            newComment.className    = 'comment';
            let avatar_container    = document.createElement('div');
            let avatar_q_avatar     = document.createElement('div');
            let avatar_q_content    = document.createElement('div');
            let avatar              = document.createElement('img');

            let comment_floor       = document.createElement('div');
            let name_container      = document.createElement('div');
            let comment_container   = document.createElement('div');

            avatar_container.style      = 'float:left;';

            avatar_q_avatar.className   = 'q-avatar';
            
            avatar_q_content.className  = 'q-avatar__content row flex-center overflow-hidden';

            avatar.src                  = `https://cdn.quasar.dev/img/avatar5.jpg`;

            comment_floor.style         = 'float:left;';

            name_container.innerHTML    = `${first_name} ${middle_name} ${last_name}`;

            comment_container.innerHTML = `${comment}`;

            avatar_q_content.appendChild(avatar);
            avatar_q_avatar.appendChild(avatar_q_content);
            avatar_container.appendChild(avatar_q_avatar);

            comment_floor.appendChild(name_container);
            comment_floor.appendChild(comment_container);

            newComment.appendChild(avatar_container);
            newComment.appendChild(comment_floor);

            lastComment.parentNode.insertBefore(newComment, lastComment.nextSibling);
        },

        async postFetchPostedItem(itemId)
        {
            const item_details_res_obj = await this.$_post(postFetchPostedItem, {
                item_id: itemId
            });
            
            return {
                comments    : item_details_res_obj.data.comments,
                item        : item_details_res_obj.data.postedItem
            }
        },

        async loadComment (index, done)
        {
            this.comment_is_loading = false;
            done()
        }
    }
}
</script>

<style scoped>

.like,
.heart {

    font-size: 20px;
    cursor: pointer;
    text-align: center;
    transition: all 100ms;
}

.like.react-inactive,
.heart.react-inactive
{
    color: #636363;
}

.like.react-active
{
    color: #7600fd;
}

.like:hover,
.heart:hover
{
    transform: scale(1.3, 1.3);
}

.like:active,
.heart:active
{
    transform: scale(1.4, 1.4) rotate(-30deg);
}
</style>