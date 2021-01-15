<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Receive
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
   <div class="form-container">
      <u-q-receive></u-q-receive>
   </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Receive`

``` html
{{ code }}
```
</q-markdown>
<!-- /markdown -->

</div>
</template>

<script>
import UQReceive from '../../components/wallet/UQReceive';

export default
{
   data:() =>
   ({
      code: `<div class="component q-ma-lg">
   <div class="form-container">
      <u-q-receive></u-q-receive>
   </div>
</div>`
   }),
   components: { UQReceive },
   mounted()
   {
   },
   methods: { },
}
</script>