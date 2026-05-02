# Project Summary

**Project:** AdminOS — React Vite admin dashboard theme system  
**Stack:** React 18, Vite 5, TypeScript, React Router v6  
**Location:** `admin-os/app/`

## Purpose
A configurable, reusable admin dashboard UI with a composable design token system.
Built as a template/starting point for future projects.

## Theme Architecture
- **Mood** (warm / cool / pastel / mono) — color palette
- **Mode** (light / dark) — bg/text/card contrast
- **Corners** (sharp / rounded / pill) — border-radius tokens (`r.xs/sm/md/lg/full`)
- **5 named presets**: Clean SaaS, Power User, Friendly Startup, Dark Pro, Enterprise
- Theme built via `buildTheme(mood, mode)` + `RADII[corners]` exposed via `useTheme()`

## Component Count
- 20 primitives, 5 chart components, 4 layout components, 9 pages

## Key Patterns
- All colors from `t` (theme), all radii from `r` (radii) — both via `useTheme()`
- Global CSS: only keyframe animations + `.row-actions` hover class
- Data module: `src/data/index.ts` — single source for all mock data
- Routing: React Router v6 nested routes, `<AppShell>` as layout route
