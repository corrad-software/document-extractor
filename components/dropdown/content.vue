<script setup>
import { inject, ref, computed } from "vue";

defineOptions({ name: "DropdownContent" });

const { isOpen, position, triggerRef } = inject("dropdown");
const contentRef = ref(null);

const adjustedPosition = computed(() => {
  if (!contentRef.value || !triggerRef.value) return position.value;

  const content = contentRef.value;
  const trigger = triggerRef.value;
  const contentRect = content.getBoundingClientRect();
  const triggerRect = trigger.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;

  let { x, y } = position.value;

  // Check if dropdown should appear above instead of below
  const shouldShowAbove = y + contentRect.height > windowHeight;
  if (shouldShowAbove) {
    y = triggerRect.top - contentRect.height - 4; // 4px gap
  }

  // Ensure horizontal alignment stays within bounds
  if (x + contentRect.width > windowWidth) {
    // Align to right edge of trigger
    x = triggerRect.right - contentRect.width;
  }

  // Prevent going off-screen left
  x = Math.max(8, x); // 8px minimum margin

  // Prevent going off-screen top
  y = Math.max(8, y); // 8px minimum margin

  return { x, y };
});
</script>

<template>
  <Transition name="dropdown">
    <div
      v-if="isOpen"
      ref="contentRef"
      class="fixed z-[100] min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
      :style="{
        top: `${adjustedPosition.y}px`,
        left: `${adjustedPosition.x}px`,
      }"
    >
      <slot />
    </div>
  </Transition>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
