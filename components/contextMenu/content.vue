<script setup>
import { inject, ref, onMounted, computed } from "vue";

defineOptions({ name: "ContextMenuContent" });

const { showMenu, position, closeMenu } = inject("context-menu");
const menuRef = ref(null);

const adjustedPosition = computed(() => {
  if (!menuRef.value) return { top: position.value.y, left: position.value.x };

  const menu = menuRef.value;
  const menuRect = menu.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;

  let top = position.value.y;
  let left = position.value.x;

  // Adjust vertical position
  if (top + menuRect.height > windowHeight) {
    top = Math.max(0, windowHeight - menuRect.height);
  }

  // Adjust horizontal position
  if (left + menuRect.width > windowWidth) {
    left = Math.max(0, windowWidth - menuRect.width);
  }

  return { top, left };
});
</script>

<template>
  <Transition name="fade">
    <div
      v-if="showMenu"
      ref="menuRef"
      class="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
      :style="{
        position: 'fixed',
        top: `${adjustedPosition.top}px`,
        left: `${adjustedPosition.left}px`,
      }"
    >
      <slot />
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
