# How to Pull Directory Data from DigitalOcean

Use this runbook to identify the DigitalOcean resource that contains the legacy FASTER directory and create a read-only local export for migration analysis.

This guide does not contain account IDs, database names, connection strings, passwords, tokens, or exported records. Keep those values outside Git.

## Prerequisites

- Access to the FASTER DigitalOcean team or account.
- A local folder at `directory/exports/`; it is ignored by Git.
- The [DigitalOcean CLI (`doctl`)](https://docs.digitalocean.com/reference/doctl/) for account inventory, or access to the DigitalOcean Control Panel.
- [MongoDB Database Tools](https://www.mongodb.com/docs/database-tools/) if the source is MongoDB.
- A maintenance or low-traffic window if the source dataset is large.

## 1. Identify the Source Resource

Log in to the DigitalOcean Control Panel and open the FASTER project. Record only non-secret identifiers in the migration notes:

- Project name and project ID.
- Resource type: Managed Database, Droplet, App Platform app, or Space.
- Resource name and region.
- Database engine and version, if applicable.
- Application or repository that currently reads the directory data.

For a command-line inventory, authenticate `doctl` with a scoped token stored outside this repository, then run:

```bash
doctl projects list
doctl projects resources list <project-id>
doctl databases list
```

DigitalOcean project resources use URNs such as `do:dbaas:<id>` for managed databases and `do:droplet:<id>` for Droplets. The [Project Resources API](https://docs.digitalocean.com/products/projects/reference/api/project-resources/) is the authoritative reference if the CLI output needs automation.

Do not create a token solely for this document. If a token is required, request the minimum read scopes needed for project and database discovery and follow the organization’s credential process.

## 2. Choose the Pull Path

### Managed MongoDB

Use the MongoDB steps below. This is the most likely path for Payload content.

### MongoDB on a Droplet

Confirm whether MongoDB listens only on the private interface or localhost. Prefer running `mongodump` on the Droplet and downloading the resulting encrypted archive through the organization’s approved access path. Do not open MongoDB publicly just to perform the export.

### App Platform

Inspect the app’s component settings to identify its attached database or external `DATABASE_URL`. Do not print environment variables into logs or commit them. Follow the attached database’s export path.

### Spaces

Treat the Space as object storage, not the canonical database. Inventory object keys and metadata with an S3-compatible client. Do not assume uploaded images or JSON files represent the complete directory dataset.

## 3. Prepare a Managed MongoDB Export

DigitalOcean requires a trusted network source and TLS-capable MongoDB tools. In the database Overview page:

1. Confirm the cluster is MongoDB and note its cluster ID.
2. Add the export machine’s current IP as a temporary trusted source, or run the export from an existing trusted resource in the same VPC.
3. Use the default `do-readonly` account or another `Read-Only` user where available. Do not use an administrative user when read access is enough.
4. Retrieve the connection details from the Overview page or with:

   ```bash
   doctl databases connection <database-cluster-id>
   doctl databases db list <database-cluster-id>
   ```

The connection output contains credentials. Do not paste it into chat, tickets, shell scripts, README files, or committed `.env` files. Load the URI into the current shell as `FASTER_SOURCE_MONGODB_URI` using the organization’s password manager or approved secret workflow.

DigitalOcean’s current connection requirements are documented in [How to Connect to MongoDB Database Clusters](https://docs.digitalocean.com/products/databases/mongodb/how-to/connect/). User roles are documented in [How to Manage MongoDB Users and Databases](https://docs.digitalocean.com/products/databases/mongodb/how-to/manage-users-and-databases/).

## 4. Create a Faithful BSON Archive

From the repository root, create the ignored export directory and run a compressed database dump:

```bash
mkdir -p directory/exports
mongodump \
  --uri="$FASTER_SOURCE_MONGODB_URI" \
  --db=<source-database-name> \
  --archive=directory/exports/faster-directory.archive.gz \
  --gzip
```

`mongodump` preserves BSON types and collection metadata more faithfully than a JSON export. Use it as the migration source of record. DigitalOcean documents this flow in [How to Import and Export MongoDB Data](https://docs.digitalocean.com/products/databases/mongodb/how-to/import-collections/).

If the database name is already encoded in the connection URI, still verify it before running the command. Do not accidentally dump the default `admin` database instead of the application database.

## 5. Export Reviewable JSON

Use `mongoexport` only for collections that need field mapping or editorial review. Payload directory data may currently live in a collection such as `profiles`; confirm the real collection name first.

```bash
mongoexport \
  --uri="$FASTER_SOURCE_MONGODB_URI" \
  --db=<source-database-name> \
  --collection=<source-collection-name> \
  --jsonFormat=canonical \
  --out=directory/exports/<source-collection-name>.json
```

Canonical Extended JSON preserves more type information than relaxed JSON, but `mongoexport` is not a replacement for a full backup. MongoDB documents the format and limitations in the [`mongoexport` reference](https://www.mongodb.com/docs/database-tools/mongoexport/).

## 6. Verify the Pull

Confirm the files exist and are non-empty without printing their contents:

```bash
ls -lh directory/exports/
gzip -t directory/exports/faster-directory.archive.gz
```

Record collection names and counts from a read-only shell session:

```javascript
show collections
db.getCollectionNames().forEach((name) => {
  print(`${name}: ${db.getCollection(name).countDocuments({})}`)
})
```

Compare those counts with the `mongodump` output. Store the inventory and migration decisions in documentation, but keep records containing personal information out of Git.

## 7. Close Temporary Access

After verification:

1. Remove the temporary trusted-source IP if it is no longer needed.
2. Revoke any temporary access token according to the organization’s credential process.
3. Keep the read-only database user only if an approved repeatable migration process needs it.
4. Encrypt the export at rest and restrict access to the migration team.
5. Never upload the raw export to GitHub, a public bucket, or an unapproved third-party service.

## Migration Boundary

The pull is complete when the source archive, collection inventory, and record counts are verified. Importing or transforming records is a separate reviewed step. That step must preserve source provenance, resolve duplicates, map legacy IDs to canonical IDs, and keep imported records unpublished until editorial review.

## Troubleshooting

- **Connection timed out:** confirm the export machine is a trusted source and that the IP has not changed.
- **Authentication failed:** confirm the URI uses the intended read-only user and the correct authentication database.
- **Empty or wrong database:** verify the application database name instead of assuming the URI’s default database is correct.
- **TLS or client error:** install a current MongoDB Database Tools release; DigitalOcean requires clients that support MongoDB 4.2 or later for TLS connections.
- **Large or active dataset:** export by database or collection during a low-write period. A dump is a point-in-time pull, not continuous replication.
