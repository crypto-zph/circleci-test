<template>
    <div class="Zoomer__spacings">
        <div class="text-center img__removeOnMobile">
            <image-magnifier 
            style="cursor: default;"
            :src="image"                
            :zoom-src="zoom_image"
            animated
            zoom-width="340"
            zoom-height="340">
            </image-magnifier>
            <q-img
            v-for="(thumbs, i) in thumbnail"
            :class="'q-ma-xs image '+[i==is_active ? 'selected' : '']"
            :key="i"
            :src="thumbs"
            @click.prevent="switchImage(i)"
            />
        </div>
        <div class="img__removeOnDesktop">
            <q-carousel
              animated
              arrows
              v-model="slide"
              navigation
              infinite
              swipeable
              class="carousel__mobileSize"
            >
              <q-carousel-slide v-for="(thumbs, i) in thumbnail" :name="i" :img-src="thumbs" />
            </q-carousel>
        </div>
    </div>

</template>
<script>
import { getItem } from "../../../references/url";
import { ImageMagnifier } from "vue-image-magnifier";

export default {
    components: {
        ImageMagnifier
    },
    data: () => ({
        is_active: 0,
        image: '',
        zoom_image: '',
        zoom_thumb: [],
        thumbnail: [],
        slide: 1
    }),
    methods: {
        
        async getProductZoomerImages()
        {
            let id = this.$route.params.id;
            let product = await this.$_get(`${getItem}/${id}`);

            this.image = `http://localhost:4000/public/normal_size/${product.data.item_image[0]}`;
            this.zoom_image = `http://localhost:4000/public/large_size/${product.data.item_image[0]}`;


            for (let i = 0; i < product.data.item_image.length; i++) {
                this.thumbnail.push(`http://localhost:4000/public/normal_size/${product.data.item_image[i]}`);
                this.zoom_thumb.push(`http://localhost:4000/public/large_size/${product.data.item_image[i]}`);
            }

        },
        async switchImage (i)
        {
            this.image = this.thumbnail[i];
            this.zoom_image = this.zoom_thumb[i];
            this.is_active = i;
        }
    },
    async mounted () {
        this.getProductZoomerImages();
    }
}
</script>
<style scoped>
.image:hover {
    border: 2px solid #9A67AC;
}

.image {
    cursor: pointer;
    height: 60px; 
    max-width: 70px;
    border: 2px solid #FDB81F;
}

.selected {
    border: 3px solid #9A67AC;
}
.carousel__mobileSize {
    height: 500px;
}
@media (max-width: 947px) {
    .carousel__mobileSize {
        height: 400px;
    }
}
@media (max-width: 803px) {
    .carousel__mobileSize {
        height: 350px;
    }
}
@media (max-width: 734px) {
    .carousel__mobileSize {
        height: 250px;
    }
}
@media (max-width: 524px) {
    .carousel__mobileSize {
        height: 200px;
    }
}
@media (max-width: 1023px) {
    .img__removeOnMobile {
        display: none;
    }
}
@media (min-width: 1023px) {
    .img__removeOnDesktop {
        display: none;
    }
    .Zoomer__spacings {
        padding: 20px
    }
}
</style>