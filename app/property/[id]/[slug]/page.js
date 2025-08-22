import { notFound, redirect } from 'next/navigation';
import PropertyHero from '@/components/property/PropertyHero';
import PropertyOverview from '@/components/property/PropertyOverview';
import PropertyInvestmentAnalysis from '@/components/property/PropertyInvestmentAnalysis';
import PropertyDetails from '@/components/property/PropertyDetails';
import PropertyLocation from '@/components/property/PropertyLocation';
import PropertyFinancials from '@/components/property/PropertyFinancials';
import PropertyAgent from '@/components/property/PropertyAgent';
import SimilarProperties from '@/components/property/SimilarProperties';
import { getPropertyData } from '@/lib/projectData';
import { formatNumber } from '@/lib/format';
import { client } from '@/lib/sanity';
import { generatePropertySEO, generatePropertyStructuredData } from '@/lib/seo';

// Fetch property from Sanity or fallback to static data
async function getProperty(id, slug) {
  try {
    // Try to fetch from Sanity first
    const sanityProperty = await client.fetch(`
      *[_type == "property" && (_id == $id || slug.current == $slug)][0]{
        _id,
        title,
        "slug": slug.current,
        description,
        price,
        category,
        propertyType,
        bedrooms,
        bathrooms,
        area,
        location,
        "images": images[].asset->url,
        handover,
        financials,
        reraPermit,
        amenities,
        usp,
        status,
        featured
      }
    `, { id, slug });

    if (sanityProperty) {
      return sanityProperty;
    }
  } catch (error) {
    console.error('Error fetching property from Sanity:', error);
  }

  // Fallback to static data
  return getPropertyData(id);
}

export default async function PropertyPageWithSlug({ params }) {
  const { id, slug } = await params;
  const property = await getProperty(id, slug);

  if (!property) notFound();

  // Redirect if slug doesn't match the property's canonical slug
  const propertySlug = property.slug || property.slug?.current;
  if (slug !== propertySlug) {
    redirect(`/property/${id}/${propertySlug}`);
  }

  // Generate structured data
  const structuredData = generatePropertyStructuredData(property);

  return (
    <div className="min-h-screen bg-gray-50">
      <PropertyHero property={property} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <PropertyOverview property={property} />
            <PropertyDetails property={property} />
            <PropertyLocation property={property} />
            <PropertyInvestmentAnalysis property={property} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <PropertyFinancials property={property} />
            <PropertyAgent property={property} />
          </div>
        </div>

        {/* Similar Properties */}
        <div className="mt-12">
          <SimilarProperties currentProperty={property} />
        </div>
      </div>

      {/* Enhanced Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
    </div>
  );
}

// Generate comprehensive metadata for SEO
export async function generateMetadata({ params }) {
  const { id, slug } = await params;
  const property = await getProperty(id, slug);

  if (!property) {
    return {
      title: 'Property Not Found | Invest In Dubai Real Estate',
      description: 'The property you are looking for could not be found. Browse our extensive collection of Dubai properties for sale and rent.',
    };
  }

  // Generate comprehensive SEO metadata
  return generatePropertySEO(property);
}

// Generate static params for better SEO and performance
export async function generateStaticParams() {
  try {
    // Fetch all properties from Sanity
    const properties = await client.fetch(`
      *[_type == "property" && defined(slug.current)]{
        _id,
        "slug": slug.current
      }
    `);

    return properties.map((property) => ({
      id: property._id,
      slug: property.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}
