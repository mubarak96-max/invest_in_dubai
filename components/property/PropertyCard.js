import Link from 'next/link';
import { Bed, Bath, Square, Phone, MessageSquare } from 'lucide-react';

export default function PropertyCard({ property }) {
  const { id, title, slug, image, address, priceDisplay, beds, baths, sqft, category, handover, type } = property;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group flex flex-col">
      <Link href={`/property/${id}/${slug}`} className="block">
        <div className="relative overflow-hidden">
          <img src={image} alt={title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
          {category === 'off-plan' && handover && (
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
      <div className="mt-auto grid grid-cols-2 border-t border-gray-200 bg-gray-50">
        <a href="tel:+971501234567" className="flex items-center justify-center p-3 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
          <Phone className="w-4 h-4 mr-2 text-blue-600" />
          Call
        </a>
        <a href="https://wa.me/971501234567" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-3 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors border-l border-gray-200">
          <MessageSquare className="w-4 h-4 mr-2 text-green-500" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
