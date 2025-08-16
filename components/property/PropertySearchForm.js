'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

export default function PropertySearchForm({ properties, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const uniqueTypes = [...new Set(properties.map(p => p.type))].sort();
  const uniqueBedrooms = [...new Set(properties.map(p => p.beds))].sort((a, b) => a - b);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ searchTerm, propertyType, bedrooms, minPrice, maxPrice });
  };

  return (
    <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-lg mb-12">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        <div>
          <label htmlFor="search-term" className="block text-sm font-medium text-gray-700">Keyword or Location</label>
          <input
            type="text"
            id="search-term"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="e.g., Downtown, Marina, Villa"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="property-type" className="block text-sm font-medium text-gray-700">Property Type</label>
          <select
            id="property-type"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">All Types</option>
            {uniqueTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">Bedrooms</label>
          <select
            id="bedrooms"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Any</option>
            {uniqueBedrooms.map(bed => (
              <option key={bed} value={bed}>{bed} Bed{bed > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="min-price" className="block text-sm font-medium text-gray-700">Min Price</label>
          <input
            type="number"
            id="min-price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="e.g., 500000"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="max-price" className="block text-sm font-medium text-gray-700">Max Price</label>
          <input
            type="number"
            id="max-price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="e.g., 2000000"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <button type="submit" className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <Search className="w-5 h-5 mr-2" />
          Search
        </button>
      </div>
    </form>
  );
}
