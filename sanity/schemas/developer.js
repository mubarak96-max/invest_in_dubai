export default {
  name: 'developer',
  title: 'Developer',
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
      type: 'text',
      rows: 8
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      }
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
      name: 'established',
      title: 'Established Year',
      type: 'number',
      validation: Rule => Rule.min(1900).max(new Date().getFullYear())
    },
    {
      name: 'totalProjects',
      title: 'Total Projects',
      type: 'number',
      validation: Rule => Rule.min(0)
    },
    {
      name: 'specialties',
      title: 'Specialties',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g., Luxury Residential, Commercial, Mixed-Use'
    },
    {
      name: 'website',
      title: 'Website',
      type: 'url'
    },
    {
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'phone',
          title: 'Phone',
          type: 'string'
        },
        {
          name: 'email',
          title: 'Email',
          type: 'email'
        },
        {
          name: 'address',
          title: 'Address',
          type: 'text',
          rows: 3
        }
      ]
    },
    {
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url'
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url'
        },
        {
          name: 'twitter',
          title: 'Twitter',
          type: 'url'
        }
      ]
    },
    {
      name: 'awards',
      title: 'Awards & Recognition',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Award Title',
              type: 'string'
            },
            {
              name: 'year',
              title: 'Year',
              type: 'number'
            },
            {
              name: 'organization',
              title: 'Awarding Organization',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      name: 'featured',
      title: 'Featured Developer',
      type: 'boolean',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
      subtitle: 'established'
    },
    prepare(selection) {
      const { title, media, subtitle } = selection
      return {
        title,
        media,
        subtitle: subtitle ? `Est. ${subtitle}` : ''
      }
    }
  }
}
