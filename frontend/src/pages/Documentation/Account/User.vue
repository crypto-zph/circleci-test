<template>
  <div class="documentation">
<!-- markdown -->
<q-markdown >
SELLERS
===

</q-markdown>
<!-- /markdown -->

    <div class="component q-ma-lg">
      <div class="form-container">
        <u-q-users></u-q-users>
      </div>
    </div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Sellers`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->
  </div>
</template>

<script>
import UQUsers from "../../../components/Account/UQUsers";

export default {
  data: () => ({
    code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-users></u-q-users>
    </div>
</div>`,
  }),
  components: { UQUsers },
  mounted() {},
  methods: {},
};
</script>