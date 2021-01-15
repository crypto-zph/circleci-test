<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Categories Management
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="">
        <u-q-categories-management></u-q-categories-management>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Categories Management`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQCategoriesManagement from '../../../components/admin/UQCategoriesManagement'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-categories-management></u-q-categories-management>
    </div>
</div>`
    }),
    components: { UQCategoriesManagement },
    mounted()
    {
    },
    methods: { },
}
</script>
