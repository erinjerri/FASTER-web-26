# Local Setup

These commands reflect the inspected repository.

## 1. Clone

```bash
git clone https://github.com/erinjerri/FASTER-web-26.git
cd FASTER-web-26
```

## 2. Install Runtime And Tooling

The project declares:

- Node: `^18.20.2 || >=20.9.0`
- pnpm: `^9 || ^10`
- package manager: `pnpm@9.7.1`

Node 20+ is recommended.

## 3. Install Dependencies

```bash
pnpm install
```

## 4. Copy Environment Template

```bash
cp .env.example .env
```

Never commit `.env`.

## 5. Configure Local Environment

At minimum for local development:

```env
DATABASE_URL=mongodb://127.0.0.1/faster-platform
PAYLOAD_SECRET=replace-with-local-secret
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=replace-with-openssl-base64-32
PREVIEW_SECRET=replace-with-local-secret
CRON_SECRET=replace-with-local-secret
```

Generate local secrets with:

```bash
openssl rand -hex 32
openssl rand -base64 32
```

## 6. Run Database Dependencies

Use local MongoDB or MongoDB Atlas. The repo includes `docker-compose.yml` with a MongoDB service, but the app service uses `yarn` while this project is pnpm-based. Prefer running only MongoDB from Docker Compose or using a local/hosted MongoDB until the compose app service is updated.

```bash
docker compose up mongo
```

## 7. Run Payload And Next.js

Payload is mounted inside the Next app.

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

## 8. Regenerate Payload Files After Schema/Admin Changes

```bash
pnpm generate:importmap
pnpm generate:types
```

## 9. Verify Local Site

```bash
pnpm build
pnpm test:int
pnpm test:e2e
```

The aggregate test command is:

```bash
pnpm test
```

