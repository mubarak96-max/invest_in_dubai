'use client';

import React from 'react';
import { X } from 'lucide-react';
import ContactForm from '../project/ContactForm';

const PropertyMapModal = ({ property, onClose }) => {
  if (!property) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[1000] flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-cover bg-center" style={{ backgroundImage: `url(${property.image})` }}></div>
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{property.title}</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors">
                <X size={28} />
              </button>
            </div>
            <p className="text-lg font-semibold text-blue-600 mb-2">{property.priceDisplay}</p>
            <p className="text-gray-600 mb-4">{property.address}</p>
            <div className="flex items-center space-x-4 text-gray-700 mb-6">
              <span>{property.beds} Beds</span>
              <span>•</span>
              <span>{property.baths} Baths</span>
              <span>•</span>
              <span>{property.sqft} sqft</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Register Your Interest</h3>
            <ContactForm context={`Property Map Inquiry: ${property.title}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyMapModal;
