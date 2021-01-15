<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Posted Items
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <u-q-items></u-q-items>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Items`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQItems from '../../components/UQItems'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-items></u-q-items>
    </div>
</div>`
    }),
    components: { UQItems },
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