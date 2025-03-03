<script setup>
defineOptions({
  name: "BreadcrumbItem",
});

const props = defineProps({
  href: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <li class="inline-flex items-center">
    <NuxtLink
      v-if="href && !disabled"
      :to="href"
      class="text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <slot />
    </NuxtLink>
    <span v-else class="text-sm text-foreground">
      <slot />
    </span>
  </li>
</template>
