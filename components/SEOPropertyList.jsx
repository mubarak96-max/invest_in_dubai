'use client';

import { SITE_CONFIG } from '@/lib/seo';

// SEO component for property listing pages (buy, rent, off-plan)
export default function SEOPropertyList({ 
  category, 
  properties = [], 
  location = null,
  propertyType = null,
  priceRange = null 
}) {
  
  // Generate structured data for property listings
  const generateListingStructuredData = () => {
    const baseUrl = SITE_CONFIG.domain;
    
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": `${category === 'buy' ? 'Properties for Sale' : category === 'rent' ? 'Properties for Rent' : 'Off-Plan Properties'} in Dubai`,
      "description": `Browse ${properties.length} premium ${category === 'buy' ? 'properties for sale' : category === 'rent' ? 'rental properties' : 'off-plan developments'} in Dubai`,
      "url": `${baseUrl}/${category}`,
      "numberOfItems": properties.length,
      "itemListElement": properties.slice(0, 10).map((property, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "RealEstateListing",
          "@id": `${baseUrl}/property/${property._id || property.id}/${property.slug}`,
          "name": property.title,
          "description": property.description,
          "url": `${baseUrl}/property/${property._id || property.id}/${property.slug}`,
          "image": property.images?.[0]?.asset?.url || property.images?.[0] || property.image,
          "offers": {
            "@type": "Offer",
            "price": property.price || 0,
            "priceCurrency": "AED",
            "availability": category === 'rent' ? "https://schema.org/ForRent" : "https://schema.org/ForSale"
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": property.location?.community || "Dubai",
            "addressRegion": property.location?.city || "Dubai",
            "addressCountry": "AE"
          },
          "floorSize": property.area ? {
            "@type": "QuantitativeValue",
            "value": property.area,
            "unitCode": "SQF"
          } : undefined,
          "numberOfRooms": property.bedrooms || 0,
          "numberOfBathroomsTotal": property.bathrooms || 0
        }
      }))
    };
  };

  // Generate breadcrumb structured data
  const generateBreadcrumbData = () => {
    const baseUrl = SITE_CONFIG.domain;
    const breadcrumbs = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": category === 'buy' ? 'Buy' : category === 'rent' ? 'Rent' : 'Off-Plan',
        "item": `${baseUrl}/${category}`
      }
    ];

    if (location) {
      breadcrumbs.push({
        "@type": "ListItem",
        "position": 3,
        "name": location,
        "item": `${baseUrl}/${category}?location=${encodeURIComponent(location)}`
      });
    }

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs
    };
  };

  // Generate FAQ structured data for common property questions
  const generateFAQData = () => {
    const commonQuestions = {
      buy: [
        {
          question: "What are the best areas to buy property in Dubai?",
          answer: "Popular areas for property investment in Dubai include Downtown Dubai, Dubai Marina, Palm Jumeirah, Business Bay, and Dubai Hills Estate. Each area offers unique advantages for different investment strategies."
        },
        {
          question: "Can foreigners buy property in Dubai?",
          answer: "Yes, foreigners can buy freehold properties in designated areas of Dubai. These include popular locations like Downtown Dubai, Dubai Marina, Palm Jumeirah, and many other communities."
        },
        {
          question: "What is the average ROI for Dubai properties?",
          answer: "Dubai properties typically offer rental yields between 5-8% annually, depending on the location, property type, and market conditions. Premium locations may offer lower yields but better capital appreciation."
        }
      ],
      rent: [
        {
          question: "What documents do I need to rent a property in Dubai?",
          answer: "To rent property in Dubai, you typically need a valid passport, UAE residence visa, Emirates ID, salary certificate, bank statements, and security deposit (usually 5-10% of annual rent)."
        },
        {
          question: "How is rent paid in Dubai?",
          answer: "Rent in Dubai is typically paid annually in advance, though some landlords accept payment in 2-4 installments. Payment is usually made by bank transfer or certified cheque."
        },
        {
          question: "What is DEWA and how do I connect utilities?",
          answer: "DEWA (Dubai Electricity and Water Authority) provides utilities in Dubai. Tenants usually need to transfer utilities to their name and pay a security deposit when moving in."
        }
      ],
      'off-plan': [
        {
          question: "What are the benefits of buying off-plan in Dubai?",
          answer: "Off-plan properties in Dubai offer flexible payment plans, potential capital appreciation during construction, modern amenities, and often lower prices compared to ready properties."
        },
        {
          question: "What are the risks of off-plan investments?",
          answer: "Risks include construction delays, developer financial issues, and market fluctuations. Always research the developer's track record and ensure proper legal documentation."
        },
        {
          question: "How do payment plans work for off-plan properties?",
          answer: "Off-plan payment plans typically require 10-20% down payment, with the balance paid in installments during construction and final payment on handover."
        }
      ]
    };

    const questions = commonQuestions[category] || [];

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": questions.map(qa => ({
        "@type": "Question",
        "name": qa.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": qa.answer
        }
      }))
    };
  };

  return (
    <>
      {/* Property Listing Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateListingStructuredData())
        }}
      />

      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbData())
        }}
      />

      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQData())
        }}
      />
    </>
  );
}
