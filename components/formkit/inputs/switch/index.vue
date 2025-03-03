<script setup>
import { computed } from "vue";

const props = defineProps({
  context: {
    type: Object,
    required: true,
  },
});

const checked = computed({
  get: () => props.context.value ?? false,
  set: (value) => props.context.node.input(value),
});

const id = computed(() => props.context.id);

// Handle keyboard events for accessibility
const handleKeyDown = (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    checked.value = !checked.value;
  }
};
</script>

<template>
  <button
    type="button"
    role="switch"
    :id="id"
    :aria-checked="checked"
    :disabled="context.disabled"
    :tabindex="context.disabled ? -1 : 0"
    class="relative inline-flex h-[20px] w-[36px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
    :class="[checked ? 'bg-primary' : 'bg-muted']"
    @click="checked = !checked"
    @keydown="handleKeyDown"
  >
    <span
      aria-hidden="true"
      class="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-background shadow-lg ring-0 transition duration-200 ease-in-out"
      :class="[checked ? 'translate-x-4' : 'translate-x-0']"
    />
  </button>
</template> 