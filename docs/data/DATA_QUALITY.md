# Data Quality

Directory trust depends on reviewable, explainable data quality controls.

## Common Issues

| Issue | Handling |
| --- | --- |
| Duplicate people | Resolve to one canonical `DirectoryProfile`; preserve merge history |
| Missing values | Allow nulls where unknown; avoid fake placeholder data |
| Stale data | Track `lastVerifiedAt` and review cadence |
| Source conflicts | Prefer verified FASTER or profile-owner data |
| Invalid URLs | Validate format and periodically recheck |
| Duplicate external profiles | Prevent duplicate provider/external ID pairs |
| Image rights gaps | Require rights and attribution metadata before publication |
| Human review flags | Queue ambiguous or high-impact changes |
| Verification timestamps | Store who verified and when |

## Suggested Fields

```yaml
dataQuality:
  status: unreviewed | needs_review | verified | rejected
  completeness: low | medium | high
  requiresReview: true
  reviewReason: possible_duplicate
  verifiedBy: user_123
  verifiedAt: null
```

## Identity Resolution

Do not assume an AI-generated confidence score alone establishes identity. Use a combination of external IDs, official links, event records, organization relationships, public sources, and human review.

## Duplicate Detection Signals

- Same verified email or owner-submitted identity claim
- Same external provider and external ID
- Same official website
- Strong name plus organization/event overlap
- Same image or media source with supporting evidence

