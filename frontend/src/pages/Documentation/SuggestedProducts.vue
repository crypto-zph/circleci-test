<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Suggested Products Form
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div>
        <u-q-suggested-products></u-q-suggested-products>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Suggested Products Form`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQSuggestedProducts from '../../components/UQSuggestedProducts';

export default
{
    data: () =>
    ({
        code: `<div class="component q-ma-lg">
    <div>
        <u-q-suggested-products></u-q-suggested-products>
    </div>
</div>`
    }),
    components: { UQSuggestedProducts },
    mounted()
    {
    },
    methods: { }
}
</script>