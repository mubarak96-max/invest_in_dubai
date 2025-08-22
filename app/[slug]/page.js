import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity';
import { 
  getFilteredProperties, 
  getRelatedSeoPages, 
  generateSeoPageMetadata 
} from '@/lib/seoUtils';
import SeoPageTemplate from '@/components/SeoPageTemplate';
import SEOPropertyList from '@/components/SEOPropertyList';

// Check if slug is an SEO page
async function getSeoPage(slug) {
  try {
    const seoPage = await client.fetch(`
      *[_type == "seoPage" && slug.current == $slug && isActive == true][0] {
        _id,
        title,
        "slug": slug.current,
        description,
        filters,
        seoMetadata,
        internalLinking,
        priority
      }
    `, { slug });

    return seoPage;
  } catch (error) {
    console.error('Error fetching SEO page:', error);
    return null;
  }
}

// Check if slug matches other content types
async function checkOtherContentTypes(slug) {
  try {
    // Check if it's a property
    const property = await client.fetch(`
      *[_type == "property" && slug.current == $slug][0] {
        _id,
        "slug": slug.current
      }
    `, { slug });

    if (property) {
      return { type: 'property', data: property };
    }

    // Check if it's an area
    const area = await client.fetch(`
      *[_type == "area" && slug.current == $slug][0] {
        _id,
        "slug": slug.current
      }
    `, { slug });

    if (area) {
      return { type: 'area', data: area };
    }

    // Check if it's a developer
    const developer = await client.fetch(`
      *[_type == "developer" && slug.current == $slug][0] {
        _id,
        "slug": slug.current
      }
    `, { slug });

    if (developer) {
      return { type: 'developer', data: developer };
    }

    // Check if it's a market insight
    const insight = await client.fetch(`
      *[_type == "marketInsights" && slug.current == $slug][0] {
        _id,
        "slug": slug.current
      }
    `, { slug });

    if (insight) {
      return { type: 'insight', data: insight };
    }

    return null;
  } catch (error) {
    console.error('Error checking other content types:', error);
    return null;
  }
}

// Generate metadata for SEO pages
export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  const page = parseInt(searchParams?.page) || 1;

  // Check if it's an SEO page
  const seoPage = await getSeoPage(slug);
  
  if (seoPage) {
    // Get property count for metadata
    const { total } = await getFilteredProperties(seoPage.filters, 1, 1);
    return generateSeoPageMetadata(seoPage, total);
  }

  // Default metadata for non-SEO pages
  return {
    title: 'Page Not Found | Invest In Dubai Real Estate',
    description: 'The page you are looking for could not be found.',
  };
}

// Generate static params for better performance
export async function generateStaticParams() {
  try {
    // Get all active SEO pages
    const seoPages = await client.fetch(`
      *[_type == "seoPage" && isActive == true] {
        "slug": slug.current
      }
    `);

    return seoPages.map((page) => ({
      slug: page.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function DynamicPage({ params, searchParams }) {
  const { slug } = await params;
  const page = parseInt(searchParams?.page) || 1;
  const limit = 20;

  // First, check if this is an SEO page
  const seoPage = await getSeoPage(slug);
  
  if (seoPage) {
    // Handle SEO page
    try {
      // Get filtered properties
      const { properties, total } = await getFilteredProperties(
        seoPage.filters, 
        page, 
        limit
      );

      // Get related pages for internal linking
      const relatedPages = await getRelatedSeoPages(seoPage, 6);

      // Calculate pagination
      const totalPages = Math.ceil(total / limit);

      return (
        <>
          {/* SEO structured data */}
          <SEOPropertyList 
            category={seoPage.filters?.category || 'buy'}
            properties={properties}
            location={seoPage.filters?.location?.community}
            propertyType={seoPage.filters?.propertyType}
            priceRange={seoPage.filters?.priceRange}
          />
          
          {/* Main template */}
          <SeoPageTemplate
            seoPage={seoPage}
            properties={properties}
            totalProperties={total}
            currentPage={page}
            totalPages={totalPages}
            relatedPages={relatedPages}
          />
        </>
      );
    } catch (error) {
      console.error('Error rendering SEO page:', error);
      notFound();
    }
  }

  // Check if it matches other content types
  const otherContent = await checkOtherContentTypes(slug);
  
  if (otherContent) {
    // Redirect to the appropriate route
    const { type, data } = otherContent;
    
    switch (type) {
      case 'property':
        // This should be handled by the property route, but redirect just in case
        return notFound();
      case 'area':
        // Redirect to areas route
        return notFound();
      case 'developer':
        // Redirect to developers route
        return notFound();
      case 'insight':
        // Redirect to insights route
        return notFound();
      default:
        return notFound();
    }
  }

  // If no content found, return 404
  notFound();
}

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;
