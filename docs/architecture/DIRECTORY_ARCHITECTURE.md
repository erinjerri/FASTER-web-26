# Directory Architecture ADR

Status: proposed source of truth for future implementation.

## Decision

FASTER's public directory will use one canonical person/profile model with multiple roles and relationships. A person exists once, even when they are a FASTER speaker, filmmaker, founder, nonprofit leader, and content creator at the same time.

## Core Principles

1. A person exists once.
2. A person can have many roles.
3. Organizations are separate entities.
4. Events and appearances are separate.
5. Creative works are separate entities.
6. Assets are references, not embedded blobs.
7. Imported data retains provenance.
8. External IDs never become FASTER canonical IDs.
9. Editorial verification beats automated inference.
10. Schema changes are versioned and migratable.

## Why This Matters

FASTER has 10+ years of programming and 200+ historical speakers. A role-specific schema would fragment real people across incompatible records and make future directory categories expensive to add. The canonical model lets FASTER add categories through taxonomy, roles, relationships, and collection expansion instead of destructive redesigns.

## Canonical Person Pattern

`DirectoryProfile` is the canonical human/person entity. It can link to:

- `Role` records describing what a person does or did.
- `Appearance` records connecting a person to a FASTER event.
- `Organization` records such as businesses, nonprofits, employers, collectives, and FASTER itself.
- `CreativeWork` records such as films, books, music, videos, or other work.
- `Asset` records for profile photos, logos, media, and documents.
- `ExternalProfile` and `ExternalSource` records for provenance and identity reconciliation.

## Examples

### Speaker And Filmmaker

Ronnie del Carmen should remain one person:

- `DirectoryProfile`: Ronnie del Carmen
- `profileTypes`: `speaker`, `filmmaker`, `artist`
- `Appearance`: FASTERCON speaker relationship
- `CreativeWork`: film or creative works where FASTER has permission and provenance to display them
- `ExternalProfile`: permitted external references with source metadata

### Business Owner

A business owner should not be copied into a separate business-owner schema:

- `DirectoryProfile`: Person
- `Role`: founder or owner relationship
- `Organization`: Business entity
- `Asset`: logo, product photos, profile image
- `ExternalProfile`: website, commerce, social, or other permitted source references

## Current Repository Gap

The current repo has a simple Payload `profiles` collection used for leadership and directory-like content. That collection is useful today, but it is not the proposed normalized directory platform. Future work should either migrate or adapt it into `directoryProfiles` and related collections after schema decisions are approved.

See also:

- [../data/DIRECTORY_SCHEMA.md](../data/DIRECTORY_SCHEMA.md)
- [../data/ENTITY_RELATIONSHIPS.md](../data/ENTITY_RELATIONSHIPS.md)
- [../cms/PAYLOAD_COLLECTIONS.md](../cms/PAYLOAD_COLLECTIONS.md)

