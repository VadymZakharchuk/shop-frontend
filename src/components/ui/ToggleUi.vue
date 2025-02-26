<template>
  <div class="flex flex-row items-center">
    <span
      v-if="legend"
      class="toggleLegend"
    >
      {{ legend }}
    </span>

    <label class="toggleContainer">
      <input
        value=""
        type="checkbox"
        class="peer sr-only"
      >
      <div class="toggleContainer__main">
        <span @click="handleClick(false)">{{ t('off') }}</span>
        <span
          class="mx-1"
          @click="handleClick(true)"
        >{{ t('on') }}</span>
      </div>
    </label>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const $props = defineProps({
  legend: {
    type: String,
    default: ''
  },
  status: {
    type: Boolean,
    default: false
  }
})

const toggleValue = ref($props.status)
const $emit = defineEmits(['checked'])
const { t } = useI18n({
  messages: {
    en: {
      on: "yes",
      off: "no"
    },
    uk: {
      on: "так",
      off: "ні"
    }
  }
})
const handleClick = (value) => {
  toggleValue.value = value
}

watch(
  () => toggleValue.value,
  (status) => {
    $emit('checked', status)
  },
  { deep: true }
)
</script>

<style scoped lang="scss">
.toggleLegend {
  @apply text-lg font-semibold my-2 mr-2;
}
.toggleContainer {
  @apply relative cursor-pointer;
  @apply flex flex-row h-8 justify-between items-center rounded-2xl p-2 bg-gray-100;
  &__main {
    @apply flex flex-row h-8 justify-between items-center gap-4 rounded-full;
    @apply after:absolute after:left-[2px] after:w-[34px] after:h-6 after:bg-radio-normal;
    @apply  after:rounded-full  after:transition-all after:content-[''];
    @apply peer-checked:after:translate-x-full peer-focus:outline-none;
    @apply text-sm text-choice-normal after:text-choice-selected z-0;
  }
  span {
    @apply z-50 ml-1;
  }
}
</style>