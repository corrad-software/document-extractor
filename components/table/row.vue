<script setup>
defineOptions({ name: "TableRow" });
</script>

<template>
  <tr class="border-b transition-colors hover:bg-muted/50">
    <slot />
  </tr>
</template>
