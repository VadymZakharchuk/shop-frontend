<template>
  <div class="home-page">
    <Carousel
      v-bind="carouselConfig"
      class="pt-10"
    >
      <Slide
        v-for="item in products"
        :key="item.id"
      >
        <div class="carousel__item">
          <img
            :src="imgUrl(item.image)"
            :alt="item.name"
          >
        </div>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { getProducts } from "@/services/products.service.js";


const { locale } = useI18n({
  messages: {
    en: {
      title: "Store of things with a Ukrainian soul",
    },
    uk: {
      title: "Магазин речей з українською душею",
    }
  }
});

const carouselConfig = {
  itemsToShow: 3,
  autoplay: 3000,
  wrapAround: true,
  pauseAutoplayOnHover: true,
  gap: 8,
  snapAlign: 'center',

  // 'breakpointMode' determines how the carousel breakpoints are calculated
  // Acceptable values: 'viewport' (default) | 'carousel'
  // 'viewport' - breakpoints are based on the viewport width
  // 'carousel' - breakpoints are based on the carousel width
  breakpointMode: 'carousel',

  // Breakpoints are mobile-first
  // Any settings not specified will fall back to the carousel's default settings
  breakpoints: {
    // 300px and up
    300: {
      itemsToShow: 2,
      snapAlign: 'center',
    },
    640: {
      itemsToShow: 3,
      snapAlign: 'start',
    },
    968: {
      itemsToShow: 4,
      snapAlign: 'start',
    },
  },
}

const products = ref([]);
const fetchProducts = async () => {
  products.value = await getProducts(locale.value, 10);
};
fetchProducts()

const imgUrl = (path) => {
  return `${import.meta.env.VITE_IMG_URL}${path}`;
}
</script>

<style scoped lang="scss">
//.home-page {
//   @apply px-12 #{!important};
//}
</style>