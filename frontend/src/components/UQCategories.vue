<template>
    <div>
        <!-- Documentation -->
        <div class="q-pa-md" v-if=" is_documentation_route == true ">
            <div class="q-col-gutter-md row responsive">
                <div class="col-4" v-for="(category , index) in categories" :key="index" >
                    <q-img :src="`data:image/jpg;base64,${category.category_image_path}`" style="width: 200px; height: 200px;">
                        <div class="absolute-bottom text-subtitle1 text-center">
                            <a :href="`#/documentation/subcategories?category_name=${ category.category_name }`" style="color: white">
                                {{ category.category_name }}
                            </a>
                        </div>
                    </q-img>
                </div>
            </div>
        </div>
        <!-- Front Layout -->
        <div v-else>
            <div class="row" style=" border-radius: 15px;">
              <div class="col-12">
                <h2>
                  <span class="title__bg font-rubik-title ">Explore Baristocrat</span>
                </h2>
                <hr style="border: 0;
                  height: 1px;
                  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));">
                 <!-- CARD CATEGORIES-->
                <div class="flex q-col-gutter-md justify-center">
                  <template  v-for="(cat, i) in categories.slice(starting, ending)">
                    <div  style="cursor: pointer;" :key="i">
                        <a :href="`#/subcategories?category_name=${ cat.category_name }`">
                              <q-img class="photos" :src="`data:image/jpg;base64,${cat.category_image_path}`" style="width: 150px; height: 150px;" />
                             <q-item-label lines="1" class="text-center"><span class="text-weight-bolder text-black">{{cat.category_name}}</span></q-item-label>
                        </a>
                    </div>
                  </template>
                </div>
                <!-- CARD CATEGORIES-->
                <!-- Button Next and Previous -->
                <div class="row q-mb-md">
                    <div class="col-6">
                        <q-btn  round color="secondary" icon="keyboard_arrow_left" :disable="starting == 0 ? true: false" @click="previous()"/>          
                    </div>
                    <div class="col-6 text-right">
                        <q-btn  round color="secondary" icon="keyboard_arrow_right" class="q-ml-md" :disable="ending >= categories.length ? true: false"  @click="next()"/>
                    </div>
                </div>
                 <!-- Button Next and Previous -->
                <hr style="border: 0;
                  height: 1px;
                  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));">
              </div>
            
            </div>
        </div>
    </div>
</template>

<script>
import { postGetCategory } from "../references/url";

export default
{
    data:() =>(
    {
        categories: [],
        is_documentation_route: false,
        starting: 0,
        ending: 7
    }),
    async mounted()
    {
        await this.getCategory();
        await this.checkRoute();
    },
    methods:
    {
        next(){
            this.starting += 7,
            this.ending += 7
        },
        previous(){
            this.starting -= 7,
            this.ending -= 7 
        },
        // this for get all category data
        async getCategory() 
        {
            this.$q.loading.show();
            let get_category    = await this.$_post(postGetCategory); 
            if(get_category)
            {
                this.categories = get_category.data.data;
                this.categories = this.categories.filter( val => val.status == 'Enabled');
            }
            this.$q.loading.hide();
        },

        async checkRoute()
        {
            this.is_documentation_route = (this.$route.name == 'documentation_categories') ? true : false;
        }
    }
}
</script>
<style scoped>
a{
    text-decoration: none;
}
</style>