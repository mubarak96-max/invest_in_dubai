'use client';

import { MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import the map component to avoid SSR issues with Leaflet
const DynamicMap = dynamic(() => import('./DynamicMap'), {
  ssr: false,
  loading: () => <div className="w-full h-64 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm">Loading map...</div>
});

export default function PropertyLocation({ property }) {
  const { location, nearbyPlaces = [] } = property;

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <MapPin className="w-5 h-5 text-gray-700" />
        <h2 className="text-2xl font-bold text-gray-800">Location</h2>
      </div>

      <p className="text-gray-700 mb-4">
        {location.building}, {location.community}, {location.city}
      </p>

      {/* Interactive Map */}
      <div className="w-full h-64 bg-gray-100 border border-gray-200 rounded-lg mb-4 overflow-hidden">
        <DynamicMap 
          position={[location.coordinates.lat, location.coordinates.lng]}
          zoom={15}
          popupText={`${location.building}, ${location.community}`}
        />
      </div>

      {nearbyPlaces?.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Nearby</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {nearbyPlaces.map((p, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700">
                <span className="capitalize">{p.type}: {p.name}</span>
                <span className="text-gray-500">{p.distance}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
