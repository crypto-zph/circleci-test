<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Admin Product Management Form
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div>
        <u-q-admin-product-management></u-q-admin-product-management>
    </div>
</div>

<!-- markdown -->
<q-markdown>

The __code below__ is for `Admin Product Management Form`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQAdminProductManagement from '../../components/UQAdminProductManagement';

export default
{
    data: () =>
    ({
       code: `<div class="component q-ma-lg">
    <div>
        <u-q-admin-product-management></u-q-admin-product-management>
    </div>
</div>`
    }),
    components: { UQAdminProductManagement },
    methods: { }
}
</script>