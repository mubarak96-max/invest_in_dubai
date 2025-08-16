import { getPropertyData } from '@/lib/projectData';
import { notFound, redirect } from 'next/navigation';
import ProjectPageClient from '@/components/project/ProjectPageClient';

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = getPropertyData(id);
  if (!project) {
    return { title: 'Project Not Found' };
  }
  return { 
    title: `${project.title} by ${project.developer.name}`,
    description: project.description.substring(0, 160)
  };
}

export default async function ProjectPage({ params }) {
  const { id, slug } = await params;
  const project = getPropertyData(id);

  if (!project || project.category !== 'off-plan') {
    notFound();
  }

  // Redirect if slug doesn't match the project's canonical slug
  if (slug !== project.slug) {
    redirect(`/project/${project.id}/${project.slug}`);
  }

  return <ProjectPageClient project={project} />;
}
