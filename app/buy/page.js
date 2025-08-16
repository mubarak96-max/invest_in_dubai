'use client';

import { useState } from 'react';
import { featuredProperties } from '@/lib/propertyData';
import PropertyList from '@/components/property/PropertyList';
import PropertySearchForm from '@/components/property/PropertySearchForm';


export default function BuyPage() {
  const initialProperties = featuredProperties.filter(
    p => p.category === 'buy' || p.category === 'off plan'
  );

  const [filteredProperties, setFilteredProperties] = useState(initialProperties);

  const handleSearch = ({ searchTerm, propertyType, bedrooms, minPrice, maxPrice }) => {
    const results = initialProperties.filter(p => {
      const searchTermMatch = searchTerm ? 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.address.toLowerCase().includes(searchTerm.toLowerCase()) : true;
      const typeMatch = propertyType ? p.type === propertyType : true;
      const bedMatch = bedrooms ? p.beds === parseInt(bedrooms) : true;
      const minPriceMatch = minPrice ? p.price >= parseInt(minPrice) : true;
      const maxPriceMatch = maxPrice ? p.price <= parseInt(maxPrice) : true;
      return searchTermMatch && typeMatch && bedMatch && minPriceMatch && maxPriceMatch;
    });
    setFilteredProperties(results);
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-left mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
            Properties for Sale in Dubai
          </h1>
          <p className="mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Discover your dream home or next investment from our exclusive collection of ready and off-plan properties.
          </p>
        </div>

        <PropertySearchForm properties={initialProperties} onSearch={handleSearch} />
        <PropertyList properties={filteredProperties} />

        <div className="mt-20 prose prose-lg max-w-4xl mx-auto text-gray-600">
          <h2 className="font-bold text-2xl text-gray-800">Your Guide to Buying Property in Dubai</h2>
          <p>
            Investing in Dubai's real estate market offers a unique blend of luxury, stability, and high returns. Whether you're seeking a modern apartment with skyline views in Downtown Dubai, a serene villa in a gated community like Dubai Hills, or a lucrative off-plan project in an emerging neighborhood, our curated selection has something for every investor and homebuyer. Dubai's tax-free environment, world-class infrastructure, and investor-friendly policies make it one of the most attractive property markets globally.
          </p>
          <p>
            Our portfolio includes properties from renowned developers, ensuring quality and timely delivery. From the iconic Palm Jumeirah to the bustling Business Bay, explore diverse communities that cater to every lifestyle. Let us help you navigate the market and find a property that not only meets your needs but also represents a sound investment for your future.
          </p>
        </div>
      </div>
    </div>
  );
}
