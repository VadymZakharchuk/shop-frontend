<template>
  <div class="product-details">
    <div
      v-if="isReady"
      class="product-details__wrap"
    >
      <img
        class="product-details__image"
        :src="imageUrl(activeProduct.image)"
        :alt="activeProduct[`name_${locale}`]"
      >
      <div class="product-details__content">
        <h1 class="product-details__title">
          <span>{{ activeProduct[`name_${locale}`] }}</span>
        </h1>
        <p class="product-details__code">
          {{ t('code') }}: {{ activeProduct.code }}
        </p>
        <p class="product-details__offer">
          <span class="mr-8">{{ activeProduct.price }}</span>
          <span
            v-if="activeProduct.discount"
            class="text-gray-400 line-through"
          >
            {{ activeProduct.fullPrice }}
          </span>
          <span v-else> &nbsp; &nbsp; </span>
        </p>
        <div class="product-details__description">
          <span class="text-gray-400 my-2">{{ t('color') }}:</span>
          <div class="mb-2">{{ activeProduct.colors[`name_${locale}`] }}</div>
          <span class="text-gray-400 my-2">{{ t('description') }}:</span>
          <div class="mb-2">{{ activeProduct[`description_${locale}`] }}</div>
        </div>
        <div class="product-details__views">
          <IconEye />
          <span class="ml-2">{{ activeProduct.views_count }}</span>
        </div>
      </div>
    </div>
    <div class="product-details__title">
      <span>{{ t('similarGoods') }}</span>
    </div>
    <Carousel
      v-bind="carouselConfig"
      class="my-6"
    >
      <Slide
        v-for="item in product"
        :key="item.id"
      >
        <div>
          <SimilarCard
            :product="item"
            @clicked="handleCardClick"
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
import { computed, defineProps, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from "vue-i18n";
import IconEye from "@/components/ui/icons/IconEye.vue";
import { getProductAndAnalogs, increaseCounter} from "@/services/products.service.js";
import { imageUrl } from "@/utils/imageUrl.js";
import { toCurrencyString } from "@/utils/toCurrencyString.js";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import SimilarCard from "@/components/ui/SimilarCard.vue";

defineProps({
  categoryId: {
    type: Number,
    required: true,
  },
});
const route = useRoute()
const { locale, t } = useI18n({
  messages: {
    en: {
      name: "Name",
      description: "Description",
      color: "Color",
      price: "Price",
      views: "Views",
      code: "Code",
      similarGoods: "Similar goods",
    },
    uk: {
      name: "Назва",
      description: "Опис",
      color: "Колір",
      price: "Ціна",
      views: "Перегляди",
      code: "Код товару",
      similarGoods: "Схожі товари",
    },
  }
})

const isReady = ref(false)
const product = ref({})
const pIndex = ref(0)

const activeProduct = computed(() => isReady.value ? product.value[pIndex.value] : {})
const getProductData = async () => {
  product.value = await getProductAndAnalogs(locale.value, route.params.id)
  product.value.forEach(item => {
    item.fullPrice = toCurrencyString(+item.price + +item.discount, 1, locale.value)
    item.price = toCurrencyString(item.price, locale.value)
    return { ...item }
  })
  const token = Cookies.get('auth-token')
  const decoded = token ? jwtDecode(token) : undefined
  const isAdmin = decoded ? !!decoded.isAdmin : false
  await increaseCounter(route.params.id, isAdmin)
  isReady.value = true
};
getProductData()
const carouselConfig = {
  itemsToShow: 3,
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
const handleCardClick = (item) => {
  pIndex.value = product.value.findIndex(t => t.id === item.id)
  window.scrollTo(0, 0)
}
</script>

<style scoped lang="scss">
.product-details {
  @apply w-full h-fit min-h-screen flex flex-col items-start justify-start;
  @apply text-black text-lg font-roboto py-12 px-[116px];

  &__wrap {
    @apply flex flex-row items-start justify-start font-roboto mb-8;
  }
  &__title {
    @apply text-2xl text-black font-bold mb-4;
  }
  &__image {
    @apply w-[40%] h-auto object-cover mr-8 rounded-lg shadow-lg;
  }
  &__content {
    @apply w-[60%] h-auto pl-4 text-choice-normal font-normal;
    @apply flex flex-col items-start justify-start;
  }
  &__code {
    @apply text-gray-400 text-sm my-2;
  }
  &__offer {
    @apply text-lg text-black font-semibold my-2;
  }
  &__views {
    @apply flex flex-row justify-between items-center text-gray-400 text-sm my-2;

    svg {
      @apply w-6 h-auto;
    }
  }
}
.carousel__item {
  @apply flex flex-col items-center font-sans text-lg;
  @apply bg-white rounded-xl shadow-md;
  @apply w-[366px] h-[440px] p-4;
  @apply cursor-pointer transition-all duration-300;
  @apply hover:shadow-lg hover:bg-gray-100;

  &-img {
    @apply w-full h-auto object-cover rounded-lg;
  }
}
</style>
