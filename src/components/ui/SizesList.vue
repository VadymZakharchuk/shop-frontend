<template>
  <div class="sizes-list">
    <form class="max-w-sm mx-auto">
      <label
        for="countries_multiple"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >Select an option</label>
      <select
        id="countries_multiple"
        multiple
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option selected>
          Choose countries
        </option>
        <option value="US">
          United States
        </option>
        <option value="CA">
          Canada
        </option>
        <option value="FR">
          France
        </option>
        <option value="DE">
          Germany
        </option>
      </select>
    </form>
  </div>
</template>

<script setup>
import { computed, ref} from "vue";

const $props = defineProps({
  sizes: {
    type: Array,
    required: true
  }
})
const selectedSizes = ref([])
const eSizes = computed( () => $props.sizes.map(s => {
  const obj = Object.assign({}, s);
  obj.name = s.int
  return obj
}))
</script>

<style scoped lang="scss">
.sizes-list{
  @apply w-full text-blue-600 h-full;
}

</style>