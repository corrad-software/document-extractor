<script setup>
import { inject, computed } from "vue";

defineOptions({ name: "StepperIndicator" });

const props = defineProps({
  step: {
    type: Number,
    required: true,
  },
});

const { currentStep } = inject("stepper");

const status = computed(() => {
  if (currentStep.value === props.step) return "current";
  if (currentStep.value > props.step) return "complete";
  return "pending";
});
</script>

<template>
  <div
    :class="[
      'flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors',
      status === 'complete' &&
        'bg-primary border-primary text-primary-foreground',
      status === 'current' && 'border-primary text-primary',
      status === 'pending' && ' text-muted-foreground',
    ]"
  >
    <slot />
  </div>
</template>
