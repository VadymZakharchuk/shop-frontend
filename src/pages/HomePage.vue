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
            class="rounded"
          >
        </div>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
    <ProductCard
      v-if="products.length"
      :product="products[8]"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useUserStore } from "@/store/user.js";
import ProductCard from "@/components/ui/ProductCard.vue";
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { getProducts } from "@/services/products.service.js";
import { listFavs } from "@/services/favourites.service.js";
import { imageUrl } from "@/utils/imageUrl.js";

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

const userStore = useUserStore();

const carouselConfig = {
  itemsToShow: 3,
  autoplay: 3000,
  wrapAround: true,
  pauseAutoplayOnHover: true,
  gap: 12,
  snapAlign: 'center',
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
const fetchFavourites = async () => {
  if (userStore.isLoggedInAndHasToken) {
    userStore.favourites = await listFavs(userStore.user.id);
  }
};
fetchProducts()
fetchFavourites()

const imgUrl = (path) => {
  return imageUrl(path)
}
</script>

<style scoped lang="scss">
//.home-page {
//   @apply px-12 #{!important};
//}
</style>