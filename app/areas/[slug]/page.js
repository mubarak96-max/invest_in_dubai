import AreaHero from '@/components/area/AreaHero';
import AreaOverview from '@/components/area/AreaOverview';
import AreaProperties from '@/components/area/AreaProperties';
import AreaDevelopers from '@/components/area/AreaDevelopers';
import { getAreaData } from '@/lib/areaData';

export async function generateStaticParams() {
  return communities.map(area => ({ slug: area.slug }));
}

export default async function AreaPage({ params }) {
  const { slug } = await params;
  const areaData = await getAreaData(slug);

  if (!areaData) {
    return <div>Area not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AreaHero areaData={areaData} />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <AreaOverview
          description={areaData.description}
          location={areaData.location}
          averagePrice={areaData.averagePrice}
          averageRentalYield={areaData.averageRentalYield}
        />
        <AreaProperties areaName={areaData.name} />
        <AreaDevelopers areaName={areaData.name} />
      </div>
    </div>
  );
}
