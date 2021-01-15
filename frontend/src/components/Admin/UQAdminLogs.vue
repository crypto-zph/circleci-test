<template>
	<div>
		<div class="row">
			<div class="text-bold font-rubik-title text-h5 col-6">
				Admin Logs
			</div>
			<div class="col-6 text-right q-mb-sm">
				<q-btn label="CSV" style="width: 90px; border-radius: 10px; box-shadow: 0px 0px 10px 1px #c7c7c7" flat class="q-mr-md" />
				<q-btn label="PDF" style="width: 90px; border-radius: 10px; box-shadow: 0px 0px 10px 1px #c7c7c7" flat />
			</div>
		</div>
		<q-separator />
		<div>
			<u-q-table
			:tbl_data="logs_tbl.data"
			:tbl_columns="logs_tbl.columns"
			:pgntn_is_show="false"
			:tbl_title="logs_tbl.title">
			<template v-slot:table_rows>
				<!-- {{props.data !== undefined}} -->
				<q-td key="user_name" align="center">Admin</q-td>
				<q-td key="user_ip" align="left">174.77.92.170</q-td>
				<q-td key="time_log" align="left">Friday Nov 13, 2020 6:50 pm</q-td>
				<q-td key="last_name" align="left">Issue_token</q-td>
			</template>
		</u-q-table>
	</div>
</div>
</template>

<script>
	import UQTable from '../TableAndModal/UQTable'
	export default {
		data: () => 
		({
			logs_tbl: {
            title: 'Logs',
            columns: [
                { 
                    name    : 'user_name', 
                    label   : 'USERNAME', 
                    align   : 'left',
                    sortable: true 
                },
                { 
                    name    : 'user_ip', 
                    label   : 'USER IP', 
                    align   : 'left',
                    sortable: true 
                },
                { 
                    name    : 'time_log', 
                    label   : 'TIME', 
                    align   : 'left',
                    sortable: true 
                },
                { 
                    name    : 'last_name', 
                    label   : 'ACTION', 
                    align   : 'left',
                    sortable: true 
                },
            ],
            data: []
        }
		}),
		components: {
			UQTable
		}
	}
</script>