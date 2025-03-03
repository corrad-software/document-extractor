<script setup>
defineOptions({
  name: "AccordionItem",
});

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
});

provide("accordionValue", props.value);
</script>

<template>
  <div class="">
    <slot />
  </div>
</template>
