// lib/areaData.js

export const communities = [
  {
    id: 1,
    name: 'Downtown Dubai',
    slug: 'downtown-dubai',
    description: 'The heart of modern Dubai, featuring iconic landmarks like Burj Khalifa and Dubai Mall.',
    location: 'Central Dubai',
    averagePrice: 2500000,
    averageRentalYield: 6.5,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    coordinates: { lat: 25.1972, lng: 55.2744 },
    mustKnow: [
      { subtitle: 'Transport', caption: 'Excellent metro and road links to major hubs.' },
      { subtitle: 'Lifestyle', caption: 'Close to top dining, shopping and entertainment.' }
    ],
    prosCons: { pros: ['Iconic skyline', 'Strong rental demand'], cons: ['High price point'] }
  },
  {
    id: 2,
    name: 'Dubai Marina',
    slug: 'dubai-marina',
    description: 'A stunning waterfront community with luxury high-rise living and marina views.',
    location: 'New Dubai',
    averagePrice: 1800000,
    averageRentalYield: 7.2,
    image: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800',
    coordinates: { lat: 25.0657, lng: 55.1393 },
    mustKnow: [
      { subtitle: 'Waterfront', caption: 'Popular for marina views and boat access.' }
    ],
    prosCons: { pros: ['Vibrant nightlife', 'High rental yields'], cons: ['Busy during peak season'] }
  },
  {
    id: 3,
    name: 'Palm Jumeirah',
    slug: 'palm-jumeirah',
    description: 'The world-famous man-made island offering exclusive beachfront properties.',
    location: 'Dubai',
    averagePrice: 4500000,
    averageRentalYield: 5.8,
    image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800',
    coordinates: { lat: 25.1124, lng: 55.1390 },
    mustKnow: [
      { subtitle: 'Exclusivity', caption: 'High-end villas and limited inventory.' }
    ],
    prosCons: { pros: ['Beachfront living', 'Prestige'], cons: ['Premium pricing'] }
  },
  {
    id: 4,
    name: 'Business Bay',
    slug: 'business-bay',
    description: 'A thriving business district with modern residential and commercial developments.',
    location: 'Central Dubai',
    averagePrice: 1600000,
    averageRentalYield: 7.8,
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800',
    coordinates: { lat: 25.1877, lng: 55.2632 },
    mustKnow: [
      { subtitle: 'Commercial Nexus', caption: 'Close proximity to offices and corporate hubs.' }
    ],
    prosCons: { pros: ['Central location', 'Strong demand'], cons: ['Traffic in peak hours'] }
  },
  {
    id: 5,
    name: 'Jumeirah Beach Residence',
    slug: 'jumeirah-beach-residence',
    description: 'Beachfront living with stunning views of the Arabian Gulf and world-class amenities.',
    location: 'New Dubai',
    averagePrice: 2200000,
    averageRentalYield: 6.8,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
    coordinates: { lat: 25.0657, lng: 55.1393 },
    mustKnow: [
      { subtitle: 'Family Friendly', caption: 'Good amenities for families and easy beach access.' }
    ],
    prosCons: { pros: ['Beachfront amenities', 'Good resale potential'], cons: ['Seasonal demand fluctuations'] }
  },
  {
    id: 6,
    name: 'Dubai Hills Estate',
    slug: 'dubai-hills-estate',
    description: 'A master-planned community offering luxury villas and apartments with golf course views.',
    location: 'Mohammed Bin Rashid City',
    averagePrice: 3200000,
    averageRentalYield: 6.2,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    coordinates: { lat: 25.1048, lng: 55.2708 },
    mustKnow: [
      { subtitle: 'Green Spaces', caption: 'Home to parks, a golf course and family amenities.' }
    ],
    prosCons: { pros: ['Green, planned community', 'Strong family appeal'], cons: ['Higher entry price'] }
  }
];

export const getAreaData = async (slug) => {
  const area = communities.find(community => community.slug === slug);

  if (!area) {
    console.error(`Area not found for slug: ${slug}`);
    return null;
  }

  // Ensure all required fields have default values and provide new schema fields
  const safeArea = {
    ...area,
    averagePrice: area.averagePrice || 0,
    averageRentalYield: area.averageRentalYield || 0,
    coordinates: area.coordinates || { lat: 0, lng: 0 },
    mustKnow: area.mustKnow || [],
    prosCons: area.prosCons || { pros: [], cons: [] }
  };

  // Enhanced area data with additional details (compatible with updated schema)
  return {
    ...safeArea,
    longDescription: `${safeArea.description} This prestigious community offers world-class amenities, excellent connectivity, and strong investment potential with an average rental yield of ${safeArea.averageRentalYield}%.`,
    amenities: [
      'Shopping Centers',
      'Restaurants & Cafes',
      'Parks & Recreation',
      'Schools & Education',
      'Healthcare Facilities',
      'Public Transportation',
      'Beach Access',
      'Golf Courses'
    ],
    connectivity: [
      { name: 'Dubai International Airport', distance: '25 min drive', type: 'airport' },
      { name: 'Dubai Mall', distance: '15 min drive', type: 'shopping' },
      { name: 'Metro Station', distance: '5 min walk', type: 'transport' },
      { name: 'Beach', distance: '10 min walk', type: 'recreation' }
    ],
    // removed legacy `demographics` field; use `mustKnow` and `prosCons` instead
    marketTrends: {
      priceGrowth: 8.5,
      demandLevel: 'High',
      investmentRating: 4.5
    }
  };
};
