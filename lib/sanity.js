import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

export { client, urlFor }

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

  // Market Activity (Statistics)
  allMarketActivity: `*[_type == "marketActivity" && isActive == true] | order(order asc)`,

  // Recent Transactions
  allRecentTransactions: `*[_type == "recentTransaction" && isActive == true] | order(transactionDate desc)`,
  activeRecentTransactions: `*[_type == "recentTransaction" && isActive == true] | order(priority desc, transactionDate desc)[0...20]`,

  // SEO Pages
  allSeoPages: `*[_type == "seoPage" && isActive == true] | order(priority desc, order asc)`,
  seoPageBySlug: `*[_type == "seoPage" && slug.current == $slug && isActive == true][0]`,

  // Market Insights
  allMarketInsights: `*[_type == "marketInsights" && isActive == true] | order(publishedAt desc)`,
  featuredMarketInsights: `*[_type == "marketInsights" && featured == true && isActive == true] | order(order asc)`,
  marketInsightBySlug: `*[_type == "marketInsights" && slug.current == $slug][0]`,

  // Testimonials
  allTestimonials: `*[_type == "testimonial" && isActive == true] | order(order asc)`,
  featuredTestimonials: `*[_type == "testimonial" && featured == true && isActive == true] | order(order asc)`,

  // Blog Posts
  allBlogs: `*[_type == "blog"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "featuredImage": featuredImage.asset->url,
    "category": category->{name, "slug": slug.current, color},
    "author": author->{name, "slug": slug.current, image},
    publishedAt,
    featured,
    readingTime,
    tags
  }`,
  
  featuredBlogs: `*[_type == "blog" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "featuredImage": featuredImage.asset->url,
    "category": category->{name, "slug": slug.current, color},
    "author": author->{name, "slug": slug.current, image},
    publishedAt,
    readingTime,
    tags
  }`,
  
  blogBySlug: `*[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "featuredImage": featuredImage.asset->url,
    "category": category->{name, "slug": slug.current, color, description},
    "author": author->{name, "slug": slug.current, image, bio, title, email, social},
    publishedAt,
    content,
    tags,
    seoTitle,
    seoDescription,
    readingTime
  }`,
  
  blogsByCategory: `*[_type == "blog" && category._ref == $categoryId] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "featuredImage": featuredImage.asset->url,
    "category": category->{name, "slug": slug.current, color},
    "author": author->{name, "slug": slug.current, image},
    publishedAt,
    readingTime,
    tags
  }`,
  
  relatedBlogs: `*[_type == "blog" && category._ref == $categoryId && _id != $currentId] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "featuredImage": featuredImage.asset->url,
    "category": category->{name, "slug": slug.current, color},
    "author": author->{name, "slug": slug.current, image},
    publishedAt,
    readingTime
  }`,

  // Blog Categories
  allBlogCategories: `*[_type == "blogCategory"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    color,
    "postCount": count(*[_type == "blog" && references(^._id)])
  }`,
  
  blogCategoryBySlug: `*[_type == "blogCategory" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    description,
    color
  }`,

  // Authors
  allAuthors: `*[_type == "author"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    "image": image.asset->url,
    bio,
    title,
    "postCount": count(*[_type == "blog" && references(^._id)])
  }`,
  
  authorBySlug: `*[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    "image": image.asset->url,
    bio,
    title,
    email,
    phone,
    social
  }`,
}
