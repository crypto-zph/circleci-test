import { postMainMounted , getAdminUsers, isUserAuthenticated, isAdminUserAuthenticated, postAdminMounted, getConversionRates } from '../references/url';

export default
{
    data: () =>
    ({
        $mixin_res: null, // object
        $admin_res: null, // object
        $user_info: {},
    }),
    computed:
    {
        $static_user_info()
        {
            return this.$store.state.user.user_info;
        },
        $is_rate_open()
        {
            return this.$store.state.user.is_rate_open;
        }
    },
    created()
    {
    },
    mounted()
    {
    },
    methods:
    {
        async $_post(url, data)
        {
            return await this.$axios.post(url, data).catch((e) =>
            {
                this.$q.dialog({ title: `Something's not quite right`, message: e.response.data.message });
                if(e.response.data.message === 'Please login to continue.')
                {
                    this.$router.push({name: 'documentation_login'});
                }
            });
        },
        async $_get(url, data)
        {
            return await this.$axios.get(url, data).catch((e) =>
            {
                this.$q.dialog({ title: `Something's not quite right`, message: e.response.data.message });
            });
        },
        async $_put(url, data = {}) {
            data.user_info = this.$user_info;
            let res = null;

            await this.$axios.put(url, data, {
                headers: {
                    'authorization': this.$token,
                }
            }).then(async (r) => {
                res = await r;
            }).catch(async (e) => {

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: e.response.data.message,
                })


                res = e
            });
            return res;
        },
        async $_delete(url, data)
        {
            return await this.$axios.delete(url, {data}).catch((e) =>
            {
                this.$q.dialog({ title: `Something's not quite right`, message: e.response.data.message });
            });
        },
        $_formatDate(date)
        {
            alert("date" + date);
        },
        async $_locateUser() {
            let x = await this.$_get('http://ip-api.com/json');
            return x;
        },

        async $_mainMounted() // get client user infos
        {
            let res = await this.$_post(postMainMounted);
            this.$mixin_res = res.data;
        },

        async $_adminMainMounted() // get admin user infos
        {
            let res = await this.$_post(postAdminMounted);
            this.$admin_res = res.data;
        },

        async $_getUserCountryInfo(country) {
            return this.$_get(`https://restcountries.eu/rest/v2/name/${country}`);
        },

        async $_admin_info()
        {
            let query_result = await this.$_post(getAdminUsers);
            this.mixin_res = query_result;
        },

        async $_isUserAuthenticated()
        {
            let user = await this.$_get(isUserAuthenticated);

            return user;
        },

        async $_isAdminUserAuthenticated()
        {
            let user = await this.$_get(isAdminUserAuthenticated);

            return user;
        },

        async pad (number)
        {
            return (number < 10 ? '0' : '') + number;
        },

        async $_getConversionRates()
        {
            let conversion_rates = await this.$_post(getConversionRates);
            console.log("conversion_rates");
            console.log(conversion_rates);
            return conversion_rates;
        },
    },

    filters: {
        toUpperCase(val)
        {
            return val.toUpperCase();
        },

        $_toClientAmount(amount, decimals)
        {
            let value = amount/10 ** decimals;
            return value.toLocaleString('en-US', { maximumFractionDigits: decimals });
        },

        $_toClientFiatAmount(amount, decimals)
        {
            let value = amount/10 ** decimals;
            return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        },

        $_toSalePrice(price, is_garage_sale, is_flash_deal, garage_sale_percentage, flash_deal_percentage)
        {
            price /= 1e9;
            if(is_garage_sale)
            {
                return Number.parseFloat(price - (price * garage_sale_percentage)).toFixed(2);
            }
            if(is_flash_deal)
            {
                return Number.parseFloat(price - (price * flash_deal_percentage / 100)).toFixed(2);
            }
            else
            {
                return price;
            }
        }
    },
}
