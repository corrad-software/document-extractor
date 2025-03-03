import { defineStore } from "pinia";

export const useLayoutStore = defineStore("layout", {
  state: () => ({
    isRTL: false,
    sidebarLayout: "vertical", // 'vertical' | 'horizontal'
    isMinimized: false,
  }),

  actions: {
    toggleDirection() {
      this.isRTL = !this.isRTL;
      if (process.client) {
        document.documentElement.dir = this.isRTL ? "rtl" : "ltr";
      }
    },

    toggleSidebarLayout() {
      this.sidebarLayout =
        this.sidebarLayout === "vertical" ? "horizontal" : "vertical";
    },

    toggleMinimize() {
      this.isMinimized = !this.isMinimized;
    },

    setLayout(config) {
      if (config.isRTL !== undefined) {
        this.isRTL = config.isRTL;
        if (process.client) {
          document.documentElement.dir = config.isRTL ? "rtl" : "ltr";
        }
      }
      if (config.sidebarLayout) {
        this.sidebarLayout = config.sidebarLayout;
      }
      if (config.isMinimized !== undefined) {
        this.isMinimized = config.isMinimized;
      }
    },

    initLayout() {
      if (process.client) {
        document.documentElement.dir = this.isRTL ? "rtl" : "ltr";
      }
    },
  },

  persist: {
    key: "layout-config",
  },
});
