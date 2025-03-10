<template>
  <div class="cabinet-menu">
    <div class="cabinet-menu__title">
      <h1>Cabinet Menu</h1>
    </div>

    <div class="cabinet-menu__list">
      <a
        v-for="item in menu"
        :key="item.key"
        class="cabinet-menu__list-item"
        @click="handleClick(item)"
      >
        {{ item.title }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useI18n } from "vue-i18n";
const $emit = defineEmits(["click"]);
const { t } = useI18n({
  messages: {
    "en": {
      "profile": "Profile",
      "orders": "Orders",
      "messages": "Messages",
      "favourites": "Favorites",
      "persOffers": "Personal offers",
      "logout": "Logout",
    },
    "uk": {
      "profile": "Профіль",
      "orders": "Замовлення",
      "messages": "Повідомлення",
      "favourites": "Список бажань",
      "persOffers": "Персональні пропозиції",
      "logout": "Вийти",
  }
}
})

const menu = reactive([
  { title: t('profile'), component: 0, key: "profile" },
  { title: t('orders'), component: 1, key: "orders" },
  { title: t('messages'), component: 2, key: "messages" },
  { title: t('favourites'), component: 3, key: "favs" },
  { title: t('persOffers'), component: 4, key: "offers" },
  { title: t('logout'), component: 5, key: "logout" },
])

const handleClick = (item) => {
  $emit('click', item)
}
</script>

<style scoped lang="scss">
.cabinet-menu {
  @apply w-full h-fit min-h-screen flex flex-col items-start justify-start;
  @apply text-black text-lg font-roboto px-[116px];
  &__title {
    @apply text-lg  ;
  }
  &__list {
    @apply w-full h-fit min-h-screen flex flex-col items-start justify-start;
  }
  &__list-item {
    @apply w-full flex flex-col items-start justify-start;
    & a {
      @apply text-black text-lg font-roboto py-12 px-[116px];
    }
  }
}
</style>