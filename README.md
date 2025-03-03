# Document Extractor 📄

A modern web application built with Nuxt 3 for uploading, processing, and viewing PDF documents. The application extracts pages from PDFs as images and provides a feature-rich document viewer with real-time processing updates.

![Nuxt 3](https://img.shields.io/badge/Nuxt-3-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)
![Vue 3](https://img.shields.io/badge/Vue-3-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

## ✨ Features

- 📤 **PDF Upload** - Upload and process PDF documents up to 10MB
- 🖼️ **Image Extraction** - Convert PDF pages to high-quality images
- 👀 **Document Viewer** - Feature-rich viewer with:
  - Page navigation
  - Zoom controls
  - Thumbnail sidebar
  - Fullscreen mode
  - Keyboard shortcuts
- 🔄 **Real-time Progress** - Live updates during document processing
- 💾 **Cloud Storage** - Secure document storage with Supabase
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🎨 **Modern UI** - Beautiful interface with Tailwind CSS
- 📝 **Form Handling** - Integrated FormKit with custom styling

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or later
- Supabase account and project
- PDF processing capabilities on server

### Environment Setup

Create a `.env` file with your Supabase credentials:

```bash
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
SUPABASE_SERVICE_KEY=your_service_key
```

### Installation

```bash
# Clone the repository
git clone https://github.com/corrad-software/document-extractor.git

# Navigate to project directory
cd document-extractor

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🛠️ Project Structure

```
document-extractor/
├── components/        # UI Components
├── pages/            # Application routes
│   └── doc/          # Document handling pages
│       ├── index.vue # Upload page
│       └── view/     # Document viewer
├── server/           # Server-side API
│   └── api/         
│       ├── pdf/      # PDF processing
│       └── supabase/ # Storage handling
├── public/           # Static files
└── .env             # Environment variables
```

## 📋 Features Detail

### Document Upload
- Drag & drop interface
- File type validation
- Size limit enforcement
- Upload progress indicator

### PDF Processing
- Page extraction
- Image conversion
- Progress tracking
- Real-time status updates

### Document Viewer
- Thumbnail navigation
- Zoom controls (50% - 200%)
- Keyboard shortcuts
  - Arrow keys: Navigate pages
  - Home/End: First/Last page
- URL-based page navigation
- Responsive layout

## 🔐 Security

- Server-side file validation
- Secure storage with Supabase
- Rate limiting on API endpoints
- File type restrictions

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Nuxt 3](https://nuxt.com)
- Storage powered by [Supabase](https://supabase.com)
- Forms powered by [FormKit](https://formkit.com)
- Styled with [Tailwind CSS](https://tailwindcss.com)
