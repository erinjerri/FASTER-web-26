import type { Block } from 'payload'

import { link } from '@/fields/link'

export const HeroBlock: Block = {
  slug: 'heroBlock',
  interfaceName: 'HeroBlock',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text', required: true },
    { name: 'subtitle', type: 'text' },
    { name: 'description', type: 'textarea' },
    link({ overrides: { name: 'primaryCTA', label: 'Primary CTA' } }),
    link({ overrides: { name: 'secondaryCTA', label: 'Secondary CTA' } }),
    { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
  ],
}

