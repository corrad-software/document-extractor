export const useTheme = () => {
  const currentTheme = useState("theme", () => "default");

  const setTheme = (theme) => {
    // Remove existing theme classes
    if (process.client) {
      document.documentElement.classList.remove("theme-dark", "theme-purple");

      // Add new theme class if not default
      if (theme !== "default") {
        document.documentElement.classList.add(`theme-${theme}`);
      }
    }

    currentTheme.value = theme;
  };

  return {
    currentTheme,
    setTheme,
  };
};
