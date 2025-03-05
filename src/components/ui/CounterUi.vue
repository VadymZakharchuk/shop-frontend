<template>
  <div class="counter-component">
    <SimpleButton
      id="decrementButton"
      :colors="btnColors"
      title="-"
      @click="handleClick"
    />
    <div class="counter-value">
      <span
        ref="counter"
      >{{ count }}</span>
    </div>
    <SimpleButton
      id="incrementButton"
      :colors="btnColors"
      title="+"
      @click="handleClick"
    />
  </div>
</template>

<script setup>
import SimpleButton from "@/components/ui/SimpleButton.vue";
import { ref } from "vue";

const $emit = defineEmits(['update:counter'])
const $props = defineProps({
  counter: {
    type: Number,
    default: 0,
  },
});

const count = ref($props.counter)
const btnColors = {
  text: 'text-black',
  bg: 'bg-gray-300',
  hover: 'hover:bg-blue-400',
}
const handleClick = (e) => {
  if (e.target.id === 'decrementButton' && count.value > 0) {
    count.value--

  } else if (e.target.id === 'incrementButton' && count.value < 50) {
    count.value++
  }
  $emit("update:counter", count.value)
}

</script>

<style scoped lang="scss">
.counter-component {
  @apply w-full max-w-[128px] flex flex-row justify-center;
}
.counter-value {
  @apply w-full flex justify-center items-center text-xl;
}
</style>