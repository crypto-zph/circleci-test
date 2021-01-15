<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Over All Total BRT
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="">
        <u-q-over-all-total></u-q-over-all-total>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Over All Total BRT`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQOverAllTotal from '../../../components/Admin/UQOverAllTotal'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-over-all-total></u-q-over-all-total>
    </div>
</div>`
    }),
    components: { UQOverAllTotal },
    mounted()
    {
    },
    methods: { },
}
</script>