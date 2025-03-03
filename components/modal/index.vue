<script setup>
defineOptions({
  name: "Modal",
});

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'xl',
    validator: (value) => ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', 'full'].includes(value) || /^\d+px$/.test(value) || /^\d+rem$/.test(value),
  },
});

const emit = defineEmits(["update:open"]);
const originalOverflow = ref("");

const modalSize = computed(() => {
  const sizes = {
    sm: '384px',
    md: '448px',
    lg: '512px',
    xl: '576px',
    '2xl': '672px',
    '3xl': '768px',
    '4xl': '896px',
    '5xl': '1024px',
    'full': '100%'
  };

  // If it's a predefined size, return the corresponding width
  if (sizes[props.size]) {
    return sizes[props.size];
  }

  // If it's a custom size (e.g., '600px' or '20rem'), return it directly
  if (/^\d+px$/.test(props.size) || /^\d+rem$/.test(props.size)) {
    return props.size;
  }

  // Default fallback
  return sizes.xl;
});

const lockScroll = () => {
  originalOverflow.value = document.body.style.overflow;
  document.body.style.overflow = "hidden";
};

const unlockScroll = () => {
  document.body.style.overflow = originalOverflow.value;
};

const close = () => {
  emit("update:open", false);
};

// Watch for changes in open state to handle scroll locking
watch(
  () => props.open,
  (newValue) => {
    if (newValue) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }
);

// Close on escape key and handle scroll locking
onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === "Escape" && props.open) close();
  };
  document.addEventListener("keydown", handleEscape);

  // Initial scroll lock if modal is open on mount
  if (props.open) {
    lockScroll();
  }

  onBeforeUnmount(() => {
    document.removeEventListener("keydown", handleEscape);
    // Ensure we unlock scroll when component is destroyed
    if (props.open) {
      unlockScroll();
    }
  });
});

provide("closeModal", close);
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="open" class="fixed inset-0 z-[9999]">
        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-black/70"
          @click="close"
        />
        <!-- Modal Content -->
        <div
          class="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
        >
          <div class="w-full mx-auto px-4 sm:px-0" :style="{ width: modalSize }">
            <div
              class="relative rounded-lg border bg-background p-6 shadow-lg"
              @click.stop
            >
              <slot />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
