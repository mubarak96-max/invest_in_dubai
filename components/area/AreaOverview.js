'use client';

import { MapPin, Clock, Car, Plane, ShoppingBag, GraduationCap, Heart, Waves } from 'lucide-react';
import { formatNumber } from '@/lib/format';
import PortableText from '@/components/PortableText';

export default function AreaOverview({ description, location, averagePrice, averageRentalYield, areaData }) {
  // Use areaData if passed, otherwise use individual props for backward compatibility
  const data = areaData || { description, location, averagePrice, averageRentalYield };

  const getConnectivityIcon = (type) => {
    switch (type) {
      case 'airport': return <Plane className="w-5 h-5" />;
      case 'shopping': return <ShoppingBag className="w-5 h-5" />;
      case 'transport': return <Car className="w-5 h-5" />;
      case 'recreation': return <Waves className="w-5 h-5" />;
      case 'education': return <GraduationCap className="w-5 h-5" />;
      case 'health': return <Heart className="w-5 h-5" />;
      default: return <MapPin className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
      <div className="grid lg:grid-cols-3 gap-8">

        {/* Main Description */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Area</h2>
            <div className="text-gray-600 leading-relaxed text-lg">
              {data.longDescription && Array.isArray(data.longDescription) ? (
                <PortableText value={data.longDescription} />
              ) : data.description ? (
                <p>{data.description}</p>
              ) : (
                <p>No description available.</p>
              )}
            </div>
          </div>

          {/* Amenities */}
          {data.amenities && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {data.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-2 text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Connectivity */}
          {data.connectivity && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Connectivity</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {data.connectivity.map((connection, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-blue-600">
                      {getConnectivityIcon(connection.type)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{connection.name}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {connection.distance}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">

          {/* Market Stats */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Overview</h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Average Price</div>
                <div className="text-xl font-bold text-gray-900">
                  AED {formatNumber(data.averagePrice)}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Rental Yield</div>
                <div className="text-xl font-bold text-green-600">
                  {data.averageRentalYield}%
                </div>
              </div>
              {data.marketTrends && (
                <div>
                  <div className="text-sm text-gray-600 mb-1">Price Growth (YoY)</div>
                  <div className="text-xl font-bold text-blue-600">
                    +{data.marketTrends.priceGrowth}%
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Demographics */}
          {data.demographics && (
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Demographics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Expat Population</span>
                  <span className="font-semibold">{data.demographics.expatPercentage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Age</span>
                  <span className="font-semibold">{data.demographics.averageAge} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Family Friendly</span>
                  <span className="font-semibold">
                    {data.demographics.familyFriendly ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pet Friendly</span>
                  <span className="font-semibold">
                    {data.demographics.petFriendly ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Investment Highlights */}
          {data.marketTrends && (
            <div className="bg-green-50 rounded-xl p-6 border border-green-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Highlights</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Demand Level</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${data.marketTrends.demandLevel === 'High'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    {data.marketTrends.demandLevel}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Investment Rating</span>
                  <span className="font-semibold">{data.marketTrends.investmentRating}/5</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
