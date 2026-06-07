import type { Block } from 'payload'

export const MissionVisionValuesBlock: Block = {
  slug: 'missionVisionValuesBlock',
  interfaceName: 'MissionVisionValuesBlock',
  labels: {
    singular: 'Mission, Vision, Values',
    plural: 'Mission, Vision, Values',
  },
  fields: [
    { name: 'mission', type: 'textarea', required: true },
    { name: 'vision', type: 'textarea', required: true },
    {
      name: 'values',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
}

