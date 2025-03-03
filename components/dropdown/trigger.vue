<script setup>
import { inject } from 'vue';

defineOptions({ name: 'DropdownTrigger' });

const { triggerRef, toggle } = inject('dropdown');
</script>

<template>
  <div ref="triggerRef" @click="toggle">
    <slot />
  </div>
</template> 