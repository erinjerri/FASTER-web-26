# System Architecture

This document separates verified repository state from proposed target architecture.

## Current State

| Area | Current evidence |
| --- | --- |
| Frontend | Next.js 15 App Router with React 19 |
| CMS | Payload CMS 3 mounted inside the Next app |
| Database | MongoDB adapter via `@payloadcms/db-mongodb` |
| Media | Payload `media` uploads stored locally by default, with optional R2/S3 storage support |
| Deployment | `netlify.toml`, `@netlify/plugin-nextjs`, and `pnpm run build:netlify` |
| Local database | `docker-compose.yml` includes MongoDB, though the app service still uses `yarn` and should be reviewed before relying on it |
| Current directory-like content | Payload `profiles` collection |

## Proposed Target State

| Component | Responsibility |
| --- | --- |
| Next.js / React | Public frontend, directory pages, content rendering, search and filter UI, server/client rendering where appropriate |
| Payload CMS | Editorial CMS, canonical profile editing, publication workflow, taxonomy management, import review queues |
| Database | Structured persistence for canonical profiles, organizations, events, appearances, creative works, provenance, and jobs |
| Cloudflare R2 | Object storage for profile photos, logos, event photos, video thumbnails, documents, and future larger media |
| Cloudflare | CDN, edge, DNS, and media delivery capabilities as configured |
| Netlify | Frontend deployment if this remains the selected deployment target |
| DigitalOcean | Proposed backend, database, or application infrastructure only if selected and configured in a future deployment plan |

## Boundaries

- Presentation belongs in Next.js components and routes.
- Canonical editorial data belongs in Payload collections.
- Binary assets belong in object storage or local development media directories, not embedded in database records.
- Imported raw source payloads should be retained separately from canonical FASTER entities.

## Current vs Proposed Warning

DigitalOcean and richer external API aggregation are not configured in the inspected repository. Treat those as target-state planning topics until implementation tasks add concrete infrastructure.

