export default {
  name: 'marketActivity',
  title: 'Market Activity',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'e.g., 15.2K, AED 2.5B, 85%',
      validation: Rule => Rule.required()
    },
    {
      name: 'change',
      title: 'Change',
      type: 'object',
      fields: [
        {
          name: 'percentage',
          title: 'Percentage Change',
          type: 'number',
          description: 'Positive for increase, negative for decrease'
        },
        {
          name: 'period',
          title: 'Period',
          type: 'string',
          description: 'e.g., vs last month, YoY, QoQ'
        }
      ]
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Trending Up', value: 'trending-up' },
          { title: 'Trending Down', value: 'trending-down' },
          { title: 'Home', value: 'home' },
          { title: 'Building', value: 'building' },
          { title: 'Dollar Sign', value: 'dollar-sign' },
          { title: 'Users', value: 'users' },
          { title: 'Activity', value: 'activity' },
          { title: 'Bar Chart', value: 'bar-chart' }
        ]
      }
    },
    {
      name: 'color',
      title: 'Color Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Blue', value: 'blue' },
          { title: 'Green', value: 'green' },
          { title: 'Red', value: 'red' },
          { title: 'Purple', value: 'purple' },
          { title: 'Orange', value: 'orange' },
          { title: 'Teal', value: 'teal' }
        ]
      },
      initialValue: 'blue'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this item appears on the homepage'
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether to display this item on the homepage'
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
      title: 'title',
      subtitle: 'value',
      order: 'order'
    },
    prepare(selection) {
      const { title, subtitle, order } = selection
      return {
        title,
        subtitle: `${subtitle} (Order: ${order || 'Not set'})`
      }
    }
  }
}
