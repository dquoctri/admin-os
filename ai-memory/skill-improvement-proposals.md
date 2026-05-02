# Skill Improvement Proposals

## Proposals for `~/dqtri-agent-skills/skills/`

---

### NEW: `design-token-system`

**Problem the skill solves:**
The existing 13 skills handle process (planning, refactor, etc.) but nothing covers the
systematic design of a type-safe token/theme system — a recurring need in any UI project.

**What the skill should contain:**
- Identify token dimensions: which properties vary (color palettes, geometry, spacing, typography)
- Separate *independent* dimensions (mood, mode, corners) so they can be composed freely
- Design a generator function pattern (`buildTheme(mood, mode)`) rather than a static lookup table —
  generators scale better when dimensions multiply
- Expose tokens via a typed context object so every component reads from one source of truth
- Key invariant: structural tokens (border-radius, spacing) live separately from color tokens so
  corner style changes don't require rebuilding the color system

**Why not covered by existing skills:**
`architecture` handles high-level system decomposition; `api-design` handles interface contracts.
Neither covers the specific compositional token-system pattern or the radii/color separation insight.

**Session evidence:**
- Initial design had 6 flat themes (warm, cool, pastel, mono, light, dark) baked as static objects
- Refactored to mood(4) × mode(2) × corners(3) = 24 combinations via `buildTheme()` + `RADII`
- Added 5 named presets as shortcuts over the composition — not replacing it
- This pattern is reusable for any design system (mobile, marketing sites, component libraries)

---

### NEW: `ui-component-library`

**Problem the skill solves:**
Building a reusable React component library from a design spec requires a systematic approach:
component inventory, interface design, token consumption, and a predictable file structure.
`feature-implementation` is too broad and doesn't encode these patterns.

**What the skill should contain:**
- **Inventory phase**: catalog every distinct visual element from the design into a component tree
  (primitives → composites → layout → pages)
- **Interface design**: for each component, decide controlled vs uncontrolled, required vs optional
  props, and extension points (style override, children slot, control slot)
- **Token consumption pattern**: all visual values from `useTheme()` — never hardcoded; pass `r`
  (radii) alongside `t` (theme) since geometry and color are independent
- **Build order**: primitives first (Icon, Button, Input), then composites (Modal, Card), then layout
  (Sidebar, AppShell), then pages — never the reverse
- **Gotchas list** (learned from this session):
  - `value` + `onChange` vs `defaultValue` — support both; `value !== undefined` determines controlled mode
  - Toggle: use `checked` not `value` to match idiomatic React checkbox conventions
  - SettingRow: provide both `control` and `children` slots for flexibility
  - SVG charts: animations via `stroke-dashoffset` and `scaleY` require global keyframes in index.css,
    not inline styles

**Why not covered by existing skills:**
`feature-implementation` handles general coding tasks. It doesn't encode the specific build order,
interface contract patterns, or the gotchas unique to component libraries.

---

### NEW: `frontend-scaffold`

**Problem the skill solves:**
Setting up a React/Vite/TS project with React Router, Context providers, mock data, and page
routing is a repeated 15-minute task with many small decisions. A skill codifies the right defaults.

**What the skill should contain:**
- Project structure: `tokens/`, `context/`, `components/primitives/`, `components/charts/`,
  `components/layout/`, `pages/`, `data/`
- Vite config defaults (plugin-react, path alias `@`)
- React Router v6 layout route pattern: one `<AppShell>` with `<Outlet/>`, all pages as children
- Context pattern: one provider at root, `useX()` hooks in components — no prop-drilling
- Mock data module: one `data/index.ts` with all table rows, chart series, navigation config
- Skeleton loading: `useEffect` on `location.pathname` + timeout → `<SkeletonPage>` overlay
- Global CSS: only keyframe animations and the `.row-actions` hover class; everything else inline

**Why not covered by existing skills:**
`planning` produces a plan but not the scaffold itself. This skill produces the actual project
skeleton (package.json, vite.config, tsconfig, index.html, main.tsx, App.tsx, folder structure).

---

### CHAIN ADDITION: `UI Build`

Add to `chains.md`:

```markdown
### UI Build
For greenfield UI projects from a design spec.

spec-design → frontend-scaffold → design-token-system → ui-component-library → feature-implementation → code-review
```

**When to use:** User has a visual design (HTML prototype, Figma, screenshots) and wants a
React implementation with a configurable design system and reusable components.

---

### ENHANCEMENT: `feature-implementation` — frontend addendum

Add a frontend section noting:
- Always derive the full component list from the design before writing any code
- Write data module before page components (pages depend on data shape)
- Run `tsc --noEmit` after each batch of components; fix errors before moving on
- Don't test with `npm run dev` until all imports resolve (avoids cascading errors)
