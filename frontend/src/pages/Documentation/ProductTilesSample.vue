<template>
<div class="">

<!-- markdown -->
<q-markdown >
Product Tiles
===

</q-markdown>
<!-- /markdown -->

<div class="">
    <div class="">
        <u-q-product-tiles :tile_details="tile_details"></u-q-product-tiles>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Product Tiles`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
// import UQProductTiles from '../../components/Global/UQProductTiles';
import UQProductTiles from '../../components/UQProductTilesV1';
import tile_details from '../../references/tile_details';

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-product-tiles></u-q-product-tiles>
    </div>
</div>`,
        tile_details: tile_details,
    }),
    components: { UQProductTiles },
    mounted()
    {
    },
    methods: { },
}
</script>