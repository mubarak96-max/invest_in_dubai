'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Tag, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProjectHero({ project }) {
  const { title, developer, address, priceDisplay, handover, projectStatus, propertyTypes, images } = project;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] text-white shadow-lg rounded-b-2xl overflow-hidden">
      {/* Background Image */}
      <Image
        src={images[currentIndex]}
        alt={title}
        layout="fill"
        objectFit="cover"
        className="transition-all duration-500 ease-in-out transform scale-100"
        priority
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-12">
        <div className="max-w-4xl">
            <div className="flex items-center gap-x-3 mb-3">
                {projectStatus && <span className="bg-blue-500/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">{projectStatus}</span>}
                {propertyTypes && <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">{propertyTypes.join(', ')}</span>}
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-shadow-lg">{title}</h1>
            <p className="text-xl md:text-2xl mt-3 text-gray-200 text-shadow">by <span className="font-semibold">{developer.name}</span></p>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 text-gray-200">
                <div className="flex items-center"><MapPin className="w-5 h-5 mr-3 text-blue-300" /><span>{address}</span></div>
                <div className="flex items-center"><Tag className="w-5 h-5 mr-3 text-blue-300" /><span>{priceDisplay}</span></div>
                <div className="flex items-center"><Calendar className="w-5 h-5 mr-3 text-blue-300" /><span>Handover: <span className="font-semibold">{handover}</span></span></div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg">Register Interest</button>
                <button className="bg-black/60 backdrop-blur-md text-white font-bold py-3 px-8 rounded-lg hover:bg-black/80 transition-all transform hover:scale-105 shadow-lg">Download Brochure</button>
            </div>
        </div>
      </div>

      {/* Image Navigation */}
      {images.length > 1 && (
        <>
            <button onClick={handlePrev} className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/20 text-white p-3 rounded-full hover:bg-white/40 transition-all z-20">
                <ChevronLeft size={28} />
            </button>
            <button onClick={handleNext} className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/20 text-white p-3 rounded-full hover:bg-white/40 transition-all z-20">
                <ChevronRight size={28} />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {images.map((_, index) => (
                    <div 
                        key={index} 
                        className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
                    />
                ))}
            </div>
        </>
      )}
    </div>
  );
}
