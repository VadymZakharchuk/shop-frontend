<template>
  <div class="cabinet-page">
    <div class="cabinet-page__wrap">
      <div class="cabinet-page__menu">
        <CabinetMenu @click="handleClick" />
      </div>
      <div class="cabinet-page__details">
        <component :is="activeComponent" />
      </div>
    </div>
  </div>
</template>

<script setup>
import CabinetMenu from "@/components/ui/CabinetMenu.vue";
import { markRaw, ref} from "vue";
import Profile from '@/components/cabinet/profile.vue'
import Orders from '@/components/cabinet/orders.vue'
import Messages from '@/components/cabinet/messages.vue'
import Offers from '@/components/cabinet/listItems.vue'
import Favourites from '@/components/cabinet/listItems.vue'
import Logout from '@/components/cabinet/logout.vue'

const activeComponent =  ref(null)

const handleClick = (item) => {
  const components = [
    Profile,
    Orders,
    Messages,
    Favourites,
    Offers,
    Logout,
  ]
  activeComponent.value = markRaw(components[item.component]);
}
handleClick({ component: 0 } )

</script>

<style scoped lang="scss">
.cabinet-page {
  @apply w-full h-fit min-h-screen flex flex-row items-start justify-start;
  @apply text-black text-lg font-roboto py-12 px-[116px];

  &__wrap {
    @apply w-full h-fit min-h-screen flex flex-row items-start justify-start;
  }

  &__menu {
    @apply w-[1/5] h-fit min-h-screen flex flex-col items-start justify-start;
  }

  &__details {
    @apply w-[4/5] h-fit min-h-screen flex flex-col items-start justify-start;
  }
}
</style>