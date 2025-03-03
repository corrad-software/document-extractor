<script setup>
defineOptions({ name: 'Separator' });

const props = defineProps({
  orientation: {
    type: String,
    default: 'horizontal',
    validator: (value) => ['horizontal', 'vertical'].includes(value),
  },
  decorative: {
    type: Boolean,
    default: true,
  },
});

// Compute ARIA attributes based on decorative prop
const ariaAttributes = computed(() => {
  if (props.decorative) {
    return {
      role: 'none',
      'aria-hidden': 'true',
    };
  }
  return {
    role: 'separator',
    'aria-orientation': props.orientation,
  };
});
</script>

<template>
  <div
    v-bind="ariaAttributes"
    :class="[
      'shrink-0 bg-border',
      orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
    ]"
  />
</template> 