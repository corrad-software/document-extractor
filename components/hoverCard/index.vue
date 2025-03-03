<script setup>
import { provide, ref, watch, onBeforeUnmount } from 'vue';

defineOptions({ name: 'HoverCard' });

const isOpen = ref(false);
const position = ref({ x: 0, y: 0 });
const triggerRef = ref(null);
const isHoveringTrigger = ref(false);
const isHoveringContent = ref(false);
const originalOverflow = ref('');

const lockScroll = () => {
  originalOverflow.value = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
};

const unlockScroll = () => {
  document.body.style.overflow = originalOverflow.value;
};

// Watch for changes in isOpen to handle scroll locking
watch(isOpen, (newValue) => {
  if (newValue) {
    lockScroll();
  } else {
    unlockScroll();
  }
});

const show = () => {
  if (triggerRef.value) {
    const rect = triggerRef.value.getBoundingClientRect();
    position.value = {
      x: rect.left,
      y: rect.bottom + 4,
    };
    isOpen.value = true;
  }
};

const hide = () => {
  // Only hide if neither trigger nor content is being hovered
  if (!isHoveringTrigger.value && !isHoveringContent.value) {
    isOpen.value = false;
  }
};

const setIsHoveringTrigger = (value) => {
  isHoveringTrigger.value = value;
  if (!value && !isHoveringContent.value) {
    hide();
  }
};

const setIsHoveringContent = (value) => {
  isHoveringContent.value = value;
  if (!value && !isHoveringTrigger.value) {
    hide();
  }
};

provide('hover-card', {
  isOpen,
  position,
  triggerRef,
  show,
  hide,
  setIsHoveringContent,
  setIsHoveringTrigger,
});

// Cleanup on component destruction
onBeforeUnmount(() => {
  if (isOpen.value) {
    unlockScroll();
  }
});
</script>

<template>
  <div class="relative inline-block">
    <slot />
  </div>
</template> 