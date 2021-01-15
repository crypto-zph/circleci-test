<template>
  <div>
    <div class="row">
      <!-- <div class="col-md-2 gt-sm">
        <q-list  dense bordered padding class="rounded-borders my__categories__section bg-white">
          <template v-for="(cat, i) of category" >
            <div class="dropdown-categories" :key="i">
              <q-item clickable v-ripple>
                <q-item-section class="categories__item dropdown">{{cat.label}}</q-item-section>
              </q-item>

              <div class="dropdown-content-categories bg-white">
                <div v-for="(sub, i) in cat.sub" :key="i">
                  <a href="#">{{sub.label}}</a>
                </div>
              </div>
            </div>
          </template>
        </q-list>
      </div> -->

      <div class="col-12" style="z-index: -9999">
        <q-carousel
        style="height: 300px"
        class="carousel__container"
          animated
          v-model="slide"
          navigation
          infinite
          :autoplay="autoplay"
          arrows
          transition-prev="slide-right"
          transition-next="slide-left"
        >
          <q-carousel-slide :name="1" img-src="promos/promo-banner.jpg" />
          <q-carousel-slide :name="2" img-src="promos/promo-banner.jpg" />
          <q-carousel-slide :name="3" img-src="promos/promo-banner.jpg" />
          <q-carousel-slide :name="4" img-src="promos/promo-banner.jpg" />
        </q-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import category from "../../../references/category";
import Promo from "./Promo.css";
export default {
  data: () => ({
    slide: 1,
    autoplay: true,
    category: [],
  }),
  mounted() {
    this.category = category;
  },
  methods: {},
};
</script>
<style>
/* .dropdown-categories {
  display: inline-block;
} */
.dropdown-content-categories {
  margin-left: 140px;
}
.dropdown-content-categories a:hover {
  background-color: #e0e0e0;
  color: #f36d00;
}

.dropdown-content-categories a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.dropdown-content-categories {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-categories:hover .dropdown-content-categories {
  display: block;
}
</style>