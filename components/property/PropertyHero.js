'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart, Share2, Calendar, MapPin, Bed, Bath, Square, Eye, Maximize } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export default function PropertyHero({ property }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const stickyRef = useRef(null);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'reserved':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'sold':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const slides = property.images.map(src => ({ src }));

  useEffect(() => {
    if (!stickyRef.current) return;

    const observer = new IntersectionObserver(
      ([e]) => setIsSticky(e.intersectionRatio < 1),
      { threshold: [1] }
    );

    observer.observe(stickyRef.current);

    return () => {
      if (stickyRef.current) {
        observer.unobserve(stickyRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-white">
      {/* Image Gallery */}
      <div className="relative h-96 lg:h-[500px] overflow-hidden group cursor-pointer" onClick={() => setOpenLightbox(true)}>
        <img
          src={property.images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="flex items-center space-x-2 bg-black/50 text-white px-4 py-2 rounded-full">
            <Maximize className="w-5 h-5" />
            <span>View Photos</span>
          </div>
        </div>
        
        {/* Image Navigation */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors z-10"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors z-10"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm z-10">
          {currentImageIndex + 1} / {property.images.length}
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(property.status)}`}>
            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2 z-10">
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              isFavorited 
                ? 'bg-red-500 text-white' 
                : 'bg-white/90 hover:bg-white text-gray-700'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
          <button className="w-10 h-10 bg-white/90 hover:bg-white text-gray-700 rounded-full flex items-center justify-center transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Property Details Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="flex-grow mb-6 md:mb-0">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>{property.location.building}, {property.location.community}, {property.location.city}</span>
              </div>
            </div>
            <div className="flex-shrink-0 text-left md:text-right">
              <div className="text-4xl lg:text-5xl font-bold text-gray-800 mb-1">
                {formatPrice(property.price)}
              </div>
              <a href="#" className="text-sm text-orange-600 hover:underline">
                Calculate your mortgage repayments
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail & Actions Bar */}
      <div ref={stickyRef} className={`border-t border-gray-200 bg-white z-20 transition-shadow ${isSticky ? 'shadow-md sticky top-0' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-2 overflow-x-auto">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-14 rounded-md overflow-hidden border-2 transition-colors ${
                    index === currentImageIndex 
                      ? 'border-blue-500' 
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Property view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            <div className="hidden md:flex items-center space-x-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center space-x-2 text-sm">
                <Calendar className="w-4 h-4" />
                <span>Schedule Viewing</span>
              </button>
              <button className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg font-medium transition-colors text-sm">
                Contact Agent
              </button>
            </div>
          </div>
        </div>
      </div>

      <Lightbox
        open={openLightbox}
        close={() => setOpenLightbox(false)}
        slides={slides}
        index={currentImageIndex}
        on={{ view: ({ index }) => setCurrentImageIndex(index) }}
      />
    </div>
  );
}
