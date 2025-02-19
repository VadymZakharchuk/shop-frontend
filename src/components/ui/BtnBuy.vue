<template>
  <a
    class="btn-buy"
    @click="handleClick"
  >
    <span class="btn-buy-left" />
    <span class="btn-buy-right">
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
    </span>
    <span class="relative">{{ btnText }}</span>
  </a>
</template>

<script setup>
const emit = defineEmits(['clicked'])
defineProps({
  btnText: {
    type: String,
    default: 'Buy'
  },
})

const handleClick = () => {
  emit('clicked');
}
</script>

<style scoped lang="scss">
.btn-buy {
  @apply relative inline-flex items-center px-12 py-2 overflow-hidden text-lg font-semibold text-indigo-600;
  @apply border-2 border-indigo-600 rounded-full hover:text-cyan-800 group-hover:bg-gray-50;
  &-left {
    @apply absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full;
    @apply top-1/2 group-hover:top-0 duration-300;
  }
  &-right {
    @apply absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full;
    @apply group-hover:translate-x-0;
    svg {
      @apply w-5 h-5;
    }
  }
}
</style>