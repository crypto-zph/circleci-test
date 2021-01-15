<template>
    <div>
	    <!-- content -->
	    <div class='content text-left'>
			<div class="q-my-sm">
				<label class="bold font_size q-mr-sm">Token Name:</label>
				<span class="font_size">{{ res.currency_name }}</span>
			</div>
			<div class="q-my-sm">
				<label class="bold font_size q-mr-sm">Token Symbol:</label>
				<span class="font_size">{{ res.currency_abbreviation }}</span>
			</div>
			<div class="q-my-sm">
				<label class="bold font_size q-mr-sm">Total Supply:</label>
				<span class="font_size">{{ res.total_supply | toClientAmount(res.decimal_places) }}</span>
				<!-- {maximumFractionDigits: 2, minimumFractionDigits: 2 } -->
			</div>
			<div class="q-my-sm">
				<label class="bold font_size q-mr-sm">Remaining Supply:</label>
				<span class="font_size">{{ res.remaining_supply | toClientAmount(res.decimal_places) }}</span>
			</div>
			<div class="q-my-sm">
				<label class="bold font_size q-mr-sm">Circulating Supply:</label>
				<span class="font_size">{{ res.circulating_supply | toClientAmount(res.decimal_places) }}</span>
			</div>
			<div class="q-my-sm">
				<label class="bold font_size q-mr-sm">Price:</label>
				<span class="font_size">{{ res.price }} USD</span>
			</div>
			<div class="q-my-sm">
				<label class="bold font_size q-mr-sm">Marketcap:</label>
				<span class="font_size">{{ (res.market_cap / 10 ** 2) | toClientAmount(2)}} USD</span>
			</div>
			<!-- <div class="q-my-sm">
				<label class="bold font_size q-mr-sm">Date Created:</label>
				<span class="font_size">{{ new Date(res.date_created).toLocaleDateString("en-US") }}</span>
			</div> -->
	    </div>
    </div>
</template>

<script>
import { postBRTdetails } from '../../references/url';

export default
{
    data:() => (
    {
		res: {},
    }),
    mounted()
    {
        this.getBaristocratTokenDetails();
	},
	
    methods:
    {
		async getBaristocratTokenDetails()
		{
			let res  = await this.$_post(postBRTdetails);
			this.res = res.data;
		}
	},
	
	filters:
	{
		toClientAmount(amount, decimals)
		{
			let amount_str = '';

			if(amount == undefined || amount == null || amount == '')
			{
				amount_str = '';
			}
			else
			{
				amount_str = amount.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
			}

			return amount_str;
		}
	}

}
</script>

<style>
	.bold{
		font-weight: bold;
	}
	.font_size{
		font-size: 17px;
	}
</style>