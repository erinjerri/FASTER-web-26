import type { Block, Field } from 'payload'

import { link } from '@/fields/link'

const categoryFields = (name: string, label: string): Field => ({
  name,
  type: 'group',
  label,
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    link({ overrides: { name: 'cta', label: 'CTA' } }),
  ],
})

export const DirectoryCategoriesBlock: Block = {
  slug: 'directoryCategoriesBlock',
  interfaceName: 'DirectoryCategoriesBlock',
  labels: {
    singular: 'Directory Categories',
    plural: 'Directory Categories',
  },
  fields: [
    categoryFields('creators', 'Creators'),
    categoryFields('foundersInvestors', 'Founders / Investors'),
    categoryFields('nonprofits', 'Nonprofits'),
    categoryFields('businesses', 'Businesses'),
    categoryFields('speakers', 'Speakers'),
  ],
}

