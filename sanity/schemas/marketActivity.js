export default {
  name: 'marketActivity',
  title: 'Market Statistics',
  type: 'document',
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'e.g., Average Property Price, Average ROI',
      validation: Rule => Rule.required()
    },
    {
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'e.g., 2.1M, 8.2, 15.7, 4.2K',
      validation: Rule => Rule.required()
    },
    {
      name: 'unit',
      title: 'Unit',
      type: 'string',
      options: {
        list: [
          { title: 'AED', value: 'AED' },
          { title: 'Percentage (%)', value: '%' },
          { title: 'Thousands (K)', value: 'K' },
          { title: 'Millions (M)', value: 'M' },
          { title: 'No Unit', value: '' }
        ]
      },
      description: 'Unit to display with the value'
    },
    {
      name: 'change',
      title: 'Change Percentage',
      type: 'string',
      description: 'e.g., +12.5%, -2.1%',
      validation: Rule => Rule.required()
    },
    {
      name: 'trend',
      title: 'Trend Direction',
      type: 'string',
      options: {
        list: [
          { title: 'Up (Positive)', value: 'up' },
          { title: 'Down (Negative)', value: 'down' }
        ]
      },
      initialValue: 'up',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'e.g., Q4 2024 vs Q4 2023, Annual rental yield',
      validation: Rule => Rule.required()
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Dollar Sign (Price)', value: 'dollar-sign' },
          { title: 'Trending Up (ROI/Growth)', value: 'trending-up' },
          { title: 'Home (Properties)', value: 'home' },
          { title: 'Calendar (Transactions)', value: 'calendar' },
          { title: 'Building (Development)', value: 'building' },
          { title: 'Users (Investors)', value: 'users' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'order',
      title: 'Display Order (1-4)',
      type: 'number',
      description: 'Order in which this statistic appears (1-4)',
      validation: Rule => Rule.required().min(1).max(4)
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether to display this statistic'
    }
  ],
  orderings: [
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
      title: 'label',
      subtitle: 'value',
      unit: 'unit',
      order: 'order',
      change: 'change'
    },
    prepare(selection) {
      const { title, subtitle, unit, order, change } = selection
      return {
        title: `${order}. ${title}`,
        subtitle: `${subtitle}${unit || ''} (${change || 'No change'})`
      }
    }
  }
}
