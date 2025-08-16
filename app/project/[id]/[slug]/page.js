import { getPropertyData } from '@/lib/propertyData';
import { notFound, redirect } from 'next/navigation';
import ProjectPageClient from '@/components/project/ProjectPageClient';

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const project = getPropertyData(params.id);
  if (!project) {
    return { title: 'Project Not Found' };
  }
  return { 
    title: `${project.title} by ${project.developer.name}`,
    description: project.description.substring(0, 160)
  };
}

export default function ProjectPage({ params }) {
  const project = getPropertyData(params.id);

  if (!project || project.category !== 'off-plan') {
    notFound();
  }

  // Redirect if slug doesn't match the project's canonical slug
  if (params.slug !== project.slug) {
    redirect(`/project/${project.id}/${project.slug}`);
  }

  return <ProjectPageClient project={project} />;
}
