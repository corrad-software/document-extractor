<script setup>
defineOptions({
  name: "AccordionTrigger",
});

const accordionValue = inject("accordionValue");
const isOpen = inject("isOpen");
const toggle = inject("toggle");
</script>

<template>
  <button
    type="button"
    @click="toggle(accordionValue)"
    class="flex flex-1 w-full items-center justify-between py-4 text-sm font-medium transition-all hover:underline"
    :data-state="isOpen(accordionValue) ? 'open' : 'closed'"
  >
    <slot />
    <Icon
      name="ph:caret-down"
      class="h-4 w-4 shrink-0 text-[rgb(var(--foreground))] transition-transform duration-300"
      :class="{ 'rotate-180': isOpen(accordionValue) }"
    />
  </button>
</template>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>
