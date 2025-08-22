// SEO utility functions for programmatic SEO

const SITE_CONFIG = {
  name: 'Invest In Dubai Real Estate',
  domain: 'https://investindubai.com', // Replace with your actual domain
  description: 'Discover premium Dubai real estate investments with expert guidance and market insights.',
  twitter: '@investindubai', // Replace with your Twitter handle
  logo: '/logo.png',

  // SEO Configuration
  seo: {
    titleTemplate: '%s | Invest In Dubai Real Estate',
    defaultTitle: 'Invest In Dubai Real Estate - Premium Properties & Expert Guidance',
    description: 'Discover premium Dubai real estate investments with expert guidance and market insights. Browse luxury properties, off-plan developments, and rental opportunities.',
    keywords: [
      'Dubai real estate',
      'Dubai property investment',
      'UAE property',
      'Dubai apartments for sale',
      'Dubai villas for rent',
      'off-plan Dubai',
      'Dubai property market',
      'real estate Dubai',
      'Dubai investment opportunities',
      'luxury properties Dubai'
    ],
    author: 'Invest In Dubai Real Estate',
    creator: 'Invest In Dubai Real Estate',
    publisher: 'Invest In Dubai Real Estate',

    // Open Graph defaults
    openGraph: {
      type: 'website',
      locale: 'en_AE',
      siteName: 'Invest In Dubai Real Estate',
      images: [
        {
          url: '/og-image.jpg', // Add your default OG image
          width: 1200,
          height: 630,
          alt: 'Invest In Dubai Real Estate'
        }
      ]
    },

    // Twitter defaults
    twitter: {
      handle: '@investindubai',
      site: '@investindubai',
      cardType: 'summary_large_image'
    },

    // Verification codes
    verification: {
      google: '', // Add your Google Search Console verification code
      bing: '', // Add your Bing Webmaster verification code
      yandex: '', // Add your Yandex verification code
    }
  }
};

// Generate comprehensive property SEO metadata
export function generatePropertySEO(property) {
  const {
    title,
    description,
    price,
    category,
    propertyType,
    bedrooms,
    bathrooms,
    area,
    location,
    images,
    slug,
    _id,
    handover,
    financials
  } = property;

  // Create SEO-optimized title
  const seoTitle = generatePropertyTitle(property);

  // Create SEO-optimized description
  const seoDescription = generatePropertyDescription(property);

  // Generate keywords
  const keywords = generatePropertyKeywords(property);

  // Property URL
  const propertyUrl = `${SITE_CONFIG.domain}/property/${_id}/${slug}`;

  // Primary image
  const primaryImage = images?.[0]?.asset?.url || images?.[0] || '/default-property.jpg';

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: keywords.join(', '),
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: propertyUrl,
      siteName: SITE_CONFIG.name,
      type: 'website',
      images: [
        {
          url: primaryImage,
          width: 1200,
          height: 800,
          alt: `${title} - ${location?.community || 'Dubai'} Property`,
          type: 'image/jpeg'
        },
        ...(images?.slice(1, 4).map((img, index) => ({
          url: img?.asset?.url || img,
          width: 1200,
          height: 800,
          alt: `${title} - Image ${index + 2}`,
          type: 'image/jpeg'
        })) || [])
      ],
      locale: 'en_AE',
      countryName: 'United Arab Emirates'
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE_CONFIG.twitter,
      creator: SITE_CONFIG.twitter,
      title: seoTitle,
      description: seoDescription,
      images: [primaryImage]
    },
    alternates: {
      canonical: propertyUrl
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code', // Add your Google verification code
    }
  };
}

// Generate SEO-optimized title
function generatePropertyTitle(property) {
  const {
    title,
    price,
    category,
    propertyType,
    bedrooms,
    location
  } = property;

  const priceText = price ? `AED ${formatPrice(price)}` : 'Contact for Price';
  const bedroomText = bedrooms ? `${bedrooms}BR ` : '';
  const locationText = location?.community || 'Dubai';
  const categoryText = category === 'buy' ? 'Sale' : category === 'rent' ? 'Rent' : 'Investment';

  return `${bedroomText}${propertyType || 'Property'} for ${categoryText} in ${locationText} - ${priceText} | ${SITE_CONFIG.name}`;
}

