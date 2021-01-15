<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Flash Deal Form
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div>
        <u-q-flash-deal></u-q-flash-deal>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Flash Deal Form`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQFlashDeal from '../../components/UQFlashDeal';

export default
{
    data: () =>
    ({
        code: `<div class="component q-ma-lg">
    <div>
        <u-q-flash-deal></u-q-flash-deal>
    </div>
</div>`
    }),
    components: { UQFlashDeal },
    mounted()
    {
    },
    methods: { }
}
</script>