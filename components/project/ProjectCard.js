import Link from 'next/link';
import { Phone, MessageSquare, MapPin, Bed } from 'lucide-react';

export default function ProjectCard({ project }) {
  const { id, slug, title, developer, image, priceDisplay, handover, address, beds, projectStatus, propertyTypes } = project;
  const developerName = typeof developer === 'string' ? developer : developer?.name || 'Developer';

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group flex flex-col">
      <div className="relative overflow-hidden">
        <Link href={`/project/${id}/${slug}`} className="block">
          <img src={image} alt={title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
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
        <Link href={`/project/${id}/${slug}`} className="block">
            <h3 className="font-bold text-xl text-gray-900 truncate">{title}</h3>
            <p className="text-sm text-gray-600 mt-1">by <span className="font-semibold">{developerName}</span></p>
            <p className="text-lg font-bold text-orange-600 mt-3">{priceDisplay}</p>
        </Link>
        <div className="text-sm text-gray-600 mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>{address}</span>
            </div>
            <div className="flex items-center space-x-2">
                <Bed className="w-4 h-4 text-gray-500" />
                <span>{beds}</span>
            </div>
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
