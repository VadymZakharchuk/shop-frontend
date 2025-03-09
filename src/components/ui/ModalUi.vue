<template>
  <Teleport to="body">
    <div
      class="modal"
      @click="closeModal"
    >
      <div
        class="modal-content"
        @click.stop
      >
        <div
          v-if="$slots.title"
          class="title"
        >
          <slot name="title" />
          <IconClose
            class="title-close"
            @click="closeModal"
          />
        </div>
        <slot name="body" />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import IconClose from "@/components/ui/icons/IconClose.vue";

const $emit = defineEmits(["close"])
function closeModal() {
  $emit("close");
}
</script>

<style scoped lang="scss">
.modal {
  @apply fixed left-0 top-0 right-0 bottom-0;
  @apply flex items-center justify-center z-10;
}
.modal-content {
  @apply relative max-w-[600px] w-full p-3 m-2;
  @apply bg-white rounded-lg;
}
.title {
  @apply font-semibold text-cyan-800 text-xl text-center py-4;
  &-close {
    @apply w-8 h-8 cursor-pointer;
    @apply absolute top-2 right-2;
  }
}
</style>