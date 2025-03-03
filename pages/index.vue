<script setup>
definePageMeta({
  title: "Root",
  redirect: "/doc",
});

const colors = {
  primary: "Primary",
  secondary: "Secondary",
  accent: "Accent",
  muted: "Muted",
  info: "Info",
  success: "Success",
  warning: "Warning",
  danger: "Danger",
};

const variants = {
  DEFAULT: "Base",
  foreground: "Foreground",
};

const surfaces = {
  background: "Background",
  foreground: "Foreground",
  card: "Card",
  "card-foreground": "Card Foreground",
  popover: "Popover",
  "popover-foreground": "Popover Foreground",
  border: "Border",
  input: "Input",
  ring: "Ring",
};

const spacingExamples = [
  { class: "p-2", label: "p-2 (0.5rem)" },
  { class: "p-4", label: "p-4 (1rem)" },
  { class: "p-6", label: "p-6 (1.5rem)" },
  { class: "p-8", label: "p-8 (2rem)" },
];

const shadowExamples = [
  { class: "shadow-sm", label: "Small Shadow" },
  { class: "shadow", label: "Default Shadow" },
  { class: "shadow-md", label: "Medium Shadow" },
  { class: "shadow-lg", label: "Large Shadow" },
  { class: "shadow-xl", label: "Extra Large Shadow" },
];

const borderRadiusExamples = [
  { class: "rounded-sm", label: "Small Radius" },
  { class: "rounded", label: "Default Radius" },
  { class: "rounded-md", label: "Medium Radius" },
  { class: "rounded-lg", label: "Large Radius" },
  { class: "rounded-full", label: "Full Radius" },
];
</script>

<template>
  <div class="min-h-screen bg-background text-foreground p-8">
    <ThemeSwitcher />

    <div class="max-w-6xl mx-auto space-y-12">
      <div class="flex gap-4">
        <Button @click="navigateTo('/component')">Component Showcase</Button>
        <Button @click="navigateTo('/login')">Login</Button>
      </div>

      <!-- Header -->
      <div>
        <h1 class="text-4xl font-bold">Design System</h1>
        <p class="text-muted-foreground mt-2">
          Visual reference for the theme system components and utilities
        </p>
      </div>

      <!-- Colors Section -->
      <section>
        <h2 class="text-2xl font-semibold mb-6">Theme Colors</h2>

        <!-- Main Colors -->
        <div class="space-y-6">
          <div v-for="(label, color) in colors" :key="color" class="space-y-2">
            <h3 class="text-lg font-medium">{{ label }}</h3>
            <div class="grid grid-cols-2 gap-4">
              <div
                v-for="(variantLabel, variant) in variants"
                :key="variant"
                class="flex items-center gap-4"
              >
                <div
                  class="h-16 w-16 rounded-md border"
                  :class="
                    variant === 'DEFAULT'
                      ? `bg-${color}`
                      : `bg-${color}-${variant}`
                  "
                ></div>
                <div>
                  <p class="font-medium">{{ variantLabel }}</p>
                  <p class="text-sm text-muted-foreground">
                    {{ variant === "DEFAULT" ? color : `${color}-${variant}` }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Surface Colors -->
        <div class="mt-8">
          <h3 class="text-lg font-medium mb-4">Surface Colors</h3>
          <div class="grid grid-cols-2 gap-4">
            <div
              v-for="(label, surface) in surfaces"
              :key="surface"
              class="flex items-center gap-4"
            >
              <div
                class="h-16 w-16 rounded-md border"
                :class="`bg-${surface}`"
              ></div>
              <div>
                <p class="font-medium">{{ label }}</p>
                <p class="text-sm text-muted-foreground">{{ surface }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Typography Section (enhanced) -->
      <section>
        <h2 class="text-2xl font-semibold mb-6">Typography</h2>
        <div class="space-y-6">
          <!-- Headings -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium mb-2">Headings</h3>
            <div class="space-y-4">
              <div v-for="i in 4" :key="i" class="flex items-center gap-4">
                <div :class="`text-${5 - i}xl font-bold`">Heading {{ i }}</div>
                <span class="text-sm text-muted-foreground">{{
                  "text-" + (5 - i) + "xl"
                }}</span>
              </div>
            </div>
          </div>

          <!-- Text Styles -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium mb-2">Text Styles</h3>
            <p class="text-base">Regular paragraph text (text-base)</p>
            <p class="text-lg">Large text (text-lg)</p>
            <p class="text-sm text-muted-foreground">
              Small muted text (text-sm)
            </p>
            <p class="text-xs">Extra small text (text-xs)</p>
            <p class="italic">Italic text</p>
            <p class="font-semibold">Semibold text</p>
            <p class="font-bold">Bold text</p>
          </div>
        </div>
      </section>

      <!-- Spacing Showcase -->
      <section>
        <h2 class="text-2xl font-semibold mb-6">Spacing</h2>
        <div class="grid grid-cols-2 gap-4">
          <div v-for="space in spacingExamples" :key="space.class">
            <div
              class="bg-primary/10 border border-primary/20"
              :class="space.class"
            >
              <div
                class="bg-primary/20 h-full w-full rounded min-h-[2rem]"
              ></div>
            </div>
            <p class="text-sm text-muted-foreground mt-2">{{ space.label }}</p>
          </div>
        </div>
      </section>

      <!-- Shadows Showcase -->
      <section>
        <h2 class="text-2xl font-semibold mb-6">Shadows</h2>
        <div class="grid grid-cols-2 gap-6">
          <div
            v-for="shadow in shadowExamples"
            :key="shadow.class"
            class="bg-card p-4 rounded-lg"
            :class="shadow.class"
          >
            <p class="font-medium">{{ shadow.label }}</p>
            <p class="text-sm text-muted-foreground">{{ shadow.class }}</p>
          </div>
        </div>
      </section>

      <!-- Border Radius Showcase -->
      <section>
        <h2 class="text-2xl font-semibold mb-6">Border Radius</h2>
        <div class="grid grid-cols-2 gap-6">
          <div
            v-for="radius in borderRadiusExamples"
            :key="radius.class"
            class="bg-primary/10 border-2 border-primary/20 h-24 w-full"
            :class="radius.class"
          >
            <div class="h-full w-full flex items-center justify-center">
              <p class="text-sm text-muted-foreground">{{ radius.label }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
</style>
