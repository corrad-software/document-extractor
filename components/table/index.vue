<script setup>
defineOptions({ name: "Table" });

const props = defineProps({
  hover: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div class="w-full overflow-auto">
    <table class="w-full caption-bottom text-sm">
      <slot />
    </table>
  </div>
</template>
