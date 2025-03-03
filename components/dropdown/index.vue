<script setup>
import { provide, ref, watch, onMounted, onBeforeUnmount } from 'vue';

defineOptions({ name: 'Dropdown' });

const props = defineProps({
  placement: {
    type: String,
    default: 'bottom'
  }
});

const isOpen = ref(false);
const position = ref({ x: 0, y: 0 });
const triggerRef = ref(null);
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

const toggle = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value && triggerRef.value) {
    const rect = triggerRef.value.getBoundingClientRect();
    
    if (props.placement === 'right') {
      position.value = {
        x: rect.right + 8, // Add small gap
        y: rect.top,
      };
    } else {
      position.value = {
        x: rect.left,
        y: rect.bottom + 4, // Add small gap
      };
    }
  }
};

const close = () => {
  isOpen.value = false;
};

provide('dropdown', {
  isOpen,
  position,
  triggerRef,
  toggle,
  close,
});

onMounted(() => {
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!triggerRef.value?.contains(target)) {
      close();
    }
  });
});

onBeforeUnmount(() => {
  // Ensure we unlock scroll when component is destroyed
  if (isOpen.value) {
    unlockScroll();
  }
});
</script>

<template>
  <div class="relative inline-block text-left z-[100]">
    <slot />
  </div>
</template> 