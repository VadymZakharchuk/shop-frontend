<template>
  <div class="product-card">
    <router-link
      class="product-card__icons"
      :style="cardStyle"
      :to="handleCardClick()"
    >
      <div
        v-if="product.is_new"
        class="product-card__icons-new"
      >
        <span class="relative right-1 top-[2px]">NEW</span>
      </div>
      <div
        v-else
        class="product-card__icons-empty"
      >
        <span class="relative right-1" />
      </div>
      <a
        class="product-card__icons-fav"
        @click.prevent="handleFavClick"
      >
        <img
          :src="isFav ? '/img/fav-on.png' : '/img/fav-off.png'"
          alt="favourite"
        >
      </a>
    </router-link>
    <div
      v-if="isBuyBtn"
      class="product-card__info"
    >
      <h3 class="product-card__info-title">
        {{ productName }}
      </h3>
      <div class="product-card__info-offer">
        <span class="mr-8">{{ productPrice }}</span>
        <span
          v-if="product.discount"
          class="text-gray-400 line-through"
        >
          {{ fullPrice }}
        </span>
        <span v-else> &nbsp; &nbsp; </span>
      </div>
      <BtnBuy
        :btn-text="inBasket ? t('inBasket') : t('toBasket')"
        :in-basket="inBasket"
        class="mt-3"
        @clicked="handleBuyClick"
      />
    </div>
  </div>
</template>

<script setup>

import { useI18n } from "vue-i18n";
import { computed } from "vue";
import { imageUrl } from "@/utils/imageUrl.js";
import { useUserStore } from "@/store/user.js";
import { useBasketStore } from "@/store/basket.js";
import BtnBuy from "@/components/ui/BtnBuy.vue";
import { toCurrencyString } from "@/utils/toCurrencyString.js";

const { locale, t } = useI18n({
  messages: {
    en: {
      toBasket: "To basket",
      inBasket: "In basket",
    },
    uk: {
      toBasket: "До кошику",
      inBasket: "У кошику",
    }
  }
})
const userStore = useUserStore();
const basketStore = useBasketStore();

const $props = defineProps({
  product: {
    type: Object,
    required: true
  },
  isBuyBtn: {
    type: Boolean,
    default: true
  }
})

const productName = computed(() => $props.product[`name_${locale.value}`])
const isFav = computed(() => {
  const data = userStore.userFavourites
  return data.find(item => item.productId === $props.product.id) !== undefined
})


const productPrice = computed(() => toCurrencyString($props.product.price, 1, locale.value))
const fullPrice =computed(() => toCurrencyString( +$props.product.price + +$props.product.discount, 1, locale.value))

const cardStyle = computed(() => ({
  backgroundImage: `url(${imageUrl($props.product.image)})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  repeat: 'no-repeat',
  width: '350px',
  height: $props.isBuyBtn ? '324px' : '100%',
}))

const handleFavClick = async () => {
  if (isFav.value) {
    await userStore.removeFavourite($props.product.id)
  } else {
    await userStore.addFavourite($props.product.id)
  }
}

const handleCardClick = () => {
  const params = { id: $props.product.id}
  switch($props.product.category.id) {
    case 1:
      return { name: `hoodie-detail__${locale.value}`, params: { ...params } }
    case 2:
      return { name: `hoodie-detail__${locale.value}`, params: { ...params } }
    case 3:
      return { name: `cups-detail__${locale.value}`, params: { ...params } }
    default:
      return { name: `backpacks-detail__${locale.value}`, params: { ...params } }
  }
}


const inBasket = computed(() => {
  const data = basketStore.userBasket
  if(!data) return false
  return basketStore.basket.find(item => item.product.id === +$props.product.id) !== undefined
})
const handleBuyClick = () => {
  const basket = basketStore.basket
  const isPresent = basket.find(item => item.product.id === +$props.product.id)
  if (basketStore.basket.length > 0 && isPresent)  return
  basketStore.basket.push({
    product: $props.product,
    quantity: 1
  })
}
</script>

<style scoped lang="scss">
.product-card {
  @apply flex flex-col items-center font-sans text-lg;
  @apply bg-white rounded-xl shadow-md;
  @apply w-[366px] h-[440px] p-4;
  @apply cursor-pointer transition-all duration-300;
  @apply hover:shadow-lg hover:bg-gray-100;

  &__icons {
    @apply flex flex-row justify-between w-full rounded-lg;
    @apply px-2 pt-2 text-sm;

    &-new {
      @apply bg-red-600 text-white font-medium;
      @apply rounded-full p-2 w-10 h-10 relative;
    }
    &-empty {
      @apply bg-transparent;
      @apply rounded-full p-2 w-10 h-10 relative;
    }
    &-fav {
      @apply bg-white font-medium;
      @apply rounded-full p-2 w-10 h-10;
      @apply hover:scale-110;
    }
  }
  &__info {
    @apply flex flex-col items-center;
    @apply py-1;
    &-title {
      @apply text-cyan-900 text-xl font-medium mt-2;
    }
    &-offer {
      @apply flex flex-row justify-between items-center w-full;
      @apply text-gray-800 text-lg font-medium mt-2;
    }
  }
}

</style>
