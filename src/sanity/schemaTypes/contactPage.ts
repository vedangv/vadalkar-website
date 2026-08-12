import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitle', title: 'Hero Title', type: 'string' }),
    defineField({ name: 'heroDescription', title: 'Hero Description', type: 'text' }),
    defineField({
      name: 'offices',
      title: 'Office Locations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Office Name', type: 'string' },
            { name: 'address', title: 'Address', type: 'text' },
            { name: 'phone', title: 'Phone Number (Optional)', type: 'string' },
            { name: 'cell', title: 'Cell Number (Optional)', type: 'string' },
            {
              name: 'active',
              title: 'Show on website',
              type: 'boolean',
              description: 'Turn this off to retain an office record without publishing it.',
              initialValue: true,
            },
          ]
        }
      ]
    })
  ]
})
