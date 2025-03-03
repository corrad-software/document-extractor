<script setup>
import { inject, computed } from "vue";

defineOptions({ name: "TabsTrigger" });

const props = defineProps({
  value: {
    type: [String, Number],
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const { activeTab, updateTab, orientation } = inject("tabs");

const isActive = computed(() => activeTab.value === props.value);

const triggerClasses = computed(() => [
  "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius)] px-3 py-1.5 text-sm font-medium ring-offset-background transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative",
  {
    "w-full": orientation === "vertical",
    "flex-1": orientation === "horizontal",
    "flex-1 md:w-full": orientation === "responsive",
  },
  isActive.value && "bg-background text-foreground shadow",
  !props.disabled && "hover:text-foreground",
]);

const handleClick = () => {
  if (!props.disabled) {
    updateTab(props.value);
  }
};
</script>

<template>
  <button
    type="button"
    role="tab"
    :disabled="disabled"
    :data-state="isActive ? 'active' : 'inactive'"
    :class="triggerClasses"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<style scoped>
button {
  backface-visibility: hidden;
  transform: translateZ(0);
  -webkit-font-smoothing: subpixel-antialiased;
}
</style>
