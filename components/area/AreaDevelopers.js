'use client';

import Link from 'next/link';
import { Building2, MapPin, Calendar, TrendingUp } from 'lucide-react';
import { developers } from '@/lib/propertyData';
import { featuredProperties } from '@/lib/projectData';

export default function AreaDevelopers({ areaName }) {
  // Find developers who have properties in this area
  const areaProperties = featuredProperties.filter(property => 
    property.address.toLowerCase().includes(areaName.toLowerCase()) ||
    property.title.toLowerCase().includes(areaName.toLowerCase())
  );

  // Get unique developers from area properties
  const areaDevelopers = developers.filter(developer => 
    areaProperties.some(property => 
      (typeof property.developer === 'string' && property.developer === developer.name) ||
      (typeof property.developer === 'object' && property.developer.name === developer.name)
    )
  );

  // Get project count for each developer in this area
  const developersWithStats = areaDevelopers.map(developer => {
    const developerProjects = areaProperties.filter(property => 
      (typeof property.developer === 'string' && property.developer === developer.name) ||
      (typeof property.developer === 'object' && property.developer.name === developer.name)
    );

    return {
      ...developer,
      projectsInArea: developerProjects.length,
      avgPrice: developerProjects.reduce((sum, p) => sum + p.price, 0) / developerProjects.length || 0
    };
  });

  if (developersWithStats.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Developers in {areaName}</h2>
        <p className="text-gray-600">No developers currently have projects in this area.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
      
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Top Developers in {areaName}</h2>
        <p className="text-gray-600">
          {developersWithStats.length} leading developers with active projects in this area
        </p>
      </div>

      {/* Developers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {developersWithStats.map((developer) => (
          <Link 
            key={developer.id} 
            href={`/developers/${developer.slug}`}
            className="group"
          >
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200">
              
              {/* Developer Logo/Image */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {developer.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    Est. {developer.established}
                  </div>
                </div>
              </div>

              {/* Developer Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {developer.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-white rounded-lg border border-gray-100">
                  <div className="text-lg font-bold text-gray-900">{developer.projectsInArea}</div>
                  <div className="text-xs text-gray-500">Projects Here</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border border-gray-100">
                  <div className="text-lg font-bold text-gray-900">{developer.totalProjects}+</div>
                  <div className="text-xs text-gray-500">Total Projects</div>
                </div>
              </div>

              {/* Average Price in Area */}
              {developer.avgPrice > 0 && (
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Avg. Price</span>
                  </div>
                  <span className="text-sm font-bold text-blue-900">
                    AED {(developer.avgPrice / 1000000).toFixed(1)}M
                  </span>
                </div>
              )}

              {/* Specialties */}
              {developer.specialties && (
                <div className="mt-4">
                  <div className="flex flex-wrap gap-1">
                    {developer.specialties.slice(0, 2).map((specialty, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                    {developer.specialties.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{developer.specialties.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* View Projects Link */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">View all projects</span>
                  <div className="text-blue-600 group-hover:text-blue-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

            </div>
          </Link>
        ))}
      </div>

      {/* View All Developers Link */}
      <div className="text-center mt-8">
        <Link 
          href="/developers"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <span>View All Developers</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

    </div>
  );
}
