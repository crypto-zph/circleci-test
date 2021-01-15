<template>
  <div class="documentation">
<!-- markdown -->
<q-markdown >
Avatar Creation
===

</q-markdown>
<!-- /markdown -->

    <div class="component q-ma-lg">
      <div class="form-container">
        <u-q-avatar></u-q-avatar>
      </div>
    </div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Avatar Creation`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->
  </div>
</template>

<script>
import UQAvatar from "../../../components/Admin/UQAvatar";

export default {
  data: () => ({
    code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-avatar></u-q-avatar>
    </div>
</div>`,
  }),
  components: { UQAvatar },
  mounted() {},
  methods: {},
};
</script>