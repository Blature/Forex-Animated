# STP Trading — Design System (MASTER)

> **Source of Truth.** Every page/component inherits from this file. Page-level deviations live in `design-system/pages/<page>.md` and override the rules below *only* for that page. If no page file exists, these rules are absolute.
>
> **Product:** FOREX / CFD broker marketing website (Next.js).
> **Category:** Fintech / Forex — institutional, regulated, high-trust.
> **Generated with:** `ui-ux-pro-max` skill (Dark Mode OLED + Modern Dark Cinema styles, Fintech color/landing data), then locked to the brand direction below.

---

## 1. Brand Direction (Locked)

| Attribute | Decision |
|-----------|----------|
| **Mood** | Dark OLED base · premium · institutional · trustworthy · precision |
| **Base** | Near-black layered OLED surfaces (deep, calm, low emission) |
| **Primary accent** | Electric green/teal — the financial "up" color, used for primary action & key emphasis |
| **Secondary accent** | Restrained gold — premium/VIP/award highlights ONLY, never for large fills |
| **Feel** | Bloomberg-terminal calm meets modern SaaS polish |

### Hard "Do Not" rules (anti-patterns — non-negotiable)
- ❌ **No AI purple/pink gradients** (`#8B5CF6`, `#A855F7`, magenta→violet). This is the single biggest tell of a generic AI site — banned everywhere.
- ❌ **No casino / scam signals**: no neon rainbow, no flashing CTAs, no spinning coins, no fake countdown timers, no confetti, no "🚀💰🔥" emoji, no glitch/scanline effects.
- ❌ **No pure `#FFFFFF` backgrounds** (dark-first product) and **no pure `#000000` for large scrolling surfaces** (causes OLED black-smear during scroll — use `--bg-base` instead; reserve true black only for the deepest static backdrop layer).
- ❌ **No unclear fees / hidden terms** in any pricing or CTA context.
- ❌ **No raw hex in components** — consume the semantic tokens in §2 only.
- ❌ **No color-only meaning** — up/down, error/success must pair color with icon/sign (▲ +/▼ −).

---

## 2. Color Tokens (LOCKED)

Dark is the **default and only** primary theme. All values verified for WCAG on the dark base (AA 4.5:1 text / 3:1 large & UI).

### 2.1 Surfaces & Elevation (OLED layered)
Elevation is expressed by **lightening the surface**, not by heavy shadows.

| Token | Hex | Use |
|-------|-----|-----|
| `--bg-deep` | `#05070A` | Deepest backdrop / page root (near-black, OLED) |
| `--bg-base` | `#080B10` | Default page background (scroll surface) |
| `--surface-1` | `#0D1117` | Cards, panels, default raised surface |
| `--surface-2` | `#141A22` | Nested cards, popovers, inputs |
| `--surface-3` | `#1B232E` | Hover surface, dropdowns, active rows |
| `--overlay` | `rgba(5,7,10,0.72)` | Modal scrim (≥60% black-equivalent for legibility) |

### 2.2 Text & Foreground
| Token | Hex | Contrast on `--bg-base` | Use |
|-------|-----|----|-----|
| `--fg` | `#F2F5F8` | 16.5:1 | Primary text, headings |
| `--fg-muted` | `#A4B0BD` | 7.6:1 | Secondary text, labels |
| `--fg-subtle` | `#6B7785` | 4.6:1 | Captions, placeholders, meta (min size 13px) |
| `--fg-disabled` | `#3A434E` | — | Disabled text (pair with `opacity` + semantics) |

### 2.3 Brand Accent — Electric Green / Teal (the "up" color)
| Token | Hex | Use |
|-------|-----|-----|
| `--accent` | `#00E5A0` | Primary CTA, active states, key highlights, focus ring |
| `--accent-hover` | `#00F5AD` | Hover (brighter) |
| `--accent-press` | `#00C488` | Pressed/active |
| `--accent-deep` | `#0B6E55` | Gradient anchor, borders, low-emphasis fills |
| `--on-accent` | `#04130E` | Text/icons ON the green CTA (near-black for AA) |
| `--accent-glow` | `rgba(0,229,160,0.22)` | Restrained glow behind primary CTA / focus halo |
| `--accent-tint` | `rgba(0,229,160,0.08)` | Faint background wash for selected/active rows |

### 2.4 Secondary Accent — Restrained Gold (premium highlight)
> Use sparingly: VIP tier, awards/regulation badges, "Premium" labels, decorative hairlines. **Never** a large fill, never a primary CTA.

