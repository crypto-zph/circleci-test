<template>
    <div>
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
    }),
    async mounted()
    {
        await this.searchData();
    },
    methods:
    {
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
            sub_category = sub_category.toLowerCase();
            sub_category = sub_category.charAt(0).toUpperCase() + sub_category.slice(1);
            sub_category = (this.keyword != '' && sub_category != '') ? '' : sub_category;
            sub_category = (this.keyword != '' && sub_category == '') ? '' : sub_category; console.log('sub_category ', sub_category);

            sub_category2 = (this.$route.query.subcategory2_name != null) ? this.$route.query.subcategory2_name : '';
            sub_category2 = sub_category2.toLowerCase();
            sub_category2 = sub_category2.charAt(0).toUpperCase() + sub_category2.slice(1);
            sub_category2 = (this.keyword != '' && sub_category2 != '') ? '' : sub_category2;
            sub_category2 = (this.keyword != '' && sub_category2 == '') ? '' : sub_category2; console.log('sub_category2 ', sub_category2);

            if (sub_category != '') 
            {

                for (let count = 0; count < this.datas.length; count++) {
                    if (this.keyword) {
                        if (this.datas[count].sub_category.toLowerCase().includes(sub_category.toLowerCase()) &&
                            this.datas[count][field].toLowerCase().includes(this.keyword.toLowerCase())) {
                            filtered.push(this.datas[count]);
                        }
                    } else {
                        if (this.datas[count].sub_category.toLowerCase().includes(sub_category.toLowerCase())) {
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
    },
}
</script>