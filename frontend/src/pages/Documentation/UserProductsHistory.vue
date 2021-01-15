<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
User Products History
===

</q-markdown>
<!-- /markdown -->

<div class="q-my-xl full-width">
    <u-q-user-products-history></u-q-user-products-history>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `User Products History`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQUserProductsHistory from '../../components/UQUserProductsHistory'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-user-products-history></u-q-user-products-history>
    </div>
</div>`
    }),
    components: { UQUserProductsHistory },
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