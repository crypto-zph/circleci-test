<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Follow Form
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div>
        <u-q-follow></u-q-follow>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Follow Form`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQFollow from '../../components/UQFollow';

export default
{
    data: () =>
    ({
        code: `<div class="component q-ma-lg">
    <div>
        <u-q-follow></u-q-follow>
    </div>
</div>`
    }),
    components: { UQFollow },
    mounted()
    {
    },
    methods: { }
}
</script>