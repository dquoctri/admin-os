# Design Decisions

Reusable rules and rationale for design choices in this project.
Add entries when a decision has a non-obvious reason or a rule that should carry forward.

---

## Off-White Surface Colors

### Rule: Use off-whites for surface hierarchy, not pure white as page background

Pure `#FFFFFF` as a page background flattens the UI — cards and panels have nowhere to go.
Shift the background down one step so the topmost surface (card/modal) can be white.

**3-tier hierarchy:**

| Token | Typical value | Role |
|---|---|---|
| `t.bg` | `#F5F5F5` (Cultured) | Page / outermost background |
| `t.bgAlt` / `t.sidebar` | `#FAFAFA` (Alabaster) | Panel / sidebar surface |
| `t.card` | `#FFFFFF` | Card / modal — topmost layer |
| `t.cardBorder` / divider | `#E5E4E2` (Platinum) | Dividers, table zebra stripe, input fill |

The eye reads lighter = closer without needing box-shadow.
Beyond 3 tiers the hierarchy collapses — don't add a 4th level.

---

### Rule: Do not mix warm and cool off-whites on the same surface

Warm (`#FAF0E6` Linen, `#FDF5E6` Old Lace, `#FFFFF0` Ivory`) and cool (`#F0FFFF` Azure, `#F8F8FF` Ghost White) off-whites look dirty when placed adjacent.
Within a single mood, stay on one temperature axis.

**Warm tones → Warm mood** (welcoming, editorial, hospitality, human brands)  
**Cool tones → Cool mood** (SaaS, data, medical, precise/airy feel)  
**Neutral tones** (Cultured, Alabaster, Platinum) → safe default; works with any accent

In this project: swapping `t.bg` and `t.card` to warm values is all that changes the mood temperature — the rest of the tokens inherit automatically.

---

### Rule: Common off-white roles in web app components

| Component | Recommended token / value |
|---|---|
| Page background | `#F5F5F5` Cultured |
| Card / panel | `#FAFAFA` Alabaster or `#FFFFFF` |
| Sidebar (vs main content) | `#F5F5F5` — lighter than card, no heavy border needed |
| Table zebra stripe | Alternate `#FAFAFA` / `#FFFFFF` |
| Unfocused input fill | `#F5F5F5`; `#FFFFFF` on focus signals interactivity |
| Code block / `<pre>` | `#F8F8FF` Ghost White — near-universal convention |
| Warning toast background | `#FDF5E6` Old Lace — warm tint instead of saturated yellow |

---

### Rule: Warm light preset formula

To create a warm light variant of any cool-neutral theme, change only two tokens:

```
t.bg   #F5F5F5 → #FDF5E6  (Old Lace)
t.card #FFFFFF → #FAF0E6  (Linen)
```

The entire UI shifts tone. No other color tokens need to change.
Apply this when adding a "Warm Light" mood to `buildTheme()`.
