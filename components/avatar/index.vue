<script setup>
defineOptions({
  name: "Avatar",
});

const props = defineProps({
  src: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    required: true,
  },
  fallback: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "default",
    validator: (value) => ["sm", "default", "lg"].includes(value),
  },
});

const hasError = ref(false);
const isLoading = ref(true);

const initials = computed(() => {
  if (props.fallback) {
    return props.fallback.toUpperCase();
  }

  if (!props.alt?.trim()) {
    return 'NA';
  }

  try {
    return props.alt
      .trim()
      .split(/\s+/)
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  } catch (error) {
    console.warn('Error generating initials:', error);
    return 'NA';
  }
});

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  default: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
};

const avatarClasses = computed(() => {
  return `relative flex shrink-0 overflow-hidden rounded-full ${
    sizeClasses[props.size]
  }`;
});

// Reset error state when src changes
watch(
  () => props.src,
  () => {
    hasError.value = false;
    isLoading.value = true;
  }
);
</script>

<template>
  <div :class="avatarClasses">
    <template v-if="src && !hasError">
      <div
        v-show="isLoading"
        class="absolute inset-0 flex items-center justify-center bg-muted"
      >
        <Icon name="ph:spinner" class="h-4 w-4 animate-spin" />
      </div>
      <img
        :src="src"
        :alt="alt"
        @error="hasError = true"
        @load="isLoading = false"
        class="aspect-square h-full w-full transition-opacity duration-300"
        :class="{ 'opacity-0': isLoading, 'opacity-100': !isLoading }"
      />
    </template>
    <span
      v-else
      class="flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground"
    >
      {{ initials }}
    </span>
  </div>
</template>
