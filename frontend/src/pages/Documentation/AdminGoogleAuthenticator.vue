<template>
<div class="documentation">

<q-markdown >
Admin Two-factor Authentication (2FA)
===
</q-markdown>

<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-admin-google-authenticator></u-q-admin-google-authenticator>
    </div>
</div>

<q-markdown >
The __code below__ is for `Admin Google Authenticator`

``` html
{{ code }}
```
</q-markdown>

</div>
</template>

<script>
import UQAdminGoogleAuthenticator from '../../components/Admin/Wallet/UQAdminGoogleAuthenticator';

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-admin-google-authenticator></u-q-admin-google-authenticator>
    </div>
</div>`
    }),
    components: { UQAdminGoogleAuthenticator },
    mounted()
    {
    },
    methods: { },
}
</script>