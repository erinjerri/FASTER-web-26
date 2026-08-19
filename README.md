# FASTER-web-26

New FASTER website template and implementation handoff for `faster-steam.org`.

This repository currently contains the design specification, design tokens, and Codex implementation prompt. The intended app is a Next.js + Payload CMS site built from an existing Payload-enabled repo and adapted to the FASTER content model.

## Intended Stack

- Next.js 14+ App Router for the public frontend
- Payload CMS 3.x for editable content
- MongoDB for Payload content, users, globals, and media metadata
- Cloudflare R2 for persistent uploaded media file storage
- Netlify or the selected runtime host for the Next.js/Payload app
- Analytics dashboard, typically PostHog, for traffic and launch smoke checks

The implementation prompt lives in `CODEX-PROMPT.md`. The visual and content model reference lives in `design.md`, with tokens in `design-tokens.json`.

## Current Repo State

This is not a full app checkout yet. There is no `package.json`, Payload config, Next app directory, `.env.example`, or media storage adapter in this workspace.

When this template is ported into a working Payload/Next repo, keep the same deployment language and setup order used in the Cyra site documentation:

1. Set up MongoDB first.
2. Set up Cloudflare R2 next.
3. Set up the analytics dashboard next.
4. Set up Netlify or the intended runtime host next.
5. Deploy the app.
6. Upload one image in Payload and confirm it renders locally.
7. Push/deploy and confirm the same image renders live.
8. Run the analytics smoke test.
9. Point the domain to the hosting target through Cloudflare DNS.

## CMS Content Model

The target Payload model is described in `CODEX-PROMPT.md` and `design.md`.

Collections to implement:

- `posts` for blog/news content
- `profiles` for speaker and leadership directory entries
- `media` for uploaded images and files
- `pages` for flexible static pages such as FAQ, Code of Conduct, About, Donate, and Store
- `components` for FASTER PROS, FRESH, Education, FACETS, and Archive content areas
- `newsletter` or an equivalent signup model for subscription CTAs

Globals to implement:

- `navigation`
- `footer`

Editors should be able to change page copy, blog posts, speaker/profile entries, navigation, footer links, social links, media alt text, and component CTA destinations from Payload. Brand tokens, layout implementation, runtime secrets, domain names, analytics keys, and storage credentials remain code- or environment-driven.

## Installfest Notes

Use this as the setup checklist once the actual Next/Payload app has been scaffolded.

Required runtime pieces:

- Node.js version supported by the target Payload/Next repo
- pnpm version supported by the target Payload/Next repo
- MongoDB Atlas or another managed MongoDB provider
- Cloudflare account with R2 enabled
- Netlify or another host that supports Next.js server rendering and Payload's Node runtime
- Analytics provider access, usually PostHog

Required environment variables once implemented:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URI` | MongoDB connection string used by Payload. `MONGODB_URI` may be supported as an alias, but prefer `DATABASE_URI` for consistency. |
| `PAYLOAD_SECRET` | Payload encryption/signing secret. Use a long random value and never commit it. |
| `NEXT_PUBLIC_SERVER_URL` | Canonical public site URL, for example `https://faster-steam.org`. Use `http://localhost:3000` locally. |
| `USE_R2_STORAGE` | Set to `true` when R2 uploads should be active. Leave unset or `false` for local disk uploads during local-only development. |
| `R2_BUCKET` | Cloudflare R2 bucket name. |
| `R2_ACCOUNT_ID` | Cloudflare account ID used to derive the R2 endpoint. |
| `R2_ENDPOINT` | Optional explicit R2 S3 endpoint. If supported by the implementation, derive it from `R2_ACCOUNT_ID` when unset. |
| `R2_ACCESS_KEY_ID` | R2 access key with object read/write permission scoped to the bucket. |
| `R2_SECRET_ACCESS_KEY` | R2 secret access key. |
| `R2_PUBLIC_HOSTNAME` | Public media hostname, with no `https://` and no trailing slash. Example: `media.faster-steam.org`. |
| `NEXT_PUBLIC_POSTHOG_KEY` | Public analytics project key if using PostHog. |
| `NEXT_PUBLIC_POSTHOG_HOST` | Analytics ingestion host. |
| `NEXT_PUBLIC_ANALYTICS_DASHBOARD_URL` | Internal reference URL for the launch analytics dashboard. |

