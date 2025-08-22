import { client } from '@/lib/sanity';

// Build GROQ query from filters
export function buildPropertyQuery(filters = {}) {
  const conditions = ['_type == "property"'];
  
  // Category filter
  if (filters.category) {
    conditions.push(`category == "${filters.category}"`);
  }
  
  // Property type filter
  if (filters.propertyType) {
    conditions.push(`propertyType == "${filters.propertyType}"`);
  }
  
  // Location filters
  if (filters.location?.community) {
    conditions.push(`location.community match "${filters.location.community}*"`);
  }
  if (filters.location?.city) {
    conditions.push(`location.city match "${filters.location.city}*"`);
  }
  
  // Price range filter
  if (filters.priceRange?.min) {
    conditions.push(`price >= ${filters.priceRange.min}`);
  }
  if (filters.priceRange?.max) {
    conditions.push(`price <= ${filters.priceRange.max}`);
  }
  
  // Bedrooms filter
  if (filters.bedrooms && filters.bedrooms.length > 0) {
    const bedroomConditions = filters.bedrooms.map(num => `bedrooms == ${num}`).join(' || ');
    conditions.push(`(${bedroomConditions})`);
  }
  
  // Bathrooms filter
  if (filters.bathrooms && filters.bathrooms.length > 0) {
    const bathroomConditions = filters.bathrooms.map(num => `bathrooms == ${num}`).join(' || ');
    conditions.push(`(${bathroomConditions})`);
  }
  
  // Area range filter
  if (filters.areaRange?.min) {
    conditions.push(`area >= ${filters.areaRange.min}`);
  }
  if (filters.areaRange?.max) {
    conditions.push(`area <= ${filters.areaRange.max}`);
  }
  
  // Handover filter
  if (filters.handover) {
    conditions.push(`handover match "${filters.handover}*"`);
  }
  
  // Developer filter
  if (filters.developer?._ref) {
    conditions.push(`developer._ref == "${filters.developer._ref}"`);
  }
  
  return conditions.join(' && ');
}

// Get properties based on filters with pagination
export async function getFilteredProperties(filters = {}, page = 1, limit = 20) {
  const whereClause = buildPropertyQuery(filters);
  const offset = (page - 1) * limit;
  
  const query = `{
    "properties": *[${whereClause}] | order(_createdAt desc) [${offset}...${offset + limit}] {
      _id,
      title,
      "slug": slug.current,
      "images": images[].asset->url,
      price,
      category,
      propertyType,
      bedrooms,
      bathrooms,
      area,
      location,
      handover,
      financials,
      amenities,
      usp,
      status,
      featured,
      description
    },
    "total": count(*[${whereClause}])
  }`;
  
  return await client.fetch(query);
}

