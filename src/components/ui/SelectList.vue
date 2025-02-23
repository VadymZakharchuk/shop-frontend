<template>
  <div class="select-list">
    <fieldset>
      <div
        v-for="item in listItems"
        :key="item.key"
        :class="isItemSelected(item.text) ? 'selected-item' : 'normal-item'"
        class="select-list__form"
      >
        <input
          :id="item.key"
          v-model="selectedItems"
          :value="item.text"
          type="checkbox"
          class="select-list__form-input"
          :checked="isItemSelected(item.text)"
        >
        <label
          :for="item.key"
          class="select-list__form-label"
        >{{ item.text }}</label>
      </div>
    </fieldset>
  </div>
</template>

<script setup>
import {computed, ref, watchEffect} from "vue";
const $emit = defineEmits(['selected'])
const $props = defineProps({
  items: {
    type: Array,
    required: true
  },
  field: {
    type: String,
    required: true
  }
})
const selectedItems = ref([])

watchEffect(() => {
  const value = selectedItems.value
  $emit('selected', value)
})

const listItems = computed(() => {
  return $props.items.map(item => {
    return {
      key: item.id,
      text: item[$props.field]
    }
  })
})

const isItemSelected = (value) => {
  return !!selectedItems.value.find( item => item === value)
}
</script>

<style scoped lang="scss">
.select-list{
  @apply w-fit mt-2 text-cyan-900;
  &__form {
    @apply max-w-sm mx-auto;
    @apply flex flex-col;
    @apply flex flex-row justify-start items-center;

    &-label {
      @apply ml-3 block text-sm font-medium;
    }
    &-input {
      @apply form-checkbox rounded-full border-cyan-900;
    }
  }
}
.selected-item {
  @apply bg-blue-200 text-purple-600 accent-purple-600 rounded-md p-2;
}
.normal-item {
  @apply bg-transparent p-2;
}
</style>