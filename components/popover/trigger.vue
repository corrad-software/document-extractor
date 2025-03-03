<script setup>
import { inject } from 'vue';

defineOptions({ name: 'PopoverTrigger' });

const { triggerRef, toggle } = inject('popover');
</script>

<template>
  <div ref="triggerRef" @click.stop="toggle">
    <slot />
  </div>
</template> 