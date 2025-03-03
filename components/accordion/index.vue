<script setup>
defineOptions({
  name: "Accordion",
});

const props = defineProps({
  type: {
    type: String,
    default: "single",
    validator: (value) => ["single", "multiple"].includes(value),
  },
  defaultValue: {
    type: [String, Array],
    default: "",
  },
});

const value = ref(props.defaultValue);

const isOpen = (itemValue) => {
  if (props.type === "single") {
    return value.value === itemValue;
  }
  return Array.isArray(value.value) && value.value.includes(itemValue);
};

const toggle = (itemValue) => {
  if (props.type === "single") {
    value.value = value.value === itemValue ? "" : itemValue;
  } else {
    value.value = Array.isArray(value.value)
      ? value.value.includes(itemValue)
        ? value.value.filter((v) => v !== itemValue)
        : [...value.value, itemValue]
      : [itemValue];
  }
};

provide("isOpen", isOpen);
provide("toggle", toggle);
</script>

<template>
  <div class="divide-y rounded-md">
    <slot />
  </div>
</template>