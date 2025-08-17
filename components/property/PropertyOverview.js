'use client';

import { Bed, Bath, Square, Calendar, Building, MapPin, Award, Shield } from 'lucide-react';
import { useMemo } from 'react';
import { formatPrice, formatNumber } from '@/lib/format';

export default function PropertyOverview({ property }) {

  const keyDetails = useMemo(() => [
    { icon: Bed, label: 'Bedrooms', value: property.bedrooms },
    { icon: Bath, label: 'Bathrooms', value: property.bathrooms },
    { icon: Square, label: 'Area', value: `${formatNumber(property.area)} sqft` },
    { icon: Building, label: 'Property Type', value: property.type },
    { icon: Calendar, label: 'Completion', value: property.completionDate },
    { icon: MapPin, label: 'Community', value: property.location?.community || 'N/A' }
  ], [property.bedrooms, property.bathrooms, property.area, property.type, property.completionDate, property.location?.community]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Property Overview</h2>
        <p className="text-gray-600">{property.description}</p>
      </div>

      {/* Key Details Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {keyDetails.map((detail, index) => {
          const IconComponent = detail.icon;
          return (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <IconComponent className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{detail.label}</p>
                <p className="font-semibold text-gray-800">{detail.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Price Breakdown */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Price Breakdown</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{formatPrice(property.price)}</p>
            <p className="text-sm text-gray-600">Total Price</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">
              AED {Math.round(property.price / property.area)}
            </p>
            <p className="text-sm text-gray-600">Price per sqft</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">
              AED {property.financials.serviceCharge}/sqft
            </p>
            <p className="text-sm text-gray-600">Service Charge</p>
          </div>
        </div>
      </div>

      {/* Regulatory Info */}
      <div className="border-t border-gray-200 pt-6 mt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700">RERA Approved</span>
            <span className="text-sm text-gray-500">#{property.reraPermit}</span>
          </div>
          {property.developer?.name && (
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Developer: {property.developer.name}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
