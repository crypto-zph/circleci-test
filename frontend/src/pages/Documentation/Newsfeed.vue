<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Newsfeed
===

</q-markdown>
<!-- /markdown -->

<div class="component q-ma-lg">
    <u-q-news-feed></u-q-news-feed>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Newsfeed`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQNewsFeed from '../../components/UQNewsFeed'

export default
{
    components: { UQNewsFeed },

    data:() =>
    ({
        code: `<div class="component q-ma-lg">
    <div class="form-container">
        <u-q-news-feed></u-q-news-feed>
    </div>
</div>`
    }),
    mounted()
    {
    },
    methods: { },
}
</script>
<style scoped>
.form-container {
    width: 550px;
}
</style>