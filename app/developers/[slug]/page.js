import { developers } from '@/lib/propertyData';
import { featuredProperties } from '@/lib/projectData';
import ProjectList from '@/components/project/ProjectList';
import DeveloperHero from '@/components/developer/DeveloperHero';

export async function generateStaticParams() {
  return developers.map(dev => ({ slug: dev.slug }));
}

export default function DeveloperPage({ params }) {
  const { slug } = params;
  const developer = developers.find(d => d.slug === slug);
  const projects = featuredProperties.filter(p => p.developer === developer?.name && p.category === 'off-plan');

  if (!developer) {
    return <div>Developer not found</div>;
  }

  return (
    <div className="bg-white">
      <DeveloperHero developer={developer} />

      {/* About the Developer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">About {developer.name}</h2>
            <div className="prose prose-lg text-gray-600">
                <p>{developer.longDescription}</p>
            </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Projects by {developer.name}</h2>
        {projects.length > 0 ? (
            <ProjectList projects={projects} />
        ) : (
            <p className="text-gray-500">No off-plan projects found for this developer at the moment.</p>
        )}
      </div>
    </div>
  );
}
