<template>
  <div class="products_2" id="products">
    <div class="container">
      <div class="products__inner">
          <div class="row">
              <div class="col-12 q-mx-sm">
                  <div class="q-pa-md row">
                      <div class="col navigate__btn-left">
                      <span id="desktop__view">Sort By: </span>
                   <q-btn-dropdown color="primary" outline label="Best Match" class="q-px-sm" dense>
                    <q-list>
                        <q-item clickable v-close-popup @click="onItemClick">
                        <q-item-section>
                            <q-item-label>Best Match</q-item-label>
                        </q-item-section>
                        </q-item>

                        <q-item clickable v-close-popup @click="onItemClick">
                        <q-item-section>
                            <q-item-label>Low to high</q-item-label>
                        </q-item-section>
                        </q-item>

                        <q-item clickable v-close-popup @click="onItemClick">
                        <q-item-section>
                            <q-item-label>High to low</q-item-label>
                        </q-item-section>
                        </q-item>
                    </q-list>
                    </q-btn-dropdown>
                      </div>
                      <div class="col navigate__btn-right">
                    <span class="q-ml-md">
                   <span id="desktop__view">View:</span>
                    </span>
                     <q-btn @click="drawer = !drawer" id="mobile__view" size="10px" round class="text-center" flat icon="fas fa-filter"></q-btn>
                    <q-btn size="10px" round class="text-center" flat icon="fas fa-th-large"></q-btn>
                      <q-btn size="10px" round class="text-center" flat icon="fas fa-th-list"></q-btn>
                      </div>
                  </div>
                  <q-separator />
              </div>
          </div>
        <div class="row q-col-gutter-sm q-pa-sm">
          <div class="col-md-3 col-6">
            <div class="product-item_2">
              <a @click="$router.push({name: 'front_product_details'})">
                <q-img src="products/product_01.jpg" alt />
              </a>
              <div class="q-pa-md">
                  <div>
                        <a href="#" style="text-decoration: none;">
                        <h4 class="font-rubik-title text-h6 font-rubik-title title__product" style="color: #9A67AC">Modern House & Lot</h4>
                        </a>
                  </div>
                <div>
                     <h6 class="h6__rate font-rubik-labels"><span style="font-weight: 500;">BRT </span> <b>10</b></h6>
                </div>
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
        </div>
      </div>
    </div>
        <q-drawer
        v-model="drawer"
        show-if-above
        :width="300"
        :breakpoint="500"
      >
        <q-scroll-area class="fit">
          <div class="q-pa-md">
            <h5 class="font-rubik-title">Category</h5>
               <q-list v-for="(cat, i) of category" dense :key="i">
                  <q-expansion-item :label="cat.label" dense lines="1">
                    <q-item v-for="(sub, j) of cat.sub" clickable v-ripple dense :key="j">{{sub.label}}</q-item>
                  </q-expansion-item>
               </q-list>

            <br>

<!-- v-for="sub of cat.sub" -->

               <h5 class="font-rubik-title">Country</h5>
                  <div class="column">
                  <q-checkbox size="30px" color="secondary" v-model="asia" label="Asia" />
                  <q-checkbox size="30px" color="secondary" v-model="euro" label="Europe" />
                  <q-checkbox size="30px" color="secondary" v-model="aus" label="Australia" />
                  <q-checkbox size="30px" color="secondary" v-model="afr" label="Africa" />
                  <q-checkbox size="30px" color="secondary" v-model="sa" label="South America" />
                  <q-checkbox size="30px" color="secondary" v-model="na" label="North America" />
                  <q-checkbox size="30px" color="secondary" v-model="ant" label="Antartica" />

                  <br>


              <h5 class="font-rubik-title">Price</h5>
                <q-range
                  v-model="standard"
                  :min="0"
                  label
                  :max="1000"
                  class="text-purple-7"
                />
                Price: ${{ standard.min }} to ${{ standard.max }}
                  </div>
                </div>
        </q-scroll-area>
      </q-drawer>
  </div>
</template>

<script>
import category from "../../references/category"
import Catalog from "./Catalog.css";
export default {
  data: () => ({
    category: [],
    ratingModel: 3,
    ratingColors: ["warning"],
    drawer: false,
     standard: {
        min: 1,
        max: 1000,
      },
       asia: false,
       euro: false,
       sa: false,
       na: false,
       ant: false,
       aus: false,
       afr: false,

  }),
  mounted() {
    this.category = category;
  }
};
</script>

<style>
.product-item_2
{
    transition: all 0.3s ease-in-out;
}
.product-item_2:hover
{
    -webkit-box-shadow: 0px 0px 10px -3px rgba(0,0,0,1);
    -moz-box-shadow: 0px 0px 10px -3px rgba(0,0,0,1);
    box-shadow: 0px 0px 10px -3px rgba(0,0,0,1);
}
.navigate__btn-left
{
    text-align: left
}
.navigate__btn-right
{
    text-align: right
}
@media (max-width: 485px)
{
    #desktop__view
    {
        display: none;
    }
    .title__product
    {
      font-size: 15px;
      line-height: 15px;
    }
}
@media (min-width: 485px)
{
    #mobile__view
    {
        display: none;
    }
}
</style>