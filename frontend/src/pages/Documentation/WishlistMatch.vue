<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Wishlist Match Form
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div>
        <u-q-wishlist-match></u-q-wishlist-match>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Wishlist Match Form`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQWishlistMatch from '../../components/UQWishlistMatch';

export default
{
    data: () =>
    ({
        code: `<div class="component q-ma-lg">
    <div>
        <u-q-wishlist-match></u-q-wishlist-match>
    </div>
</div>`
    }),
    components: { UQWishlistMatch },
    mounted()
    {
    },
    methods: { }
}
</script>