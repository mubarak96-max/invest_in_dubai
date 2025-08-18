import AreaHero from '@/components/area/AreaHero';
import AreaOverview from '@/components/area/AreaOverview';
import AreaProperties from '@/components/area/AreaProperties';
import AreaDevelopers from '@/components/area/AreaDevelopers';
import { getAreaData, communities } from '@/lib/areaData';

export async function generateStaticParams() {
  return communities.map(area => ({ slug: area.slug }));
}

export default async function AreaPage({ params }) {
  const { slug } = await params;

  try {
    const areaData = await getAreaData(slug);

    if (!areaData) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Area Not Found</h1>
            <p className="text-gray-600">The area "{slug}" could not be found.</p>
          </div>
        </div>
      );
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
  } catch (error) {
    console.error('Error loading area data:', error);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Area</h1>
          <p className="text-gray-600">There was an error loading the area data.</p>
        </div>
      </div>
    );
  }
}
