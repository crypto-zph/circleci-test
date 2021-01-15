<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Categories
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="">
        <u-q-categories></u-q-categories>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Categories`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQCategories from '../../components/UQCategories'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-categories></u-q-categories>
    </div>
</div>`
    }),
    components: { UQCategories },
    mounted()
    {
    },
    methods: { },
}
</script>