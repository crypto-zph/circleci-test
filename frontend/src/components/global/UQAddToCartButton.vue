<template>                      
    <div>
        <q-btn :rounded="btn_is_rounded" 
               :flat="btn_is_flat" 
               :class-btn="btn_has_margin_top" 
               :color="btn_has_color_purple"
               @click="addToCart"
               :label="is_saved == true ? 'Added' : 'Add To Cart'"
               :disabled="is_saved == true ? true : false"
               ></q-btn>
    </div>
</template>

<script>
import { postAddToCart, getCheckSavedItems} from '../../references/url';
    export default
    {
        props: {    
            add_to_cart_data: { default: {} },
            btn_is_rounded: { type: Boolean, default: false },
            btn_is_flat: { type: Boolean, default: false },
            btn_has_margin_top: { type: String, default: 'q-mt-md' },
            btn_has_color_purple: { type: String, default: 'secondary' },
            item_id: {type: String, default: ''}
            },
        components: {  },
        data:() =>(
        {
            user: {},
            is_saved: false
        }),
         async mounted()
        {
           await this.isUserLoggedIn()
           await this.checkSavedItem()
        },
        methods:
        {

            async isUserLoggedIn()
            {
            let user = await this.$_isUserAuthenticated();
                this.user = user.data.user;
            },

            //function add to cart here...............
            //


            async addToCart()
            {

                let price = {
                    BRT : Number(this.add_to_cart_data.price)-(Number(this.add_to_cart_data.price)*this.add_to_cart_data.garage_sale_percentage),
                };

                let save_item = 
                {
                    seller_id: this.add_to_cart_data.seller_id,
                    buyer_id: this.user._id,
                    item_id: this.add_to_cart_data.product_id,
                    item_name: this.add_to_cart_data.product_name,
                    item_image: [this.add_to_cart_data.image],
                    item_category: this.add_to_cart_data.category,
                    item_price: price
                }
                
                console.log(save_item.item_image)
                this.$q.loading.show();
                let added = await this.$_post(postAddToCart, save_item);
                console.log(added);
                if (added)
                {
                    this.$q.notify('Added To Cart.');
                    this.is_saved = true;
                }
                this.$q.loading.hide();
            },

            async checkSavedItem ()
            {
                let id = {
                    id: this.item_id,
                    buyer_id: this.user._id
                };
                
                let item = await this.$_post(getCheckSavedItems, id);
                if (item.data == "")
                {
                    this.is_saved = false;
                }
                else
                {
                    this.is_saved = true;
                }
                
                },
            },

        }
</script>

<style>

</style>