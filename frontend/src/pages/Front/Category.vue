<template>
  <div>
    <u-q-categories></u-q-categories>
  </div>
</template>

<script>
import Category from "./Category.css";
import category from "../../references/category";
import UQCategories from "../../components/UQCategories"

export default {
  data: () => ({ toolbar: false, category: [] }),
  components: {UQCategories},
  mounted() {
    this.category = category;
    // console.log(this.category);
  },
  methods: {},
};
</script>
<style>
</style>