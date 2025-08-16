import { communities } from '@/lib/propertyData';
import { featuredProperties } from '@/lib/projectData';
import Image from 'next/image';
import PropertyCard from '@/components/property/PropertyCard';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export async function generateStaticParams() {
  return communities.map(area => ({ slug: area.slug }));
}

export default async function AreaPage({ params }) {
  const { slug } = await params;
  const area = communities.find(c => c.slug === slug);

  const propertiesInArea = featuredProperties.filter(p => 
    p.address.toLowerCase().includes(area?.name.toLowerCase().replace(' (jvc)', ''))
  );

  if (!area) {
    return <div>Area not found</div>;
  }

  return (
    <div className="bg-white">
      {/* Area Hero Section */}
      <div className="relative h-[50vh] bg-gray-800">
        <Image
          src={area.image}
          alt={`View of ${area.name}`}
          layout="fill"
          objectFit="cover"
          className="opacity-40"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">{area.name}</h1>
                        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">{area.description}</p>
            <div className="mt-8 flex justify-center gap-8">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center">
                <p className="text-2xl font-bold">{area.avgPrice}</p>
                <p className="text-sm opacity-80">Average Price</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center">
                <p className="text-2xl font-bold">{area.properties}</p>
                <p className="text-sm opacity-80">Properties Available</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Area Description Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">About {area.name}</h2>
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown>{area.longDescription}</ReactMarkdown>
          </div>
        </div>
      </div>

      {/* Properties in Area Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Properties in {area.name}</h2>
        {propertiesInArea.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {propertiesInArea.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-lg">We currently do not have any properties listed in this area. Please check back soon or explore other <Link href="/areas" className='text-blue-600 hover:underline'>communities</Link>.</p>
        )}
      </div>
    </div>
  );
}