| Token | Hex | Use |
|-------|-----|-----|
| `--gold` | `#D4AF37` | Premium accents, badge text/borders, icon highlights |
| `--gold-soft` | `#C8A951` | Muted gold for large-text/icon (better contrast) |
| `--gold-tint` | `rgba(212,175,55,0.10)` | Premium card wash / hairline gradient |
| `--on-gold` | `#0B0A04` | Text on a gold chip (rare) |

### 2.5 Semantic — Market & System (color + icon, never color alone)
| Token | Hex | Use |
|-------|-----|-----|
| `--up` | `#16C784` | Price up / profit / positive (pair with ▲ and `+`) |
| `--down` | `#EA3943` | Price down / loss / negative (pair with ▼ and `−`) |
| `--success` | `#16C784` | Success state |
| `--warning` | `#E0A526` | Warning (distinct from gold) |
| `--danger` | `#EA3943` | Errors, destructive actions |
| `--info` | `#3B9EFF` | Neutral informational |

> Brand accent (`#00E5A0`, teal-green) is intentionally a different hue from the market `--up` green (`#16C784`) so "buy/up" data never gets confused with "this is a button."

### 2.6 Borders & Lines
| Token | Value | Use |
|-------|-------|-----|
| `--border` | `rgba(255,255,255,0.08)` | Default hairline border (cards, dividers) |
| `--border-strong` | `rgba(255,255,255,0.14)` | Inputs, emphasized separation |
| `--border-accent` | `rgba(0,229,160,0.35)` | Active/focused input & selected card |
| `--grid-line` | `rgba(255,255,255,0.05)` | Chart gridlines (low-contrast, never compete with data) |

### 2.7 Locked CSS variables (copy verbatim into `globals.css`)
```css
:root {
  color-scheme: dark;

  /* surfaces */
  --bg-deep:#05070A; --bg-base:#080B10;
  --surface-1:#0D1117; --surface-2:#141A22; --surface-3:#1B232E;
  --overlay:rgba(5,7,10,0.72);

  /* text */
  --fg:#F2F5F8; --fg-muted:#A4B0BD; --fg-subtle:#6B7785; --fg-disabled:#3A434E;

  /* brand accent (electric green/teal) */
  --accent:#00E5A0; --accent-hover:#00F5AD; --accent-press:#00C488;
  --accent-deep:#0B6E55; --on-accent:#04130E;
  --accent-glow:rgba(0,229,160,0.22); --accent-tint:rgba(0,229,160,0.08);

  /* gold highlight (restrained) */
  --gold:#D4AF37; --gold-soft:#C8A951; --gold-tint:rgba(212,175,55,0.10); --on-gold:#0B0A04;

  /* semantic / market */
  --up:#16C784; --down:#EA3943; --success:#16C784;
  --warning:#E0A526; --danger:#EA3943; --info:#3B9EFF;

  /* borders */
  --border:rgba(255,255,255,0.08); --border-strong:rgba(255,255,255,0.14);
  --border-accent:rgba(0,229,160,0.35); --grid-line:rgba(255,255,255,0.05);
}
```

---

## 3. Typography (LOCKED)

Three families, one rhythm. All Google Fonts, `font-display: swap`, preload only the two critical weights.

| Role | Family | Weights | Use |
|------|--------|---------|-----|
| **Display / Headings** | `Inter Tight` | 600, 700 | H1–H3, hero, section titles (tight, premium) |
| **Body / UI** | `Inter` | 400, 500, 600 | Paragraphs, labels, buttons, nav |
| **Data / Numeric** | `JetBrains Mono` | 500, 600 | Prices, spreads, tickers, tables, stats, code |

```css
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;600&display=swap');
```

### 3.1 Tabular figures rule (critical for a trading site)
All numeric/financial data MUST use tabular figures so prices don't reflow as digits change:
```css
.tnum, table, .price, .ticker, [data-numeric] {
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum" 1;
}
```
Inline numbers in body text → Inter with `tnum`. Live prices, P/L, spreads, ticker, data tables → `JetBrains Mono`.

