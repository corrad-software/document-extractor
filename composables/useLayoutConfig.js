export const useLayoutConfig = () => {
  const layout = useState("layout-config", () => ({
    isRTL: false,
    sidebarLayout: "vertical", // 'vertical' | 'horizontal'
    isMinimized: false,
  }));

  // Initialize layout on client side
  if (process.client) {
    const savedLayout = localStorage.getItem("layout-config");
    if (savedLayout) {
      layout.value = JSON.parse(savedLayout);
      // Apply RTL direction if saved
      document.documentElement.dir = layout.value.isRTL ? "rtl" : "ltr";
    }
  }

  const toggleDirection = () => {
    layout.value.isRTL = !layout.value.isRTL;
    document.documentElement.dir = layout.value.isRTL ? "rtl" : "ltr";
    // Save to localStorage
    if (process.client) {
      localStorage.setItem("layout-config", JSON.stringify(layout.value));
    }
  };

  const toggleSidebarLayout = () => {
    layout.value.sidebarLayout =
      layout.value.sidebarLayout === "vertical" ? "horizontal" : "vertical";
    // Save to localStorage
    if (process.client) {
      localStorage.setItem("layout-config", JSON.stringify(layout.value));
    }
  };

  const toggleMinimize = () => {
    layout.value.isMinimized = !layout.value.isMinimized;
    if (process.client) {
      localStorage.setItem("layout-config", JSON.stringify(layout.value));
    }
  };

  const setLayout = (config) => {
    layout.value = { ...layout.value, ...config };
    if (process.client) {
      localStorage.setItem("layout-config", JSON.stringify(layout.value));
      if ("isRTL" in config) {
        document.documentElement.dir = config.isRTL ? "rtl" : "ltr";
      }
    }
  };

  return {
    layout,
    toggleDirection,
    toggleSidebarLayout,
    toggleMinimize,
    setLayout,
  };
};
