<template>
  <div class="home-page">
    <h1>Home page</h1>
    <LangSlider class="mt-10" />
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import LangSlider from "@/components/ui/LangSlider.vue";

const { t } = useI18n({
  messages: {
    en: {
      title: "Store of things with a Ukrainian soul",
      subTitle: "Things for those in love with their country"
    },
    uk: {
      title: "Магазин речей з українською душею",
      subTitle: "Речі для закоханих у свою країну"
    }
  }
});

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