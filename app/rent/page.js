'use client';

import { useState } from 'react';
import { featuredProperties } from '@/lib/propertyData';
import PropertyList from '@/components/property/PropertyList';
import PropertySearchForm from '@/components/property/PropertySearchForm';


export default function RentPage() {
  const initialProperties = featuredProperties.filter(
    p => p.category === 'rent'
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Properties for Rent in Dubai
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Find the perfect rental property to call home from our extensive listings across Dubai's top communities.
          </p>
        </div>

        <PropertySearchForm properties={initialProperties} onSearch={handleSearch} />
        <PropertyList properties={filteredProperties} />

        <div className="mt-20 prose prose-lg max-w-4xl mx-auto text-gray-600">
          <h2 className="font-bold text-2xl text-gray-800">Renting in Dubai: A Lifestyle of Choice</h2>
          <p>
            Dubai's rental market is as diverse and vibrant as the city itself, offering a wide array of options to suit every lifestyle and budget. From chic studios in the bustling Dubai Marina to spacious family villas in the tranquil Arabian Ranches, finding your ideal home is simple. The city's high living standards, safety, and cosmopolitan atmosphere make it a premier destination for expatriates and professionals from around the world.
          </p>
          <p>
            Our rental listings are continuously updated to bring you the best properties on the market. Whether you're looking for a furnished apartment for a short-term stay or an unfurnished villa to make your own, our team is here to assist you. We provide comprehensive information on each listing, including amenities, nearby facilities, and community features, to help you make an informed decision.
          </p>
        </div>
      </div>
    </div>
  );
}
