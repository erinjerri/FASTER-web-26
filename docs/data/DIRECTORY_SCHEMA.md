# Directory Schema

This document describes a conceptual model, not production JSON Schema and not a Payload implementation.

## Canonical Entities

The target directory centers on:

- `DirectoryProfile`
- `Organization`
- `Event`
- `Appearance`
- `CreativeWork`
- `Asset`
- `ExternalProfile`
- `ExternalSource` / `Provenance`

## Conceptual DirectoryProfile

```json
{
  "id": "person_abc123",
  "schemaVersion": "1.0.0",
  "profile": {
    "firstName": "Example",
    "lastName": "Person",
    "displayName": "Example Person",
    "slug": "example-person",
    "headline": "...",
    "shortBio": "...",
    "longBio": "...",
    "location": {
      "city": null,
      "region": null,
      "country": "US"
    }
  },
  "profileTypes": ["speaker", "filmmaker", "business_owner"],
  "roles": [
    {
      "type": "speaker",
      "title": "FASTERCON Speaker",
      "organizationId": "org_faster",
      "active": false
    }
  ],
  "faster": {
    "leadership": {
      "isLeader": false,
      "title": null
    },
    "appearances": [
      {
        "eventId": "fastercon-2021",
        "role": "speaker",
        "sessionTitle": null
      }
    ]
  },
  "organizations": [],
  "businesses": [],
  "creativeWorks": [],
  "socialLinks": {
    "website": null,
    "linkedin": null,
    "instagram": null,
    "youtube": null,
    "tiktok": null,
    "github": null,
    "spotify": null
  },
  "media": {
    "profilePhoto": {
      "assetId": "asset_123",
      "alt": "Example Person"
    },
    "featuredVideo": null,
    "gallery": []
  },
  "externalProfiles": [],
  "taxonomy": {
    "industries": [],
    "skills": [],
    "communities": [],
    "tags": []
  },
  "directory": {
    "published": false,
    "featured": false,
    "searchable": true
  },
  "provenance": {
    "source": "faster_internal",
    "lastVerifiedAt": null
  },
  "createdAt": "...",
  "updatedAt": "..."
}
```

## Required vs Optional

Required for a durable canonical profile:

- Immutable `id`
- `schemaVersion`
- `profile.displayName`
- `profile.slug`
- `profileTypes`
- `directory.published`
- `directory.searchable`
- `provenance.source`
- `createdAt`
- `updatedAt`

Optional or nullable:

- Legal or component names when only display name is known
- Location details
- Long biography
- Social links
- Media
- Creative works
- External profiles
- Taxonomy values

## Identity Rules

- IDs are immutable.
- Slugs are mutable.
- Names are not primary keys.
- External platform IDs are not FASTER primary keys.
- One person should not be duplicated into separate speaker, filmmaker, founder, or creator records.

## Current Implementation Note

The current Payload `profiles` collection has fields such as `name`, `slug`, `photo`, `title`, `company`, `component`, `bio`, `linkedIn`, `website`, and `featured`. It is a useful current editorial collection, but it is not the full normalized directory schema described here.

