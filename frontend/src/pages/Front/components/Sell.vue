<template>
  <u-q-post-it></u-q-post-it>
</template>

<script>
import UQPostIt from "../../../../src/components/UQPostIt";
import Sell from "./Sell.css";
import { postItem, postUpload, getConversion, getSellerIdentification, getCategories, getSubCategories } from "../../../references/url";
import moment from "moment";

export default {
components: {
    UQPostIt
  }
};
</script>
