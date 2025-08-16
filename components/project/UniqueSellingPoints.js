'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function UniqueSellingPoints({ points, onFindOutMore }) {
  if (!points || points.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Unique Selling Points</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {points.map((point, index) => (
          <div key={index} className="group overflow-hidden rounded-lg shadow-md">
            <div className="relative h-56">
              <Image 
                src={point.image}
                alt={point.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{point.title}</h3>
              <p className="text-gray-600">{point.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <button 
          onClick={onFindOutMore}
          className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg inline-flex items-center"
        >
          Find Out More
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
}
