'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Filter, Grid, List, ArrowRight } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import PortableText from '@/components/PortableText';
import { generateFilterSummary } from '@/lib/seoUtils';

export default function SeoPageTemplate({ 
  seoPage, 
  properties, 
  totalProperties, 
  currentPage, 
  totalPages,
  relatedPages = [] 
}) {
  const [viewMode, setViewMode] = useState('grid');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{seoPage.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {seoPage.title}
              </h1>
              
              {/* Filter Summary */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Filter className="w-4 h-4 mr-2" />
                  <span>{generateFilterSummary(seoPage.filters)}</span>
                </div>
                <div className="text-blue-600 font-semibold">
                  {totalProperties} Properties Found
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg ${
                      viewMode === 'grid' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${
                      viewMode === 'list' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </div>
              </div>
            </div>

            {/* Properties Grid/List */}
            {properties.length > 0 ? (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'
                  : 'space-y-6 mb-12'
              }>
                {properties.map((property) => (
                  <PropertyCard 
                    key={property._id} 
                    property={property} 
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg mb-4">
                  No properties found matching your criteria
                </div>
                <Link 
                  href="/buy"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700"
                >
                  Browse All Properties
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mb-12">
                <nav className="flex items-center space-x-2">
                  {currentPage > 1 && (
                    <Link
                      href={`/${seoPage.slug}?page=${currentPage - 1}`}
                      className="px-4 py-2 text-gray-600 bg-white rounded-lg hover:bg-gray-50"
                    >
                      Previous
                    </Link>
                  )}
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <Link
                        key={page}
                        href={`/${seoPage.slug}?page=${page}`}
                        className={`px-4 py-2 rounded-lg ${
                          page === currentPage
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 bg-white hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </Link>
                    );
                  })}
                  
                  {currentPage < totalPages && (
                    <Link
                      href={`/${seoPage.slug}?page=${currentPage + 1}`}
                      className="px-4 py-2 text-gray-600 bg-white rounded-lg hover:bg-gray-50"
                    >
                      Next
                    </Link>
                  )}
                </nav>
              </div>
            )}

            {/* Rich Content Description */}
            {seoPage.description && (
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <PortableText value={seoPage.description} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            {/* Related Pages */}
            {relatedPages.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Related Searches
                </h3>
                <div className="space-y-3">
                  {relatedPages.map((page) => (
                    <Link
                      key={page._id}
                      href={`/${page.slug}`}
                      className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="text-sm font-medium text-gray-900">
                        {page.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {generateFilterSummary(page.filters)}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Links */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Popular Searches
              </h3>
              <div className="space-y-2">
                <Link href="/buy" className="block text-sm text-blue-600 hover:text-blue-700">
                  Properties for Sale
                </Link>
                <Link href="/rent" className="block text-sm text-blue-600 hover:text-blue-700">
                  Properties for Rent
                </Link>
                <Link href="/off-plan" className="block text-sm text-blue-600 hover:text-blue-700">
                  Off-Plan Properties
                </Link>
                <Link href="/areas" className="block text-sm text-blue-600 hover:text-blue-700">
                  Browse by Area
                </Link>
                <Link href="/developers" className="block text-sm text-blue-600 hover:text-blue-700">
                  Browse by Developer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
