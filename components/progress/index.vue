<script setup>
defineOptions({ name: "Progress" });

const props = defineProps({
  value: {
    type: Number,
    required: true,
    validator: (value) => value >= 0 && value <= 100,
  },
  size: {
    type: String,
    default: "default",
    validator: (value) => ["sm", "default", "lg"].includes(value),
  },
  showValue: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: "default",
    validator: (value) =>
      ["default", "success", "info", "warning", "danger"].includes(value),
  },
  animated: {
    type: Boolean,
    default: true,
  },
  striped: {
    type: Boolean,
    default: false,
  },
});

const sizeClasses = {
  sm: "!h-2",
  default: "!h-4",
  lg: "!h-6",
};

const variantClasses = {
  default: "bg-primary",
  success: "bg-[rgb(var(--success))]",
  info: "bg-[rgb(var(--info))]",
  warning: "bg-[rgb(var(--warning))]",
  danger: "bg-[rgb(var(--danger))]",
};

const textVariantClasses = {
  default: "!text-primary-foreground",
  success: "!text-[rgb(var(--success-foreground))]",
  info: "!text-[rgb(var(--info-foreground))]",
  warning: "!text-[rgb(var(--warning-foreground))]",
  danger: "!text-[rgb(var(--danger-foreground))]",
};

const progressClasses = computed(() => {
  return [
    sizeClasses[props.size],
    variantClasses[props.variant],
    {
      "animate-progress": props.animated,
      "bg-striped": props.striped,
    },
  ];
});

const valueStyles = computed(() => ({
  width: `${props.value}%`,
  transition: props.animated ? "width 0.3s ease-in-out" : "none",
}));
</script>

<template>
  <div class="relative w-full">
    <div
      class="relative h-full w-full overflow-hidden rounded-full bg-secondary"
      role="progressbar"
      :aria-valuenow="value"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div
        :class="progressClasses"
        class="h-full w-full flex-1 rounded-full transition-all"
        :style="valueStyles"
      />
    </div>
    <div
      v-if="showValue"
      class="absolute inset-0 flex items-center justify-center text-xs font-medium"
      :class="textVariantClasses[variant]"
    >
      {{ value }}%
    </div>
  </div>
</template>

<style scoped>
.bg-striped {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
}

.animate-progress {
  animation: progress-animation 1s linear infinite;
}

@keyframes progress-animation {
  from {
    background-position: 1rem 0;
  }
  to {
    background-position: 0 0;
  }
}

/* Ensure text is visible on all backgrounds */
.text-xs {
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  color: white;
}
</style>
