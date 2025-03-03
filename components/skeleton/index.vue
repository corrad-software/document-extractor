<script setup>
defineOptions({ name: 'Skeleton' });

const props = defineProps({
  className: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'card', 'avatar', 'title', 'text'].includes(value),
  },
  animate: {
    type: Boolean,
    default: true,
  },
});

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'card':
      return 'h-48 w-full rounded-lg';
    case 'avatar':
      return 'h-12 w-12 rounded-full';
    case 'title':
      return 'h-4 w-1/4 rounded-lg';
    case 'text':
      return 'h-4 w-full rounded-lg';
    default:
      return props.className || 'h-4 w-full rounded-lg';
  }
});

const classes = computed(() => [
  'bg-muted animate-pulse',
  variantClasses.value,
  { 'animate-none': !props.animate },
]);
</script>

<template>
  <div :class="classes" />
</template>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}
</style> 