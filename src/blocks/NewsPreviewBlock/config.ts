import type { Block } from 'payload'

export const NewsPreviewBlock: Block = {
  slug: 'newsPreviewBlock',
  interfaceName: 'NewsPreviewBlock',
  labels: {
    singular: 'News Preview',
    plural: 'News Previews',
  },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'News' },
    { name: 'news', type: 'relationship', hasMany: true, relationTo: 'posts' },
  ],
}

