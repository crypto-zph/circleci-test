<template>
    <div class="search row">
        <div class="col-12 autocomplete hidden">
            <q-input
                dense
                borderless
                v-model="keyword"
                placeholder="Search......"
                color="blue-grey-14"
                class="bg-white q-pr-xs q-pl-md"
                style="border-radius: 10px"
                @keyup.enter="filterData"
                @input="onChange"
                @keydown.down="onArrowDown"
                @keydown.up="onArrowUp"
                @keydown.enter="onEnter"
            >
                <template v-slot:prepend>
                    <div class="col-4">
                        <q-select
                        dense
                        borderless
                        flat
                        behaviour="menu"
                        v-model="type"
                        :options="options"
                        @input="getData"
                        style="width: 5rem"
                        />
                    </div>
                </template>
                <template v-slot:append>
                    <q-btn @click="filterData()" icon="search"  flat class="search__icon" style="padding: 0px 4px 0px 4px; color:white; border-radius: 10px" />
                </template>
            </q-input>
            <div v-if="!!results" align="center">
                <ul v-if="isOpen" id="autocomplete-results" class="dropdown-menu autocomplete-results" style="width:67%;" align="center">
                    <li
                        v-for="(result, i) in results"
                        :key="i"
                        @click="setResult(result)"
                        class="autocomplete-result"
                        :class="{ 'is-active': i === arrowCounter }"
                    >
                        {{ result }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { getSearchData, getSearchAutoComplete, postSearch } from '../../references/url';
import UQSearch from './UQSearch.css';

export default {
    data: () =>
    ({
        keyword: '',
        type: 'Items',
        options:
        [
            'Items',
            'Users'
        ],
        // autocomplte section
        autoComplete: {},
        isOpen: false,
        isLoading: false,
        isAsync: false,
        items: [],
        results: [],
        datas: [],
        arrowCounter: 0,
    }),
    created()
    {
        this.searchData();
        this.getSearchAutoComplete();
    },
    methods:
    {
        async searchData ()
        {
            this.$q.loading.show();

            this.keyword = (this.$route.query.keyword != null) ? this.$route.query.keyword : this.keyword;
            this.type = (this.$route.query.type != null) ? this.$route.query.type : this.type;

            let category = (this.$route.query.category_name != null) ? this.$route.query.category_name : '';
            let subcategory = (this.$route.query.subcategory_name != null) ? this.$route.query.subcategory_name : '';
            let subcategory2 = (this.$route.query.subcategory2_name != null)  ? this.$route.query.subcategory2_name : '';

            let url = '';

            if (this.type != '') {
                url += `?type=${this.type}`;
            } else {
                url += `?type=Items`;
            }

            if (this.keyword != '') {
                url += `&keyword=${this.keyword}`;
            }

            if (category != '') {
                url += `&category=${category}`;
            }

            if (subcategory != '') {
                url += `&category=${subcategory}`;
            }

            if (subcategory2 != '') {
                url += `&category=${subcategory2}`;
            }

            this.product_data = await this.$_get(`${getSearchData}${url}`);

            this.datas = this.product_data.data.data;

            // save cookie for recent search
            if (this.keyword != '') {
                let searches = (this.$q.cookies.has('recent_search')) ? this.$q.cookies.get('recent_search') : [];

                await this.$_post(postSearch, { search: this.keyword });

                if (searches.length != 0 && this.keyword != '') {
                    if (!searches.includes(this.keyword.toLowerCase())) {
                        searches.push(this.keyword.toLowerCase());
                    } else {
                        let index = searches.indexOf(this.keyword);
                        searches.splice(index, 1);
                        searches.push(this.keyword.toLowerCase());
                    }
                } else {
                    searches.push(this.keyword.toLowerCase());
                }

                let options =
                {
                    expires: 7 // in 7 days
                };

                this.$q.cookies.set('recent_search', searches, options);
            }

            // save cookie for suggested products
            if (this.keyword != '' && this.datas.length != 0 && category == '' && subcategory == '' && subcategory2 == '') {
                let searches = (this.$q.cookies.has('suggested_products')) ? this.$q.cookies.get('suggested_products') : [];

                if (searches.length != 0 && this.keyword != '') {
                    if (!searches.includes(this.keyword.toLowerCase())) {
                        searches.push(this.keyword.toLowerCase());
                    }
                } else {
                    searches.push(this.keyword.toLowerCase());
                }

                let options =
                {
                    expires: '1d' // in 1 day
                };

                this.$q.cookies.set('suggested_products', searches, options);
            }

            this.$q.loading.hide();

            // added code by toqaf
            // let check = ((category != '' || subcategory != '' || subcategory2 != '') && this.type == 'Items') ? this.filterData() : this.$emit('success', this.datas);
            this.$emit('success', this.datas);
            // end
        },

        async getSearchAutoComplete ()
        {
            let data = await this.$_get(`${getSearchAutoComplete}?type=${this.type}`);
            this.items = data.data.data;
        },

        getData ()
        {
            this.keyword = '';
            this.searchData();
            this.getSearchAutoComplete();
            this.$emit('changeType', this.type);
        },

        onChange ()
        {
            if (this.isAsync) {
                this.isLoading = true;
            } else {
                this.filterResults();
                this.isOpen = true;
            }
        },

        filterResults (keyword)
        {
            this.results = this.items.filter((item) =>
            {
                return item.toLowerCase().indexOf(this.keyword.toLowerCase()) > -1;
            });
        },

        setResult (result)
        {
            this.keyword = result;
            this.isOpen = false;
        },

        onArrowDown ()
        {
            if (this.arrowCounter <= this.results.length) {
                this.arrowCounter = this.arrowCounter + 1;
            }
        },

        onArrowUp ()
        {
            if (this.arrowCounter >= 0) {
                this.arrowCounter = this.arrowCounter -1;
            }
        },

        onEnter()
        {
            this.keyword = this.results[this.arrowCounter];
            this.isOpen = false;
            this.arrowCounter = -1;
        },

        handleClickOutside(evt)
        {
            if (!this.$el.contains(evt.target)) {
                this.isOpen = false;
                this.arrowCounter = -1;
            }
        },

        filterData ()
        {
            this.isOpen = false;
            this.arrowCounter = -1;

            let field = (this.type === 'Items') ? 'item_name' : 'full_name';
            let filtered = [];

            // added code by toqaf
            let category      = '';
            let sub_category  = '';
            let sub_category2 = '';

            category = (this.$route.query.category_name != null) ? this.$route.query.category_name : '';
            category = (this.keyword != '' && category != '') ? '' : category;
            category = (this.keyword != '' && category == '') ? '' : category; console.log('category ', category);

            sub_category = (this.$route.query.subcategory_name != null) ? this.$route.query.subcategory_name : '';
            sub_category = (this.keyword != '' && sub_category != '') ? '' : sub_category;
            sub_category = (this.keyword != '' && sub_category == '') ? '' : sub_category; console.log('sub_category ', sub_category);

            sub_category2 = (this.$route.query.subcategory2_name != null) ? this.$route.query.subcategory2_name : '';
            sub_category2 = (this.keyword != '' && sub_category2 != '') ? '' : sub_category2;
            sub_category2 = (this.keyword != '' && sub_category2 == '') ? '' : sub_category2; console.log('sub_category2 ', sub_category2);
            // end by toqaf

            // sub_category = (this.$route.query.key != null) ? this.$route.query.key : sub_category;

            if (sub_category != '') {

                // added code by toqaf
                this.$emit('section', 'subcategories');
                // end by toqaf

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

            // added code by toqaf
            if (category != '')
            {
                this.$emit('section', 'categories');
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
                this.$emit('section', 'subcategories2');
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
                if (this.type === 'Items') {
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
                } else if (this.type === 'Users') {
                    for (let count = 0; count < this.datas.length; count++)
                    {
                        if(this.keyword)
                        {
                            if (this.datas[count].full_name.toLowerCase().includes(this.keyword.toLowerCase()) || this.datas[count].username.toLowerCase().includes(this.keyword.toLowerCase()))
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
            }
            // end by toqaf

            //  else {
            //     for (let count = 0; count < this.datas.length; count++) {
            //         if (this.datas[count][field].toLowerCase().includes(this.keyword.toLowerCase())) {
            //             filtered.push(this.datas[count]);
            //         }
            //     }
            // }

            this.$emit('success', filtered);
        }
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside)
    },
    destroyed() {
        document.removeEventListener('click', this.handleClickOutside)
    },
}
</script>
<style>
.search__icon{
  background: linear-gradient(-45deg, #e39e05, #e39e05, #e39e05 ,#764e85,#764e85, #764e85);
  background-size: 400% 400%;
	animation: gradient 85s ease infinite;
}
</style>