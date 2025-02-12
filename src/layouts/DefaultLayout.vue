<template>
  <div class="shop-main">
    <MainMenu />
    <RouterView v-slot="{ Component }">
      <component
        :is="Component"
        class="shop-main__page"
      />
    </RouterView>
  </div>
</template>

<script setup>
import MainMenu from '@/components/ui/MainMenu.vue';
import { useRoute } from "vue-router";
import {useI18n} from "vue-i18n";

const { locale } = useI18n()
const route = useRoute()
const routeLang = route.name.includes('uk') ? 'uk' : 'en'
console.log('routeLang', routeLang, locale.value)

localStorage.setItem('lang', routeLang);
locale.value = routeLang;

</script>

<style scoped lang="scss">
.shop-main {
  @apply mx-auto;
  &__page {
    @apply w-screen h-screen;
    @apply xl:mx-auto xl:px-[162px];
    @apply bg-[url(/img/wallpaper.jpg)] bg-contain bg-center;
  }
}
</style>