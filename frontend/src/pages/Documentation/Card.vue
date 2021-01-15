<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Card
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-card></u-q-card>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Card`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQCard from '../../components/global/UQCard'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-card></u-q-card>
    </div>
</div>`
    }),
    components: { UQCard },
    mounted()
    {
    },
    methods: { },
}
</script>