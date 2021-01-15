<template>
<div>

<!-- markdown -->
<q-markdown >
Activity Logs
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
   <div>
      <u-q-admin-activity-logs></u-q-admin-activity-logs>
   </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Activity Logs`

``` html
{{ code }}
```
</q-markdown>
<!-- /markdown -->

</div>
</template>

<script>
import UQAdminActivityLogs from '../../../components/Admin/UQAdminActivityLogs';

export default
{
   components: { UQAdminActivityLogs },
   data:() =>
   ({
      code: `<div class="component q-ma-lg">
   <div>
      <u-q-admin-activity-logs></u-q-admin-activity-logs>
   </div>
</div>`
   }),
   mounted()
   {
   },
   methods: { },
}
</script>