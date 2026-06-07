import type { Block } from 'payload'

export const ResourcePreviewBlock: Block = {
  slug: 'resourcePreviewBlock',
  interfaceName: 'ResourcePreviewBlock',
  labels: {
    singular: 'Resource Preview',
    plural: 'Resource Previews',
  },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Resources' },
    { name: 'resources', type: 'relationship', hasMany: true, relationTo: 'posts' },
  ],
}

