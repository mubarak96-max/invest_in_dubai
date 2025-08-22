export default {
  name: 'seoPage',
  title: 'SEO Landing Pages',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Main heading shown on the page',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'Clean URL for this page (e.g., dubai-marina-properties-for-sale)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Page Description',
      type: 'array',
      description: 'Rich content shown after the property listings',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' }
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
      ]
    },
    {
      name: 'filters',
      title: 'Property Filters',
      type: 'object',
      description: 'Define which properties to show on this page',
      fields: [
        {
          name: 'category',
          title: 'Category',
          type: 'string',
          options: {
            list: [
              { title: 'For Sale', value: 'buy' },
              { title: 'For Rent', value: 'rent' },
              { title: 'Off-Plan', value: 'off-plan' }
            ]
          }
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
          name: 'location',
          title: 'Location Filter',
          type: 'object',
          fields: [
            {
              name: 'community',
              title: 'Community',
              type: 'string',
              description: 'e.g., Dubai Marina, Downtown Dubai'
            },
            {
              name: 'city',
              title: 'City',
              type: 'string',
              description: 'e.g., Dubai, Abu Dhabi'
            }
          ]
        },
        {
          name: 'priceRange',
          title: 'Price Range',
          type: 'object',
          fields: [
            {
              name: 'min',
              title: 'Minimum Price (AED)',
              type: 'number'
            },
            {
              name: 'max',
              title: 'Maximum Price (AED)',
              type: 'number'
            }
          ]
        },
        {
          name: 'bedrooms',
          title: 'Bedrooms',
          type: 'array',
          of: [{ type: 'number' }],
          description: 'Array of bedroom counts (e.g., [1, 2, 3])'
        },
        {
          name: 'bathrooms',
          title: 'Bathrooms',
          type: 'array',
          of: [{ type: 'number' }],
          description: 'Array of bathroom counts'
        },
        {
          name: 'areaRange',
          title: 'Area Range (sq ft)',
          type: 'object',
          fields: [
            {
              name: 'min',
              title: 'Minimum Area',
              type: 'number'
            },
            {
              name: 'max',
              title: 'Maximum Area',
              type: 'number'
            }
          ]
        },
        {
          name: 'handover',
          title: 'Handover Status',
          type: 'string',
          options: {
            list: [
              { title: 'Ready', value: 'Ready' },
              { title: 'Under Construction', value: 'Under Construction' },
              { title: 'Q1 2025', value: 'Q1 2025' },
              { title: 'Q2 2025', value: 'Q2 2025' },
              { title: 'Q3 2025', value: 'Q3 2025' },
              { title: 'Q4 2025', value: 'Q4 2025' },
              { title: '2026', value: '2026' }
            ]
          }
        },
        {
          name: 'developer',
          title: 'Developer',
          type: 'reference',
          to: [{ type: 'developer' }]
        }
      ]
    },
    {
      name: 'seoMetadata',
      title: 'SEO Metadata',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'SEO title for search engines (50-60 characters)',
          validation: Rule => Rule.max(60)
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          description: 'SEO description for search engines (150-160 characters)',
          validation: Rule => Rule.max(160)
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'SEO keywords for this page'
        },
        {
          name: 'canonicalUrl',
          title: 'Canonical URL',
          type: 'url',
          description: 'Optional: Override canonical URL'
        }
      ]
    },
    {
      name: 'internalLinking',
      title: 'Internal Linking',
      type: 'object',
      fields: [
        {
          name: 'relatedPages',
          title: 'Manual Related Pages',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Link Title',
                  type: 'string'
                },
                {
                  name: 'page',
                  title: 'Related SEO Page',
                  type: 'reference',
                  to: [{ type: 'seoPage' }]
                }
              ]
            }
          ]
        },
        {
          name: 'autoLinking',
          title: 'Auto-Generate Links',
          type: 'object',
          fields: [
            {
              name: 'includeRelatedLocations',
              title: 'Include Related Locations',
              type: 'boolean',
              initialValue: true
            },
            {
              name: 'includeRelatedTypes',
              title: 'Include Related Property Types',
              type: 'boolean',
              initialValue: true
            },
            {
              name: 'includePriceRanges',
              title: 'Include Related Price Ranges',
              type: 'boolean',
              initialValue: true
            },
            {
              name: 'includeRelatedCategories',
              title: 'Include Related Categories',
              type: 'boolean',
              initialValue: true
            }
          ]
        }
      ]
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this page is live'
    },
    {
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: 'Priority for sitemap (0.1 to 1.0)',
      initialValue: 0.8,
      validation: Rule => Rule.min(0.1).max(1.0)
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order for internal linking and navigation'
    }
  ],
  orderings: [
    {
      title: 'Priority (Highest)',
      name: 'priorityDesc',
      by: [
        { field: 'priority', direction: 'desc' }
      ]
    },
    {
      title: 'Order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      category: 'filters.category',
      location: 'filters.location.community',
      isActive: 'isActive'
    },
    prepare(selection) {
      const { title, slug, category, location, isActive } = selection
      const status = isActive ? '🟢' : '🔴'
      const filters = [category, location].filter(Boolean).join(' • ')
      
      return {
        title: `${status} ${title}`,
        subtitle: `/${slug} ${filters ? `(${filters})` : ''}`
      }
    }
  }
}
