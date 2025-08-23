'use client';

import { useState, useEffect } from 'react';
import { MapPin, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { communities as fallbackCommunities } from '@/lib/propertyData';
import { analytics } from '@/lib/analytics';

export default function CommunitiesSection({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);


  // Carousel navigation functions
  const nextSlide = () => {
    const itemsToShow = isDesktop ? 3 : 1;
    const maxIndex = data.length - itemsToShow;
    setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
  };

  const prevSlide = () => {
    const itemsToShow = isDesktop ? 3 : 1;
    const maxIndex = data.length - itemsToShow;
    setCurrentIndex(prev => prev <= 0 ? maxIndex : prev - 1);
  };

  const data = (items && items.length > 0) ? items : fallbackCommunities;

  // Debug: Log the data source
  console.log('CommunitiesSection data source:', items && items.length > 0 ? 'Sanity' : 'Fallback', 'Items count:', data.length);

  // Get visible communities based on screen size
  const getVisibleCommunities = () => {
    const itemsToShow = isDesktop ? 3 : 1;
    const endIndex = Math.min(currentIndex + itemsToShow, data.length);
    return data.slice(currentIndex, endIndex);
  };

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600 mb-4">
            Explore Our Communities
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover Dubai's most sought-after neighborhoods, each offering unique lifestyle opportunities and investment potential.
          </p>
        </div>

        {/* Communities Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
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

          {/* Communities Container */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 px-4">
            {getVisibleCommunities().map((community) => {
              const communitySlug = community.slug?.current || community.slug;
              return (
                <div
                  key={community.id || community._id}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  {/* Community Image */}
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <Image
                      src={community.image || '/default-community.jpg'}
                      alt={community.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Overlay with community name */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {community.name}
                      </h3>
                      <div className="flex items-center text-white/90 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{community.properties || community.propertyCount || 0} properties</span>
                      </div>
                    </div>
                  </div>

                  {/* Community Details */}
                  <div className="p-6">
                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {community.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-sm text-gray-500">
                        <span className="font-medium text-blue-600">
                          {community.avgPrice || community.averagePrice ?
                            `AED ${(community.avgPrice || community.averagePrice).toLocaleString()}` :
                            'Contact for Price'
                          }
                        </span> avg. price
                      </div>
                      <div className="text-sm text-gray-500">
                        {community.properties || community.propertyCount || 0} properties
                      </div>
                    </div>

                    {/* Learn More Button */}
                    <Link
                      href={`/areas/${communitySlug}`}
                      onClick={() => analytics.viewArea(community.name)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center group/btn"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* View All Communities Button */}
        <div className="text-center mt-12">
          <Link href="/areas" className="bg-white hover:bg-blue-50 text-blue-600 font-semibold py-4 px-8 rounded-lg border-2 border-blue-300 hover:border-blue-400 transition-all duration-200 shadow-sm hover:shadow-md">
            View All Communities
          </Link>
        </div>
      </div>
    </section>
  );
}
