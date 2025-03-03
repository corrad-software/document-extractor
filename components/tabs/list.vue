<script setup>
import { inject, computed } from 'vue';

defineOptions({ name: 'TabsList' });

const { orientation } = inject('tabs');

const listClasses = computed(() => {
  const baseClasses = 'inline-flex items-center justify-center rounded-[var(--radius)] bg-muted p-1 text-muted-foreground';
  
  if (orientation === 'responsive') {
    return [
      baseClasses,
      'h-10 w-full space-x-1',
      'md:h-fit md:w-full md:flex-col md:space-x-0 md:space-y-1'
    ];
  }
  
  return [
    baseClasses,
    orientation === 'vertical'
      ? 'flex-col h-fit w-full space-y-1'
      : 'h-10 w-full space-x-1'
  ];
});
</script>

<template>
  <div :class="listClasses">
    <slot />
  </div>
</template> 