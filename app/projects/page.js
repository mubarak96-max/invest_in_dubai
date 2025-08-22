import { client } from '@/lib/sanity';
import ProjectsClient from '@/components/ProjectsClient';

// Revalidate every hour
export const revalidate = 3600;

// Fetch projects from Sanity
async function getProjects() {
  try {
    const projects = await client.fetch(`
      *[_type == "project"] | order(_createdAt desc) {
        _id,
        title,
        "slug": slug.current,
        description,
        "images": images[].asset->url,
        startingPrice,
        handover,
        location,
        projectStatus,
        propertyTypes,
        "developer": developer->{
          _id,
          name,
          "slug": slug.current
        },
        floorPlans,
        amenities,
        paymentPlan,
        roi,
        rentalYield,
        featured,
        "totalUnits": totalUnits,
        "completionDate": handover
      }
    `);
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

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

        <ProjectsClient projects={projects} />
      </div>
    </div>
  );
}
