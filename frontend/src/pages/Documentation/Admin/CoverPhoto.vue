<template>
  <div class="documentation">
<!-- markdown -->
<q-markdown >
Cover Photo Creation
===

</q-markdown>
<!-- /markdown -->

    <div class="component q-ma-lg">
      <div class="form-container">
        <u-q-cover-photo></u-q-cover-photo>
      </div>
    </div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Cover Photo Creation`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->
  </div>
</template>

<script>
import UQCoverPhoto from "../../../components/Admin/UQCoverPhoto";

export default {
  data: () => ({
    code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-cover-photo></u-q-cover-photo>
    </div>
</div>`,
  }),
  components: { UQCoverPhoto },
  mounted() {},
  methods: {},
};
</script>