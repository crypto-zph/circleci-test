<template>
  <div>
    <div class="q-ma-lg">
      <div>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-4">
            <q-card class="my-card" style="width: 350px; height: 500px; border-radius: 5%;" shadow>
              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>VermontPhil</q-item-label>
                  <q-item-label caption>
                    2 minutes ago
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-card-section>
                <q-card-section>
                    <q-img class="img-shadow view" style="border-radius: 5%; position:relative;" src="../../public/products/product_07.jpg">
                    <div class="product__tiles__overlay">
                        <div class="product__tiles__border">
                            <a href="" class="view__details">Quick View</a>
                        </div>
                    </div>
                    </q-img>
                </q-card-section>

              <q-card-section>
              <div>
                <div class=" text-h6 ellipsis">
                    Cafe Basilico
                </div>
                <div class="text-subtitle1">
                  BRT 20
                </div>
                <div class="text-h6 text-grey">
                  <q-icon name="place" />
                  <span class="q-ml-sm" style="font-size: 15px;">Mandaluyong City</span>
                </div>
                <div class="text-caption text-grey">
                    Small plates, salads & sandwiches in an intimate setting.
                </div>
              </div>
              </q-card-section>

              </q-card-section>
            </q-card>
          </div>
          
          <div class="col-12 col-md-4">
            <q-card class="my-card" style="width: 350px; height: 500px; border-radius: 5%;" shadow>
              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>VermontPhil</q-item-label>
                  <q-item-label caption>
                    2 minutes ago
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-card-section>
                <q-card-section>
                    <q-img class="img-shadow view" style="border-radius: 5%; position:relative;" src="../../public/products/product_07.jpg">
                    <div class="product__tiles__overlay">
                        <div class="product__tiles__border">
                            <a href="" class="view__details">Quick View</a>
                        </div>
                    </div>
                    </q-img>
                </q-card-section>
              <q-card-section>


              <div>
                <div class=" text-h6 ellipsis">
                    Cafe Basilico
                </div>
                <div class="text-subtitle1">
                  BRT 20
                </div>
                <div class="text-h6 text-grey">
                  <q-icon name="place" />
                  <span class="q-ml-sm" style="font-size: 15px;">Mandaluyong City</span>
                </div>
                <div class="text-caption text-grey">
                    Small plates, salads & sandwiches in an intimate setting.
                </div>
              </div>
              </q-card-section>

              </q-card-section>
            </q-card>
          </div>

        <div class="col-12 col-md-4">
            <q-card class="my-card" style="width: 350px; height: 500px; border-radius: 5%;" shadow>
              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>VermontPhil</q-item-label>
                  <q-item-label caption>
                    2 minutes ago
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-card-section>
                <q-card-section>
                    <q-img class="img-shadow view" style="border-radius: 5%; position:relative;" src="../../public/products/product_07.jpg">
                    <div class="product__tiles__overlay">
                        <div class="product__tiles__border">
                            <a href="" class="view__details">Quick View</a>
                        </div>
                    </div>
                    </q-img>
                </q-card-section>
              <q-card-section>


              <div>
                <div class=" text-h6 ellipsis">
                    Cafe Basilico
                </div>
                <div class="text-subtitle1">
                  BRT 20
                </div>
                <div class="text-h6 text-grey">
                  <q-icon name="place" />
                  <span class="q-ml-sm" style="font-size: 15px;">Mandaluyong City</span>
                </div>
                <div class="text-caption text-grey">
                    Small plates, salads & sandwiches in an intimate setting.
                </div>
              </div>
              </q-card-section>

              </q-card-section>
            </q-card>
          </div>
        </div>

      </div>
    </div>
    <!-- content -->

  </div>
</template>

<script>


export default {
  components: {
  },
  data: () => ({
  }),
  async mounted() {

  },
  methods: {

  },
};
</script>
<style>
.img-shadow{
    -webkit-box-shadow: 0 3px 20px rgba(34, 48, 53, 0.81) !important;
    box-shadow: 0 3px 20px rgba(34, 48, 53, 0.81) !important;
}

/* .view:hover{
    background-color: yellow;
} */
.view:hover .product__tiles__overlay
{
    opacity: 1;
}

.product__tiles__overlay {
  position: absolute;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
  opacity: 0;
  width: 100%;
  height: 100%;
  padding: 10px;
  border-radius: 5%;
}

.product__tiles__border{
  border: 2px solid white;
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  color: white;
  font-family: 'Oswald', sans-serif;
  letter-spacing: 2px;
  font-size: 25px;
}

.view__details{
    text-decoration: none;
    color: white;
}


</style>