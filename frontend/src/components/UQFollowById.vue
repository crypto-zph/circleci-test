<template>
    <q-page class="q-pa-md">
        <div class="q-gutter-y-md">
            <q-card>
                <q-tabs
                    v-model="tab"
                    dense
                    class="text-gray"
                    active-color="secondary"
                    indicator-color="secondary"
                    align="justify"
                    narrow-indicator
                >

                    <q-tab v-for="(tab, index) in tabs" :key="index" :name="tab" :label="tab" :active="tab" />
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated>
                    <q-tab-panel v-for="(follow, index) in follow" :key="index" :name="index">
                        <u-q-user-tiles v-if="follow.length" :tile_details="follow" :tab="tab" :user_data="user_data" :is_follow_page="true" @toUnfollow="fromUserTilesUnfollow" @toFollow="fromUserTilesFollow"></u-q-user-tiles>
                        
                        <q-card v-else >
                            <p>No Data</p>
                        </q-card>
                    </q-tab-panel>
             
                </q-tab-panels>
            </q-card>
        </div>
    </q-page>
</template>

<script>
import UQUserTiles from './global/UQUserTiles';
import { getFollowById } from '../references/url';

export default {
    components: { UQUserTiles },
    data: () =>
    ({
        tab: 'followers',
        'tabs' : ['followers', 'following'],
        follow: {
            following: [],
            followers: []
        },
        user_data: {}
    }),
     mounted()
    {
        this.isUserLoggedIn();
       
    },
    methods:
    {
        async isUserLoggedIn()
        {
            let user = await this.$_isUserAuthenticated();

            if (user.data.status == 'not authenticated') {
                this.$router.push({name: 'documentation_login'});
            } else if (user.data.status == 'authenticated') {
                this.user_data = user.data.user;
            }

            this.getFollowData();
        },
        async getFollowData()
        {
                let id = this.$route.params.id;
                let follow_data = await this.$_get(`${getFollowById}/${id}`);
                console.log(follow_data)

                if (follow_data.data.status == 'success') {
                    this.follow.following = follow_data.data.data.following;
                    this.follow.followers = follow_data.data.data.followers;
                }
        },
    }
}
</script>