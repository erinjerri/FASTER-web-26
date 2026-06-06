# FASTER Website 2025 — Design Specification

> Source: Figma file `XhOh8L9DeyrKS8BtAk7HiB` (FASTER Website 2025-v1)  
> Extracted: 2026-06-06

---

## 1. Brand Overview

**Organization:** FASTER — Filipinx Americans in Science Technology Engineering Arts and Mathematics (STEAM)  
**Founded:** 2015 by Erin Jerri Malonzo Pañgilinan  
**Mission:** We create, connect, and cultivate a movement of Filipinx Americans in STEAM.  
**Tech stack target:** PayloadCMS (headless) + Next.js frontend

---

## 2. Color System

### Primary Palette (ui-color-palette-1 — Active Design)

| Token Name | Hex | Usage |
|---|---|---|
| `color-teal-primary` | `#1ABC9C` | Nav active state, links, accents |
| `color-teal-mid` | `#66CCCC` | Secondary teal, hover states |
| `color-teal-light` | `#73DACE` | Subscribe section background |
| `color-teal-pale` | `#AFF4C6` | Hero background, component cards |
| `color-deep-teal` | `#005E5E` | Dark teal for contrast elements |
| `color-near-black` | `#2F2F2F` | Body text |
| `color-dark-ui` | `#151719` | Navbar background |
| `color-off-white` | `#FDFDFD` | Page background |
| `color-orange-accent` | `#FFA66B` | Warm accent / CTA highlight |

### Secondary Palette (ui-color-palette-2)

| Token Name | Hex | Usage |
|---|---|---|
| `color-midnight-teal` | `#013F3F` | Deep dark bg alternative |
| `color-slate` | `#434A54` | Dark secondary text / dark UI |
| `color-navy` | `#1E2A38` | Dark section backgrounds |
| `color-sky-pale` | `#E6F1F5` | Light section backgrounds |
| `color-yellow-accent` | `#FFD76B` | Highlight / badge |

### Tertiary Palette (ui-color-palette-3)

| Token Name | Hex | Usage |
|---|---|---|
| `color-emerald` | `#1ABC9C` | (shared with primary) |
| `color-charcoal` | `#34495E` | Alt dark text |
| `color-blue-light` | `#AEDFF7` | Info tints |
| `color-silver` | `#BDC3C7` | Borders, dividers |
| `color-purple-accent` | `#693E71` | Special callouts |

### Neutral / UI Grays

| Token Name | Hex | Usage |
|---|---|---|
| `color-gray-text` | `#757575` | Footer links, secondary text |
| `color-gray-border` | `#E6E6E6` | Footer divider, card borders |
| `color-gray-light` | `#F8F8F8` | Card backgrounds |
| `color-gray-mid` | `#D7D7D7` | Image placeholders |
| `color-text-primary` | `#000000` | Primary headings |
| `color-text-dark` | `#1E1E1E` | Dark body text |
| `color-nav-text` | `#D9FFF7` | Inactive nav links (on dark bg) |

---

## 3. Typography

### Font Families

| Font | Role | Source |
|---|---|---|
| **Poppins** | Primary headings, section titles | Google Fonts |
| **Montserrat** | Blog/article headlines and body | Google Fonts |
| **Inter** | UI elements — nav, footer, labels | Google Fonts |
| **Open Sans** | Body copy, FAQ, long-form text | Google Fonts |
| **Satoshi** | Special sidebar/resource labels | Fontshare |

### Type Scale

