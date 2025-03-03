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

// Password form data
const passwordData = reactive({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const updatePassword = () => {
  const toast = useToast();
  toast.add({
    title: "Password Updated",
    description: "Your password has been changed successfully.",
    type: "success",
  });

  // Reset form
  passwordData.currentPassword = "";
  passwordData.newPassword = "";
  passwordData.confirmPassword = "";
};
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Settings (Password)</h1>
      <p class="text-gray-600">
        Change your account password and security settings
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
      <div class="flex-1 space-y-8">
        <!-- Change Password -->
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription
              >Update your account password to maintain
              security</CardDescription
            >
          </CardHeader>
          <CardContent>
            <div class="space-y-4 max-w-xl">
              <FormKit
                type="password"
                name="currentPassword"
                label="Current Password"
                v-model="passwordData.currentPassword"
                validation="required"
                :validation-messages="{
                  required: 'Please enter your current password',
                }"
              />

              <FormKit
                type="password"
                name="newPassword"
                label="New Password"
                v-model="passwordData.newPassword"
                validation="required|length:8,100|matches:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/"
                :validation-messages="{
                  required: 'Please enter a new password',
                  length: 'Password must be at least 8 characters',
                  matches:
                    'Password must include uppercase, lowercase, and numbers',
                }"
              />

              <FormKit
                type="password"
                name="confirmPassword"
                label="Confirm New Password"
                v-model="passwordData.confirmPassword"
                validation="required|confirm:newPassword"
                :validation-messages="{
                  required: 'Please confirm your new password',
                  confirm: 'Passwords do not match',
                }"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button @click="updatePassword">Update Password</Button>
          </CardFooter>
        </Card>

        <!-- Password Security -->
        <Card>
          <CardHeader>
            <CardTitle>Password Security</CardTitle>
            <CardDescription
              >Additional security measures for your account</CardDescription
            >
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div class="flex items-center justify-between py-3">
                <div>
                  <h3 class="text-sm font-medium">Two-Factor Authentication</h3>
                  <p class="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button variant="outline" size="sm">Enable 2FA</Button>
              </div>
              <div class="flex items-center justify-between py-3 border-t">
                <div>
                  <h3 class="text-sm font-medium">Password Reset Email</h3>
                  <p class="text-sm text-muted-foreground">
                    Receive email notifications for password resets
                  </p>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </div>
          </CardContent>
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
