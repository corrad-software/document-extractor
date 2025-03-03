<script setup>
defineOptions({
  name: "Alert",
});

const props = defineProps({
  variant: {
    type: String,
    default: "default",
    validator: (value) =>
      ["default", "danger", "success", "warning", "info"].includes(value),
  },
});

const icons = {
  default: "ph:bell",
  danger: "ph:warning-octagon",
  success: "ph:check-circle",
  warning: "ph:warning-diamond",
  info: "ph:info",
};

const baseClasses = "relative w-full rounded-lg border p-4";

const variantClasses = {
  default: "bg-background text-foreground border-[rgb(var(--border))]",
  danger:
    "border-[rgb(var(--danger))] text-[rgb(var(--danger))] dark:border-[rgb(var(--danger))]",
  success:
    "border-[rgb(var(--success))] text-[rgb(var(--success))] dark:border-[rgb(var(--success))]",
  warning:
    "border-[rgb(var(--warning))] text-[rgb(var(--warning))] dark:border-[rgb(var(--warning))]",
  info: "border-[rgb(var(--info))] text-[rgb(var(--info))] dark:border-[rgb(var(--info))]",
};

const alertClasses = computed(() => {
  return `${baseClasses} ${variantClasses[props.variant]}`;
});
</script>

<template>
  <div :class="alertClasses" role="alert">
    <div class="flex items-start gap-4">
      <Icon v-if="icons[variant]" :name="icons[variant]" class="h-5 w-5 mt-1" />
      <div class="flex-1">
        <slot />
      </div>
    </div>
  </div>
</template>
