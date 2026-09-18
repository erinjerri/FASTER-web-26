# Payload Collections

This is a proposed collection plan. Do not treat these collections as implemented until code exists in `src/collections`.

## Proposed Collections

| Collection | Responsibility | Important relationships | Admin UI fields | Indexing considerations | Future hooks |
| --- | --- | --- | --- | --- | --- |
| `directoryProfiles` | Canonical people/person profiles | Organizations, appearances, creative works, assets, external profiles | Display name, slug, profile types, status, featured, searchable | Slug, profile types, status, featured, updatedAt | Slug generation, duplicate hints, verification timestamps |
| `organizations` | Businesses, nonprofits, employers, collectives, FASTER | Profiles, creative works, assets | Name, type, slug, website, location, logo | Slug, type, name | Normalize URLs, duplicate checks |
| `events` | FASTERCON and other events | Appearances, assets | Title, slug, dates, location, status | Slug, dates, status | Date validation, revalidation |
| `appearances` | Join profiles to events | Directory profile, event | Person, event, role, session title, year | Profile ID, event ID, role | Prevent duplicate person/event/session rows |
| `creativeWorks` | Films, books, music, videos, projects | Profiles, organizations, assets, external sources | Title, type, release date, contributors | Type, title, release date | Contributor role validation |
| `media` | Assets and uploads | Profiles, orgs, events, works | File, alt, caption, credit, rights | Media type, updatedAt | Rights checks, metadata extraction |
| `externalSources` | Provider/source registry and provenance | External profiles, import jobs | Provider, source type, terms status | Provider, status | Terms review flags |
| `importJobs` | Import batch tracking | External sources, candidate records | Provider, status, started/finished, counts | Provider, status, createdAt | Snapshot raw payloads, error summaries |
| `taxonomy` | Controlled vocabulary | Profiles, events, works | Vocabulary type, value, label, deprecated | Type/value unique pair | Prevent deletion while in use |

## Tiny Pseudo-TypeScript Example

```ts
// Pseudo-code only; do not copy as implementation.
export const DirectoryProfiles = {
  slug: 'directoryProfiles',
  fields: [
    { name: 'displayName', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true, index: true },
    { name: 'profileTypes', type: 'relationship', relationTo: 'taxonomy', hasMany: true },
  ],
}
```

## Current Collection Gap

The current `profiles` collection is simpler and includes `component` values like leadership/program groupings. Future implementation should plan a migration or coexistence strategy rather than adding incompatible person collections.

