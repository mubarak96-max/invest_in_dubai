import Link from 'next/link';
import { Bed, Bath, Square } from 'lucide-react';

export default function PropertyCard({ property }) {
  const { id, title, slug, image, address, priceDisplay, beds, baths, sqft, category, handover, type } = property;

  return (
    <Link href={`/property/${id}/${slug}`} className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img src={image} alt={title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
        {category === 'off plan' && handover && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
            Off-Plan: Handover {handover}
          </div>
        )}
        {category === 'rent' && (
            <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
                For Rent
            </div>
        )}
        {category === 'buy' && (
            <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
                For Sale
            </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 truncate" title={title}>{title}</h3>
        <p className="text-sm text-gray-500 mt-1 truncate">{address}</p>
        <div className="mt-3">
          <p className="text-xl font-bold text-blue-700">{priceDisplay}</p>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600 mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-1">
            <Bed className="w-4 h-4 text-gray-500" />
            <span>{beds}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Bath className="w-4 h-4 text-gray-500" />
            <span>{baths}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Square className="w-4 h-4 text-gray-500" />
            <span>{sqft.toLocaleString()} sqft</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
