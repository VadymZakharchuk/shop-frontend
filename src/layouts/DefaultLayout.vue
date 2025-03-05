<template>
  <div class="container shop-main">
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
  @apply w-full h-full;
  &__page {
    @apply w-full h-full;
    @apply bg-blue-100;
  }
}
</style>