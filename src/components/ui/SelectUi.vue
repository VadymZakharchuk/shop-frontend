<template>
  <div class="select-ui">
    <div class="select-ui__legend">
      {{ legend }}
    </div>
    <a
      class="select-ui__select"
      @click="handleSelectClick"
    >
      {{ selectedItem[`${field}`] }}
      <div
        :class="{ 'hidden': !isCollapsed }"
        class="select-ui__list"
      >
        <div
          v-for="item in items"
          :key="item.value"
          class="select-ui__list-item"
          @click="handleSelectItemClick(item)"
        >
          {{ item[`${field}`] }}
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        :class="isCollapsed ? 'transform rotate-180' : 'transform rotate-0'"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
        />
      </svg>
    </a>
  </div>
</template>

<script setup>
import { ref} from "vue";
const $emit = defineEmits(['selected'])
const $props = defineProps({
  legend: {
    type: String,
    default: ''
  },
  items: {
    type: Array,
    default: () => []
  },
  field: {
    type: String,
    default: 'name'
  },
  selected: {
    type: Object,
    default: () => {}
  }
})
const selectedItem = ref($props.selected)
const isCollapsed = ref(false)
const handleSelectClick = (event) => {
  if (event.target.tagName === 'A')  isCollapsed.value = !isCollapsed.value
}
const handleSelectItemClick = (item) => {
  selectedItem.value = item
  isCollapsed.value = false
  $emit('selected', item)
}
</script>

<style scoped lang="scss">
.select-ui {
  @apply block w-full;

  &__legend {
    @apply block mb-2 text-base font-medium text-choice-normal w-full;
  }

  &__select {
    @apply h-9 border border-gray-300 text-choice-normal text-base rounded-lg w-full px-4 focus:outline-none;
    @apply relative flex items-center justify-between shadow-md  bg-white cursor-pointer;
  }
  &__list {
    @apply absolute top-10 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-md;

    &-item {
      @apply py-2 px-4 text-base text-choice-normal cursor-pointer;
      @apply hover:bg-gray-100;
    }
  }
}
</style>
