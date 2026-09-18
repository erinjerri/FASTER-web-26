# FASTER Documentation Index

This directory is the internal source of truth for FASTER's website and planned directory/data platform. It documents the current Next.js/Payload project and the proposed normalized directory architecture before production backend implementation begins.

## Quick Architecture Overview

The current repository is a Next.js 15 and Payload CMS 3 application using MongoDB through `@payloadcms/db-mongodb`, Netlify-oriented deployment files, and optional Cloudflare R2-compatible media storage. The future directory should keep one canonical person/profile record per human, then attach roles, appearances, organizations, creative works, assets, taxonomy, and external provenance around that canonical record.

Current implementation notes:

- Current CMS collections include `Pages`, `Posts`, `Profiles`, `Media`, `Categories`, and `Users`.
- The requested future directory collections are proposed, not implemented.
- Existing `Profiles` content is an early/simple profile model and should not be treated as the final directory schema.

## Documentation Map

| Document | Purpose | Primary readers | Owner |
| --- | --- | --- | --- |
| [architecture/SYSTEM_ARCHITECTURE.md](architecture/SYSTEM_ARCHITECTURE.md) | Current and proposed system responsibilities | Engineering, DevOps, Product | Backend / DevOps |
| [architecture/DIRECTORY_ARCHITECTURE.md](architecture/DIRECTORY_ARCHITECTURE.md) | High-level ADR for the directory model | Data, Backend, CMS, Product | Data / Backend |
| [architecture/DATA_FLOW.md](architecture/DATA_FLOW.md) | Editorial, import, asset, and frontend request flows | Backend, CMS, DevOps | Backend |
| [architecture/ASSET_ARCHITECTURE.md](architecture/ASSET_ARCHITECTURE.md) | Asset storage and metadata model | Backend, CMS, DevOps | Backend / DevOps |
| [data/DIRECTORY_SCHEMA.md](data/DIRECTORY_SCHEMA.md) | Conceptual canonical profile/entity schema | Data, Backend, CMS | Data |
| [data/ENTITY_RELATIONSHIPS.md](data/ENTITY_RELATIONSHIPS.md) | Normalized entity relationships and examples | Data, Backend | Data |
| [data/TAXONOMY.md](data/TAXONOMY.md) | Controlled vocabulary rules | Data, CMS, Editorial | Data / CMS |
| [data/DATA_PROVENANCE.md](data/DATA_PROVENANCE.md) | Source tracking, identity matching, and publication rules | Data, Backend, Legal/Operations | Data |
| [data/SCHEMA_VERSIONING.md](data/SCHEMA_VERSIONING.md) | Schema versioning and migration principles | Data, Backend | Backend |
| [data/DATA_QUALITY.md](data/DATA_QUALITY.md) | Review flags, duplicate detection, stale data, conflicts | Data, CMS | Data / CMS |
| [cms/PAYLOAD_CMS.md](cms/PAYLOAD_CMS.md) | Payload's editorial and operational role | CMS, Editorial, Backend | CMS |
| [cms/PAYLOAD_COLLECTIONS.md](cms/PAYLOAD_COLLECTIONS.md) | Proposed Payload collection responsibilities | Backend, CMS | Backend |
| [cms/EDITORIAL_WORKFLOW.md](cms/EDITORIAL_WORKFLOW.md) | Draft, review, verification, publication workflows | Editorial, CMS, Data | CMS |
| [integrations/EXTERNAL_DATA_SOURCES.md](integrations/EXTERNAL_DATA_SOURCES.md) | External source registry template | Data, Backend, Legal/Operations | Data |
| [integrations/API_INGESTION.md](integrations/API_INGESTION.md) | Conceptual ETL and reconciliation pipeline | Backend, Data | Backend / Data |
| [operations/LOCAL_SETUP.md](operations/LOCAL_SETUP.md) | Real local install/start/test commands | Engineering | DevOps |
| [operations/ENVIRONMENT_VARIABLES.md](operations/ENVIRONMENT_VARIABLES.md) | Variable names and responsibilities | Engineering, DevOps | DevOps |
| [operations/DEPLOYMENT.md](operations/DEPLOYMENT.md) | Current vs target deployment topology | DevOps, Engineering | DevOps |

Existing supporting docs:

- [MEDIA_AND_R2.md](MEDIA_AND_R2.md)
- [IMAGE_RESOLUTIONS.md](IMAGE_RESOLUTIONS.md)
- [ANALYTICS_DASHBOARD_SETUP.md](ANALYTICS_DASHBOARD_SETUP.md)

## Authoritative Schema Documents

Schema decisions should start in:

1. [architecture/DIRECTORY_ARCHITECTURE.md](architecture/DIRECTORY_ARCHITECTURE.md)
2. [data/DIRECTORY_SCHEMA.md](data/DIRECTORY_SCHEMA.md)
3. [data/ENTITY_RELATIONSHIPS.md](data/ENTITY_RELATIONSHIPS.md)
4. [data/TAXONOMY.md](data/TAXONOMY.md)
5. [data/DATA_PROVENANCE.md](data/DATA_PROVENANCE.md)
6. [data/SCHEMA_VERSIONING.md](data/SCHEMA_VERSIONING.md)

Implementation tasks should not create incompatible per-role person schemas such as `SpeakerSchema`, `BusinessOwnerSchema`, or `FilmmakerSchema`. FASTER should model one canonical person with many roles and relationships.

