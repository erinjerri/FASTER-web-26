import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { slugField } from 'payload'

export const Profiles: CollectionConfig = {
  slug: 'profiles',
  lockDocuments: false,
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'component', 'company', 'featured', 'updatedAt'],
    useAsTitle: 'name',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    slugField(),
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'title', type: 'text' },
    { name: 'company', type: 'text' },
    {
      name: 'component',
      type: 'select',
      options: [
        { label: 'FASTER PROS', value: 'pros' },
        { label: 'FASTER FRESH', value: 'fresh' },
        { label: 'FASTER Education', value: 'education' },
        { label: 'FASTER FACETS', value: 'facets' },
        { label: 'Leadership', value: 'leadership' },
      ],
    },
    { name: 'bio', type: 'richText' },
    { name: 'linkedIn', type: 'text', label: 'LinkedIn' },
    { name: 'website', type: 'text' },
    { name: 'featured', type: 'checkbox' },
  ],
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
}
