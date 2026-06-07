import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { DirectoryCategoriesBlock } from '../../blocks/DirectoryCategoriesBlock/config'
import { EventPreviewBlock } from '../../blocks/EventPreviewBlock/config'
import { FeatureGridBlock } from '../../blocks/FeatureGridBlock/config'
import { HeroBlock } from '../../blocks/HeroBlock/config'
import { LeadershipBlock } from '../../blocks/LeadershipBlock/config'
import { MembershipProgramsBlock } from '../../blocks/MembershipProgramsBlock/config'
import { MetricsBlock } from '../../blocks/MetricsBlock/config'
import { MissionVisionValuesBlock } from '../../blocks/MissionVisionValuesBlock/config'
import { NewsPreviewBlock } from '../../blocks/NewsPreviewBlock/config'
import { ResourcePreviewBlock } from '../../blocks/ResourcePreviewBlock/config'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

const devAutosaveInterval = Number(process.env.PAYLOAD_DEV_AUTOSAVE_INTERVAL_MS ?? 15000)

export const Pages: CollectionConfig = {
  slug: 'pages',
  lockDocuments: false,
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                HeroBlock,
                MissionVisionValuesBlock,
                LeadershipBlock,
                MembershipProgramsBlock,
                DirectoryCategoriesBlock,
                MetricsBlock,
                FeatureGridBlock,
                EventPreviewBlock,
                ResourcePreviewBlock,
                NewsPreviewBlock,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave:
        process.env.NODE_ENV === 'development'
          ? { interval: Number.isFinite(devAutosaveInterval) ? devAutosaveInterval : 15000 }
          : { interval: 5000 },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
