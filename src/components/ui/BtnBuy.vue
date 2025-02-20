<template>
  <a
    :class="statusClass"
    class="btn-buy"
    @click="handleClick"
  >
    <span class="btn-buy__span">
      <svg
        viewBox="0 0 487 487"
        class="w-auto h-full opacity-100 object-stretch"
        xmlns="http://www.w3.org/2000/svg"
      ><path
        d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z"
        fill="#FFF"
        fill-rule="nonzero"
        fill-opacity=".3"
      /></svg>
    </span>
    <span class="relative">{{ btnText }}</span>
  </a>
</template>

<script setup>
import { computed } from "vue";

const emit = defineEmits(['clicked'])
const $props = defineProps({
  btnText: {
    type: String,
    default: 'Buy'
  },
  inBasket: {
    type: Boolean,
    default: false
  }
})

const statusClass = computed(() => $props.inBasket
  ? 'bg-blue-400 hover:bg-blue-500 #{!important}'
  : 'bg-green-400 hover:bg-green-500'
)


const handleClick = () => {
  emit('clicked');
}
</script>

<style scoped lang="scss">
.btn-buy {
  @apply relative px-10 py-3 font-medium text-white transition duration-300 rounded-md;

  &__span {
    @apply absolute bottom-0 left-0 h-full -ml-2;
    svg {
      @apply w-auto h-full opacity-100 object-cover;
    }
  }
}
</style>
