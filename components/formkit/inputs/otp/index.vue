<script setup>
import { computed, ref, nextTick } from "vue";

const props = defineProps({
  context: {
    type: Object,
    required: true,
  },
});

const digits = ref([]);
const inputs = ref([]);

// Create an array of empty strings based on length
const length = computed(() => props.context.length || 6);

// Initialize digits array when component mounts
onMounted(() => {
  digits.value = Array(length.value).fill("");
});

// Update the FormKit value when digits change
watch(
  digits,
  (newDigits) => {
    const value = newDigits.join("");
    props.context.node.input(value);
  },
  { deep: true }
);

// Handle input on each digit
const handleInput = async (index, event) => {
  const value = event.target.value;
  const lastChar = value.slice(-1);

  // Only allow numbers
  if (!/^\d*$/.test(lastChar)) {
    digits.value[index] = "";
    return;
  }

  // Update the digit
  digits.value[index] = lastChar;

  // Move to next input if available
  if (lastChar && index < length.value - 1) {
    await nextTick();
    inputs.value[index + 1]?.focus();
  }
};

// Handle backspace
const handleKeydown = async (index, event) => {
  if (event.key === "Backspace" && !digits.value[index]) {
    // Move to previous input if current is empty
    if (index > 0) {
      await nextTick();
      inputs.value[index - 1]?.focus();
      digits.value[index - 1] = "";
    }
  }
};

// Handle paste
const handlePaste = (event) => {
  event.preventDefault();
  const pastedData = event.clipboardData.getData("text");
  const numbers = pastedData.replace(/\D/g, "").split("");

  numbers.forEach((num, index) => {
    if (index < length.value) {
      digits.value[index] = num;
    }
  });

  // Focus the next empty input or the last input
  const nextEmptyIndex = digits.value.findIndex((d) => !d);
  const focusIndex = nextEmptyIndex === -1 ? length.value - 1 : nextEmptyIndex;
  inputs.value[focusIndex]?.focus();
};
</script>

<template>
  <div :class="context.classes.inner" @paste="handlePaste">
    <template v-for="(digit, index) in length" :key="index">
      <input
        ref="inputs"
        type="text"
        inputmode="numeric"
        :value="digits[index]"
        :class="context.classes.digit"
        :disabled="context.disabled"
        :aria-label="`Digit ${index + 1}`"
        @input="handleInput(index, $event)"
        @keydown="handleKeydown(index, $event)"
        maxlength="1"
      />
    </template>
  </div>
</template>
