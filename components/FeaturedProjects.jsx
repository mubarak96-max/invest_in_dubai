'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Calendar, Building, ArrowRight } from 'lucide-react';
import { analytics } from '@/lib/analytics';
import { formatPrice } from '@/lib/format';

export default function FeaturedProjects({ projects = [] }) {
  console.log('FeaturedProjects received:', projects?.length || 0, 'projects');

  if (!projects || projects.length === 0) {
    return (
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600">
              No featured projects available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Featured Property Investments
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover exclusive property investments from Dubai's leading developers with attractive payment plans and high investment potential.
          </p>
        </div>

        {/* Projects Container */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project) => (
              <div
                key={project._id}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Project Image */}
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <Image
                    src={project.image || '/default-project.jpg'}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Status Badge */}
                  {project.projectStatus && (
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {project.projectStatus}
                    </div>
                  )}

                  {/* Handover Badge */}
                  {project.handover && (
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {project.handover}
                    </div>
                  )}
                </div>

                {/* Project Details */}
                <div className="p-6">
                  {/* Price */}
                  <div className="mb-3">
                    <p className="text-xl sm:text-2xl font-bold text-blue-600">
                      {project.startingPrice ? `Starting from ${formatPrice(project.startingPrice)}` : 'Contact for Price'}
                    </p>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {project.title}
                  </h3>

                  {/* Location */}
                  <div className="flex items-start mb-4">
                    <MapPin className="w-4 h-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-600 leading-tight">
                      {project.address || 'Location TBA'}
                    </span>
                  </div>

                  {/* Property Types & Bedrooms */}
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                    {project.propertyTypes && (
                      <span>{project.propertyTypes.join(', ')}</span>
                    )}
                    {project.beds && (
                      <span>{project.beds} Bedrooms</span>
                    )}
                  </div>

                  {/* Handover Date */}
                  {project.handover && (
                    <div className="flex items-center mb-4">
                      <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-600">Handover: {project.handover}</span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3">
                    <Link
                      href={`/project/${project._id}/${project.slug}`}
                      onClick={() => analytics.viewProject(project.title)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center group/btn"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <Link
            href="/projects"
            onClick={() => analytics.trackEvent('view_all_projects', 'navigation', 'featured_projects_section')}
            className="inline-block bg-white hover:bg-blue-50 text-blue-600 font-semibold py-4 px-8 rounded-lg border-2 border-blue-300 hover:border-blue-400 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
