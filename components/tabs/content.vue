<script setup>
import { inject, computed } from 'vue';

defineOptions({ name: 'TabsContent' });

const props = defineProps({
  value: {
    type: [String, Number],
    required: true
  }
});

const { activeTab, orientation } = inject('tabs');

const isActive = computed(() => activeTab.value === props.value);

const transitionClasses = computed(() => {
  const baseClasses = 'transition-all duration-300';
  
  if (orientation === 'responsive') {
    return {
      [baseClasses]: true,
      'translate-x-0 opacity-100': isActive.value,
      'translate-x-2 opacity-0': !isActive.value,
      'md:translate-x-0 md:translate-y-0': isActive.value,
      'md:translate-x-0 md:translate-y-2 md:opacity-0': !isActive.value,
      'hidden': !isActive.value
    };
  }
  
  if (orientation === 'vertical') {
    return {
      [baseClasses]: true,
      'translate-y-0 opacity-100': isActive.value,
      'translate-y-2 opacity-0': !isActive.value,
      'hidden': !isActive.value
    };
  }
  
  return {
    [baseClasses]: true,
    'translate-x-0 opacity-100': isActive.value,
    'translate-x-2 opacity-0': !isActive.value,
    'hidden': !isActive.value
  };
});

const contentClasses = computed(() => [
  'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  'mt-2',
  transitionClasses.value
]);
</script>

<template>
  <div
    role="tabpanel"
    :class="contentClasses"
    :tabindex="isActive ? 0 : -1"
    :aria-hidden="!isActive"
  >
    <slot v-if="isActive" />
  </div>
</template>

<style scoped>
[role="tabpanel"] {
  transform-origin: top left;
  will-change: transform, opacity;
}
</style> 