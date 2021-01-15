<template>

<div class="documentation">

<!-- markdown -->
<q-markdown >
KYC Submits
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-kyc-submits></u-q-kyc-submits>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `KYC Form`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQKycSubmits    from "../../components/UQKycSubmits";
export default {
    components: {
        UQKycSubmits
    },
    data: () => ({
        code: `<template>

<div class="documentation">

<!-- markdown -->
<q-markdown >
KYC Submits
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-kyc-submits></u-q-kyc-submits>
    </div>
</div>

<!-- markdown -->
<q-markdown >
</q-markdown>
<!-- /markdown -->


</div>
</template>`
    })
}
</script>

<style>

</style>