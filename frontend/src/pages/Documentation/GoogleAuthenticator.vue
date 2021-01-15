<template>
<div class="documentation">

<q-markdown >
Two-factor Authentication (2FA)
===
</q-markdown>

<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-google-authenticator></u-q-google-authenticator>
    </div>
</div>

<q-markdown >
The __code below__ is for `Google Authenticator`

``` html
{{ code }}
```
</q-markdown>

</div>
</template>

<script>
import UQGoogleAuthenticator from '../../components/Client/Wallet/UQGoogleAuthenticator';

export default
{
    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-google-authenticator></u-q-google-authenticator>
    </div>
</div>`
    }),
    components: { UQGoogleAuthenticator },
    mounted()
    {
    },
    methods: { },
}
</script>