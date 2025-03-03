<script setup>
import { provide, ref, watch } from "vue";

defineOptions({ name: "ContextMenu" });

const showMenu = ref(false);
const position = ref({ x: 0, y: 0 });
const originalOverflow = ref('');

const lockScroll = () => {
  originalOverflow.value = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
};

const unlockScroll = () => {
  document.body.style.overflow = originalOverflow.value;
};

// Watch for changes in showMenu to handle scroll locking
watch(showMenu, (newValue) => {
  if (newValue) {
    lockScroll();
  } else {
    unlockScroll();
  }
});

const handleContextMenu = (event) => {
  event.preventDefault();
  showMenu.value = true;
  position.value = {
    x: event.clientX,
    y: event.clientY,
  };
};

const closeMenu = () => {
  showMenu.value = false;
};

// Provide values to child components
provide("context-menu", {
  showMenu,
  position,
  closeMenu,
});

// Close menu when clicking outside
onMounted(() => {
  document.addEventListener("click", closeMenu);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeMenu);
  // Ensure we unlock scroll when component is destroyed
  if (showMenu.value) {
    unlockScroll();
  }
});
</script>

<template>
  <div @contextmenu="handleContextMenu">
    <slot />
  </div>
</template>
