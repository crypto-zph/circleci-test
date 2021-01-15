<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Admin Send Reminder
===
</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-send-reminder @success="success()"></u-q-send-reminder>
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
import UQSendReminder from '../../../components/Admin/UQSendReminder.vue'

export default
{
    data:() =>
    ({
        code: 
        `<div class="component q-ma-lg">
            <div class="form-container">
                <u-q-send-reminder @success="success()"></u-q-send-reminder>
            </div>
        </div>`
    }),
    components: { UQSendReminder },
    mounted()
    {
    },
    methods:
    {
        success()
        {
           
        }
    },
}
</script>
