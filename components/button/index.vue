<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (value) =>
      [
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "danger",
        "outline",
        "ghost",
      ].includes(value),
  },
  size: {
    type: String,
    default: "default",
    validator: (value) => ["default", "sm", "lg", "icon"].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "button",
    validator: (value) => ["button", "submit", "reset"].includes(value),
  },
});

const baseClasses = `
  inline-flex items-center justify-center rounded-md text-sm font-medium
  ring-offset-background transition-colors
  focus-visible:outline-none focus-visible:ring-1
  focus-visible:ring-ring focus-visible:ring-offset-0
  disabled:pointer-events-none disabled:opacity-50
`;

const variantClasses = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
  info: "bg-info text-info-foreground hover:bg-info/90",
  success: "bg-success text-success-foreground hover:bg-success/90",
  warning: "bg-warning text-warning-foreground hover:bg-warning/90",
  danger: "bg-danger text-danger-foreground hover:bg-danger/90",
  outline:
    "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
  ghost: "hover:bg-accent hover:text-accent-foreground",
};

const sizeClasses = {
  default: "h-9 px-4 py-2",
  sm: "h-8 rounded-md px-3",
  lg: "h-10 rounded-md px-8",
  icon: "h-9 w-9",
};

const buttonClasses = computed(() => {
  return `${baseClasses} ${variantClasses[props.variant]} ${
    sizeClasses[props.size]
  }`;
});
</script>

<template>
  <button :class="buttonClasses" :disabled="disabled" :type="type">
    <slot />
  </button>
</template>
