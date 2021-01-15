<template>
    <div >
        <div class="q-pa-md" v-if="!isEmpty(tile_details)">
            <div class="q-col-gutter-md row">
                <u-q-card-user
                    class="col-12"
                    v-for="(tile, index) in tile_details" :key="index"
                        :_id="!!tile._id ? tile._id : ''"
                        :username="!!tile.username ? `@${tile.username}` : ''"
                        :avatar="!!tile.avatar_path ? tile.avatar_path : ''"
                        :full_name="!!tile.full_name ? formatName(tile.full_name) : (!!tile.first_name || !!tile.last_name) ? `${tile.first_name} ${tile.last_name}` : ''"
                        :followers="!!tile.followers ? `${countFollowers(tile.followers)} follower(s)` : ''"
                        :user_data="user_data"
                        @unfollow="passUnfollowId"
                        @follow="passFollowId"
                        :tab="tab"
                        :gender="tile.gender"
                >
                </u-q-card-user>
            </div>
        </div>
        <div v-else>
            No User Found
        </div>
    </div>
</template>

<script>
import UQCardUser from './UQCardUser';

export default
{
    props: {
        tile_details : { default: {} },
        user_data: { default: {} },
        is_follow_page : {
            type: Boolean,
            default: false
        },
        tab: {}
    },
    data: () =>
    ({
    }),
    components: { UQCardUser },
    mounted()
    {
        // this.filterData();
        // alert(this.tab[0])
    },
    methods:
    {
        formatName(name)
        {
            let splitStr = name.toLowerCase().split(' ');
           for (let i = 0; i < splitStr.length; i++) {
               // You do not need to check if i is larger than splitStr length, as your for does that for you
               // Assign it back to the array
               splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
           }

           return splitStr.join(' ');
        },

        countFollowers (followers)
        {
            return followers.length
        },

        passUnfollowId (user_id)
        {
            if (this.is_follow_page) {
                this.$emit('toUnfollow', user_id);
            }
        },

        passFollowId (user_id)
        {
            if (this.is_follow_page) {
                this.$emit('toFollow', user_id);
            }
        },

        isEmpty(obj)
        {
            return Object.keys(obj).length === 0;
        },
    }
}
</script>