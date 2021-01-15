<template>

<div class="documentation">

<!-- markdown -->
<q-markdown >
KYC Form
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-kyc></u-q-kyc>
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
import UQKyc    from "../../components/UQKyc";
export default {
    components: {
        UQKyc
    },
    data: () => ({
        code: `<template>

<div class="documentation">

<!-- markdown -->
<q-markdown >
KYC Form
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-kyc></u-q-kyc>
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