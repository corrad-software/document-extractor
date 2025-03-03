<script setup>
defineOptions({
  name: "Badge",
});

const props = defineProps({
  variant: {
    type: String,
    default: "default",
    validator: (value) =>
      [
        "default",
        "secondary",
        "info",
        "success",
        "warning",
        "danger",
        "outline",
        "ghost",
      ].includes(value),
  },
});

const baseClasses =
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

const variantClasses = {
  default: "bg-primary text-primary-foreground hover:bg-primary/80",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  info: "bg-info text-info-foreground hover:bg-info/80",
  success: "bg-success text-success-foreground hover:bg-success/80",
  warning: "bg-warning text-warning-foreground hover:bg-warning/80",
  danger: "bg-danger text-danger-foreground hover:bg-danger/80",
  outline:
    "border border-border text-foreground hover:bg-accent hover:text-accent-foreground",
  ghost: "hover:bg-transparent hover:text-foreground",
};

const badgeClasses = computed(() => {
  return `${baseClasses} ${variantClasses[props.variant]}`;
});
</script>

<template>
  <div :class="badgeClasses">
    <slot />
  </div>
</template>
