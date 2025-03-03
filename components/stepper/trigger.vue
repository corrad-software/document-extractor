<script setup>
import { inject } from 'vue';

defineOptions({ name: 'StepperTrigger' });

const props = defineProps({
  step: {
    type: Number,
    required: true
  }
});

const { updateStep } = inject('stepper');

const handleClick = () => {
  updateStep(props.step);
};
</script>

<template>
  <div
    class="flex items-center gap-2 group"
    role="button"
    @click="handleClick"
  >
    <slot />
  </div>
</template> 