<script setup>
// No specific functionality needed for this page
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="border-b">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-2 text-foreground">
            <div class="p-0.5">⌘</div>
            Corrad
          </NuxtLink>

          <!-- Login link -->
          <NuxtLink
            to="/login"
            class="text-sm text-muted-foreground hover:text-foreground"
          >
            Login
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-2xl font-semibold mb-8 text-foreground">
          Terms of Service
        </h1>

        <div class="prose prose-gray max-w-none">
          <h2 class="text-xl font-medium mt-8 mb-4 text-foreground">
            1. Terms
          </h2>
          <p class="text-muted-foreground mb-4">
            By accessing this Website, you are agreeing to be bound by these
            Website Terms and Conditions of Use and agree that you are
            responsible for the agreement with any applicable local laws.
          </p>

          <h2 class="text-xl font-medium mt-8 mb-4 text-foreground">
            2. Use License
          </h2>
          <p class="text-muted-foreground mb-4">
            Permission is granted to temporarily download one copy of the
            materials (information or software) on Corrad's Website for
            personal, non-commercial transitory viewing only.
          </p>

          <h2 class="text-xl font-medium mt-8 mb-4 text-foreground">
            3. Disclaimer
          </h2>
          <p class="text-muted-foreground mb-4">
            All the materials on Corrad's Website are provided "as is". Acme
            Inc makes no warranties, may it be expressed or implied, therefore
            negates all other warranties.
          </p>

          <h2 class="text-xl font-medium mt-8 mb-4 text-foreground">
            4. Limitations
          </h2>
          <p class="text-muted-foreground mb-4">
            Corrad or its suppliers will not be held accountable for any
            damages that will arise with the use or inability to use the
            materials on Corrad's Website.
          </p>

          <h2 class="text-xl font-medium mt-8 mb-4 text-foreground">
            5. Revisions
          </h2>
          <p class="text-muted-foreground mb-4">
            The materials appearing on Corrad's Website may include technical,
            typographical, or photographic errors. Corrad will not promise
            that any of the materials in this Website are accurate, complete, or
            current.
          </p>
        </div>

        <div class="mt-12 pt-8 border-t">
          <p class="text-sm text-muted-foreground">
            Last updated: March 14, 2024
          </p>
        </div>
      </div>
    </main>
  </div>
</template>
