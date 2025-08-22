'use client';

import { useState, useEffect } from 'react';
import PropertyMapModal from './PropertyMapModal';

const PropertyMap = ({ properties }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [mapComponent, setMapComponent] = useState(null);
  const dubaiPosition = [25.2048, 55.2708];

  const handleMarkerClick = (property) => {
    setSelectedProperty(property);
  };

  const handleCloseModal = () => {
    setSelectedProperty(null);
  };

  useEffect(() => {
    // Only load the map on the client side
    if (typeof window !== 'undefined') {
      import('react-leaflet').then(({ MapContainer, TileLayer, Marker }) => {
        import('leaflet/dist/leaflet.css');
        import('leaflet').then((L) => {
          // Fix for default icon issue with webpack
          delete L.default.Icon.Default.prototype._getIconUrl;

          L.default.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
          });

          // Prefer MapTiler with explicit English labels if key is provided
          const maptilerKey = process.env.NEXT_PUBLIC_MAPTILER_KEY;
          const tileUrl = maptilerKey
            ? `https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=${maptilerKey}&language=en`
            : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
          const tileAttribution = maptilerKey
            ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>'
            : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

          setMapComponent(
            <MapContainer center={dubaiPosition} zoom={11} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url={tileUrl}
                attribution={tileAttribution}
              />
              {properties.map((property) => (
                <Marker
                  key={property.id}
                  position={[property.coordinates.lat, property.coordinates.lng]}
                  eventHandlers={{
                    click: () => handleMarkerClick(property),
                  }}
                />
              ))}
            </MapContainer>
          );
        });
      });
    }
  }, [properties]);

  // Show loading placeholder during SSR and while loading
  if (!mapComponent) {
    return (
      <div className="w-full h-screen bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-600 text-sm">Loading property map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {mapComponent}
      {selectedProperty && (
        <PropertyMapModal
          property={selectedProperty}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default PropertyMap;
