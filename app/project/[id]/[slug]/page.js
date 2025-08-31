import { client } from '@/lib/sanity';
import { notFound, redirect } from 'next/navigation';
import ProjectPageClient from '@/components/project/ProjectPageClient';

// Revalidate every minute for fresh content
export const revalidate = 60;

// Fetch project data from Sanity
async function getProjectData(id) {
  try {
    const project = await client.fetch(`
      *[_type == "project" && _id == $id][0] {
        _id,
        title,
        "slug": slug.current,
        description,
        longDescription,
        "images": images[].asset->url,
        startingPrice,
        handover,
        location,
        projectStatus,
        propertyTypes,
        "brochureUrl": brochure.asset->url,
        "developer": developer->{
          _id,
          name,
          "slug": slug.current,
          logo,
          description,
          establishedYear,
          totalProjects,
          website,
          phone,
          email
        },
        floorPlans[] {
          type,
          size,
          "image": image.asset->url
        },
        amenities,
        paymentPlan,
        roi,
        rentalYield,
        featured,
        totalUnits,
        usp,
        video,
        brochure {
          asset-> {
            url,
            originalFilename,
            _id
          }
        },
        seoTitle,
        seoDescription
      }
    `, { id });

    return project;
  } catch (error) {
    console.error('Error fetching project data:', error);
    return null;
  }
}

// Generate static params from Sanity
export async function generateStaticParams() {
  try {
    const projects = await client.fetch(`
      *[_type == "project" && defined(slug.current)] {
        _id,
        "slug": slug.current
      }
    `);
    return projects.map(project => ({
      id: project._id,
      slug: project.slug
    }));
  } catch (error) {
    console.error('Error generating static params for projects:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = await getProjectData(id);

  if (!project) {
    return {
      title: 'Project Not Found | Invest In Dubai Real Estate',
      description: 'The requested project could not be found.'
    };
  }

  const developerName = project?.developer?.name || 'Developer';

  return {
    title: project?.seoTitle || `${project?.title} by ${developerName} | Invest In Dubai Real Estate`,
    description: project?.seoDescription || project?.description?.substring(0, 160) || `Discover ${project?.title}, an exclusive development by ${developerName} in Dubai.`,
    openGraph: {
      title: project?.seoTitle || `${project?.title} by ${developerName}`,
      description: project?.seoDescription || project?.description,
      images: project?.images?.length > 0 ? [{ url: project.images[0] }] : [],
    }
  };
}

export default async function ProjectPage({ params }) {
  const { id, slug } = await params;
  const project = await getProjectData(id);

  if (!project) {
    notFound();
  }

  // Redirect if slug doesn't match the project's canonical slug
  const projectSlug = project?.slug?.current || project?.slug;
  if (slug !== projectSlug) {
    redirect(`/project/${project?._id}/${projectSlug}`);
  }

  return <ProjectPageClient project={project} />;
}
