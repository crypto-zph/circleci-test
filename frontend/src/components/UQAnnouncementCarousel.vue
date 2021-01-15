<template>
    <div>
        <q-carousel
            class="carousel__container"
            animated
            v-model="slide"
            infinite
            :autoplay="10000"
            style="height: 300px;"
        >
            <q-carousel-slide
                v-for="(announcement, index) in announcements"
                :key="index"
                :name="index"
                :img-src="`data:image/jpg;base64,${announcement.image_path}`" 
                @click="announcement.is_clickable ? $router.push({ name : 'front_carousel', params: { announcement_id : announcement._id } }) : ''"
                :style="announcement.is_clickable ? 'cursor: pointer' : 'cursor: auto'"
            />
        </q-carousel>

    </div>
</template>

<script>
import { getActiveAnnouncementsImage } from '../references/url';
import config from '../../config';

export default {

    data: () =>
    ({
        slide: 0,
        announcements: [],
    }),
    async mounted()
    {
        await this.getActiveAnnouncementsImage();
    },
    methods:
    {
        async getActiveAnnouncementsImage()
        {
            let announcements_image = await this.$_get(getActiveAnnouncementsImage);

            if (announcements_image.data.status == 'success') {
                this.announcements = announcements_image.data.data;
            }
        }
    }
}
</script>