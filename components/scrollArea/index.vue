<script setup>
import { ref, onMounted, computed } from 'vue';

defineOptions({ name: 'ScrollArea' });

const props = defineProps({
  type: {
    type: String,
    default: 'hover',
    validator: (value) => ['always', 'scroll', 'hover', 'auto'].includes(value),
  },
  orientation: {
    type: String,
    default: 'vertical',
    validator: (value) => ['vertical', 'horizontal', 'both'].includes(value),
  },
  scrollHideDelay: {
    type: Number,
    default: 600,
  },
});

const viewport = ref(null);
const scrollbar = ref(null);
const thumb = ref(null);

let isDragging = false;
let startPosition = { x: 0, y: 0 };
let startScroll = { left: 0, top: 0 };
let hideScrollbarTimeout;

const showScrollbar = ref(props.type === 'always');

const isVertical = computed(() => props.orientation !== 'horizontal');
const isHorizontal = computed(() => props.orientation !== 'vertical');

const handleMouseEnter = () => {
  if (props.type === 'hover') {
    showScrollbar.value = true;
  }
};

const handleMouseLeave = () => {
  if (props.type === 'hover' && !isDragging) {
    showScrollbar.value = false;
  }
};

const handleScroll = () => {
  if (props.type === 'scroll') {
    showScrollbar.value = true;
    clearTimeout(hideScrollbarTimeout);
    hideScrollbarTimeout = setTimeout(() => {
      if (!isDragging) showScrollbar.value = false;
    }, props.scrollHideDelay);
  }
  updateThumbPosition();
};

const updateThumbPosition = () => {
  if (!viewport.value || !thumb.value) return;

  const {
    scrollTop,
    scrollLeft,
    scrollHeight,
    scrollWidth,
    clientHeight,
    clientWidth,
  } = viewport.value;

  if (isVertical.value) {
    const thumbHeight = (clientHeight / scrollHeight) * clientHeight;
    const thumbPosition = (scrollTop / scrollHeight) * clientHeight;
    thumb.value.style.height = `${thumbHeight}px`;
    thumb.value.style.transform = `translateY(${thumbPosition}px)`;
    thumb.value.style.width = '6px';
  }

  if (isHorizontal.value) {
    const thumbWidth = (clientWidth / scrollWidth) * clientWidth;
    const thumbPosition = (scrollLeft / scrollWidth) * clientWidth;
    thumb.value.style.width = `${thumbWidth}px`;
    thumb.value.style.transform = `translateX(${thumbPosition}px)`;
    thumb.value.style.height = '6px';
  }
};

const handleThumbMousedown = (e) => {
  e.preventDefault();
  isDragging = true;
  startPosition = { x: e.clientX, y: e.clientY };
  startScroll = {
    left: viewport.value.scrollLeft,
    top: viewport.value.scrollTop,
  };
  document.addEventListener('mousemove', handleThumbMousemove);
  document.addEventListener('mouseup', handleThumbMouseup);
};

const handleThumbMousemove = (e) => {
  if (!isDragging) return;

  const { scrollHeight, scrollWidth, clientHeight, clientWidth } = viewport.value;
  
  if (isVertical.value) {
    const delta = e.clientY - startPosition.y;
    const scrollFactor = scrollHeight / clientHeight;
    viewport.value.scrollTop = startScroll.top + delta * scrollFactor;
  }

  if (isHorizontal.value) {
    const delta = e.clientX - startPosition.x;
    const scrollFactor = scrollWidth / clientWidth;
    viewport.value.scrollLeft = startScroll.left + delta * scrollFactor;
  }
};

const handleThumbMouseup = () => {
  isDragging = false;
  document.removeEventListener('mousemove', handleThumbMousemove);
  document.removeEventListener('mouseup', handleThumbMouseup);
  if (props.type === 'hover') {
    handleMouseLeave();
  }
};

onMounted(() => {
  updateThumbPosition();
});

onBeforeUnmount(() => {
  clearTimeout(hideScrollbarTimeout);
});
</script>

<template>
  <div
    class="relative"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      ref="viewport"
      class="scrollarea-viewport h-full w-full overflow-auto"
      :class="{
        'overflow-y-auto overflow-x-hidden': orientation === 'vertical',
        'overflow-x-auto overflow-y-hidden': orientation === 'horizontal',
        'overflow-auto': orientation === 'both',
      }"
      @scroll="handleScroll"
    >
      <div class="scrollarea-content">
        <slot />
      </div>
    </div>

    <div
      v-show="showScrollbar"
      ref="scrollbar"
      class="scrollarea-scrollbar touch-none select-none transition-colors"
      :class="{
        'right-0.5 top-0.5 bottom-0.5 w-2': orientation === 'vertical',
        'bottom-0.5 left-0.5 right-0.5 h-2': orientation === 'horizontal',
      }"
    >
      <div
        ref="thumb"
        class="scrollarea-thumb relative rounded-full bg-border hover:bg-foreground/50"
        @mousedown="handleThumbMousedown"
      />
    </div>
  </div>
</template>

<style scoped>
.scrollarea-viewport {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scrollarea-viewport::-webkit-scrollbar {
  display: none;
}

.scrollarea-scrollbar {
  position: absolute;
  background-color: transparent;
  z-index: 10;
}

.scrollarea-thumb {
  position: absolute;
  background-color: rgb(var(--border));
  cursor: pointer;
  border-radius: 9999px;
}

.scrollarea-thumb:hover {
  background-color: rgb(var(--foreground), 0.5);
}

.scrollarea-viewport {
  -webkit-overflow-scrolling: touch;
}
</style> 