| Token | Font | Size | Weight | Usage |
|---|---|---|---|---|
| `text-hero` | Poppins | 40px | 900 | Page hero titles |
| `text-article-headline` | Montserrat | 60px | 700 | Blog post headline |
| `text-article-lede` | Montserrat | 26px | 300 | Blog post lede / byline |
| `text-section-heading` | Poppins | 20px | 900 | Section subheadings |
| `text-nav` | Inter | 14px | 500 | Navigation items |
| `text-footer-heading` | Inter | 24px | 700 | Footer column headings |
| `text-footer-link` | Inter | 16px | 500 | Footer links |
| `text-body` | Open Sans | 24px | 400 | Body / long-form copy |
| `text-label` | Open Sans | 14px | 400 | Color palette labels, meta |
| `text-resource` | Satoshi | 20px | 400/900 | Sidebar resource links |

---

## 4. Pages & Sections

### 4.1 Landing Page (`/`)

#### Navbar — Dark Desktop
- Background: `#151719`
- Logo: FASTER logo (white/teal transparent variant)
- Nav items: `ABOUT`, `DISCOVER`, `READ`, `WATCH`, `DONATE`, `JOIN`
- Inactive link color: `#D9FFF7` (Inter 14px w500)
- Active link: background fill `#1ABC9C`, text `#151719`

#### Hero Section
- Background: `#AFF4C6` (pale mint green rectangle `hero-bkgrd-teal`)
- Headline: `"Welcome to FASTER / Filipinx Americans in Science / Technology..."` — Poppins 40px w900 black
- Body copy: Full mission statement — Open Sans, black
- CTA Button: `JOIN` — dark fill (`#1E1E1E`), white text
- Logo: `faster-logo-white-teal-transparent` in hero area

#### FASTER Components Block (3-card grid)
Section heading: `"Our FASTER PROJECTS"` — black, bold  
Three cards with `#AFF4C6` background:

1. **FASTER PODCAST / FASTER Education**
   - Badge: `LEARN` (dark `#1E1E1E` fill, white text)
   - Card title: `"FASTER PODCAST"` / `"FASTER Education"`

2. **FASTER BOOK / FASTER PROS**
   - Badge: `CONTRIBUTE` / `JOIN COALITION`
   - Card title: `"FASTER BOOK"` / `"FASTER PROS"`

3. **FASTER Archive Directory**
   - Badge: `COMING SOON`
   - Card title: `"FASTER Archive Directory and Collection"`
   - Description text in `#1E1E1E`

#### Body Sections (3 alternating content blocks)

**FASTER PROS** (`OUR FASTER COMPONENTS` intro title)
- Section headline: `"FASTER PROS"` — black, Poppins heavy
- Button: `CONNECT` — white fill
- Body: Coalition description (Open Sans, `#1E1E1E`)
- Image placeholder: right side

**FASTER FRESH Entrepreneurship**
- Section headline: `"FASTER FRESH Entrepreneurship"`
- Button: `INNOVATE` — white fill
- Body: Innovation/startup network copy

**FASTER Education**
- Section headline: `"FASTER Education"`
- Button: `INSPIRE` — white fill
- Body: Next generation inspiration copy
- Image: `img-right-FASTERCON19-Group2` photo (right side)

#### Subscribe / Newsletter CTA
- Background: `#73DACE`
- Heading: `"Subscribe to our Newsletter"` — Inter 24px w700, black
- Button: `Subscribe` — dark fill `#1E1E1E`, white text

#### Footer
- Background: `#E6E6E6`
- Logo: FASTER logo
- Social links placeholder
- Copyright: `"© FASTER - Filipinx Americans in STEAM. All rights reserved. Made with PayloadCMS."`

**Footer columns:**
| Column | Links |
|---|---|
| ARCHIVE | Substack, YouTube, Blog, FASTER Collection (Museum, Wikimedia) |
| JOIN | FASTER FACETS, FASTER FRESH, FASTER Education, FASTER PROS |
| ORGANIZATION | Donate, About, Store |
| LEGAL | Accessibility Statement, Cookie Consent Policy, Copyright Notice, Data Storage Disclosure, Privacy Policy, Terms & Conditions |

Footer text: Inter 16px w500, color `#757575`  
Footer headings: Inter 24px w700, color `#000000`

---

