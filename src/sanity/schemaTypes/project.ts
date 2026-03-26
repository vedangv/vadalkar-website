import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Project Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: ['Residential', 'Industrial', 'Commercial', 'Infrastructure', 'Marine Structures', 'Educational', 'Repair', 'Structural Audit', 'Computer Aided Analysis', 'Hospitals', 'Hotels', 'Sports Complex', 'Communication Towers', 'Shuttering Design', 'Special Projects', 'Proof Checking', 'SPA Tenure'] } }),
    defineField({ name: 'client', title: 'Client / Developer', type: 'string' }),
    defineField({ name: 'architect', title: 'Architect', type: 'string' }),
    defineField({ name: 'year', title: 'Year', type: 'string' }),
    defineField({ name: 'cost', title: 'Cost / Value', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } }),
    defineField({ name: 'featured', title: 'Featured Project', type: 'boolean', initialValue: false }),
    defineField({ name: 'description', title: 'Description (Detailed Overview)', type: 'text' }),
    defineField({ name: 'highlights', title: 'Project Highlights', type: 'array', of: [{ type: 'string' }], description: 'For featured projects (e.g. "100m tall testing facility")' }),
    defineField({ name: 'image', title: 'Main Photo', type: 'image', options: { hotspot: true } }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      media: 'image',
    },
  },
})
