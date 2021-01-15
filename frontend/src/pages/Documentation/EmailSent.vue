<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Email Sent Form
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-email-sent></u-q-email-sent>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Email Sent Form`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQEmailSent from '../../components/UQEmailSent';

export default
{
    data: () =>
    ({
        code:  `<div class="component q-ma-lg">
    <div>
        <u-q-email-sent></u-q-email-sent>
    </div>
</div>`
    }),
    components: { UQEmailSent },
    mounted ()
    {
    },
    methods: { }
}
</script>