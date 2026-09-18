# FASTER Directory

The FASTER Directory is a dedicated workspace within the FASTER platform monorepo. Its goal is to create a trustworthy, searchable record of Filipinx Americans across science, technology, engineering, arts, mathematics, business, education, and community leadership.

The directory is not an R2 installation guide or a second copy of the website. It is a data product with its own identity model, editorial workflow, source provenance, migration process, and future public experience.

## Workspace Status

This folder currently holds directory planning and migration documentation. It is registered as the private `@faster/directory` pnpm workspace so implementation can be added here without moving the documentation again. It does not yet contain a runnable application or service.

The root Next.js and Payload application remains the current website implementation. Shared architecture and data-model documentation remains under [`../docs`](../docs/README.md).

## Product Scope

The directory should support:

- Canonical person and organization profiles.
- Multiple roles, disciplines, affiliations, and profile types per person.
- FASTER programs, leadership, speaking appearances, and event participation.
- Businesses, creative works, external profiles, social links, and media.
- Editorial states, source attribution, verification, and duplicate resolution.
- Public search, filtering, profile pages, and future data integrations.

## Architecture Direction

The directory should use one canonical record for each person or organization and attach roles, appearances, organizations, works, taxonomy, assets, and provenance through explicit relationships. Names and slugs are mutable labels, not primary identity keys. Imported records must remain reviewable before publication.

Relevant design documents:

- [Directory architecture](../docs/architecture/DIRECTORY_ARCHITECTURE.md)
- [Directory schema](../docs/data/DIRECTORY_SCHEMA.md)
- [Entity relationships](../docs/data/ENTITY_RELATIONSHIPS.md)
- [Taxonomy](../docs/data/TAXONOMY.md)
- [Data provenance](../docs/data/DATA_PROVENANCE.md)
- [Data quality](../docs/data/DATA_QUALITY.md)
- [Payload collection plan](../docs/cms/PAYLOAD_COLLECTIONS.md)
- [Editorial workflow](../docs/cms/EDITORIAL_WORKFLOW.md)

## Initial Data Migration

The first migration task is to identify the legacy FASTER directory resource in the organization’s DigitalOcean account and produce a read-only local export. Do not import that export directly into canonical Payload collections. Preserve it as source data, inventory its collections and fields, scan it for personal or sensitive information, and map it to the directory schema through a reviewed transformation.

Follow [How to pull directory data from DigitalOcean](./DIGITALOCEAN_DATA_PULL.md). Raw exports belong in `directory/exports/`, which is ignored by Git.

## Development

Install all monorepo dependencies from the repository root:

```bash
pnpm install
```

Until this workspace receives implementation code, use the root application commands documented in the [main README](../README.md). Any future schema change in the Payload application must follow the repository’s TypeScript, access-control, transaction, type-generation, and import-map rules.
