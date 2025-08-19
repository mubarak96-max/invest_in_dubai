'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { featuredProperties } from '@/lib/projectData';

const PropertyMapPage = () => {
  const [statusFilter, setStatusFilter] = useState('All');

  const PropertyMap = useMemo(() => dynamic(
    () => import('@/components/property-map/PropertyMap'),
    { ssr: false }
  ), []);

  const filteredProperties = useMemo(() => {
    if (statusFilter === 'All') {
      return featuredProperties;
    }
    return featuredProperties.filter(p => p.status === statusFilter);
  }, [statusFilter]);

  return (
    <div className="relative w-full" style={{ height: 'calc(100vh - 64px)' }}>
      <div className="absolute top-4 left-4 z-[1000] bg-white p-2 rounded-lg shadow-lg flex space-x-2">
        <button
          onClick={() => setStatusFilter('All')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${statusFilter === 'All' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
          All
        </button>
        <button
          onClick={() => setStatusFilter('Off Plan')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${statusFilter === 'Off Plan' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
          Off Plan
        </button>
        <button
          onClick={() => setStatusFilter('Ready')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${statusFilter === 'Ready' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
          Ready
        </button>
        <button
          onClick={() => setStatusFilter('For Rent')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${statusFilter === 'For Rent' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
          For Rent
        </button>
      </div>
      <PropertyMap properties={filteredProperties} />
    </div>
  );
};

export default PropertyMapPage;
