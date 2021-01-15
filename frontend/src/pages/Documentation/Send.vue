<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Send
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
   <div class="form-container">
      <u-q-send></u-q-send>
   </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Send`

``` html
{{ code }}
```
</q-markdown>
<!-- /markdown -->

</div>
</template>

<script>
import UQSend from '../../components/wallet/UQSend';

export default
{
   data:() =>
   ({
      code: `<div class="component q-ma-lg">
   <div class="form-container">
      <u-q-send></u-q-send>
   </div>
</div>`
   }),
   components: { UQSend },
   mounted()
   {
   },
   methods: { },
}
</script>