<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Related Products Form
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div>
        <u-q-related-products></u-q-related-products>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Related Products Form`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQRelatedProducts from '../../components/UQRelatedProducts';

export default
{
    data: () =>
    ({
        code: `<div class="component q-ma-lg">
    <div>
        <u-q-related-products></u-q-related-products>
    </div>
</div>`
    }),
    components: { UQRelatedProducts },
    mounted()
    {
    },
    methods: { }
}
</script>