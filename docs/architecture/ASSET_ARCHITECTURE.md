# Asset Architecture

FASTER assets should be stored as objects plus metadata. Do not store binary images, video, audio, or documents directly in MongoDB/database records.

## Current State

The current Payload `media` collection stores uploads in `public/media/` by default. R2/S3-compatible storage is supported through environment configuration. See [../MEDIA_AND_R2.md](../MEDIA_AND_R2.md).

## Target Asset Model

Assets should support:

- Profile photos
- Business logos
- Product photos
- Event photos
- Video thumbnails
- Documents
- Future larger media

Conceptual pseudo-JSON:

```json
{
  "id": "asset_123",
  "type": "image",
  "storageProvider": "cloudflare_r2",
  "objectKey": "profiles/person_abc123/headshot.jpg",
  "mimeType": "image/jpeg",
  "width": null,
  "height": null,
  "alt": "Example Person",
  "caption": null,
  "credit": null,
  "rights": {
    "owner": null,
    "license": null,
    "sourceUrl": null
  }
}
```

## Metadata Requirements

| Field | Required | Notes |
| --- | --- | --- |
| `id` | Yes | Immutable FASTER asset ID |
| `type` | Yes | `image`, `video`, `audio`, `document`, or future controlled type |
| `storageProvider` | Yes | `local`, `cloudflare_r2`, or future provider |
| `objectKey` | Yes | Storage path/key, not a secret |
| `mimeType` | Yes | Used for rendering and validation |
| `width` / `height` | Optional | Required for images when available |
| `alt` | Required for public images | Accessibility text |
| `credit` | Optional | Required when rights demand attribution |
| `rights` | Required object | Can contain null values when unknown |

## Relationship Pattern

Assets should be referenced by profiles, businesses, events, and creative works. The same asset may appear in multiple contexts only when rights allow that reuse.

