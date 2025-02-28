<template>
  <div class="product-details">
    <h1 class="product-details__title">
      <span>Product detail page</span>
    </h1>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRoute } from 'vue-router';
const $props = defineProps({
  categoryId: {
    type: Number,
    required: true,
  },
});
const route = useRoute()
console.log('route -> ', route.params)
console.log('props -> ', $props.categoryId)
</script>

<style scoped lang="scss">
</style>
