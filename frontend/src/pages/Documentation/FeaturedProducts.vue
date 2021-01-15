<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Featured Products Form
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div>
        <u-q-featured-products></u-q-featured-products>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Featured Products Form`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQFeaturedProducts from '../../components/UQFeaturedProducts';

export default
{
    data: () =>
    ({
        code: `<div class="component q-ma-lg">
    <div>
        <u-q-featured-products></u-q-featured-products>
    </div>
</div>`
    }),
    components: { UQFeaturedProducts },
    mounted()
    {
    },
    methods: { }
}
</script>