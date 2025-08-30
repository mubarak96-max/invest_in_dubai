'use client';

import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Buy');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery, 'in category:', selectedCategory);
    // Handle search logic here
  };

  return (
    <section className="relative h-screen flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl w-full">
        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Find Your Perfect
          <span className="block text-blue-400">Home in Dubai</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto">
          Discover luxury properties in Dubai's most prestigious neighborhoods
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          {/* Category Selection */}
          <div className="mb-6 flex flex-wrap justify-center gap-3">
            {['Buy', 'Rent', 'Off-Plan'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-all duration-200 border ${selectedCategory === category
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearch} className="bg-white rounded-full p-2 shadow-2xl">
            <div className="flex items-center">
              <div className="flex-1 flex items-center pl-6">
                <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by location, property type, or developer..."
                  className="flex-1 py-4 text-gray-900 placeholder-gray-500 focus:outline-none text-lg"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full transition-colors duration-200 ml-2"
              >
                <Search className="h-6 w-6" />
              </button>
            </div>
          </form>
        </div>

        {/* Stats */}
        {/* <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold">10K+</div>
            <div className="text-gray-300 mt-1">Properties</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold">500+</div>
            <div className="text-gray-300 mt-1">Happy Clients</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold">15+</div>
            <div className="text-gray-300 mt-1">Years Experience</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold">25+</div>
            <div className="text-gray-300 mt-1">Prime Areas</div>
          </div>
        </div> */}
      </div>
    </section>
  );
}