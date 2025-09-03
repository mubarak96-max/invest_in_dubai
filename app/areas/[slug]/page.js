import AreaHero from '@/components/area/AreaHero';
import AreaOverview from '@/components/area/AreaOverview';
import AreaProperties from '@/components/area/AreaProperties';
import AreaDevelopers from '@/components/area/AreaDevelopers';
import { client, queries } from '@/lib/sanity';
import { notFound } from 'next/navigation';

// Revalidate every minute for fresh content
export const revalidate = 60;

// Generate static params from Sanity
export async function generateStaticParams() {
  try {
    const areas = await client.fetch(`*[_type == "area" && defined(slug.current)]{"slug": slug.current}`);
    return areas.map(area => ({ slug: area.slug }));
  } catch (error) {
    console.error('Error generating static params for areas:', error);
    return [];
  }
}

// Fetch area data from Sanity
async function getAreaData(slug) {
  try {
    const area = await client.fetch(queries.areaBySlug, { slug });

    // ensure arrays exist to avoid runtime errors
    if (area) {
      area.images = area.images || [];
      area.mustKnow = area.mustKnow || [];
      area.prosCons = area.prosCons || { pros: [], cons: [] };
    }

    return area;
  } catch (error) {
    console.error('Error fetching area data:', error);
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const area = await getAreaData(slug);

  if (!area) {
    return {
      title: 'Area Not Found | Invest In Dubai Real Estate',
      description: 'The requested area could not be found.'
    };
  }

  return {
    title: area.seoTitle || `${area.name} Properties | Invest In Dubai Real Estate`,
    description: area.seoDescription || area.description || `Discover properties in ${area.name}, Dubai. Find your perfect home in this sought-after community.`,
    openGraph: {
      title: area.seoTitle || `${area.name} Properties`,
      description: area.seoDescription || area.description,
      images: area.image ? [{ url: area.image }] : [],
    }
  };
}

export default async function AreaPage({ params }) {
  const { slug } = await params;
  const areaData = await getAreaData(slug);

  if (!areaData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AreaHero areaData={areaData} />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <AreaOverview areaData={areaData} />
        <AreaProperties areaName={areaData.name} />
        <AreaDevelopers areaName={areaData.name} />
      </div>
    </div>
  );
}
