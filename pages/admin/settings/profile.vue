<script setup>
definePageMeta({
  layout: "admin",
  title: "Settings",
});

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

// Profile form data
const profileData = reactive({
  fullName: "John Doe",
  email: "john@example.com",
  avatar: "/placeholder-avatar.jpg",
  bio: "Full-stack developer with a passion for building great user experiences.",
  location: "New York, USA",
  timezone: "America/New_York",
});

const timezones = [
  { value: "America/New_York", label: "New York (EST)" },
  { value: "America/Los_Angeles", label: "Los Angeles (PST)" },
  { value: "Europe/London", label: "London (GMT)" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)" },
];

const updateProfile = () => {
  const toast = useToast();
  toast.add({
    title: "Profile Updated",
    description: "Your profile has been updated successfully.",
    type: "success",
  });
};
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Settings (Profile)</h1>
      <p class="text-gray-600">Manage your account profile and preferences</p>
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
      <div class="flex-1 space-y-8">
        <!-- Profile Information -->
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription
              >Update your personal information and profile
              picture</CardDescription
            >
          </CardHeader>
          <CardContent>
            <div class="space-y-6">
              <!-- Avatar Upload -->
              <div class="flex items-center gap-4">
                <div
                  class="w-16 h-16 rounded-full border flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 256 256"
                    class="w-16 h-16"
                  >
                    <path
                      fill="currentColor"
                      d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24M74.08 197.5a64 64 0 0 1 107.84 0a87.83 87.83 0 0 1-107.84 0M96 120a32 32 0 1 1 32 32a32 32 0 0 1-32-32m97.76 66.41a79.66 79.66 0 0 0-36.06-28.75a48 48 0 1 0-59.4 0a79.66 79.66 0 0 0-36.06 28.75a88 88 0 1 1 131.52 0"
                    />
                  </svg>
                </div>
                <div>
                  <Button variant="outline" size="sm">Change Avatar</Button>
                  <p class="text-sm text-muted-foreground mt-1">
                    JPG, GIF or PNG. Max size of 800K
                  </p>
                </div>
              </div>

              <!-- Profile Form -->
              <div class="space-y-4">
                <FormKit
                  type="text"
                  name="fullName"
                  label="Full Name"
                  v-model="profileData.fullName"
                  validation="required|length:3,100"
                />

                <FormKit
                  type="email"
                  name="email"
                  label="Email Address"
                  v-model="profileData.email"
                  validation="required|email"
                />

                <FormKit
                  type="textarea"
                  name="bio"
                  label="Bio"
                  v-model="profileData.bio"
                  validation="required|length:10,500"
                />

                <FormKit
                  type="text"
                  name="location"
                  label="Location"
                  v-model="profileData.location"
                />

                <FormKit
                  type="select"
                  name="timezone"
                  label="Timezone"
                  v-model="profileData.timezone"
                  :options="timezones"
                  placeholder="Select your timezone"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button @click="updateProfile">Save Changes</Button>
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
