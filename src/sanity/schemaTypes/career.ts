import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'career',
  title: 'Job Opening',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Job Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'location', title: 'Location', type: 'string', initialValue: 'Mumbai' }),
    defineField({ name: 'type', title: 'Employment Type', type: 'string', options: { list: ['Full-time', 'Part-time', 'Contract', 'Internship'] }, initialValue: 'Full-time' }),
    defineField({ name: 'description', title: 'Job Description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'requirements', title: 'Requirements', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'active', title: 'Is Active?', type: 'boolean', initialValue: true, description: 'Toggle off to hide this job opening' }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
    },
  },
})
