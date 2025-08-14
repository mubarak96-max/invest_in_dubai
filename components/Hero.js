'use client';

import { useState } from 'react';
import { Search, MapPin, Home, DollarSign } from 'lucide-react';

export default function HeroSection() {
  const [searchData, setSearchData] = useState({
    location: '',
    propertyType: 'buy',
    priceRange: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search data:', searchData);
    // Handle search logic here
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
        }}
      ></div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Top gradient overlay for nav readability */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/70 to-transparent pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
            Find Your
            <span className="block text-blue-200">Dream Home</span>
          </h1>
          
          {/* Supporting Text */}
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto mb-8 leading-relaxed">
            Discover premium properties across Dubai with expert guidance and personalized service
          </p>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">
                10,000+
              </div>
              <div className="text-sm sm:text-base text-gray-200">
                Properties Listed
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">
                500+
              </div>
              <div className="text-sm sm:text-base text-gray-200">
                Happy Clients
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">
                15+
              </div>
              <div className="text-sm sm:text-base text-gray-200">
                Years Experience
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">
                25+
              </div>
              <div className="text-sm sm:text-base text-gray-200">
                Prime Areas
              </div>
            </div>
          </div>
        </div>

        {/* Property Search Form */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
            <form onSubmit={handleSearch} className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-4">
              
              {/* Location Input */}
              <div className="lg:col-span-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="location"
                    value={searchData.location}
                    onChange={handleInputChange}
                    placeholder="Enter area, community, or landmark"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Property Type Select */}
              <div className="lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Home className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    name="propertyType"
                    value={searchData.propertyType}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-8 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
                  >
                    <option value="buy">Buy</option>
                    <option value="rent">Rent</option>
                    <option value="commercial">Commercial</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Price Range Select */}
              <div className="lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    name="priceRange"
                    value={searchData.priceRange}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-8 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
                  >
                    <option value="">Any Price</option>
                    <option value="0-500000">Up to AED 500K</option>
                    <option value="500000-1000000">AED 500K - 1M</option>
                    <option value="1000000-2000000">AED 1M - 2M</option>
                    <option value="2000000-5000000">AED 2M - 5M</option>
                    <option value="5000000+">AED 5M+</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div className="lg:col-span-1 lg:flex lg:items-end">
                <button
                  type="submit"
                  className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center touch:py-4"
                >
                  <Search className="h-5 w-5 lg:mr-0" />
                  <span className="ml-2 lg:hidden">Search Properties</span>
                </button>
              </div>
            </form>

            {/* Quick Filters */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">Popular Searches:</p>
              <div className="flex flex-wrap gap-2">
                {['Downtown Dubai', 'Dubai Marina', 'Palm Jumeirah', 'Business Bay', 'JVC'].map((area) => (
                  <button
                    key={area}
                    onClick={() => setSearchData(prev => ({ ...prev, location: area }))}
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors duration-200"
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}