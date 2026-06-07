import type { Block } from 'payload'

export const MetricsBlock: Block = {
  slug: 'metricsBlock',
  interfaceName: 'MetricsBlock',
  labels: {
    singular: 'Metrics',
    plural: 'Metrics',
  },
  fields: [
    {
      name: 'metrics',
      type: 'array',
      fields: [
        { name: 'stat', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
}

