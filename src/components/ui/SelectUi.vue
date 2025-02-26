<template>
  <div class="select-ui">
    <label
      for="sortModes"
      class="select-ui__legend"
    >{{ t('legend') }}</label>
    <select
      id="sortModes"
      class="select-ui__select"
    >
      <option
        v-for="item in sortModes"
        :key="item.value"
        value="item.value"
      >
        {{ item.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import {reactive} from "vue";

const { t } = useI18n({
  messages: {
    en: {
      legend: "Select sorting mode",
      sortBy: {
        priceUp: "Price: low to high",
        priceDown: "Price: high to low",
        alphabeticAZ: "Alphabetic A-Z",
        alphabeticZA: "Alphabetic Z-A"
      }
    },
    uk: {
      legend: "Виберіть режим сортування",
      sortBy: {
        priceUp: "Ціна: за зростанням",
        priceDown: "Ціна: за зниженням",
        alphabeticAZ: "За алфавітом A-Я",
        alphabeticZA: "За алфавітом Я-А"
      }
    }
  }
});
const sortModes = reactive([
  { value: "priceUp", label: t('sortBy.priceUp') },
  { value: "priceDown", label: t('sortBy.priceDown') },
  { value: "alphabeticAZ", label: t('sortBy.alphabeticAZ') },
  { value: "alphabeticZA", label: t('sortBy.alphabeticZA') }
])
</script>

<style scoped lang="scss">
.select-ui {
  @apply block w-full;

  &__legend {
    @apply block mb-2 text-sm font-medium text-gray-600 w-full;
  }

  &__select {
    @apply h-10 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2 px-4 focus:outline-none;
  }
}
</style>