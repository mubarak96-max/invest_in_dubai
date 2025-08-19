export default {
  name: 'marketInsights',
  title: 'Market Insights',
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
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Brief summary for homepage display'
    },
    {
      name: 'content',
      title: 'Content',
      type: 'markdown',
      description: 'Full insight content in markdown format',
      validation: Rule => Rule.required()
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
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
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Market Trends', value: 'trends' },
          { title: 'Investment Tips', value: 'investment' },
          { title: 'Area Analysis', value: 'area-analysis' },
          { title: 'Developer News', value: 'developer-news' },
          { title: 'Regulatory Updates', value: 'regulatory' },
          { title: 'Economic Outlook', value: 'economic' }
        ]
      }
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Keywords for better categorization'
    },
    {
      name: 'author',
      title: 'Author',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Author Name',
          type: 'string'
        },
        {
          name: 'title',
          title: 'Author Title',
          type: 'string'
        },
        {
          name: 'image',
          title: 'Author Image',
          type: 'image'
        }
      ]
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'readTime',
      title: 'Estimated Read Time (minutes)',
      type: 'number',
      validation: Rule => Rule.min(1)
    },
    {
      name: 'featured',
      title: 'Featured Insight',
      type: 'boolean',
      initialValue: false,
      description: 'Display prominently on homepage'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this insight appears on the homepage'
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether to display this insight'
    },
    {
      name: 'relatedProperties',
      title: 'Related Properties',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'property' }]
        }
      ],
      description: 'Properties related to this insight'
    },
    {
      name: 'relatedAreas',
      title: 'Related Areas',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'area' }]
        }
      ],
      description: 'Areas/communities related to this insight'
    }
  ],
  orderings: [
    {
      title: 'Published Date (Newest)',
      name: 'publishedDesc',
      by: [
        { field: 'publishedAt', direction: 'desc' }
      ]
    },
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'featuredImage',
      subtitle: 'category',
      featured: 'featured'
    },
    prepare(selection) {
      const { title, media, subtitle, featured } = selection
      return {
        title: featured ? `⭐ ${title}` : title,
        media,
        subtitle: subtitle || 'No category'
      }
    }
  }
}
