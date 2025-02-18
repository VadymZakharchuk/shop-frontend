<template>
  <div class="product-card">
    <div
      class="product-card__icons"
      :style="cardStyle"
    >
      <div
        v-if="product.is_new"
        class="product-card__icons-new"
      >
        <span class="relative right-1">NEW</span>
      </div>
      <div
        v-else
        class="product-card__icons-empty"
      >
        <span class="relative right-1" />
      </div>
      <div
        v-if="product.is_new"
        class="product-card__icons-fav"
      >
        FAV
      </div>
    </div>
    <div class="product-card__info">
      <h3 class="product-card__title">
        {{ productName }}
      </h3>
    </div>
  </div>
</template>

<script setup>

import { useI18n } from "vue-i18n";
import { computed } from "vue";
import { imageUrl } from "@/utils/imageUrl.js";

const { locale } = useI18n()
const $props = defineProps({
  product: {
    type: Object,
    required: true
  }
})
console.log($props.product[`name_${locale.value}`], `name_${locale.value}`)
const productName = computed(() => $props.product[`name_${locale.value}`])
const cardStyle = computed(() => ({
  backgroundImage: `url(${imageUrl($props.product.image)})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  repeat: 'no-repeat',
  width: '324px',
  height: '324px',
}))
</script>

<style scoped lang="scss">
.product-card {
  @apply flex flex-col items-center font-sans text-lg text-yellow-400;
  @apply bg-white rounded-xl shadow-md;
  @apply w-[340px] h-[340px] p-4;
  @apply cursor-pointer transition-all duration-300;
  @apply hover:shadow-lg hover:bg-gray-100;

  &__icons {
    @apply flex flex-row justify-between w-full;
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
      @apply bg-red-600 text-white font-medium;
      @apply rounded-full p-2 w-10 h-10;
    }
  }
}
</style>