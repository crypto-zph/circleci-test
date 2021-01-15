<template>
  <div class="documentation">
<!-- markdown -->
<q-markdown >
Change Password
===

</q-markdown>
<!-- /markdown -->
    <div class="component q-ma-lg">
      <div class="form-container">
           <u-q-change-password></u-q-change-password>
      </div>
    </div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Profile`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->
  </div>
</template>

<script>
import UQChangePassword from "../../../components/Account/UQChangePassword"

export default {
  data: () => ({
    code: `    <div class="component q-ma-lg">
      <div class="form-container">
           <u-q-change-password></u-q-change-password>
      </div>
    </div>`,
  }),
  components: { UQChangePassword },
  mounted() {},
  methods: {},
};
</script>