import { notFound, redirect } from 'next/navigation';
import { getPropertyData } from '@/lib/propertyData';

// This page's sole purpose is to redirect to the canonical URL with a slug.
export default function PropertyPage({ params }) {
  const property = getPropertyData(params?.id);

  if (!property) {
    notFound();
  }

  // Permanently redirect to the SEO-friendly URL with the correct slug.
  redirect(`/property/${property.id}/${property.slug}`);

  // This component will not render anything as it always redirects.
  return null;
}

