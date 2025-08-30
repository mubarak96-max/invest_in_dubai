'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Bed, Bath, Square, MapPin, Heart, Phone, MessageCircle } from 'lucide-react';
import { formatPrice } from '@/lib/format';
import { analytics } from '@/lib/analytics';

export default function PropertyCard({ property, viewMode = 'grid' }) {
  const {
    _id,
    title,
    slug,
    images,
    price,
    category,
    propertyType,
    bedrooms,
    bathrooms,
    area,
    location,
    handover
  } = property;

  const primaryImage = images?.[0] || '/default-property.jpg';
  const propertyUrl = `/property/${_id}/${slug}`;

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="md:w-1/3 lg:w-80 h-48 md:h-auto relative shrink-0">
            <Link href={propertyUrl} onClick={() => analytics.viewProperty(_id, title)}>
              <Image
                src={primaryImage}
                alt={title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
              />
            </Link>
            <div className="absolute top-3 left-3">
              <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                {category === 'buy' ? 'For Sale' : category === 'rent' ? 'For Rent' : 'Off-Plan'}
              </span>
            </div>
            <button
              onClick={() => analytics.favoriteProperty(_id, title)}
              className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
            >
              <Heart className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {title}
                </h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">
                    {location?.building ? `${location.building}, ` : ''}
                    {location?.community || 'Dubai'}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {formatPrice(price)}
                </div>
                {handover && (
                  <div className="text-sm text-gray-500">
                    {handover}
                  </div>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="flex items-center space-x-6 mb-4 text-gray-600">
              {bedrooms && (
                <div className="flex items-center">
                  <Bed className="w-4 h-4 mr-1" />
                  <span className="text-sm">{bedrooms}</span>
                </div>
              )}
              {bathrooms && (
                <div className="flex items-center">
                  <Bath className="w-4 h-4 mr-1" />
                  <span className="text-sm">{bathrooms}</span>
                </div>
              )}
              {area && (
                <div className="flex items-center">
                  <Square className="w-4 h-4 mr-1" />
                  <span className="text-sm">{area.toLocaleString()} sq ft</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <Link
                href={propertyUrl}
                onClick={() => analytics.viewProperty(_id, title)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-center"
              >
                View Details
              </Link>
              <button
                onClick={() => analytics.callAgent(_id)}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Phone className="w-5 h-5" />
              </button>
              <button
                onClick={() => analytics.whatsappContact(_id)}
                className="p-2 text-gray-600 hover:text-green-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (default)
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Link href={propertyUrl} onClick={() => analytics.viewProperty(_id, title)}>
          <Image
            src={primaryImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
        </Link>
        <div className="absolute top-3 left-3">
          <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
            {category === 'buy' ? 'For Sale' : category === 'rent' ? 'For Rent' : 'Off-Plan'}
          </span>
        </div>
        <button
          onClick={() => analytics.favoriteProperty(_id, title)}
          className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
        >
          <Heart className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price */}
        <div className="mb-3">
          <div className="text-xl font-bold text-blue-600">
            {formatPrice(price)}
          </div>
          {handover && (
            <div className="text-sm text-gray-500">
              {handover}
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="text-sm truncate">
            {location?.building ? `${location.building}, ` : ''}
            {location?.community || 'Dubai'}
          </span>
        </div>

        {/* Features */}
        <div className="flex items-center space-x-4 mb-4 text-gray-600">
          {bedrooms && (
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              <span className="text-sm">{bedrooms}</span>
            </div>
          )}
          {bathrooms && (
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              <span className="text-sm">{bathrooms}</span>
            </div>
          )}
          {area && (
            <div className="flex items-center">
              <Square className="w-4 h-4 mr-1" />
              <span className="text-sm">{area.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Link
            href={propertyUrl}
            onClick={() => analytics.viewProperty(_id, title)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors text-center text-sm"
          >
            View Details
          </Link>
          <button
            onClick={() => analytics.callAgent(_id)}
            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Phone className="w-4 h-4" />
          </button>
          <button
            onClick={() => analytics.whatsappContact(_id)}
            className="p-2 text-gray-600 hover:text-green-600 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
