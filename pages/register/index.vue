<script setup>
const { add: toast } = useToast();

const handleRegister = async (formData) => {
  try {
    toast({
      title: "Success",
      description: "Account created successfully",
      variant: "success",
    });
  } catch (error) {
    toast({
      title: "Error",
      description: error.message || "Registration failed",
      variant: "destructive",
    });
  }
};
</script>

<template>
  <div class="min-h-screen grid md:grid-cols-2">
    <!-- Left side - Dark section with testimonial -->
    <div
      class="hidden md:flex flex-col bg-card text-card-foreground p-6 lg:p-8 relative"
    >
      <!-- Logo section -->
      <div class="flex items-center gap-2 text-base">
        <div class="p-0.5">⌘</div>
        Corrad
      </div>

      <!-- Testimonial section - positioned at bottom -->
      <div class="mt-auto">
        <blockquote
          class="text-xl lg:text-2xl font-medium leading-relaxed mb-3"
        >
          "This library has saved me countless hours of work and helped me
          deliver stunning designs to my clients faster than ever before."
        </blockquote>
        <p class="text-sm text-muted-foreground">Sofia Davis</p>
      </div>
    </div>

    <!-- Right side - Registration form -->
    <div class="flex flex-col justify-between p-4 sm:p-6 lg:p-8 bg-background">
      <!-- Top right login link -->
      <div class="text-right">
        <NuxtLink
          to="/login"
          class="text-sm text-muted-foreground hover:text-foreground"
        >
          Login
        </NuxtLink>
      </div>

      <!-- Form section -->
      <div class="w-full max-w-sm mx-auto">
        <h1 class="text-2xl font-semibold mb-2">Create an account</h1>
        <p class="text-sm text-muted-foreground mb-6">
          Enter your details below to create your account
        </p>

        <FormKit
          type="form"
          :actions="false"
          @submit="handleRegister"
          #default="{ value }"
          class="space-y-4"
        >
          <FormKit
            type="text"
            name="name"
            label="Name"
            placeholder="Enter your name"
            validation="required"
          />

          <FormKit
            type="email"
            name="email"
            label="Email"
            placeholder="name@example.com"
            validation="required|email"
          />

          <FormKit
            type="password"
            name="password"
            label="Password"
            placeholder="Create a password"
            validation="required|length:8"
            :validation-messages="{
              length: 'Password must be at least 8 characters',
            }"
          />

          <Button
            type="submit"
            class="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-9"
          >
            Create Account
          </Button>

          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t"></span>
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-background px-2 text-muted-foreground"
                >Or continue with</span
              >
            </div>
          </div>

          <div class="space-y-2">
            <Button variant="outline" class="w-full h-9" type="button">
              <Icon name="mdi:google" class="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button variant="outline" class="w-full h-9" type="button">
              <Icon name="mdi:github" class="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>
        </FormKit>

        <!-- Terms text -->
        <p class="text-xs text-muted-foreground mt-6">
          By clicking continue, you agree to our
          <NuxtLink to="/terms" class="underline hover:text-foreground"
            >Terms of Service</NuxtLink
          >
          and
          <NuxtLink to="/privacy" class="underline hover:text-foreground"
            >Privacy Policy</NuxtLink
          >.
        </p>
      </div>

      <div></div>
      <!-- Spacer for flex alignment -->
    </div>
  </div>
</template>
