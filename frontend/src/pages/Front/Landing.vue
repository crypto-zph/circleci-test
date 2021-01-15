<template>
  <div class="landing__container" :class="$q.dark.isActive ? 'header_dark' : 'header_normal'">
    <div class="q-my-lg">
      <!-- <promo></promo> -->
      <u-q-annoucement-carousel></u-q-annoucement-carousel>
    </div>
    <div>
        <category></category>
    </div>
    <div>
      <u-q-home-page-flash-deal></u-q-home-page-flash-deal>
    </div>
    <div>
        <product-home-page></product-home-page>
    </div>
    <div v-if="this.$q.cookies.has('suggested_products')">
      <div>
          <h2>
              <span class="title__bg font-rubik-title">Suggested Products</span>
          </h2>
      </div>
      <u-q-suggested-products></u-q-suggested-products>
    </div>
    <div>
      <div>
          <h2>
              <span class="title__bg font-rubik-title">Featured Products</span>
          </h2>
      </div>
      <u-q-featured-products></u-q-featured-products>
    </div>
  </div>
</template>

<script>
import Promo from "../../pages/Front/components/Promo.vue";
import Product from "../../pages/Front/components/Product.vue";
import ProductHomePage from "../../pages/Product/ProductHomePage";
import Category from "../../pages/Front/Category.vue"
import UQSuggestedProducts from "../../components/UQSuggestedProducts"
import UQFeaturedProducts from "../../components/UQFeaturedProducts"
import UQAnnoucementCarousel from "../../components/UQAnnouncementCarousel"
import UQHomePageFlashDeal from "../../components/UQHomepageFlashDeal"
export default {
  data: () => ({}),
  components: {
    Promo,
    Product,
    ProductHomePage,
    Category,
    UQSuggestedProducts, 
    UQFeaturedProducts,
    UQAnnoucementCarousel,
    UQHomePageFlashDeal
  },
  mounted() {

  },
  methods: {},
};
</script>
<style>
.landing__container{
  padding-right: 250px;
  padding-left: 250px;
  padding-bottom: 100px;
}
@media (max-width: 1800px) {
  .landing__container{
    padding-right: 100px;
    padding-left: 100px;
    padding-bottom: 100px;
  }
}
@media (max-width: 900px) {
  .landing__container{
    padding-right: 50px;
    padding-left: 50px;
    padding-bottom: 100px;
  }
}

/* Dark Mode */
.header_normal {
  background-color: rgb(242, 245, 250);
  color: black;
}
.header_dark {
  /* background: linear-gradient(145deg, rgb(61, 14, 42) 15%, rgb(14, 43, 78) 70%); */
  background-color: #010101f2;
}

</style>