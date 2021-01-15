<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Announcement Form
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div>
        <u-q-announcement></u-q-announcement>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Announcement Form`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQAnnouncement from '../../components/Admin/UQAnnouncement';

export default
{
    data: () =>
    ({
        code: `<div class="component q-ma-lg">
    <div>
        <u-q-announcement></u-q-announcement>
    </div>
</div>`
    }),
    components: { UQAnnouncement },
    mounted()
    {
    },
    methods: { }
}
</script>