<template>
    <div class="wish__list__container">
            <div class="text-center font-rubik-title title__bg text-h5 text-weight-bolder">
                Wish List
            </div>
            <wish-list></wish-list>
        <div class="q-pa-lg">
            <wish-list-match></wish-list-match>
        </div>
    </div>
    
</template>

<script>

import WishList from "../../components/UQWishlist"
import WishListMatch from "../../components/UQWishlistMatch"
export default {
  components: {
    WishList,
    WishListMatch,
  },
    data: () => ({

    }),
    methods: {

    }
}
</script>

<style>

</style>

<style scoped>
.wish__list__container{
  padding-right: calc((100vw - 1440px)/2 + 150px); 
  padding-left: calc((100vw - 1440px)/2 + 150px); 
  padding-top: 100px;
  padding-bottom: 100px;
}
</style>



