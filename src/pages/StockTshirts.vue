<template>
  <div class="shirts-page">
    <h1 class="shirts-page__title">
      <span>{{ t('title') }}</span>
    </h1>
    <div class="shirts-page__wrap">
      <div class="shirts-page__filters">
        Filters
      </div>
      <div class="shirts-page__list">
        <div
          v-for="item in products"
          :key="`tshirt-${item.id}`"
        >
          <ProductCard :product="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getProducts } from "@/services/products.service.js";
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import ProductCard from "@/components/ui/ProductCard.vue";

const products = ref([])
const { locale, t } = useI18n({
  messages: {
    en: {
      title: "T-Shirts",
    },
    uk: {
      title: "Футболки",
    }
  }
});
const fetchProducts = async () => {
  products.value = await getProducts(locale.value,{ categoryId: 2 });
};
fetchProducts()
</script>

<style scoped lang="scss">
.shirts-page {
  @apply font-sans;
  &__title {
    @apply py-16 text-center mb-4;

    span {
      @apply text-3xl font-semibold text-cyan-800;
      @apply pb-8 border-b-2 border-gray-300;
    }
  }
  &__wrap {
    @apply flex flex-row justify-start items-start;
  }
  &__filters {
    @apply w-1/4 text-cyan-700;
  }
  &__list {
    @apply w-3/4;
    @apply flex flex-wrap flex-row gap-4;
  }
}
</style>