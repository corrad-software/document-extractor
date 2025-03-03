<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  context: {
    type: Object,
    required: true,
  },
});

const input = ref(null);
const inputValue = ref("");

// Get mask pattern from context
const mask = computed(() => props.context.mask || "");

// Format value according to mask
const formatValue = (value) => {
  if (!value) return "";
  
  let formatted = "";
  let valueIndex = 0;
  
  for (let i = 0; i < mask.value.length && valueIndex < value.length; i++) {
    const maskChar = mask.value[i];
    const valueChar = value[valueIndex];

    if (maskChar === "#") {
      // Only allow numbers
      if (/\d/.test(valueChar)) {
        formatted += valueChar;
        valueIndex++;
      }
    } else if (maskChar === "A") {
      // Only allow letters
      if (/[a-zA-Z]/.test(valueChar)) {
        formatted += valueChar;
        valueIndex++;
      }
    } else if (maskChar === "*") {
      // Allow any character
      formatted += valueChar;
      valueIndex++;
    } else {
      // Add mask character
      formatted += maskChar;
      if (valueChar === maskChar) {
        valueIndex++;
      }
    }
  }

  return formatted;
};

// Handle input changes
const handleInput = (event) => {
  const value = event.target.value.replace(/\D+/g, "");
  const formatted = formatValue(value);
  inputValue.value = formatted;
  props.context.node.input(formatted);
};

// Handle keydown for backspace
const handleKeydown = (event) => {
  if (event.key === "Backspace" && input.value) {
    event.preventDefault();
    const selectionStart = input.value.selectionStart;
    const selectionEnd = input.value.selectionEnd;
    
    if (selectionStart === selectionEnd) {
      const value = inputValue.value.slice(0, -1);
      const formatted = formatValue(value.replace(/\D+/g, ""));
      inputValue.value = formatted;
      props.context.node.input(formatted);
    } else {
      const before = inputValue.value.slice(0, selectionStart);
      const after = inputValue.value.slice(selectionEnd);
      const formatted = formatValue((before + after).replace(/\D+/g, ""));
      inputValue.value = formatted;
      props.context.node.input(formatted);
    }
  }
};

// Watch for external value changes
watch(() => props.context.value, (newValue) => {
  if (newValue !== inputValue.value) {
    inputValue.value = formatValue(String(newValue || "").replace(/\D+/g, ""));
  }
}, { immediate: true });
</script>

<template>
  <input
    ref="input"
    type="text"
    :value="inputValue"
    :placeholder="context.placeholder || mask"
    :disabled="context.disabled"
    :class="context.classes.input"
    @input="handleInput"
    @keydown="handleKeydown"
  />
</template> 