<template>
    <div class="row q-mt-md">
        <div class="text-h6" style="font-weight: 500">Comments</div>
        <div class="col-12 text-center q-mt-sm" v-if="comments.label != 'No comments available'">
            <q-btn class="more-comments" @click="postFetchComments" flat>{{comments.label}}</q-btn>
        </div>
        <div class="col-12 text-center q-mt-sm" v-if="comments.label == 'No comments available'">
            <div class="text-h6" style="font-weight: 500">{{comments.label}}</div>
        </div>
        <div class="col-12" v-for="(comment_obj, index) in comments.data" :key="index">

            <q-item class="q-px-none">
                <div class="col-12">
                    <div class="row">
                        <q-item-section avatar>
                            <q-avatar>
                              <img src="https://i.imgur.com/ITUDbw3.png" /> <!-- :src="item_info.seller_avatar"  -->
                            </q-avatar>
                          </q-item-section>
                           <q-item-section>
                            <q-item-label>{{comment_obj.first_name}} {{comment_obj.middle_name}} {{comment_obj.last_name}}</q-item-label>
                            <q-item-label caption>No Reviews</q-item-label>
                          </q-item-section>
                          <q-item-section side top>
                            {{ moment(comment_obj.created_at).format("MM-DD-YYYY | HH:mm")}}
                    </q-item-section>
                    </div>
                    <div class="q-mt-md">
                        {{comment_obj.comment}}
                    </div>
                </div>
            </q-item>
            <q-separator />
        </div>


        <!-- <div class="col-12">
            <div class="row user-details">
                <div class="col-1 avatar">
                </div>
                <div class="col-11 name">
                    {{user.first_name}}
                    {{user.last_name}}
                </div>
            </div>
        </div> -->
        
        <div class="col-12 user-comment">
            <div class="row">
                <div class="col-12">
                    <q-input borderless class="q-px-md q-mt-sm" v-model="user.comment" placeholder="Say something..." style="background: #d1d1d1; border-radius: 10px" @keyup.enter="sendPostComment($props.post._id)" >
                        <template v-slot:append>
                            <q-btn flat color="secondary" no-caps @click="sendPostComment($props.post._id)">
                                <span style="font-size: 18px">Submit</span>
                            </q-btn>
                        </template>
                    </q-input>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import socket from '../boot/socket-client';
import { postFetchComments, wsAddPostComment } from '../references/url';
export default {
    props: {
        post: { type: Object     , default: () => {}}
    },
    data: () => 
    ({
        moment  : moment,
        socket  : socket,
        user    : {
            comment     : '',
        },

        comments: {
            data: [],
            skip: 0,
            label: 'View more...'
        },
    }),

    async mounted()
    {
        let auth = await this.isUserLoggedIn();
        
        if(auth.status == 'not authenticated')
        {
            this.$router.push({ name: 'documentation_login'});
        }
        else
        {
            this.user = {
                ...this.user,
                ...auth.user
            };
        }

        // websockets
        await this.wsAddPostCommentEvent();

        // oridinary methods
        await this.postFetchComments();
    },

    methods: {
        async isUserLoggedIn()
        {
            let auth_result = await this.$_isUserAuthenticated();

            return auth_result.data;
        },

        async wsAddPostCommentEvent()
        {
            this.socket.on(wsAddPostComment, (data) => {

                if(this.$props.post._id == data.newsfeed_id)
                {
                    this.comments.data.push(data);
                    
                    this.user.comment = '';
                }
            });
        },

        async wsAddPostComment(newsfeed_id, comment)
        {
            this.socket.emit(wsAddPostComment, {
                newsfeed_id,
                comment,
                user_id: this.user._id
            });
        },

        // websocket methods
        async sendPostComment(newsfeed_id,inputtxt)
        {
            this.wsAddPostComment(newsfeed_id, this.user.comment);

        },
        // end of websocket methods
        // ordinary methods
        
        async postFetchComments()
        {
            let newsfeed_id = this.$props.post._id;

            const comments_res_obj = await this.$_post(postFetchComments, {
                skip: this.comments.skip,
                newsfeed_id
            });

            this.comments.data.unshift(...comments_res_obj.data.comments.reverse());

            if(comments_res_obj.data.comments.reverse().length > 0)
            {
                comments_res_obj.data.comments.reverse().length;
                this.comments.skip += 2;
            }

            this.emitFunctionOnArrayLengthCondition(comments_res_obj.data.comments, 0, this.changeCommentLabel);
        },

        async changeCommentLabel()
        {
            this.comments.label = 'No comments available';
        },

        async emitFunctionOnArrayLengthCondition(arrayObj, length, func)
        {
            if(arrayObj.length == length)
            {
                func();
            }
        }
        // end of ordinary methods
    }
}
</script>

<style scoped>
.name {
    text-transform: capitalize;
}

textarea.textarea
{
    resize      : auto;
    min-width   : 100%;
    max-width   : 100%;
    max-height  : 100px;
    min-height  : 36px;
    height      : 36px;
    padding     : 5px;
}

.more-comments
{
    cursor: pointer;
    font-weight: bold;
}
</style>