<template>
<div>

<!-- markdown -->
<q-markdown >
User Masterlist
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
   <div>
      <u-q-user-masterlist></u-q-user-masterlist>
   </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `User Masterlist`

``` html
{{ code }}
```
</q-markdown>
<!-- /markdown -->

</div>
</template>

<script>
import UQUserMasterlist from '../../components/Admin/UQUserMasterlist';

export default
{
   data:() =>
   ({
      code: `<div class="component q-ma-lg">
   <div>
      <u-q-user-masterlist></u-q-user-masterlist>
   </div>
</div>`
   }),
   components: { UQUserMasterlist },
   mounted()
   {
   },
   methods: { },
}
</script>