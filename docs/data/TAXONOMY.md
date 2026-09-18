# Taxonomy

Taxonomy values should be centrally controlled instead of randomly entered as free text. This keeps search, filters, imports, analytics, and migrations predictable.

## Initial `profileTypes`

- `speaker`
- `faster_leadership`
- `business_owner`
- `founder`
- `content_creator`
- `nonprofit_leader`
- `filmmaker`
- `artist`
- `musician`
- `author`
- `technologist`
- `other`

## Vocabulary Types

| Vocabulary | Purpose | Examples |
| --- | --- | --- |
| Profile type | High-level directory category | `speaker`, `filmmaker`, `founder` |
| Industry | Economic or professional sector | `technology`, `film`, `education`, `healthcare` |
| Discipline | Creative or professional practice | `animation`, `software_engineering`, `music_production` |
| Skill | Specific capability | `public_speaking`, `fundraising`, `product_design` |
| Topic | Content/programming subject | `career_growth`, `entrepreneurship`, `representation` |
| Community | Affinity or program community | `faster_pros`, `faster_fresh`, `faster_facets` |
| Event role | Role within an event | `speaker`, `panelist`, `moderator`, `mentor` |

## Governance

- Add taxonomy values through a central `taxonomy` collection or equivalent configuration.
- Prefer stable machine values and editable labels.
- Do not delete values that are in use; deprecate and migrate them.
- Keep external provider categories mapped to internal taxonomy values rather than storing provider labels as canonical values.

