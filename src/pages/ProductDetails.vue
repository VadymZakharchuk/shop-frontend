<template>
  <div class="product-details">
    <h1 class="product-details__title">
      <span>{{ product[`name_${locale}`] }}</span>
    </h1>
    <div class="product-details__wrap">
      <img
        class="product-details__image"
        :src="imageUrl(product.image)"
        :alt="product[`name_${locale}`]"
      >
      <div class="product-details__content">
        <p class="product-details__description">
          <span>{{ product[`description_${locale}`] }}</span>
        </p>
        <p class="product-details__price">
          <span>{{ product.price }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from "vue-i18n";
import { getProduct } from "@/services/products.service.js";
import { imageUrl } from "@/utils/imageUrl.js";

defineProps({
  categoryId: {
    type: Number,
    required: true,
  },
});
const route = useRoute()
const { locale } = useI18n()
const product = ref({})

const getProductData = async () => {
  product.value = await getProduct(locale.value, route.params.id)
};
getProductData()
</script>

<style scoped lang="scss">
.product-details {
  @apply w-full h-fit min-h-screen flex flex-col items-start justify-start;
  @apply text-choice-normal text-lg font-sans pt-4 px-[116px];

  &__wrap {
    @apply flex flex-row items-start justify-start;
  }

  img {
    @apply w-[40%] h-auto object-cover;
  }
  &__content {
    @apply w-[60%] h-auto pl-4;
  }
}
</style>
