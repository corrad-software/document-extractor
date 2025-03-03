<script setup>
import { inject, computed } from 'vue';

defineOptions({ name: 'StepperItem' });

const props = defineProps({
  step: {
    type: Number,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const stepper = inject('stepper');

const status = computed(() => {
  if (!stepper) return 'pending';
  if (stepper.currentStep.value === props.step) return 'current';
  if (stepper.currentStep.value > props.step) return 'complete';
  return 'pending';
});

const orientation = computed(() => stepper?.orientation || 'horizontal');
</script>

<template>
  <div
    :class="[
      'relative flex',
      orientation === 'horizontal' ? 'items-center' : 'flex-col',
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
    ]"
    :data-status="status"
  >
    <slot />
  </div>
</template> 