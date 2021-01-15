<template>
<div>

<!-- markdown -->
<q-markdown >
Baristocrat Mother Wallet
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
   <div>
      <u-q-mother-wallet></u-q-mother-wallet>
   </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Mother Wallet`

``` html
{{ code }}
```
</q-markdown>
<!-- /markdown -->

</div>
</template>

<script>
import UQMotherWallet from '../../../components/Admin/Wallet/UQMotherWallet';

export default
{
   data:() =>
   ({
      code: `<div class="component q-ma-lg">
   <div>
      <u-q-mother-wallet></u-q-mother-wallet>
   </div>
</div>`
   }),
   components: { UQMotherWallet },
   mounted()
   {
   },
   methods: { },
}
</script>