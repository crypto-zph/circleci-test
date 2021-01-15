<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Baristocrat Token Details
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
   <div class="form-container">
      <u-q-baristocrat-token></u-q-baristocrat-token>
   </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Baristocrat Token`

``` html
{{ code }}
```
</q-markdown>
<!-- /markdown -->

</div>
</template>

<script>
import UQBaristocratToken from '../../components/wallet/UQBaristocratToken';

export default
{
   data:() =>
   ({
      code: `<div class="component q-ma-lg">
   <div class="form-container">
      <u-q-baristocrat-token></u-q-baristocrat-token>
   </div>
</div>`
   }),
   components: { UQBaristocratToken },
   mounted()
   {
   },
   methods: { },
}
</script>