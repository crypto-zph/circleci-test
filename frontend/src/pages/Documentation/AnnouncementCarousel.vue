<template>
<div class="documentation">

<!-- markdown -->
<q-markdown >
Announcement Carousel Form
===

</q-markdown>
<!-- /markdown -->

<div class="component">
    <div>
        <u-q-announcement-carousel></u-q-announcement-carousel>
    </div>
</div>

<!-- markdown -->
<q-markdown >

The __code below__ is for `Announcement Carousel Form`

``` html
{{ code }}
```

</q-markdown>
<!-- /markdown -->


</div>
</template>

<script>
import UQAnnouncementCarousel from '../../components/UQAnnouncementCarousel';

export default
{
    data: () =>
    ({
        code: `<div class="component">
    <div>
        <u-q-announcement-carousel></u-q-announcement-carousel>
    </div>
</div>`
    }),
    components: { UQAnnouncementCarousel },
    mounted()
    {
    },
    methods: { }
}
</script>