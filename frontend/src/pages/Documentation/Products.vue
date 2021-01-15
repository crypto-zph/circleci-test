<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Products
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="">
        <u-q-products></u-q-products>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Products`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQProducts from '../../components/UQProducts'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-products></u-q-products>
    </div>
</div>`
    }),
    components: { UQProducts },
    mounted()
    {
    },
    methods: { },
}
</script>