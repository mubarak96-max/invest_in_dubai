export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
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
      name: 'longDescription',
      title: 'Long Description',
      type: 'text',
      rows: 8
    },
    {
      name: 'images',
      title: 'Project Images',
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
      name: 'developer',
      title: 'Developer',
      type: 'reference',
      to: [{ type: 'developer' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'area',
      title: 'Area/Community',
      type: 'reference',
      to: [{ type: 'area' }]
    },
    {
      name: 'location',
      title: 'Location Details',
      type: 'object',
      fields: [
        {
          name: 'address',
          title: 'Address',
          type: 'string'
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
      name: 'projectStatus',
      title: 'Project Status',
      type: 'string',
      options: {
        list: [
          { title: 'Planning', value: 'planning' },
          { title: 'Under Construction', value: 'construction' },
          { title: 'Ready', value: 'ready' },
          { title: 'Completed', value: 'completed' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'handover',
      title: 'Handover Date',
      type: 'string',
      description: 'e.g., Q4 2025, Dec 2024'
    },
    {
      name: 'startingPrice',
      title: 'Starting Price (AED)',
      type: 'number',
      validation: Rule => Rule.positive()
    },
    {
      name: 'propertyTypes',
      title: 'Property Types',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g., Studio, 1BR, 2BR, Villa'
    },
    {
      name: 'totalUnits',
      title: 'Total Units',
      type: 'number',
      validation: Rule => Rule.min(1)
    },
    {
      name: 'amenities',
      title: 'Project Amenities',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'paymentPlan',
      title: 'Payment Plan',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'stage',
              title: 'Stage',
              type: 'string'
            },
            {
              name: 'percentage',
              title: 'Percentage (%)',
              type: 'number',
              validation: Rule => Rule.min(0).max(100)
            },
            {
              name: 'description',
              title: 'Description',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      name: 'floorPlans',
      title: 'Floor Plans',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Unit Type',
              type: 'string'
            },
            {
              name: 'bedrooms',
              title: 'Bedrooms',
              type: 'number'
            },
            {
              name: 'bathrooms',
              title: 'Bathrooms',
              type: 'number'
            },
            {
              name: 'area',
              title: 'Area (sqft)',
              type: 'number'
            },
            {
              name: 'price',
              title: 'Starting Price (AED)',
              type: 'number'
            },
            {
              name: 'image',
              title: 'Floor Plan Image',
              type: 'image'
            }
          ]
        }
      ]
    },
    {
      name: 'usp',
      title: 'Unique Selling Points',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'roi',
      title: 'Expected ROI (%)',
      type: 'number'
    },
    {
      name: 'rentalYield',
      title: 'Expected Rental Yield (%)',
      type: 'number'
    },
    {
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'video',
      title: 'Project Video',
      type: 'url',
      description: 'YouTube or Vimeo URL'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
      subtitle: 'developer.name',
      status: 'projectStatus'
    },
    prepare(selection) {
      const { title, media, subtitle, status } = selection
      return {
        title,
        media,
        subtitle: `${subtitle} - ${status}`
      }
    }
  }
}
