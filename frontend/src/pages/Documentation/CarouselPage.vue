<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Carousel Page Form
===

</q-markdown>
<!-- /markdown -->

<div>
    <div>
        <u-q-carousel-page></u-q-carousel-page>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Carousel Page Form`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQCarouselPage from '../../components/UQCarouselPage';

export default
{
    data: () =>
    ({
        code: `<div class="component q-ma-lg">
    <div>
        <u-q-carousel-page></u-q-carousel-page>
    </div>
</div>`
    }),
    components: { UQCarouselPage },
    mounted()
    {
    },
    methods: { }
}
</script>