<script setup>
import { inject, watch } from "vue";

defineOptions({ name: "TooltipContent" });

const props = defineProps({
  side: {
    type: String,
    default: "top",
    validator: (value) => ["top", "right", "bottom", "left"].includes(value),
  },
  sideOffset: {
    type: Number,
    default: 4,
  },
});

const { floating, isOpen, floatingStyles, arrowRef, arrowStyles, placement } =
  inject("tooltip");
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      ref="floating"
      :style="floatingStyles"
      class="z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
      :data-side="placement?.split('-')[0]"
      role="tooltip"
    >
      <slot />
      <div
        ref="arrowRef"
        :style="arrowStyles"
        class="absolute z-[-1] h-2 w-2 rotate-45 bg-popover border"
        :class="{
          '-top-1 border-b border-r': placement?.includes('bottom'),
          '-bottom-1 border-t border-l': placement?.includes('top'),
          '-right-1 border-b border-l': placement?.includes('left'),
          '-left-1 border-t border-r': placement?.includes('right')
        }"
      />
    </div>
  </Transition>
</template>
