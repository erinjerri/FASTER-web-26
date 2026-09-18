# Environment Variables

Document variable names and responsibilities only. Never place real secrets in documentation, commits, screenshots, or shared logs.

If `.env.example` changes, reconcile this document with it.

## App

| Variable | Responsibility |
| --- | --- |
| `NEXT_PUBLIC_SERVER_URL` | Public server URL used for links, CORS, and app configuration |
| `NEXT_PUBLIC_USE_PAYLOAD_MEDIA_PROXY` | Forces media reads through Payload proxy when true |
| `NEXT_PUBLIC_DEV_EXTRA_ORIGINS` | Optional additional local development origins |
| `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` | Stable Next Server Actions encryption key |
| `SITE_NAME` | Optional site name used by email defaults |
| `ALLOW_SEED_IN_PROD` | Controls whether seed route can run in production |

## Payload

| Variable | Responsibility |
| --- | --- |
| `PAYLOAD_SECRET` | Payload secret for auth/session signing |
| `PREVIEW_SECRET` | Preview route validation |
| `CRON_SECRET` | Authenticates scheduled jobs/functions |
| `PAYLOAD_ENABLE_IMAGE_RESIZE` | Enables configured image sizes in the media collection |

## Database

| Variable | Responsibility |
| --- | --- |
| `DATABASE_URL` | Canonical database connection string |
| `MONGODB_URI` | Legacy fallback supported by config |

## Cloudflare / R2

| Variable | Responsibility |
| --- | --- |
| `USE_R2_STORAGE` | Enables R2/S3-compatible storage |
| `R2_PUBLIC_READS` | Controls direct public read URL strategy |
| `R2_PUBLIC_HOSTNAME` | Optional custom public media hostname |
| `R2_ACCOUNT_ID` | Cloudflare account ID |
| `R2_BUCKET` | R2 bucket name |
| `R2_ACCESS_KEY_ID` | R2 access key ID |
| `R2_SECRET_ACCESS_KEY` | R2 secret access key |
| `R2_ENDPOINT` | Optional explicit S3 endpoint |
| `R2_FORCE_PATH_STYLE` | S3 path-style addressing setting |
| `R2_MEDIA_PREFIX` | Optional object key prefix referenced by existing media docs |

## Deployment

| Variable | Responsibility |
| --- | --- |
| `URL` | Deployment URL used in allowed origins |
| `DEPLOY_PRIME_URL` | Netlify deploy preview URL used in allowed origins |
| `NODE_VERSION` | Netlify build Node version |
| `SECRETS_SCAN_ENABLED` | Netlify secret scanning behavior |
| `NEXT_PRIVATE_TURBOPACK` | Forces webpack behavior on Netlify |

## External APIs

| Variable | Responsibility |
| --- | --- |
| `SUBSTACK_SUBSCRIBE_URL` | Substack publication URL or supported endpoint |
| `AMAZON_ASSOCIATE_TAG` | Amazon affiliate tag used by frontend links |
| `PROTON_SMTP_USER` | SMTP username for email |
| `PROTON_SMTP_TOKEN` | SMTP token/password |
| `EMAIL_VERIFY_TRANSPORT` | Controls email transport verification |

Future provider-specific API keys should be added only after terms and implementation review.

Never commit `.env` or production credentials.

