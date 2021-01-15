<template>
        <div>
            <u-q-search class="search__input__class_full" @success="fromSearch" @changeType="fromSearchType" ></u-q-search>
        </div>
    </template>
</template>



<script>
import UQSearch from "../../components/global/UQSearchInput"
import UQProductTiles from '../../components/global/UQProductTiles';
import UQUserTiles from '../../components/global/UQUserTiles';
export default {
    components: {
    UQSearch,
    UQProductTiles,
    UQUserTiles,
  },
  methods: {
      fromSearch(data)
    {
     this.data = data;
    },

    fromSearchType(type)
    {
      this.type = type;
      console.log(type);
    },
    submit() {
      this.$router.push("/catalog/"+this.search);
    },
  }
}
</script>