### 4.2 FAQ / Code of Conduct Page (`/faq`, `/code-of-conduct`)

- Shared layout with hero area: `#AFF4C6` background
- Hero headline: `"FASTER Official Code of Conduct"` / `"FASTER Frequently Asked Questions (FAQs)"` — Poppins 40px w900
- Body: Open Sans 24px w400, black
- Same navbar and footer as landing page
- CTA button in hero: `READ MORE` — dark fill, white text

**FAQ Sections:**
- FASTER General Member Questions
- Philippine-related concerns
- Immigration Questions
- FASTER Education Questions
- FASTER PROS Questions
- FASTER FACETS Questions
- FASTER FRESH Questions

---

### 4.3 Blog Detail Page (`/blog/[slug]`)

- Background: white `#FFFFFF`
- Hero image: full-width photo
- Back navigation: `"ALL POSTS"` with arrow — Poppins 20px w900, black
- Article headline: Montserrat 60px w700, black
- Lede/summary: Montserrat 26px w300, black
- Byline: `"By Erin Pangilinan"` — Montserrat 26px w300
- Date: Montserrat 26px w300
- Body: long-form text
- Pull quote: with left border divider
- Sidebar resources:
  - `Resources` heading: Satoshi 20px w900, white
  - Links: `FASTER Library`, `FASTER Directory`, `FASTER Job Board` — Satoshi 20px w400, white

---

### 4.4 Directory / Discover Page (`/discover`)

- Frames: `FASTER-Profile-Leadership`, `FASTER-Speaker-Leadership`
- Profile and speaker directory cards
- Dark hero background option

---

## 5. Components

### Navbar
```
[Logo] | ABOUT  DISCOVER  READ  WATCH  DONATE  [JOIN button]
Dark bg #151719 | Active tab: #1ABC9C fill
```

### Card (FASTER Component Card)
```
┌──────────────────────┐
│  [Badge pill]         │  ← #1E1E1E bg, white text
│                       │
│  [Icon/Image]         │  ← #F8F8F8 bg placeholder
│                       │
│  Card Title           │  ← black, bold
│  Description copy     │  ← #1E1E1E, smaller
└──────────────────────┘
Background: #AFF4C6
```

### Button (Primary Dark)
```
Background: #1E1E1E
Text: white
Padding: generous horizontal
Border-radius: pill/rounded
```

### Button (Secondary / Outlined)
```
Background: white
Text: black
Border: visible
```

### Subscribe CTA Bar
```
Background: #73DACE
[Subscribe to our Newsletter]  [Subscribe →]
```

### Footer
```
4-column grid on desktop
Logo + social + copyright below
Background: #E6E6E6
```

---

## 6. Payload CMS Content Types (Reference)

Based on design annotations, these are the content blocks/collections needed:

| Collection | Notes |
|---|---|
| `pages` | Landing, FAQ, CoC, About, Donate, Store |
| `posts` (Blog) | title, lede, hero image, body (rich text), byline, date, tags |
| `profiles` | Speaker/Leadership directory entries |
| `components` | FASTER PROS, FRESH, Education, FACETS, Archive — each with name, badge text, description, CTA |
| `navigation` | Global nav links |
| `footer` | Footer columns, copyright, social links |
| `newsletter` | Subscribe CTA block |

---

## 7. Layout Notes

- **Desktop width:** Standard wide layout, content max-width ~1280px
- **Section pattern:** alternating image-left / image-right content blocks
- **Spacing:** generous padding between sections
- **Hero:** full-width color background (no image background on landing — color block only)
- **Blog hero:** full-width photo
- **Cards:** 3-column grid on desktop

---

## 8. Assets Needed

- FASTER logo (normal — on white/light bg)
- FASTER logo (white/teal transparent — on dark bg or in hero)
- Hero photo (FASTERCON19 group photo for Education section)
- Blog post hero images (per post)
- Profile/speaker photos (directory)
