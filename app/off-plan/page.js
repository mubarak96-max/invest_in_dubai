'use client';

import { useState } from 'react';
import { featuredProperties } from '@/lib/propertyData';
import PropertyList from '@/components/property/PropertyList';
import PropertySearchForm from '@/components/property/PropertySearchForm';


export default function OffPlanPage() {
  const initialProperties = featuredProperties.filter(
    p => p.category === 'off plan'
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
            Dubai Off-Plan Properties
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Invest in the future of Dubai with our exclusive portfolio of off-plan projects from leading developers.
          </p>
        </div>

        <PropertySearchForm properties={initialProperties} onSearch={handleSearch} />
        <PropertyList properties={filteredProperties} />

        <div className="mt-20 prose prose-lg max-w-4xl mx-auto text-gray-600">
          <h2 className="font-bold text-2xl text-gray-800">Why Invest in Off-Plan Properties in Dubai?</h2>
          <p>
            Off-plan investments are a cornerstone of Dubai's dynamic real estate market, offering investors the opportunity to purchase property directly from developers at lower prices before construction is complete. This strategy often leads to significant capital appreciation upon project completion. Benefits include attractive payment plans, the ability to choose premium units, and the potential for high rental yields in a city with strong rental demand.
          </p>
          <p>
            We provide access to a wide range of off-plan projects, from luxury waterfront apartments to family-friendly villas in master-planned communities. Our expert advisors can guide you through the entire process, from selecting the right project to understanding payment schedules and handover procedures, ensuring a secure and profitable investment.
          </p>
        </div>
      </div>
    </div>
  );
}
