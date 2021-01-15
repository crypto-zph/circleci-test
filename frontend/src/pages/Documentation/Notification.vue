<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
User Notification
===
</q-markdown>
<!-- /markdown -->

<div class="">
    <div class="">
        <u-q-notification @success="success()"></u-q-notification>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code above__ can be `bla blab abla`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQNotification from '../../components/Account/UQNotification'

export default
{
    data:() =>
    ({
        code: 
        `<div class="component q-ma-lg">
            <div class="">
                <u-q-notification @success="success()"></u-q-notification>
            </div>
        </div>`
    }),
    components: { UQNotification },
    mounted()
    {
    },
    methods:
    {
        success()
        {
            this.$q.dialog({ title: ``, message:  '' });
        }
    },
}
</script>