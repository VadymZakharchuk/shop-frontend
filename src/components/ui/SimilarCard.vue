<template>
  <div class="similar-card">
    <h3 class="similar-card__info-title">
      {{ productName }}
    </h3>
    <div
      class="similar-card__icons"
      :style="cardStyle"
      @click="$emit('clicked', product)"
    >
      <div
        v-if="product.is_new"
        class="similar-card__icons-new"
      >
        <span class="relative right-1 top-[2px]">NEW</span>
      </div>
      <div
        v-else
        class="similar-card__icons-empty"
      >
        <span class="relative right-1" />
      </div>
    </div>
    <div class="similar-card__info-offer">
      <div class="similar-card__info-offer-row">
        <div>
          <span class="text-gray-400 mr-2">{{ t('color') }}</span>
          <span class="font-semibold">{{ product.colors[`name_${locale}`] }}</span>
        </div>
        <div>
          <span class="text-gray-400 mr-2">{{ t('size') }}</span>
          <span class="font-semibold">{{ product.size.toUpperCase() }}</span>
        </div>
      </div>
      <div class="similar-card__info-offer-row">
        <div>
          <span class="text-gray-400 mr-2">{{ t('price') }}</span>
          <span class="font-semibold">{{ product.price }}</span>
        </div>

        <span
          v-if="product.discount"
          class="text-gray-400 line-through"
        >
          {{ product.fullPrice }}
        </span>
        <span v-else> &nbsp; &nbsp; </span> 
      </div>
    </div>
  </div>
</template>

<script setup>

import { useI18n } from "vue-i18n";
import { computed } from "vue";
import { imageUrl } from "@/utils/imageUrl.js";

const { locale, t } = useI18n({
  messages: {
    en: { color: "Color", size: "Size", price: "Price: " },
    uk: { color: "Колір", size: "Розмір", price: "Ціна: " },
  }
})

const $emit = defineEmits(['clicked'])

const $props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const productName = computed(() => $props.product[`name_${locale.value}`])

const cardStyle = computed(() => ({
  backgroundImage: `url(${imageUrl($props.product.image)})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  repeat: 'no-repeat',
  width: '350px',
  height: $props.isBuyBtn ? '324px' : '100%',
}))
</script>

<style scoped lang="scss">
.similar-card {
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
  }
  &__info {
    @apply flex flex-col items-center;
    @apply py-2;
    &-title {
      @apply text-cyan-900 text-xl font-medium mb-3;
    }
    &-offer {
      @apply flex flex-col justify-between items-center w-full;
      @apply text-gray-800 text-base font-medium mt-2;
      &-row {
        @apply flex flex-row justify-between items-center w-full px-8;
      }
    }
  }
}

</style>