Run Payload type generation after changing collections, globals, blocks, or field names:

```bash
pnpm generate:types
```

Run Payload import map generation when adding or changing custom Payload admin components, and whenever R2 storage is toggled on if the S3 upload handler is registered through the admin import map:

```bash
rm -f src/app/(payload)/admin/importMap.js
pnpm generate:importmap
```

Seed content only for fresh local or staging databases. Do not seed production after editors have entered real content unless the seed script is explicitly non-destructive.

## Media Storage

Payload media has two parts:

- MongoDB stores the media record and metadata.
- Cloudflare R2 stores the actual uploaded file bytes.

Metadata includes the media document, alt text, filename, MIME type, filesize, generated sizes, and any custom fields. MongoDB does not store the image or video bytes.

Without R2, Payload uploads normally write to local disk, commonly `public/media`. That is acceptable for short local tests, but not for production. Runtime hosts redeploy from source; local upload directories are not durable content storage.

With R2 configured through Payload's S3 storage adapter, uploads should be written to the R2 bucket and served from `R2_PUBLIC_HOSTNAME`. A redeploy should not affect existing media.

Minimum media smoke test:

1. Start the app with MongoDB and all R2 env vars configured.
2. Open Payload admin.
3. Upload one small image to `Media`.
4. Confirm the media record appears in Payload with filename, MIME type, filesize, and alt text.
5. Confirm `public/media` stays empty when `USE_R2_STORAGE=true`.
6. Confirm the object appears in Cloudflare R2.
7. Use the media record in a page, post, profile, or component block.
8. Confirm the image renders locally.
9. Deploy and confirm the same image renders live after redeploy.

## Analytics Dashboard

Create the analytics dashboard before launch so the first production smoke test has a known destination.

Minimum analytics dashboard:

- Public page views by path
- Top referrers and UTM campaigns
- Primary CTA clicks
- Newsletter/signup conversions
- Admin route exclusion so `/admin` traffic does not pollute public reporting
- Deploy annotations or release markers

Minimum analytics smoke test:

1. Open the production homepage in a clean browser session.
2. Click the primary CTA.
3. Submit or trigger the newsletter/signup flow.
4. Confirm the page view appears with the correct production hostname.
5. Confirm the CTA and signup events appear.
6. Confirm `/admin` visits are excluded or filtered out.
7. Add a deploy annotation for launch.

## Domain And Hosting Notes

- Configure the app domain in Netlify or whichever runtime host serves the Next.js/Payload app.
- Configure DNS in Cloudflare so `faster-steam.org` points to the hosting provider.
- Configure the media domain separately if using a custom R2 public domain such as `media.faster-steam.org`.
- Set `NEXT_PUBLIC_SERVER_URL` to the canonical app URL, not the media URL.
- Set `R2_PUBLIC_HOSTNAME` to the media hostname, not the app URL, and omit the URL scheme.
- After changing public URL or media hostname env vars, redeploy and rerun the public page, sitemap, media, and analytics smoke tests.

## Reference Links

- Payload storage adapters: https://payloadcms.com/docs/upload/storage-adapters
- Payload uploads overview: https://payloadcms.com/docs/upload/overview
- Payload + Cloudflare deployment walkthrough: https://www.youtube.com/watch?v=8jPNsLX7XGg
- Payload DB and file storage tutorial: https://www.youtube.com/watch?v=-0CCUkoBDSY&t=692s
- Payload/Supabase tutorial reference: https://www.youtube.com/watch?v=L5w2QYB9-UU&t=161s
- Cloudflare dashboard: https://dash.cloudflare.com
- Netlify Next.js runtime: https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/
- Netlify environment variables: https://docs.netlify.com/build/configure-builds/environment-variables/
