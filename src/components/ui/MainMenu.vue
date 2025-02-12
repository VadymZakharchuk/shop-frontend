<template>
  <div class="main-menu">
    <div class="main-menu__list">
      <span
        v-for="item in menuData"
        :key="item.url"
        class="main-menu__list-item"
      >
        <RouterLink
          :to="item.url"
          class="menu__item"
        > {{ item.name }}</RouterLink>
      </span>
    </div>
    <div class="main-menu__list">
      <LangSwitcher />
      <IconCart class="menu-icon" />
      <RouterLink :to="{ name: `account__${locale}` }">
        <IconUser class="menu-icon" />
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { categories } from "@/config/categories.js";
import {computed, ref} from "vue";
import { getCategories } from '@/services/categories.service';
import LangSwitcher from "@/components/ui/LangSwitcher.vue";
import IconCart from "@/components/ui/icons/IconCart.vue";
import IconUser from "@/components/ui/icons/IconUser.vue";

const { locale } = useI18n()
const menuData = computed(() => {
  return categories[`${locale.value}`].map((item) => { item.name = item.name.toUpperCase(); return item; })
})

const rubrics = ref([])
async function fetchCategories() { rubrics.value = await getCategories() }
fetchCategories()
</script>

<style scoped lang="scss">
  .main-menu {
    @apply text-3xl text-menu-text font-medium;
    @apply flex flex-row justify-between items-center;
    @apply bg-gray-300 px-[96px] text-xl;

    &__list {
      @apply flex flex-row justify-between items-center;
      &-item {
        @apply cursor-pointer xl:mx-4;
      }
    }
  }
  .menu__item {
    @apply text-menu-text hover:bg-menu-hover-bg hover:rounded-xl p-2;
  }

  .menu-icon {
    @apply cursor-pointer xl:mx-4 h-[24px] w-[24px];
  }
</style>
