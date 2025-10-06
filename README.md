# SIA Admin - Student Information System

> Modern admin dashboard for school management built with Astro.js, React, Svelte, Tailwind CSS, and DaisyUI.

## 🎯 Overview

SIA Admin is a comprehensive web application designed for school administrators, teachers, and staff to manage students, classes, assignments, grades, and more. Built with hybrid rendering for optimal performance and user experience.

## ✨ Features

- **🔐 Authentication** - Secure login with JWT tokens
- **👥 User Management** - Manage students, teachers, and administrators  
- **📚 Academic Management** - Classes, assignments, grades, and report cards
- **📊 Analytics Dashboard** - Real-time insights and statistics
- **🌓 Dark Mode** - Seamless theme switching
- **📱 Responsive Design** - Works on all devices
- **⚡ Fast Performance** - Islands architecture for optimal loading
- **🎨 Modern UI** - DaisyUI components with Tailwind CSS

## 🏗️ Tech Stack

- **Framework:** [Astro.js](https://astro.build) v5.x (Hybrid rendering)
- **UI Components:** React 19 (complex interactions) + Svelte 5 (fine-grained reactivity)
- **Styling:** Tailwind CSS v4 + DaisyUI v5
- **State Management:** Nanostores
- **Icons:** Lucide (React & Svelte)
- **Deployment:** Cloudflare Pages
- **Type Safety:** TypeScript (Strict mode)

## 📁 Project Structure

```
sia-astro/
├── src/
│   ├── components/
│   │   ├── common/          # Shared Astro components
│   │   ├── layout/          # Header, Sidebar, Footer
│   │   ├── modules/         # Feature-specific components
│   │   └── ui/              # UI components (React + Svelte)
│   ├── layouts/
│   │   ├── BaseLayout.astro       # Base HTML layout
│   │   └── DashboardLayout.astro  # Dashboard with sidebar
│   ├── pages/               # File-based routing
│   │   ├── index.astro            # Landing page (static)
│   │   ├── dashboard/             # Dashboard pages (SSR)
│   │   ├── admin/                 # Admin pages
│   │   └── teacher/               # Teacher pages
│   ├── lib/
│   │   ├── api/             # API client & endpoints
│   │   ├── stores/          # Nanostores (auth, theme, etc.)
│   │   ├── utils/           # Helper functions
│   │   └── constants/       # App constants
│   ├── types/               # TypeScript types
│   ├── styles/              # Global CSS
│   └── middleware/          # Astro middleware
├── public/                  # Static assets
├── astro.config.mjs         # Astro configuration
├── tailwind.config.ts       # Tailwind + DaisyUI config
├── tsconfig.json            # TypeScript configuration
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 8.0.0

### Installation

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start development server
pnpm dev
```

The app will be available at `http://localhost:4321`

### Environment Variables

Create a `.env.local` file based on `.env.example`:

```env
PUBLIC_API_URL=http://localhost:3000/api/v1
PUBLIC_APP_NAME=SIA Admin
PUBLIC_APP_ENV=development
```

## 🧞 Commands

| Command | Action |
|---------|--------|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start dev server at `localhost:4321` |
| `pnpm build` | Build for production to `./dist/` |
| `pnpm preview` | Preview production build locally |
| `pnpm format` | Format code with Prettier |
| `pnpm format:check` | Check code formatting |
| `pnpm type-check` | Check TypeScript types |
| `pnpm astro check` | Run Astro diagnostics |

## 🎨 Component Strategy

### When to use React vs Svelte

**Use React for:**
- Complex state management
- Forms with validation
- Data tables with filtering/sorting
- Multi-step wizards
- Modal dialogs with complex logic

**Use Svelte for:**
- Simple interactive elements
- Counters and toggles
- Theme switcher
- Tooltips and popovers
- Animations and transitions

**Use Astro for:**
- Static content
- Layouts
- Navigation
- Cards and lists
- SEO-critical pages

## 🔐 Authentication Flow

1. User logs in via `/login`
2. Backend returns JWT tokens (access + refresh)
3. Tokens stored in localStorage + Nanostores
4. Protected routes check auth state
5. API requests include Bearer token
6. Token refresh on expiry

## 🌐 Routing

```
/ - Landing page (static, prerendered)
/login - Login page
/dashboard - Main dashboard (SSR)
/admin/* - Admin pages (SSR, role-protected)
/teacher/* - Teacher pages (SSR, role-protected)
/dashboard/profile - User profile
/dashboard/settings - Settings
```

## 🎨 Theming

DaisyUI themes configured with light and dark modes:
- Theme switcher in header (Svelte component)
- Preference saved to localStorage
- Automatic theme application on load

Custom colors defined in `tailwind.config.ts`:
- Primary: Blue (#3b82f6)
- Secondary: Green (#10b981)
- Accent: Amber (#f59e0b)

## 📦 Building for Production

```bash
# Build the app
pnpm build

# Preview the build
pnpm preview
```

Output will be in `./dist/` directory, optimized for Cloudflare Pages.

## 🚢 Deployment

### Cloudflare Pages

1. Connect repository to Cloudflare Pages
2. Set build command: `pnpm build`
3. Set build output directory: `dist`
4. Add environment variables
5. Deploy!

**Environment variables needed:**
- `PUBLIC_API_URL` - Backend API URL
- `PUBLIC_APP_ENV` - production

## 📚 Key Dependencies

```json
{
  "astro": "^5.14.1",
  "@astrojs/cloudflare": "^12.6.9",
  "@astrojs/react": "^4.4.0",
  "@astrojs/svelte": "^7.2.0",
  "react": "^19.2.0",
  "svelte": "^5.39.8",
  "tailwindcss": "^4.1.14",
  "daisyui": "^5.1.26",
  "nanostores": "^1.0.1"
}
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Format code: `pnpm format`
4. Check types: `pnpm type-check`
5. Submit a pull request

## 📄 License

Private - All rights reserved

## 🔗 Related Projects

- **SIA Backend (Hono)** - `/sia-hono` - REST API backend
- **SIA Student App** - `/sia-astro-student` - Student-focused frontend

## 📞 Support

For questions or issues, contact the development team.

---

**Built with ❤️ using Astro.js**
