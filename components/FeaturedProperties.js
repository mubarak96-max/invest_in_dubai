'use client';

import { useState, useEffect } from 'react';
import { Bed, Bath, Square, Calendar, MapPin, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function FeaturedProperties() {
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

  // Sample property data
  const properties = [
    {
      id: 1,
      image: "https://images.bayut.com/thumbnails/787645519-800x600.webp",
      address: "Downtown Dubai, Burj Vista Tower",
      price: "AED 2,850,000",
      beds: 2,
      baths: 3,
      sqft: 1450,
      category: "buy",
      handover: null,
      type: "Apartment"
    },
    {
      id: 2,
      image: "https://images.bayut.com/thumbnails/787645519-800x600.webp",
      address: "Dubai Marina, Marina Gate",
      price: "AED 120,000/year",
      beds: 1,
      baths: 2,
      sqft: 980,
      category: "rent",
      handover: null,
      type: "Studio"
    },
    {
      id: 3,
      image: "https://images.bayut.com/thumbnails/787645519-800x600.webp",
      address: "Business Bay, Damac Heights",
      price: "AED 1,650,000",
      beds: 3,
      baths: 2,
      sqft: 1850,
      category: "off plan",
      handover: "Q4 2025",
      type: "Apartment"
    },
    {
      id: 4,
      image: "https://images.bayut.com/thumbnails/787645519-800x600.webp",
      address: "Palm Jumeirah, Atlantis Residences",
      price: "AED 8,500,000",
      beds: 4,
      baths: 5,
      sqft: 3200,
      category: "buy",
      handover: null,
      type: "Villa"
    },
    {
      id: 5,
      image: "https://images.bayut.com/thumbnails/787645519-800x600.webp",
      address: "Dubai Hills Estate, Parkways",
      price: "AED 85,000/year",
      beds: 2,
      baths: 2,
      sqft: 1200,
      category: "rent",
      handover: null,
      type: "Townhouse"
    },
    {
      id: 6,
      image: "https://images.bayut.com/thumbnails/787645519-800x600.webp",
      address: "DIFC, Index Tower",
      price: "AED 3,200,000",
      beds: 3,
      baths: 3,
      sqft: 1680,
      category: "off plan",
      handover: "Q2 2026",
      type: "Apartment"
    },
    {
      id: 7,
      image: "https://images.bayut.com/thumbnails/787645519-800x600.webp",
      address: "Jumeirah Village Circle, Green Diamond",
      price: "AED 1,150,000",
      beds: 1,
      baths: 1,
      sqft: 750,
      category: "buy",
      handover: null,
      type: "Studio"
    },
    {
      id: 8,
      image: "https://images.bayut.com/thumbnails/787645519-800x600.webp",
      address: "Dubai South, Mag 5 Boulevard",
      price: "AED 950,000",
      beds: 2,
      baths: 2,
      sqft: 1100,
      category: "off plan",
      handover: "Q1 2025",
      type: "Apartment"
    }
  ];

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

  const formatPrice = (price) => {
    return price.replace(/(\d{1,3}),(\d{3})/g, '$1,$2');
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
              key={property.id}
                 className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Property Image */}
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.address}
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
                        <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-700">12</span>
                  </div>
              </div>

              {/* Property Details */}
                <div className="p-6">
                  {/* Price - Large and prominent */}
                  <div className="mb-3">
                    <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                      {formatPrice(property.price)}
                    </p>
                  </div>

                  {/* Property Status */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 font-medium">
                      {property.type} View | Vacant | Great ROI
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
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">{property.beds}</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">{property.baths}</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">{property.sqft.toLocaleString()} sq ft</span>
                  </div>
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
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center group/btn">
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </button>
                    
                    <button className="ml-3 p-3 text-gray-400 hover:text-red-500 transition-colors duration-200">
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
           <button className="bg-white hover:bg-blue-50 text-blue-600 font-semibold py-4 px-8 rounded-lg border-2 border-blue-300 hover:border-blue-400 transition-all duration-200 shadow-sm hover:shadow-md">
            View All Properties
          </button>
        </div>
      </div>
    </section>
  );
}