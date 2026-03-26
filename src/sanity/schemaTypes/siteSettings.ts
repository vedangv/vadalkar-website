import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'experienceYears', title: 'Years of Experience', type: 'number', description: 'e.g. 35' }),
    defineField({ name: 'projectsDelivered', title: 'Projects Delivered', type: 'number', description: 'e.g. 370' }),
    defineField({ name: 'sectorsServed', title: 'Sectors Served', type: 'number', description: 'e.g. 14' }),
    defineField({ name: 'officeLocations', title: 'Office Locations count', type: 'number', description: 'e.g. 2' }),
    defineField({ name: 'address', title: 'Office Address', type: 'text' }),
    defineField({ name: 'phone', title: 'Contact Phone Number', type: 'string' }),
    defineField({ name: 'email', title: 'Contact Email', type: 'string' }),
    defineField({ name: 'whatsappParams', title: 'WhatsApp Number (no spaces or +)', type: 'string', description: 'e.g. 919322532578' }),
  ]
})
