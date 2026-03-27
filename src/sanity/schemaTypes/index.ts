import { type SchemaTypeDefinition } from 'sanity'
import project from './project'
import team from './team'
import career from './career'
import siteSettings from './siteSettings'
import homePage from './homePage'
import aboutPage from './aboutPage'
import contactPage from './contactPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, career, team, siteSettings, homePage, aboutPage, contactPage],
}
