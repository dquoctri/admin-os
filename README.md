# admin-os

A React + TypeScript admin dashboard theme built with Vite. Includes a sidebar layout, multi-page routing, charts, and a theming system — designed as a starter template for internal tooling and back-office UIs.

## Features

- Pages: Overview, Analytics, Orders, Users, Products, Settings, Logs, Permissions
- Reusable primitives: Avatar, Checkbox, Tooltip, PageHeader, ColorSwatchPicker, and more
- Chart components: Bar, Line, Donut, Sparkline, StatBar
- Theme context with color swatch support
- React Router v6 nested routing inside an AppShell layout

## Tech Stack

| Layer     | Choice                          |
|-----------|---------------------------------|
| Framework | React 18                        |
| Language  | TypeScript 5                    |
| Bundler   | Vite 5                          |
| Routing   | React Router DOM v6             |

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9 (or pnpm / yarn)

### Clone and install

```bash
git clone https://github.com/dquoctri/admin-os.git
cd admin-os/app
npm install
```

### Start the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

Output is placed in `app/dist/`.

### Preview the production build

```bash
npm run preview
```

## Project Structure

```
admin-os/
└── app/
    ├── src/
    │   ├── components/
    │   │   ├── charts/       # Chart components
    │   │   ├── layout/       # AppShell, Sidebar, Topbar
    │   │   └── primitives/   # UI building blocks
    │   ├── context/          # ThemeContext
    │   ├── data/             # Mock data
    │   ├── pages/            # Route-level page components
    │   ├── App.tsx
    │   └── main.tsx
    ├── index.html
    ├── vite.config.ts
    └── package.json
```
