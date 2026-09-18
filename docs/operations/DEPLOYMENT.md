# Deployment

This document distinguishes current repository state from proposed target state.

## Current State

The repository contains Netlify-oriented deployment configuration:

- `netlify.toml`
- `@netlify/plugin-nextjs`
- `pnpm run build:netlify`
- Netlify build environment defaults for Node 20 and webpack behavior

The Payload app and frontend are currently mounted together in the Next.js app. MongoDB is configured through `DATABASE_URL`, with `MONGODB_URI` as a legacy fallback.

Cloudflare R2-compatible media storage is supported by configuration but can be disabled locally with `USE_R2_STORAGE=false`.

## Proposed Target State

| Layer | Target guidance |
| --- | --- |
| Frontend | Deploy through Netlify if it remains the chosen host |
| CMS/API | Keep Payload available to editors with secure admin access |
| Database | Use managed MongoDB or the selected Payload-compatible database deployment |
| Media | Use Cloudflare R2 or configured object storage for production assets |
| CDN/DNS | Use Cloudflare where configured |
| Backend infrastructure | Use DigitalOcean only if a future architecture task selects and configures it |

## Staging And Production

Use separate environments:

- Separate database.
- Separate R2 bucket or object prefix.
- Separate secrets.
- Separate preview/admin URLs.
- Separate import job settings.

Staging should allow import rehearsal and editorial review without publishing to production routes.

## Deployment Guardrails

- Do not deploy with placeholder secrets.
- Do not point staging imports at production canonical data without an explicit plan.
- Do not enable public external API-derived data until terms and editorial approval are complete.
- Keep `.env` and production credentials out of git.

