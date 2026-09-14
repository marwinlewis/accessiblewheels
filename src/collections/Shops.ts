import type { CollectionConfig } from 'payload'

export const Shops: CollectionConfig = {
  slug: 'shops',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'city', 'rating', 'reviews'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      defaultValue: 5.0,
    },
    {
      name: 'reviews',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'city',
      type: 'text',
      admin: {
        description: 'City (e.g. Mumbai, Bangalore, Chennai, Jaipur, Ahmedabad, Karnal)',
      },
    },
    {
      name: 'address',
      type: 'textarea',
      required: true,
    },
    {
      name: 'lat',
      type: 'number',
      required: true,
    },
    {
      name: 'lng',
      type: 'number',
      required: true,
    },
    {
      name: 'phoneNumbers',
      type: 'array',
      fields: [
        {
          name: 'phone',
          type: 'text',
        },
      ],
    },
    {
      name: 'googleMapUrl',
      type: 'text',
    },
    {
      name: 'images',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'verified',
      type: 'checkbox',
      defaultValue: true,
      label: 'ARAI / Government Certified Workshop',
    },
  ],
}
