<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Subcategories
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="">
        <u-q-subcategories></u-q-subcategories>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Subcategories`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQSubcategories from '../../components/UQSubcategories'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-subcategories></u-q-subcategories>
    </div>
</div>`
    }),
    components: { UQSubcategories },
    mounted()
    {
    },
    methods: { },
}
</script>