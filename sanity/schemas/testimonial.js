export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      title: 'Client Title/Position',
      type: 'string',
      description: 'e.g., CEO, Investor, Property Owner'
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Client Photo',
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
      name: 'testimonial',
      title: 'Testimonial Text',
      type: 'text',
      rows: 5,
      validation: Rule => Rule.required()
    },
    {
      name: 'rating',
      title: 'Rating (1-5 stars)',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(5)
    },
    {
      name: 'location',
      title: 'Client Location',
      type: 'string',
      description: 'e.g., Dubai, UAE or London, UK'
    },
    {
      name: 'propertyType',
      title: 'Property Type Purchased/Invested',
      type: 'string',
      options: {
        list: [
          { title: 'Apartment', value: 'apartment' },
          { title: 'Villa', value: 'villa' },
          { title: 'Townhouse', value: 'townhouse' },
          { title: 'Penthouse', value: 'penthouse' },
          { title: 'Studio', value: 'studio' },
          { title: 'Commercial', value: 'commercial' },
          { title: 'Off-Plan', value: 'off-plan' }
        ]
      }
    },
    {
      name: 'investmentAmount',
      title: 'Investment Amount Range',
      type: 'string',
      options: {
        list: [
          { title: 'Under AED 1M', value: 'under-1m' },
          { title: 'AED 1M - 2M', value: '1m-2m' },
          { title: 'AED 2M - 5M', value: '2m-5m' },
          { title: 'AED 5M - 10M', value: '5m-10m' },
          { title: 'Above AED 10M', value: 'above-10m' }
        ]
      }
    },
    {
      name: 'serviceType',
      title: 'Service Used',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Property Purchase', value: 'purchase' },
          { title: 'Investment Consultation', value: 'consultation' },
          { title: 'Property Management', value: 'management' },
          { title: 'Rental Services', value: 'rental' },
          { title: 'Legal Support', value: 'legal' },
          { title: 'Financing Assistance', value: 'financing' }
        ]
      }
    },
    {
      name: 'dateOfService',
      title: 'Date of Service',
      type: 'date',
      description: 'When the service was provided'
    },
    {
      name: 'featured',
      title: 'Featured Testimonial',
      type: 'boolean',
      initialValue: false,
      description: 'Display prominently on homepage'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this testimonial appears'
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether to display this testimonial'
    },
    {
      name: 'videoTestimonial',
      title: 'Video Testimonial URL',
      type: 'url',
      description: 'YouTube or Vimeo URL for video testimonial'
    },
    {
      name: 'relatedProperty',
      title: 'Related Property',
      type: 'reference',
      to: [{ type: 'property' }],
      description: 'Property this testimonial is about (if applicable)'
    },
    {
      name: 'relatedProject',
      title: 'Related Project',
      type: 'reference',
      to: [{ type: 'project' }],
      description: 'Project this testimonial is about (if applicable)'
    }
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' }
      ]
    },
    {
      title: 'Rating (Highest)',
      name: 'ratingDesc',
      by: [
        { field: 'rating', direction: 'desc' }
      ]
    },
    {
      title: 'Date of Service (Newest)',
      name: 'dateDesc',
      by: [
        { field: 'dateOfService', direction: 'desc' }
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      subtitle: 'company',
      rating: 'rating',
      featured: 'featured'
    },
    prepare(selection) {
      const { title, media, subtitle, rating, featured } = selection
      const stars = '⭐'.repeat(rating || 0)
      return {
        title: featured ? `⭐ ${title}` : title,
        media,
        subtitle: `${subtitle || 'No company'} - ${stars}`
      }
    }
  }
}
