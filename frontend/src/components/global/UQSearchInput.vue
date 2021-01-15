<template>
    <div class="search row">
        <div class="col-12 autocomplete">
            <q-input
                dense
                v-model="keyword"
                borderless
                placeholder="Search..."
                color="grey-14"
                class="q-pr-xs q-pl-md"
                :class="$q.dark.isActive ? 'bg-dark-grey' : 'bg-white'"
                style="border-radius: 10px; border: 0.5px solid #707070 "
                @keyup.enter="$router.push({path: 'search', query: { keyword: keyword, type: type }})"
                @input="onChange"
                @keydown.down="onArrowDown"
                @keydown.up="onArrowUp"
                @keydown.enter="$router.push({path: 'search', query: { keyword: keyword, type: type }})"
                @click="recent_trending = true"
                ref="searchInput"
            >
                <template v-slot:prepend>
                    <div class="col-4">
                        <q-select
                        dense
                        borderless
                        flat
                        v-model="type"
                        :options="options"
                        @input="getData"
                        style="width: 5rem"
                        />
                    </div>
                </template>
                <template v-slot:append>
                    <q-btn @click="$router.push({path: 'search', query: { keyword: keyword, type: type }})" icon="search"  flat  :class="$q.dark.isActive ? 'bg-dark-violet' : 'bg-secondary'"  style="padding: 0px 4px 0px 4px; color:white; border-radius: 10px" />
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
            <div v-if="!!trendings && trendings.length != 0 && !isOpen && recent_trending && type == 'Items'" align="center">
                <div class="dropdown-menu trending-recent-div" style="width:67%;" align="center">
                    <div>
                        <div v-if="!!recents && recents.length != 0">
                            <div class="text-h6" align="left">Recents
                                <span class="text-h6" style="float: right; cursor: pointer;">
                                    <a @click="clearRecents()" class="search-input-link">Clear all</a>
                                </span>
                            </div>
                            <div v-for="(recent, i) in recents" :key="i">
                                <q-item class="recent-item-con" v-if="i < 5" style="width: 100%;">
                                    <q-item-section align="left" style="display: block;">
                                        <q-icon name="schedule" /> <a :href="`/#/documentation/search?keyword=${recent.replace(/&/g, '%26')}&type=Items`">{{ recent }}</a>
                                    </q-item-section>
                                    <q-item-section align="right" class="hide-delete" style="justify-content: unset;"><a @click.prevent="removeSelectedRecent(recent)"><q-icon name="close" /></a></q-item-section>
                                </q-item>
                            </div>
                        </div>
                    </div>

                    <div >
                        <div class="text-h6" align="left">Trending
                            <span class="text-h6" style="float: right; cursor: pointer;">
                                <a @click="showAllTrending = !showAllTrending" class="search-input-link">Show {{ showAllTrending ? 'less' : 'all' }}</a>
                            </span>
                        </div>
                        <div class="row" v-if="showAllTrending">
                            <div  v-for="(trending, i) in trendings" :key="i" class="trending-container">
                                <span class="trending-piece col-12 col-sm-4">
                                    <a :href="`/#/documentation/search?keyword=${trending.replace(/&/g, '%26')}&type=Items`">{{ trending }}</a>
                                </span>
                            </div>
                        </div>
                        <div class="row" v-else>
                            <div  v-for="(trending, i) in trendings" :key="i" class="trending-container">
                                <span v-if="i < 10" class="trending-piece col-12 col-md">
                                    <a :href="`/#/documentation/search?keyword=${trending.replace(/&/g, '%26')}&type=Items`">{{ trending }}</a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getSearchData, getSearchAutoComplete, getTrendingSearches, postSearch } from '../../references/url';
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
        trendings: [],
        showAllTrending: false,
        recents: [],
        recent_trending: false,
        remove_recent_click: false,
    }),
    created()
    {
        this.searchData();
        this.getSearchAutoComplete();
        this.getTrendingSearches();
        this.getRecentSearches();
    },
    methods:
    {
        async searchData ()
        {
            this.$q.loading.show();

            this.keyword = (this.$route.query.keyword) ? this.$route.query.keyword : this.keyword;
            this.type = (this.$route.query.type) ? this.$route.query.type : this.type;

            this.product_data = await this.$_get(`${getSearchData}?keyword=${this.keyword}&type=${this.type}`);

            this.datas = this.product_data.data.data;

            // save cookie for recent search
            if (this.keyword != '') {
                let searches = (this.$q.cookies.has('recent_search')) ? this.$q.cookies.get('recent_search') : [];

                if (searches.length != 0 && this.keyword != '') {
                    if (!searches.includes(this.keyword.toLowerCase())) {
                        searches.push(this.keyword.toLowerCase());
                    }
                } else {
                    searches.push(this.keyword.toLowerCase());
                }

                let options =
                {
                    expires: 7 // in 1 day
                };

                this.$q.cookies.set('recent_search', searches, options);
            }

            // save cookie for suggested products
            if (this.keyword != '' && this.datas.length != 0) {
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

            this.$emit('success', this.datas);
        },

        async getSearchAutoComplete ()
        {
            let data = await this.$_get(`${getSearchAutoComplete}?type=${this.type}`);
            this.items = data.data.data;
        },

        async getTrendingSearches ()
        {
            let data = await this.$_get(getTrendingSearches);
            this.trendings = data.data.trending;
        },

        getRecentSearches ()
        {
            if (this.$q.cookies.has('recent_search')) {
                let searches = this.$q.cookies.get('recent_search');

                if (searches) {
                    for (let count = (searches.length - 1); count >= 0; count--) {
                        this.recents.push(searches[count]);
                    }
                }
            }
        },

        removeSelectedRecent (recent)
        {
            if (this.$q.cookies.has('recent_search')) {
                let searches = this.$q.cookies.get('recent_search');
                let new_searches = [];

                if (searches) {
                    for (let count = (searches.length - 1); count >= 0; count--) {
                        if (recent !== searches[count]) {
                            new_searches.push(searches[count]);
                        }
                    }
                }

                let options =
                {
                    expires: 7 // in 7 days
                };

                this.$q.cookies.remove('recent_search');
                this.recents = [];
                this.remove_recent_click = true;

                this.$q.cookies.set('recent_search', new_searches, options);

                this.getRecentSearches();
            }
        },

        clearRecents ($event)
        {
            this.recent_trending = true;
            this.$q.cookies.remove('recent_search');
            this.recents = [];
            this.remove_recent_click = true;
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
            if (this.keyword != '') {
                if (this.isAsync) {
                    this.isLoading = true;
                } else {
                    this.filterResults();
                    this.isOpen = true;
                }
            } else {
                this.isOpen = false;
                this.recent_trending = true;
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

                if (!this.remove_recent_click) {
                    this.recent_trending = false;
                }
            }
        },

        filterData (sub_category = '')
        {
            this.isOpen = false;
            this.arrowCounter = -1;

            let field = (this.type === 'Items') ? 'item_name' : 'full_name';
            let filtered = [];

            if (sub_category != '') {
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
            } else {
                for (let count = 0; count < this.datas.length; count++) {
                    if (this.keyword) {
                        if (this.datas[count][field].toLowerCase().includes(this.keyword.toLowerCase())) {
                            filtered.push(this.datas[count]);
                        }
                    } else {
                        filtered.push(this.datas[count]);
                    }
                }
            }

            this.$emit('success', filtered);
        },
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


.bg-dark-grey{
    background-color: #1E1E1E;
}

.bg-dark-violet{
  background-color: #7950C1;
}
.trending-recent-div {
    padding: 0;
    margin: 0;
    border: none;
    background-color: transparent;
    overflow: auto;
}

.trending-piece {
    margin-left: 5px;
    margin-bottom: 2px;
    background: #9A67AC;
    color: #fff;
    padding: 0.35em 0.35em;
    border-radius: 1em ;
    width: 5em;
}

.trending-piece a {
    color: #fff;
    text-decoration: none;
}

.search-input-link {
    font-size: 0.75em;
    color: #9A67AC;
}

.trending-container {
    margin-bottom: 0.7rem;
}

.recent-item-con {
    cursor: pointer;
    font-size: 1rem;
}

.recent-item-con a {
    text-decoration: none;
    margin-left: 0.5rem;
}

.hide-delete {
    visibility: hidden;
}

.recent-item-con:hover .hide-delete {
    visibility: visible;
}

.recent-item-con:hover{
    visibility: visible;
    background-color:#e9ecef;
}
</style>