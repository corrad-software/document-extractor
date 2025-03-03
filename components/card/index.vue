<script setup>
defineOptions({
  name: "Card",
});

const props = defineProps({
  variant: {
    type: String,
    default: "default",
    validator: (value) => ["default", "muted", "accent"].includes(value),
  },
});

const baseClasses = "rounded-lg border ";

const variantClasses = {
  default: "bg-card text-card-foreground",
  muted: "bg-muted text-muted-foreground",
  accent: "bg-accent text-accent-foreground",
};

const cardClasses = computed(() => {
  return `${baseClasses} ${variantClasses[props.variant]}`;
});
</script>

<template>
  <div :class="cardClasses">
    <slot />
  </div>
</template>
