<script setup>
import { SplideSlide } from "@splidejs/vue-splide";

defineOptions({
  name: "CarouselItem",
});
</script>

<template>
  <SplideSlide class="relative h-full">
    <slot />
  </SplideSlide>
</template>
