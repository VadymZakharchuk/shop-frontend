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
          :is-invalid="!item.isAvailable"
          class="basket-page__counter"
          @update:counter="handleCounterChange(item, $event)"
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
        @clicked="handleCreateOrder"
      />
      <p
        v-if="missedGoods"
        class="basket-page__missed"
      >
        {{ t('notAvailable') }}
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
import CounterUi from "@/components/ui/CounterUi.vue";
import { toCurrencyString } from "@/utils/toCurrencyString.js";
import BtnBuy from "@/components/ui/BtnBuy.vue";
import IconDelete from "@/components/ui/icons/IconDelete.vue";
import {computed, ref, watch} from "vue";
import { createOrder, getNewOrderNo} from "@/services/orders.service.js";
import { useUserStore } from "@/store/user.js";

const { t, locale } = useI18n({
  messages: {
    en: {
      basket: 'Basket',
      total: 'Total',
      order: 'Make order',
      isEmpty: 'Basket is empty',
      notAvailable: 'Selected quantity of good is missed on stock',
    },
    uk: {
      basket: 'Кошик',
      total: 'Разом',
      order: 'Зробити замовлення',
      isEmpty: 'Кошик порожній',
      notAvailable: 'Обрана кількість товару відсутня на складі',
    }
  }
})
const basketStore = useBasketStore()
const userStore = useUserStore()
const basket = ref(basketStore.userBasket.map((item) => { return { ...item, isAvailable: true }}))
const missedGoods = computed(() => basket.value.some((item) => item.isAvailable === false))

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

const handleCounterChange = (item, event) => {
  const index = basket.value.findIndex((el) => el.product.id === item.product.id)
  if (index !== -1) {
    basket.value[index].quantity = event
    basket.value[index].isAvailable = true
  }
}
const handleCreateOrder= async() => {
  const orderNo = await getNewOrderNo()
  const order = basket.value.map((item) => {
    return {
      productId: item.product.id,
      quantity: item.quantity,
      userId: userStore.user?.id ? userStore.user?.id : 0,
      orderNo: orderNo.newOrderNo,
      statusId: 1
    }
  })
  const result = await createOrder(order)
  if (result.message !== 'created') {
    result.notAvailableProducts.forEach((item) => {
      const index = basket.value.findIndex((el) => el.product.id === item.productId)
      if (index !== -1) {
        basket.value[index].isAvailable = false
      }
    })
  }
  else {
    basketStore.clearBasket()
  }
}
</script>

<style scoped lang="scss">
.basket-page {
  @apply text-base text-black font-roboto py-12 px-[116px];
  &__title {
    @apply text-3xl font-semibold text-cyan-800 px-4;
    @apply pb-8 border-b-2 border-gray-300;
  }
  &__empty {
    @apply flex items-center justify-center w-1/2 h-1/2 rounded-lg;
    @apply mt-12 py-12 mx-auto text-xl text-gray-400 shadow-md;
  }

  &__list {
    @apply flex flex-col my-2 justify-start items-start;
  }

  &__item {
    @apply flex flex-row justify-start items-center;
    @apply text-lg text-gray-800 w-full px-4;
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
  &__missed {
    @apply bg-red-600 text-white text-base mt-4 p-2 rounded-lg self-center;
  }
}
</style>