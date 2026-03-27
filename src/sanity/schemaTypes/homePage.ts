import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitle', title: 'Hero Title', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero Subtitle', type: 'string', description: 'e.g. Established 1994' }),
    defineField({ name: 'heroDescription', title: 'Hero Description', type: 'text' }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Service Title', type: 'string' },
            { name: 'description', title: 'Service Description', type: 'text' },
          ]
        }
      ]
    }),
    defineField({
      name: 'clients',
      title: 'Trusted Clients',
      description: 'Used for the scrolling marquee',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ]
})
