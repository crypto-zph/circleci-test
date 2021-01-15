<template>
  <div class="documentation">
<!-- markdown -->
<q-markdown >
Sellers' Detail
===

</q-markdown>
<!-- /markdown -->

    <div class="component q-ma-lg">
      <div class="form-container">
        <u-q-user-detail></u-q-user-detail>
      </div>
    </div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Seller's Detail`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->
  </div>
</template>

<script>
import UQUserDetail from "../../../components/Account/UQUserDetail";

export default {
  data: () => ({
    code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-users></u-q-users>
    </div>
</div>`,
  }),
  components: { UQUserDetail },
  mounted() {},
  methods: {},
};
</script>