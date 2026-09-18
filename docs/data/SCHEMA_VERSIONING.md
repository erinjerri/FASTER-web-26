# Schema Versioning

Directory records should include a semantic `schemaVersion`.

```json
{
  "schemaVersion": "1.0.0"
}
```

## Version Meaning

| Segment | Meaning | Example |
| --- | --- | --- |
| MAJOR | Breaking structural change | Moving from embedded appearances to required relationship records |
| MINOR | Additive compatible change | Adding optional `pronouns` or `creativeWorks` metadata |
| PATCH | Clarification or non-breaking correction | Tightening documentation or validation copy |

## Roadmap Phases

| Phase | Scope |
| --- | --- |
| v1.x | FASTER leadership and historical speakers |
| v2.x | Business owners, small businesses, nonprofits |
| v3.x | Filmmakers, artists, creators, creative works |
| v4.x | External API aggregation and richer entity reconciliation |

These are roadmap phases, not hardcoded launch dates.

## Migration Principles

- Existing data should remain readable after schema upgrades.
- Migrations should be explicit, tested, and reversible where practical.
- Additive changes are preferred over destructive changes.
- Deprecated fields should remain documented until all records and readers have migrated.
- Raw external source snapshots should remain auditable even when canonical records change.

