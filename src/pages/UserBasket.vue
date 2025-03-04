<template>
  <div class="basket-page">
    <h1 class="basket-page__title">
      {{ t('basket') }}
    </h1>
    <div
      v-if="basket.length"
      class="basket-page__list"
    >
      <p
        v-for="item in basket"
        :key="item.id"
        class="basket-page__item"
      >
        <img
          :src="imageUrl(item.product.image)"
          :alt="item.product[`name_${locale}`]"
          class="basket-page__item-image"
        >
        <span>{{ item.product[`name_${locale}`] }}</span>
        <span>{{ item.product.price }}</span>
        <span>{{ item.quantity }}</span>
      </p>
    </div>
    <div
      v-else
      class="basket-page__empty"
    >
      {{ t('isEmpty') }}
    </div>
  </div>
</template>

<script setup>

import { useI18n } from "vue-i18n";
import { useBasketStore } from "@/store/basket.js";
import { imageUrl } from "@/utils/imageUrl.js";

const { t, locale } = useI18n({
  messages: {
    en: {
      basket: 'Basket',
      isEmpty: 'Basket is empty',
    },
    uk: {
      basket: 'Кошик',
      isEmpty: 'Кошик порожній',
    }
  }
})

const basketStore = useBasketStore()
const basket = basketStore.userBasket
</script>

<style scoped lang="scss">
.basket-page {
  @apply text-base text-black font-roboto py-12 px-[116px];
  &__title {
    @apply text-3xl font-semibold text-cyan-800;
    @apply pb-8 border-b-2 border-gray-300;
  }
  &__empty {
    @apply flex items-center justify-center w-1/2 h-1/2 rounded-lg;
    @apply mt-12 mx-auto text-xl text-gray-400 shadow-md;
  }

  &__list {
    @apply flex flex-col my-2 justify-start items-start;
  }

  &__item {
    @apply flex flex-row justify-start items-center;
    @apply text-lg text-black;
    @apply border-b-2 border-gray-300 py-2;

    &-image {
      @apply w-24 h-24 mr-4;
    }
  }
}
</style>