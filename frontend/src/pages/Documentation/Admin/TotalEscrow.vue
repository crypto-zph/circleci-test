<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Total Escrow
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="">
        <u-q-total-escrow></u-q-total-escrow>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Total Escrow`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQTotalEscrow from '../../../components/Admin/UQTotalEscrow'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-total-escrow></u-q-total-escrow>
    </div>
</div>`
    }),
    components: { UQTotalEscrow },
    mounted()
    {
    },
    methods: { },
}
</script>