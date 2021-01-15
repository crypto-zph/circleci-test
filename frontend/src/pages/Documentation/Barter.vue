<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Barter
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="">
        <u-q-barter></u-q-barter>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Barter`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQBarter from '../../components/UQBarter'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-barter></u-q-barter>
    </div>
</div>`
    }),
    components: { UQBarter },
    mounted()
    {
    },
    methods: { },
}
</script>