<template>
  <div class="documentation">
<!-- markdown -->
<q-markdown >
Reviews Table
===

</q-markdown>
<!-- /markdown -->

    <div class="component q-ma-lg">
      <div class="form-container">
        <u-q-reviews></u-q-reviews>
      </div>
    </div>


<!-- markdown -->
<q-markdown >

The __code below__ is for `Reviews Table`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->
  </div>
</template>

<script>
import UQReviews from "../../../components/Admin/UQReviews";

export default {
  data: () => ({
    code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-reviews></u-q-reviews>
    </div>
</div>`,
  }),
  components: { UQReviews },
  mounted() {},
  methods: {},
};
</script>