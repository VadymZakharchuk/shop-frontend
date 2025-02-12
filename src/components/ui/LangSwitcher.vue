<template>
  <div class="lang-switcher">
    <button
      :class="{ 'active': locale === 'en'}"
      class="switch-button mr-2"
      @click="setLanguage('en')"
    >
      {{ t('en') }}
    </button>
    <button
      :class="{ 'active': locale === 'uk'}"
      class="switch-button"
      @click="setLanguage('uk')"
    >
      {{ t('uk') }}
    </button>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';
import { watchEffect } from 'vue';

const { t, locale } = useI18n({
  useScope: 'global',
  messages: {
    en: {
      en: "Eng",
      uk: "Ukr"
    },
    uk: {
      en: "Анг",
      uk: "Укр"
    }
  }
});

const setLanguage = (newLang) => {
  locale.value = newLang;
  localStorage.setItem('lang', newLang);
};

watchEffect(() => {
  const storedLang = localStorage.getItem('lang');
  if (storedLang) {
    locale.value = storedLang;
  }
});
</script>

<style scoped lang="scss">
.lang-switcher {
  @apply xl:mr-4 xl:text-xl p-2;
}
.switch-button {
  @apply p-2 bg-menu-hover-bg rounded-xl;
}
.active {
  @apply  text-blue-700 font-semibold;
}
</style>