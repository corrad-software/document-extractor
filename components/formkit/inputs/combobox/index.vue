<script setup>
import { ref, computed, onMounted, shallowRef } from "vue";

const props = defineProps({
  context: {
    type: Object,
    required: true,
  },
});

const isOpen = ref(false);
const searchQuery = ref("");
const selectedItems = ref([]);

// Use shallowRef for options since we don't need deep reactivity
const options = shallowRef([]);

// Cache options on mount
onMounted(() => {
  options.value = props.context.options || [];
});

// Debounced search implementation
let searchTimeout;
const debouncedSearch = (query) => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    searchQuery.value = query;
  }, 150);
};

// Memoize filtered options with more efficient filtering
const filteredOptions = computed(() => {
  const query = searchQuery.value.toLowerCase();
  if (!query) {
    return options.value.filter(
      (option) => !selectedItems.value.includes(option)
    );
  }
  return options.value.filter(
    (option) =>
      !selectedItems.value.includes(option) &&
      option.label.toLowerCase().includes(query)
  );
});

// Handle option selection
const selectOption = (option) => {
  selectedItems.value.push(option);
  props.context.node.input(selectedItems.value);
  searchQuery.value = "";
  isOpen.value = false;
};

// Handle option removal
const removeOption = (optionToRemove) => {
  selectedItems.value = selectedItems.value.filter(
    (option) => option !== optionToRemove
  );
  props.context.node.input(selectedItems.value);
};

// Handle input focus
const handleFocus = () => {
  isOpen.value = true;
};

// Handle input blur
const handleBlur = (event) => {
  // Check if the related target is within the component
  if (!event.relatedTarget?.closest(".formkit-combobox")) {
    isOpen.value = false;
  }
};

// Handle keyboard navigation
const handleKeydown = (event) => {
  if (event.key === "Escape") {
    isOpen.value = false;
  } else if (
    event.key === "Backspace" &&
    !searchQuery.value &&
    selectedItems.value.length > 0
  ) {
    removeOption(selectedItems.value[selectedItems.value.length - 1]);
  }
};

// Initialize value from context
if (props.context.value) {
  selectedItems.value = Array.isArray(props.context.value)
    ? props.context.value
    : [props.context.value];
}
</script>

<template>
  <div class="formkit-combobox">
    <!-- Selected items and input container -->
    <div
      :class="[
        context.classes.input,
        context.disabled
          ? 'cursor-not-allowed opacity-50'
          : 'cursor-text hover:/80',
      ]"
      @click="handleFocus"
    >
      <!-- Selected items pills -->
      <span
        v-for="item in selectedItems"
        :key="item.value"
        :class="context.classes.pill"
      >
        {{ item.label }}
        <button
          type="button"
          :class="context.classes.removeButton"
          @click.stop="removeOption(item)"
          :disabled="context.disabled"
        >
          <Icon name="ph:x" :class="context.classes.removeIcon" />
        </button>
      </span>

      <!-- Search input -->
      <div :class="context.classes.inputWrapper">
        <input
          type="text"
          :class="context.classes.searchInput"
          :placeholder="selectedItems.length === 0 ? context.placeholder : ''"
          :value="searchQuery"
          @input="(e) => debouncedSearch(e.target.value)"
          @focus="handleFocus"
          @blur="handleBlur"
          @keydown="handleKeydown"
          :disabled="context.disabled"
        />
        <Icon
          :name="isOpen ? 'ph:caret-up' : 'ph:caret-down'"
          :class="[
            context.classes.caret,
            context.disabled ? 'opacity-30' : 'group-hover:opacity-70',
          ]"
        />
      </div>
    </div>

    <!-- Dropdown -->
    <div
      v-if="isOpen && filteredOptions.length > 0"
      :class="context.classes.dropdown"
    >
      <div :class="context.classes.dropdownInner">
        <button
          v-for="option in filteredOptions"
          :key="option.value"
          :class="context.classes.option"
          @click="selectOption(option)"
          @mousedown.prevent
        >
          {{ option.label }}
        </button>
      </div>
    </div>
  </div>
</template>
