<template>
  <div class="wrapper">
    <div class="content">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

const { locale } = useI18n()
const route = useRoute()

const routeLang = route.name.includes('uk') ? 'uk' : 'en'
console.log('routeLang', routeLang, locale.value)

localStorage.setItem('lang', routeLang);
locale.value = routeLang;
</script>

<style scoped lang="scss">
.wrapper {
  @apply flex flex-col items-center justify-center;
}
.content {
  @apply bg-white w-[100vw] h-[100vh] flex flex-col items-center justify-center;
}
</style>