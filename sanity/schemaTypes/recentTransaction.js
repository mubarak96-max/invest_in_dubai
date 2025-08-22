export default {
  name: 'recentTransaction',
  title: 'Recent Transaction',
  type: 'document',
  fields: [
    {
      name: 'type',
      title: 'Transaction Type',
      type: 'string',
      options: {
        list: [
          { title: 'Sold', value: 'Sold' },
          { title: 'Rented', value: 'Rented' },
          { title: 'Reserved', value: 'Reserved' },
          { title: 'Off-Plan Sale', value: 'Off-Plan Sale' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'property',
      title: 'Property Description',
      type: 'string',
      description: 'e.g., 2BR Apartment, 3BR Townhouse, 1BR Studio',
      validation: Rule => Rule.required()
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., Downtown Dubai, Burj Vista',
      validation: Rule => Rule.required()
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'e.g., AED 2,850,000, AED 120,000/year',
      validation: Rule => Rule.required()
    },
    {
      name: 'timeAgo',
      title: 'Time Ago',
      type: 'string',
      description: 'e.g., 2 hours ago, 1 day ago',
      validation: Rule => Rule.required()
    },
    {
      name: 'buyer',
      title: 'Buyer Type',
      type: 'string',
      options: {
        list: [
          { title: 'International Investor', value: 'International Investor' },
          { title: 'Local Family', value: 'Local Family' },
          { title: 'Young Professional', value: 'Young Professional' },
          { title: 'Expat Family', value: 'Expat Family' },
          { title: 'Business Owner', value: 'Business Owner' },
          { title: 'Retiree', value: 'Retiree' },
          { title: 'First-time Buyer', value: 'First-time Buyer' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Completed', value: 'completed' },
          { title: 'Pending', value: 'pending' },
          { title: 'In Progress', value: 'in-progress' }
        ]
      },
      initialValue: 'completed',
      validation: Rule => Rule.required()
    },
    {
      name: 'transactionDate',
      title: 'Transaction Date',
      type: 'datetime',
      description: 'Actual date and time of the transaction',
      validation: Rule => Rule.required()
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether to display this transaction in the ticker'
    },
    {
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: 'Higher numbers appear more frequently in rotation',
      initialValue: 1,
      validation: Rule => Rule.min(1).max(10)
    }
  ],
  orderings: [
    {
      title: 'Transaction Date (Newest)',
      name: 'dateDesc',
      by: [
        { field: 'transactionDate', direction: 'desc' }
      ]
    },
    {
      title: 'Priority (Highest)',
      name: 'priorityDesc',
      by: [
        { field: 'priority', direction: 'desc' }
      ]
    }
  ],
  preview: {
    select: {
      title: 'property',
      subtitle: 'location',
      type: 'type',
      price: 'price',
      timeAgo: 'timeAgo'
    },
    prepare(selection) {
      const { title, subtitle, type, price, timeAgo } = selection
      return {
        title: `${type}: ${title}`,
        subtitle: `${subtitle} - ${price} (${timeAgo})`
      }
    }
  }
}
