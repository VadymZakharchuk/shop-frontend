<template>
  <div class="wrapper">
    <div class="content">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.wrapper {
  @apply flex flex-col items-center justify-center;
}
.content {
  @apply bg-white w-[100vw] h-[100vh] flex flex-col items-center justify-center;
}
</style>