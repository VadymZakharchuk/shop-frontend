<template>
  <div class="app-header">
    <div class="app-header__logo">
      <RouterLink :to="homeLink">
        <img
          src="/img/logo.jpg"
          alt="logo"
        >
      </RouterLink>
      <div class="app-header__logo-text">
        <div class="font-caveat font-semibold">
          {{ t('title') }}
        </div>
      </div>
    </div>
    <div class="app-header__menu">
      <MainMenu />
    </div>
  </div>
</template>

<script setup>
import MainMenu from "@/components/ui/MainMenu.vue";
import { useI18n } from "vue-i18n";
import { computed } from "vue";

const { t, locale } = useI18n({
  messages: {
    en: {
      title: "Store of things with a Ukrainian soul",
      subTitle: "Things for those in love with their country"
    },
    uk: {
      title: "Магазин речей з українською душею",
      subTitle: "... для закоханих у свою країну"
    }
  }
});
const homeLink = computed(() => {
  return locale.value === "uk" ? "/" : "/en";
})
</script>

<style scoped lang="scss">
.app-header {
  @apply flex flex-col justify-start items-center;

  &__logo {
    @apply flex flex-row justify-start items-center w-full text-indigo-800;
    @apply bg-gray-300 text-2xl font-medium px-[96px] py-1;
    img {
      @apply w-[196px] h-auto cursor-pointer rounded-3xl mr-12 mix-blend-multiply;
    }
  }

  &__menu {
    @apply flex flex-row justify-start items-center w-full px-[96px] bg-cyan-900;
  }
}
</style>