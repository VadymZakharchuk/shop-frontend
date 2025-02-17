<template>
  <div class="lang-switcher">
    <button
      :class="{ 'active': locale === 'en'}"
      class="switch-button mr-2"
      @click="setLanguage('en')"
    >
      <img
        src="/img/united_kingdom.png"
        alt="United Kingdom"
      >
    </button>
    <button
      :class="{ 'active': locale === 'uk'}"
      class="switch-button"
      @click="setLanguage('uk')"
    >
      <img
        src="/img/ukraine.png"
        alt="Ukraine"
      >
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
  @apply p-2 rounded-xl;
}
.active {
  @apply  text-yellow-500 font-semibold;
}
</style>