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
        <span class="w-2/5">{{ item.product[`name_${locale}`] }}</span>
        <span class="w-1/5 text-end pr-8">{{ toCurrencyString(item.product.price, locale) }}</span>
        <CounterUi
          :counter="item.quantity"
          class="basket-page__counter"
          @update:counter="item.quantity = $event"
        />
        <span class="w-1/5 text-end pr-8">{{ toCurrencyString(itemSum(item), locale) }}</span>
        <a @click="handleDeleteItem(item)">
          <IconDelete class="w-6 h-auto" />
        </a>
      </p>
      <p class="basket-page__total">
        {{ t('total') }}: {{ toCurrencyString(basketTotal(), locale) }}
      </p>
      <BtnBuy
        :btn-text="t('order')"
        class="basket-page__order"
      />
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
import CounterUi from "@/components/ui/CounterUi.vue";
import { toCurrencyString } from "@/utils/toCurrencyString.js";
import BtnBuy from "@/components/ui/BtnBuy.vue";
import IconDelete from "@/components/ui/icons/IconDelete.vue";
import { ref, watch} from "vue";

const { t, locale } = useI18n({
  messages: {
    en: {
      basket: 'Basket',
      total: 'Total',
      order: 'Make order',
      isEmpty: 'Basket is empty',
    },
    uk: {
      basket: 'Кошик',
      total: 'Разом',
      order: 'Зробити замовлення',
      isEmpty: 'Кошик порожній',
    }
  }
})

const basketStore = useBasketStore()
const basket = ref(basketStore.userBasket)

watch(
  () => basketStore.userBasket.value,
  () => {
    basket.value = basketStore.userBasket
  },
  { deep: true }
)

const itemSum = (item) => {
  return item.product.price * item.quantity
}

const basketTotal = () => {
  return basket.value.reduce((acc, item) => acc + itemSum(item), 0)
}

const handleDeleteItem = (item) => {
  basketStore.deleteItem(item.product.id)
}
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
    @apply text-lg text-gray-800 w-full;
    @apply border-b-2 border-gray-300 py-2;

    &-image {
      @apply w-24 h-24 mr-4 rounded-md shadow-lg;
    }
  }
  &__counter {
    @apply h-8 mr-4;
  }
  &__total {
    @apply text-xl font-semibold text-cyan-800;
    @apply w-full mt-4 text-end pr-16;
  }
  &__order {
    @apply my-4 w-fit text-center mx-auto;
  }
}
</style>