// Generate SEO-optimized description
function generatePropertyDescription(property) {
  const {
    title,
    description,
    price,
    category,
    propertyType,
    bedrooms,
    bathrooms,
    area,
    location,
    handover,
    financials
  } = property;

  const priceText = price ? `AED ${formatPrice(price)}` : 'Contact for pricing';
  const bedroomText = bedrooms ? `${bedrooms} bedroom${bedrooms > 1 ? 's' : ''}` : '';
  const bathroomText = bathrooms ? `${bathrooms} bathroom${bathrooms > 1 ? 's' : ''}` : '';
  const areaText = area ? `${area} sq ft` : '';
  const locationText = location?.community ? `${location.community}, ${location.city || 'Dubai'}` : 'Dubai';
  const handoverText = handover ? ` Ready ${handover}` : '';
  const roiText = financials?.annualROI ? ` ${financials.annualROI}% ROI` : '';

  const features = [bedroomText, bathroomText, areaText].filter(Boolean).join(', ');
  const categoryText = category === 'buy' ? 'for sale' : category === 'rent' ? 'for rent' : 'investment opportunity';

  return `${title} ${categoryText} in ${locationText}. ${features ? `${features}. ` : ''}${priceText}.${handoverText}.${roiText} Premium Dubai real estate with expert guidance. Contact us today!`;
}

// Generate property keywords
function generatePropertyKeywords(property) {
  const {
    category,
    propertyType,
    bedrooms,
    location,
    handover,
    financials
  } = property;

  const baseKeywords = [
    'Dubai real estate',
    'Dubai property',
    'UAE property investment',
    'Dubai property for sale',
    'Dubai property for rent'
  ];

  const locationKeywords = location?.community ? [
    `${location.community} property`,
    `${location.community} real estate`,
    `property in ${location.community}`,
    `${location.community} Dubai`
  ] : [];

  const typeKeywords = propertyType ? [
    `Dubai ${propertyType}`,
    `${propertyType} for ${category}`,
    `${propertyType} in Dubai`
  ] : [];

  const bedroomKeywords = bedrooms ? [
    `${bedrooms} bedroom property Dubai`,
    `${bedrooms}BR Dubai`,
    `${bedrooms} bed property`
  ] : [];

  const categoryKeywords = category === 'buy' ? [
    'Dubai property investment',
    'buy property Dubai',
    'Dubai real estate investment'
  ] : category === 'rent' ? [
    'rent property Dubai',
    'Dubai rental property',
    'property for rent Dubai'
  ] : [];

  const handoverKeywords = handover ? [
    `ready property Dubai`,
    `move-in ready Dubai`,
    handover.includes('2024') ? 'new property Dubai' : 'off-plan Dubai'
  ] : [];

  return [
    ...baseKeywords,
    ...locationKeywords,
    ...typeKeywords,
    ...bedroomKeywords,
    ...categoryKeywords,
    ...handoverKeywords
  ].slice(0, 20); // Limit to 20 keywords
}

// Format price for display
function formatPrice(price) {
  if (price >= 1000000) {
    return `${(price / 1000000).toFixed(1)}M`;
  } else if (price >= 1000) {
    return `${(price / 1000).toFixed(0)}K`;
  }
  return price.toLocaleString();
}

// Generate structured data for property
export function generatePropertyStructuredData(property) {
  const {
    title,
    description,
    price,
    category,
    propertyType,
    bedrooms,
    bathrooms,
    area,
    location,
    images,
    slug,
    _id,
    handover,
    financials,
    reraPermit,
    amenities
  } = property;

  const propertyUrl = `${SITE_CONFIG.domain}/property/${_id}/${slug}`;
  const primaryImage = images?.[0]?.asset?.url || images?.[0];

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "@id": propertyUrl,
    "name": title,
    "description": description,
    "url": propertyUrl,
    "image": images?.map(img => img?.asset?.url || img) || [primaryImage],
    "offers": {
      "@type": "Offer",
      "price": price || 0,
      "priceCurrency": "AED",
      "availability": category === 'rent' ? "https://schema.org/ForRent" : "https://schema.org/ForSale",
      "validFrom": new Date().toISOString(),
      "seller": {
        "@type": "RealEstateAgent",
        "name": SITE_CONFIG.name,
        "url": SITE_CONFIG.domain
      }
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": location?.building || "",
      "addressLocality": location?.community || "Dubai",
      "addressRegion": location?.city || "Dubai",
      "addressCountry": "AE",
      "postalCode": location?.postalCode || ""
    },
    "geo": location?.coordinates ? {
      "@type": "GeoCoordinates",
      "latitude": location.coordinates.lat,
      "longitude": location.coordinates.lng
    } : undefined,
    "floorSize": area ? {
      "@type": "QuantitativeValue",
      "value": area,
      "unitCode": "SQF"
    } : undefined,
    "numberOfRooms": bedrooms || 0,
    "numberOfBathroomsTotal": bathrooms || 0,
    "propertyID": reraPermit || _id,
    "datePosted": new Date().toISOString(),
    "amenityFeature": amenities?.map(amenity => ({
      "@type": "LocationFeatureSpecification",
      "name": amenity
    })) || [],
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Property Type",
        "value": propertyType
      },
      {
        "@type": "PropertyValue",
        "name": "Handover",
        "value": handover
      },
      financials?.annualROI ? {
        "@type": "PropertyValue",
        "name": "Annual ROI",
        "value": `${financials.annualROI}%`
      } : null
    ].filter(Boolean)
  };
}

export { SITE_CONFIG };
