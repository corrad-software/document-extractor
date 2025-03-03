<script setup>
import { Splide } from "@splidejs/vue-splide";
import "@splidejs/splide/css";

defineOptions({
  name: "Carousel",
});

const props = defineProps({
  autoplay: {
    type: Boolean,
    default: false,
  },
  interval: {
    type: Number,
    default: 5000,
  },
  wrap: {
    type: Boolean,
    default: true,
  },
  controls: {
    type: Boolean,
    default: true,
  },
  indicators: {
    type: Boolean,
    default: true,
  },
});

const options = computed(() => ({
  type: props.wrap ? "loop" : "slide",
  autoplay: true,
  interval: 3000,
  arrows: props.controls,
  pagination: props.indicators,
  pauseOnHover: false,
  pauseOnFocus: false,
  resetProgress: false,
  speed: 800,
  easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  rewind: true,
  rewindSpeed: 800,
  lazyLoad: "nearby",
  transition: "slide",
  drag: true,
  snap: true,
  gap: "1rem",
}));

</script>

<template>
  <Splide :options="options" class="relative w-full overflow-hidden rounded-lg">
    <slot />
  </Splide>
</template>

<style lang="scss" scoped>
:deep(.splide__arrow) {
  @apply rounded-full bg-background/50 backdrop-blur-sm;
  @apply hover:bg-background/70;
}

:deep(.splide__arrow svg) {
  @apply fill-primary transition-transform duration-300;
  @apply h-4 w-4;
}

:deep(.splide__pagination) {
  @apply bottom-4 transition-opacity duration-300 z-10;
}

:deep(.splide__pagination__page) {
  @apply h-3 w-3 bg-white/50 transition-all duration-300 mx-1;
  @apply hover:scale-125 hover:bg-white;
}

:deep(.splide__pagination__page.is-active) {
  @apply bg-white scale-125;
}

:deep(.splide__track) {
  @apply overflow-hidden;
}

:deep(.splide__slide) {
  @apply transition-transform duration-500 ease-in-out;
  transform-origin: center center;
}

:deep(.splide__slide.is-active) {
  @apply z-10;
}

:deep(.splide__slide:not(.is-active)) {
  @apply z-0;
}
</style>
