<template>
	<div>
		<div class="component q-ma-lg" :class="!$q.dark.isActive? 'text-black':'bg-black'" style="border-radius: 10px">
			<u-q-admin-logs @success="success()"></u-q-admin-logs>
		</div>
	</div>
</template>

<script>
	import UQAdminLogs from '../../components/Admin/UQAdminLogs'
	export default {
		name: "AdminLogs",
		components: {
			UQAdminLogs
		},
		methods:
		{
			success()
			{
				this.$q.dialog({ title: `Registration  Successful!`, message:  'The account has been succesfully updated!' });
			}
		},
	}
</script>