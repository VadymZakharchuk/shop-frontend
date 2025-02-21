<template>
  <div class="shop-main">
    <AppHeader />
    <RouterView v-slot="{ Component }">
      <component
        :is="Component"
        class="shop-main__page"
      />
    </RouterView>
  </div>
</template>

<script setup>
import AppHeader from "@/components/AppHeader.vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

const { locale } = useI18n()
const route = useRoute()

const routeLang = route.name.includes('uk') ? 'uk' : 'en'
localStorage.setItem('lang', routeLang);
locale.value = routeLang;

</script>

<style scoped lang="scss">
.shop-main {
  @apply mx-auto;
  &__page {
    @apply w-screen h-full;
    @apply xl:mx-auto xl:px-[96px];
    @apply bg-blue-100;
    //@apply bg-[url(/img/wallpaper.jpg)] bg-contain bg-center;
  }
}
</style>