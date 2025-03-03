<script setup>
import { useDebounceFn } from "@vueuse/core";
defineOptions({
  name: "AccordionContent",
});

const accordionValue = inject("accordionValue");
const isOpen = inject("isOpen");
const contentRef = ref(null);
const contentHeight = ref("0px");

function updateHeight() {
  if (!contentRef.value) return;

  // Use requestAnimationFrame for smoother animation
  requestAnimationFrame(() => {
    const height = contentRef.value.scrollHeight;
    contentHeight.value = isOpen(accordionValue) ? `${height}px` : "0px";
  });
}

// Debounce the resize handler for better performance
const debouncedResize = useDebounceFn(updateHeight, 100);

// Use MutationObserver to watch for content changes
let observer;

onMounted(() => {
  updateHeight();
  window.addEventListener("resize", debouncedResize);

  // Create MutationObserver to watch for content changes
  observer = new MutationObserver(updateHeight);
  if (contentRef.value) {
    observer.observe(contentRef.value, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", debouncedResize);
  if (observer) {
    observer.disconnect();
  }
});

// Watch for isOpen changes with optimized timing
watch(
  () => isOpen(accordionValue),
  () => {
    nextTick(updateHeight);
  },
  { immediate: true }
);
</script>

<template>
  <div
    class="accordion-content overflow-hidden will-change-[height]"
    :style="{
      height: contentHeight,
      '--content-height': contentHeight,
    }"
  >
    <div ref="contentRef" class="pb-4 pt-0">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.accordion-content {
  transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateZ(0); /* Hardware acceleration */
}
</style>
