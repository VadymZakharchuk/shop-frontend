<template>
  <div class="container home-page">
    <h1 class="home-page__title">
      <span>{{ t('title') }}</span>
    </h1>
    <Carousel v-bind="carouselConfig">
      <Slide
        v-for="item in products"
        :key="item.id"
      >
        <div class="carousel__item">
          <ProductCard
            v-if="products.length"
            :product="item"
            :is-buy-btn="false"
          />
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
import { useUserStore } from "@/store/user.js";
import ProductCard from "@/components/ui/ProductCard.vue";
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { getProducts } from "@/services/products.service.js";
import { listFavs } from "@/services/favourites.service.js";

const { locale, t } = useI18n({
  messages: {
    en: {
      title: "Best positions",
    },
    uk: {
      title: "Кращі позиції",
    }
  }
});

const userStore = useUserStore();

const carouselConfig = {
  itemsToShow: 3,
  autoplay: 3000,
  wrapAround: true,
  pauseAutoplayOnHover: true,
  gap: 8,
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
      itemsToShow: 3,
      snapAlign: 'start',
    },
  },
}

const products = ref([]);
const fetchProducts = async () => {
  products.value = await getProducts(locale.value, { limit: 10 });
};
const fetchFavourites = async () => {
  if (userStore.isLoggedInAndHasToken) {
    userStore.favourites = await listFavs(userStore.user.id);
  }
};
fetchProducts()
fetchFavourites()

</script>

<style scoped lang="scss">
.home-page {
  @apply font-sans;
  &__title {
    @apply py-16 text-center mb-4;

    span {
      @apply text-3xl font-semibold text-cyan-800;
      @apply pb-8 border-b-2 border-gray-300;
    }
  }
}
</style>