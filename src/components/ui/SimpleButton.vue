<template>
  <button
    :class="colorClasses"
    class="btn-default-style"
  >
    {{ title }}
  </button>
</template>

<script setup>
import { computed } from "vue";

const $props = defineProps({
  title: {
    type: String,
    default: 'Button',
  },
  colors: {
    type: Object,
    default: () => ({
      text: 'text-white',
      bg: 'bg-gray-500',
      hover: 'hover:bg-gray-600',
    }),
  },
});

const colorClasses = computed(() => {
  return `${$props.colors.text} ${$props.colors.bg} ${$props.colors.hover}`;
})
</script>

<style scoped lang="scss">
.btn-default-style {
  @apply flex flex-row justify-center items-center;
  @apply text-lg font-medium transition py-1 px-4 rounded drop-shadow-xl;
}
</style>