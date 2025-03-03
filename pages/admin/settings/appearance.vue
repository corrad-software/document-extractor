<script setup>
definePageMeta({
  layout: "admin",
  title: "Settings",
});

const layoutStore = useLayoutStore();
const { getAdminNavigation } = useNavigation();

// Get settings navigation items
const settingsNavigation = computed(() => {
  const adminNav = getAdminNavigation();
  const settingsSection = adminNav.find(
    (section) => section.title === "Setting"
  );
  return settingsSection?.items[0]?.children || [];
});

// Set active state for current route
const route = useRoute();
const isActiveRoute = (path) => route.path === path;

// Font options
const fonts = [
  { value: "inter", label: "Inter" },
  { value: "roboto", label: "Roboto" },
  { value: "poppins", label: "Poppins" },
];

const selectedFont = ref("inter");

// Theme handling
const { currentTheme, setTheme } = useTheme();
const selectedTheme = computed({
  get: () => currentTheme.value === "dark",
  set: (value) => {
    setTheme(value ? "dark" : "default");
  },
});

const handleThemeChange = (isDark) => {
  selectedTheme.value = isDark;
};

const updatePreferences = () => {
  // Update font and theme preferences
  setTheme(selectedTheme.value ? "dark" : "default");
  // You might want to add font updating logic here

  // Show success toast
  const toast = useToast();
  toast.add({
    title: "Preferences Updated",
    description: "Your theme settings have been saved successfully.",
    type: "success",
  });
};

const layoutOptions = [
  {
    id: "vertical",
    title: "Vertical Menu",
    description: "Traditional vertical sidebar navigation",
    icon: "mdi:view-split-vertical",
    preview: "/images/layouts/vertical.svg",
  },
  {
    id: "horizontal",
    title: "Horizontal Menu",
    description: "Modern horizontal top navigation",
    icon: "mdi:view-split-horizontal",
    preview: "/images/layouts/horizontal.svg",
  },
];

const directionOptions = [
  {
    id: "ltr",
    title: "Left to Right (LTR)",
    description: "Default layout direction",
    icon: "mdi:format-horizontal-align-left",
  },
  {
    id: "rtl",
    title: "Right to Left (RTL)",
    description: "For RTL languages support",
    icon: "mdi:format-horizontal-align-right",
  },
];

const handleLayoutChange = (layoutId) => {
  if (layoutStore.sidebarLayout !== layoutId) {
    layoutStore.toggleSidebarLayout();
  }
};

