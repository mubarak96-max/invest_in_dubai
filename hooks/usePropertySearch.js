'use client';

import { useState, useMemo } from 'react';

export function usePropertySearch(initialProperties) {
  const [filteredProperties, setFilteredProperties] = useState(initialProperties);

  const handleSearch = (filters) => {
    const { searchTerm, propertyType, bedrooms, minPrice, maxPrice } = filters;

    const results = initialProperties.filter(p => {
      const searchTermMatch = searchTerm
        ? p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (p.developer?.name && p.developer.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : true;

      const typeMatch = propertyType ? (p.type === propertyType || (p.propertyTypes && p.propertyTypes.includes(propertyType))) : true;
      
      const bedMatch = bedrooms ? (p.beds === parseInt(bedrooms) || (p.beds && p.beds.toString().split(',').map(b => b.trim()).includes(bedrooms))) : true;

      const minPriceMatch = minPrice ? p.price >= parseInt(minPrice) : true;
      const maxPriceMatch = maxPrice ? p.price <= parseInt(maxPrice) : true;

      return searchTermMatch && typeMatch && bedMatch && minPriceMatch && maxPriceMatch;
    });

    setFilteredProperties(results);
  };

  return {
    filteredProperties,
    handleSearch
  };
}
