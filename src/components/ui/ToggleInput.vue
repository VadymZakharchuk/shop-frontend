<template>
  <div class="toggle-input">
    <label class="toggle-input__label">
      <input
        v-model="selectedItem"
        type="checkbox"
        value=""
        class="sr-only peer"
      >
      <div class="toggle-input__div peer" />
      <span class="toggle-input__span">Default toggle</span>
    </label>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.toggle-input {

  &__label {
    @apply inline-flex items-center mb-5 cursor-pointer;
  }
  &__div {
    @apply relative w-11 h-6 bg-gray-300 rounded-full;
    @apply   peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300;
    @apply peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:bg-blue-600;
    @apply peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px];
    @apply after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5;
    @apply after:transition-all;
  }
  &__span {
    @apply ms-3 text-sm font-medium text-gray-900;
  }
}
</style>