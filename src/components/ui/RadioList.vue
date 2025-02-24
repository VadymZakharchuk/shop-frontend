<template>
  <div class="radio-list">
    <div class="radio-list__legend">
      {{ legend }}
    </div>
    <fieldset
      :class="position === 'row' ? 'radio-list__row' : 'radio-list__col'"
      class="radio-list__form"
    >
      <div
        v-for="item in listItems"
        :key="item.key"
        :class="item.text === selectedItem ? 'bg-radio-selected' : ' bg-radio-normal'"
        class="radio-list__form-input"
      >
        <input
          :id="item.key"
          v-model="selectedItem"
          :value="item.text"
          type="radio"
          :checked="item.text === checked"
        >
        <label
          :for="item.key"
          :class="item.text === selectedItem ? 'text-choice-selected' : 'text-choice-normal'"
          class="radio-list__form-label"
        >{{ item.text }}</label>
      </div>
    </fieldset>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect} from "vue";

const $emit = defineEmits(['checked'])
const $props = defineProps({
  items: {
    type: Array,
    required: true
  },
  field: {
    type: String,
    required: true
  },
  checked: {
    type: String,
    default: ''
  },
  position: {
    type: String,
    default: 'row'
  },
  legend: {
    type: String,
    default: ''
  }
})
const selectedItem = ref($props.checked)

const listItems = computed(() => {
  return $props.items.map(item => {
    return {
      key: item.id,
      text: item[$props.field]
    }
  })
})

watchEffect(() => {
  const value = selectedItem.value
  $emit('checked', value)
})
</script>

<style scoped lang="scss">
.radio-list{
  @apply w-full text-choice-normal;

  &__legend {
    @apply text-lg font-semibold mb-2;
  }
  &__form {
    @apply max-w-sm mx-auto;

    &-label {
      @apply ml-2 block text-sm font-medium;
    }
    &-input {
      @apply flex flex-row justify-start items-center mr-4;
      @apply cursor-pointer p-2 rounded-xl;
    }
  }
}
.radio-list__row {
  @apply flex flex-row justify-start items-center;
}
.radio-list__col {
  @apply flex flex-col justify-start items-start;
}
</style>