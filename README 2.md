# FASTER Platform

Composable content platform for FASTER - Filipinx Americans in Science, Technology, Engineering, Arts, and Mathematics.

This repository uses [`erinjerri/erinjerri-portf`](https://github.com/erinjerri/erinjerri-portf) as the technical foundation only:

- Next.js 15 App Router
- Payload CMS 3
- Tailwind CSS
- TypeScript
- Netlify-oriented deployment architecture
- Substack import workflow adapted for FASTER posts

The FASTER visual system lives in:

- [`design.md`](./design.md)
- [`design-tokens.json`](./design-tokens.json)

All new UI should consume the token-backed design system in `src/design-system`.

## Information Architecture

The public navigation follows the Figma/design hierarchy:

- ABOUT
- DISCOVER
- READ
- WATCH
- DONATE
- JOIN

Portfolio-specific navigation and content from the template should not be copied into FASTER. Removed public IA includes Download, Speaking, Advisory, Experience, Read, Watch, and Book as they existed on the original portfolio site.

## Development

```bash
pnpm install
pnpm dev
```

Generate Payload types after schema changes:

```bash
pnpm generate:types
```

## CMS Direction

FASTER pages are intended to be composed from Payload blocks. The active FASTER block set includes hero, mission/vision/values, leadership, membership programs, directory categories, metrics, feature grids, and preview blocks for events, resources, and news.

