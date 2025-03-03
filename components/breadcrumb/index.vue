<script setup>
defineOptions({
  name: "Breadcrumb",
});

const props = defineProps({
  separator: {
    type: String,
    default: "/",
  },
  separatorIcon: {
    type: String,
    default: "",
  },
});

const slots = useSlots();
const items = computed(() => {
  const defaultSlot = slots.default?.() || [];
  return defaultSlot.filter((slot) => slot.type?.name === "BreadcrumbItem");
});
</script>

<template>
  <nav aria-label="Breadcrumb">
    <ol class="flex items-center">
      <template v-for="(item, index) in items" :key="index">
        <component :is="item" />
        <li
          v-if="index < items.length - 1"
          class="mx-2 select-none text-sm text-muted-foreground"
        >
          <Icon
            v-if="separatorIcon"
            :name="separatorIcon"
            class="h-3 w-3"
            aria-hidden="true"
          />
          <span v-else aria-hidden="true">{{ separator }}</span>
        </li>
      </template>
    </ol>
  </nav>
</template>
