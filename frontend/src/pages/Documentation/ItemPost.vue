<template>

<div class="documentation">

<!-- markdown -->
<q-markdown >
Item Post
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-item-post></u-q-item-post>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Item Post`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQItemPost    from "../../components/UQItemPost";
export default {
    components: {
        UQItemPost
    },
    data: () => ({
        code: `<template>

<div class="documentation">

<!-- markdown -->
<q-markdown >
Item Post
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-item-post></u-q-item-post>
    </div>
</div>

<!-- markdown -->
<q-markdown >



</q-markdown>
<!-- /markdown -->


</div>
</template>
`
    })
}
</script>

<style>

</style>