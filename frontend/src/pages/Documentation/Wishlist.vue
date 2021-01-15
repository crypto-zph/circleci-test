<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Wishlist Form
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div>
        <u-q-wishlist></u-q-wishlist>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Wishlist Form`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQWishlist from '../../components/UQWishlist';

export default
{
    data: () =>
    ({
        code: `<div class="component q-ma-lg">
    <div>
        <u-q-wishlist></u-q-wishlist>
    </div>
</div>`
    }),
    components: { UQWishlist },
    mounted()
    {
    },
    methods: { }
}
</script>