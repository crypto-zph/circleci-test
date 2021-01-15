<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Post It Form
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-post-it></u-q-post-it>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Post It Form`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQPostIt from '../../components/UQPostIt'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-post-it></u-q-post-it>
    </div>
</div>`
    }),
    components: { UQPostIt },
    mounted()
    {
    },
    methods: { },
}
</script>