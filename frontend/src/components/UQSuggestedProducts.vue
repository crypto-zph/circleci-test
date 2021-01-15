<template>
    <div>
        <div class="q-mb-md"  v-if="!isEmpty(product_details)">
            <div>
                <u-q-product-tiles :tile_details="product_details" :user_data="user_data"></u-q-product-tiles>
            </div>
            
        </div>
        
        <div v-else>
            No data found
        </div>

                <hr style="border: 0;
                  height: 1px;
                  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));">
    </div>
</template>

<script>
import UQProductTiles from './global/UQProductTiles';
import { getSuggestedProducts } from '../references/url';
import { log } from 'console';
export default {
    components: { UQProductTiles },
    data: () =>
    ({
        product_details: {},
        user_data: {},
    }),
    mounted()
    {
        this.getSuggestedProductsCookies();
    },
    methods:
    {
        async getSuggestedProductsCookies()
        {
            // this.$q.cookies.remove('suggested_products');
            if (this.$q.cookies.has('suggested_products')) {
                let searches = this.$q.cookies.get('suggested_products');
                if (searches) {
                    let url = `${getSuggestedProducts}?`;
                    for (let count = 0; count < searches.length; count++) {
                        if (count == 0) {
                            url += `searches=${searches[count]}`;
                        } else {
                            url += `&searches=${searches[count]}`;
                        }
                    }
                    
                    let suggested_products = await this.$_get(url);
                    let products = suggested_products.data.data
                 
                    
                    for(let i = 0; i < products.length; i++)
                    {
                        products[i].seller_id = products[i].seller_id[0] 
                        
                    }

                    this.product_details = (suggested_products) ? products : {};
                    // this.product_details = (suggested_products) ? suggested_products.data.data : {};
                    // console.log(suggested_products.data.data[0].seller_id);
                    // console.log(this.product_details[0].seller_id)
                    console.log(this.product_details)
                }
            }
        },
        isEmpty(obj)
        {
            return typeof obj === 'undefined' || Object.keys(obj).length === 0;
        }
    }
}
</script>