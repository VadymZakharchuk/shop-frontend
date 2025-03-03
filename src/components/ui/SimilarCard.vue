<template>
  <div class="similar-card">
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

    <h3 class="similar-card__info-title">
      {{ productName }}
    </h3>
    <div class="similar-card__info-offer">
      <span>{{ t('color') }} {{ product.colors[`name_${locale}`] }}</span>
      <span class="self-center">{{ product.price }}</span>
      <span
        v-if="product.discount"
        class="text-gray-400 line-through"
      >
        {{ product.fullPrice }}
      </span>
      <span v-else> &nbsp; &nbsp; </span>
    </div>
  </div>
</template>

<script setup>

import { useI18n } from "vue-i18n";
import { computed } from "vue";
import { imageUrl } from "@/utils/imageUrl.js";

const { locale, t } = useI18n({
  messages: {
    en: { color: "Color" },
    uk: { color: "Колір" },
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
      @apply text-gray-800 text-base font-medium mt-2;
    }
  }
}

</style>
