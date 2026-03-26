import { createClient } from 'next-sanity'

const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '').trim()
const dataset = (process.env.NEXT_PUBLIC_SANITY_DATASET || 'production').trim()

export const isSanityConfigured = Boolean(projectId && projectId !== 'placeholder')

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: true,
    })
  : createClient({
      projectId: 'dummy-project',
      dataset: 'production',
      apiVersion: '2024-01-01',
      useCdn: true,
    })
