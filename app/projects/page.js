'use client';

import { usePropertySearch } from '@/hooks/usePropertySearch';
import { featuredProperties } from '@/lib/projectData';
import ProjectList from '@/components/project/ProjectList';
import PropertySearchForm from '@/components/property/PropertySearchForm';

export default function ProjectsPage() {
  const initialProjects = featuredProperties.filter(p => p.category === 'off-plan');
  const { filteredProperties: filteredProjects, handleSearch } = usePropertySearch(initialProjects);

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-left mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
            Dubai Off-Plan Projects
          </h1>
          <p className="mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Explore exclusive off-plan investment opportunities from Dubai's top real estate developers.
          </p>
        </div>

        <PropertySearchForm properties={initialProjects} onSearch={handleSearch} />
        <ProjectList projects={filteredProjects} />

      </div>
    </div>
  );
}
