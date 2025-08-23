'use client';

import AreaCard from '@/components/area/AreaCard';
import { communities as fallbackCommunities } from '@/lib/areaData';

export default function AreasClient({ areas = [] }) {
  // Use Sanity data if available, otherwise fallback
  const data = areas.length > 0 ? areas : fallbackCommunities;



  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No communities available at the moment.</p>
      </div>
    );
  }

  return (
    <>
      {/* Responsive Grid - Show all areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {data.map(area => (
          <AreaCard
            key={area.id || area._id}
            area={area}
          />
        ))}
      </div>

      {/* Stats */}
      <div className="mt-12 text-center">
        <p className="text-gray-600">
          Showing <span className="font-semibold text-blue-600">{data.length}</span> communities in Dubai
        </p>
      </div>
    </>
  );
}
