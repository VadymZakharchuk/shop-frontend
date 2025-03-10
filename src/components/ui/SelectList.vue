<template>
  <div class="select-list">
    <div
      v-if="legend"
      class="select-list__legend"
    >
      {{ legend }}
    </div>
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
        >
          <img
            v-if="item.image"
            :src="item.image"
            alt="item.text"
            class="w-8 h-8 mix-blend-multiply"
          >
          <span v-if="item.text">{{ item.text }}</span>
        </label>
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
  },
  image: {
    type: String,
    default: ''
  },
  legend: {
    type: String,
    default: ''
  }
})
const selectedItems = ref([])

watchEffect(() => {
  const value = selectedItems.value
  $emit('selected', value)
})

const listItems = computed(() => {
  return $props.items.map(item => {
    const res = {}
    if ($props.image) res.image = item[$props.image]
    res.key = item.id
    res.text = item[$props.field]
    return res
  })
})

const isItemSelected = (value) => {
  return !!selectedItems.value.find( item => item === value)
}
</script>

<style scoped lang="scss">
.select-list{
  @apply w-fit mt-2 text-choice-normal;
  &__legend {
    @apply text-lg font-semibold mb-2;
  }
  &__form {
    @apply max-w-sm mx-auto;
    @apply flex flex-col;
    @apply flex flex-row justify-start items-center;

    &-label {
      @apply ml-3 block text-sm font-medium;
      @apply flex flex-row justify-start items-center
    }
    &-input {
      @apply form-checkbox rounded-full border-choice-selected;
    }
  }
}
.selected-item {
  @apply bg-radio-selected text-choice-selected accent-choice-selected rounded-md p-2;
}
.normal-item {
  @apply bg-transparent p-2;
}
</style>