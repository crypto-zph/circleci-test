<template>
    <div class="row interactions q-mb-md">
        <div class="reacts col-2">
            <big>
                <i :class="'fas fa-thumbs-up react ' + react.type + ' ' + react.state" @click="reactPost($props.post._id, 'like')" aria-hidden="true" size="2px" class="q-mr-xs">
                </i>
            </big>
            <span>
                {{ react_count.like }}
            </span>
        </div>
        <div class="col-2 q-mx-md">
            <big>
                <i class="fa fa-comment comment q-mr-xs" aria-hidden="true" @click="interact_comment">
                </i>
            </big>
            <span>
                {{ comment_interact.count }}
            </span>
        </div>
        <div class="col-2">
            <big>
                <i class="fas fa-paper-plane share q-mr-xs" @click="showShareModal($props.post)"></i>
            </big>
        </div>
    </div>
</template>

<script>
import { 
    postFetchUserReact,
    postReactPost,
    fetchNewsFeedDetails,
} from '../references/url';
export default {
    props: {
        post: {type: Object, default: () => {}}
    }, 
    data() 
    {
        return {
            user        : {},
            react_count : {
                like        : 0,
            },
            react       : {
                type    : 'like',
                state   : 'inactive',
            },

            comment_interact: {
                is_active   : true,
                count       : 0
            }
        }
    },

    async mounted()
    {
        let auth = await this.isUserLoggedIn();
        
        if(auth.status == 'not authenticated')
        {
            this.$router.push({ name: 'documentation_login'});
        }
        else
        {
            this.user = await auth.user;
        }

        await this.fetchNewsFeedDetails();
        await this.fetchUserReact();

        // console.log(this.$props.post._id)
    },

    methods:
    {
        async isUserLoggedIn()
        {
            let auth_result = await this.$_isUserAuthenticated();

            return auth_result.data;
        },

        async fetchNewsFeedDetails()
        {
            let newsfeed = await this.$_post(fetchNewsFeedDetails, {
                _id: this.$props.post._id
            });

            this.comment_interact.count = newsfeed.data.newsfeed.comment.num;
            // this.react_count.like       = newsfeed.data.newsfeed.reacts.like.num;
            
        },

        async reactPost(post_id, react)
        {
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

            this.react_count.like   = react_post_res_obj.data.react_details.update_count.reacts.like.num;
        },

        async showShareModal(post)
        {
            // console.log(post)
            // return
            this.$emit('showShareModal', post);
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

        async interact_comment()
        {
            this.comment_interact.is_active = !this.comment_interact.is_active;
            
            this.$emit('isCommentActive', {
                is_active: this.comment_interact.is_active
            })
        }
    }
}
</script>

<style scoped>

.interactions
{
    text-align: left;
}

.interactions i{
    cursor: pointer;
    transition: all 100ms;
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
    color: #9A67AC;
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