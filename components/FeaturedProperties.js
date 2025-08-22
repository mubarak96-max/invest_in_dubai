'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bed, Bath, Square, Calendar, MapPin, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { featuredProperties as fallbackFeatured } from '@/lib/projectData';
import { analytics } from '@/lib/analytics';
import PortableText, { getPortableTextExcerpt } from '@/components/PortableText';

export default function FeaturedProperties({ properties: sanityProperties }) {
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

  const properties = (sanityProperties && sanityProperties.length > 0) ? sanityProperties : fallbackFeatured;

  const getCategoryStyle = (category) => {
    const baseStyle = "absolute bottom-4 left-4 px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wide";
    switch (category) {
      case 'off plan':
        return `${baseStyle} bg-blue-800 text-white`;
      case 'buy':
        return `${baseStyle} bg-white text-blue-600 shadow-md`;
      case 'rent':
        return `${baseStyle} bg-blue-600 text-white`;
      default:
        return `${baseStyle} bg-blue-500 text-white`;
    }
  };


  // Carousel navigation functions
  const nextSlide = () => {
    const itemsToShow = isDesktop ? 3 : 1;
    const maxIndex = properties.length - itemsToShow;
    setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
  };

  const prevSlide = () => {
    const itemsToShow = isDesktop ? 3 : 1;
    const maxIndex = properties.length - itemsToShow;
    setCurrentIndex(prev => prev <= 0 ? maxIndex : prev - 1);
  };

  // Get visible properties based on screen size
  const getVisibleProperties = () => {
    const itemsToShow = isDesktop ? 3 : 1;
    const endIndex = Math.min(currentIndex + itemsToShow, properties.length);
    return properties.slice(currentIndex, endIndex);
  };

  return (
    <section className="py-16 lg:py-24 bg-accent-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600 mb-4">
            Featured Properties
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* Properties Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white hover:bg-blue-50 text-blue-600 hover:text-blue-700 p-3 rounded-full shadow-lg border border-blue-200 transition-all duration-200 hover:shadow-xl"
            aria-label="Previous properties"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white hover:bg-blue-50 text-blue-600 hover:text-blue-700 p-3 rounded-full shadow-lg border border-blue-200 transition-all duration-200 hover:shadow-xl"
            aria-label="Next properties"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Properties Container */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 px-4">
            {getVisibleProperties().map((property) => (
              <div
                key={property.id || property._id}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Property Image */}
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Category Tag */}
                  <div className={getCategoryStyle(property.category)}>
                    {property.category}
                  </div>

                  {/* Gallery indicator */}
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center">
                    <div className="w-4 h-4 mr-1">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="text-gray-600">
                        <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-700">4</span>
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-6">
                  {/* Price - Large and prominent */}
                  <div className="mb-3">
                    <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                      {property.priceDisplay}
                    </p>
                  </div>

                  {/* Property Status */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 font-medium">
                      {property.type} | Vacant | Great ROI
                    </p>
                  </div>

                  {/* Address */}
                  <div className="flex items-start mb-4">
                    <MapPin className="w-4 h-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                    <h3 className="text-sm font-medium text-gray-800 leading-tight">
                      {property.address}
                    </h3>
                  </div>

                  {/* Property Features - Horizontal layout */}
                  <div className="flex items-center space-x-6 mb-4 text-gray-600">
                    {property.beds && (
                      <div className="flex items-center">
                        <Bed className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">{property.beds}</span>
                      </div>
                    )}
                    {property.baths && (
                      <div className="flex items-center">
                        <Bath className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">{property.baths}</span>
                      </div>
                    )}
                    {property.sqft && (
                      <div className="flex items-center">
                        <Square className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">{property.sqft ? property.sqft.toLocaleString() : '0'} sq ft</span>
                      </div>
                    )}
                  </div>

                  {/* Handover Date (for off-plan properties) */}
                  {property.handover && (
                    <div className="flex items-center mb-4 text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">Handover: {property.handover}</span>
                    </div>
                  )}

                  {/* Favorite button */}
                  <div className="flex justify-between items-center">
                    <Link
                      href={`/property/${property.id}/${property.slug}`}
                      onClick={() => analytics.viewProperty(property.id || property._id, property.title)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center group/btn"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </Link>

                    <button
                      onClick={() => analytics.favoriteProperty(property.id || property._id, property.title)}
                      className="ml-3 p-3 text-gray-400 hover:text-red-500 transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Properties Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => analytics.trackEvent('view_all_properties', 'navigation', 'featured_properties_section')}
            className="bg-white hover:bg-blue-50 text-blue-600 font-semibold py-4 px-8 rounded-lg border-2 border-blue-300 hover:border-blue-400 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            View All Properties
          </button>
        </div>
      </div>
    </section>
  );
}