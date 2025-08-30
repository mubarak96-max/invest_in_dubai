import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'blogCategory',
    title: 'Blog Category',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Category Name',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3
        }),
        defineField({
            name: 'color',
            title: 'Category Color',
            type: 'string',
            options: {
                list: [
                    { title: 'Blue', value: 'blue' },
                    { title: 'Green', value: 'green' },
                    { title: 'Purple', value: 'purple' },
                    { title: 'Red', value: 'red' },
                    { title: 'Yellow', value: 'yellow' },
                    { title: 'Gray', value: 'gray' },
                ]
            }
        })
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'description'
        }
    }
})
