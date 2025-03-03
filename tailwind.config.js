module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
    "./formkit.theme.ts",
  ],
  safelist: [
    {
      pattern: /^border/, // This will preserve all border-related classes
    },
    {
      pattern: /^bg-/,
    },
    {
      pattern: /^text-/,
    },
  ],
  theme: {
    extend: {
      colors: {
        border: "rgb(var(--border), <alpha-value>)",
        input: "rgb(var(--input), <alpha-value>)",
        ring: "rgb(var(--ring), <alpha-value>)",
        background: "rgb(var(--background), <alpha-value>)",
        foreground: "rgb(var(--foreground), <alpha-value>)",
        sidebar: "rgb(var(--sidebar-background), <alpha-value>)",
        header: "rgb(var(--header-background), <alpha-value>)",
        content: "rgb(var(--content-background), <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--primary), <alpha-value>)",
          foreground: "rgb(var(--primary-foreground), <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary), <alpha-value>)",
          foreground: "rgb(var(--secondary-foreground), <alpha-value>)",
        },
        danger: {
          DEFAULT: "rgb(var(--danger), <alpha-value>)",
          foreground: "rgb(var(--danger-foreground), <alpha-value>)",
        },
        muted: {
          DEFAULT: "rgb(var(--muted), <alpha-value>)",
          foreground: "rgb(var(--muted-foreground), <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent), <alpha-value>)",
          foreground: "rgb(var(--accent-foreground), <alpha-value>)",
        },
        popover: {
          DEFAULT: "rgb(var(--popover), <alpha-value>)",
          foreground: "rgb(var(--popover-foreground), <alpha-value>)",
        },
        card: {
          DEFAULT: "rgb(var(--card), <alpha-value>)",
          foreground: "rgb(var(--card-foreground), <alpha-value>)",
        },
        info: {
          DEFAULT: "rgb(var(--info), <alpha-value>)",
          foreground: "rgb(var(--info-foreground), <alpha-value>)",
        },
        success: {
          DEFAULT: "rgb(var(--success), <alpha-value>)",
          foreground: "rgb(var(--success-foreground), <alpha-value>)",
        },
        warning: {
          DEFAULT: "rgb(var(--warning), <alpha-value>)",
          foreground: "rgb(var(--warning-foreground), <alpha-value>)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "auto" },
        },
        "accordion-up": {
          from: { height: "auto" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      borderColor: {
        DEFAULT: "rgb(var(--border))", // This sets the default border color
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
