import Link from 'next/link';
import Image from 'next/image';
import { Phone, MessageSquare, MapPin, Bed, Building, Calendar } from 'lucide-react';
import { formatPrice } from '@/lib/format';
import { analytics } from '@/lib/analytics';

export default function ProjectCard({ project, viewMode = 'grid' }) {
  const {
    id,
    _id,
    slug,
    title,
    developer,
    image,
    images,
    priceDisplay,
    startingPrice,
    handover,
    address,
    location,
    beds,
    projectStatus,
    propertyTypes,
    description
  } = project;

  const projectId = id || _id;
  const projectSlug = slug?.current || slug;
  const projectImage = image || images?.[0] || '/default-project.jpg';
  const developerName = typeof developer === 'string' ? developer : developer?.name || 'Developer';
  const projectAddress = address || location?.community || location?.building || 'Dubai';
  const displayPrice = priceDisplay || (startingPrice ? formatPrice(startingPrice) : 'Contact for Price');

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="md:w-80 h-48 md:h-auto relative">
            <Image
              src={projectImage}
              alt={title}
              fill
              className="object-cover"
            />
            <div className="absolute top-3 left-3">
              {projectStatus && (
                <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                  {projectStatus}
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {title}
                </h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <Building className="w-4 h-4 mr-1" />
                  <span className="text-sm">by {developerName}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{projectAddress}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {displayPrice}
                </div>
                {handover && (
                  <div className="text-sm text-gray-500">
                    {handover}
                  </div>
                )}
              </div>
            </div>

            {description && (
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {description}
              </p>
            )}

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <Link
                href={`/project/${projectId}/${projectSlug}`}
                onClick={() => analytics.viewProject(title)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-center"
              >
                View Details
              </Link>
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-green-600 transition-colors">
                <MessageSquare className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (default)
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group flex flex-col">
      <div className="relative overflow-hidden">
        <Link href={`/project/${projectId}/${projectSlug}`} className="block">
          <Image
            src={projectImage}
            alt={title}
            width={400}
            height={224}
            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <div className="absolute top-4 left-4 flex items-center gap-x-2">
          {projectStatus && (
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-300">
              {projectStatus}
            </span>
          )}
          {propertyTypes && propertyTypes.length > 0 && (
            <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full border border-gray-300">
              {propertyTypes.join(', ')}
            </span>
          )}
        </div>
        {handover && (
          <div className="absolute top-4 right-4 bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-md">
            {handover}
          </div>
        )}
      </div>
      <div className="p-4 flex-grow">
        <Link href={`/project/${projectId}/${projectSlug}`} className="block">
          <h3 className="font-bold text-xl text-gray-900 truncate">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">by <span className="font-semibold">{developerName}</span></p>
          <p className="text-lg font-bold text-orange-600 mt-3">{displayPrice}</p>
        </Link>
        <div className="text-sm text-gray-600 mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span>{projectAddress}</span>
          </div>
          {beds && (
            <div className="flex items-center space-x-2">
              <Bed className="w-4 h-4 text-gray-500" />
              <span>{beds}</span>
            </div>
          )}
        </div>
      </div>
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
