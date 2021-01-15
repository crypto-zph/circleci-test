<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Total Cancel
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="">
        <u-q-total-cancel></u-q-total-cancel>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Total Cancel`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQTotalCancel from '../../../components/Admin/UQTotalCancel'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-total-cancel></u-q-total-cancel>
    </div>
</div>`
    }),
    components: { UQTotalCancel },
    mounted()
    {
    },
    methods: { },
}
</script>