import { client } from '@/lib/sanity';

const SITE_URL = 'https://investindubai.com'; // Replace with your actual domain

export default async function sitemap() {
  try {
    // Fetch all properties from Sanity
    const properties = await client.fetch(`
      *[_type == "property" && defined(slug.current)]{
        _id,
        "slug": slug.current,
        _updatedAt
      }
    `);

    // Fetch all areas
    const areas = await client.fetch(`
      *[_type == "area" && defined(slug.current)]{
        "slug": slug.current,
        _updatedAt
      }
    `);

    // Fetch all developers
    const developers = await client.fetch(`
      *[_type == "developer" && defined(slug.current)]{
        "slug": slug.current,
        _updatedAt
      }
    `);

    // Fetch all projects
    const projects = await client.fetch(`
      *[_type == "project" && defined(slug.current)]{
        _id,
        "slug": slug.current,
        _updatedAt
      }
    `);

    // Fetch all market insights
    const insights = await client.fetch(`
      *[_type == "marketInsights" && defined(slug.current)]{
        "slug": slug.current,
        _updatedAt
      }
    `);

    // Fetch all SEO pages
    const seoPages = await client.fetch(`
      *[_type == "seoPage" && defined(slug.current) && isActive == true]{
        "slug": slug.current,
        _updatedAt,
        priority
      }
    `);

    // Static pages
    const staticPages = [
      {
        url: `${SITE_URL}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${SITE_URL}/buy`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${SITE_URL}/rent`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${SITE_URL}/off-plan`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${SITE_URL}/areas`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${SITE_URL}/developers`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${SITE_URL}/projects`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${SITE_URL}/property-map`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      },
    ];

    // Property pages
    const propertyPages = properties.map((property) => ({
      url: `${SITE_URL}/property/${property._id}/${property.slug}`,
      lastModified: new Date(property._updatedAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    // Area pages
    const areaPages = areas.map((area) => ({
      url: `${SITE_URL}/areas/${area.slug}`,
      lastModified: new Date(area._updatedAt),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    // Developer pages
    const developerPages = developers.map((developer) => ({
      url: `${SITE_URL}/developers/${developer.slug}`,
      lastModified: new Date(developer._updatedAt),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

    // Project pages
    const projectPages = projects.map((project) => ({
      url: `${SITE_URL}/project/${project._id}/${project.slug}`,
      lastModified: new Date(project._updatedAt),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    // Market insights pages
    const insightPages = insights.map((insight) => ({
      url: `${SITE_URL}/insights/${insight.slug}`,
      lastModified: new Date(insight._updatedAt),
      changeFrequency: 'monthly',
      priority: 0.5,
    }));

    // SEO pages
    const seoPageUrls = seoPages.map((seoPage) => ({
      url: `${SITE_URL}/${seoPage.slug}`,
      lastModified: new Date(seoPage._updatedAt),
      changeFrequency: 'weekly',
      priority: seoPage.priority || 0.8,
    }));

    return [
      ...staticPages,
      ...propertyPages,
      ...areaPages,
      ...developerPages,
      ...projectPages,
      ...insightPages,
      ...seoPageUrls,
    ];
  } catch (error) {
    console.error('Error generating sitemap:', error);

    // Return basic sitemap if there's an error
    return [
      {
        url: `${SITE_URL}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
    ];
  }
}
