# Corrad UI 2025 🚀

A modern, feature-rich UI component library built with Nuxt 3, designed for creating beautiful and responsive web applications. Corrad UI combines the power of Vue 3 with the flexibility of Tailwind CSS to deliver a seamless development experience.

![Nuxt 3](https://img.shields.io/badge/Nuxt-3-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)
![Vue 3](https://img.shields.io/badge/Vue-3-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## ✨ Features

- 🎨 **25+ Modern UI Components** - From basic buttons to complex data tables
- 🌓 **Light/Dark Theme** - Built-in theme switching capability
- 🌐 **RTL Support** - Full Right-to-Left layout support
- 📱 **Responsive Design** - Mobile-first approach for all components
- 🔧 **Customizable** - Easy to customize with Tailwind CSS
- 📝 **Form Handling** - Integrated FormKit with custom styling
- 🎯 **TypeScript Support** - Full type safety and better DX
- ⚡ **Auto-imports** - Zero-config component importing

## 🎯 Components

<details>
<summary>View Component List</summary>

- **Layout**
  - Accordion
  - Card
  - Modal
  - Tabs
  - Separator

- **Data Display**
  - Table
  - Data Table
  - Avatar
  - Badge
  - Progress

- **Navigation**
  - Breadcrumb
  - Dropdown
  - Context Menu
  - Stepper

- **Feedback**
  - Alert
  - Toast
  - Tooltip
  - Hover Card
  - Popover

- **Media**
  - Carousel
  - Skeleton

- **Utils**
  - Scroll Area
  - Theme Switcher
  - Button

</details>

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or later
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/corrad-software/corrad-2025.git

# Navigate to project directory
cd corrad-2025

# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 📖 Documentation

Each component comes with comprehensive documentation and examples:

- Basic usage
- Props API
- Events
- Customization options
- Live examples

## 🎨 Customization

### Tailwind Configuration

Customize the design system by modifying `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Your custom colors
      },
      // Other theme extensions
    }
  }
}
```

### FormKit Theme

Customize form elements through `formkit.theme.js`.

## 🛠️ Project Structure

```
corrad-2025/
├── components/        # UI Components
├── composables/       # Vue composables
├── layouts/          # Page layouts
├── pages/           # Application routes
├── plugins/         # Nuxt plugins
├── stores/          # State management
├── assets/          # Static assets
├── public/          # Public files
└── server/          # Server-side code
```

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Nuxt 3](https://nuxt.com)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Forms powered by [FormKit](https://formkit.com)
# document-extractor
