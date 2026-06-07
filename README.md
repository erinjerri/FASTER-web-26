# FASTER Platform

Composable content platform for FASTER - Filipinx Americans in Science, Technology, Engineering, Arts, and Mathematics.

This repository uses [`erinjerri/erinjerri-portf`](https://github.com/erinjerri/erinjerri-portf) as the technical foundation only. Keep the architecture and CMS patterns; do not copy portfolio-specific content, labels, routes, or branding.

## Stack

- Next.js 15 App Router
- Payload CMS 3
- MongoDB via `@payloadcms/db-mongodb`
- Tailwind CSS
- TypeScript
- Netlify-oriented deployment files
- Cloudflare R2-compatible media storage
- Substack import workflow adapted for FASTER posts

## Design System

The FASTER visual source of truth is committed in:

- [`design.md`](./design.md)
- [`design-tokens.json`](./design-tokens.json)

Token-backed TypeScript modules and UI primitives live in `src/design-system`. New UI should consume those tokens/components instead of hardcoding colors, typography, spacing, or radius values.

## Information Architecture

The public navigation follows the Figma/design hierarchy:

- ABOUT
- DISCOVER
- READ
- WATCH
- DONATE
- JOIN

Portfolio-specific public IA from the base template should stay removed unless intentionally reintroduced as FASTER content. Removed template sections include Download, Speaking, Advisory, Experience, Book, and the portfolio versions of Read/Watch.

## Prerequisites

Install:

- Node.js 20+ recommended
- pnpm 9 or 10
- MongoDB, either local or MongoDB Atlas

On macOS with Homebrew:

```bash
brew install node pnpm mongodb-community
```

If using local MongoDB:

```bash
brew services start mongodb-community
```

## Install

```bash
pnpm install
```

If native packages such as `sharp` or Next SWC fail on macOS, rebuild them with:

```bash
pnpm rebuild sharp @next/swc-darwin-arm64
```

## Environment Variables

Create a local env file:

```bash
cp .env.example .env
```

Never commit `.env`.

Required local values:

```bash
DATABASE_URL=mongodb://127.0.0.1/faster-platform
PAYLOAD_SECRET=<generate-a-long-random-secret>
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=<openssl-rand-base64-32>
PREVIEW_SECRET=<generate-a-long-random-secret>
CRON_SECRET=<generate-a-long-random-secret>
```

Generate a valid Next server action key:

```bash
openssl rand -base64 32
```

Generate secrets:

```bash
openssl rand -hex 32
```

### MongoDB

Local MongoDB:

```bash
DATABASE_URL=mongodb://127.0.0.1/faster-platform
```

MongoDB Atlas:

```bash
DATABASE_URL=mongodb+srv://<username>:<password>@<cluster-host>/<database-name>?retryWrites=true&w=majority
```

Make sure Atlas network access allows the deploy host and local development IPs that need access.

### Cloudflare R2 Media Storage

Payload can use Cloudflare R2 through the S3 adapter. Create an R2 bucket and API token in Cloudflare, then set:

```bash
USE_R2_STORAGE=true
R2_PUBLIC_READS=true
R2_ACCOUNT_ID=<cloudflare-account-id>
R2_BUCKET=<bucket-name>
R2_ACCESS_KEY_ID=<r2-access-key-id>
R2_SECRET_ACCESS_KEY=<r2-secret-access-key>
R2_ENDPOINT=https://<cloudflare-account-id>.r2.cloudflarestorage.com
R2_FORCE_PATH_STYLE=true
```

Optional custom public media hostname:

```bash
R2_PUBLIC_HOSTNAME=media.yourdomain.com
```

For local-only development, keep R2 off:

```bash
USE_R2_STORAGE=false
```

### Substack

Set the FASTER Substack publication URL:

```bash
SUBSTACK_SUBSCRIBE_URL=https://yournewsletter.substack.com
```

Run sync when configured:

```bash
pnpm sync:substack
```

## Development

Start the app:

```bash
pnpm dev
```

Open:

- Frontend: `http://localhost:3000`
- Payload admin: `http://localhost:3000/admin`

If port 3000 is occupied:

```bash
pnpm dev -- --port 3001
```

Then open `http://localhost:3001/admin`.

## Payload CMS

Payload routes are mounted through the Next app:

- Admin: `/admin`
- REST API: `/api`
- GraphQL: `/api/graphql`
- GraphQL Playground: `/api/graphql-playground`

After changing collections, globals, blocks, or admin components, regenerate Payload files:

```bash
pnpm generate:importmap
pnpm generate:types
```

Current FASTER CMS direction:

- Pages are composable via Payload blocks.
- Blog/news content uses `posts`.
- Leadership and directory content uses `profiles`.
- Media uses Payload uploads, with optional Cloudflare R2 storage.

Active FASTER block set:

- Hero
- Mission / Vision / Values
- Leadership
- Membership Programs
- Directory Categories
- Metrics
- Feature Grid
- Event Preview
- Resource Preview
- News Preview

## Media Resizing

Local admin currently keeps image resizing off unless explicitly enabled:

```bash
PAYLOAD_ENABLE_IMAGE_RESIZE=true
```

Only enable this after `sharp` loads cleanly in your local Node runtime. Without it, media uploads can still work, but Payload will not create derivative image sizes.

## Verification

Useful checks:

```bash
pnpm generate:importmap
pnpm generate:types
pnpm build
```

During the initial conversion, old portfolio files may still reference removed collections such as `projects`, `watch`, `forms`, and `affiliateProducts`. Clean those up before treating a full production build as final.

## Commit Hygiene

Do not commit:

- `.env`
- `node_modules/`
- `.next/`
- local uploaded media under `public/media/`
- test reports or local caches

Commit:

- `design.md`
- `design-tokens.json`
- source files under `src/`
- Payload generated import map/types when schema changes
- lockfile and package metadata

