<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Add To Cart
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-add-to-cart></u-q-add-to-cart>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Add To Cart`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQAddToCart from '../../components/UQAddToCart'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-add-to-cart></u-q-add-to-cart>
    </div>
</div>`
    }),
    components: { UQAddToCart },
    mounted()
    {
    },
    methods: { },
}
</script>