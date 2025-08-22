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
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' }
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' }
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url'
                  }
                ]
              }
            ]
          }
        }
      ]
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
    },
    {
      name: 'nearby',
      title: 'Nearby Locations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Location Name',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'type',
              title: 'Location Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Landmark', value: 'landmark' },
                  { title: 'School', value: 'school' },
                  { title: 'Road Access', value: 'road' },
                  { title: 'Hospital', value: 'hospital' },
                  { title: 'Metro', value: 'metro' },
                  { title: 'Shopping Mall', value: 'shopping' }
                ]
              },
              validation: Rule => Rule.required()
            },
            {
              name: 'distance',
              title: 'Distance',
              type: 'string',
              description: 'e.g., 5 min walk, 10 min drive',
              validation: Rule => Rule.required()
            }
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'type',
              distance: 'distance'
            },
            prepare(selection) {
              const { title, subtitle, distance } = selection
              return {
                title,
                subtitle: `${subtitle} - ${distance}`
              }
            }
          }
        }
      ]
    },
    {
      name: 'faq',
      title: 'Frequently Asked Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'H4', value: 'h4' }
                  ],
                  lists: [
                    { title: 'Bullet', value: 'bullet' },
                    { title: 'Numbered', value: 'number' }
                  ],
                  marks: {
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' }
                    ],
                    annotations: [
                      {
                        title: 'URL',
                        name: 'link',
                        type: 'object',
                        fields: [
                          {
                            title: 'URL',
                            name: 'href',
                            type: 'url'
                          }
                        ]
                      }
                    ]
                  }
                }
              ],
              validation: Rule => Rule.required()
            }
          ],
          preview: {
            select: {
              title: 'question'
            }
          }
        }
      ]
    },
    {
      name: 'brochure',
      title: 'Project Brochure',
      type: 'file',
      description: 'PDF brochure for download'
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
