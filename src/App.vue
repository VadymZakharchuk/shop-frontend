<template>
  <main class="shop-main">
    <MainMenu />
    <RouterView
      :key="$route.fullPath"
      class="shop-main__page"
    />
  </main>
</template>

<script setup>
import MainMenu from "@/components/ui/MainMenu.vue";
</script>

<style lang="scss" scoped>
.shop-main {
  @apply mx-auto;
  &__page {
    @apply w-screen h-screen;
    @apply xl:mx-auto xl:px-[162px] xl:py-8;
    @apply bg-[url(/img/wallpaper.jpg)] bg-contain bg-center;
  }
}
</style>
