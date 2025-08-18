'use client';

import { useState, useEffect } from 'react';
import AreaCard from '@/components/area/AreaCard';
import { communities } from '@/lib/areaData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function AreasPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

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
    const maxIndex = communities.length - itemsToShow;
    setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
  };

  const prevSlide = () => {
    const itemsToShow = isDesktop ? 3 : 1;
    const maxIndex = communities.length - itemsToShow;
    setCurrentIndex(prev => prev <= 0 ? maxIndex : prev - 1);
  };

  const getVisibleCommunities = () => {
    const itemsToShow = isDesktop ? 3 : 1;
    const endIndex = Math.min(currentIndex + itemsToShow, communities.length);
    return communities.slice(currentIndex, endIndex);
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">Explore Dubai's Top Communities</h1>
          <p className="mt-4 text-lg leading-6 text-gray-600 max-w-3xl mx-auto">Discover the most sought-after neighborhoods and find your perfect home.</p>
        </div>

        <div className="relative">
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 px-4">
            {getVisibleCommunities().map(area => (
              <AreaCard key={area.id} area={area} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
