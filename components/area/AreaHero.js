'use client';

import { MapPin, TrendingUp, Star } from 'lucide-react';
import { formatNumber } from '@/lib/format';

export default function AreaHero({ areaData }) {
  return (
    <div className="relative bg-gradient-to-r from-gray-900 to-gray-700 text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${areaData.image})` }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Column - Main Info */}
          <div className="space-y-6">
            {areaData.location && (
              <div className="flex items-center space-x-2 text-blue-300">
                <MapPin className="w-5 h-5" />
                <span className="text-sm font-medium">{areaData.location}</span>
              </div>
            )}

            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              {areaData.name}
            </h1>

            <div className="text-xl text-gray-300 leading-relaxed max-w-2xl">
              {areaData.description ? (
                <p>{areaData.description}</p>
              ) : (
                <p>Discover this amazing community in Dubai.</p>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                View Properties
              </button>
              <button className="border border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors">
                Download Area Guide
              </button>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="grid grid-cols-2 gap-6">

            {/* Average Price */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-green-500 p-2 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-300">Avg. Price</span>
              </div>
              <div className="text-2xl font-bold">
                AED {formatNumber(areaData.averagePrice)}
              </div>
            </div>

            {/* Rental Yield */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-300">Rental Yield</span>
              </div>
              <div className="text-2xl font-bold">
                {areaData.averageRentalYield}%
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
