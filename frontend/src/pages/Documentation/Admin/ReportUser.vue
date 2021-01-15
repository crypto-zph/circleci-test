<template>
  <div class="documentation">
<!-- markdown -->
<q-markdown >
Report User Table
===

</q-markdown>
<!-- /markdown -->

    <div class="component q-ma-lg">
      <div class="form-container">
        <u-q-report-user></u-q-report-user>
      </div>
    </div>


<!-- markdown -->
<q-markdown >

The __code below__ is for `Report User Table`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->
  </div>
</template>

<script>
import UQReportUser from "../../../components/Admin/UQReportUser";

export default {
  data: () => ({
    code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-report-user></u-q-report-user>
    </div>
</div>`,
  }),
  components: { UQReportUser },
  mounted() {},
  methods: {},
};
</script>