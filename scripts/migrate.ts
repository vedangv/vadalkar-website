import { getCliClient } from 'sanity/cli'
import { projects } from '../src/data/projects'
import { basename, join } from 'path'
import { createReadStream } from 'fs'

const client = getCliClient()

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}

async function migrate() {
  console.log('Starting migration of ' + projects.length + ' projects...')
  for (const project of projects) {
    let imageAssetId = undefined
    
    if (project.image) {
      try {
        const imagePath = join(process.cwd(), 'public', project.image)
        console.log(`Uploading image: ${imagePath}`)
        const asset = await client.assets.upload('image', createReadStream(imagePath), {
          filename: basename(imagePath)
        })
        imageAssetId = asset._id
      } catch (error: unknown) {
        console.warn(`Failed to upload image for ${project.title}:`, errorMessage(error))
      }
    }

    const doc = {
      _type: 'project',
      title: project.title,
      category: project.category,
      client: project.client || '',
      architect: project.architect || '',
      year: project.year || '',
      cost: project.cost || '',
      slug: { _type: 'slug', current: project.slug || project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 96) },
      featured: project.featured || false,
      description: project.description || '',
      image: imageAssetId ? {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAssetId
        }
      } : undefined
    }

    try {
      await client.create(doc)
      console.log(`Migrated: ${project.title}`)
    } catch (error: unknown) {
      console.error(`Failed to migrate ${project.title}:`, errorMessage(error))
    }
  }
  console.log('Migration complete!')
}

migrate().catch(console.error)
