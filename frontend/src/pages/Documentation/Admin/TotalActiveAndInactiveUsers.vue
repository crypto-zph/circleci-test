<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Total Active and Inactive Users
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="">
        <u-q-total-active-and-inactive-users></u-q-total-active-and-inactive-users>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Total Active and Inactive Users`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQTotalActiveAndInactiveUsers from '../../../components/Admin/UQTotalActiveAndInactiveUsers'

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-total-active-and-inactive-users></u-q-total-active-and-inactive-users>
    </div>
</div>`
    }),
    components: { UQTotalActiveAndInactiveUsers },
    mounted()
    {
    },
    methods: { },
}
</script>