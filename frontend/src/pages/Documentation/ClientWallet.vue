<template>
<div>

<!-- markdown -->
<q-markdown >
Client Baristocrat Wallet
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
   <div>
      <u-q-client-wallet></u-q-client-wallet>
   </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Client Baristocrat Wallet`

``` html
{{ code }}
```
</q-markdown>
<!-- /markdown -->

</div>
</template>

<script>
import UQClientWallet from '../../components/Client/Wallet/UQClientWallet';

export default
{
   data:() =>
   ({
      code: `<div class="component q-ma-lg">
   <div>
      <u-q-client-wallet></u-q-client-wallet>
   </div>
</div>`
   }),
   components: { UQClientWallet },
   mounted()
   {
   },
   methods: { },
}
</script>