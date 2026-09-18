# Data Provenance

Provenance is required for trust, licensing, reconciliation, and auditability.

## Provenance Structure

Conceptual pseudo-JSON:

```json
{
  "provider": "spotify",
  "sourceType": "api",
  "externalId": "...",
  "sourceUrl": "...",
  "retrievedAt": "...",
  "lastVerifiedAt": "...",
  "license": null,
  "attributionRequired": false,
  "match": {
    "method": "external_id",
    "matchedProfileId": "person_abc123",
    "humanReviewed": true
  }
}
```

## Ingestion Is Not Publication

Imported data must move through these stages:

1. Retrieved
2. Normalized
3. Matched
4. Confidence-scored when relevant
5. Human-reviewed when identity is ambiguous
6. Merged or reconciled
7. Approved for publication

Never silently overwrite authoritative FASTER data with third-party data.

## Source Priority

1. FASTER-admin verified data
2. Profile-owner verified data
3. Trusted first-party platform API
4. Public structured source
5. Automated inference

Automated inference should never automatically replace verified data.

## Matching Rules

- External IDs can support matching, but they are not canonical FASTER IDs.
- Name similarity alone is insufficient for identity.
- AI-generated confidence scores can help triage, but do not establish identity by themselves.
- Ambiguous matches require human review.

## Publication Rules

Public display requires source permission, terms review where applicable, and editorial approval. Store enough metadata to explain where data came from and when it was retrieved.

