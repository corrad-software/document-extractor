<script setup>
const isOpen = ref(false);
const layoutStore = useLayoutStore();

// Initialize layout on mount
onMounted(() => {
  layoutStore.initLayout();
});

const toggleSidebar = () => {
  if (window.innerWidth < 768) {
    isOpen.value = !isOpen.value;
  } else {
    layoutStore.toggleMinimize();
  }
};

const isHorizontal = computed(() => layoutStore.sidebarLayout === "horizontal");
const isRTL = computed(() => layoutStore.isRTL);
const isMinimized = computed(() => layoutStore.isMinimized);

// Dynamic classes for the main content
const mainContentClasses = computed(() => {
  if (isHorizontal.value) {
    return "mt-14";
  }
  const sidebarWidth = isMinimized.value ? "md:ml-14" : "md:ml-56";
  return isRTL.value
    ? `md:mr-${isMinimized.value ? "16" : "56"}`
    : sidebarWidth;
});

// Add overlay click handler
const handleOverlayClick = () => {
  if (window.innerWidth < 768) {
    isOpen.value = false;
  }
};
</script>

<template>
  <div
    class="min-h-screen bg-background"
    :class="{ rtl: isRTL }"
    :dir="isRTL ? 'rtl' : 'ltr'"
  >
    <!-- Overlay for mobile -->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-background/70 z-40 md:hidden"
      @click="handleOverlayClick"
    ></div>

    <!-- Sidebar -->
    <AdminSideMenu
      :is-open="isOpen"
      :is-minimized="isMinimized"
      class="bg-sidebar"
      @toggle="toggleSidebar"
    />

    <!-- Main Content -->
    <div
      :class="mainContentClasses"
      class="transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]"
    >
      <!-- Header -->
      <AdminHeader
        :is-minimized="isMinimized"
        class="bg-header"
        @toggle="toggleSidebar"
      />

      <!-- Page Content -->
      <main class="p-6 bg-content min-h-screen z-0">
        <div class="max-w-[1920px] mx-auto">
          <slot />
        </div>
      </main>
    </div>

  </div>
</template>

<style>
/* RTL specific styles */
.rtl .md\:mr-56 {
  margin-right: 14rem;
}

.rtl .md\:mr-16 {
  margin-right: 4rem;
}

.rtl .md\:ml-56 {
  margin-left: 0;
}

.rtl .md\:ml-16 {
  margin-left: 0;
}

/* Add transition for overlay */
.bg-foreground\/50 {
  transition: opacity 0.2s ease-in-out;
}
</style>
