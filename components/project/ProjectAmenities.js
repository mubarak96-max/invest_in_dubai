import { Dumbbell, ParkingSquare, ShieldCheck, Waves, TreePalm, Utensils, Wind, Zap } from 'lucide-react';

const amenityIcons = {
  'Swimming Pool': Waves,
  'Gym': Dumbbell,
  'Security 24/7': ShieldCheck,
  'Covered Parking': ParkingSquare,
  'Children Play Area': TreePalm,
  'BBQ Area': Utensils,
  'Central AC': Wind,
  'Spa': Zap,
  'default': Zap
};

export default function ProjectAmenities({ amenities }) {
  if (!amenities || amenities.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Amenities</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {amenities.map((amenity, index) => {
          const Icon = amenityIcons[amenity] || amenityIcons['default'];
          return (
            <div key={index} className="flex items-center bg-gray-50 p-4 rounded-lg">
              <Icon className="w-6 h-6 text-blue-600 mr-4" />
              <span className="font-medium text-gray-700">{amenity}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
