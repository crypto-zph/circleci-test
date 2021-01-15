<template>
  <div class="documentation">
<!-- markdown -->
<q-markdown >
Profile
===

</q-markdown>
<!-- /markdown -->
    <div class="component q-ma-lg">
      <div class="form-container">
        <u-q-profile></u-q-profile>
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
// import UQProfile from "../../../components/Account/UQProfile2";
import UQProfile from "../../../components/Account/UQProfile";

export default {
  data: () => ({
    code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-profile></u-q-profile>
    </div>
</div>`,
  }),
  components: { UQProfile },
  mounted() {},
  methods: {},
};
</script>