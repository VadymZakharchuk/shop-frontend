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
      <div class="relative">
        <IconCart class="menu-icon text-menu-text" />
        <span
          v-if="basketCount"
          class="menu-icon__counter"
        >{{ basketCount }}
        </span>
      </div>
      <RouterLink :to="'/cabinet'">
        <IconUser
          :class="iconUserColor"
          class="menu-icon"
        />
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { categories } from "@/config/categories.js";
import {computed, ref } from "vue";
import { useUserStore } from "@/store/user.js"
import { useBasketStore } from "@/store/basket.js";
import { getCategories } from '@/services/categories.service';
import LangSwitcher from "@/components/ui/LangSwitcher.vue";
import IconCart from "@/components/ui/icons/IconCart.vue";
import IconUser from "@/components/ui/icons/IconUser.vue";

const { locale } = useI18n()
const menuData = computed(() => {
  return categories[`${locale.value}`].map((item) => { item.name = item.name.toUpperCase(); return item; })
})
const userStore = useUserStore();
const basketStore = useBasketStore();

const basketCount = computed(() => {
  const data = basketStore.userBasket
  return data.length
})
const iconUserColor = computed(() => {
  return userStore.isLoggedInAndHasToken
      ? 'text-user-logged'
      : 'text-menu-text'
  }
)

const rubrics = ref([])
async function fetchCategories() { rubrics.value = await getCategories(0, locale.value) }

if (userStore.appRubrics.length === 0) fetchCategories()
else rubrics.value = userStore.appRubrics

</script>

<style scoped lang="scss">
  .main-menu {
    @apply text-3xl text-menu-text font-medium font-roboto;
    @apply flex flex-row justify-between items-center;
    @apply w-full text-xl;

    &__list {
      @apply flex flex-row justify-start items-center;
      &-item {
        @apply cursor-pointer xl:mx-4;
      }
    }
  }
  .menu__item {
    @apply text-menu-text hover:bg-menu-hover-bg hover:rounded-xl p-2;
  }

  .menu-icon {
    @apply cursor-pointer xl:mx-4 h-[24px] w-[24px] relative;
    
    &__counter{
      @apply absolute bg-red-600 text-white w-fit px-1 rounded-full text-xs h-4 bottom-3 right-2 text-center;
    }
  }
</style>
