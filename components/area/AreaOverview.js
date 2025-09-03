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

          {/* Must Know */}
          {data.mustKnow && data.mustKnow.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Must Know About the Area</h3>
              <div className="space-y-3">
                {data.mustKnow.map((item, idx) => (
                  <div key={idx}>
                    <div className="text-sm font-medium text-gray-800">{item.subtitle}</div>
                    <div className="text-sm text-gray-600">{item.caption}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pros & Cons */}
          {(data.prosCons?.pros?.length || data.prosCons?.cons?.length) && (
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pros &amp; Cons</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600 mb-2">Pros</div>
                  <ul className="list-disc pl-5 text-gray-700">
                    {data.prosCons?.pros?.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-2">Cons</div>
                  <ul className="list-disc pl-5 text-gray-700">
                    {data.prosCons?.cons?.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
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

          {/* Map */}
          {data.coordinates && (data.coordinates.lat && data.coordinates.lng) && (
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Map</h3>
              <div className="w-full h-40 rounded overflow-hidden">
                <iframe
                  title="Area map"
                  className="w-full h-full"
                  src={`https://api.maptiler.com/maps/streets/?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}#12/${data.coordinates.lat}/${data.coordinates.lng}`}
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
