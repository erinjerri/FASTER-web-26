# Payload CMS

Payload is the editorial and operational CMS for FASTER. It should manage canonical directory data, editorial review, and publication controls while keeping public presentation concerns in the frontend.

## Current Role

The current app mounts Payload in the Next.js application:

- Admin: `/admin`
- REST API: `/api`
- GraphQL: `/api/graphql`
- GraphQL Playground: `/api/graphql-playground`

Current collections include pages, posts, profiles, media, categories, and users.

## Target Editor Capabilities

Editors should be able to:

- Create people.
- Associate roles.
- Connect people to organizations.
- Attach event appearances.
- Upload or select media.
- Approve imported records.
- Publish and unpublish directory entries.
- Feature profiles.
- Manage taxonomy.

## Separation Of Concerns

- Payload stores canonical data and editorial state.
- Next.js decides page layout, filtering UI, and presentation.
- Imported raw source data stays separate from canonical directory data.
- Media records store metadata and storage references, not embedded binary blobs.

## Access And Safety Notes

When future implementation uses Payload Local API with a user, set `overrideAccess: false`. When hooks perform nested operations, pass `req` to preserve transaction/session context.

