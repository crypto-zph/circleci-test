<template>
  <div class="row">
      <div class="col-12">
          <q-form>
              <!-- {{form_data}} -->
              <!-- {{subcategory2}} -->
                <!-- <div class="field q-mt-md">
                    <q-input
                        label="Search"
                        type="text"
                        v-model="search"
                        outlined
                    />
                </div> -->
                <div class="field q-mt-md">
                    <div class="q-gutter-sm" >
                        <q-select 
                            v-model="category"
                            label="Category"
                            :options="lists.categories" 
                            option-value="category_name"
                            option-label="category_name" 
                            outlined
                            color="secondary"            
                        >
                            <template v-slot:prepend>
                                <q-avatar>
                                    <img :src="category.category_image_path == undefined ? 'https://cdn.quasar.dev/logo/svg/quasar-logo.svg' : server.CATEGORY_IMAGE_URL + '/main/' + category.category_image_path" />
                                </q-avatar>
                            </template>
                            <template v-slot:option="scope">
                                <q-item
                                    v-bind="scope.itemProps"
                                    v-on="scope.itemEvents"
                                >
                                    <q-item-section side>
                                        <img :src="server.CATEGORY_IMAGE_URL + '/main/' + scope.opt.category_image_path" />
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label v-html="scope.opt.category_name" />
                                    </q-item-section>
                                </q-item>
                            </template>
                        </q-select>
                        <div v-if="category.subcategory != undefined">
                            <q-select
                                v-model="subcategory"
                                label="Subcategory"
                                :options="category.subcategory"
                                option-value="subcategory_name"
                                option-label="subcategory_name" 
                                outlined
                                color="secondary"
                            >
                            </q-select>
                        </div>
                        <div v-if="subcategory2_filter.length > 0">
                            <q-select
                                v-model="subcategory2"
                                :label="subcategory.subcategory_name"
                                :options="subcategory2_filter"
                                option-value="subcategory2_name"
                                option-label="subcategory2_name" 
                                outlined
                                color="secondary"
                            >
                                <template v-slot:option="scope">
                                    <q-item
                                        v-bind="scope.itemProps"
                                        v-on="scope.itemEvents"
                                    >
                                        <q-item-section>
                                            <q-item-label v-html="scope.opt.subcategory_name == subcategory.subcategory_name ? scope.opt.subcategory2_name : ''" />
                                        </q-item-section>
                                    </q-item>
                                </template>
                            </q-select>
                        </div>
                    </div>

                </div>
                <div class="field q-mt-md">
                    <q-select 
                        v-model="country"
                        label="Country"
                        :options="lists.countries"
                        option-value="name"
                        option-label="name" 
                        outlined
                        color="secondary"     
                    >
                        <template v-slot:prepend>
                            <q-avatar v-if="country == ''">
                                <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
                            </q-avatar>
                            <img :src="'https://www.countryflags.io/' + country.code + '/flat/32.png'" v-if="country != ''" />
                            
                            
                        </template>
                        <template v-slot:option="scope">
                            <q-item
                                v-bind="scope.itemProps"
                                v-on="scope.itemEvents"
                            >
                                <q-item-section side>
                                    <img :src="'https://www.countryflags.io/' + scope.opt.code + '/flat/32.png'" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label v-html="scope.opt.name" />
                                </q-item-section>
                            </q-item>

                        </template>
                    </q-select>
                </div>
                <div class="field q-mt-md">
                    <q-select
                        v-model="sort_by"
                        label="Sort By"
                        :options="lists.sorts_by"
                        option-value="name"
                        option-label="name" 
                        outlined
                        color="secondary"
                    >
                    </q-select>
                </div>
                <div class="field q-mt-md">
                    <div class="row">
                        <div class="col-6">
                            <label>Item performance</label>
                            <div class="q-gutter-sm" >
                                <q-option-group
                                    :options="lists.item_performances"
                                    label="Item performance"
                                    type="checkbox"
                                    v-model="item_performance"
                                    color="secondary"
                                />
                            </div>
                        </div>
                        <div class="col-6">
                            <label>Item condition</label>
                            <div class="q-gutter-sm" >
                                <q-option-group
                                    :options="lists.item_conditions"
                                    label="Item condition"
                                    type="checkbox"
                                    v-model="item_condition"
                                    color="secondary"                 
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field q-mt-md">
                    <label>Price ({{ country.currencyCode }})</label>
                    <div class="q-gutter-sm" >
                        <q-input color="secondary" label="Minimum" type="number" v-model="minimum_price" outlined />
                        <q-input color="secondary" label="Maximum" type="number" v-model="maximum_price" outlined />
                    </div>
                </div>
          </q-form>
      </div>
  </div>
</template>

