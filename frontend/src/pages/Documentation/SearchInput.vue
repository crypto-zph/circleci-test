<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Search Input Form
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div>
        <u-q-search-input></u-q-search-input>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Search Input Form`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQSearchInput from '../../components/global/UQSearchInput';

export default
{
    data: () =>
    ({
        code: `<div class="component q-ma-lg">
    <div>
        <u-q-search-input></u-q-search-input>
    </div>
</div>`
    }),
    components: { UQSearchInput },
    mounted()
    {
    },
    methods: { }
}
</script>