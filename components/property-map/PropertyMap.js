'use client';

'use client';

import { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import PropertyMapModal from './PropertyMapModal';

// Fix for default icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const PropertyMap = ({ properties }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const dubaiPosition = [25.2048, 55.2708];

  const handleMarkerClick = (property) => {
    setSelectedProperty(property);
  };

  const handleCloseModal = () => {
    setSelectedProperty(null);
  };

  // Prefer MapTiler with explicit English labels if key is provided
  const maptilerKey = process.env.NEXT_PUBLIC_MAPTILER_KEY;
  const tileUrl = maptilerKey
    ? `https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=${maptilerKey}&language=en`
    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
  const tileAttribution = maptilerKey
    ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>'
    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

  return (
    <>
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
      <PropertyMapModal property={selectedProperty} onClose={handleCloseModal} />
    </>
  );
};

export default PropertyMap;
