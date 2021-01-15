<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Product Filters
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
  <div class="form-container">
    <u-q-item-filters></u-q-item-filters>
  </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Admin Login Form`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQItemFilters from "../../components/UQItemFilters";
export default {
    components: {
      UQItemFilters
    },
    data: () => ({
      code: `<div class="component q-ma-lg">
  <div class="form-container">
    <u-q-product-filters></u-q-product-filters>
  </div>
</div>`
    }),
    methods: {

    }
}
</script>

<style>

</style>