import type { Block } from 'payload'

export const EventPreviewBlock: Block = {
  slug: 'eventPreviewBlock',
  interfaceName: 'EventPreviewBlock',
  labels: {
    singular: 'Event Preview',
    plural: 'Event Previews',
  },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Events' },
    { name: 'events', type: 'relationship', hasMany: true, relationTo: 'posts' },
  ],
}

