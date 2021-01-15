<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Pending Products
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-pending></u-q-pending>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Pending Products`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQPending from '../../components/UQPending'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-pending></u-q-pending>
    </div>
</div>`
    }),
    components: { UQPending },
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