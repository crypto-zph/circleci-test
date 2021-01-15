<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Reset Password Success Form
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-reset-pass-success></u-q-reset-pass-success>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Reset Password Success Form`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQResetPassSuccess from '../../components/UQResetPassSuccess';

export default
{
    data: () =>
    ({
        code:  `<div class="component q-ma-lg">
    <div>
        <u-q-reset-pass-success></u-q-reset-pass-success>
    </div>
</div>`
    }),
    components: { UQResetPassSuccess },
    mounted ()
    {
    },
    methods: { }
}
</script>