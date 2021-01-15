<template>
  <div>
    <div>
      <div>
           <u-q-messages></u-q-messages>
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
import UQMessages from "../../../components/Account/UQMessages"

export default {
  data: () => ({
    code: `    
    <div class="component q-ma-lg">
      <div class="form-container">
           <u-q-messages></u-q-messages>
      </div>
    </div>`,
  }),
  components: { UQMessages },
  mounted() {},
  methods: {},
};
</script>