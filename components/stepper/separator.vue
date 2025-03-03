<script setup>
import { inject, computed } from 'vue';

defineOptions({ name: 'StepperSeparator' });

const stepper = inject('stepper');
const orientation = computed(() => stepper?.orientation || 'horizontal');
</script>

<template>
  <div
    :class="[
      'transition-colors',
      orientation === 'horizontal' 
        ? 'h-[2px] w-10 bg-border mx-1' 
        : 'w-[2px] h-10 bg-border my-1 ml-4'
    ]"
  />
</template> 