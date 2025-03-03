<script setup>
import { inject } from "vue";

defineOptions({ name: "ContextMenuItem" });

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  inset: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);
const { closeMenu } = inject("context-menu");

const handleClick = () => {
  if (!props.disabled) {
    emit("click");
    closeMenu();
  }
};
</script>

<template>
  <div
    :class="[
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
      'focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground',
      inset && 'pl-8',
      disabled ? 'pointer-events-none opacity-50' : 'cursor-pointer',
    ]"
    @click="handleClick"
  >
    <slot />
  </div>
</template>
