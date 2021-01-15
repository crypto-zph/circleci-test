<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Image Magnifier
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-image-magnifier></u-q-image-magnifier>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Image Magnifier`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQImageMagnifier from '../../components/UQImageMagnifier'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-image-magnifier></u-q-image-magnifier>
    </div>
</div>`
    }),
    components: { UQImageMagnifier },
    mounted()
    {
    },
    methods: { },
}
</script>
<style scoped>
.form-container {
    width: 550px;
}
</style>