### 3.2 Type scale (1.250 major-third, base 16px)
| Token | Size / Line-height | Weight · Family | Use |
|-------|-------------------|------------------|-----|
| `display` | 60 / 64 (clamp 40→60) | 700 Inter Tight, tracking −0.02em | Hero headline |
| `h1` | 44 / 50 | 700 Inter Tight, −0.02em | Page title |
| `h2` | 32 / 40 | 700 Inter Tight, −0.015em | Section title |
| `h3` | 24 / 32 | 600 Inter Tight, −0.01em | Card / subsection |
| `h4` | 20 / 28 | 600 Inter | Minor heading |
| `body-lg` | 18 / 30 | 400 Inter | Lead paragraph |
| `body` | 16 / 26 | 400 Inter | Default body (never below 16px) |
| `body-sm` | 14 / 22 | 400 Inter | Secondary text |
| `caption` | 13 / 18 | 500 Inter | Meta, legal, badges (min readable) |
| `overline` | 12 / 16 | 600 Inter, tracking 0.08em, UPPERCASE | Eyebrows, labels |
| `data-lg` | 28 / 32 | 600 JetBrains Mono, tnum | Hero stat / live price |
| `data` | 16 / 24 | 500 JetBrains Mono, tnum | Table cells, spreads, P/L |

Rules: body line-height 1.5–1.65 · measure 60–75ch desktop / 35–60ch mobile · weight carries hierarchy (700 head / 400 body / 500–600 labels) · never tighten tracking on body.

---

## 4. Spacing & Layout (LOCKED)

### 4.1 Spacing scale — 4px base, 8px rhythm
`0·4·8·12·16·20·24·32·40·48·64·80·96·128`

| Token | px | Token | px |
|-------|----|-------|----|
| `space-0` | 0 | `space-6` | 24 |
| `space-1` | 4 | `space-8` | 32 |
| `space-2` | 8 | `space-10` | 40 |
| `space-3` | 12 | `space-12` | 48 |
| `space-4` | 16 | `space-16` | 64 |
| `space-5` | 20 | `space-20` | 80 |
| | | `space-24` | 96 |
| | | `space-32` | 128 |

### 4.2 Section rhythm (vertical)
- Component gap: 16 / 24 · Card padding: 24 (desktop) / 16 (mobile)
- Between subsections: 48 · **Between major sections: 96–128 desktop / 64 mobile**
- Hero vertical padding: 128 top / 96 bottom desktop.

### 4.3 Grid & containers
| Token | Value |
|-------|-------|
| `--container-max` | `1200px` (content) · `1440px` (full-bleed sections) |
| Gutter | 24px desktop · 16px mobile · 32px ≥1440 |
| Columns | 12-col desktop · 6-col tablet · 4-col mobile |
| Breakpoints | `375 · 640 · 768 · 1024 · 1280 · 1440` |

### 4.4 Radius, border, elevation
| Token | Value | Use |
|-------|-------|-----|
| `--radius-sm` | 8px | Inputs, chips, badges |
| `--radius-md` | 12px | Buttons |
| `--radius-lg` | 16px | Cards, panels |
| `--radius-xl` | 24px | Hero/feature blocks, modals |
| `--radius-full` | 9999px | Pills, avatars |
| Border width | 1px hairline default |

Shadows are **minimal** on dark — use surface lightening + hairline borders. Reserved tokens:
```css
--shadow-sm:0 1px 2px rgba(0,0,0,0.40);
--shadow-md:0 8px 24px rgba(0,0,0,0.45);
--shadow-pop:0 16px 48px rgba(0,0,0,0.55);   /* dropdowns/modals only */
--z: 0 / 10 / 20 / 40 / 100 / 1000;          /* base/sticky/dropdown/overlay/modal/toast */
```

---

## 5. Animation & Effects (LOCKED)

Motion is **restrained and meaningful** — institutional, not playful. Animate 1–2 elements per view.

### 5.1 Duration & easing tokens
```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);   /* enter — confident, premium */
--ease-in:  cubic-bezier(0.4, 0, 1, 1);      /* exit */
--ease-std: cubic-bezier(0.4, 0, 0.2, 1);    /* standard */
--dur-fast: 150ms;   /* hover, press, color */
--dur-base: 220ms;   /* default transitions */
--dur-slow: 320ms;   /* enter/expand, modals (≤400ms) */
```
Rules: micro-interactions 150–300ms · complex ≤400ms · **never >500ms** for UI · **exit ~65% of enter** duration · ease-out entering / ease-in exiting · never `linear` for UI.

### 5.2 Performance rules (hard)
- Animate **`transform` and `opacity` only** — never `width/height/top/left` (no CLS, no reflow).
- Reserve space for async content (skeletons) — CLS < 0.1.
- `will-change` only on actively animating elements; remove after.