<script>
import config                           from '../../config';
import countries, { filter }                        from '../references/countries';
import { sorts_by, item_conditions, item_performances } from '../references/item_filters';
import { postFetchEnabledCategories, postFetchFilteredItems }   from '../references/url';
export default {
    data: () => ({
        search                  : '',
        category                : '',
        subcategory             : '',
        subcategory2            : '',
        subcategory2_arr        : [],
        subcategory2_filter     : [],
        country                 : '',
        item_condition          : [],
        item_performance        : [],
        sort_by                 : '',
        minimum_price           : 0.00,
        maximum_price           : 0.00,
        is_category_modified    : false,
        server          : {
            CATEGORY_IMAGE_URL: config.CATEGORY_IMAGE_URL
        },
        lists       : {
            categories  : [],
            countries   : countries,
            sorts_by    : sorts_by,
            item_conditions: item_conditions,
            item_performances: item_performances
        },
        form_data   : {
            selected_category   : null,
            selected_subcategory: null,
            item_name           : null,
            category            : null,
            subcategory         : null,
            subcategory2        : null,
            country             : null,
            sort_by             : null,
            item_performance    : null,
            item_condition      : null,
            min_price           : 0.00,
            max_price           : 0.00
        }
    }),

    async mounted()
    {
        const user_loc_info     = await this.$_locateUser();
        this.country            = {
            name        : user_loc_info.data.country_name,
            code        : user_loc_info.data.country_code,
            currencyCode: user_loc_info.data.currency
        };
        this.lists.categories   = await this.fetchEnabledCategories();
        
        this.lists.categories.forEach((item, i) =>
        {
            item.subcategory2.forEach((item_2, i) => 
            {
                this.subcategory2_arr.push(item_2);
            });
        });
    },

    methods: {
        async filterItems()
        {
            this.form_data.item_name            = this.search;
            this.form_data.category             = this.category.category_name || '';
            this.form_data.subcategory          = this.subcategory.subcategory_name || '';
            this.form_data.subcategory2         = this.subcategory2_filter.length > 0 ? this.subcategory2.subcategory2_name : '';
            this.form_data.country              = this.country;
            this.form_data.sort_by              = this.sort_by;
            this.form_data.item_performance     = this.item_performance;
            this.form_data.item_condition       = this.item_condition;
            this.form_data.min_price            = parseFloat(this.minimum_price);
            this.form_data.max_price            = parseFloat(this.maximum_price);

            const filtered_items_obj_res        = await this.$_post(postFetchFilteredItems, this.form_data);
        },
        async fetchEnabledCategories ()
        {
            const categories_res_obj    = await this.$_post(postFetchEnabledCategories);
            const categories            = categories_res_obj.data.categories;
            return categories;
        },

        async setSubcategory2Filter()
        {
            this.subcategory2 = '';
            this.category.category_name;
            this.subcategory.subcategory_name;

            let arr = this.subcategory2_arr.filter((item) =>
            {
                
                return (item.category_name == this.category.category_name && item.subcategory_name == this.subcategory.subcategory_name); 
            });

            this.subcategory2_filter = arr;
        }
    },

    watch: {
        search: async function ()
        {
            this.filterItems();
        },
        category: async function ()
        {
            this.subcategory            = this.category.subcategory[0];
            this.is_category_modified   = true;
            this.setSubcategory2Filter();
            if(this.subcategory2_filter.length > 0)
            {
                this.subcategory2 = this.subcategory2_filter[0];
            }
            else
            {
                this.subcategory2 = null;
            }
            this.filterItems();
        },
        subcategory: async function ()
        {
            // this condition will check if category is modified
            if(this.is_category_modified === true)
            {
                // if modified then is_category_modified will set to false and no request shall sent
                this.is_category_modified = false;
                return;
            }

            this.setSubcategory2Filter();
            if(this.subcategory2_filter.length > 0)
            {
                this.subcategory2 = this.subcategory2_filter[0];
            }
            else
            {
                this.subcategory2 = null;
            }
            this.filterItems();
            // this.subcategory2_filter = [];
        },
        subcategory2: async function ()
        {
            this.filterItems();
        },
        country: async function ()
        {
            this.filterItems();
        },
        sort_by: async function ()
        {
            this.filterItems();
        },
        item_condition: async function ()
        {
            this.filterItems();
        },
        item_performance: async function ()
        {
            this.filterItems();
        },
        minimum_price: async function ()
        {
            if(parseFloat(this.minimum_price) <= parseFloat(this.maximum_price)
            )
            {
                this.filterItems();
            }
        },
        maximum_price: async function ()
        {
            if(parseFloat(this.minimum_price) <= parseFloat(this.maximum_price)
            )
            {
                this.filterItems();
            }
        }
    }
}
</script>

<style>

</style>