<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
History
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
   <div class="form-container">
      <u-q-history></u-q-history>
   </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `History`

``` html
{{ code }}
```
</q-markdown>
<!-- /markdown -->

</div>
</template>

<script>
import UQHistory from '../../components/wallet/UQHistory';

export default
{
   data:() =>
   ({
      code: `<div class="component q-ma-lg">
   <div class="form-container">
      <u-q-history></u-q-history>
   </div>
</div>`
   }),
   components: { UQHistory },
   mounted()
   {
   },
   methods: { },
}
</script>