### 5.3 Signature effects (on-brand)
| Effect | Spec |
|--------|------|
| **Primary CTA glow** | Static soft `--accent-glow` halo; on hover brighten to `--accent-hover` + lift `translateY(-1px)` over 150ms. No pulsing. |
| **Press feedback** | `scale(0.98)` on `:active`, restore on release (120ms). Never shift layout. |
| **Live ticker** | Continuous horizontal marquee, slow & even; `prefers-reduced-motion` → static, scrollable. |
| **Price flash** | On value change: brief `--up`/`--down` background tint fading to transparent over 600ms (color + ▲/▼ sign). |
| **Number roll** | Animate digit count-up on stat reveal (≤400ms, ease-out, tnum so no width jump). |
| **Section reveal** | Fade + `translateY(12px→0)`, ease-out 320ms, stagger 40ms per item. Once, on scroll-in. |
| **Glass nav** | Sticky header: `backdrop-blur(16px)` over `rgba(8,11,16,0.7)` + bottom hairline border. Blur used for hierarchy, not decoration. |
| **Accent gradient** | Allowed: `--accent` → `--accent-deep` (teal-green) for hero glow/borders. Gold only as thin gradient hairline on premium cards. **No purple/pink, ever.** |

### 5.4 Accessibility (always)
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration:.01ms!important; animation-iteration-count:1!important; transition-duration:.01ms!important; scroll-behavior:auto!important; }
}
```
Animations must be interruptible · never block input · never the sole carrier of meaning.

---

## 6. Component Conventions (defaults)

- **Buttons**: Primary = `--accent` fill / `--on-accent` text / `--radius-md` / 44px min height / glow halo. Secondary = transparent + `--border-strong`, `--fg` text. Ghost = text + accent on hover. Destructive = `--danger`. One primary CTA per view.
- **Inputs**: `--surface-2` bg, `--border-strong`, focus → `--border-accent` + accent ring, visible label (never placeholder-only), helper text below, error below field with icon, ≥44px height.
- **Cards**: `--surface-1`, `--radius-lg`, hairline `--border`, hover → `--surface-3` + border brighten (no layout shift). Premium card → `--gold-tint` hairline gradient.
- **Tables / market data**: `JetBrains Mono` + tnum, up/down with sign+arrow+color, sticky header, zebra via `--surface-2`, right-align numerics.
- **Focus**: visible 2–3px ring in `--accent` on every interactive element — never removed.
- **Icons**: Lucide (stroke 1.5–2px), SVG only, sizes `16 / 20 / 24`, never emoji. One style per hierarchy.
- **Charts**: `--up`/`--down` for direction, multi-series uses an accessible categorical set (not red/green-only), `--grid-line` gridlines, tooltips on hover+focus, table fallback, animation respects reduced-motion.

---

## 7. Trust Layer (forex/CFD specific — required)

Institutional credibility is the conversion driver. Every relevant page must surface:
- Regulation/license badges (gold or neutral, never loud), security/encryption signals.
- **Transparent pricing**: spreads, leverage, fees stated plainly (`--up`/`--fg`), no hidden terms.
- **Risk disclosure** clearly legible (`--fg-muted`, ≥13px) — not buried, not hidden.
- Social proof: real stats (tabular figures), partner/liquidity logos, verified reviews.
- Landing pattern: **Trust & Authority + Conversion** → Hero (credibility) → Proof (regs, certs, stats) → Solution → low-friction CTA. Primary CTA sticky in nav + post-proof.

---

## 8. Locked-token summary (the four things you asked to lock)

1. **Colors** — §2. Brand `--accent #00E5A0` (electric teal-green) + restrained `--gold #D4AF37`; OLED surfaces `#05070A → #1B232E`; market `--up #16C784` / `--down #EA3943`. No purple/pink.
2. **Typography** — §3. `Inter Tight` (display) · `Inter` (body) · `JetBrains Mono` (data), all with tabular-nums for figures.
3. **Spacing** — §4. 4px base / 8px rhythm `0·4·8·12·16·24·32·48·64·96·128`; sections 96–128px; radii `8·12·16·24`.
4. **Animation/Effects** — §5. ease-out `(0.16,1,0.3,1)`, 150–320ms, transform/opacity only, restrained accent glow + glass nav + ticker/price-flash, reduced-motion honored. No casino motion.

*End of MASTER. Page overrides → `design-system/pages/<page>.md`.*
