<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Escrowed Products
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-escrowed></u-q-escrowed>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Escrowed Products`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQEscrowed from '../../components/UQEscrowed'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-escrowed></u-q-escrowed>
    </div>
</div>`
    }),
    components: { UQEscrowed },
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