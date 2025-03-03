<script setup>
defineOptions({
  name: "ThemeSwitcher",
});

const { currentTheme, setTheme } = useTheme();

const themes = [
  {
    value: "default",
    label: "Light",
    icon: "ph:sun",
  },
  {
    value: "dark",
    label: "Dark",
    icon: "ph:moon",
  },
];

const toggle = () => {
  const currentIndex = themes.findIndex(
    (theme) => theme.value === currentTheme.value
  );
  const nextIndex = (currentIndex + 1) % themes.length;
  setTheme(themes[nextIndex].value);
};

// Watch for theme changes to save to localStorage
watch(currentTheme, (newTheme) => {
  localStorage.setItem("theme", newTheme);
});
</script>

<template>
  <Button
    variant="ghost"
    size="icon"
    @click="toggle"
    class="relative"
    title="Toggle theme"
  >
    <ClientOnly>
      <Icon
        v-for="theme in themes"
        :key="theme.value"
        :name="theme.icon"
        class="h-5 w-5 transition-all"
        :class="{
          'scale-100 duration-300 rotate-0': currentTheme === theme.value,
          'scale-0 absolute duration-200 rotate-90':
            currentTheme !== theme.value,
        }"
      />
    </ClientOnly>
    <span class="sr-only">Toggle theme</span>
  </Button>
</template>
