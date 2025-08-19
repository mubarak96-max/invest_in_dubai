export default {
  name: 'property',
  title: 'Property',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            }
          ]
        }
      ]
    },
    {
      name: 'price',
      title: 'Price (AED)',
      type: 'number',
      validation: Rule => Rule.required().positive()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Buy', value: 'buy' },
          { title: 'Rent', value: 'rent' },
          { title: 'Off-Plan', value: 'off-plan' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'propertyType',
      title: 'Property Type',
      type: 'string',
      options: {
        list: [
          { title: 'Apartment', value: 'apartment' },
          { title: 'Villa', value: 'villa' },
          { title: 'Townhouse', value: 'townhouse' },
          { title: 'Penthouse', value: 'penthouse' },
          { title: 'Studio', value: 'studio' }
        ]
      }
    },
    {
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'number',
      validation: Rule => Rule.min(0)
    },
    {
      name: 'bathrooms',
      title: 'Bathrooms',
      type: 'number',
      validation: Rule => Rule.min(0)
    },
    {
      name: 'area',
      title: 'Area (sqft)',
      type: 'number',
      validation: Rule => Rule.positive()
    },
    {
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        {
          name: 'building',
          title: 'Building',
          type: 'string'
        },
        {
          name: 'community',
          title: 'Community',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'city',
          title: 'City',
          type: 'string',
          initialValue: 'Dubai'
        },
        {
          name: 'coordinates',
          title: 'Coordinates',
          type: 'object',
          fields: [
            {
              name: 'lat',
              title: 'Latitude',
              type: 'number'
            },
            {
              name: 'lng',
              title: 'Longitude',
              type: 'number'
            }
          ]
        }
      ]
    },
    {
      name: 'developer',
      title: 'Developer',
      type: 'reference',
      to: [{ type: 'developer' }]
    },
    {
      name: 'area_ref',
      title: 'Area',
      type: 'reference',
      to: [{ type: 'area' }]
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Reserved', value: 'reserved' },
          { title: 'Sold', value: 'sold' },
          { title: 'Rented', value: 'rented' }
        ]
      },
      initialValue: 'available'
    },
    {
      name: 'handover',
      title: 'Handover Date',
      type: 'string',
      description: 'For off-plan properties'
    },
    {
      name: 'completionDate',
      title: 'Completion Date',
      type: 'string'
    },
    {
      name: 'financials',
      title: 'Financial Details',
      type: 'object',
      fields: [
        {
          name: 'serviceCharge',
          title: 'Service Charge (AED/sqft)',
          type: 'number'
        },
        {
          name: 'annualROI',
          title: 'Annual ROI (%)',
          type: 'number'
        },
        {
          name: 'rentalYield',
          title: 'Rental Yield (%)',
          type: 'number'
        },
        {
          name: 'appreciation',
          title: 'Appreciation (%)',
          type: 'number'
        }
      ]
    },
    {
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'usp',
      title: 'Unique Selling Points',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'reraPermit',
      title: 'RERA Permit',
      type: 'string'
    },
    {
      name: 'featured',
      title: 'Featured Property',
      type: 'boolean',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
      subtitle: 'location.community',
      price: 'price'
    },
    prepare(selection) {
      const { title, media, subtitle, price } = selection
      return {
        title,
        media,
        subtitle: `${subtitle} - AED ${price?.toLocaleString()}`
      }
    }
  }
}
