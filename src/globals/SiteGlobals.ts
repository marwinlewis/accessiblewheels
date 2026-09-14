import type { GlobalConfig } from 'payload'

export const SiteGlobals: GlobalConfig = {
  slug: 'site-globals',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Step-by-Step Guide for Divyangjan: Getting Your Adapted Vehicle & Driving License in India',
    },
    {
      name: 'gtmId',
      type: 'text',
      label: 'Google Tag Manager ID',
    },
    {
      name: 'webmasterTag',
      type: 'text',
      label: 'Google Webmaster Site Verification Tag',
    },
    {
      name: 'copyright',
      type: 'text',
      defaultValue: '© 2026 AdaptedVehicle.in — All rights reserved.',
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
    {
      name: 'footer',
      type: 'group',
      fields: [
        {
          name: 'aboutTitle',
          type: 'text',
          defaultValue: 'About Adapted Vehicle India',
        },
        {
          name: 'aboutText',
          type: 'textarea',
          defaultValue: 'Empowering Divyangjan across India by demystifying the journey from passenger to confident, independent driver with verified RTO procedures, ARAI modifications, and tax benefits.',
        },
        {
          name: 'quickLinks',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'contactLinks',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
