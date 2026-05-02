# Project Experience Log

## Session: AdminOS React Vite Implementation
**Date:** 2026-05-03

### What was built
Full React 18 + Vite 5 + TypeScript admin dashboard at `app/`:
- 20+ primitive components, 5 SVG chart components, 4 layout components
- 9 pages (Overview, Analytics, Orders, Users, Products, Settings, Logs, Permissions, Placeholder)
- Composable theme system: mood(4) × mode(2) × corners(3) with 5 named presets

### Decisions that worked well
- **Composable tokens over flat themes**: mood × mode × corners decomposition is far more
  maintainable than 6 hand-crafted static themes. 24 combinations for the price of 8 palette
  definitions + one radii table.
- **Build order**: primitives → charts → layout → pages. Zero circular dependencies.
- **Data-first**: writing `data/index.ts` before any page meant page components never blocked
  on data shape decisions.
- **Global keyframes only**: putting `fadeSlideIn`, `chartBarAnim`, `lineDrawAnim`, `shimmer`
  in `index.css` and everything else inline kept the CSS surface area minimal.

### Mistakes / gotchas
- **ThemeKey → Mood/Mode/Corners**: initial design had `ThemeKey` as a single discriminant.
  Needed a full context refactor mid-session when corners was added. Design the dimension space
  upfront next time.
- **Component interface mismatches**: Toggle used `value` (should be `checked`), SettingRow
  used `control` (pages expected `children`), Input/Textarea lacked `defaultValue`. Write
  interface contracts before implementing pages that consume them.
- **Data schema drift**: PRODUCTS, LOG_DATA, ROLES, RESOURCES were underspecified in first
  version (missing `users`, `revenue`, `description`, `icon`, `message`, `timestamp`, etc.).
  Pages were written against a richer assumed schema, requiring a data update pass.
  → Next time: draft the full data shape from the page mockup before writing data/index.ts.

### Skills to propose
See `skill-improvement-proposals.md`:
- `design-token-system` (new)
- `ui-component-library` (new)
- `frontend-scaffold` (new)
- `UI Build` chain (new chain in chains.md)
- `feature-implementation` frontend addendum
