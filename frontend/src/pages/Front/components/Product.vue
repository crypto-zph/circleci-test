<template>
  <div class="products" id="products">
    <div class="container">
      <div class="products__inner">
        <h2 class="title products__title">
          <span class="title__bg font-rubik-title">Featured Products</span>
        </h2>

        <div class="row q-col-gutter-lg">
          <div class="col-md-3 col-12">
            <div class="product-item">
              <q-item class="q-mb-sm">
                <q-item-section avatar>
                  <q-avatar>
                    <img @click="$router.push({name: 'front_profile'})" src="https://cdn.quasar.dev/img/avatar2.jpg" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label @click="$router.push({name: 'front_profile'})" style="font-weight: 400" class="font-rubik-title cursor-pointer">Mary Lite</q-item-label>
                  <q-item-label caption>Active 3 Hours ago</q-item-label>
                </q-item-section>
              </q-item>
              <a @click="$router.push({name: 'front_product_details'})" >
                <q-img src="products/product_01.jpg" alt />
              </a>
              <div class="down-content">
                <a href="#" style="text-decoration: none;">
                  <h4 @click="$router.push({name: 'front_product_details'})"  class="font-rubik-title h4__title">Modern House & Lot</h4>
                </a>
                <h6 class="h6__rate">BRT 10</h6>
               <div class="row">
                  <div class="col-1">
                  <q-avatar size="25px">
                    <img @click="$router.push({name: 'front_profile'})" src="https://cdn.quasar.dev/img/avatar2.jpg" />
                  </q-avatar>
                  </div>
                  <div class="col-11">
                <ul class="stars">
                  <q-rating
                    v-model="ratingModel"
                    size="1.2em"
                    color="grey"
                    style="margin-left: 15px"
                    :color-selected="ratingColors"
                    icon="star"
                    readonly
                  />
                </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3 col-12">
            <div class="product-item">
              <q-item class="q-mb-sm">
                <q-item-section avatar>
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/avatar.png" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label style="font-weight: 400" class="font-rubik-title">Jan Nicole</q-item-label>
                  <q-item-label caption>Active now</q-item-label>
                </q-item-section>
              </q-item>
              <a href="#">
                <q-img src="products/product_06.jpg" alt />
              </a>
              <div class="down-content">
                <a href="#" style="text-decoration: none">
                  <h4 class="font-rubik-title h4__title">2012 Audi R8 V8</h4>
                </a>
                <h6 class="h6__rate">BRT 8</h6>
                <div class="row">
                  <div class="col-1">
                  <q-avatar size="25px">
                    <img src="https://cdn.quasar.dev/img/avatar.png" />
                  </q-avatar>
                  </div>
                  <div class="col-11">
                <ul class="stars">
                  <q-rating
                    v-model="ratingModel"
                    size="1.2em"
                    color="grey"
                    style="margin-left: 15px"
                    :color-selected="ratingColors"
                    icon="star"
                    readonly
                  />
                </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3 col-12">
            <div class="product-item">
              <q-item class="q-mb-sm">
                <q-item-section avatar>
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label style="font-weight: 400" class="font-rubik-title">Xander</q-item-label>
                  <q-item-label caption>Active 69 Hours ago</q-item-label>
                </q-item-section>
              </q-item>
              <a href="#">
                <img src="products/product_07.jpg" alt />
              </a>
              <div class="down-content">
                <a href="#" style="text-decoration: none">
                  <h4 class="font-rubik-title h4__title">Camargue 47 Yatch</h4>
                </a>
                <h6 class="h6__rate">BRT 18</h6>
                <div class="row">
                  <div class="col-1">
                  <q-avatar size="25px">
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                  </q-avatar>
                  </div>
                  <div class="col-11">
                <ul class="stars">
                  <q-rating
                    v-model="ratingModel"
                    size="1.2em"
                    color="grey"
                    style="margin-left: 15px"
                    :color-selected="ratingColors"
                    icon="star"
                    readonly
                  />
                </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3 col-12">
            <div class="product-item">
              <q-item class="q-mb-sm">
                <q-item-section avatar>
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label style="font-weight: 400" class="font-rubik-title">Mary Lite</q-item-label>
                  <q-item-label caption>Active 3 Hours ago</q-item-label>
                </q-item-section>
              </q-item>
              <a href="#">
                <q-img src="products/product_01.jpg" alt />
              </a>
              <div class="down-content">
                <a href="#" style="text-decoration: none;">
                  <h4 class="font-rubik-title h4__title">Modern House & Lot</h4>
                </a>
                <h6 class="h6__rate">BRT 10</h6>
                <div class="row">
                  <div class="col-1">
                  <q-avatar size="25px">
                    <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
                  </q-avatar>
                  </div>
                  <div class="col-11">
                <ul class="stars">
                  <q-rating
                    v-model="ratingModel"
                    size="1.2em"
                    color="grey"
                    style="margin-left: 15px"
                    :color-selected="ratingColors"
                    icon="star"
                    readonly
                  />
                </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Product from "./Product.css";
export default {
  data: () => ({
    ratingModel: 3,
    ratingColors: ["warning"],
  }),
  mounted() {},
  methods: {},
};
</script>