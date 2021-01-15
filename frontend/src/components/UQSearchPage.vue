<template>
    <!-- content -->
    <div>
        <div class="search__page__container">
        <u-q-search @success="fromSearch" @changeType="fromSearchType"></u-q-search>
        <u-q-product-tiles v-if="type === 'Items'" :tile_details="data" :type="type" :user_data="user_data"></u-q-product-tiles>
        <u-q-user-tiles v-else-if="type === 'Users'" :tile_details="data" :user_data="user_data"></u-q-user-tiles>
    </div>
    <!-- <div v-if="type === 'Items'">
        Suggested Products
        <u-q-suggested-products></u-q-suggested-products>
    </div> -->
    </div>

</template>

<script>
import UQSearch from './global/UQSearch';
import UQProductTiles from './global/UQProductTiles';
import UQUserTiles from './global/UQUserTiles';
// import UQSuggestedProduct from '../components/UQSuggestedProducts'


export default
{
    components:
    {
        UQSearch,
        UQProductTiles,
        UQUserTiles,
    },
    data: () =>
    ({
        data: {},
        type: 'Items',
        user_data: {},
    }),
    created()
    {
        this.isUserLoggedIn();
    },
    mounted()
    {
        this.changeType();
    },
    methods:
    {
        fromSearch(data)
        {
            this.data = data;
        },

        fromSearchType(type)
        {
            this.type = type;
        },

        async isUserLoggedIn ()
        {
            // console.log(this.tile_details);
            let user = await this.$_isUserAuthenticated();

            this.user_data = (user.data.status == 'authenticated') ? user.data.user : {};
        },

        changeType ()
        {
            this.type = (this.$route.query.type !== '') ? this.$route.query.type : this.type;
        }
    }
}
</script>
<style scoped>

.search__page__container{
  padding-right: 250px;
  padding-left: 250px;
  padding-bottom: 100px;
}
@media (max-width: 1800px) {
 .search__page__container{
    padding-right: 100px;
    padding-left: 100px;
    padding-bottom: 100px;
  }
}
@media (max-width: 900px) {
 .search__page__container{
    padding-right: 50px;
    padding-left: 50px;
    padding-bottom: 100px;
  }
}
</style>