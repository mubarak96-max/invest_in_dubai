import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

// GROQ queries for fetching data
export const queries = {
  // Properties
  allProperties: `*[_type == "property"] | order(_createdAt desc)`,
  propertyById: `*[_type == "property" && _id == $id][0]`,
  propertiesByCategory: `*[_type == "property" && category == $category] | order(_createdAt desc)`,
  
  // Developers
  allDevelopers: `*[_type == "developer"] | order(name asc)`,
  developerBySlug: `*[_type == "developer" && slug.current == $slug][0]`,
  
  // Areas/Communities
  allAreas: `*[_type == "area"] | order(name asc)`,
  areaBySlug: `*[_type == "area" && slug.current == $slug][0]`,
  
  // Projects
  allProjects: `*[_type == "project"] | order(_createdAt desc)`,
  projectById: `*[_type == "project" && _id == $id][0]`,
  projectsByDeveloper: `*[_type == "project" && developer._ref == $developerId] | order(_createdAt desc)`,
}
