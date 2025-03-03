<script setup>
import { inject } from 'vue';

defineOptions({ name: 'TooltipTrigger' });

const { reference, show, hide } = inject('tooltip');
</script>

<template>
  <div
    ref="reference"
    @mouseenter="show"
    @mouseleave="hide"
    @focus="show"
    @blur="hide"
  >
    <slot />
  </div>
</template> 