<script setup>
import { inject, ref, computed, onBeforeUnmount } from "vue";

defineOptions({ name: "HoverCardContent" });

const props = defineProps({
  side: {
    type: String,
    default: "bottom",
    validator: (value) => ["top", "right", "bottom", "left"].includes(value),
  },
  align: {
    type: String,
    default: "center",
    validator: (value) => ["start", "center", "end"].includes(value),
  },
});

const { isOpen, position, triggerRef, hide, setIsHoveringContent } = inject("hover-card");
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

  // Check if there's room below
  const hasSpaceBelow = triggerRect.bottom + contentRect.height <= windowHeight;

  // If no space below, show above
  if (!hasSpaceBelow && props.side === "bottom") {
    y = triggerRect.top - contentRect.height - 8;
  }

  // Adjust based on side with safe area consideration
  if (props.side === "top") {
    y = triggerRect.top - contentRect.height - 8;
  } else if (props.side === "right") {
    x = triggerRect.right + 8;
    y = Math.min(y, triggerRect.bottom - 20);
  } else if (props.side === "left") {
    x = triggerRect.left - contentRect.width - 8;
    y = Math.min(y, triggerRect.bottom - 20);
  } else {
    x = x - 20;
  }

  // Adjust based on alignment
  if (props.align === "start") {
    // No adjustment needed
  } else if (props.align === "center") {
    x = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
  } else if (props.align === "end") {
    x = triggerRect.right - contentRect.width;
  }

  // Ensure the content stays within viewport
  if (x + contentRect.width > windowWidth) {
    x = windowWidth - contentRect.width - 8;
  }
  if (x < 8) x = 8;
  if (y < 8) y = 8;
  if (y + contentRect.height > windowHeight) {
    y = windowHeight - contentRect.height - 8;
  }

  return { x, y };
});

const handleMouseEnter = () => {
  setIsHoveringContent(true);
};

const handleMouseLeave = () => {
  setIsHoveringContent(false);
};

</script>

<template>
  <Transition name="hover-card">
    <div
      v-if="isOpen"
      ref="contentRef"
      class="absolute z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in zoom-in-90"
      :class="{
        'data-[side=bottom]:slide-in-from-top-2': side === 'bottom',
        'data-[side=left]:slide-in-from-right-2': side === 'left',
        'data-[side=right]:slide-in-from-left-2': side === 'right',
        'data-[side=top]:slide-in-from-bottom-2': side === 'top',
      }"
      :style="{
        position: 'fixed',
        top: `${adjustedPosition.y}px`,
        left: `${adjustedPosition.x}px`,
      }"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <slot />
    </div>
  </Transition>
</template>

<style scoped>
.hover-card-enter-active,
.hover-card-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.hover-card-enter-from,
.hover-card-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
