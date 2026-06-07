import type { Block } from 'payload'

import { link } from '@/fields/link'

export const MembershipProgramsBlock: Block = {
  slug: 'membershipProgramsBlock',
  interfaceName: 'MembershipProgramsBlock',
  labels: {
    singular: 'Membership Programs',
    plural: 'Membership Programs',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'intro', type: 'textarea' },
    {
      name: 'cards',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'icon', type: 'upload', relationTo: 'media' },
        link({ overrides: { name: 'cta', label: 'CTA' } }),
      ],
    },
  ],
}

