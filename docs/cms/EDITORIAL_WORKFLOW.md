# Editorial Workflow

## Statuses

| Status | Meaning |
| --- | --- |
| `draft` | Created but incomplete or unpublished |
| `needs_review` | Requires editorial, data, rights, or identity review |
| `verified` | Reviewed and approved internally |
| `published` | Publicly visible where routing/search allows |
| `archived` | Preserved but no longer active/public by default |

## A. Importing 200+ Historical FASTER Speakers

1. Import source data into an `importJobs` batch.
2. Normalize names, event years, session titles, and source notes.
3. Match against existing profiles.
4. Queue ambiguous matches for human review.
5. Create or update draft `DirectoryProfile` records.
6. Add `Appearance` records for each event/session.
7. Verify priority profiles first.
8. Publish when biography, media rights, and event data are acceptable.

## B. Manually Creating A New Leader

1. Create a profile in `draft`.
2. Add `faster_leadership` profile type.
3. Add leadership title and organization relationship to FASTER.
4. Attach approved media with alt text and rights metadata.
5. Mark `verified`.
6. Publish or feature as needed.

## C. Adding A Small-Business Owner

1. Search for an existing person.
2. Create or update one canonical profile.
3. Create or connect the `Organization` business.
4. Add founder/owner role relationship.
5. Attach logo/product assets only when rights are clear.
6. Review and publish.

## D. Speaker Later Becomes Filmmaker/Founder

1. Open the existing speaker profile.
2. Add new `profileTypes`.
3. Add roles, organizations, or creative works.
4. Preserve existing FASTER appearances.
5. Review conflicts and provenance.
6. Publish updated profile.

## E. Reconciling Spotify/Film/API Identity

1. Store raw source snapshot and provenance.
2. Create an external profile candidate.
3. Match by external ID, official links, name, organization, and other evidence.
4. If ambiguous, send to human review.
5. Merge only approved supplemental fields.
6. Never overwrite verified FASTER data automatically.

