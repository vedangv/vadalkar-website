import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitle', title: 'Hero Title', type: 'string' }),
    defineField({ name: 'heroDescription', title: 'Hero Description', type: 'text' }),
    defineField({
      name: 'whoWeAre',
      title: 'Who We Are (Paragraphs)',
      type: 'array',
      of: [{ type: 'block' }]
    }),
    defineField({
      name: 'activities',
      title: 'Activities of the Firm',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'infrastructure',
      title: 'Facilities & Resources',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Facility Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
          ]
        }
      ]
    }),
    defineField({
      name: 'milestones',
      title: 'Key Milestones',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'year', title: 'Year', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
          ]
        }
      ]
    }),
  ]
})
