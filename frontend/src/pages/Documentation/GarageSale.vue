<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Garage Sale Form
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div>
        <u-q-garage-sale></u-q-garage-sale>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Garage Sale Form`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQGarageSale from '../../components/UQGarageSale';

export default
{
    data: () =>
    ({
        code: `<div class="component q-ma-lg">
    <div>
        <u-q-garage-sale></u-q-garage-sale>
    </div>
</div>`
    }),
    components: { UQGarageSale },
    mounted()
    {
    },
    methods: { }
}
</script>