const handleDirectionChange = () => {
  layoutStore.toggleDirection();
};
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Settings (Appearance)</h1>
      <p class="text-gray-600">
        Customize your admin interface layout and direction
      </p>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Settings Sidebar -->
      <div class="lg:w-56">
        <nav class="flex flex-col space-y-1">
          <NuxtLink
            v-for="item in settingsNavigation"
            :key="item.name"
            :to="item.path"
            class="flex items-center gap-3 px-3 py-2 rounded-md transition-colors relative"
            :class="[
              isActiveRoute(item.path)
                ? 'bg-accent text-foreground font-medium'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/50',
            ]"
          >
            <div class="flex items-center gap-3 flex-1">
              <Icon :name="item.icon" class="w-4 h-4" />
              {{ item.name }}
            </div>
          </NuxtLink>
        </nav>
      </div>

      <!-- Settings Content -->
      <div class="flex-1">
        <!-- Combined Settings Card -->
        <Card>
          <CardHeader>
            <CardTitle>Appearance Settings</CardTitle>
            <CardDescription>Customize the look and feel of your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-8">
              <!-- Font Section -->
              <div>
                <h3 class="text-lg font-medium mb-2">Font</h3>
                <p class="text-sm text-muted-foreground mb-4">Set the font you want to use in the dashboard.</p>
                <div class="max-w-xl">
                  <FormKit
                    type="select"
                    name="font"
                    v-model="selectedFont"
                    :options="fonts"
                    placeholder="Select a font"
                  />
                </div>
              </div>

              <Separator />

              <!-- Theme Section -->
              <div>
                <h3 class="text-lg font-medium mb-2">Theme</h3>
                <p class="text-sm text-muted-foreground mb-4">Select the theme for the dashboard.</p>
                <div class="grid grid-cols-2 gap-4 max-w-xl">
                  <!-- Light Theme Option -->
                  <button
                    class="relative aspect-[1.2/1] rounded-lg border-2 overflow-hidden hover:border-primary transition-colors"
                    :class="!selectedTheme ? 'border-primary' : 'border-border'"
                    @click="handleThemeChange(false)"
                  >
                    <div class="absolute inset-0 bg-white p-4">
                      <div class="flex flex-col h-full">
                        <!-- Header -->
                        <div class="flex items-center gap-2 mb-4">
                          <Skeleton class="h-8 w-8 rounded-full border" />
                          <div class="space-y-1.5">
                            <Skeleton class="h-2.5 w-24 border" />
                            <Skeleton class="h-2 w-16 border" />
                          </div>
                        </div>
                        <!-- Content -->
                        <div class="flex-1 space-y-4">
                          <!-- Navigation -->
                          <div class="flex gap-2 mb-4">
                            <Skeleton class="h-2 w-12 border" />
                            <Skeleton class="h-2 w-12 border" />
                            <Skeleton class="h-2 w-12 border" />
                          </div>
                          <!-- Cards -->
                          <div class="grid grid-cols-2 gap-2">
                            <Skeleton class="h-12 w-full border rounded" />
                            <Skeleton class="h-12 w-full border rounded" />
                          </div>
                          <div class="space-y-2">
                            <Skeleton class="h-2 w-3/4 border" />
                            <Skeleton class="h-2 w-1/2 border" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <span class="absolute bottom-2 left-2 text-sm font-medium text-gray-900">Light</span>
                    <div class="absolute top-2 right-2">
                      <Icon v-if="!selectedTheme" name="ph:check-circle-fill" class="w-5 h-5 text-primary" />
                    </div>
                  </button>

                  <!-- Dark Theme Option -->
                  <button
                    class="relative aspect-[1.2/1] rounded-lg border-2 overflow-hidden hover:border-primary transition-colors"
                    :class="selectedTheme ? 'border-primary' : 'border-border'"
                    @click="handleThemeChange(true)"
                  >
                    <div class="absolute inset-0 bg-[#09090B] p-4">
                      <div class="flex flex-col h-full">
                        <!-- Header -->
                        <div class="flex items-center gap-2 mb-4">
                          <Skeleton class="h-8 w-8 rounded-full bg-[#18181B]" />
                          <div class="space-y-1.5">
                            <Skeleton class="h-2.5 w-24 bg-[#18181B]" />
                            <Skeleton class="h-2 w-16 bg-[#18181B]" />
                          </div>
                        </div>
                        <!-- Content -->
                        <div class="flex-1 space-y-4">
                          <!-- Navigation -->
                          <div class="flex gap-2 mb-4">
                            <Skeleton class="h-2 w-12 bg-[#18181B]" />
                            <Skeleton class="h-2 w-12 bg-[#18181B]" />
                            <Skeleton class="h-2 w-12 bg-[#18181B]" />
                          </div>
                          <!-- Cards -->
                          <div class="grid grid-cols-2 gap-2">
                            <Skeleton class="h-12 w-full bg-[#18181B] rounded" />
                            <Skeleton class="h-12 w-full bg-[#18181B] rounded" />
                          </div>
                          <div class="space-y-2">
                            <Skeleton class="h-2 w-3/4 bg-[#18181B]" />
                            <Skeleton class="h-2 w-1/2 bg-[#18181B]" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <span class="absolute bottom-2 left-2 text-sm font-medium text-white">Dark</span>
                    <div class="absolute top-2 right-2">
                      <Icon v-if="selectedTheme" name="ph:check-circle-fill" class="w-5 h-5 text-primary" />
                    </div>
                  </button>
                </div>
              </div>

              <Separator />

              <!-- Layout Configuration -->
              <div>
                <h3 class="text-lg font-medium mb-2">Layout Configuration</h3>
                <p class="text-sm text-muted-foreground mb-4">Choose the layout style for your dashboard navigation.</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    v-for="option in layoutOptions"
                    :key="option.id"
                    class="relative flex flex-col items-start rounded-lg border-2 p-4 hover:border-primary transition-colors"
                    :class="layoutStore.sidebarLayout === option.id ? 'border-primary' : 'border-border'"
                    @click="handleLayoutChange(option.id)"
                  >
                    <div class="mb-4 rounded-lg border bg-card p-2">
                      <Icon :name="option.icon" class="h-6 w-6" />
                    </div>
                    <div class="mb-1 text-lg font-medium">{{ option.title }}</div>
                    <div class="text-sm text-muted-foreground">{{ option.description }}</div>
                    <div class="absolute top-2 right-2">
                      <Icon
                        v-if="layoutStore.sidebarLayout === option.id"
                        name="ph:check-circle-fill"
                        class="w-5 h-5 text-primary"
                      />
                    </div>
                  </button>
                </div>
              </div>

              <Separator />

              <!-- Direction Configuration -->
              <div>
                <h3 class="text-lg font-medium mb-2">Direction Configuration</h3>
                <p class="text-sm text-muted-foreground mb-4">Set the text direction for your dashboard interface.</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    v-for="option in directionOptions"
                    :key="option.id"
                    class="relative flex flex-col items-start rounded-lg border-2 p-4 hover:border-primary transition-colors"
                    :class="(layoutStore.isRTL ? 'rtl' : 'ltr') === option.id ? 'border-primary' : 'border-border'"
                    @click="handleDirectionChange"
                  >
                    <div class="mb-4 rounded-lg border bg-card p-2">
                      <Icon :name="option.icon" class="h-6 w-6" />
                    </div>
                    <div class="mb-1 text-lg font-medium">{{ option.title }}</div>
                    <div class="text-sm text-muted-foreground">{{ option.description }}</div>
                    <div class="absolute top-2 right-2">
                      <Icon
                        v-if="(layoutStore.isRTL ? 'rtl' : 'ltr') === option.id"
                        name="ph:check-circle-fill"
                        class="w-5 h-5 text-primary"
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button @click="updatePreferences">Update preferences</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.router-link-active {
  @apply text-foreground font-medium;
}
</style>
