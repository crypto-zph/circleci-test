<template>
<div class="">

<!-- markdown -->
<q-markdown >
User Management
===
</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-admin-users @success="success()"></u-q-admin-users>
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
import UQAdminUsers from '../../components/admin/UQAdminUsers'

export default
{
    data:() =>
    ({
        code: 
        `<div class="component q-ma-lg">
            <div class="form-container">
            <u-q-admin-users @success="success()"></u-q-admin-users>
            </div>
        </div>`
    }),
    components: { UQAdminUsers },
    mounted()
    {
    },
    methods:
    {
        success()
        {
            this.$q.dialog({ title: `Registration  Successful!`, message:  'The account has been succesfully updated!' });
        }
    },
}
</script>
