<script setup>
import { inject, ref, computed } from "vue";

defineOptions({ name: "PopoverContent" });

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
  sideOffset: {
    type: Number,
    default: 4,
  },
  alignOffset: {
    type: Number,
    default: 0,
  },
});

const { isOpen, position, triggerRef } = inject("popover");
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
  let adjustedSide = props.side;

  // Check available space in all directions
  const spaceAbove = triggerRect.top;
  const spaceBelow = windowHeight - triggerRect.bottom;
  const spaceLeft = triggerRect.left;
  const spaceRight = windowWidth - triggerRect.right;

  // Automatically switch sides if there's not enough space
  if (
    adjustedSide === "bottom" &&
    spaceBelow < contentRect.height &&
    spaceAbove > spaceBelow
  ) {
    adjustedSide = "top";
  } else if (
    adjustedSide === "top" &&
    spaceAbove < contentRect.height &&
    spaceBelow > spaceAbove
  ) {
    adjustedSide = "bottom";
  } else if (
    adjustedSide === "right" &&
    spaceRight < contentRect.width &&
    spaceLeft > spaceRight
  ) {
    adjustedSide = "left";
  } else if (
    adjustedSide === "left" &&
    spaceLeft < contentRect.width &&
    spaceRight > spaceLeft
  ) {
    adjustedSide = "right";
  }

  // Position based on adjusted side
  switch (adjustedSide) {
    case "top":
      y = triggerRect.top - contentRect.height - props.sideOffset;
      break;
    case "right":
      x = triggerRect.right + props.sideOffset;
      break;
    case "bottom":
      y = triggerRect.bottom + props.sideOffset;
      break;
    case "left":
      x = triggerRect.left - contentRect.width - props.sideOffset;
      break;
  }

  // Adjust alignment
  switch (props.align) {
    case "start":
      if (adjustedSide === "top" || adjustedSide === "bottom") {
        x = triggerRect.left + props.alignOffset;
      } else {
        y = triggerRect.top + props.alignOffset;
      }
      break;
    case "center":
      if (adjustedSide === "top" || adjustedSide === "bottom") {
        x =
          triggerRect.left +
          triggerRect.width / 2 -
          contentRect.width / 2 +
          props.alignOffset;
      } else {
        y =
          triggerRect.top +
          triggerRect.height / 2 -
          contentRect.height / 2 +
          props.alignOffset;
      }
      break;
    case "end":
      if (adjustedSide === "top" || adjustedSide === "bottom") {
        x = triggerRect.right - contentRect.width + props.alignOffset;
      } else {
        y = triggerRect.bottom - contentRect.height + props.alignOffset;
      }
      break;
  }

  // Ensure the content stays within viewport bounds with padding
  const VIEWPORT_PADDING = 8;

  if (x + contentRect.width > windowWidth - VIEWPORT_PADDING) {
    x = windowWidth - contentRect.width - VIEWPORT_PADDING;
  }
  if (x < VIEWPORT_PADDING) {
    x = VIEWPORT_PADDING;
  }
  if (y + contentRect.height > windowHeight - VIEWPORT_PADDING) {
    y = windowHeight - contentRect.height - VIEWPORT_PADDING;
  }
  if (y < VIEWPORT_PADDING) {
    y = VIEWPORT_PADDING;
  }

  return { x, y, adjustedSide };
});
</script>

<template>
  <Transition name="popover">
    <div
      v-if="isOpen"
      ref="contentRef"
      class="popover-content absolute z-50 min-w-[8rem] rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in"
      :class="{
        'slide-in-from-top-2': adjustedPosition.adjustedSide === 'bottom',
        'slide-in-from-right-2': adjustedPosition.adjustedSide === 'left',
        'slide-in-from-left-2': adjustedPosition.adjustedSide === 'right',
        'slide-in-from-bottom-2': adjustedPosition.adjustedSide === 'top',
      }"
      :style="{
        position: 'fixed',
        top: `${adjustedPosition.y}px`,
        left: `${adjustedPosition.x}px`,
      }"
    >
      <slot />
    </div>
  </Transition>
</template>

<style scoped>
.popover-enter-active,
.popover-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.popover-enter-from,
.popover-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.slide-in-from-top-2 {
  animation: slideInFromTop 0.2s ease;
}

.slide-in-from-right-2 {
  animation: slideInFromRight 0.2s ease;
}

.slide-in-from-bottom-2 {
  animation: slideInFromBottom 0.2s ease;
}

.slide-in-from-left-2 {
  animation: slideInFromLeft 0.2s ease;
}

@keyframes slideInFromTop {
  from {
    opacity: 0;
    transform: translateY(-0.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInFromRight {
  from {
    opacity: 0;
    transform: translateX(0.5rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInFromBottom {
  from {
    opacity: 0;
    transform: translateY(0.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-0.5rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
