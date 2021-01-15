<template>
    <div>

	    <!-- content -->
	    <!-- <div class="q-pa-md">
            <div class="q-col-gutter-md row responsive">
                <div class="col-4" v-for="(subcategory , index) in categories" :key="index">
                    <q-img :src="`data:image/jpg;base64,${subcategory.subcategory_image_path}`" style="width: 200px; height: 200px;">
                        <div class="absolute-bottom text-subtitle1 text-center">
                            <a :href="isHaveSubcategory2(subcategory.subcategory_name)" style="color: white" >
                                {{ subcategory.subcategory_name }}
                            </a>
                        </div>
                    </q-img>
                </div>
            </div>
        </div> -->

    <!-- <div class="row">
      <div class="col-12"> -->
        <div class="row q-col-gutter-md" style="padding: 50px 130px">
          <template  v-for="(subcategory , index) in categories" >
            <div class=" col-md-2 col-12" style="cursor: pointer;" :key="index">
                <a :href="isHaveSubcategory2(subcategory.subcategory_name)">
                    <q-card class="my-card card__color" >
                    <q-card-section class="text-center">
                      <q-img class="photos" :src="`data:image/jpg;base64,${subcategory.subcategory_image_path}`" style="width: 200px; height: 200px;" />
                     <q-item-label lines="1"><span class="text-weight-bolder text-black">{{ subcategory.subcategory_name }}</span></q-item-label>
                    </q-card-section>
                  </q-card>
                </a>
            </div>
          </template>
        </div>
      <!-- </div>
    </div> -->

        <u-q-product-tiles v-if="type === 'Items'" :tile_details="data" :type="type"></u-q-product-tiles>
    </div>
</template>

<script>
import { postGetSubcategory, getSearchData } from "../references/url";
import UQProductTiles from './global/UQProductTiles';

