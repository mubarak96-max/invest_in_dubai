'use client';

import { useState, useEffect } from 'react';
import AreaCard from '@/components/area/AreaCard';
import { communities as fallbackCommunities } from '@/lib/areaData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function AreasClient({ areas = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'carousel'

  // Use Sanity data if available, otherwise fallback
  const data = areas.length > 0 ? areas : fallbackCommunities;

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const nextSlide = () => {
    const itemsToShow = isDesktop ? 3 : 1;
    const maxIndex = Math.max(0, data.length - itemsToShow);
    setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
  };

  const prevSlide = () => {
    const itemsToShow = isDesktop ? 3 : 1;
    const maxIndex = Math.max(0, data.length - itemsToShow);
    setCurrentIndex(prev => prev <= 0 ? maxIndex : prev - 1);
  };

  const getVisibleCommunities = () => {
    if (viewMode === 'grid') {
      return data; // Show all in grid mode
    }
    
    const itemsToShow = isDesktop ? 3 : 1;
    const endIndex = Math.min(currentIndex + itemsToShow, data.length);
    return data.slice(currentIndex, endIndex);
  };

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No communities available at the moment.</p>
      </div>
    );
  }

  return (
    <>
      {/* View Mode Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-lg p-1 shadow-sm border">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'grid'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            View All
          </button>
          <button
            onClick={() => setViewMode('carousel')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'carousel'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Carousel
          </button>
        </div>
      </div>

      {/* Areas Display */}
      {viewMode === 'grid' ? (
        // Grid View - Show all areas
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {data.map(area => (
            <AreaCard 
              key={area.id || area._id} 
              area={area} 
            />
          ))}
        </div>
      ) : (
        // Carousel View
        <div className="relative">
          {/* Navigation Arrows */}
          {data.length > (isDesktop ? 3 : 1) && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white hover:bg-blue-50 text-blue-600 hover:text-blue-700 p-3 rounded-full shadow-lg border border-blue-200 transition-all duration-200 hover:shadow-xl"
                aria-label="Previous communities"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white hover:bg-blue-50 text-blue-600 hover:text-blue-700 p-3 rounded-full shadow-lg border border-blue-200 transition-all duration-200 hover:shadow-xl"
                aria-label="Next communities"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Carousel Container */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 px-4">
            {getVisibleCommunities().map(area => (
              <AreaCard 
                key={area.id || area._id} 
                area={area} 
              />
            ))}
          </div>

          {/* Pagination Dots */}
          {data.length > (isDesktop ? 3 : 1) && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ 
                length: Math.ceil(data.length / (isDesktop ? 3 : 1)) 
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * (isDesktop ? 3 : 1))}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    Math.floor(currentIndex / (isDesktop ? 3 : 1)) === index
                      ? 'bg-blue-600'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="mt-12 text-center">
        <p className="text-gray-600">
          Showing <span className="font-semibold text-blue-600">{data.length}</span> communities in Dubai
        </p>
      </div>
    </>
  );
}
