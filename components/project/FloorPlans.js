'use client';

import { useState } from 'react';
import { LayoutTemplate } from 'lucide-react';
import Image from 'next/image';

export default function FloorPlans({ plans }) {
  const [activeTab, setActiveTab] = useState(0);

  if (!plans || plans.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
        <LayoutTemplate className="w-6 h-6 mr-3 text-blue-600" />
        Floor Plans
      </h2>
      <div className="flex border-b border-gray-200">
        {plans.map((plan, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === index
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
              }`}>
            {plan.type}
          </button>
        ))}
      </div>
      <div className="mt-6">
        {plans.map((plan, index) => (
          <div key={index} className={activeTab === index ? 'block' : 'hidden'}>
            <h3 className="font-bold text-lg">{plan.type} - <span className="text-gray-600 font-medium">{plan.size}</span></h3>
            <div className="mt-4 relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
              {(() => {
                // Handle different possible image formats from Sanity
                let imageUrl = null;

                if (typeof plan?.image === 'string' && plan.image.trim() !== '') {
                  imageUrl = plan.image.trim();
                } else if (plan?.image?.asset?.url) {
                  imageUrl = plan.image.asset.url;
                } else if (plan?.image?.url) {
                  imageUrl = plan.image.url;
                }

                return imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={`${plan.type} floor plan`}
                    fill
                    className="object-contain rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-500">Floor plan image not available</span>
                  </div>
                );
              })()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
