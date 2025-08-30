import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

export default function AreaCard({ area }) {
  // Handle both Sanity and dummy data slug formats
  const areaSlug = area.slug?.current || area.slug;

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Community Image */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        {area.image && area.image.trim() !== '' ? (
          <Image
            src={area.image}
            alt={area.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image available</span>
          </div>
        )}

        {/* Overlay with community name */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-1">
            {area.name}
          </h3>
          <div className="flex items-center text-white/90 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{area.properties}</span>
          </div>
        </div>
      </div>

      {/* Community Details */}
      <div className="p-6">
        {/* Description */}
        <p className="text-gray-600 leading-relaxed mb-4">
          {area.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-500">
            <span className="font-medium text-blue-600">{area.avgPrice}</span> avg. price
          </div>
          <div className="text-sm text-gray-500">
            {area.properties}
          </div>
        </div>

        {/* Learn More Button */}
        <Link href={`/areas/${areaSlug}`} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center group/btn">
          <span>Learn More</span>
          <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
