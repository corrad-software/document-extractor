<script setup>
defineOptions({ name: "ContextMenuTrigger" });

const props = defineProps({
  as: {
    type: String,
    default: "div",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <component :is="as" class="inline-block">
    <slot />
  </component>
</template>
