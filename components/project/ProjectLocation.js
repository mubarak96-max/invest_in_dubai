import { MapPin, Landmark, School, Hospital, Train } from 'lucide-react';
import DynamicMap from '@/components/property/DynamicMap';

const placeIcons = {
  transport: Train,
  shopping: Landmark,
  education: School,
  health: Hospital,
  default: MapPin
};

export default function ProjectLocation({ location, nearbyPlaces }) {
  if (!location) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Location & Nearby</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Map */}
        <div className="h-96 md:h-[500px] rounded-lg overflow-hidden">
          <DynamicMap center={location.coordinates} zoom={11} popupText="Project Location" />
        </div>

        {/* Nearby Places */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">What's Nearby?</h3>
          <ul className="space-y-3">
            {nearbyPlaces && nearbyPlaces.map((place, index) => {
              const Icon = placeIcons[place.type] || placeIcons['default'];
              return (
                <li key={index} className="flex items-center">
                  <Icon className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="font-medium text-gray-700">{place.name}</span>
                  <span className="ml-auto text-sm text-gray-500">{place.distance}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
