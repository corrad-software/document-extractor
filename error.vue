<script setup>
defineProps({
  error: {
    type: Object,
    required: true,
  },
});

const handleError = () => {
  clearError({ redirect: "/" });
};
</script>

<template>
  <NuxtLayout>
    <div
      class="min-h-screen bg-background flex items-center justify-center p-4"
    >
      <div class="text-center space-y-6">
        <!-- Error Icon -->
        <div class="flex justify-center">
          <div
            class="w-24 h-24 bg-danger/10 rounded-full flex items-center justify-center"
          >
            <Icon
              :name="error?.statusCode === 404 ? 'ph:warning' : 'ph:x-circle'"
              class="w-12 h-12 text-danger"
            />
          </div>
        </div>

        <!-- Error Message -->
        <div class="space-y-2">
          <h1 class="text-4xl font-bold">
            {{
              error?.statusCode === 404 ? "Page Not Found" : "An Error Occurred"
            }}
          </h1>
          <p class="text-muted-foreground text-lg">
            {{
              error?.message ||
              "Sorry, we couldn't find the page you're looking for."
            }}
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-center gap-4">
          <Button variant="outline" @click="handleError">Go Home</Button>
          <Button @click="handleError">Try Again</Button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
