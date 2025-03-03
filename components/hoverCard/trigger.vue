<script setup>
import { inject, onBeforeUnmount } from 'vue';

defineOptions({ name: 'HoverCardTrigger' });

const props = defineProps({
  delay: {
    type: Number,
    default: 200,
  },
});

const { triggerRef, show, setIsHoveringTrigger } = inject('hover-card');

let timeout;

const handleMouseEnter = () => {
  clearTimeout(timeout);
  setIsHoveringTrigger(true);
  timeout = setTimeout(show, props.delay);
};

const handleMouseLeave = () => {
  clearTimeout(timeout);
  setIsHoveringTrigger(false);
};

onBeforeUnmount(() => {
  clearTimeout(timeout);
});
</script>

<template>
  <div
    ref="triggerRef"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <slot />
  </div>
</template> 