export default
{
    components:
    {
        UQProductTiles,
    },
    data:() =>(
    {
        main_data: [],
        categories: [],
        category_name: null,
        keyword: '',
        type: 'Items',
        isOpen: false,
        datas: [],
        data: {},
        is_documentation_route: false,
    }),
    async mounted()
    {
        await this.getDataFromRoute();
        await this.searchData();
        await this.checkRoute();
    },
    methods:
    {
        // this for get all category data
        async getCategory() 
        {
            this.$q.loading.show();
            let get_category    = await this.$_post(postGetSubcategory); 
            if(get_category)
            {
                this.main_data  = get_category.data.data;
                this.categories = this.main_data;
                this.categories = this.categories.filter( val => val.status == 'enabled'); 
                
                let x           = this.categories.map(x => x.subcategory); 
                let y           = (x.length != 0) ? x.reduce((a,b) => a.concat(b)) : [];
                this.categories = y; // subcategory
                this.categories = this.categories.filter( val => (val.category_name.toLowerCase() == this.category_name.toLowerCase() && val.status == 'Enabled') ); 
                
                let check       = (this.categories.length == 0) ? this.$router.push({ name: 'documentation_categories'}) : '';       
            }
            this.$q.loading.hide();
        },

        // this is for getting data from route
        async getDataFromRoute()
        {
            this.category_name           = this.$route.query.category_name;
            let category_name_validation = (this.category_name != null) ? await this.getCategory() : this.$router.push({ name: 'documentation_categories'});
            // let category_name_validation = (this.category_name != null) ? await this.getCategory() : '' 
        },

        // this is for href 
        isHaveSubcategory2(subcategory_name)
        {
            // let url        = `#/documentation/search?subcategory_name=${subcategory_name}`; // lagay mo dito link mo start from '#/' tapos bahalakana

            // updated code 12/3/2020 remove comment and spaceing later
            let product_url        = (this.is_documentation_route == true) ? `#/documentation/product?subcategory_name=${subcategory_name}` : `#/search/product?subcategory_name=${subcategory_name}`;
            // end of 12/3/2020

            let categories = this.main_data; 
            categories     = categories.filter( val => val.status == 'enabled');
                
            let x          = categories.map(x => x.subcategory2); 
            let y          = (x.length != 0) ? x.reduce((a,b) => a.concat(b)) : [];
            categories     = y; // subcategory2
            categories     = categories.filter( val => (val.subcategory_name == subcategory_name.toLowerCase() && val.status == 'enabled') );
            
            // let check = (categories.length == 0) ? url : `#/documentation/subcategories2?subcategory_name=${subcategory_name}`;
            let subcategory_url = (this.is_documentation_route == true) ? `#/documentation/subcategories2?subcategory_name=${subcategory_name}` : `#/subcategories2?subcategory_name=${subcategory_name}`;

            let check = (categories.length == 0) ? product_url : subcategory_url;
            return check;
        },

        async searchData ()
        {
            this.$q.loading.show();

            this.product_data = await this.$_get(`${getSearchData}?keyword=${this.keyword}&type=${this.type}`);

            this.datas = this.product_data.data.data; 

            this.$q.loading.hide(); 

            let check = (this.$route.query.subcategory_name != null || this.$route.query.category_name != null || 
                this.$route.query.subcategory2_name != null) ? await this.filterData() : this.data = this.datas;
        },

        async filterData ()
        {
            this.isOpen = false;
            this.arrowCounter = -1;

            let field = (this.type === 'Items') ? 'item_name' : 'full_name';
            let filtered = [];

            let category      = '';
            let sub_category  = '';
            let sub_category2 = '';

            category = (this.$route.query.category_name != null) ? this.$route.query.category_name : '';
            category = category.toLowerCase();
            category = category.charAt(0).toUpperCase() + category.slice(1);
            category = (this.keyword != '' && category != '') ? '' : category;
            category = (this.keyword != '' && category == '') ? '' : category; console.log('category ', category);

            sub_category = (this.$route.query.subcategory_name != null) ? this.$route.query.subcategory_name : '';
            sub_category = (this.keyword != '' && sub_category != '') ? '' : sub_category;
            sub_category = (this.keyword != '' && sub_category == '') ? '' : sub_category; console.log('sub_category ', sub_category);

            sub_category2 = (this.$route.query.subcategory2_name != null) ? this.$route.query.subcategory2_name : '';
            sub_category2 = (this.keyword != '' && sub_category2 != '') ? '' : sub_category2;
            sub_category2 = (this.keyword != '' && sub_category2 == '') ? '' : sub_category2; console.log('sub_category2 ', sub_category2);

            if (sub_category != '') 
            {

                for (let count = 0; count < this.datas.length; count++) 
                {
                    if (this.keyword) 
                    {
                        if (this.datas[count].sub_category.toLowerCase().includes(sub_category.toLowerCase()) &&
                            this.datas[count][field].toLowerCase().includes(this.keyword.toLowerCase())) 
                        {
                            filtered.push(this.datas[count]);
                        }
                    } 
                    else 
                    {
                        if (this.datas[count].sub_category.toLowerCase().includes(sub_category.toLowerCase())) 
                        {
                            filtered.push(this.datas[count]);
                        }
                    }
                }
            }

            if (category != '') 
            {
                for (let count = 0; count < this.datas.length; count++) 
                {
                    if (this.keyword) 
                    {
                        if (this.datas[count].category.toLowerCase().includes(category.toLowerCase()) &&
                            this.datas[count][field].toLowerCase().includes(this.keyword.toLowerCase())) 
                        {
                            filtered.push(this.datas[count]);
                        }
                    } 
                    else 
                    {
                        if (this.datas[count].category.toLowerCase().includes(category.toLowerCase())) 
                        {
                            filtered.push(this.datas[count]);
                        }
                    }
                }
            }

            if (sub_category2 != '') 
            {
                for (let count = 0; count < this.datas.length; count++) 
                {
                    if (this.keyword) 
                    {
                        if (this.datas[count].sub_category2.toLowerCase().includes(sub_category2.toLowerCase()) &&
                            this.datas[count][field].toLowerCase().includes(this.keyword.toLowerCase())) 
                        {
                            filtered.push(this.datas[count]);
                        }
                    } 
                    else 
                    {
                        if (this.datas[count].sub_category2.toLowerCase().includes(sub_category2.toLowerCase())) 
                        {
                            filtered.push(this.datas[count]);
                        }
                    }
                }
            }

            if (category == '' && sub_category == '' && sub_category2 == '') 
            {
                console.log('dito');
                for (let count = 0; count < this.datas.length; count++) 
                {
                    if(this.keyword)
                    {
                        if (this.datas[count][field].toLowerCase().includes(this.keyword.toLowerCase())) 
                        {
                            filtered.push(this.datas[count]);
                        }
                    }
                    else
                    {
                        filtered.push(this.datas[count]);
                    }
                    
                }
            }
            
            this.data = filtered;
        },

        async checkRoute()
        {
            this.is_documentation_route = (this.$route.name == 'documentation_subcategories') ? true : false;
        }
    },
}
</script>
<style scoped>
.photos {
    background-color: none;
    transition: transform .5s ease-in-out;
    margin: 0 auto;
  }
  
  .photos:hover {
    -ms-transform: matrix(1, 0, 0, 1, 0, -15); /* IE 9 */
    transform: matrix(1, 0, 0, 1, 0, -15); /* Standard syntax */
  }
  .card__color {
    background-image: linear-gradient(150deg, #dee6fc, #eff1f7);
  }
  a{
    text-decoration: none;
  }   
</style>