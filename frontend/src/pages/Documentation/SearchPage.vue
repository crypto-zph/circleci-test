<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Search Page Form
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div>
        <u-q-search-page></u-q-search-page>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Search Page Form`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQSearchPage from '../../components/UQSearchPage';

export default
{
    data: () =>
    ({
        code: `<div class="component q-ma-lg">
    <div>
        <u-q-search-page></u-q-search-page>
    </div>
</div>`
    }),
    components: { UQSearchPage },
    mounted()
    {
    },
    methods: { }
}
</script>