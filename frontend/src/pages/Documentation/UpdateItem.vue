<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Update Item Page
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-update-item></u-q-update-item>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Update Item Page`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQUpdateItem from '../../components/UQUpdateItem'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-update-item></u-q-update-item>
    </div>
</div>`
    }),
    components: { UQUpdateItem },
    mounted()
    {
    },
    methods: { },
}
</script>