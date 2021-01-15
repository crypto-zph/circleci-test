<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Admin Item Management
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-admin-items></u-q-admin-items>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Admin Item Management`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQAdminItems from '../../components/UQAdminItems'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-admin-items></u-q-admin-items>
    </div>
</div>`
    }),
    components: { UQAdminItems },
    mounted()
    {
    },
    methods: { },
}
</script>