import type { Block } from 'payload'

export const LeadershipBlock: Block = {
  slug: 'leadershipBlock',
  interfaceName: 'LeadershipBlock',
  labels: {
    singular: 'Leadership',
    plural: 'Leadership',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'intro', type: 'textarea' },
    {
      name: 'selectedLeadership',
      type: 'relationship',
      hasMany: true,
      relationTo: 'profiles',
    },
  ],
}

