<template>
  <div
    :key="choiceText"
    class="toggle-input"
  >
    <div
      v-if="legend"
      class="toggle-input__legend"
    >
      {{ legend }}
    </div>
    <label class="toggle-input__label">
      <input
        v-model="userChoice"
        type="checkbox"
        value=""
        class="sr-only peer"
      >
      <span class="toggle-input__div peer" />
      <span class="toggle-input__span">{{ choiceText }}</span>
    </label>
  </div>
</template>

<script setup>
import { computed, ref, watch} from "vue";
const $emit = defineEmits(['toggled'])
const $props = defineProps({
  legend: {
    type: String,
    default: ''
  },
  toggleText: {
    type: String,
    default: ''
  }
})

const userChoice = ref(false)
const choiceText = computed( () => $props.toggleText)

watch(userChoice, (newValue) => {
  $emit('toggled', newValue)
})

</script>

<style scoped lang="scss">
.toggle-input {
  &__legend {
    @apply text-lg font-semibold mb-2;
  }
  &__label {
    @apply inline-flex items-center mb-5 cursor-pointer;
  }
  &__div {
    @apply relative w-11 h-6 bg-gray-300 rounded-full;
    @apply peer-focus:outline-none peer-checked:after:translate-x-full;
    @apply  rtl:peer-checked:after:-translate-x-full peer-checked:bg-blue-600;
    @apply peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px];
    @apply after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5;
    @apply after:transition-all;
  }
  &__span {
    @apply ms-3 text-sm font-medium  text-choice-normal;
  }
}
</style>