import AreaCard from '@/components/area/AreaCard';
import { client, queries } from '@/lib/sanity';
import AreasClient from '@/components/AreasClient';

// Revalidate every minute for fresh content
export const revalidate = 60;

// Fetch areas from Sanity
async function getAreas() {
  try {
    const areas = await client.fetch(queries.allAreas);
    return areas;
  } catch (error) {
    console.error('Error fetching areas:', error);
    return [];
  }
}

export default async function AreasPage() {
  const areas = await getAreas();
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            Explore Dubai's Top Communities
          </h1>
          <p className="mt-4 text-lg leading-6 text-gray-600 max-w-3xl mx-auto">
            Discover the most sought-after neighborhoods and find your perfect home.
          </p>
        </div>

        <AreasClient areas={areas} />
      </div>
    </div>
  );
}
