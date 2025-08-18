'use client';

import { useState } from 'react';
import PropertyCard from '@/components/property/PropertyCard';
import { featuredProperties } from '@/lib/projectData';
import { Filter, Grid, List } from 'lucide-react';

export default function AreaProperties({ areaName }) {
  const [viewMode, setViewMode] = useState('grid');
  const [filter, setFilter] = useState('all');

  // Filter properties by area name
  const areaProperties = featuredProperties.filter(property =>
    property.address.toLowerCase().includes(areaName.toLowerCase()) ||
    property.title.toLowerCase().includes(areaName.toLowerCase())
  );

  // Apply additional filters
  const filteredProperties = areaProperties.filter(property => {
    if (filter === 'all') return true;
    if (filter === 'buy') return property.category === 'buy';
    if (filter === 'rent') return property.category === 'rent';
    if (filter === 'off-plan') return property.category === 'off-plan';
    return true;
  });

  const filterOptions = [
    { value: 'all', label: 'All Properties', count: areaProperties.length },
    { value: 'buy', label: 'For Sale', count: areaProperties.filter(p => p.category === 'buy').length },
    { value: 'rent', label: 'For Rent', count: areaProperties.filter(p => p.category === 'rent').length },
    { value: 'off-plan', label: 'Off-Plan', count: areaProperties.filter(p => p.category === 'off-plan').length }
  ];

  if (areaProperties.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Properties in {areaName}</h2>
        <p className="text-gray-600">No properties currently available in this area. Check back soon for new listings!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Properties in {areaName}</h2>
          <p className="text-gray-600">{filteredProperties.length} properties available</p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid'
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-400 hover:text-gray-600'
              }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list'
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-400 hover:text-gray-600'
              }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === option.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {option.label} ({option.count})
          </button>
        ))}
      </div>

      {/* Properties Grid/List */}
      {filteredProperties.length > 0 ? (
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }>
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-600">Try adjusting your filters to see more results.</p>
        </div>
      )}

      {/* Load More Button */}
      {filteredProperties.length > 6 && (
        <div className="text-center mt-8">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Load More Properties
          </button>
        </div>
      )}

    </div>
  );
}
