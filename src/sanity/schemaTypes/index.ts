import { type SchemaTypeDefinition } from 'sanity'
import project from './project'
import team from './team'
import career from './career'
import siteSettings from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, team, career, siteSettings],
}
