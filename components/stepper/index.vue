<script setup>
import { provide, ref, watch } from 'vue';

defineOptions({ name: 'Stepper' });

const props = defineProps({
  modelValue: {
    type: Number,
    default: 1
  },
  orientation: {
    type: String,
    default: 'horizontal',
    validator: (value) => ['horizontal', 'vertical'].includes(value)
  }
});

const emit = defineEmits(['update:modelValue']);

const currentStep = ref(props.modelValue);

// Create stepper context
const stepperContext = {
  currentStep,
  updateStep: (step) => {
    currentStep.value = step;
    emit('update:modelValue', step);
  },
  orientation: props.orientation
};

// Provide stepper context to child components
provide('stepper', stepperContext);

// Watch for external changes to modelValue
watch(() => props.modelValue, (newValue) => {
  currentStep.value = newValue;
});
</script>

<template>
  <div
    :class="[
      'flex',
      orientation === 'horizontal' 
        ? 'flex-row items-center space-x-1' 
        : 'flex-col space-y-1'
    ]"
  >
    <slot />
  </div>
</template> 