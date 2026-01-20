# Frontend Migration Submission

This is a submission for the **Full Stack Developer Assignment** - Frontend Migration Task.

## Overview

A modern frontend application built with Next.js, featuring a clean architecture with authentication, dashboard, and responsive UI components.

---

## Tech Stack

- **Framework:** Next.js
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **Language:** TypeScript
- **Animations:** Custom CSS keyframe animations (slideInUp, slideInDown, fadeIn)

---

## Project Structure

```
app/
├── api/                    # API routes
│   └── auth/              # Authentication endpoints
│       ├── login/         # Login API
│       └── register/      # Register API
├── auth/                  # Authentication pages
│   ├── layout.tsx         # Auth layout wrapper
│   ├── page.tsx           # Auth main page
│   ├── login/            # Login page
│   └── signup/           # Signup page
├── dashboard/            # Dashboard pages
│   ├── page.tsx          # Main dashboard
│   └── components/       # Dashboard components
│       ├── ComposeTab.tsx      # Compose functionality
│       ├── ConfigsTab.tsx      # Configuration settings
│       └── ReportsTab.tsx      # Reports view
├── home/                 # Home pages
│   ├── page.tsx          # Home page
│   └── index.ts          # Home exports
├── globals.css           # Global styles & animations
└── layout.tsx            # Root layout

public/                   # Static assets
```

---

## Features

- ✅ User Authentication (Login/Register)
- ✅ Dashboard with tabbed interface
- ✅ Modern UI with Tailwind CSS
- ✅ Responsive design
- ✅ Custom animations
- ✅ TypeScript for type safety
- ✅ Clean folder structure

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm run dev

# Build for production
pnpm run build

# Start production server
pnpm start
```

The application runs on `http://localhost:3000`

---

## Notes

- Backend logic and database structure remain unchanged
- Mock Dashboard implementation with api integration (proper api integration still required).
- All styling follows modern Tailwind CSS practices
- Custom animations implemented in globals.css
