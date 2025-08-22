'use client';

import { useState, useMemo } from 'react';
import { usePropertySearch } from '@/hooks/usePropertySearch';
import { featuredProperties } from '@/lib/projectData';
import ProjectList from '@/components/project/ProjectList';
import PropertySearchForm from '@/components/property/PropertySearchForm';
import { Search, Filter, Grid, List } from 'lucide-react';

export default function ProjectsClient({ projects = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDeveloper, setSelectedDeveloper] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [viewMode, setViewMode] = useState('grid');

  // Use Sanity data if available, otherwise fallback
  const initialProjects = projects.length > 0 
    ? projects 
    : featuredProperties.filter(p => p.category === 'off-plan');

  // Get unique developers and statuses for filters
  const developers = useMemo(() => {
    const devs = initialProjects
      .map(p => p.developer?.name || p.developer)
      .filter(Boolean)
      .filter((dev, index, arr) => arr.indexOf(dev) === index);
    return devs.sort();
  }, [initialProjects]);

  const statuses = useMemo(() => {
    const stats = initialProjects
      .map(p => p.projectStatus)
      .filter(Boolean)
      .filter((status, index, arr) => arr.indexOf(status) === index);
    return stats.sort();
  }, [initialProjects]);

  // Filter projects based on search criteria
  const filteredProjects = useMemo(() => {
    return initialProjects.filter(project => {
      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          project.title?.toLowerCase().includes(searchLower) ||
          project.description?.toLowerCase().includes(searchLower) ||
          project.location?.community?.toLowerCase().includes(searchLower) ||
          project.developer?.name?.toLowerCase().includes(searchLower) ||
          project.developer?.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }

      // Developer filter
      if (selectedDeveloper) {
        const projectDev = project.developer?.name || project.developer;
        if (projectDev !== selectedDeveloper) return false;
      }

      // Status filter
      if (selectedStatus && project.projectStatus !== selectedStatus) {
        return false;
      }

      // Price range filter
      if (priceRange.min || priceRange.max) {
        const price = project.startingPrice || project.price || 0;
        if (priceRange.min && price < parseInt(priceRange.min)) return false;
        if (priceRange.max && price > parseInt(priceRange.max)) return false;
      }

      return true;
    });
  }, [initialProjects, searchTerm, selectedDeveloper, selectedStatus, priceRange]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDeveloper('');
    setSelectedStatus('');
    setPriceRange({ min: '', max: '' });
  };

  if (!initialProjects || initialProjects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No projects available at the moment.</p>
      </div>
    );
  }

  return (
    <>
      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Developer Filter */}
          <select
            value={selectedDeveloper}
            onChange={(e) => setSelectedDeveloper(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Developers</option>
            {developers.map(dev => (
              <option key={dev} value={dev}>{dev}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          {/* Price Range */}
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min Price"
              value={priceRange.min}
              onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Filter Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {filteredProjects.length} of {initialProjects.length} projects
            </span>
            {(searchTerm || selectedDeveloper || selectedStatus || priceRange.min || priceRange.max) && (
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${
                viewMode === 'grid' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${
                viewMode === 'list' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Projects List */}
      {filteredProjects.length > 0 ? (
        <ProjectList projects={filteredProjects} viewMode={viewMode} />
      ) : (
        <div className="text-center py-12 bg-white rounded-xl">
          <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your search criteria or clearing the filters.
          </p>
          <button
            onClick={clearFilters}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </>
  );
}
