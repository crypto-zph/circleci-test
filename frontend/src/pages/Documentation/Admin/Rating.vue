<template>
  <div class="documentation">
<!-- markdown -->
<q-markdown >
Ratings Table
===

</q-markdown>
<!-- /markdown -->

    <div class="component q-ma-lg">
      <div class="form-container">
        <u-q-ratings></u-q-ratings>
      </div>
    </div>


<!-- markdown -->
<q-markdown >

The __code below__ is for `Ratings Table`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->
  </div>
</template>

<script>
import UQRatings from "../../../components/Admin/UQRatings";

export default {
  data: () => ({
    code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-avatar></u-q-avatar>
    </div>
</div>`,
  }),
  components: { UQRatings },
  mounted() {},
  methods: {},
};
</script>