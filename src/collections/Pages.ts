import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['label', 'title', 'slug', 'order', 'showMap'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. Step 1, Step 2, Step 3, Step 4',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL slug (e.g. step-1, step-2, step-3, step-4)',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 1,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'showMap',
      type: 'checkbox',
      defaultValue: false,
      label: 'Display ARAI Workshop Map on this Step',
    },
    {
      name: 'keyPoints',
      type: 'array',
      label: 'Key Guidance Points & Official Links',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
        {
          name: 'linkUrl',
          type: 'text',
          label: 'Official Portal URL (optional)',
        },
        {
          name: 'linkLabel',
          type: 'text',
          label: 'Link Button Text',
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
  ],
}
