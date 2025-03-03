<script setup>
defineOptions({
  name: "AvatarGroup",
});

const props = defineProps({
  max: {
    type: Number,
    default: 4,
  },
});

const slots = useSlots();
const avatars = computed(() => {
  const defaultSlot = slots.default?.() || [];
  return defaultSlot.filter((slot) => slot.type?.name === "Avatar");
});

const visibleAvatars = computed(() => {
  return avatars.value.slice(0, props.max);
});

const remainingCount = computed(() => {
  return Math.max(0, avatars.value.length - props.max);
});
</script>

<template>
  <div class="flex -space-x-2">
    <template v-for="(avatar, index) in visibleAvatars" :key="index">
      <div class="ring-2 ring-background">
        <component :is="avatar" />
      </div>
    </template>
    <div
      v-if="remainingCount > 0"
      class="relative flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm ring-2 ring-background"
    >
      +{{ remainingCount }}
    </div>
  </div>
</template>
