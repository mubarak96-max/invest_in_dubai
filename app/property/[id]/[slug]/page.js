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

export default async function PropertyPageWithSlug({ params }) {
  const { id, slug } = await params;
  const property = getPropertyData(id);
  if (!property) notFound();

  // Redirect if slug doesn't match the property's canonical slug
  if (slug !== property.slug) {
    redirect(`/property/${id}/${property.slug}`);
  }

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

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateListing",
            "name": property.title,
            "description": property.description,
            "url": `https://provident.ae/property/${property.id}/${property.slug}`,
            "image": property.images,
            "offers": {
              "@type": "Offer",
              "price": property.price,
              "priceCurrency": "AED",
              "availability": "https://schema.org/InStock"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": property.location.community,
              "addressRegion": property.location.city,
              "addressCountry": "AE"
            },
            "floorSize": {
              "@type": "QuantitativeValue",
              "value": property.area,
              "unitCode": "SQM"
            },
            "numberOfRooms": property.bedrooms,
            "numberOfBathroomsTotal": property.bathrooms,
            "propertyID": property.reraPermit,
            "datePosted": property.listingDate
          })
        }}
      />
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { id } = await params;
  const property = getPropertyData(id);
  
  if (!property) {
    return {
      title: 'Property Not Found',
    };
  }

  const formatAED = (n) => new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED', maximumFractionDigits: 0 }).format(n);

  return {
    title: `${property.title} - ${formatAED(property.price)} | Provident Real Estate Dubai`,
    description: `${property.description} Located in ${property.location.community}, ${property.location.city}. ${property.bedrooms} bed, ${property.bathrooms} bath, ${property.area} sqft.`,
    keywords: `Dubai real estate, ${property.location.community}, ${property.type}, ${property.bedrooms} bedroom, property for ${property.priceType}, Dubai property investment`,
    openGraph: {
      title: property.title,
      description: property.description,
      images: [
        {
          url: property.images[0],
          width: 1200,
          height: 800,
          alt: property.title
        }
      ],
      url: `https://provident.ae/property/${property.id}/${property.slug}`,
      siteName: 'Provident Real Estate',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: property.title,
      description: property.description,
      images: [property.images[0]]
    },
    alternates: {
      canonical: `https://provident.ae/property/${property.id}/${property.slug}`
    }
  };
}
