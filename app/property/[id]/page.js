import { notFound, redirect } from 'next/navigation';
import { getPropertyData } from '@/lib/projectData';

// This page's sole purpose is to redirect to the canonical URL with a slug.
export default async function PropertyPage({ params }) {
  const { id } = await params;
  const property = getPropertyData(id);

  if (!property) {
    notFound();
  }

  // Permanently redirect to the SEO-friendly URL with the correct slug.
  redirect(`/property/${property.id}/${property.slug}`);

  // This component will not render anything as it always redirects.
  return null;
}

