export default {
  name: 'area',
  title: 'Area/Community',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
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
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., Central Dubai, New Dubai'
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
    },
    {
      name: 'averagePrice',
      title: 'Average Price (AED)',
      type: 'number',
      validation: Rule => Rule.positive()
    },
    {
      name: 'averageRentalYield',
      title: 'Average Rental Yield (%)',
      type: 'number',
      validation: Rule => Rule.positive()
    },
    {
      name: 'propertyCount',
      title: 'Number of Properties',
      type: 'number',
      validation: Rule => Rule.min(0)
    },
    {
      name: 'amenities',
      title: 'Area Amenities',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g., Shopping Centers, Schools, Parks'
    },
    {
      name: 'connectivity',
      title: 'Connectivity',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Location Name',
              type: 'string'
            },
            {
              name: 'distance',
              title: 'Distance/Time',
              type: 'string',
              description: 'e.g., 15 min drive, 5 min walk'
            },
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Airport', value: 'airport' },
                  { title: 'Shopping', value: 'shopping' },
                  { title: 'Transport', value: 'transport' },
                  { title: 'Recreation', value: 'recreation' },
                  { title: 'Education', value: 'education' },
                  { title: 'Healthcare', value: 'health' }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      name: 'demographics',
      title: 'Demographics',
      type: 'object',
      fields: [
        {
          name: 'expatPercentage',
          title: 'Expat Population (%)',
          type: 'number',
          validation: Rule => Rule.min(0).max(100)
        },
        {
          name: 'averageAge',
          title: 'Average Age',
          type: 'number'
        },
        {
          name: 'familyFriendly',
          title: 'Family Friendly',
          type: 'boolean'
        },
        {
          name: 'petFriendly',
          title: 'Pet Friendly',
          type: 'boolean'
        }
      ]
    },
    {
      name: 'marketTrends',
      title: 'Market Trends',
      type: 'object',
      fields: [
        {
          name: 'priceGrowth',
          title: 'Price Growth (YoY %)',
          type: 'number'
        },
        {
          name: 'demandLevel',
          title: 'Demand Level',
          type: 'string',
          options: {
            list: [
              { title: 'Low', value: 'low' },
              { title: 'Medium', value: 'medium' },
              { title: 'High', value: 'high' },
              { title: 'Very High', value: 'very-high' }
            ]
          }
        },
        {
          name: 'investmentRating',
          title: 'Investment Rating (1-5)',
          type: 'number',
          validation: Rule => Rule.min(1).max(5)
        }
      ]
    },
    {
      name: 'featured',
      title: 'Featured Area',
      type: 'boolean',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      subtitle: 'location',
      price: 'averagePrice'
    },
    prepare(selection) {
      const { title, media, subtitle, price } = selection
      return {
        title,
        media,
        subtitle: `${subtitle} - Avg: AED ${price?.toLocaleString()}`
      }
    }
  }
}
