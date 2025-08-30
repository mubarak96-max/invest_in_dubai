'use client';

import { useEffect, useState } from 'react';

export default function DynamicMap({ position, zoom = 13, popupText, center }) {
  const [mapComponent, setMapComponent] = useState(null);

  useEffect(() => {
    // Only load the map on the client side
    if (typeof window !== 'undefined') {
      import('react-leaflet').then(({ MapContainer, TileLayer, Marker, Popup }) => {
        import('leaflet/dist/leaflet.css');
        import('leaflet').then((L) => {
          // Fix for default icon issue with webpack
          delete L.default.Icon.Default.prototype._getIconUrl;

          L.default.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
          });

          const mapPosition = position || center || [25.2048, 55.2708]; // Default to Dubai

          setMapComponent(
            <MapContainer
              center={mapPosition}
              zoom={zoom}
              scrollWheelZoom={false}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />
              <Marker position={mapPosition}>
                <Popup>
                  {popupText || 'Property Location'}
                </Popup>
              </Marker>
            </MapContainer>
          );
        });
      });
    }
  }, [position, center, zoom, popupText]);

  // Show loading placeholder during SSR and while loading
  if (!mapComponent) {
    return (
      <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-600 text-sm">Loading map...</p>
        </div>
      </div>
    );
  }

  return mapComponent;
}
