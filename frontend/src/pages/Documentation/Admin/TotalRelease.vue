<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Total Release
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="">
        <u-q-total-release></u-q-total-release>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Total Release`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQTotalRelease from '../../../components/Admin/UQTotalRelease'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-total-release></u-q-total-release>
    </div>
</div>`
    }),
    components: { UQTotalRelease },
    mounted()
    {
    },
    methods: { },
}
</script>