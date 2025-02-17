<template>
  <div class="home-page">
    <h1>Home page</h1>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { getProducts } from "@/services/products.service.js";
import { ref } from "vue";

const { locale } = useI18n({
  messages: {
    en: {
      title: "Store of things with a Ukrainian soul",
    },
    uk: {
      title: "Магазин речей з українською душею",
    }
  }
});

const products = ref([]);
const fetchProducts = async () => {
  products.value = await getProducts(locale.value, 10);
  console.log(products.value);
};
fetchProducts();
</script>

<style scoped lang="scss">
.home-page {
  h1 {
    @apply text-2xl font-semibold text-blue-950;
  }
  h3 {
    @apply text-lg font-medium text-menu-text;
  }
}
</style>