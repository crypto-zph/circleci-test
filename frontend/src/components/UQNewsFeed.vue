<template>
    <div>
        <div id="newsfeed">
            <u-q-post @showShareModal="showShareModal" v-for="(post, index) in posts" 
                :key="index"
                :post="post"
            >
            </u-q-post>
        </div>
        <div>
           <label style="cursor: pointer;" @click="fetchNextPosts" v-if="has_newsfeed == true">
               See more...
           </label>
           <label style="cursor: pointer;" v-else>
               End of newsfeed
           </label>
        </div>
        <u-q-modal :modal_data="modal_data" ref="share_modal">
            <template v-slot:body>
                <div>
                    You're going to share this post. Confirm to continue.
                </div>
                <textarea class="textarea-share" v-model="share.caption" name="" id="" placeholder="What do you want to say?">

                </textarea>
            </template>
            <template v-slot:footer="props">
                    <q-btn label="share" style="background-color: #9a67ac; color: white;" @click="sharePost(props.data)" />
                    <q-btn label="cancel" class="q-ml-sm" @click="closeModal('share_modal')" />
            </template>
        </u-q-modal>
    </div>
</template>

<script>
import moment from "moment-timezone"
import UQPost from './UQPost';
import UQModal from './UQModal';
import { postSharePostToGlobal, postFetchPostedItems } from '../references/url';

export default {
    name: "UQNewsFeed",
    components: {
        UQPost,
        UQModal
    },
    data: () => 
    ({
        posts           : [],
        newsfeed_skip   : 0,
        scroll_debounce : true,
        has_newsfeed    : true,
        modal_data      : 
        {
            title: 'Share post',
            data: {},
        },
        publish_announcement_list : [],
        moment          : moment,

        share           : {
            caption    : ''
        },
        user            :{},
    }),

    async mounted()
    {
        
        await this.authenticate_user();
        // ----------------- function(s) to execute when scrolled down to bottom --------------------
        // this.onScrollBottom(this.fetchNextPosts);
            window.addEventListener('scroll', async () => {
                // let scroll_debounce = true;
                if(window.innerHeight + window.scrollY > document.body.scrollHeight || window.innerHeight + window.scrollY == window.innerHeight)
                {
                    if(this.scroll_debounce)
                    {
                        this.scroll_debounce = false;
                        this.fetchNextPosts();
                        setTimeout(() => {
                            this.scroll_debounce = true;
                        }, 1000)
                    }
                }
            })
        // ----------------- end function(s) to execute when scrolled down to bottom --------------------
        this.posts = await this.postFetchPostedItems();
       
    },

    methods:
    {
        async authenticate_user()
        {
            let auth = await this.$_isUserAuthenticated();
            if(auth.data.status == 'authenticated')
            {
                this.user = auth.data.user;
            }
            else
            {
                this.$router.push({ name: 'front_login'})
            }
        },
        // pass a function parameter in this function if you want to execute it in scrolled to bottom of page
        async onScrollBottom(func)
        {
            window.addEventListener('scroll', async () => {
                
                if(window.innerHeight + window.scrollY >= document.body.scrollHeight )
                {
                    if(this.scroll_debounce === true)
                    {
                        this.scroll_debounce = false;
                        func();
                        this.scroll_debounce = true;
                    }
                }
            })
            // window.onscroll = () => {
            //     console.log(`scroll ${window.innerHeight + window.scrollY}`)
            //     console.log(`full ${document.body.scrollHeight}`)
            // }
        },
        async postFetchPostedItems ()
        {
            let posted_items_res_obj = await this.$_post(postFetchPostedItems, {
                skip: this.newsfeed_skip
            });

            if(posted_items_res_obj.data.status == 'success')
            {
                if(posted_items_res_obj.data.newsfeed_items.length > 0)
                {
                    this.newsfeed_skip += 2;
                    console.log(posted_items_res_obj.data.newsfeed_items)
                    return posted_items_res_obj.data.newsfeed_items;
                }
                else
                {
                    this.has_newsfeed = false;
                }
            }
        },

        async fetchNextPosts ()
        {
            let posts = await this.postFetchPostedItems();
            this.appendPost(posts);
        },

        async appendPost(item)
        {
          if(this.has_newsfeed != false)
              {
                  this.posts.push(...item);
              }
        },
        
        async showShareModal(val)
        {
            this.$refs['share_modal'].show();
            this.modal_data.data = val;
        },

        async closeModal(modalRef)
        {
            this.$refs[modalRef].hide();
        },

        async sharePost(post)
        {

            let request = {
                original_post   : post.post_type.original_post,
                post_type       : post.post_type.type,
                caption         : {
                                    original: post.caption.original,
                                    share   : this.share.caption
                                }
            }

            let share_post_res_obj = await this.$_post(postSharePostToGlobal,
            {
                ...request
            });
            this.closeModal('share_modal');
        },
        
    }
}
</script>

<style scoped>
.newsfeed
{
    width: 100%;
}

.textarea-share
{
    width: 100%;
    height: 103px;
    border-radius: 5px;
    border: 1px solid #9a67ac;
}

.textarea-share:focus
{
    outline: none !important;
    border: 2px solid #9a67ac;
}

</style>