// Generate related SEO pages for internal linking
export async function getRelatedSeoPages(currentPage, limit = 6) {
  const { filters, slug } = currentPage;
  const relatedPages = [];
  
  // Get all active SEO pages except current
  const allPages = await client.fetch(`
    *[_type == "seoPage" && isActive == true && slug.current != "${slug}"] {
      _id,
      title,
      "slug": slug.current,
      filters,
      priority
    } | order(priority desc)
  `);
  
  // Score pages based on similarity to current filters
  const scoredPages = allPages.map(page => ({
    ...page,
    score: calculateSimilarityScore(filters, page.filters)
  }));
  
  // Sort by score and return top results
  return scoredPages
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

// Calculate similarity score between two filter sets
function calculateSimilarityScore(filters1 = {}, filters2 = {}) {
  let score = 0;
  
  // Same category = +3 points
  if (filters1.category && filters2.category && filters1.category === filters2.category) {
    score += 3;
  }
  
  // Same location community = +5 points
  if (filters1.location?.community && filters2.location?.community && 
      filters1.location.community === filters2.location.community) {
    score += 5;
  }
  
  // Same property type = +2 points
  if (filters1.propertyType && filters2.propertyType && 
      filters1.propertyType === filters2.propertyType) {
    score += 2;
  }
  
  // Overlapping bedrooms = +1 point
  if (filters1.bedrooms && filters2.bedrooms) {
    const overlap = filters1.bedrooms.filter(bed => filters2.bedrooms.includes(bed));
    if (overlap.length > 0) score += 1;
  }
  
  // Similar price range = +1 point
  if (filters1.priceRange && filters2.priceRange) {
    const range1 = filters1.priceRange;
    const range2 = filters2.priceRange;
    
    if ((range1.min && range2.min && Math.abs(range1.min - range2.min) < 500000) ||
        (range1.max && range2.max && Math.abs(range1.max - range2.max) < 500000)) {
      score += 1;
    }
  }
  
  return score;
}

// Generate breadcrumbs for SEO page
export function generateBreadcrumbs(seoPage) {
  const breadcrumbs = [
    { title: 'Home', href: '/' }
  ];
  
  const { filters } = seoPage;
  
  // Add category breadcrumb
  if (filters?.category) {
    const categoryMap = {
      'buy': { title: 'Buy', href: '/buy' },
      'rent': { title: 'Rent', href: '/rent' },
      'off-plan': { title: 'Off-Plan', href: '/off-plan' }
    };
    
    if (categoryMap[filters.category]) {
      breadcrumbs.push(categoryMap[filters.category]);
    }
  }
  
  // Add location breadcrumb if available
  if (filters?.location?.community) {
    breadcrumbs.push({
      title: filters.location.community,
      href: `/areas/${filters.location.community.toLowerCase().replace(/\s+/g, '-')}`
    });
  }
  
  // Add current page
  breadcrumbs.push({
    title: seoPage.title,
    href: `/${seoPage.slug}`,
    current: true
  });
  
  return breadcrumbs;
}

// Generate filter summary text
export function generateFilterSummary(filters) {
  const parts = [];
  
  if (filters?.propertyType) {
    parts.push(filters.propertyType + 's');
  } else {
    parts.push('Properties');
  }
  
  if (filters?.category) {
    const categoryMap = {
      'buy': 'for Sale',
      'rent': 'for Rent',
      'off-plan': 'Off-Plan'
    };
    parts.push(categoryMap[filters.category] || '');
  }
  
  if (filters?.location?.community) {
    parts.push('in ' + filters.location.community);
  }
  
  if (filters?.bedrooms && filters.bedrooms.length > 0) {
    const bedrooms = filters.bedrooms.sort((a, b) => a - b);
    if (bedrooms.length === 1) {
      parts.push(`${bedrooms[0]} Bedroom`);
    } else {
      parts.push(`${bedrooms[0]}-${bedrooms[bedrooms.length - 1]} Bedrooms`);
    }
  }
  
  if (filters?.priceRange) {
    const { min, max } = filters.priceRange;
    if (min && max) {
      parts.push(`AED ${formatPriceShort(min)} - ${formatPriceShort(max)}`);
    } else if (min) {
      parts.push(`From AED ${formatPriceShort(min)}`);
    } else if (max) {
      parts.push(`Under AED ${formatPriceShort(max)}`);
    }
  }
  
  return parts.filter(Boolean).join(' ');
}

// Format price for display in summaries
function formatPriceShort(price) {
  if (price >= 1000000) {
    return `${(price / 1000000).toFixed(1)}M`;
  } else if (price >= 1000) {
    return `${(price / 1000).toFixed(0)}K`;
  }
  return price.toLocaleString();
}

// Generate SEO metadata for programmatic page
export function generateSeoPageMetadata(seoPage, propertyCount = 0) {
  const { title, seoMetadata, filters, slug } = seoPage;
  
  // Use custom meta title or generate from page title
  const metaTitle = seoMetadata?.metaTitle || 
    `${title} | ${propertyCount} Properties | Invest In Dubai Real Estate`;
  
  // Use custom meta description or generate from filters
  const metaDescription = seoMetadata?.metaDescription || 
    `Discover ${propertyCount} ${generateFilterSummary(filters).toLowerCase()} with expert guidance. Premium Dubai real estate investments with detailed property information and market insights.`;
  
  // Use custom keywords or generate from filters
  const keywords = seoMetadata?.keywords || generateSeoKeywords(filters);
  
  const canonicalUrl = seoMetadata?.canonicalUrl || `https://investindubai.com/${slug}`;
  
  return {
    title: metaTitle,
    description: metaDescription,
    keywords: keywords.join(', '),
    canonical: canonicalUrl,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonicalUrl,
      type: 'website',
      siteName: 'Invest In Dubai Real Estate'
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription
    }
  };
}

// Generate SEO keywords from filters
function generateSeoKeywords(filters) {
  const keywords = ['Dubai real estate', 'Dubai property'];
  
  if (filters?.category) {
    const categoryKeywords = {
      'buy': ['Dubai property for sale', 'buy property Dubai', 'Dubai real estate investment'],
      'rent': ['Dubai property for rent', 'rent property Dubai', 'Dubai rental properties'],
      'off-plan': ['Dubai off-plan properties', 'off-plan Dubai', 'new developments Dubai']
    };
    keywords.push(...(categoryKeywords[filters.category] || []));
  }
  
  if (filters?.location?.community) {
    const community = filters.location.community;
    keywords.push(
      `${community} property`,
      `${community} real estate`,
      `property in ${community}`,
      `${community} Dubai`
    );
  }
  
  if (filters?.propertyType) {
    keywords.push(
      `Dubai ${filters.propertyType}`,
      `${filters.propertyType} Dubai`,
      `${filters.propertyType} for ${filters.category || 'sale'}`
    );
  }
  
  return keywords.slice(0, 15); // Limit to 15 keywords
}
