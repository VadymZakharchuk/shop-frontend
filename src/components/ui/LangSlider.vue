<template>
  <div class="lang-selector">
    <button
      :class="{ 'active-lang': isUk }"
      class="lang-selector__btn"
      @click="handleClick('uk')"
    >
      <img
        src="/img/ukraine.png"
        alt="Ukraine"
      >
    </button>
    <button
      :class="{ 'active-lang': !isUk }"
      class="lang-selector__btn"
      @click="handleClick('en')"
    >
      <img
        src="/img/united_kingdom.png"
        alt="United Kingdom"
      >
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from "vue-i18n";

const { locale } = useI18n()
const isUk = computed(() => locale.value === 'uk')

const handleClick = (lang) => {
  if (lang === locale.value) return
  locale.value = lang
}
</script>

<style scoped lang="scss">
.lang-selector {
  @apply w-24 h-12 py-2 px-4 text-base text-blue-950 bg-blue-200 rounded-xl;
  @apply relative flex flex-row justify-between items-center;
}
.active-lang {
  @apply bg-yellow-300 rounded-full p-1;
}
</style>