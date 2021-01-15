<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Admin Announcement
===
</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="">
        <u-q-admin-announcement @success="success()"></u-q-admin-announcement>
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
import UQAdminAnnouncement from '../../components/Admin/UQAdminAnnouncement'

export default
{
    data:() =>
    ({
        code: 
        `<div class="component q-ma-lg">
            <div class="">
                <u-q-admin-announcement @success="success()"></u-q-admin-announcement>
            </div>
        </div>`
    }),
    components: { UQAdminAnnouncement },
    mounted()
    {
    },
    methods:
    {
        success()
        {
            this.$q.dialog({ title: `Successful!`, message:  'announcementa!' });
        }
    },
}
</script>