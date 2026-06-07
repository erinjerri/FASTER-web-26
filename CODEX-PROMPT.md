# Codex Implementation Prompt — FASTER Website 2025

## Context

You are building the FASTER website (`faster-steam.org`) — a Next.js 14+ (App Router) frontend powered by PayloadCMS 3.x as the headless CMS. The design spec lives in `design.md` and all design tokens are in `design-tokens.json` in this repo. Read both files fully before writing any code.

The starting point is [`erinjerri/erinjerri-portf`](https://github.com/erinjerri/erinjerri-portf), an **existing personal website Payload CMS repo** that will be used as the technical foundation only, then stripped down and adapted. You will:
1. Keep the Payload CMS core and collection infrastructure
2. Keep only essential reusable content capabilities from the template
3. Remove blocks/components not needed for FASTER
3. Add FASTER-specific collections, blocks, and globals
4. Build the Next.js frontend pages that match the Figma design

Do not copy portfolio-specific content, labels, routes, navigation, seeded page copy, or personal branding from the template.

---

## Stack

- **CMS:** PayloadCMS 3.x (TypeScript)
- **Frontend:** Next.js 14+ App Router, TypeScript, Tailwind CSS
- **Fonts:** Poppins, Montserrat, Inter, Open Sans (Google Fonts) + Satoshi (Fontshare)
- **Styling:** Tailwind CSS — wire all design tokens from `design-tokens.json` into `tailwind.config.ts`

---

## Step 1: Tailwind Config — Wire Design Tokens

In `tailwind.config.ts`, extend the theme with all colors and font families from `design-tokens.json`:

```ts
// Colors from design-tokens.json color.*
// Font families: poppins, montserrat, inter, openSans, satoshi
// Font sizes matching the type scale
```

Use CSS custom properties (`--color-teal-primary: #1ABC9C` etc.) in `globals.css` as the source, then reference via Tailwind.

---

## Step 2: Payload CMS — Collections to Keep / Add

### Keep from the existing repo where useful:
- Payload CMS core configuration and collection patterns
- Next.js App Router, Tailwind, TypeScript, deployment, seed, and test patterns
- Substack import/cross-post support, adapted to the FASTER `posts` collection
- About/content page infrastructure, adapted to FASTER pages and design tokens
- Media handling and rich text patterns

### Strip from the existing repo (remove these public sections, nav items, collections, blocks, and routes unless repurposed below):
- Personal portfolio-specific content and collections, including projects, case studies, resume, personal services, or portfolio-only globals
- Public top-nav entries from the portfolio site: `Download`, `Speaking`, `Advisory`, `Experience`, `Read`, `Watch`, and `Book`
- Portfolio-specific page copy, seeded content, CTAs, personal biography content, images, testimonials, and service/product positioning
- Any collections not listed below

### Collections to implement:

#### `posts` (Blog)
```ts
fields: [
  { name: 'title', type: 'text', required: true },
  { name: 'slug', type: 'text', required: true, unique: true },
  { name: 'lede', type: 'textarea' },
  { name: 'heroImage', type: 'upload', relationTo: 'media' },
  { name: 'body', type: 'richText' },  // Lexical editor
  { name: 'byline', type: 'text' },
  { name: 'publishedAt', type: 'date' },
  { name: 'tags', type: 'array', fields: [{ name: 'tag', type: 'text' }] },
  { name: 'readLength', type: 'number', label: 'Read length (minutes)' },
]
```

#### `profiles` (Speaker/Leadership Directory)
```ts
fields: [
  { name: 'name', type: 'text', required: true },
  { name: 'slug', type: 'text', required: true },
  { name: 'photo', type: 'upload', relationTo: 'media' },
  { name: 'title', type: 'text' },
  { name: 'company', type: 'text' },
  { name: 'component', type: 'select', options: ['pros', 'fresh', 'education', 'facets', 'leadership'] },
  { name: 'bio', type: 'richText' },
  { name: 'linkedIn', type: 'text' },
  { name: 'website', type: 'text' },
  { name: 'featured', type: 'checkbox' },
]
```

#### `media`
Standard Payload media collection (keep from existing repo).

#### `pages` (optional — for FAQ, CoC, About, etc.)
```ts
fields: [
  { name: 'title', type: 'text' },
  { name: 'slug', type: 'text' },
  { name: 'content', type: 'richText' },
]
```

Use `pages` for FASTER content pages such as About, FAQ, Code of Conduct, Donate, Join, and other CMS-authored static pages. Preserve the template's flexible page/content approach only when it serves this FASTER hierarchy.

### Globals to implement:

#### `navigation`
```ts
fields: [
  {
    name: 'items',
    type: 'array',
    fields: [
      { name: 'label', type: 'text' },
      { name: 'href', type: 'text' },
      { name: 'variant', type: 'select', options: ['link', 'button'] },
    ]
  }
]
```

#### `footer`
```ts
fields: [
  { name: 'columns', type: 'array', fields: [
    { name: 'heading', type: 'text' },
    { name: 'links', type: 'array', fields: [
      { name: 'label', type: 'text' },
      { name: 'href', type: 'text' },
    ]}
  ]},
  { name: 'copyright', type: 'text' },
  { name: 'socialLinks', type: 'array', fields: [
    { name: 'platform', type: 'text' },
    { name: 'url', type: 'text' },
  ]},
]
```

#### `siteSettings`
```ts
fields: [
  { name: 'siteName', type: 'text', defaultValue: 'FASTER' },
  { name: 'logoLight', type: 'upload', relationTo: 'media' },
  { name: 'logoDark', type: 'upload', relationTo: 'media' },
  { name: 'newsletterHeading', type: 'text', defaultValue: 'Subscribe to our Newsletter' },
]
```

---

## Step 3: Next.js App Router Pages

### `/` — Landing Page

Layout:
1. `<Navbar />` — dark variant (`bg-[#151719]`)
2. `<HeroSection />` — mint green bg `#AFF4C6`, headline + body + JOIN button + logo
3. `<ComponentsGrid />` — 3-card grid "Our FASTER PROJECTS"
4. `<BodySections />` — 3 alternating content blocks (PROS, FRESH EDU)
5. `<SubscribeCTA />` — teal `#73DACE` strip
6. `<Footer />`

### `/blog` — Blog Index
- List of `posts` from Payload
- Each card: hero image thumbnail, title, lede, byline, date, read length, tags
- Preserve the template's Substack import workflow, but import into FASTER blog/news content only.

### `/blog/[slug]` — Blog Detail
- Full-width hero image
- `ALL POSTS ←` back nav
- Headline (Montserrat 60px bold)
- Lede + byline + date (Montserrat 26px light)
- Rich text body
- Sidebar: Resources (Satoshi font, white text)
- Pull quote support

### `/discover` — Directory
- Profile cards from `profiles` collection
- Filter by `component` field
- Featured profiles highlighted

### `/about`, `/donate`, `/join`, `/store`
- Simple page layout using `pages` collection content
- Same navbar/footer shell

### `/faq` and `/code-of-conduct`
- Hero section matching landing page style (`#AFF4C6`)
- Long-form rich text body (Open Sans 24px)
- Same navbar/footer

---

## Step 4: Component Library

Build these shared components in `components/`:

### `<Navbar variant="dark" | "light" />`
- `dark`: bg `#151719`, links `#D9FFF7`, active tab bg `#1ABC9C` text `#151719`
- `light`: bg white, links black
- Logo: swap based on variant
- Mobile: hamburger menu
- Links from `navigation` global

### `<HeroSection />`
```
Props: headline, body, ctaLabel, ctaHref, logoSrc, bgColor
Default bgColor: #AFF4C6
```

### `<ComponentCard />`
```
Props: badge, title, description, href, ctaLabel
Styles: bg #AFF4C6, badge bg #1E1E1E text white, card title black bold
```

### `<ContentBlock />`
```
Props: headline, body, ctaLabel, ctaHref, imageSrc, imagePosition ("left" | "right")
Alternating layout per section
```

### `<SubscribeCTA />`
```
Props: heading, buttonLabel
Styles: bg #73DACE, heading Inter 24px bold black, button #1E1E1E white
```

### `<Footer />`
```
Data from footer global
4-column grid desktop, stack mobile
bg #E6E6E6
Logo + social + copyright row at bottom
```

### `<BlogCard />`
```
Props: title, lede, heroImage, byline, date, readLength, slug, tags
```

### `<ProfileCard />`
```
Props: name, photo, title, company, component, linkedIn
```

### `<Button variant="primary" | "secondary" | "badge" />`
```
primary: bg #1E1E1E, text white, rounded-full, px-6 py-2
secondary: bg white, text black, border, rounded-full
badge: bg #1E1E1E, text white, text-xs uppercase tracking-widest, px-3 py-1
```

---

## Step 5: Data Fetching Pattern

Use Payload's REST API or Local API for data fetching.

```ts
// lib/payload.ts
const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

export async function getPosts() {
  const res = await fetch(`${PAYLOAD_URL}/api/posts?depth=1&limit=20`)
  return res.json()
}

export async function getPost(slug: string) {
  const res = await fetch(`${PAYLOAD_URL}/api/posts?where[slug][equals]=${slug}&depth=2`)
  const data = await res.json()
  return data.docs[0]
}

export async function getProfiles(component?: string) {
  const query = component ? `&where[component][equals]=${component}` : ''
  const res = await fetch(`${PAYLOAD_URL}/api/profiles?depth=1&limit=100${query}`)
  return res.json()
}

export async function getGlobal(slug: 'navigation' | 'footer' | 'siteSettings') {
  const res = await fetch(`${PAYLOAD_URL}/api/globals/${slug}`)
  return res.json()
}
```

Use `next: { revalidate: 60 }` for ISR on all fetches.

---

## Step 6: Seed Data

Seed these initial values via Payload's `afterOperation` hook or a seed script:

**navigation.items:**
Use the hierarchy from `design.md` and `design-tokens.json`, not the portfolio template navigation. The initial FASTER top nav is:

```json
[
  { "label": "ABOUT",    "href": "/about",    "variant": "link" },
  { "label": "DISCOVER", "href": "/discover", "variant": "link" },
  { "label": "READ",     "href": "/blog",     "variant": "link" },
  { "label": "WATCH",    "href": "/watch",    "variant": "link" },
  { "label": "DONATE",   "href": "/donate",   "variant": "link" },
  { "label": "JOIN",     "href": "/join",     "variant": "button" }
]
```

Do not seed or render the portfolio nav items `Download`, `Speaking`, `Advisory`, `Experience`, `Read`, `Watch`, or `Book` unless they are explicitly reintroduced as FASTER-specific CMS content later. `READ` and `WATCH` may appear only as the FASTER hierarchy defined in `design.md`, not as the original portfolio sections.

**footer** — seed from `design-tokens.json` `footer` object.

---

## Design Fidelity Rules

- All colors must come from `design-tokens.json` — no hardcoded color values in components
- All font families must be loaded via `next/font/google` (Poppins, Montserrat, Inter, Open Sans) and Fontshare (Satoshi via `next/font/local` or CSS import)
- Tailwind classes only — no inline styles except where Tailwind cannot express it
- Responsive: mobile-first, desktop breakpoints at `md` (768px) and `lg` (1024px)
- The 3-card component grid goes 1-col mobile → 3-col desktop
- Content blocks stack vertically on mobile, alternate image-left/right on desktop
- Footer is 1-col on mobile, 4-col on desktop

---

## What NOT to Build

- No authentication / user accounts (Payload admin is internal only)
- No e-commerce (Store page is just a link placeholder for now)
- No search functionality (out of scope for v1)
- No i18n
- Do not add animations or transitions beyond CSS hover states

---

## File Structure Target

```
/
├── payload/
│   ├── collections/
│   │   ├── Posts.ts
│   │   ├── Profiles.ts
│   │   ├── Media.ts
│   │   └── Pages.ts
│   ├── globals/
│   │   ├── Navigation.ts
│   │   ├── Footer.ts
│   │   └── SiteSettings.ts
│   └── payload.config.ts
├── app/
│   ├── (frontend)/
│   │   ├── page.tsx                  ← Landing
│   │   ├── blog/
│   │   │   ├── page.tsx              ← Blog index
│   │   │   └── [slug]/page.tsx       ← Blog detail
│   │   ├── discover/page.tsx
│   │   ├── about/page.tsx
│   │   ├── join/page.tsx
│   │   ├── donate/page.tsx
│   │   ├── faq/page.tsx
│   │   └── code-of-conduct/page.tsx
│   └── layout.tsx
├── components/
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── ComponentCard.tsx
│   ├── ComponentsGrid.tsx
│   ├── ContentBlock.tsx
│   ├── SubscribeCTA.tsx
│   ├── Footer.tsx
│   ├── BlogCard.tsx
│   ├── ProfileCard.tsx
│   └── Button.tsx
├── lib/
│   └── payload.ts
├── design.md                         ← Design spec (READ THIS)
├── design-tokens.json                ← All design tokens (READ THIS)
├── tailwind.config.ts
└── globals.css
```

---

## Start Here

1. Read `design.md` and `design-tokens.json` fully
2. Run the existing repo to understand current Payload config
3. Strip unneeded collections
4. Add FASTER collections and globals per Step 2
5. Wire Tailwind tokens per Step 1
6. Build shared components per Step 4
7. Build pages per Step 3
8. Add seed data per Step 6
9. Test all pages render correctly against the design spec in `design.md`
