<script setup>
defineOptions({ name: "TableHeader" });
</script>

<template>
  <thead class="[&_tr]:border-b bg-muted/50">
    <slot />
  </thead>
</template>
