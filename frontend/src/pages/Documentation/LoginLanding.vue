<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Login Landing Form
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div>
        <u-q-login-landing></u-q-login-landing>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Login Landing Form`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQLoginLanding from '../../components/UQLoginLanding';

export default
{
    data: () =>
    ({
        code: `<div class="component q-ma-lg">
    <div>
        <u-q-login-landing></u-q-login-landing>
    </div>
</div>`
    }),
    components: { UQLoginLanding },
    mounted()
    {
    },
    methods: { }
}
</script>