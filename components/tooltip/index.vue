<script setup>
import { useFloating, offset, flip, shift, arrow } from '@floating-ui/vue';
import { computed, ref, provide } from 'vue';

defineOptions({ name: 'Tooltip' });

const props = defineProps({
  side: {
    type: String,
    default: 'top',
    validator: (value) => ['top', 'right', 'bottom', 'left'].includes(value),
  },
  delayDuration: {
    type: Number,
    default: 200,
  },
  skipDelayDuration: {
    type: Number,
    default: 300,
  },
});

const isOpen = ref(false);
const arrowRef = ref(null);
const reference = ref(null);
const floating = ref(null);

const { floatingStyles, middlewareData, placement } = useFloating(reference, floating, {
  placement: computed(() => props.side || 'top'),
  middleware: [
    offset(8),
    flip(),
    shift(),
    arrow({ element: arrowRef }),
  ],
});

const arrowStyles = computed(() => {
  if (!middlewareData.value.arrow) return {};

  const { x, y } = middlewareData.value.arrow;

  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[placement.value.split('-')[0]];

  return {
    left: x != null ? `${x}px` : '',
    top: y != null ? `${y}px` : '',
    [staticSide]: '-4px',
  };
});

let showTimeout;
let hideTimeout;

const show = () => {
  clearTimeout(hideTimeout);
  showTimeout = setTimeout(() => {
    isOpen.value = true;
  }, props.delayDuration);
};

const hide = () => {
  clearTimeout(showTimeout);
  hideTimeout = setTimeout(() => {
    isOpen.value = false;
  }, props.skipDelayDuration);
};

provide('tooltip', {
  reference,
  floating,
  arrowRef,
  isOpen,
  floatingStyles,
  arrowStyles,
  show,
  hide,
  placement,
});
</script>

<template>
  <div>
    <slot />
  </div>
</template> 